import { Children } from "@alloy-js/core/jsx-runtime";
import {
  createContext,
  OutputSymbol,
  reactive,
  Scope,
  SourceFile as CoreSourceFile,
} from "@alloy-js/core";
import { ImportStatements, ImportSymbol } from "./ImportStatement.js";
import { usePackage } from "./PackageDirectory.js";
import { Reference } from "./Reference.js";
import { JavaOutputSymbol } from "../symbols/index.js";

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
  const packageCtx = usePackage();

  if (!packageCtx) {
    throw new Error("SourceFile must be declared inside a package");
  }

  // Collection of import symbols
  const importRecords: ImportSymbol[] = reactive([]);
  // Map a symbol to import name, keep track of already imported symbols
  const importedSymbols = new Map<OutputSymbol, string>();

  // Add import to file if not already, returns name of imported symbol
  function addImport(symbol: JavaOutputSymbol): string {
    if (importedSymbols.has(symbol)) {
      return importedSymbols.get(symbol)!;
    }

    // Only need to import if not in same package, or comes from java.lang
    if (
      symbol.package !== packageCtx?.qualifiedName ||
      symbol.package?.startsWith("java.lang")
    ) {
      importRecords.push({
        package: symbol.package ?? "",
        name: symbol.name,
        wildcard: false, // TODO
      });
    }
    importedSymbols.set(symbol, symbol.name);

    return symbol.name;
  }

  const sfContext: SourceFileContext = {
    addImport,
  };

  return <CoreSourceFile path={props.path} filetype="java" reference={Reference}>
      package {packageCtx.qualifiedName};

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
    </CoreSourceFile>;
}
