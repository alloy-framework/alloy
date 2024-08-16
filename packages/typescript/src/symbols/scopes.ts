import { OutputScope, useScope } from "@alloy-js/core";
import { TSModuleScope } from "./ts-module-scope.js";
import { TSPackageScope } from "./ts-package-scope.js";
import { TSMemberScope } from "./ts-member-scope.js";

export type TSOutputScope =
  | TSGlobalScope
  | TSPackageScope
  | TSModuleScope
  | TSFunctionScope
  | TSMemberScope
  | TSOtherScope;

export interface TSGlobalScope extends OutputScope {
  kind: "global";
}

export interface TSFunctionScope extends OutputScope {
  kind: "function";
}

export interface TSOtherScope extends OutputScope {
  kind: never;
}

export function useTSScope() {
  return useScope() as TSOutputScope;
}
