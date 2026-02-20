import { computed, mapJoin, memo } from "@alloy-js/core";
import { ImportedSymbol, ImportRecords } from "../symbols/index.js";

export interface ImportStatementsProps {
  records: ImportRecords;
  joinImportsFromSameModule?: boolean;
}

export interface CategorizedImports {
  /** Imports used only in type annotation contexts (for TYPE_CHECKING block) */
  typeImports: ImportRecords;
  /** Regular imports used at runtime */
  valueImports: ImportRecords;
}

/**
 * Categorize import records into type-only and value imports.
 * Type-only imports are those used only in type annotation contexts.
 * Value imports are regular imports used at runtime.
 */
export function categorizeImportRecords(
  records: ImportRecords,
): CategorizedImports {
  const typeImports = new Map() as ImportRecords;
  const valueImports = new Map() as ImportRecords;

  for (const [module, properties] of records) {
    if (!properties.symbols || properties.symbols.size === 0) {
      // Module-level imports without symbols go to value imports
      valueImports.set(module, properties);
      continue;
    }

    const typeSymbols = new Set<ImportedSymbol>();
    const valueSymbols = new Set<ImportedSymbol>();

    for (const sym of properties.symbols) {
      if (sym.local.isTypeOnly) {
        typeSymbols.add(sym);
      } else {
        valueSymbols.add(sym);
      }
    }

    if (typeSymbols.size > 0) {
      typeImports.set(module, { symbols: typeSymbols });
    }
    if (valueSymbols.size > 0) {
      valueImports.set(module, { symbols: valueSymbols });
    }
  }

  return { typeImports, valueImports };
}

/**
 * A component that renders import statements based on the provided import records.
 *
 * @remarks
 * This component will render import statements for each module and its symbols.
 * If `joinImportsFromSameModule` is true, it will group imports from the same module
 * into a single statement.
 */
export function ImportStatements(props: ImportStatementsProps) {
  // Sort the import records by module name
  const imports = computed(() => {
    return [...props.records].sort(([a], [b]) => {
      return a.name.localeCompare(b.name);
    });
  });

  return mapJoin(
    () => imports.value,
    ([module, properties]) => {
      // Only handling absolute imports for now
      const targetPath = module.name;

      if (properties.symbols && properties.symbols.size > 0) {
        // Sort the symbols in a module by the imported name
        const sortedSymbols = Array.from(properties.symbols).sort((a, b) =>
          a.local.name.localeCompare(b.local.name),
        );
        if (props.joinImportsFromSameModule) {
          // If joinImportsFromSameModule is true, we will group imports from the same module
          return (
            <ImportStatement
              path={targetPath}
              symbols={new Set(sortedSymbols)}
            />
          );
        } else {
          return sortedSymbols.map((symbol, idx, arr) => (
            <>
              <ImportStatement path={targetPath} symbols={new Set([symbol])} />
              {/*@once*/ idx < arr.length - 1 && <hbr />}
            </>
          ));
        }
      } else {
        // If no symbols are specified, it's either a wildcard import or a module import
        return (
          <ImportStatement path={targetPath} symbols={properties.symbols} />
        );
      }
    },
  );
}

export interface ImportStatementProps {
  path: string;
  symbols?: Set<ImportedSymbol>;
}

/**
 * A Python import statement.
 *
 * @remarks
 * This component renders an import statement for a given path and symbols.
 * If no symbols are provided, it will render a simple import statement.
 * If symbols are provided, it will render an import statement with the specified symbols.
 *
 * @example
 * ```tsx
 * <ImportStatement path="os" />
 * <ImportStatement path="math" symbols={new Set([new ImportedSymbol("sqrt", "sqrt")])} />
 * ```
 * This will generate:
 * ```python
 * import os
 * from math import sqrt
 * ```
 */
export function ImportStatement(props: ImportStatementProps) {
  return memo(() => {
    const { path, symbols } = props;
    const importSymbols: ImportedSymbol[] = [];

    if (symbols && symbols.size > 0) {
      for (const sym of symbols) {
        importSymbols.push(sym);
      }
    }

    const parts: any[] = [];

    if (!symbols || symbols.size === 0) {
      parts.push(`import ${path}`);
    } else {
      importSymbols.sort((a, b) => {
        return a.target.name.localeCompare(b.target.name);
      });
      parts.push(`from ${path} import `);
      parts.push(
        mapJoin(
          () => importSymbols,
          (nis) => <ImportBinding importedSymbol={nis} />,
          { joiner: ", " },
        ),
      );
    }
    return parts;
  });
}

interface ImportBindingProps {
  importedSymbol: ImportedSymbol;
}

function ImportBinding(props: Readonly<ImportBindingProps>) {
  const text = memo(() => {
    const localName = props.importedSymbol.local.name;
    const targetName = props.importedSymbol.target.name;
    if (localName === targetName) {
      return targetName;
    } else {
      return `${targetName} as ${localName}`;
    }
  });

  return <>{text()}</>;
}
