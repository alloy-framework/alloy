import { OutputScopeOptions, createScope } from "@alloy-js/core";
import { NamedTypeSymbol } from "../symbols/named-type.js";
import { useGoScope } from "./contexts.js";
import { GoFunctionScope } from "./function.js";
import { GoNamedTypeScope } from "./named-type.js";
import { GoSourceFileScope } from "./source-file.js";

export function createNamedTypeScope(
  ownerSymbol: NamedTypeSymbol,
  options: OutputScopeOptions = {},
) {
  const currentScope = useGoScope();
  if (
    !(currentScope instanceof GoNamedTypeScope) &&
    !(currentScope instanceof GoSourceFileScope)
  ) {
    throw new Error(
      "Can't create Go type declaration scope inside of " +
        currentScope.constructor.name,
    );
  }

  return createScope(GoNamedTypeScope, ownerSymbol, currentScope, options);
}

export function createFunctionScope(options: OutputScopeOptions = {}) {
  const parentScope = useGoScope();
  return createScope(GoFunctionScope, "function scope", parentScope, options);
}
