import { render, stc, type OutputDirectory } from "@alloy-js/core";
import { Output, SourceDirectory } from "@alloy-js/core/stc";
import {
  ApiEnum,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiItemKind,
  ApiModel,
  ApiTypeAlias,
  ApiVariable,
  ExcerptTokenKind,
} from "@microsoft/api-extractor-model";
import { mkdirSync, writeFileSync } from "node:fs";
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

const rootDir = resolve(import.meta.dirname, "../../src/content/docs");

const docPath = resolve(rootDir, "reference");

const packagesPath = resolve(import.meta.dirname, "../../../");

const apiModel: ApiModel = new ApiModel();
const apiPackages = {
  core: apiModel.loadPackage(apiPath(resolve(packagesPath, "core"))),
  typescript: apiModel.loadPackage(
    apiPath(resolve(packagesPath, "typescript")),
  ),
  csharp: apiModel.loadPackage(apiPath(resolve(packagesPath, "csharp"))),
  java: apiModel.loadPackage(apiPath(resolve(packagesPath, "java"))),
  json: apiModel.loadPackage(apiPath(resolve(packagesPath, "json"))),
};

function apiPath(packagePath: string) {
  return resolve(packagePath, "temp/api.json");
}

console.time("queryApis");
const apis = queryApis(apiModel);
console.timeEnd("queryApis");

console.time("render");
const sfs = render(
  Output({ basePath: docPath }).children(
    stc(ApiModelContext.Provider)({ value: apiModel }).children(
      stc(ContentRootDir.Provider)({ value: rootDir }).children(
        Object.entries(apis.packages).map(([name, record]) => {
          return PackageDocs({ name }).children(
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
        writeFileSync(item.path, item.contents);
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
}

export interface TypeApi {
  kind: "type";
  type: ApiInterface | ApiTypeAlias;
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
    const packageRecord: PackageStructure = {
      contexts: [],
      functions: [],
      variables: [],
      components: [],
      types: [],
    };

    apis.packages[name] = packageRecord;
    // first, discover contexts, because we need do avoid creating separate documentation
    // items for anything context related.

    const contextsByName = new Map<string, ContextApi>();
    const contextApis = new Map<ApiItem, ContextApi>();
    const propTypes = new Set<ApiItem>();

    for (const member of apiPackage.members[0].members) {
      if (member.kind === ApiItemKind.Variable) {
        const variable = member as ApiVariable;
        const nameMatch = variable.displayName.match(/(\w+)Context/);
        if (!nameMatch) continue;
        const contextName = nameMatch[1];
        const instantiationStart =
          variable.variableTypeExcerpt.spannedTokens[1];
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
        if (typeof contextInterface !== "string") {
          contextApis.set(contextInterface, record);
        }
      }
    }

    for (const member of apiPackage.members[0].members) {
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

          // skip these as we merge these from the first definition
          if ((member as ApiFunction).overloadIndex > 1) continue;

          if (isComponent(member as ApiFunction)) {
            let propTypes: ApiInterface[] = [];
            if ((member as ApiFunction).parameters.length > 0) {
              const propsTypeRef = (member as ApiFunction).parameters[0]
                .parameterTypeExcerpt.spannedTokens[0].canonicalReference;
              const resolvedPropType = apiModel.resolveDeclarationReference(
                propsTypeRef!,
                undefined,
              ).resolvedApiItem!;

              if (resolvedPropType.kind === ApiItemKind.Interface) {
                propTypes.push(resolvedPropType as ApiInterface);
              } else if (resolvedPropType.kind === ApiItemKind.TypeAlias) {
                for (const token of (resolvedPropType as ApiTypeAlias)
                  .typeExcerpt.tokens) {
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

                  propTypes.push(aliasRef as ApiInterface);
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
              componentProps: propTypes,
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
        case ApiItemKind.Interface:
        case ApiItemKind.TypeAlias:
          if (propTypes.has(member) || contextApis.has(member)) continue;
          packageRecord.types.push({
            kind: "type",
            type: member as ApiInterface | ApiTypeAlias,
          });
      }
    }
  }

  return apis;
}

function isComponent(fn: ApiFunction) {
  return fn.fileUrlPath && fn.fileUrlPath.indexOf("components") > -1;
}
