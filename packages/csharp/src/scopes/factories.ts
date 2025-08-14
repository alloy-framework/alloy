import { OutputScopeOptions } from "@alloy-js/core";
import { NamedTypeSymbol } from "../symbols/named-type.js";
import { CSharpClassScope } from "./class.js";
import { useCSharpScope, useNamedTypeScope } from "./contexts.js";
import { CSharpMethodScope } from "./method.js";
import { CSharpNamedTypeScope } from "./named-type.js";
import { CSharpSourceFileScope } from "./source-file.js";

export function createNamedTypeScope(
  ownerSymbol: NamedTypeSymbol,
  options: OutputScopeOptions = {},
) {
  const currentScope = useCSharpScope();
  if (
    !(currentScope instanceof CSharpNamedTypeScope) &&
    !(currentScope instanceof CSharpSourceFileScope)
  ) {
    throw new Error(
      "Can't create C# type declaration scope inside of " +
        currentScope.constructor.name,
    );
  }

  return new CSharpNamedTypeScope(ownerSymbol, currentScope, options);
}

export function createClassScope(
  ownerSymbol: NamedTypeSymbol,
  options: OutputScopeOptions = {},
) {
  const currentScope = useCSharpScope();
  if (
    !(currentScope instanceof CSharpNamedTypeScope) &&
    !(currentScope instanceof CSharpSourceFileScope)
  ) {
    throw new Error(
      "Can't create C# class scope inside of " + currentScope.constructor.name,
    );
  }
  return new CSharpClassScope(ownerSymbol, currentScope, options);
}
export function createMethodScope(options: OutputScopeOptions = {}) {
  const parentScope = useNamedTypeScope();
  return new CSharpMethodScope("method scope", parentScope, options);
}
