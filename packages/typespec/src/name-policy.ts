import * as core from "@alloy-js/core";

// might be too early to add this. first let's sync on what the csharp `./symbols` folder holds

export type TypeSpecElements = 
    | "alias"
    | "decorator"
    | "enum"
    | "interface"
    | "model-property"
    | "model"
    | "namespace"
    | "operation"
    | "template"
    | "union";

// Should we add the regex validation found in components/Name.tsx here instead?
export function createTypeSpecNamePolicy(): core.NamePolicy<TypeSpecElements> {
    return core.createNamePolicy<TypeSpecElements>((name, element) => {
        switch (element) {
            case "alias":
            case "enum":
            case "interface":
            case "model-property":
            case "model":
            case "union":
                const invalidNameRegex =
                    /(?:^model$)|(?:^enum$)|(?:^never$)|(?:^null$)|(?:^unknown$)|[-./[\]]/;
                if (invalidNameRegex.test(name)) {
                    return `\`${name}\``;
                }
                return name;
            case "decorator":
            case "namespace":
            case "operation":
            case "template":
                return name;
            default:
                throw new Error(`Unhandled TypeSpec element: ${element}`);
        }
    });
}

export function useTypeSpecNamePolicy(): core.NamePolicy<TypeSpecElements> {
    return core.useNamePolicy();
}