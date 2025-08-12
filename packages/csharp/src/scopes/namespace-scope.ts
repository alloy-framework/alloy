import { OutputScope, useScope } from "@alloy-js/core";
import type { CSharpNamespaceSymbol } from "../symbols/namespace.js";
import { CSharpNamedTypeScope } from "./named-type.js";
import { CSharpSourceFileScope } from "./source-file-scope.js";

export class CSharpNamespaceScope extends CSharpNamedTypeScope {
  constructor(
    namespaceSymbol: CSharpNamespaceSymbol,
    parentScope?: CSharpNamespaceScope | CSharpSourceFileScope,
  ) {
    super(namespaceSymbol, parentScope, {
      binder: namespaceSymbol.binder,
    });
  }

  get ownerSymbol() {
    return super.ownerSymbol as CSharpNamespaceSymbol;
  }
}

export function createCSharpNamespaceScope(
  namespaceSymbol: CSharpNamespaceSymbol,
) {
  const parentScope = useScope();
  if (
    parentScope &&
    !(
      parentScope instanceof CSharpNamespaceScope ||
      parentScope instanceof CSharpSourceFileScope
    )
  ) {
    throw new Error(
      "Namespaces can only be created within a namespace or source file",
    );
  }

  const scope = new CSharpNamespaceScope(namespaceSymbol, parentScope);

  return scope;
}

export function useEnclosingNamespaceScope(): CSharpNamespaceScope | undefined {
  const currentScope = useScope();
  if (!(currentScope instanceof CSharpNamespaceScope)) {
    return undefined;
  }

  return currentScope;
}

export function useNamespace() {
  let scope: OutputScope | undefined = useScope();
  while (scope) {
    if (scope instanceof CSharpNamespaceScope) {
      return scope;
    }
    scope = scope.parent;
  }

  throw new Error("A namespace is not in scope");
}
