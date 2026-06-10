import {
  render,
  stc,
  type ContentOutputFile,
  type OutputDirectory,
} from "@alloy-js/core";
import { Output, SourceDirectory } from "@alloy-js/core/stc";
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
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
import {
  ApiItemKind,
  ExcerptTokenKind,
  type ApiClass,
  type ApiFunction,
  type ApiInterface,
  type ApiItem,
  type ApiModel,
  type ApiPackage,
  type ApiTypeAlias,
  type ApiVariable,
} from "./model/index.js";
import { loadTypedocJson } from "./model/index.js";

const rootDir = resolve(import.meta.dirname, "../src/content/docs");
const docPath = resolve(rootDir, "reference");
const repoRoot = resolve(import.meta.dirname, "../../..");

// Step 1: Run TypeDoc to generate JSON
const typedocOut = resolve(import.meta.dirname, "../.typedoc-out/api.json");
const typedocOutDir = resolve(import.meta.dirname, "../.typedoc-out");

if (!existsSync(typedocOutDir)) {
  mkdirSync(typedocOutDir, { recursive: true });
}

console.time("typedoc");
execSync("npx typedoc", { cwd: repoRoot, stdio: "pipe" });
console.timeEnd("typedoc");

// Step 2: Load the TypeDoc JSON into our model
console.time("loadModel");
const apiModel = loadTypedocJson(typedocOut);
console.timeEnd("loadModel");

// Clean up TypeDoc output
rmSync(typedocOutDir, { recursive: true });

// Step 3: Query the model (same logic as before)
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
  variable: ApiVariable;
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

// Additional entry points within packages (e.g., @alloy-js/core/testing)
interface EntryPoint {
  parentPackage: string;
  importPath: string;
  subdirectory: string;
  record: PackageStructure;
}

