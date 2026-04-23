import { join } from "pathe";
import { useContext } from "../context.js";
import { SourceDirectoryContext } from "../context/source-directory.js";
import { getContext, shallowReactive } from "../reactivity.js";
import type { Children } from "../runtime/component.js";

export interface SourceDirectoryProps {
  path: string;
  children?: Children;
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
  return (
    <SourceDirectoryContext.Provider value={context}>
      {props.children}
    </SourceDirectoryContext.Provider>
  );
}

function createSourceDirectoryContext(
  path: string = "./",
  parentDir?: SourceDirectoryContext,
): SourceDirectoryContext {
  const contents = shallowReactive([] as any);
  const context: SourceDirectoryContext = {
    path: parentDir ? join(parentDir.path, path) : path,
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
