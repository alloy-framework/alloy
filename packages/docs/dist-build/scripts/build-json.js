import { render, stc } from "@alloy-js/core";
import { Output, SourceDirectory } from "@alloy-js/core/stc";
import { ApiItemKind, ApiModel, } from "@microsoft/api-extractor-model";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ComponentDoc, ContextDoc, FunctionDoc, PackageDocs, TypeDoc, VariableDoc, } from "./components/stc/index.js";
import { ApiModelContext } from "./contexts/api-model.js";
import { ContentRootDir } from "./contexts/content-root-dir.js";
const rootDir = resolve(import.meta.dirname, "../../src/content/docs");
const docPath = resolve(rootDir, "reference");
const packagesPath = resolve(import.meta.dirname, "../../../");
const apiModel = new ApiModel();
const apiPackages = {
    core: apiModel.loadPackage(apiPath(resolve(packagesPath, "core"))),
    typescript: apiModel.loadPackage(apiPath(resolve(packagesPath, "typescript"))),
    csharp: apiModel.loadPackage(apiPath(resolve(packagesPath, "csharp"))),
    java: apiModel.loadPackage(apiPath(resolve(packagesPath, "java"))),
};
function apiPath(packagePath) {
    return resolve(packagePath, "temp/api.json");
}
const apis = queryApis(apiModel);
const sfs = render(Output({ basePath: docPath }).children(stc(ApiModelContext.Provider)({ value: apiModel }).children(stc(ContentRootDir.Provider)({ value: rootDir }).children(Object.entries(apis.packages).map(([name, record]) => {
    return PackageDocs({ name }).children(SourceDirectory({ path: "components" }).children(record.components.map((component) => ComponentDoc({ component }))), SourceDirectory({ path: "functions" }).children(record.functions.map((fn) => FunctionDoc({ fn }))), SourceDirectory({ path: "contexts" }).children(record.contexts.map((context) => ContextDoc({ context }))), SourceDirectory({ path: "types" }).children(record.types.map((type) => TypeDoc({ type }))), SourceDirectory({ path: "variables" }).children(record.variables.map((variable) => VariableDoc({ variable }))));
})))));
const cwd = process.cwd();
writeSourceFiles(sfs);
function writeSourceFiles(sfs) {
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
function queryApis(apiModel) {
    const apis = { packages: {} };
    for (const [name, apiPackage] of Object.entries(apiPackages)) {
        const packageRecord = {
            contexts: [],
            functions: [],
            variables: [],
            components: [],
            types: [],
        };
        apis.packages[name] = packageRecord;
        // first, discover contexts, because we need do avoid creating separate documentation
        // items for anything context related.
        const contextsByName = new Map();
        const contextApis = new Map();
        const propTypes = new Set();
        for (const member of apiPackage.members[0].members) {
            if (member.kind === ApiItemKind.Variable) {
                const variable = member;
                const nameMatch = variable.displayName.match(/(\w+)Context/);
                if (!nameMatch)
                    continue;
                const contextName = nameMatch[1];
                const instantiationStart = variable.variableTypeExcerpt.spannedTokens[1];
                let contextInterface;
                if (instantiationStart.text.match(/<.*>/)) {
                    // primitive type
                    contextInterface = instantiationStart.text.slice(1, -1);
                }
                else {
                    const refToken = variable.variableTypeExcerpt.spannedTokens[2];
                    contextInterface = apiModel.resolveDeclarationReference(refToken.canonicalReference, variable).resolvedApiItem;
                }
                const record = {
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
                            contextRecord.contextAccessor = member;
                            continue;
                        }
                    }
                    // skip these as we merge these from the first definition
                    if (member.overloadIndex > 1)
                        continue;
                    if (isComponent(member)) {
                        let propType = undefined;
                        if (member.parameters.length > 0) {
                            const propsTypeRef = member.parameters[0]
                                .parameterTypeExcerpt.spannedTokens[0].canonicalReference;
                            propType = apiModel.resolveDeclarationReference(propsTypeRef, undefined).resolvedApiItem;
                        }
                        if (propType) {
                            propTypes.add(propType);
                        }
                        packageRecord.components.push({
                            kind: "component",
                            componentFunction: member,
                            componentProps: propType,
                        });
                    }
                    else {
                        const fns = member.getMergedSiblings();
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
                        variable: member,
                    });
                    break;
                case ApiItemKind.Interface:
                case ApiItemKind.TypeAlias:
                    if (propTypes.has(member) || contextApis.has(member))
                        continue;
                    packageRecord.types.push({
                        kind: "type",
                        type: member,
                    });
            }
        }
    }
    return apis;
}
function isComponent(fn) {
    return fn.fileUrlPath && fn.fileUrlPath.indexOf("components") > -1;
}
//# sourceMappingURL=build-json.js.map