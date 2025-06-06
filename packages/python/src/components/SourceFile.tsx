import {
  ComponentContext,
  SourceFile as CoreSourceFile,
  SourceFileContext as CoreSourceFileContext,
  createContext,
  createNamedContext,
  OutputSymbol,
  reactive,
  Scope,
  Show,
  SourceDirectoryContext,
  useContext,
} from "@alloy-js/core";
import { join } from "pathe";
import { getSourceDirectoryData } from "../source-directory-data.js";
import { PythonModuleScope } from "../symbols/index.js";
import { Children } from "@alloy-js/core/jsx-runtime";
import { usePythonNamePolicy } from "../name-policy.js";
import { PythonOutputSymbol } from "../symbols/python-output-symbol.js";
import { ImportStatements } from "./ImportStatement.js";
import { Reference } from "./Reference.js";

// export interface SourceFileContext extends CoreSourceFileContext {
//   addImport(symbol: OutputSymbol): string;
//   /** The module name for this file, e.g. 'test' for test.py */
//   module: string;
// }

// export const SourceFileContext: ComponentContext<SourceFileContext> =
//   createContext();

// // Context accessor
// export function useSourceFileContext(): SourceFileContext {
//   return useContext(SourceFileContext)!;
// }

// export interface SourceFileProps {
//   path: string;
//   children?: Children;
// }

// /**
//  * Represents a Python source file.
//  *
//  * Handles imports and top-level declarations.
//  */
// export function SourceFile(props: SourceFileProps) {
//   // Collection of import symbols
//   const importRecords: ImportSymbol[] = reactive([]);
//   // Map a symbol to import name, keep track of already imported symbols
//   const importedSymbols = new Map<OutputSymbol, string>();

//   // Add import to file if not already, returns name of imported symbol
//   function addImport(symbol: PythonOutputSymbol): string {
//     if (importedSymbols.has(symbol)) {
//       return importedSymbols.get(symbol)!;
//     }

//     // Only add import if the symbol is from a different module
//     if (symbol.module && symbol.module !== module) {
//       importRecords.push({
//         module: symbol.module,
//         names: [symbol.name],
//         wildcard: false, // TODO: Handle wildcard imports if needed
//       });
//     }

//     importedSymbols.set(symbol, symbol.name);
//     return symbol.name;
//   }

//   // Derive module name from file path (strip .py extension)
//   const module = usePythonNamePolicy().getName(
//     props.path.replace(/\.py$/, ""),
//     "class",
//   );

//   const sfContext: SourceFileContext = {
//     path: props.path,
//     filetype: "py",
//     addImport,
//     module,
//   };

//   return (
//     <CoreSourceFile path={props.path} filetype="py" reference={Reference}>
//       {importRecords.length > 0 ?
//         <>
//           <ImportStatements imports={importRecords} />
//           <hbr />
//           <hbr />
//         </>
//       : undefined}
//       <SourceFileContext.Provider value={sfContext}>
//         <Scope name={props.path} kind="source-file">
//           {props.children}
//         </Scope>
//       </SourceFileContext.Provider>
//     </CoreSourceFile>
//   );
// }

export interface SourceFileContext {
  scope: PythonModuleScope;
}

export const SourceFileContext: ComponentContext<SourceFileContext> =
  createNamedContext("@alloy-js/python SourceFile");

export function useSourceFile() {
  return useContext(SourceFileContext)!;
}
export interface SourceFileProps {
  path: string;
  children?: Children;
  header?: Children;
  headerComment?: string;
  export?: boolean | string;
}

export function SourceFile(props: SourceFileProps) {
  const directoryContext = useContext(SourceDirectoryContext)!;
  const sdData = getSourceDirectoryData(directoryContext);
  const currentDir = directoryContext.path;
  const path: string = join(currentDir, props.path);
  const scope = new PythonModuleScope(path);
  sdData.modules.add(scope);
  const sfContext: SourceFileContext = {
    scope,
  };

  const header =
    props.header || props.headerComment ?
      <SourceFileHeader
        header={props.header}
        headerComment={props.headerComment}
      />
    : undefined;

  return (
    <CoreSourceFile
      path={props.path}
      filetype="python"
      reference={Reference}
      header={header}
    >
      <Show when={scope.importedModules.size > 0}>
        <ImportStatements records={scope.importedModules} />
        <hbr />
        <hbr />
      </Show>
      <SourceFileContext.Provider value={sfContext}>
        <Scope value={scope}>{props.children}</Scope>
      </SourceFileContext.Provider>
    </CoreSourceFile>
  );
}

export interface SourceFileHeaderProps {
  header?: Children;
  headerComment?: string;
}

// TODO: Consider editing this to use one of the PyDoc components
function SourceFileHeader(props: SourceFileHeaderProps) {
  return (
    <>
      <hbr />
    </>
  );
}
