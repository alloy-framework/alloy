import * as core from "@alloy-js/core";
import { useNamespace } from "../components/Namespace.jsx";
import { CSharpOutputScope } from "./scopes.js";

// represents a symbol from a .cs file. Class, enum, interface etc.
export interface CSharpOutputSymbol extends core.OutputSymbol {
  scope: CSharpOutputScope;
}

// creates a new C# symbol
export function createCSharpSymbol(props: core.DeclarationProps) {
  const scope = core.useScope() as CSharpOutputScope;

  const namespaceCtx = useNamespace();
  if (!namespaceCtx) {
    throw new Error("symbol must be declared inside a namespace");
  }

  const sym = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: props.name!,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  return sym;
}
