import {
  render,
  stc,
  type ContentOutputFile,
  type OutputDirectory,
} from "@alloy-js/core";
import { Output, SourceDirectory } from "@alloy-js/core/stc";
import {
  ApiClass,
  ApiEnum,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiItemKind,
  ApiModel,
  ApiPackage,
  ApiTypeAlias,
  ApiVariable,
  ExcerptTokenKind,
} from "@microsoft/api-extractor-model";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  ComponentDoc,
  ContextDoc,
  FunctionDoc,
  PackageDocs,
  TypeDoc,
  VariableDoc,
} from "./components/stc/index.js";
import { ApiModelContext } from "./contexts/api-model.js";
import { ContentRootDir } from "./contexts/content-root-dir.js";
import { ImportPathContext } from "./contexts/import-path.js";

const rootDir = resolve(import.meta.dirname, "../src/content/docs");

const docPath = resolve(rootDir, "reference");

const packagesPath = resolve(import.meta.dirname, "../../");

const apiModel: ApiModel = new ApiModel();
const apiPackages: Record<string, ApiPackage> = {
  core: apiModel.loadPackage(apiPath(resolve(packagesPath, "core"))),
  typescript: apiModel.loadPackage(
    apiPath(resolve(packagesPath, "typescript")),
  ),
  csharp: apiModel.loadPackage(apiPath(resolve(packagesPath, "csharp"))),
  java: apiModel.loadPackage(apiPath(resolve(packagesPath, "java"))),
  json: apiModel.loadPackage(apiPath(resolve(packagesPath, "json"))),
  python: apiModel.loadPackage(apiPath(resolve(packagesPath, "python"))),
  go: apiModel.loadPackage(apiPath(resolve(packagesPath, "go"))),
};

// Additional entry points within packages (e.g., @alloy-js/core/testing)
interface EntryPoint {
  parentPackage: string;
  importPath: string;
  subdirectory: string;
  apiPackage: ApiPackage;
}

const entryPoints: EntryPoint[] = [];

const coreTestingApiPath = resolve(
  packagesPath,
  "core",
  "temp/api-testing.json",
);
if (existsSync(coreTestingApiPath)) {
  const testingModel = new ApiModel();
  entryPoints.push({
    parentPackage: "core",
    importPath: "@alloy-js/core/testing",
    subdirectory: "testing",
    apiPackage: testingModel.loadPackage(coreTestingApiPath),
  });
}

function apiPath(packagePath: string) {
  return resolve(packagePath, "temp/api.json");
}

console.time("queryApis");
const apis = queryApis(apiModel);
const entryPointApis = entryPoints.map((ep) => ({
  ...ep,
  record: queryPackageApis(ep.apiPackage, ep.subdirectory + "/"),
}));
console.timeEnd("queryApis");

function renderPackageRecord(record: PackageStructure) {
  return [
    SourceDirectory({ path: "components" }).children(
      record.components.map((component) => ComponentDoc({ component })),
    ),
    SourceDirectory({ path: "functions" }).children(
      record.functions.map((fn) => FunctionDoc({ fn })),
    ),
    SourceDirectory({ path: "contexts" }).children(
      record.contexts.map((context) => ContextDoc({ context })),
    ),
    SourceDirectory({ path: "types" }).children(
      record.types.map((type) => TypeDoc({ type })),
    ),
    SourceDirectory({ path: "variables" }).children(
      record.variables.map((variable) => VariableDoc({ variable })),
    ),
  ];
}

console.time("render");
const sfs = render(
  Output({ basePath: docPath }).children(
    stc(ApiModelContext.Provider)({ value: apiModel }).children(
      stc(ContentRootDir.Provider)({ value: rootDir }).children(
        Object.entries(apis.packages).map(([name, record]) => {
          // Find entry points that belong to this package
          const pkgEntryPoints = entryPointApis.filter(
            (ep) => ep.parentPackage === name,
          );

          return PackageDocs({ name }).children(
            renderPackageRecord(record),
            // Render additional entry points as subdirectories with import path override
            pkgEntryPoints.map((ep) =>
              SourceDirectory({ path: ep.subdirectory }).children(
                stc(ImportPathContext.Provider)({
                  value: ep.importPath,
                }).children(renderPackageRecord(ep.record)),
              ),
            ),
          );
        }),
      ),
    ),
  ),
);
console.timeEnd("render");

