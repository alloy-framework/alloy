import {
  SourceFile as CoreSourceFile,
  Scope,
  createContext,
  mapJoin,
  reactive
} from "@alloyjs/core";

import { Children, memo } from "@alloyjs/core/jsx-runtime";
import { ImportStatement } from "./ImportStatement.js";


export interface SourceFileContext {
  addImport(path: string, type: string): void;
}

export const SourceFileContext = createContext<SourceFileContext>();

export interface SourceFileProps {
  path: string,
  children?: Children
}

export function SourceFile(props: SourceFileProps) {
  const importRecords: Map<string, Set<string>> = reactive(new Map());

  function addImport(path: string, type: string) {
    if (!importRecords.has(path)) {
      importRecords.set(path, new Set());
    }
  
    importRecords.get(path)!.add(type);
  }

  const sfContext: SourceFileContext = {
    addImport
  };

  return <CoreSourceFile path={props.path} filetype="typescript">
    { importRecords.size > 0 ?
      <>
        <ImportStatements records={importRecords} />{"\n"}
      </>
      : undefined
    }
    <SourceFileContext.Provider value={sfContext}>
      <Scope name={props.path} kind="module">
        {props.children}
      </Scope>
    </SourceFileContext.Provider>
  </CoreSourceFile>
}

interface ImportStatementsProps {
  records: Map<string, Set<string>>;
}

function ImportStatements(props: ImportStatementsProps) {
  return memo(() =>
    mapJoin(props.records, (path, types) => (
      <ImportStatement path={path} types={types} />
    ))
  );
}