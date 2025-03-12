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
    for (const symbol of props.from!.symbols.values()) {
      for (const refkey of symbol.refkeys) {
        module.scope.exportedSymbols.set(refkey, symbol as TSOutputSymbol);
      }
    }
    return (
      <>
        export * from "
        {modulePath(relative(dirname(module.scope.name), props.from!.name))}";
      </>
    );
  }

  return "";
}
