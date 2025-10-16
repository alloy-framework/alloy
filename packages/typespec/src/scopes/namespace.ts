import { OutputScope, useScope } from "@alloy-js/core";
import type { NamespaceSymbol } from "../symbols/namespace.js";
import { TypeSpecNamedTypeScope } from "./named-type.js";
import { TypeSpecSourceFileScope } from "./source-file.js";

export class TypeSpecNamespaceScope extends TypeSpecNamedTypeScope {
  constructor(
    namespaceSymbol: NamespaceSymbol,
    parentScope?: TypeSpecNamespaceScope | TypeSpecSourceFileScope,
  ) {
    super(namespaceSymbol, parentScope, {
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
      parentScope instanceof TypeSpecNamespaceScope ||
      parentScope instanceof TypeSpecSourceFileScope
    )
  ) {
    throw new Error(
      "Namespaces can only be created within a namespace or source file",
    );
  }

  const scope = new TypeSpecNamespaceScope(namespaceSymbol, parentScope);

  return scope;
}

export function useEnclosingNamespaceScope(): TypeSpecNamespaceScope | undefined {
  const currentScope = useScope();
  if (!(currentScope instanceof TypeSpecNamespaceScope)) {
    return undefined;
  }

  return currentScope;
}

export function useNamespace() {
  let scope: OutputScope | undefined = useScope();
  while (scope) {
    if (scope instanceof TypeSpecNamespaceScope) {
      return scope;
    }
    scope = scope.parent;
  }

  throw new Error("A namespace is not in scope");
}