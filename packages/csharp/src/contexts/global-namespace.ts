import { Binder, createSymbol, useBinder } from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/namespace.js";

export function useGlobalNamespace() {
  const binder = useBinder();
  return getGlobalNamespace(binder);
}

const globalNamespaces = new WeakMap<Binder, NamespaceSymbol>();
let defaultGlobalNamespace = createSymbol(
  NamespaceSymbol,
  "global",
  undefined,
  {
    isGlobal: true,
  },
);

export function resetGlobalNamespace() {
  defaultGlobalNamespace = createSymbol(NamespaceSymbol, "global", undefined, {
    isGlobal: true,
  });
}

export function getGlobalNamespace(binder: Binder | undefined) {
  if (!binder) {
    return defaultGlobalNamespace;
  }

  let namespace = globalNamespaces.get(binder);

  if (!namespace) {
    namespace = createSymbol(NamespaceSymbol, "global", undefined, {
      binder,
      isGlobal: true,
    });
    globalNamespaces.set(binder, namespace);
  }

  return namespace;
}
