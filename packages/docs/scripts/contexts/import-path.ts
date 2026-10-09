import { createContext, type ComponentContext } from "@alloy-js/core";

/**
 * Overrides the import path shown in documentation signatures.
 * When not provided, falls back to getAssociatedPackage()?.name.
 */
export const ImportPathContext: ComponentContext<string> = createContext();
