import { Namekey, NamePolicyGetter } from "@alloy-js/core";
import { TypeSpecSymbol, TypeSpecSymbolOptions } from "./typespec.js";
import { TypeSpecElements, useTypeSpecNamePolicy } from "../name-policy.js";
import { useNamedTypeScope } from "../scopes/contexts.js";

export function createFieldSymbol(
    originalName: string | Namekey,
    options: TypeSpecSymbolOptions = {},
) {
    let nameElement: TypeSpecElements = "model";

    const scope = useNamedTypeScope();

    if (
    scope.ownerSymbol.typeKind !== "model" 
    // && scope.ownerSymbol.typeKind !== "struct"
    ) {
    throw new Error(`Can't define a field outside of a model or struct.`);
    }

    return new TypeSpecSymbol(
    originalName,
    scope.members,
    withNamePolicy(options, nameElement),
    );
}

function withNamePolicy<T extends { namePolicy?: NamePolicyGetter }>(
  options: T,
  elementType: TypeSpecElements,
) {
  return {
    ...options,
    namePolicy: options.namePolicy ?? useTypeSpecNamePolicy().for(elementType),
  };
}