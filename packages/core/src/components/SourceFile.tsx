import { Children, getContext} from "../jsx-runtime.js";

export interface SourceFileProps {
  path: string;
  filetype: string;
  children?: Children[];
}

export function SourceFile(props: SourceFileProps) {
  const context = getContext()!;
  context.meta ??= {}
  context.meta.sourceFile = {
    path: props.path,
    filetype: props.filetype
  };
  return props.children
}