console.time("writeFiles");
writeSourceFiles(sfs);
console.timeEnd("writeFiles");

function writeSourceFiles(sfs: OutputDirectory) {
  for (const item of sfs.contents) {
    switch (item.kind) {
      case "directory":
        mkdirSync(item.path, { recursive: true });
        writeSourceFiles(item);
        break;
      case "file":
        writeFileSync(item.path, (item as ContentOutputFile).contents);
        break;
    }
  }
}

export type DocumentationApi =
  | FunctionApi
  | VariableApi
  | ComponentApi
  | ContextApi
  | TypeApi;

export interface FunctionApi {
  kind: "function";
  functions: ApiFunction[];
}

export interface VariableApi {
  kind: "variable";
  variable: ApiVariable | ApiEnum;
}

export interface ComponentApi {
  kind: "component";
  componentFunction: ApiFunction;
  componentProps: ApiInterface[];
}

export interface ContextApi {
  kind: "context";
  name: string;
  contextVariable: ApiVariable;
  contextInterface: ApiItem | string;
  contextAccessor?: ApiFunction;
  contextFactory?: ApiFunction;
}

export interface TypeApi {
  kind: "type";
  type: ApiInterface | ApiTypeAlias | ApiClass;
}

interface PackageStructure {
  contexts: ContextApi[];
  functions: FunctionApi[];
  variables: VariableApi[];
  components: ComponentApi[];
  types: TypeApi[];
}

interface DocumentationStructure {
  packages: Record<string, PackageStructure>;
}

function queryApis(apiModel: ApiModel): DocumentationStructure {
  const apis: DocumentationStructure = { packages: {} };

  for (const [name, apiPackage] of Object.entries(apiPackages)) {
    apis.packages[name] = queryPackageApis(apiPackage);
  }

  return apis;
}

