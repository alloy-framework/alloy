import { createContext, type ComponentContext } from "@alloy-js/core";

export interface PackageDocsContext {
  name: string;
}

export const PackageDocContext: ComponentContext<PackageDocsContext> =
  createContext();
