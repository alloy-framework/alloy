import {
  Namekey,
  NamePolicyGetter,
  onCleanup,
  OutputSymbolOptions,
  useBinder,
} from "@alloy-js/core";
import { getGlobalNamespace } from "../contexts/index.js";
import { useNamespaceContext } from "../contexts/namespace.js";
import { TypeSpecElements, useTypeSpecNamePolicy } from "../name-policy.js";
import { useNamespace } from "../scopes/index.js";
import { ValueOrArray } from "../util.js";
import { NamedTypeKind, NamedTypeSymbol, TypeSpecSymbol } from "./index.js";
import { NamespaceSymbol, NamespaceSymbolOptions } from "./namespace.js";

export function createNamespaceSymbol(
  name: ValueOrArray<string | Namekey>,
  options: NamespaceSymbolOptions = {},
): NamespaceSymbol {
  const parent = useNamespace();

  const parentSymbol = parent?.ownerSymbol ?? getGlobalNamespace(useBinder());
  const names = normalizeNamespaceName(name);
  let current = parentSymbol;
  for (const name of names) {
    current = createNamespaceSymbolInternal(name, current, options);
  }
  return current;
}

function normalizeNamespaceName(
  name: ValueOrArray<string | Namekey>,
): Array<string | Namekey> {
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
  options: NamespaceSymbolOptions = {},
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

export function createNamedTypeSymbol(
  name: string | Namekey,
  kind: NamedTypeKind,
  options?: OutputSymbolOptions,
) {
  const scope = useNamespaceContext();
  const parentSymbol = scope?.symbol ?? getGlobalNamespace(useBinder());
  return withCleanup(
    new NamedTypeSymbol(name, parentSymbol.memberSpaces, kind, options),
  );
}

function withCleanup<T extends TypeSpecSymbol>(symbol: T): T {
  onCleanup(() => {
    symbol.delete();
  });
  return symbol;
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
