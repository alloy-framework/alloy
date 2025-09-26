import { useScope } from "@alloy-js/core";
import { GoFunctionScope } from "./function.js";
import { GoScope } from "./go.js";
import { GoLexicalScope } from "./lexical.js";
import { GoNamedTypeScope } from "./named-type.js";

export function useGoScope() {
  const scope = useScope();
  if (!(scope instanceof GoScope)) {
    throw new Error("Expected a Go scope, got a different kind of scope.");
  }

  return scope;
}

export function useNamedTypeScope() {
  const scope = useGoScope();
  if (!(scope instanceof GoNamedTypeScope)) {
    throw new Error(
      "Expected a named type scope, got a " + scope.constructor.name,
    );
  }

  return scope;
}

export function useFuncScope() {
  const scope = useGoScope();
  if (!(scope instanceof GoFunctionScope)) {
    throw new Error(
      `Expected a function scope, but got ${scope.constructor.name}.`,
    );
  }
  return scope;
}

export function useLexicalScope() {
  const scope = useGoScope();
  if (!(scope instanceof GoLexicalScope)) {
    throw new Error(
      `Expected a lexical scope, but got ${scope.constructor.name}.`,
    );
  }
  return scope;
}
