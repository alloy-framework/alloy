import { useScope } from "@alloy-js/core";
import { CSharpScope } from "./csharp.js";
import { CSharpLexicalScope } from "./lexical.js";
import { CSharpMethodScope } from "./method.js";
import { CSharpNamedTypeScope } from "./named-type.js";

export function useCSharpScope() {
  const scope = useScope();
  if (!(scope instanceof CSharpScope)) {
    throw new Error("Expected a C# scope, got a different kind of scope.");
  }

  return scope;
}

export function useNamedTypeScope() {
  const scope = useCSharpScope();
  if (!(scope instanceof CSharpNamedTypeScope)) {
    throw new Error(
      "Expected a named type scope, got a " + scope.constructor.name,
    );
  }

  return scope;
}

export function useMethodScope() {
  const scope = useScope();
  if (!(scope instanceof CSharpMethodScope)) {
    throw new Error(
      `Expected a method scope, but got ${scope.constructor.name}.`,
    );
  }
  return scope;
}

export function useLexicalScope() {
  const scope = useScope();
  if (!(scope instanceof CSharpLexicalScope)) {
    throw new Error(
      `Expected a lexical scope, but got ${scope.constructor.name}.`,
    );
  }
  return scope;
}
