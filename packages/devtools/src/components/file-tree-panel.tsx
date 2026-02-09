import { TreeView, type TreeNode } from "@/components/tree-view";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { useCallback, useDeferredValue, useState } from "react";

export function FileTreePanel() {
  const { fileTree, fileToRenderNode } = useDebugConnectionContext();
  // Defer the file tree to prevent blocking user interactions
  const deferredFileTree = useDeferredValue(fileTree);
  const {
    requestFocusRenderNode,
    tabs: { activeTabId, handleNodeSelect },
  } = useDevtoolsAppStateContext();
  const [menuNode, setMenuNode] = useState<TreeNode | null>(null);

  const handleContextMenu = useCallback((node: TreeNode) => {
    if (node.icon !== "file") {
      setMenuNode(null);
      return;
    }
    setMenuNode(node);
  }, []);

  const handleGoToRenderNode = useCallback(() => {
    const fileId = menuNode?.id;
    if (!fileId) return;
    const renderNodeId = fileToRenderNode.get(fileId);
    if (renderNodeId) {
      requestFocusRenderNode(renderNodeId);
    }
  }, [menuNode, fileToRenderNode, requestFocusRenderNode]);

  return (
    <ContextMenu
      onOpenChange={(open: boolean) => {
        if (!open) setMenuNode(null);
      }}
    >
      <ContextMenuTrigger asChild>
        <div>
          <TreeView
            data={deferredFileTree}
            selectedId={activeTabId}
            onSelect={(node) => handleNodeSelect(node, "file")}
            onContextMenu={handleContextMenu}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          disabled={!menuNode}
          onSelect={() => {
            handleGoToRenderNode();
          }}
        >
          Go to render node
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
