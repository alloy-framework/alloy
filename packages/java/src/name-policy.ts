import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { camelCase, constantCase, pascalCase } from "change-case";

export type JavaElements =
  | "class"
  | "interface"
  | "enum"
  | "enum-member"
  | "function"
  | "parameter"
  | "constant"
  | "variable"
  | "method";

export function createJavaNamePolicy(): NamePolicy<JavaElements> {
  return createNamePolicy((name, element) => {
    switch (element) {
      case "class":
      case "interface":
      case "enum":
        return pascalCase(name);
      case "enum-member":
      case "constant":
        return constantCase(name);
      default:
        return camelCase(name);
    }
  });
}

export function useJavaNamePolicy(): NamePolicy<JavaElements> {
  return useNamePolicy();
}
