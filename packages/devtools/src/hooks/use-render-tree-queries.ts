import type { RenderTreeNode } from "@/components/render-tree";
import {
  collectTextNodes,
  findRenderNodeInTree,
} from "@/lib/render-tree-utils";
import { useCallback } from "react";

export function useRenderTreeQueries(renderTree: RenderTreeNode[]) {
  const findRenderNode = useCallback(
    (nodeId: string): RenderTreeNode | undefined =>
      findRenderNodeInTree(renderTree, nodeId),
    [renderTree],
  );

  const collectTextNodesForNode = useCallback(
    (nodeId: string) => {
      const root = findRenderNode(nodeId);
      if (!root) return [] as Array<{ id: string; text: string }>;
      return collectTextNodes(root);
    },
    [findRenderNode],
  );

  return { findRenderNode, collectTextNodesForNode };
}
