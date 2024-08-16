import {
  SourceFile as CoreSourceFile,
  Scope,
  SourceDirectoryContext,
  createContext,
  reactive,
  useBinder,
  useContext,
  useScope,
} from "@alloy-js/core";

import { Children } from "@alloy-js/core/jsx-runtime";
import { ImportStatements } from "./ImportStatement.js";
import { join } from "pathe";
import { PackageContext } from "./PackageDirectory.js";
import { createTSModuleScope, TSModuleScope } from "../symbols/index.js";
import { getSourceDirectoryData } from "../source-directory-data.js";
import { Reference } from "./Reference.js";
export interface SourceFileContext {
  scope: TSModuleScope;
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
  const directoryContext = useContext(SourceDirectoryContext)!;
  const sdData = getSourceDirectoryData(directoryContext);
  const currentDir = directoryContext.path;
  const path: string = join(currentDir, props.path);
  const scope = createTSModuleScope(useBinder(), useScope(), path);
  sdData.modules.add(scope);
  const pkg = useContext(PackageContext);
  if (pkg) {
    pkg.scope.addModule(scope);
  }

  const sfContext: SourceFileContext = {
    scope,
  };

  if (props.export) {
    if (pkg) {
      if (typeof props.export === "boolean") {
        pkg.scope.addExport(path, scope);
      } else {
        pkg.scope.addExport(props.export, scope);
      }
    }
  }

  return <CoreSourceFile path={props.path} filetype="typescript" reference={Reference}>
      {scope.importedModules.size > 0 ? (
        <>
          <ImportStatements records={scope.importedModules} />
          {"\n"}
        </>
      ) : undefined}<SourceFileContext.Provider value={sfContext}>
        <Scope value={scope}>{props.children}</Scope>
      </SourceFileContext.Provider>
    </CoreSourceFile>;
}
