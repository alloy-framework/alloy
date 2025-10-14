import * as core from "@alloy-js/core";

// might be too early to add this. first let's sync on what the csharp `./symbols` folder holds

export type TypeSpecElements = 
    | "model"
    | "enum"
    | "interface"
    | "union"
    | "alias"
    | "namespace"
    | "operation"
    | "decorator"
    | "template"
    | "function";

// Should we add the regex validation found in components/Name.tsx here instead?
export function createTypeSpecNamePolicy(): core.NamePolicy<TypeSpecElements> {
    return core.createNamePolicy<TypeSpecElements>((name, element) => {
        switch (element) {
            case "model":
            case "enum":
            case "interface":
            case "union":
            case "alias":
            case "namespace":
            case "operation":
            case "decorator":
            case "template":
            case "function":
                return name;
            default:
                throw new Error(`Unhandled TypeSpec element: ${element}`);
        }
    });
}

export function useTypeSpecNamePolicy(): core.NamePolicy<TypeSpecElements> {
    return core.useNamePolicy();
}