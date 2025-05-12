import {
  ComponentContext,
  SourceFile as CoreSourceFile,
  createContext,
  OutputSymbol,
  reactive,
  Scope,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { PythonOutputSymbol } from "../symbols/python-output-symbol.js";
import { ImportStatements, ImportSymbol } from "./ImportStatement.js";

export interface SourceFileContext {
  addImport(symbol: OutputSymbol): string;
}

export const SourceFileContext: ComponentContext<SourceFileContext> =
  createContext();

export interface SourceFileProps {
  path: string;
  children?: Children;
}

/**
 * Represents a Python source file.
 *
 * Handles imports and top-level declarations.
 */
export function SourceFile(props: SourceFileProps) {
  // Collection of import symbols
  const importRecords: ImportSymbol[] = reactive([]);
  // Map a symbol to import name, keep track of already imported symbols
  const importedSymbols = new Map<OutputSymbol, string>();

  // Add import to file if not already, returns name of imported symbol
  function addImport(symbol: PythonOutputSymbol): string {
    if (importedSymbols.has(symbol)) {
      return importedSymbols.get(symbol)!;
    }

    importRecords.push({
      module: symbol.module ?? "",
      names: [symbol.name],
      wildcard: false, // TODO: Handle wildcard imports if needed
    });

    importedSymbols.set(symbol, symbol.name);
    return symbol.name;
  }

  const sfContext: SourceFileContext = {
    addImport,
  };

  return (
    <CoreSourceFile path={props.path} filetype="py">
      {importRecords.length > 0 ?
        <>
          <ImportStatements imports={importRecords} />
          <hbr />
        </>
      : undefined}
      <SourceFileContext.Provider value={sfContext}>
        <Scope name={props.path} kind="source-file">
          {props.children}
        </Scope>
      </SourceFileContext.Provider>
    </CoreSourceFile>
  );
}
