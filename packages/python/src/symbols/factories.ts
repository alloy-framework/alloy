import { Namekey } from "@alloy-js/core";
import { createPythonSymbol } from "../symbol-creation.js";
import type { PythonOutputSymbol } from "./python-output-symbol.js";
import { usePythonScope } from "./scopes.js";

/**
 * Creates a function symbol in the current scope.
 */
export function createFunctionSymbol(
  name: string | Namekey,
  options: { refkeys?: any } = {},
): PythonOutputSymbol {
  return createPythonSymbol(
    name,
    { instance: false, refkeys: options.refkeys },
    "function",
  );
}

/**
 * Creates a method symbol in a class. Validates that the current scope is a member scope.
 */
export function createMethodSymbol(
  name: string | Namekey,
  options: { refkeys?: any } = {},
): PythonOutputSymbol {
  const scope = usePythonScope();
  if (!scope?.isMemberScope) {
    const displayName = typeof name === "string" ? name : name.name;
    throw new Error(
      `Method "${displayName}" must be declared inside a class (member scope)`,
    );
  }
  return createPythonSymbol(
    name,
    { instance: true, refkeys: options.refkeys },
    "function",
  );
}
