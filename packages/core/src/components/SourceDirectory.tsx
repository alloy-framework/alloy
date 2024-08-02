import { reactive, shallowReactive } from "@vue/reactivity";
import { createContext, useContext } from "../context.js";
import { Children, getContext } from "../jsx-runtime.js";
import { join } from "pathe";
import { SourceFileContext } from "./SourceFile.js";

export interface SourceDirectoryContext {
  contents: (SourceDirectoryContext | SourceFileContext)[];
  addContent(content: SourceDirectoryContext | SourceFileContext): void;
  path: string;
}

export const SourceDirectoryContext = createContext<SourceDirectoryContext>();

export interface SourceDirectoryProps {
  path: string;
  children?: Children[];
}

export function SourceDirectory({ path, children }: SourceDirectoryProps) {
  const parentDir = useContext(SourceDirectoryContext);
  // todo: this can probably just use context.
  const sdPath = parentDir ? join(parentDir.path, path) : path;
  const nodeContext = getContext()!;
  const context = createSourceDirectoryContext(path, parentDir);

  nodeContext.meta ??= {}
  nodeContext.meta.directory = {
    path: sdPath
  };
  return <SourceDirectoryContext.Provider value={context}>{children}</SourceDirectoryContext.Provider>;
}

function createSourceDirectoryContext(path: string = "./", parentDir?: SourceDirectoryContext): SourceDirectoryContext {
  const contents = shallowReactive([] as any);
  const context: SourceDirectoryContext = {
    path,
    contents,
    addContent(content) {
      contents.push(content);
    },
  }
  if (parentDir) {
    parentDir.addContent(context);
  }

  return context;
}