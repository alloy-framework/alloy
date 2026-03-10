import { createSymbol } from "@alloy-js/core";
import { dirname, relative } from "pathe";
import { TSModuleScope, TSOutputSymbol } from "../symbols/index.js";
import { modulePath } from "../utils.js";
import { useSourceFile } from "./SourceFile.js";

export interface ExportStatementProps {
  star?: boolean;
  from?: TSModuleScope;
}

export function ExportStatement(props: ExportStatementProps) {
  if (props.star) {
    const module = useSourceFile();
    const fromPath = modulePath(
      relative(dirname(module.scope.name), props.from!.name),
    );

    const allSymbols = props.from!.getAllSymbols();
    const hasInternalExports = Array.from(allSymbols).some(
      (s) => s.export && s.internal,
    );

    const publicSymbols = props.from!.getPublicSymbols();

    // Propagate all non-internal symbols to the barrel module's exportedSymbols
    // for cross-package refkey resolution. Public symbols will be overwritten
    // below with their deconflicted aliases.
    for (const symbol of allSymbols) {
      if (symbol.internal) continue;
      for (const refkey of symbol.refkeys) {
        module.scope.exportedSymbols.set(refkey, symbol as TSOutputSymbol);
      }
    }

    // If the source module has internal exports but nothing public, skip it.
    if (hasInternalExports && publicSymbols.size === 0) {
      return "";
    }

    // Empty source files (no symbols at all) still get export *.
    if (publicSymbols.size === 0) {
      return <>export * from "{fromPath}";</>;
    }

    // Deduplicate by name within the source module (e.g. a class creates
    // symbols in both values and types spaces with the same name).
    const symbolsByName = new Map<string, TSOutputSymbol[]>();
    for (const sym of publicSymbols) {
      if (!symbolsByName.has(sym.name)) {
        symbolsByName.set(sym.name, []);
      }
      symbolsByName.get(sym.name)!.push(sym);
    }

    // Create re-export alias symbols in the barrel module's values SymbolTable.
    // The SymbolTable's built-in deconfliction handles cross-module name
    // conflicts automatically.
    const aliases: TSOutputSymbol[] = [];
    for (const [, syms] of symbolsByName) {
      const alias = createSymbol(
        TSOutputSymbol,
        syms[0].name,
        module.scope.values,
        {
          binder: module.scope.binder,
          aliasTarget: syms[0],
        },
      );
      aliases.push(alias);

      // Overwrite the direct propagation above with the alias for public
      // symbols so consumers get the deconflicted name.
      for (const sym of syms) {
        for (const refkey of sym.refkeys) {
          module.scope.exportedSymbols.set(refkey, alias);
        }
      }
    }

    // Rendering is reactive: when the SymbolTable deconflicts names, the alias
    // name properties update and this expression re-evaluates.
    return (
      <>
        {() => {
          const hasConflicts = aliases.some((a) => a.name !== a.originalName);

          if (!hasInternalExports && !hasConflicts) {
            return `export * from "${fromPath}";`;
          }

          const names = aliases
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((a) =>
              a.name !== a.originalName ?
                `${a.originalName} as ${a.name}`
              : a.name,
            )
            .join(", ");

          return `export { ${names} } from "${fromPath}";`;
        }}
      </>
    );
  }

  return "";
}
