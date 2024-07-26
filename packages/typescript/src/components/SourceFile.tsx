import {
  SourceFile as CoreSourceFile,
  OutputSymbol,
  Scope,
  SourceDirectoryContext,
  computed,
  createContext,
  mapJoin,
  reactive,
  useBinder,
  useContext,
  useScope,
} from "@alloy-js/core";

import { Children, effect, memo } from "@alloy-js/core/jsx-runtime";
import {
  ImportRecords,
  ImportStatement,
  ImportStatements,
} from "./ImportStatement.js";
import { relative, join, normalize } from "pathe";
import { usePackage } from "./PackageDirectory.js";
import { TSModuleScope, TSOutputSymbol, TSPackageScope } from "../symbols.js";
import { modulePath } from "../utils.js";
import { getSourceDirectoryData } from "../source-directory-data.js";
export interface SourceFileContext {
  scope: TSModuleScope;
  addImport(symbol: TSOutputSymbol, pkg?: TSPackageScope, publicPath?: string): string;
}

export const SourceFileContext = createContext<SourceFileContext>();
export function useSourceFile() {
  return useContext(SourceFileContext)!;
}
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

  function addImport(targetSymbol: TSOutputSymbol, pkg?: TSPackageScope, publicPath?: string): string {
    if (importedSymbols.has(targetSymbol)) {
      return importedSymbols.get(targetSymbol)!;
    }

    let targetPath: string;

    if (pkg) {
      targetPath = pkg.name + publicPath!.slice(1)
    } else {
      const currentPath = useContext(SourceDirectoryContext)!.path;
      // todo: don't allow importing non-exported symbols
      targetPath = modulePath(relative(currentPath, targetSymbol.scope.name));
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
    if (targetSymbol.default) {
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
  
  const directoryContext = useContext(SourceDirectoryContext)!;
  const sdData = getSourceDirectoryData(directoryContext);
  const currentDir = directoryContext.path;
  const path: string = join(currentDir, props.path);
  const scope = useBinder().createScope<TSModuleScope>("module", path, useScope(), {
    exportedSymbols: reactive(new Map())
  })
  sdData.modules.add(scope);
  
  const sfContext: SourceFileContext = {
    scope,
    addImport,
  };

  if (props.export) {
    const pkg = usePackage();
    if (typeof props.export === "boolean") {
      pkg.addExport(path, scope);
    } else {
      pkg.addExport(props.export, scope);
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
        <Scope value={scope}>
          {props.children}
        </Scope>
      </SourceFileContext.Provider>
    </CoreSourceFile>
  );
}
