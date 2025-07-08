import { useScope } from "@alloy-js/core";
import { PythonMemberScope } from "./python-member-scope.js";
import { PythonModuleScope } from "./python-module-scope.js";

export type PythonOutputScope = PythonModuleScope | PythonMemberScope;

export function usePythonScope() {
  return useScope() as PythonOutputScope;
}
