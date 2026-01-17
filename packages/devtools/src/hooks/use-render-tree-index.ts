import type { RenderTreeNode } from "@/components/render-tree";
import {
  buildRenderTreeIndex,
  findFileIdForRenderNode,
  findLiftedRootForNode,
  invertFileToRenderNode,
} from "@/lib/render-tree-utils";
import { useCallback, useMemo } from "react";

export function useRenderTreeIndex(
  renderTree: RenderTreeNode[],
  fileToRenderNode: Map<string, string>,
) {
  const { parentById, liftedFromMap } = useMemo(
    () => buildRenderTreeIndex(renderTree),
    [renderTree],
  );
  const fileNodeToId = useMemo(
    () => invertFileToRenderNode(fileToRenderNode),
    [fileToRenderNode],
  );

  const findFileIdForRenderNodeById = useCallback(
    (nodeId: string) =>
      findFileIdForRenderNode(nodeId, fileNodeToId, parentById, liftedFromMap),
    [fileNodeToId, parentById, liftedFromMap],
  );

  const findLiftedRootForNodeById = useCallback(
    (nodeId: string) => findLiftedRootForNode(nodeId, liftedFromMap),
    [liftedFromMap],
  );

  return {
    parentById,
    liftedFromMap,
    fileNodeToId,
    findFileIdForRenderNodeById,
    findLiftedRootForNodeById,
  };
}