function queryPackageApis(
  apiPackage: ApiPackage,
  sourcePrefix?: string,
): PackageStructure {
  const packageRecord: PackageStructure = {
    contexts: [],
    functions: [],
    variables: [],
    components: [],
    types: [],
  };

  const members = apiPackage.members[0].members.filter((m) => {
    if (!sourcePrefix) return true;
    const path = (m as any).fileUrlPath as string | undefined;
    return path ? path.startsWith(sourcePrefix) : true;
  });

  // Phase 1: discover contexts, because we need do avoid creating separate
  // documentation items for anything context related.

  const contextsByName = new Map<string, ContextApi>();
  const contextApis = new Map<ApiItem, ContextApi>();
  const propTypes = new Set<ApiItem>();

  for (const member of members) {
    if (member.kind === ApiItemKind.Variable) {
      const variable = member as ApiVariable;
      const nameMatch = variable.displayName.match(/(\w+)Context/);
      if (!nameMatch) continue;
      const contextName = nameMatch[1];
      const instantiationStart = variable.variableTypeExcerpt.spannedTokens[1];
      if (!instantiationStart) continue;
      let contextInterface: ApiItem | string;
      if (instantiationStart.text.match(/<.*>/)) {
        // primitive type
        contextInterface = instantiationStart.text.slice(1, -1);
      } else {
        const refToken = variable.variableTypeExcerpt.spannedTokens[2];
        contextInterface = apiModel.resolveDeclarationReference(
          refToken.canonicalReference!,
          variable,
        ).resolvedApiItem!;
      }

      const record: ContextApi = {
        kind: "context",
        name: contextName,
        contextInterface,
        contextVariable: variable,
      };

      packageRecord.contexts.push(record);

      contextsByName.set(contextName, record);
      contextApis.set(variable, record);
      // Only consume the interface when it's dedicated to this context
      // (e.g., SourceFileContext interface for SourceFile context). Shared
      // types like OutputSymbol or OutputScope that happen to be used as a
      // context value type should still get their own standalone type page.
      if (
        typeof contextInterface !== "string" &&
        contextInterface.displayName === variable.displayName
      ) {
        contextApis.set(contextInterface, record);
      }
    }
  }

  // Phase 2: collect functions, components, variables, and enums
  for (const member of members) {
    if (contextApis.has(member)) {
      continue;
    }
    switch (member.kind) {
      case ApiItemKind.Function:
        if (member.displayName.startsWith("use")) {
          // possiblely part of context
          const contextName = member.displayName.slice(3);
          const contextRecord = contextsByName.get(contextName);
          if (contextRecord) {
            contextRecord.contextAccessor = member as ApiFunction;
            continue;
          }
        }

        const contextFactoryMatch =
          member.displayName.match(/^create(\w+)Context$/);
        if (contextFactoryMatch) {
          const contextRecord = contextsByName.get(contextFactoryMatch[1]);
          if (contextRecord) {
            contextRecord.contextFactory = member as ApiFunction;
            continue;
          }
        }

        // skip these as we merge these from the first definition
        if ((member as ApiFunction).overloadIndex > 1) continue;

        if (isComponent(member as ApiFunction)) {
          let componentPropTypes: ApiInterface[] = [];
          if ((member as ApiFunction).parameters.length > 0) {
            const propsTypeRef = (member as ApiFunction).parameters[0]
              .parameterTypeExcerpt.spannedTokens[0].canonicalReference;
            if (propsTypeRef === undefined) {
              // https://github.com/alloy-framework/alloy/issues/128
              console.log(
                `warn: Cannot find props type reference for ${member.displayName}`,
              );
              continue;
            }
            const model = apiModel.resolveDeclarationReference(
              propsTypeRef!,
              undefined,
            );

            const resolvedPropType = model.resolvedApiItem;
            if (!resolvedPropType) {
              throw new Error(
                `Cannot resolve prop type for ${member.displayName}: ${model.errorMessage}`,
              );
            }
            if (resolvedPropType.kind === ApiItemKind.Interface) {
              componentPropTypes.push(resolvedPropType as ApiInterface);
              propTypes.add(resolvedPropType as ApiInterface);
            } else if (resolvedPropType.kind === ApiItemKind.TypeAlias) {
              for (const token of (resolvedPropType as ApiTypeAlias).typeExcerpt
                .tokens) {
                if (token.kind !== ExcerptTokenKind.Reference) {
                  continue;
                }

                const aliasRef = apiModel.resolveDeclarationReference(
                  token.canonicalReference!,
                  resolvedPropType,
                ).resolvedApiItem;

                if (!aliasRef) continue;
                if (aliasRef.kind !== ApiItemKind.Interface) {
                  console.log(
                    "Warning: type alias for component props has unknown type reference kind " +
                      ApiItemKind[aliasRef.kind],
                  );
                  continue;
                }
                propTypes.add(aliasRef as ApiInterface);
                componentPropTypes.push(aliasRef as ApiInterface);
              }
            } else {
              throw new Error(
                "Cannot create props reference for kind " +
                  ApiItemKind[resolvedPropType.kind],
              );
            }
          }

          packageRecord.components.push({
            kind: "component",
            componentFunction: member as ApiFunction,
            componentProps: componentPropTypes,
          });
        } else {
          const fns = member.getMergedSiblings() as ApiFunction[];
          packageRecord.functions.push({
            kind: "function",
            functions: fns,
          });
        }
        break;
      case ApiItemKind.Variable:
      case ApiItemKind.Enum:
        packageRecord.variables.push({
          kind: "variable",
          variable: member as ApiVariable,
        });
        break;
    }
  }

  // phase 3: collect interfaces, type aliases, and classes that aren't
  // context APIs or prop types
  for (const member of members) {
    if (contextApis.has(member) || propTypes.has(member)) {
      continue;
    }
    switch (member.kind) {
      case ApiItemKind.Interface:
      case ApiItemKind.TypeAlias:
      case ApiItemKind.Class:
        packageRecord.types.push({
          kind: "type",
          type: member as ApiInterface | ApiTypeAlias | ApiClass,
        });
    }
  }

  return packageRecord;
}

function isComponent(fn: ApiFunction) {
  return fn.fileUrlPath && fn.fileUrlPath.indexOf("components") > -1;
}
