import { ComponentContext, createContext, useContext } from "@alloy-js/core";
import { PackageSymbol } from "../symbols/package.js";

interface PackageContext {
  symbol: PackageSymbol;
}

export const PackageContext: ComponentContext<PackageContext> =
  createContext<PackageContext>();

export function usePackageContext() {
  return useContext(PackageContext);
}
