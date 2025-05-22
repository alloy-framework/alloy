import * as core from "@alloy-js/core";
import { useNamespace } from "../components/Namespace.jsx";
import { CSharpOutputScope } from "./scopes.js";

// represents a symbol from a .cs file. Class, enum, interface etc.

export class CSharpOutputSymbol extends core.OutputSymbol {
  get scope() {
    return super.scope as CSharpOutputScope;
  }
  set scope(value: CSharpOutputScope) {
    super.scope = value;
  }

  constructor(name: string, options?: core.OutputSymbolOptions) {
    const namespaceCtx = useNamespace();
    if (!namespaceCtx) {
      throw new Error("symbol must be declared inside a namespace");
    }
    super(name, options);
  }
}
