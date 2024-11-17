import { getContextForRenderNode, RenderTextTree } from "@alloy-js/core";
import { AnnotatedNode, OutputDirectory, OutputFile } from "./types";

export async function annotated(
  tree: RenderTextTree,
): Promise<OutputDirectory> {
  const rootDirectory: OutputDirectory = {
    kind: "directory",
    contents: [],
    path: "./",
  };

  collectSourceFiles(rootDirectory, tree);

  return rootDirectory;
}

function renderTree(tree: RenderTextTree): AnnotatedNode[] {
  return tree.flatMap((rendered) => {
    if (Array.isArray(rendered)) {
      const context = getContextForRenderNode(rendered);

      if (!context?.componentOwner) {
        return renderTree(rendered);
      }

      return {
        rendered: renderTree(rendered),
        component: context.componentOwner.component.name,
        props: { ...context.componentOwner.props, children: undefined },
        implementation: context.componentOwner.component.toString(),
      };
    }

    return rendered;
  });
}

function collectSourceFiles(
  currentDirectory: OutputDirectory,
  root: RenderTextTree,
): void {
  if (!Array.isArray(root)) {
    return;
  }
  const context = getContextForRenderNode(root);

  if (
    context?.meta?.directory &&
    context.meta?.directory.path !== "." &&
    context.meta?.directory.path !== "./"
  ) {
    const directory: OutputDirectory = {
      kind: "directory",
      path: context.meta?.directory.path,
      contents: [],
    };

    currentDirectory.contents.push(directory);
    for (const child of root) {
      collectSourceFiles(directory, child as RenderTextTree);
    }
    return;
  }

  if (context?.meta?.sourceFile) {
    if (!currentDirectory) {
      // This shouldn't happen if you're using the Output component.
      throw new Error(
        "Source file doesn't have parent directory. Make sure you have used the Output component.",
      );
    }
    const sourceFile: OutputFile = {
      kind: "file",
      path: context.meta?.sourceFile.path,
      filetype: context.meta?.sourceFile.filetype,
      contents: renderTree(root),
    };

    currentDirectory.contents.push(sourceFile);
    return;
  }

  for (const child of root) {
    collectSourceFiles(currentDirectory, child as RenderTextTree);
  }
}
