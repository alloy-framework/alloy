import { Children, getContext } from "@alloy-js/core/jsx-runtime";
import { shallowReactive } from "@vue/reactivity";
import { join } from "pathe";
import { createContext, useContext } from "../context.js";
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

export function SourceDirectory(props: SourceDirectoryProps) {
  const parentDir = useContext(SourceDirectoryContext);
  // todo: this can probably just use context.
  const sdPath = parentDir ? join(parentDir.path, props.path) : props.path;
  const nodeContext = getContext()!;
  const context = createSourceDirectoryContext(props.path, parentDir);

  nodeContext.meta ??= {};
  nodeContext.meta.directory = {
    path: sdPath,
  };
  return <SourceDirectoryContext.Provider value={context}>{props.children}</SourceDirectoryContext.Provider>;
}

function createSourceDirectoryContext(
  path: string = "./",
  parentDir?: SourceDirectoryContext,
): SourceDirectoryContext {
  const contents = shallowReactive([] as any);
  const context: SourceDirectoryContext = {
    path,
    contents,
    addContent(content) {
      contents.push(content);
    },
  };
  if (parentDir) {
    parentDir.addContent(context);
  }

  return context;
}
