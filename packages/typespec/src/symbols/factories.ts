import { Namekey, NamePolicyGetter } from "@alloy-js/core";
import { TypeSpecSymbol, TypeSpecSymbolOptions } from "./typespec.js";
import { TypeSpecElements, useTypeSpecNamePolicy } from "../name-policy.js";
import { useNamedTypeScope } from "../scopes/contexts.js";

export function createPropertySymbol(
    originalName: string | Namekey,
    options: TypeSpecSymbolOptions = {},
) {
    let nameElement: TypeSpecElements = "model-property";

    const scope = useNamedTypeScope();

    if (scope.ownerSymbol.typeKind !== "model" ) {
      throw new Error(`Can't define a property outside of a model.`);
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