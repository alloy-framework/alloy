import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { camelCase, pascalCase } from "change-case";

export type TypeScriptElements =
  | "function"
  | "parameter"
  | "class"
  | "variable"
  | "object-member-data"
  | "object-member-getter"
  | "class-member-data"
  | "class-member-getter"
  | "interface"
  | "interface-member"
  | "type";

export function createTSNamePolicy(): NamePolicy<TypeScriptElements> {
  return createNamePolicy((name, element) => {
    switch (element) {
      case "class":
      case "type":
      case "interface":
        return pascalCase(name);
      default:
        return camelCase(name);
    }
  });
}

export function useTSNamePolicy(): NamePolicy<TypeScriptElements> {
  return useNamePolicy();
}
