import { Namekey, NamePolicyGetter, onCleanup, useBinder } from "@alloy-js/core";
import { TypeSpecSymbol, TypeSpecSymbolOptions } from "./typespec.js";
import { TypeSpecElements, useTypeSpecNamePolicy } from "../name-policy.js";
import { useDirectoryScope, useNamedTypeScope } from "../scopes/contexts.js";
import { NamespaceSymbol } from "./namespace.js";
import { getGlobalNamespace } from "../contexts/global-namespace.js";
import { DirectoryScope } from "../scopes/directory.js";
import { useNamespace } from "../scopes/namespace.js";


export function createDirectoryScope(path: string) {
  const parent = useDirectoryScope();
  return new DirectoryScope(path, parent);
}

export function createNamespaceSymbol(
  name: string | Namekey | (string | Namekey)[],
  options: TypeSpecSymbolOptions = {},
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