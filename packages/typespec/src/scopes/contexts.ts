import { useScope } from "@alloy-js/core";
import { TypeSpecScope } from "./typespec.js";
import { TypeSpecNamedTypeScope } from "./named-type.js";

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