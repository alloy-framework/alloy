import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { constantCase, pascalCase, snakeCase } from "change-case";

export type PythonElements =
  | "class"
  | "function"
  | "variable"
  | "constant"
  | "parameter"
  | "method"
  | "module"
  | "enum"
  | "enum-member";

export function createPythonNamePolicy(): NamePolicy<PythonElements> {
  return createNamePolicy((name, element) => {
    switch (element) {
      case "class":
      case "enum":
        return pascalCase(name);
      case "constant":
      case "enum-member":
        return constantCase(name);
      case "module":
        return snakeCase(name).toLowerCase();
      default:
        return snakeCase(name);
    }
  });
}

export function usePythonNamePolicy(): NamePolicy<PythonElements> {
  return useNamePolicy();
}
