import { useContext } from "../context.js";
import { Children, getContext} from "../jsx-runtime.js";
import { join } from "pathe";
import { SourceDirectoryContext } from "./SourceDirectory.js";

export interface SourceFileProps {
  path: string;
  filetype: string;
  children?: Children[];
}

export function SourceFile(props: SourceFileProps) {
  const parentDirectory = useContext(SourceDirectoryContext)!;
  const context = getContext()!;
  context.meta ??= {}
  context.meta.sourceFile = {
    path: join(parentDirectory.path, props.path),
    filetype: props.filetype
  };
  return props.children
}