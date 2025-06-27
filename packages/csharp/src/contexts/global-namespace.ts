import { Binder, useBinder } from "@alloy-js/core";
import { CSharpNamespaceSymbol } from "../symbols/namespace.js";

export function useGlobalNamespace() {
  const binder = useBinder();
  return getGlobalNamespace(binder);
}

const globalNamespaces = new WeakMap<Binder, CSharpNamespaceSymbol>();
const defaultGlobalNamespace = new CSharpNamespaceSymbol("global", undefined);
export function getGlobalNamespace(binder: Binder | undefined) {
  if (!binder) {
    return defaultGlobalNamespace;
  }

  let namespace = globalNamespaces.get(binder);

  if (!namespace) {
    namespace = new CSharpNamespaceSymbol("global", undefined, {
      binder,
      isGlobal: true,
    });
    globalNamespaces.set(binder, namespace);
  }

  return namespace;
}
