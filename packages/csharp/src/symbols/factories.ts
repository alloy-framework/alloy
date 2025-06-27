import { OutputSymbolOptions, useBinder } from "@alloy-js/core";
import { useTypeDeclarationScope } from "../contexts/declaration-scope.js";
import { getGlobalNamespace } from "../contexts/global-namespace.js";
import { useEnclosingNamespaceScope } from "../scopes/namespace-scope.js";
import { NamedTypeSymbol, NamedTypeTypeKind } from "./named-type.js";
import { CSharpNamespaceSymbol } from "./namespace.js";

export function createNamedTypeSymbol(
  name: string,
  kind: NamedTypeTypeKind,
  options?: OutputSymbolOptions,
) {
  const scope = useTypeDeclarationScope();
  return new NamedTypeSymbol(name, scope.declarations, kind, options);
}

export function createNamespaceSymbol(name: string) {
  const scope = useEnclosingNamespaceScope();
  const nsSymbol = scope?.namespaceSymbol ?? getGlobalNamespace(useBinder());
  if (nsSymbol.members.symbolNames.has(name)) {
    return nsSymbol.members.symbolNames.get(name)! as CSharpNamespaceSymbol;
  }
  return new CSharpNamespaceSymbol(name, nsSymbol);
}
