import * as core from "@alloy-js/core";
import * as base from "./index.js";

// contains the info for the current source file
interface SourceFileContext {
  // adds a namespace to the array of using statements
  addUsing(namespace: string): void;
}

const SourceFileContext = core.createContext<SourceFileContext>();

// returns the current source file
export function useSourceFile(): SourceFileContext | undefined {
  return core.useContext(SourceFileContext) as SourceFileContext;
}

// properties fro creating a C# source file
export interface SourceFileProps {
  path: string;
  using?: Array<string>;
  children?: core.Children;
}

// a C# source file. exists within the context of a namespace
// contains using statements and declarations
export function SourceFile(props: SourceFileProps) {
  const namespaceCtx = base.useNamespace();

  if (!namespaceCtx) {
    throw new Error("SourceFile must be declared inside a namespace");
  }

  const using: Array<string> = core.reactive(new Array<string>());
  if (props.using) {
    using.push(...props.using);
  }

  // adds the specified namespace to the array of using statements.
  // called via SourceFileContext.addUsing when resolving refkeys.
  function addUsing(namespace: string): void {
    if (!using.includes(namespace)) {
      using.push(namespace);
    }
  }

  const sourceFileCtx: SourceFileContext = {
    addUsing,
  };

  return <core.SourceFile path={props.path} filetype="cs" reference={base.Reference}>
      <SourceFileContext.Provider value={sourceFileCtx}>
        <core.Scope name={props.path} kind="source-file">
          {using.length > 0 ? (
            <>
              <base.UsingDirective namespaces={using} />{"\n"}
            </>
          ) : undefined}namespace {namespaceCtx.name}{!props.children && " {}"}{props.children && 
            <>
              {"\n{"}
                {props.children}
              {"}"}
            </>
          }
        </core.Scope>
      </SourceFileContext.Provider>
    </core.SourceFile>;
}
