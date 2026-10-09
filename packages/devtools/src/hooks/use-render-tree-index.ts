import { useCallback, useMemo } from "react";

import type { RenderTreeNode } from "@/components/render-tree";
import {
  buildRenderTreeIndex,
  findFileIdForRenderNode,
  findLiftedRootForNode,
  invertFileToRenderNode,
} from "@/lib/render-tree-utils";

export function useRenderTreeIndex(
  renderTree: RenderTreeNode[],
  fileToRenderNode: Map<string, string>,
) {
  const { parentById, liftedFromMap, liftedToMap, nodeById } = useMemo(
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
    (nodeId: string) => findLiftedRootForNode(nodeId, liftedToMap),
    [liftedToMap],
  );

  return {
    parentById,
    liftedFromMap,
    nodeById,
    fileNodeToId,
    findFileIdForRenderNodeById,
    findLiftedRootForNodeById,
  };
}
