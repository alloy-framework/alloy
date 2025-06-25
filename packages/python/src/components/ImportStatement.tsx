import { computed, mapJoin, memo } from "@alloy-js/core";
import { ImportedSymbol, ImportRecords } from "../symbols/index.js";

export interface ImportStatementsProps {
  records: ImportRecords;
  joinImportsFromSameModule?: boolean;
}

export function ImportStatements(props: ImportStatementsProps) {
  // Sort the import records by module name
  const imports = computed(() =>
    [...props.records].sort(([a], [b]) => {
      return a.name.localeCompare(b.name);
    }),
  );

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
              {idx < arr.length - 1 && <hbr />}
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
