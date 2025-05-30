import { OutputScope, useScope } from "@alloy-js/core";
import { TSMemberScope } from "./ts-member-scope.js";
import { TSModuleScope } from "./ts-module-scope.js";
import { TSPackageScope } from "./ts-package-scope.js";

export type TSOutputScope =
  | TSGlobalScope
  | TSPackageScope
  | TSModuleScope
  | TSFunctionScope
  | TSMemberScope;

export interface TSGlobalScope extends OutputScope {
  kind: "global";
}

export interface TSFunctionScope extends OutputScope {
  kind: "function";
}

export function useTSScope() {
  return useScope() as TSOutputScope;
}
