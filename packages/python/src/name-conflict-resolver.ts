import { PythonOutputSymbol } from "./symbols/python-output-symbol.js";

export function pythonNameConflictResolver(
  _: string,
  symbols: PythonOutputSymbol[],
) {
  for (let i = 1; i < symbols.length; i++) {
    // Rename all but the first symbol to have a suffix of _2, _3, plus the scope name if available.
    const symbol = symbols[i] as unknown as {
      originalName: string;
      name: string;
      module?: string;
    };
    symbol.name =
      symbol.originalName +
      "_" +
      (i + 1) +
      "_" +
      (symbols[i].aliasTarget?.scope?.name ?? symbol.module ?? "");
  }
}
