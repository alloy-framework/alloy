import { OutputScope, useScope } from "@alloy-js/core";
import type { CSharpNamespaceSymbol } from "../symbols/namespace.js";
import { CSharpSourceFileScope } from "./source-file-scope.js";
import { CSharpTypeDeclarationScope } from "./type-declaration-scope.js";

export class CSharpNamespaceScope extends CSharpTypeDeclarationScope {
  // don't need any declarations spaces because we'll just get that from the
  // namespace symbol.
  public static readonly declarationSpaces = [];

  #namespaceSymbol: CSharpNamespaceSymbol;
  get namespaceSymbol() {
    return this.#namespaceSymbol;
  }

  get enclosingNamespace() {
    return this.#namespaceSymbol.enclosingNamespace;
  }

  constructor(
    namespaceSymbol: CSharpNamespaceSymbol,
    parentScope?: CSharpNamespaceScope | CSharpSourceFileScope,
  ) {
    super(namespaceSymbol.name, parentScope, {
      binder: namespaceSymbol.binder,
    });
    this.#namespaceSymbol = namespaceSymbol;
  }

  /**
   * The scope where type declarations are stored.
   */
  get declarations() {
    return this.#namespaceSymbol.members;
  }
}

const namespaceScopes = new WeakMap<
  CSharpNamespaceSymbol,
  CSharpNamespaceScope
>();

export function createCSharpNamespaceScope(
  namespaceSymbol: CSharpNamespaceSymbol,
) {
  let parentScope = useScope();
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
