import {
  computed,
  mapJoin,
  memo,
  SourceDirectoryContext,
  useContext,
  useScope,
} from "@alloy-js/core";
import {
  ImportedSymbol,
  ImportRecords,
  TSModuleScope,
  TSOutputSymbol,
  TSPackageScope,
} from "../symbols/index.js";
import { usePackage } from "./PackageDirectory.js";
import { relative } from "pathe";
import { modulePath } from "../utils.js";

export interface ImportStatementsProps {
  records: ImportRecords;
}

export function ImportStatements(props: ImportStatementsProps) {
  const pkg = usePackage();

  return memo(() => {
    // todo: may be able to remove this (was just making sure to trigger
    // reactivity based on props.record).
    props.records.size;
    return mapJoin(props.records, (module, importedSymbols) => {
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
    });
  });
}

export interface ImportStatementProps {
  path: string;
  symbols: Set<ImportedSymbol>;
}

export function ImportStatement(props: ImportStatementProps) {
  return memo(() => {
    let defaultImportSymbol: ImportedSymbol | undefined = undefined;
    let namedImportSymbols: ImportedSymbol[] = [];

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
      parts.push("{ ");
      parts.push(
        mapJoin(
          namedImportSymbols,
          (nis) => <ImportBinding importedSymbol={nis} />,
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
}

function ImportBinding(props: ImportBindingProps) {
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

  return text;
}
