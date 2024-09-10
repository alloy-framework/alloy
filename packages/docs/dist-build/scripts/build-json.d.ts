import { ApiEnum, ApiFunction, ApiInterface, ApiItem, ApiTypeAlias, ApiVariable } from "@microsoft/api-extractor-model";
export type DocumentationApi = FunctionApi | VariableApi | ComponentApi | ContextApi | TypeApi;
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
    componentProps?: ApiInterface;
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
//# sourceMappingURL=build-json.d.ts.map