import {
  mapJoin,
  memo,
  SourceDirectoryContext,
  useContext,
} from "@alloy-js/core";
import { relative } from "pathe";
import {
  ImportedSymbol,
  ImportRecords,
  TSPackageScope,
  TSSymbolFlags,
} from "../symbols/index.js";
import { modulePath } from "../utils.js";
import { usePackage } from "./PackageDirectory.js";

export interface ImportStatementsProps {
  records: ImportRecords;
}

export function ImportStatements(props: ImportStatementsProps) {
  const pkg = usePackage();

  return mapJoin(
    () => props.records,
    (module, importedSymbols) => {
      let targetPath: string;

      if (
        (pkg && pkg.scope !== module.parent) ||
        (!pkg && module.parent!.kind !== "global")
      ) {
        // importing from another package, so let's calculate the import.
        const targetPackage = module.parent as TSPackageScope;
        let foundPath: string | false = false;
        for (const [
          publicPath,
          exportedModule,
        ] of targetPackage.exportedSymbols) {
          // a module could be exported from multiple paths, so here
          // would be the place to handle that.

          if (exportedModule === module) {
            foundPath = publicPath;
          }
        }

        if (!foundPath) {
          throw new Error("Module not exported from package");
        }

        targetPath = targetPackage.name + foundPath.slice(1);
      } else {
        // local package import, so need relative import
        const currentDir = useContext(SourceDirectoryContext)!.path;
        // todo: don't allow importing non-exported symbols
        targetPath = modulePath(relative(currentDir, module.name));
      }

      return <ImportStatement path={targetPath} symbols={importedSymbols} />;
    },
  );
}

export interface ImportStatementProps {
  path: string;
  symbols: Set<ImportedSymbol>;
}

export function ImportStatement(props: ImportStatementProps) {
  return memo(() => {
    let defaultImportSymbol: ImportedSymbol | undefined = undefined;
    const namedImportSymbols: ImportedSymbol[] = [];

    for (const sym of props.symbols) {
      if (sym.target.default) {
        defaultImportSymbol = sym;
      } else {
        namedImportSymbols.push(sym);
      }
    }

    const parts: any[] = ["import "];
    if (defaultImportSymbol) {
      parts.push(
        <ImportBinding default importedSymbol={defaultImportSymbol} />,
      );
      if (namedImportSymbols.length > 0) {
        parts.push(", ");
      }
    }

    if (namedImportSymbols.length > 0) {
      const allNamedImportsAreTypes = namedImportSymbols.every(
        (nis) => nis.target.tsFlags & TSSymbolFlags.TypeSymbol,
      );

      if (allNamedImportsAreTypes) {
        parts.push("type ");
      }
      parts.push("{ ");
      parts.push(
        mapJoin(
          () => namedImportSymbols,
          (nis) => (
            <ImportBinding
              importedSymbol={nis}
              inTypeImport={allNamedImportsAreTypes}
            />
          ),
          { joiner: ", " },
        ),
      );
      parts.push(" }");
    }
    parts.push(` from "${props.path}";`);

    return parts;
  });
}

interface ImportBindingProps {
  importedSymbol: ImportedSymbol;
  default?: boolean;
  inTypeImport?: boolean;
}

function ImportBinding(props: Readonly<ImportBindingProps>) {
  const text = memo(() => {
    const localName = props.importedSymbol.local.name;
    const targetName = props.importedSymbol.target.name;
    if (localName === targetName) {
      return targetName;
    } else if (props.default) {
      return localName;
    } else {
      return `${targetName} as ${localName}`;
    }
  });

  const prefix = memo(() =>
    (
      !props.inTypeImport &&
      props.importedSymbol.local.tsFlags & TSSymbolFlags.TypeSymbol
    ) ?
      "type "
    : "",
  );
  return (
    <>
      {prefix}
      {text}
    </>
  );
}