console.time("queryApis");
const apis = queryApis(apiModel);
// Handle the core/testing entry point
const entryPoints: EntryPoint[] = [];
// TypeDoc already includes testing exports in core. We filter by file path.
const corePackage = apiModel.packages.get("core");
if (corePackage) {
  const testingMembers = corePackage.members.filter(
    (m) => m.fileUrlPath && m.fileUrlPath.includes("testing/"),
  );
  if (testingMembers.length > 0) {
    const testingRecord = queryMembers(testingMembers, apiModel);
    entryPoints.push({
      parentPackage: "core",
      importPath: "@alloy-js/core/testing",
      subdirectory: "testing",
      record: testingRecord,
    });
  }
}
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
          const pkgEntryPoints = entryPoints.filter(
            (ep) => ep.parentPackage === name,
          );

          return PackageDocs({ name }).children(
            renderPackageRecord(record),
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

// --- Query logic ---

function queryApis(model: ApiModel): DocumentationStructure {
  const apis: DocumentationStructure = { packages: {} };

  for (const [name, pkg] of model.packages) {
    // Exclude testing members from main (they get their own entry point)
    const mainMembers = pkg.members.filter(
      (m) => !m.fileUrlPath || !m.fileUrlPath.includes("testing/"),
    );
    apis.packages[name] = queryMembers(mainMembers, model);
  }

  return apis;
}

function queryMembers(members: ApiItem[], model: ApiModel): PackageStructure {
  const packageRecord: PackageStructure = {
    contexts: [],
    functions: [],
    variables: [],
    components: [],
    types: [],
  };

  // Phase 1: discover contexts
  const contextsByName = new Map<string, ContextApi>();
  const contextApis = new Set<ApiItem>();
  const propTypes = new Set<ApiItem>();

  for (const member of members) {
    if (member.kind === ApiItemKind.Variable) {
      const variable = member as ApiVariable;
      const nameMatch = variable.displayName.match(/(\w+)Context/);
      if (!nameMatch) continue;

      const contextName = nameMatch[1];
      // Check if the variable type references ComponentContext
      const typeExcerpt = variable.variableTypeExcerpt;
      const hasComponentContext = typeExcerpt.spannedTokens.some(
        (t) =>
          t.kind === ExcerptTokenKind.Reference &&
          t.text === "ComponentContext",
      );
      if (!hasComponentContext) continue;

      // Find the type argument (context interface)
      const refToken = typeExcerpt.spannedTokens.find(
        (t) =>
          t.kind === ExcerptTokenKind.Reference &&
          t.text !== "ComponentContext",
      );

      let contextInterface: ApiItem | string;
      if (refToken?.referenceId) {
        const resolved = model.resolveReference(refToken.referenceId);
        contextInterface = resolved ?? refToken.text;
      } else {
        // Primitive or inline type
        const typeText = typeExcerpt.text;
        const match = typeText.match(/ComponentContext<(.+)>/);
        contextInterface = match ? match[1] : "unknown";
      }

      const record: ContextApi = {
        kind: "context",
        name: contextName,
        contextInterface,
        contextVariable: variable,
      };

      packageRecord.contexts.push(record);
      contextsByName.set(contextName, record);
      contextApis.add(variable);
      if (
        typeof contextInterface !== "string" &&
        contextInterface.displayName === variable.displayName
      ) {
        contextApis.add(contextInterface);
      }
    }
  }

  // Phase 2: collect functions, components, variables
  for (const member of members) {
    if (contextApis.has(member)) continue;

    switch (member.kind) {
      case ApiItemKind.Function: {
        const fn = member as ApiFunction;
        if (fn.displayName.startsWith("use")) {
          const contextName = fn.displayName.slice(3);
          const contextRecord = contextsByName.get(contextName);
          if (contextRecord) {
            contextRecord.contextAccessor = fn;
            continue;
          }
        }

        const contextFactoryMatch =
          fn.displayName.match(/^create(\w+)Context$/);
        if (contextFactoryMatch) {
          const contextRecord = contextsByName.get(contextFactoryMatch[1]);
          if (contextRecord) {
            contextRecord.contextFactory = fn;
            continue;
          }
        }

        if (fn.overloadIndex > 1) continue;

        if (isComponent(fn)) {
          const componentPropTypes = findComponentPropTypes(fn, members, model);
          for (const pt of componentPropTypes) {
            propTypes.add(pt);
          }
          packageRecord.components.push({
            kind: "component",
            componentFunction: fn,
            componentProps: componentPropTypes,
          });
        } else {
          const fns = fn.getMergedSiblings() as ApiFunction[];
          packageRecord.functions.push({
            kind: "function",
            functions: fns,
          });
        }
        break;
      }
      case ApiItemKind.Variable:
        packageRecord.variables.push({
          kind: "variable",
          variable: member as ApiVariable,
        });
        break;
    }
  }

  // Phase 3: collect types
  for (const member of members) {
    if (contextApis.has(member) || propTypes.has(member)) continue;
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

function findComponentPropTypes(
  fn: ApiFunction,
  members: ApiItem[],
  model: ApiModel,
): ApiInterface[] {
  if (fn.parameters.length === 0) return [];

  const propsParam = fn.parameters[0];
  const refToken = propsParam.parameterTypeExcerpt.spannedTokens.find(
    (t) => t.kind === ExcerptTokenKind.Reference,
  );
  if (!refToken?.referenceId) return [];

  const resolved = model.resolveReference(refToken.referenceId);
  if (!resolved) return [];

  if (resolved.kind === ApiItemKind.Interface) {
    return [resolved as ApiInterface];
  } else if (resolved.kind === ApiItemKind.TypeAlias) {
    // Type alias - look for interfaces it references
    const ta = resolved as ApiTypeAlias;
    const result: ApiInterface[] = [];
    for (const token of ta.typeExcerpt.spannedTokens) {
      if (token.kind !== ExcerptTokenKind.Reference) continue;
      if (!token.referenceId) continue;
      const ref = model.resolveReference(token.referenceId);
      if (ref && ref.kind === ApiItemKind.Interface) {
        result.push(ref as ApiInterface);
      }
    }
    return result;
  }

  return [];
}
