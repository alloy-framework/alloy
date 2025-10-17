import { Namekey, NamePolicyGetter, onCleanup, useBinder } from "@alloy-js/core";
import { TypeSpecSymbol, TypeSpecSymbolOptions } from "./typespec.js";
import { TypeSpecElements, useTypeSpecNamePolicy } from "../name-policy.js";
import { useNamedTypeScope } from "../scopes/contexts.js";
import { NamespaceSymbol } from "./namespace.js";
import { useNamespaceContext } from "../contexts/namespace.js";
import { getGlobalNamespace } from "../contexts/global-namespace.js";

export function createPropertySymbol(
  originalName: string | Namekey,
  options: TypeSpecSymbolOptions = {},
) {
  let nameElement: TypeSpecElements = "model-property";

  const scope = useNamedTypeScope();

  if (scope.ownerSymbol.typeKind !== "model") {
    throw new Error(`Can't define a property outside of a model.`);
  }

  return new TypeSpecSymbol(
    originalName,
    scope.members,
    withNamePolicy(options, nameElement),
  );
}

export function createNamespaceSymbol(
  name: string | Namekey | (string | Namekey)[],
  options: TypeSpecSymbolOptions = {},
): NamespaceSymbol {
  const scope = useNamespaceContext();
  const parentSymbol = scope?.symbol ?? getGlobalNamespace(useBinder());
  const names = normalizeNamespaceName(name);
  let current = parentSymbol;
  for (const name of names) {
    current = createNamespaceSymbolInternal(name, current, options);
  }
  return current;
}

function normalizeNamespaceName(
  name: string | Namekey | (string | Namekey)[],
): (string | Namekey)[] {
  if (Array.isArray(name)) {
    return name;
  }
  if (typeof name === "string" && name.includes(".")) {
    return name.split(".");
  }
  return [name];
}

function createNamespaceSymbolInternal(
  name: string | Namekey,
  parentSymbol: NamespaceSymbol,
  options: TypeSpecSymbolOptions = {},
): NamespaceSymbol {
  const namePolicy =
    options.namePolicy ?? useTypeSpecNamePolicy().for("namespace");
  const expectedName = namePolicy(typeof name === "string" ? name : name.name);
  if (parentSymbol.members.symbolNames.has(expectedName)) {
    return parentSymbol.members.symbolNames.get(
      expectedName,
    )! as NamespaceSymbol;
  }
  return withCleanup(
    new NamespaceSymbol(
      name,
      parentSymbol,
      withNamePolicy(options, "namespace"),
    ),
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

function withCleanup<T extends TypeSpecSymbol>(sym: T): T {
  onCleanup(() => {
    sym.delete();
  });
  return sym;
}