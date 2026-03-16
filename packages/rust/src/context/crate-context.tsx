import { ComponentContext, createContext, useContext } from "@alloy-js/core";
import { RustCrateScope } from "../scopes/rust-crate-scope.js";

export interface CrateContextValue {
  scope: RustCrateScope;
  name: string;
  version?: string;
  edition: string;
  crateType: "lib" | "bin";
}

export const CrateContext: ComponentContext<CrateContextValue> =
  createContext();

export function useCrateContext() {
  return useContext(CrateContext);
}
