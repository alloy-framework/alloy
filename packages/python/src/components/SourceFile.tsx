import {
  ComponentContext,
  SourceFile as CoreSourceFile,
  SourceFileContext as CoreSourceFileContext,
  createContext,
  OutputSymbol,
  reactive,
  Scope,
  useContext,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { usePythonNamePolicy } from "../name-policy.js";
import { PythonOutputSymbol } from "../symbols/python-output-symbol.js";
import { ImportStatements, ImportSymbol } from "./ImportStatement.js";
import { Reference } from "./Reference.js";

export interface SourceFileContext extends CoreSourceFileContext {
  addImport(symbol: OutputSymbol): string;
  /** The module name for this file, e.g. 'test' for test.py */
  module: string;
}

export const SourceFileContext: ComponentContext<SourceFileContext> =
  createContext();

// Context accessor
export function useSourceFileContext(): SourceFileContext {
  return useContext(SourceFileContext)!;
}

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

    // Only add import if the symbol is from a different module
    if (symbol.module && symbol.module !== module) {
      importRecords.push({
        module: symbol.module,
        names: [symbol.name],
        wildcard: false, // TODO: Handle wildcard imports if needed
      });
    }

    importedSymbols.set(symbol, symbol.name);
    return symbol.name;
  }

  // Derive module name from file path (strip .py extension)
  const module = usePythonNamePolicy().getName(
    props.path.replace(/\.py$/, ""),
    "class",
  );

  const sfContext: SourceFileContext = {
    path: props.path,
    filetype: "py",
    addImport,
    module,
  };

  return (
    <CoreSourceFile path={props.path} filetype="py" reference={Reference}>
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
