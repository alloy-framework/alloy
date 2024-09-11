import {
  createContext,
  useContext,
  type ComponentContext,
} from "@alloy-js/core";
import type { ApiItem } from "@microsoft/api-extractor-model";

export const TsDocContext: ComponentContext<ApiItem> = createContext();
export function useTsDoccontext() {
  return useContext(TsDocContext)!;
}
