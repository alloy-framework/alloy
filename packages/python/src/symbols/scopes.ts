import { useScope } from "@alloy-js/core";
import { PythonLexicalScope } from "./python-lexical-scope.js";
import { PythonMemberScope } from "./python-member-scope.js";
import { PythonModuleScope } from "./python-module-scope.js";

export type PythonOutputScope =
  | PythonLexicalScope
  | PythonModuleScope
  | PythonMemberScope;

export function usePythonScope() {
  return useScope() as PythonOutputScope;
}

export function usePythonLexicalScope() {
  const scope = usePythonScope();
  if (!(scope instanceof PythonLexicalScope)) {
    throw new Error(
      "Expected a PythonLexicalScope, but got " + scope.constructor.name,
    );
  }
  return scope;
}
