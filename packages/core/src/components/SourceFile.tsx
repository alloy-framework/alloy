import { createContext, useContext } from "../context.js";
import { Children, getContext} from "../jsx-runtime.js";
import { join } from "pathe";
import { SourceDirectoryContext } from "./SourceDirectory.js";

export interface SourceFileProps {
  path: string;
  filetype: string;
  children?: Children[];
}

export interface SourceFileContext {
  path: string;
  filetype: string;
}

const SourceFileContext = createContext<SourceFileContext>()

export function SourceFile(props: SourceFileProps) {
  const parentDirectory = useContext(SourceDirectoryContext)!;
  const context: SourceFileContext = {
    path: join(parentDirectory.path, props.path),
    filetype: props.filetype
  }
  parentDirectory.addContent(context);
  const nodeContext = getContext()!;
  nodeContext.meta ??= {}
  nodeContext.meta.sourceFile = context;
  return <SourceFileContext.Provider value={context}>{props.children}</SourceFileContext.Provider>
}