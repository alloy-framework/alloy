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

    // Propagate non-internal symbols to the barrel module's exported symbols
    // for cross-package reference resolution.
    for (const symbol of allSymbols) {
      if (symbol.internal) continue;
      for (const refkey of symbol.refkeys) {
        module.scope.exportedSymbols.set(refkey, symbol as TSOutputSymbol);
      }
    }

    if (!hasInternalExports) {
      // No internal exports in this module, use export *
      return <>export * from "{fromPath}";</>;
    }

    // Module has internal exports — use named re-exports for public symbols only
    const publicSymbols = props.from!.getPublicSymbols();

    if (publicSymbols.size === 0) {
      return "";
    }

    const names = Array.from(publicSymbols)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((s) => s.name)
      .join(", ");

    return (
      <>
        export {"{"} {names} {"}"} from "{fromPath}";
      </>
    );
  }

  return "";
}
