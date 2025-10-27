import { useScope } from "@alloy-js/core";
import { TypeSpecScope } from "./typespec.js";
import { TypeSpecNamedTypeScope } from "./named-type.js";
import { DirectoryScope } from "./directory.js";

export function useDirectoryScope(): DirectoryScope | undefined {
  const scope = useScope();
  if (scope === undefined) {
    return scope;
  }
  if (!(scope instanceof DirectoryScope)) {
    throw new Error("Expected a directory scope, got a different kind of scope.");
  }
  return scope;
}

export function useTypeSpecScope() {
    const scope = useScope();
    if (!(scope instanceof TypeSpecScope)) {
            throw new Error("Expected a TypeSpec scope, got a different kind of scope.");
    }

    return scope;
}

export function useNamedTypeScope() {
    const scope = useTypeSpecScope();
    if (!(scope instanceof TypeSpecNamedTypeScope)) {
        throw new Error(
        "Expected a named type scope, got a " + scope.constructor.name,
        );
    }
    return scope;
}