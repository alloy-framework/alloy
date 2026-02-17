import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";

export type TypeSpecElements =
  | "alias"
  | "scalar"
  | "decorator"
  | "enum"
  | "interface"
  | "model-property"
  | "model"
  | "namespace"
  | "operation"
  | "template"
  | "union";

export function createTypeSpecNamePolicy(): NamePolicy<TypeSpecElements> {
  return createNamePolicy<TypeSpecElements>((name, element) => {
    switch (element) {
      case "alias":
      case "scalar":
      case "enum":
      case "interface":
      case "model-property":
      case "model":
      case "decorator":
      case "namespace":
      case "operation":
      case "union": {
        const invalidNameRegex =
          /(?:^model$)|(?:^enum$)|(?:^never$)|(?:^null$)|(?:^unknown$)|[-./[\]]/;
        if (invalidNameRegex.test(name)) {
          return `\`${name}\``;
        }
        return name;
      }
      default:
        throw new Error(`Unhandled TypeSpec element: ${element}`);
    }
  });
}

export function useTypeSpecNamePolicy(): NamePolicy<TypeSpecElements> {
  return useNamePolicy();
}
