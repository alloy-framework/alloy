import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "@alloy-js/core";
import { JsonOutputSymbol } from "../symbols/json-symbol.js";

export interface JsonFileContext {
  /** The path of the current JSON file. May be different from the path on disk. */
  path?: string;

  /** The URL of the current JSON file */
  url?: string;

  /** The symbol for the value in this JSON file */
  symbol: JsonOutputSymbol;
}

/**
 * Provides information about the current JSON source file. This context is used
 * to allow references between JSON files.
 */
export const JsonFileContext: ComponentContext<JsonFileContext> =
  createNamedContext<JsonFileContext>("JsonFile");

export function useJsonFileContext(): JsonFileContext | undefined {
  return useContext(JsonFileContext);
}
