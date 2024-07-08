import { Children, getContext } from "../jsx-runtime.js";

export interface SourceDirectoryProps {
  path: string;
  children?: Children[];
}

export function SourceDirectory({ path, children }: SourceDirectoryProps) {
  const context = getContext()!;
  context.meta ??= {}
  context.meta.directory = {
    path
  };
  return children;
}
