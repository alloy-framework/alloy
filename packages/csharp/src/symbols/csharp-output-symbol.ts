import * as core from "@alloy-js/core";
import * as base from "../components/index.js";
import * as symbols from "./index.js";

// represents a symbol from a .cs file. Class, enum, interface etc.
export interface CSharpOutputSymbol extends core.OutputSymbol {
  scope: symbols.CSharpOutputScope;
}

// creates a new C# symbol
export function createCSharpSymbol(props: base.DeclarationProps) {
  const scope = core.useScope() as symbols.CSharpOutputScope;

  const namespaceCtx = base.useNamespace();
  if (!namespaceCtx) {
    throw new Error("symbol must be declared inside a namespace");
  }

  const sym = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: props.name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  return sym;
}
