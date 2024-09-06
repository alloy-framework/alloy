import * as core from "@alloy-js/core";
import * as changecase from "change-case";

// the context in which the name policy should be applied
export type CSharpElements =
  | "class"
  | "constant"
  | "enum"
  | "enum-member"
  | "function"
  | "interface"
  | "class-member"
  | "class-method"
  | "parameter";

// creates the C# naming policy
export function createCSharpNamePolicy(): core.NamePolicy<CSharpElements> {
  return core.createNamePolicy((name, element) => {
    switch (element) {
      case "class":
      case "enum":
      case "enum-member":
      case "interface":
      case "class-method":
        return changecase.pascalCase(name);
      case "constant":
        return changecase.constantCase(name);
      default:
        return changecase.camelCase(name);
    }
  });
}

// gets the active C# naming policy
export function useCSharpNamePolicy(): core.NamePolicy<CSharpElements> {
  return core.useNamePolicy();
}
