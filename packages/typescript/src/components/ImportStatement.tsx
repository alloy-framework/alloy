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
  ImportRecords,
  TSPackageScope,
} from "../symbols/index.js";
import { modulePath } from "../utils.js";
import { usePackage } from "./PackageDirectory.js";

export interface ImportStatementsProps {
  records: ImportRecords;
}

export function ImportStatements(props: ImportStatementsProps) {
  const pkg = usePackage();
  const imports = computed(() =>
    [...props.records].sort(([a], [b]) => {
      return a.name.localeCompare(b.name);
    }),
  );

  return mapJoin(
    () => imports.value,
    ([module, importedSymbols]) => {
      let targetPath: string;
      if (pkg?.scope !== module.parent) {
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
  // Split symbols into default vs. named — tracks .target.default and set membership
  const symbolSplit = computed(() => {
    let defaultSym: ImportedSymbol | undefined;
    const named: ImportedSymbol[] = [];
    for (const sym of props.symbols) {
      if (sym.target.default) {
        defaultSym = sym;
      } else {
        named.push(sym);
      }
    }
    return { defaultSym, named };
  });

  // Sorted named imports — tracks .local.name for sort order only
  const sortedNamedImports = computed(() =>
    [...symbolSplit.value.named].sort((a, b) =>
      a.local.name.localeCompare(b.local.name),
    ),
  );

  // Whether all named imports are type-only — isolated to type-flag reads
  const allNamedImportsAreTypes = computed(() => {
    const { named } = symbolSplit.value;
    return (
      named.length > 0 &&
      named.every((nis) => nis.local.isTypeSymbol && !nis.local.isValueSymbol)
    );
  });

  // Extracted before the JSX return so the JSX compiler emits a plain variable
  // reference rather than wrapping it in `_$memo(() => mapJoin(...))`. Component
  // functions in Alloy run ONCE per instance (not on every render), so this
  // `mapJoin(...)` call executes exactly once and `namedImportsList` is stable
  // for the lifetime of the component. The `() => sortedNamedImports.value`
  // getter keeps the list reactive without an extra memo layer.
  const namedImportsList = mapJoin(
    () => sortedNamedImports.value,
    (nis) => (
      <ImportBinding
        importedSymbol={nis}
        inTypeImport={() => allNamedImportsAreTypes.value}
      />
    ),
    {
      joiner: (
        <>
          {","}
          <line />
        </>
      ),
    },
  );

  return (
    <>
      {"import "}
      {() =>
        symbolSplit.value.defaultSym && (
          <>
            <ImportBinding
              default
              importedSymbol={symbolSplit.value.defaultSym}
            />
            {() => symbolSplit.value.named.length > 0 && ", "}
          </>
        )
      }
      {() =>
        symbolSplit.value.named.length > 0 && (
          <>
            {() => allNamedImportsAreTypes.value && "type "}
            <group>
              {"{"}
              <indent>
                <line />
                {namedImportsList}
                <ifBreak>{","}</ifBreak>
              </indent>
              <line />
              {"}"}
            </group>
          </>
        )
      }
      {/* props.path is reactive (may change), so the template literal is kept
          inline — the JSX compiler's _$memo wrapper correctly tracks it. */}
      {` from "${props.path}";`}
    </>
  );
}

interface ImportBindingProps {
  importedSymbol: ImportedSymbol;
  default?: boolean;
  inTypeImport?: () => boolean;
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
      !props.inTypeImport?.() &&
      props.importedSymbol.local.isTypeSymbol &&
      !props.importedSymbol.local.isValueSymbol
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
