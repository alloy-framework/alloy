import {
  Children,
  ComponentDefinition,
  getContext,
} from "@alloy-js/core/jsx-runtime";
import { join } from "pathe";
import { useContext } from "../context.js";
import { Refkey } from "../refkey.js";
import { SourceDirectoryContext } from "../context/source-directory.js";
import { SourceFileContext } from "../context/source-file.js";

export interface SourceFileProps {
  path: string;
  filetype: string;
  children?: Children[];
  reference?: ComponentDefinition<{ refkey: Refkey }>;
}

export function SourceFile(props: SourceFileProps) {
  const parentDirectory = useContext(SourceDirectoryContext)!;
  const context: SourceFileContext = {
    path: join(parentDirectory ? parentDirectory.path : "", props.path),
    filetype: props.filetype,
    reference: props.reference,
  };
  parentDirectory?.addContent(context);
  const nodeContext = getContext()!;
  nodeContext.meta ??= {};
  nodeContext.meta.sourceFile = context;
  return <SourceFileContext.Provider value={context}>
    {props.children}
  </SourceFileContext.Provider>;
}
