import { Children } from "@alloy-js/core/jsx-runtime";
import { createContext, OutputSymbol, reactive, Scope, SourceFile as CoreSourceFile } from "@alloy-js/core";
import { ImportStatements, ImportSymbol } from "./ImportStatement.js";
import { JavaOutputSymbol } from "../symbols.js";

export interface SourceFileContext {
  addImport(symbol: OutputSymbol): string;
}

export const SourceFileContext = createContext<SourceFileContext>();

export interface SourceFileProps {
  path: string;
  children?: Children;
}

/**
 * Represents a Java source file.
 *
 * Handles top level package declaration, as well as importing other sources
 */
export function SourceFile(props: SourceFileProps) {
  // Collection of import symbols
  const importRecords: ImportSymbol[] = reactive([]);
  // Map a symbol to import name, keep track of already imported symbols
  const importedSymbols = new Map<OutputSymbol, string>;

  // Add import to file if not already, returns name of imported symbol
  function addImport(symbol: JavaOutputSymbol): string {
    if (importedSymbols.has(symbol)) {
      return importedSymbols.get(symbol)!;
    }

    importRecords.push({
      package: symbol.package,
      name: symbol.name,
      wildcard: false // TODO
    });
    importedSymbols.set(symbol, symbol.name);

    return symbol.name;
  }

  const sfContext: SourceFileContext = {
    addImport
  };

  return (
    <CoreSourceFile path={props.path} filetype="java">
      {importRecords.length > 0 ? (
        <>
          <ImportStatements imports={importRecords} />
          {"\n"}
        </>
      ) : undefined}<SourceFileContext.Provider value={sfContext}>
        <Scope name={props.path} kind="source-file">
          {props.children}
        </Scope>
      </SourceFileContext.Provider>
    </CoreSourceFile>
  );
}