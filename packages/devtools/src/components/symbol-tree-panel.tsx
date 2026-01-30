import { TreeView, type TreeNode } from "@/components/tree-view";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { useFileTextRanges } from "@/hooks/use-file-text-ranges";
import { useGoToSource } from "@/hooks/use-go-to-source";
import { useRenderTreeIndex } from "@/hooks/use-render-tree-index";
import { useRenderTreeQueries } from "@/hooks/use-render-tree-queries";
import { useCallback, useDeferredValue, useState } from "react";

export function SymbolTreePanel() {
  const {
    renderTree,
    symbolTree,
    symbolDetails,
    scopeDetails,
    fileContents,
    fileToRenderNode,
  } = useDebugConnectionContext();
  // Defer trees to prevent blocking user interactions
  const deferredRenderTree = useDeferredValue(renderTree);
  const deferredSymbolTree = useDeferredValue(symbolTree);
  const {
    focusRenderNodeById,
    setHoveredRenderNodeId,
    setSelectedRenderNodeId,
    tabs: {
      activeTabId,
      openTabs,
      setOpenTabs,
      setActiveTabId,
      handleNodeSelect,
      openDetailTab,
    },
  } = useDevtoolsAppStateContext();
  const { parentById, liftedFromMap, fileNodeToId, findLiftedRootForNodeById } =
    useRenderTreeIndex(deferredRenderTree, fileToRenderNode);
  const { collectTextNodesForNode } = useRenderTreeQueries(deferredRenderTree);
  const { computeTextRangesForFile } = useFileTextRanges({
    activeTabId,
    openTabs,
    fileContents,
    fileToRenderNode,
    collectTextNodesForNode,
    findLiftedRootForNode: findLiftedRootForNodeById,
  });
  const { goToSourceForRenderNodeId } = useGoToSource({
    renderTree: deferredRenderTree,
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
  });
  const [menuNode, setMenuNode] = useState<TreeNode | null>(null);

  const handleContextMenu = useCallback((node: TreeNode) => {
    if (node.icon !== "symbol" && node.icon !== "scope") {
      setMenuNode(null);
      return;
    }
    setMenuNode(node);
  }, []);

  const getRenderNodeId = (node: TreeNode) => {
    const details =
      node.icon === "symbol" ?
        symbolDetails.get(node.id)
      : scopeDetails.get(node.id);
    return details?.renderNodeId as number | null | undefined;
  };

  return (
    <ContextMenu
      onOpenChange={(open) => {
        if (!open) setMenuNode(null);
      }}
    >
      <ContextMenuTrigger asChild>
        <div>
          <TreeView
            data={deferredSymbolTree}
            selectedId={activeTabId}
            onSelect={(node) => handleNodeSelect(node, "symbol")}
            onContextMenu={handleContextMenu}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          disabled={!menuNode}
          onSelect={() => {
            if (!menuNode) return;
            goToSourceForRenderNodeId(getRenderNodeId(menuNode));
          }}
        >
          Go to file
        </ContextMenuItem>
        <ContextMenuItem
          disabled={!menuNode}
          onSelect={() => {
            if (!menuNode) return;
            focusRenderNodeById(getRenderNodeId(menuNode) ?? null);
          }}
        >
          Go to render node
        </ContextMenuItem>
        <ContextMenuItem
          disabled={!menuNode}
          onSelect={() => {
            if (!menuNode) return;
            openDetailTab(
              menuNode.id,
              menuNode.label,
              menuNode.icon === "scope" ? "scope" : "symbol",
            );
          }}
        >
          Show details
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
