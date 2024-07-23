import {
  SourceFile as CoreSourceFile,
  OutputSymbol,
  Scope,
  SourceDirectoryContext,
  computed,
  createContext,
  mapJoin,
  reactive,
  useContext,
} from "@alloy-js/core";

import { Children, effect, memo } from "@alloy-js/core/jsx-runtime";
import {
  ImportRecords,
  ImportStatement,
  ImportStatements,
} from "./ImportStatement.js";
import { relative, join, normalize } from "pathe";
import { usePackage } from "./PackageDirectory.jsx";
export interface SourceFileContext {
  addImport(symbol: OutputSymbol, currentPath: string): string;
}

export const SourceFileContext = createContext<SourceFileContext>();

export interface SourceFileProps {
  path: string;
  children?: Children;
  export?: boolean | string;
}

export function SourceFile(props: SourceFileProps) {
  const importRecords: ImportRecords = reactive(new Map());
  const importedSymbols = new Map<OutputSymbol, string>();
  const localImportNames = new Set<string>();

  // todo: this is probably recreating this set a lot, could be more optimal.
  effect(() => {
    for (const record of importRecords.values()) {
      if (record.default) {
        localImportNames.add(record.default.localName);
      }

      for (const named of record.named) {
        localImportNames.add(named.localName);
      }
    }
  });

  function addImport(targetSymbol: OutputSymbol, currentPath: string): string {
    if (importedSymbols.has(targetSymbol)) {
      return importedSymbols.get(targetSymbol)!;
    }

    // todo: don't allow importing non-exported symbols
    let targetPath = relative(currentPath, targetSymbol.scope.name);
    if (targetPath[0] !== ".") {
      targetPath = "./" + targetPath;
    }
    
    if (!importRecords.has(targetPath)) {
      importRecords.set(targetPath, { named: new Set() });
    }

    const record = importRecords.get(targetPath)!;
    let localName: string;
    if (localImportNames.has(targetSymbol.name)) {
      let suffix = 1;
      let baseName = targetSymbol.name;
      while (localImportNames.has(baseName + "_" + suffix)) {
        suffix++;
      }
      localName = baseName + "_" + suffix;
    } else {
      localName = targetSymbol.name;
    }
    if ((targetSymbol.meta as any).default) {
      record.default = {
        bindingName: targetSymbol.name,
        localName: localName,
      };
    } else {
      record.named.add({ bindingName: targetSymbol.name, localName: localName });
    }

    importedSymbols.set(targetSymbol, localName);

    return localName;
  }

  const sfContext: SourceFileContext = {
    addImport,
  };

  const currentDir = useContext(SourceDirectoryContext)!.path;
  const path = join(currentDir, props.path);

  if (props.export) {
    const pkg = usePackage();
    if (typeof props.export === "boolean") {
      pkg.addExport(path, path);
    } else {
      pkg.addExport(props.export, path);
    }
    
  }

  return (
    <CoreSourceFile path={props.path} filetype="typescript">
      {importRecords.size > 0 ? (
        <>
          <ImportStatements records={importRecords} />
          {"\n"}
        </>
      ) : undefined}<SourceFileContext.Provider value={sfContext}>
        <Scope name={path} kind="module">
          {props.children}
        </Scope>
      </SourceFileContext.Provider>
    </CoreSourceFile>
  );
}
