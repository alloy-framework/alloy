import { ContextMenu } from "@/components/context-menu";
import { TreeView, type TreeNode } from "@/components/tree-view";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { useCallback, useState } from "react";

export function FileTreePanel() {
  const { fileTree, fileToRenderNode } = useDebugConnectionContext();
  const {
    requestFocusRenderNode,
    tabs: { activeTabId, handleNodeSelect },
  } = useDevtoolsAppStateContext();
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    node: TreeNode | null;
  } | null>(null);

  const handleContextMenu = useCallback(
    (node: TreeNode, event: React.MouseEvent) => {
      if (node.icon !== "file") return;
      setMenu({ x: event.clientX, y: event.clientY, node });
    },
    [],
  );

  const handleGoToRenderNode = useCallback(() => {
    const fileId = menu?.node?.id;
    if (!fileId) return;
    const renderNodeId = fileToRenderNode.get(fileId);
    if (renderNodeId) {
      requestFocusRenderNode(renderNodeId);
    }
  }, [menu, fileToRenderNode, requestFocusRenderNode]);

  return (
    <>
      <TreeView
        data={fileTree}
        selectedId={activeTabId}
        onSelect={(node) => handleNodeSelect(node, "file")}
        onContextMenu={handleContextMenu}
      />
      <ContextMenu
        menu={menu ? { x: menu.x, y: menu.y } : null}
        onClose={() => setMenu(null)}
        items={[
          {
            label: "Go to render node",
            onClick: handleGoToRenderNode,
            disabled: !menu?.node,
          },
        ]}
      />
    </>
  );
}
