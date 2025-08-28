import { Binder, useBinder } from "@alloy-js/core";
import { NamespaceSymbol } from "../symbols/namespace.js";

export function useGlobalNamespace() {
  const binder = useBinder();
  return getGlobalNamespace(binder);
}

const globalNamespaces = new WeakMap<Binder, NamespaceSymbol>();
const defaultGlobalNamespace = new NamespaceSymbol("global", undefined, {
  isGlobal: true,
});
export function getGlobalNamespace(binder: Binder | undefined) {
  if (!binder) {
    return defaultGlobalNamespace;
  }

  let namespace = globalNamespaces.get(binder);

  if (!namespace) {
    namespace = new NamespaceSymbol("global", undefined, {
      binder,
      isGlobal: true,
    });
    globalNamespaces.set(binder, namespace);
  }

  return namespace;
}
