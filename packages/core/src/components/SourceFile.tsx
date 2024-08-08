import { createContext, useContext } from "../context.js";
import { Children, ComponentDefinition, getContext} from "@alloy-js/core/jsx-runtime";
import { join } from "pathe";
import { SourceDirectoryContext } from "./SourceDirectory.js";
import { Refkey } from "../refkey.js";

export interface SourceFileProps {
  path: string;
  filetype: string;
  children?: Children[];
  reference?: ComponentDefinition<{refkey: Refkey}>;
}

export interface SourceFileContext {
  path: string;
  filetype: string;
  reference?: ComponentDefinition<{refkey: Refkey}>;
}

export const SourceFileContext = createContext<SourceFileContext>()

export function SourceFile(props: SourceFileProps) {
  const parentDirectory = useContext(SourceDirectoryContext)!;
  const context: SourceFileContext = {
    path: join(parentDirectory ? parentDirectory.path : "", props.path),
    filetype: props.filetype,
    reference: props.reference
  }
  parentDirectory?.addContent(context);
  const nodeContext = getContext()!;
  nodeContext.meta ??= {}
  nodeContext.meta.sourceFile = context;
  return <SourceFileContext.Provider value={context}>
    {props.children}
  </SourceFileContext.Provider>
}