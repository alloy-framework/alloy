import { ContextMenu } from "@/components/context-menu";
import { TreeView, type TreeNode } from "@/components/tree-view";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { useFileTextRanges } from "@/hooks/use-file-text-ranges";
import { useGoToSource } from "@/hooks/use-go-to-source";
import { useRenderTreeIndex } from "@/hooks/use-render-tree-index";
import { useRenderTreeQueries } from "@/hooks/use-render-tree-queries";
import { useCallback, useState } from "react";

export function SymbolTreePanel() {
  const {
    renderTree,
    symbolTree,
    symbolDetails,
    scopeDetails,
    fileContents,
    fileToRenderNode,
  } = useDebugConnectionContext();
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
    useRenderTreeIndex(renderTree, fileToRenderNode);
  const { collectTextNodesForNode } = useRenderTreeQueries(renderTree);
  const { computeTextRangesForFile } = useFileTextRanges({
    activeTabId,
    openTabs,
    fileContents,
    fileToRenderNode,
    collectTextNodesForNode,
    findLiftedRootForNode: findLiftedRootForNodeById,
  });
  const { goToSourceForRenderNodeId } = useGoToSource({
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
  });
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    node: TreeNode | null;
  } | null>(null);

  const handleContextMenu = useCallback(
    (node: TreeNode, event: React.MouseEvent) => {
      if (node.icon !== "symbol" && node.icon !== "scope") return;
      setMenu({ x: event.clientX, y: event.clientY, node });
    },
    [],
  );

  const getRenderNodeId = (node: TreeNode) => {
    const details =
      node.icon === "symbol" ?
        symbolDetails.get(node.id)
      : scopeDetails.get(node.id);
    return details?.renderNodeId as number | null | undefined;
  };

  return (
    <>
      <TreeView
        data={symbolTree}
        selectedId={activeTabId}
        onSelect={(node) => handleNodeSelect(node, "symbol")}
        onContextMenu={handleContextMenu}
      />
      <ContextMenu
        menu={menu ? { x: menu.x, y: menu.y } : null}
        onClose={() => setMenu(null)}
        items={[
          {
            label: "Go to source",
            onClick: () => {
              if (!menu?.node) return;
              goToSourceForRenderNodeId(getRenderNodeId(menu.node));
            },
            disabled: !menu?.node,
          },
          {
            label: "Go to render node",
            onClick: () => {
              if (!menu?.node) return;
              focusRenderNodeById(getRenderNodeId(menu.node) ?? null);
            },
            disabled: !menu?.node,
          },
          {
            label: "Show details",
            onClick: () => {
              if (!menu?.node) return;
              openDetailTab(
                menu.node.id,
                menu.node.label,
                menu.node.icon === "scope" ? "scope" : "symbol",
              );
            },
            disabled: !menu?.node,
          },
        ]}
      />
    </>
  );
}
