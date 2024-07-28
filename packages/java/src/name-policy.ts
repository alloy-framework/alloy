import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { camelCase, pascalCase } from "change-case";

// TODO: All possible definitions
export type JavaElements =
  | "class"
  | "interface"
  | "enum"
  | "function"
  | "parameter"
  | "constant"


export function createJavaNamePolicy(): NamePolicy<JavaElements> {
  return createNamePolicy((name, element) => {
    switch (element) {
      case "class":
      case "interface":
      case "enum":
        return pascalCase(name);
      default:
        return camelCase(name);
    }
  });
}

export function useJavaNamePolicy(): NamePolicy<JavaElements> {
  return useNamePolicy();
}
