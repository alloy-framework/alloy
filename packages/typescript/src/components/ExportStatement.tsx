import { dirname, relative } from "pathe";
import { TSModuleScope, TSOutputSymbol } from "../symbols.js";
import { useSourceFile } from "./SourceFile.js";
import { modulePath } from "../utils.js";

export interface ExportStatementProps {
  star?: boolean;
  from?: TSModuleScope;
}

export function ExportStatement(props: ExportStatementProps) {
  if (props.star) {
    const module = useSourceFile();
    for (const symbol of props.from!.symbols.values()) {
      module.scope.exportedSymbols.set(symbol.refkey, symbol as TSOutputSymbol);
    }
    return <>export * from "{modulePath(relative(dirname(module.scope.name), props.from!.name))}";</>;
  }

  return "";
}
