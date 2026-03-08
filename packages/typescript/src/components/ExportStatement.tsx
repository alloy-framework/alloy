import { createSymbol } from "@alloy-js/core";
import { dirname, relative } from "pathe";
import { TSModuleScope, TSOutputSymbol } from "../symbols/index.js";
import { modulePath } from "../utils.js";
import { useSourceFile } from "./SourceFile.js";

export interface ExportStatementProps {
  star?: boolean;
  from?: TSModuleScope;
  nameConflicts?: Map<string, string>;
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

    const hasConflicts =
      props.nameConflicts !== undefined && props.nameConflicts.size > 0;

    // Propagate non-internal symbols to the barrel module's exported symbols
    // for cross-package reference resolution.
    for (const symbol of allSymbols) {
      if (symbol.internal) continue;

      const alias = props.nameConflicts?.get(symbol.name);
      if (alias) {
        // Create an aliased symbol so consumers import using the aliased name.
        const aliased = createSymbol(TSOutputSymbol, alias, undefined, {});
        for (const refkey of symbol.refkeys) {
          module.scope.exportedSymbols.set(refkey, aliased);
        }
      } else {
        for (const refkey of symbol.refkeys) {
          module.scope.exportedSymbols.set(refkey, symbol as TSOutputSymbol);
        }
      }
    }

    if (!hasInternalExports && !hasConflicts) {
      // No internal exports or name conflicts, use export *
      return <>export * from "{fromPath}";</>;
    }

    // Module has internal exports or name conflicts — use named re-exports
    const publicSymbols = props.from!.getPublicSymbols();

    if (publicSymbols.size === 0) {
      return "";
    }

    const names = Array.from(publicSymbols)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((s) => {
        const alias = props.nameConflicts?.get(s.name);
        return alias ? `${s.name} as ${alias}` : s.name;
      })
      .join(", ");

    return (
      <>
        export {"{"} {names} {"}"} from "{fromPath}";
      </>
    );
  }

  return "";
}
