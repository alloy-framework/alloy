import type { RenderTreeNode } from "@/components/render-tree";
import type { OpenTab } from "@/hooks/use-tabs";
import {
  findFileIdForRenderNode,
  findFirstTextNodeId,
  findRenderNodeInTree,
} from "@/lib/render-tree-utils";
import { useCallback } from "react";

export interface UseGoToSourceOptions {
  renderTree: RenderTreeNode[];
  fileContents: Map<string, { contents: string }>;
  fileToRenderNode: Map<string, string>;
  openTabs: OpenTab[];
  setOpenTabs: (tabs: OpenTab[] | ((tabs: OpenTab[]) => OpenTab[])) => void;
  setActiveTabId: (tabId: string | null) => void;
  setHoveredRenderNodeId: (nodeId: string | null) => void;
  setSelectedRenderNodeId: (nodeId: string | null) => void;
  computeTextRangesForFile: (
    fileId: string,
    renderNodeId: string,
    contents: string,
  ) => Array<{ start: number; end: number; nodeId: string }>;
  fileNodeToId: Map<string, string>;
  parentById: Map<string, string | null>;
  liftedFromMap: Map<string, string>;
}

export function useGoToSource({
  renderTree,
  fileContents,
  fileToRenderNode,
  openTabs,
  setOpenTabs,
  setActiveTabId,
  setHoveredRenderNodeId,
  setSelectedRenderNodeId,
  computeTextRangesForFile,
  fileNodeToId,
  parentById,
  liftedFromMap,
}: UseGoToSourceOptions) {
  const goToSourceForNode = useCallback(
    (node: RenderTreeNode) => {
      const fileId = findFileIdForRenderNode(
        node.id,
        fileNodeToId,
        parentById,
        liftedFromMap,
      );
      if (!fileId) return;
      const label = fileId.split("/").pop() ?? fileId;
      const existingTab = openTabs.find((tab) => tab.id === fileId);
      if (!existingTab) {
        setOpenTabs((prev) => [...prev, { id: fileId, label, type: "file" }]);
      }
      setActiveTabId(fileId);

      const renderNodeId = fileToRenderNode.get(fileId);
      const contents = fileContents.get(fileId)?.contents ?? "";
      if (renderNodeId && contents) {
        computeTextRangesForFile(fileId, renderNodeId, contents);
      }

      const targetTextId =
        node.text !== undefined ? node.id : findFirstTextNodeId(node);
      if (targetTextId) {
        setHoveredRenderNodeId(targetTextId);
        setSelectedRenderNodeId(targetTextId);
      }
      setTimeout(() => {
        if (!targetTextId) return;
        const element = document.querySelector(
          `[data-text-node-id="${targetTextId}"]`,
        );
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
    },
    [
      fileContents,
      fileNodeToId,
      fileToRenderNode,
      liftedFromMap,
      openTabs,
      parentById,
      setActiveTabId,
      setHoveredRenderNodeId,
      setOpenTabs,
      setSelectedRenderNodeId,
      computeTextRangesForFile,
    ],
  );

  const goToSourceForRenderNodeId = useCallback(
    (renderNodeId: number | null | undefined) => {
      if (!renderNodeId) return;
      const node = findRenderNodeInTree(renderTree, String(renderNodeId));
      if (!node) return;
      goToSourceForNode(node);
    },
    [renderTree, goToSourceForNode],
  );

  return { goToSourceForNode, goToSourceForRenderNodeId };
}
