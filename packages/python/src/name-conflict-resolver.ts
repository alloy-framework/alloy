import { OutputSymbol } from "@alloy-js/core";
import { PythonOutputSymbol } from "./symbols/python-output-symbol.js";

export function pythonNameConflictResolver(_: string, symbols: OutputSymbol[]) {
  if (symbols.length === 0) return;
  // Clear any prior deconflict rename on the first symbol so it reverts to
  // the plain name once a collision is resolved.
  symbols[0].deconflictedName = undefined;
  for (let i = 1; i < symbols.length; i++) {
    const symbol = symbols[i] as PythonOutputSymbol;
    // Rename all but the first symbol to have a suffix of _2, _3, plus the scope name if available.
    symbol.deconflictedName =
      symbol.originalName +
      "_" +
      (i + 1) +
      "_" +
      (symbol.aliasTarget?.scope?.name ?? symbol.module ?? "");
  }
}
