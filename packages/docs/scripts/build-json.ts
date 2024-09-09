import { render, stc, type OutputDirectory } from "@alloy-js/core";
import { Output, SourceDirectory } from "@alloy-js/core/stc";
import {
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiItemKind,
  ApiModel,
  ApiPackage,
  ApiVariable,
} from "@microsoft/api-extractor-model";
import { mkdirSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import {
  ComponentDoc,
  ContextDoc,
  FunctionDoc,
  PackageDocs,
} from "./components/stc/index.js";
import { ApiModelContext } from "./contexts/api-model.js";
import { ContentRootDir } from "./contexts/content-root-dir.js";

const rootDir = resolve(import.meta.dirname, "../../src/content/docs");

const docPath = resolve(rootDir, "reference");

const packagesPath = resolve(import.meta.dirname, "../../../");
const corePath = resolve(packagesPath, "core");

const apiModel: ApiModel = new ApiModel();
const apiPackage: ApiPackage = apiModel.loadPackage(apiPath(corePath));

function apiPath(packagePath: string) {
  return resolve(packagePath, "temp/api.json");
}

const apis = queryApis(apiModel);

const sfs = render(
  Output({ basePath: docPath }).children(
    stc(ApiModelContext.Provider)({ value: apiModel }).children(
      stc(ContentRootDir.Provider)({ value: rootDir }).children(
        PackageDocs({ name: "core" }).children(
          SourceDirectory({ path: "components" }).children(
            apis.components.map((component) => ComponentDoc({ component })),
          ),
          SourceDirectory({ path: "functions" }).children(
            apis.functions.map((fn) => FunctionDoc({ fn })),
          ),
          SourceDirectory({ path: "contexts" }).children(
            apis.contexts.map((context) => ContextDoc({ context })),
          ),
        ),
      ),
    ),
  ),
);
const cwd = process.cwd();

writeSourceFiles(sfs);

function writeSourceFiles(sfs: OutputDirectory) {
  for (const item of sfs.contents) {
    switch (item.kind) {
      case "directory":
        console.log("Creating directory", relative(cwd, item.path));
        mkdirSync(item.path, { recursive: true });
        writeSourceFiles(item);
        break;
      case "file":
        console.log("Writing file", relative(cwd, item.path));
        writeFileSync(item.path, item.contents);
        break;
    }
  }
}
throw "";

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
  componentProps?: ApiInterface;
}

export interface ContextApi {
  kind: "context";
  name: string;
  contextVariable: ApiVariable;
  contextInterface: ApiItem | string;
  contextAccessor?: ApiFunction;
}

interface TypeApi {
  kind: "type";
  type: ApiItem;
}

interface DocumentationStructure {
  contexts: ContextApi[];
  functions: FunctionApi[];
  variables: VariableApi[];
  components: ComponentApi[];
}

function queryApis(apiModel: ApiModel): DocumentationStructure {
  const apis: DocumentationStructure = {
    contexts: [],
    functions: [],
    variables: [],
    components: [],
  };

  // first, discover contexts, because we need do avoid creating separate documentation
  // items for anything context related.

  const contextsByName = new Map<string, ContextApi>();
  const contextApis = new Map<ApiItem, ContextApi>();

  for (const member of apiPackage.members[0].members) {
    if (member.kind === ApiItemKind.Variable) {
      const variable = member as ApiVariable;
      const nameMatch = variable.displayName.match(/(\w+)Context/);
      if (!nameMatch) continue;
      const contextName = nameMatch[1];
      const instantiationStart = variable.variableTypeExcerpt.spannedTokens[1];
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

      apis.contexts.push(record);

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
          let propType: ApiInterface | undefined = undefined;
          if ((member as ApiFunction).parameters.length > 0) {
            const propsTypeRef = (member as ApiFunction).parameters[0]
              .parameterTypeExcerpt.spannedTokens[0].canonicalReference;
            propType = apiModel.resolveDeclarationReference(
              propsTypeRef!,
              undefined,
            ).resolvedApiItem! as ApiInterface;
          }

          apis.components.push({
            kind: "component",
            componentFunction: member as ApiFunction,
            componentProps: propType,
          });
        } else {
          const fns = member.getMergedSiblings() as ApiFunction[];
          apis.functions.push({
            kind: "function",
            functions: fns,
          });
        }
        break;
      case ApiItemKind.Variable:
        apis.variables.push({
          kind: "variable",
          variable: member as ApiVariable,
        });
    }
  }

  return apis;
}

function isComponent(fn: ApiFunction) {
  return fn.fileUrlPath && fn.fileUrlPath.indexOf("components") > -1;
}
