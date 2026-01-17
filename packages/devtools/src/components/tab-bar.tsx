import { ContextMenu } from "@/components/context-menu";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { findRenderNodeInTree } from "@/lib/render-tree-utils";
import { cn } from "@/lib/utils";
import { Box, Braces, File as FileIcon, Layers, X } from "lucide-react";
import { useCallback } from "react";

export function TabBar() {
  const { renderTree, fileToRenderNode } = useDebugConnectionContext();
  const {
    requestFocusRenderNode,
    tabs: {
      openTabs,
      activeTabId,
      tabMenu,
      setTabMenu,
      handleTabActivate,
      handleCloseTab,
      closeAllTabs,
      closeOtherTabs,
      closeTabsToRight,
      handleTabBarContextMenu,
    },
  } = useDevtoolsAppStateContext();

  const renderTabIcon = useCallback(
    (tab: { id: string; type: string }) => {
      if (tab.type === "file") return <FileIcon className="size-3" />;
      if (tab.type === "symbol") return <Braces className="size-3" />;
      if (tab.type === "scope") return <Layers className="size-3" />;
      if (tab.type === "component") {
        const node = findRenderNodeInTree(renderTree, tab.id);
        if (node?.name?.startsWith("Context ")) {
          return <Layers className="size-3" />;
        }
        return <Box className="size-3" />;
      }
      return null;
    },
    [renderTree],
  );

  const handleTabMenuGoToRenderNode = useCallback(() => {
    const tab =
      tabMenu?.tabId ?
        openTabs.find((item) => item.id === tabMenu.tabId)
      : undefined;
    if (tab?.type === "file") {
      const renderNodeId = fileToRenderNode.get(tab.id);
      if (renderNodeId) {
        requestFocusRenderNode(renderNodeId);
      }
    }
  }, [tabMenu, openTabs, fileToRenderNode, requestFocusRenderNode]);

  return (
    <>
      <div
        className="flex items-center border-b border-border bg-muted/50 h-9 shrink-0 overflow-x-auto"
        onContextMenu={handleTabBarContextMenu}
      >
        {openTabs.length === 0 ?
          <div className="px-3 text-sm text-muted-foreground">
            No open files
          </div>
        : openTabs.map((tab) => (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => handleTabActivate(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 h-full text-sm border-r border-border hover:bg-accent/50 group",
                activeTabId === tab.id ?
                  "bg-background border-b-2 border-b-primary"
                : "border-b-2 border-b-transparent",
              )}
            >
              <span className="text-muted-foreground">
                {renderTabIcon(tab)}
              </span>
              <span className="truncate max-w-32">{tab.label}</span>
              <span
                onClick={(e) => handleCloseTab(tab.id, e)}
                className="opacity-0 group-hover:opacity-100 hover:bg-muted rounded p-0.5"
              >
                <X className="size-3" />
              </span>
            </button>
          ))
        }
      </div>
      <ContextMenu
        menu={tabMenu ? { x: tabMenu.x, y: tabMenu.y } : null}
        onClose={() => setTabMenu(null)}
        items={(() => {
          const items = [] as Array<{
            label: string;
            onClick: () => void;
            disabled?: boolean;
          }>;
          const tab =
            tabMenu?.tabId ?
              openTabs.find((item) => item.id === tabMenu.tabId)
            : undefined;
          if (tab?.type === "file") {
            items.push({
              label: "Go to render node",
              onClick: handleTabMenuGoToRenderNode,
            });
          }
          items.push({ label: "Close all", onClick: closeAllTabs });
          items.push({
            label: "Close others",
            onClick: closeOtherTabs,
            disabled: !tabMenu?.tabId,
          });
          items.push({
            label: "Close to the right",
            onClick: closeTabsToRight,
            disabled: !tabMenu?.tabId,
          });
          return items;
        })()}
      />
    </>
  );
}
