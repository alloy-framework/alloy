import {
  createContext,
  useContext,
  type ComponentContext,
} from "@alloy-js/core";
import type { ApiItem } from "../model/index.js";

export const TsDocContext: ComponentContext<ApiItem> = createContext();
export function useTsDoccontext() {
  return useContext(TsDocContext)!;
}
