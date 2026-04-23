import { OutputSymbol } from "@alloy-js/core";
import { PythonOutputSymbol } from "./symbols/python-output-symbol.js";

export function pythonNameConflictResolver(_: string, symbols: OutputSymbol[]) {
  for (let i = 1; i < symbols.length; i++) {
    const symbol = symbols[i] as PythonOutputSymbol;
    // Rename all but the first symbol to have a suffix of _2, _3, plus the scope name if available.
    symbol.name =
      symbol.originalName +
      "_" +
      (i + 1) +
      "_" +
      (symbol.aliasTarget?.scope?.name ?? symbol.module ?? "");
  }
}
