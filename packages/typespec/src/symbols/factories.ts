import { Namekey, NamePolicyGetter, onCleanup, useBinder } from "@alloy-js/core";
import { NamespaceSymbol, NamespaceSymbolOptions } from "./namespace.js";
import { ValueOrArray } from "../util.js";
import { useNamespace } from "../scopes/index.js";
import { getGlobalNamespace } from "../contexts/index.js";
import { TypeSpecElements, useTypeSpecNamePolicy } from "../name-policy.js";
import { TypeSpecSymbol } from "./index.js";

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

function normalizeNamespaceName(name: ValueOrArray<string | Namekey>): Array<string | Namekey> {
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
