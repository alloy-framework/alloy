import {
  createContext,
  useContext,
  type ComponentContext,
} from "@alloy-js/core";
import { LIVRSchema } from "../schema.js";

interface LIVRContext {
  schema: LIVRSchema;
}

// Add explicit return type annotation
export const LIVRContext: ComponentContext<LIVRContext> =
  createContext<LIVRContext>();

export function useLivr(): LIVRContext {
  return useContext(LIVRContext)!;
}

export function createLIVRContext(schema: LIVRSchema): LIVRContext {
  return { schema };
}
