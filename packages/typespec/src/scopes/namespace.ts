import { OutputScope, useScope } from "@alloy-js/core";
import type { NamespaceSymbol } from "../symbols/namespace.js";
import { TypeSpecNamedTypeScope } from "./named-type.js";
import { SourceFileScope } from "./source-file.js";

export class NamespaceScope extends OutputScope {
  constructor(
    namespaceSymbol: NamespaceSymbol,
    parentScope?: NamespaceScope | SourceFileScope,
  ) {
    super(namespaceSymbol.name, parentScope, {
      ownerSymbol: namespaceSymbol,
      binder: namespaceSymbol.binder,
    });
  }

  get ownerSymbol() {
    return super.ownerSymbol as NamespaceSymbol;
  }
}

export function createTypeSpecNamespaceScope(namespaceSymbol: NamespaceSymbol) {
  const parentScope = useScope();
  if (
    parentScope &&
    !(
      parentScope instanceof NamespaceScope ||
      parentScope instanceof SourceFileScope
    )
  ) {
    throw new Error(
      "Namespaces can only be created within a namespace or source file",
    );
  }

  const scope = new NamespaceScope(namespaceSymbol, parentScope);

  return scope;
}

export function useEnclosingNamespaceScope(): NamespaceScope | undefined {
  const currentScope = useScope();
  if (!(currentScope instanceof NamespaceScope)) {
    return undefined;
  }

  return currentScope;
}

export function useNamespace() {
  let scope: OutputScope | undefined = useScope();
  while (scope) {
    if (scope instanceof NamespaceScope) {
      return scope;
    }
    scope = scope.parent;
  }

  throw new Error("A namespace is not in scope");
}