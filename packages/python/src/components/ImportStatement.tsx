import {
  computed,
  mapJoin,
  memo,
  SourceDirectoryContext,
  useContext,
} from "@alloy-js/core";
import { relative } from "pathe";
import {
  ImportedSymbol,
  ImportRecords
} from "../symbols/index.js";
import { modulePath } from "../utils.js";

// export interface ImportSymbol {
//   module: string; // The module to import from
//   names?: Array<string | { name: string; alias?: string }>; // Items to import
//   alias?: string; // Alias for the module itself (if importing the whole module)
//   wildcard?: boolean; // If true, use '*'
// }

// export interface ImportStatementsProps {
//   imports: ImportSymbol[];
// }

/**
 * Represents a Python import statement.
 * Generates an import statement for the given module and names.
 */
export interface ImportStatementsProps {
  records: ImportRecords;
}

export function ImportStatements(props: ImportStatementsProps) {
  const imports = computed(() =>
    [...props.records].sort(([a], [b]) => {
      return a.name.localeCompare(b.name);
    }),
  );

  return mapJoin(
    () => imports.value,
    ([module, importedSymbols]) => {
      let targetPath: string;

      // local package import, so need relative import
      const currentDir = useContext(SourceDirectoryContext)!.path;
      // todo: don't allow importing non-exported symbols
      targetPath = modulePath(relative(currentDir, module.name));

      return <ImportStatement path={targetPath} symbols={importedSymbols} />;
    },
  );
}

export interface ImportStatementProps {
  path: string;
  symbols?: Set<ImportedSymbol>;
  pathAlias?: string; // Alias for the module itself (if importing the whole module)
  wildcard?: boolean; // If true, use '*'
}

export function ImportStatement(props: ImportStatementProps) {
  return memo(() => {
    const { path, symbols, pathAlias, wildcard } = props;
    const namedImportSymbols: ImportedSymbol[] = [];

    if (symbols && symbols.size === 0) {
      for (const sym of symbols) {
        namedImportSymbols.push(sym);
      }
    }

    const parts: any[] = [];
    
    if (wildcard) {
      parts.push(`"from ${path} import *"`);
    }
    else if (!symbols || symbols.size === 0) {
      if (pathAlias) {
        parts.push(`import ${path} as ${pathAlias}`);
      } else {
        parts.push(`import ${path}`);
      }
    }
    else {
      namedImportSymbols.sort((a, b) => {
        return a.target.name.localeCompare(b.target.name);
      });
      const importBindings = namedImportSymbols.map(
        (nis) => (
          <ImportBinding
            importedSymbol={nis}
          />
        )
      );

      const formattedNames = mapJoin(
        () => importBindings,
        (ib) => (ib),
        { joiner: ", " },
      );

      parts.push(`from ${module} import ${formattedNames}`);
    }
    return parts;
  });
}

interface ImportBindingProps {
  importedSymbol: ImportedSymbol;
}

function ImportBinding(props: Readonly<ImportBindingProps>) {
  const text = memo(() => {
    const localName = props.importedSymbol.local ? props.importedSymbol.local.name : props.importedSymbol.target.name;
    const targetName = props.importedSymbol.target.name;
    if (localName === targetName) {
      return targetName;
    } else {
      return `${targetName} as ${localName}`;
    }
  });

  return (
    <>
      {text}
    </>
  );
}
