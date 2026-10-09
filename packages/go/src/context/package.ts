import type { ComponentContext } from "@alloy-js/core";
import { createContext, useContext } from "@alloy-js/core";

import type { PackageSymbol } from "../symbols/package.js";

interface PackageContext {
  symbol: PackageSymbol;
}

export const PackageContext: ComponentContext<PackageContext> =
  createContext<PackageContext>();

export function usePackageContext() {
  return useContext(PackageContext);
}
