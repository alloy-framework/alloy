import { createContext, useContext } from "../context.js";
import { Children, getContext } from "../jsx-runtime.js";
import { join } from "pathe";

export interface SourceDirectoryContext {
  path: string;
}
export const SourceDirectoryContext = createContext<SourceDirectoryContext>({
  path: "./"
})

export interface SourceDirectoryProps {
  path: string;
  children?: Children[];
}

export function SourceDirectory({ path, children }: SourceDirectoryProps) {
  const parentDir = useContext(SourceDirectoryContext)!;
  // todo: this can probably just use context.
  const sdPath = join(parentDir.path, path);
  const context = getContext()!;
  context.meta ??= {}
  context.meta.directory = {
    path: sdPath
  };
  return <SourceDirectoryContext.Provider value={{ path: sdPath }}>{children}</SourceDirectoryContext.Provider>;
}
