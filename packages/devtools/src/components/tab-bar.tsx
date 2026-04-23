import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { findRenderNodeInTree } from "@/lib/render-tree-utils";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  Box,
  Braces,
  File as FileIcon,
  Layers,
  Tag,
  X,
} from "lucide-react";
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
      if (tab.type === "symbol") return <Tag className="size-3" />;
      if (tab.type === "scope") return <Braces className="size-3" />;
      if (tab.type === "component") {
        const node = findRenderNodeInTree(renderTree, tab.id);
        if (node?.name?.startsWith("Context ")) {
          return <Layers className="size-3" />;
        }
        return <Box className="size-3" />;
      }
      if (tab.type === "error") {
        return <AlertTriangle className="size-3" />;
      }
      if (tab.type === "diagnostic") {
        return <AlertCircle className="size-3" />;
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
    <ContextMenu
      onOpenChange={(open: boolean) => {
        if (!open) setTabMenu(null);
      }}
    >
      <ContextMenuTrigger asChild>
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
                onAuxClick={(e) => {
                  if (e.button === 1) handleCloseTab(tab.id, e);
                }}
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
                  className="ml-1 rounded p-0.5 hover:bg-muted-foreground/20"
                >
                  <X className="size-3" strokeWidth={2} />
                </span>
              </button>
            ))
          }
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {(() => {
          const tab =
            tabMenu?.tabId ?
              openTabs.find((item) => item.id === tabMenu.tabId)
            : undefined;
          return (
            <>
              {tab?.type === "file" && (
                <>
                  <ContextMenuItem onSelect={handleTabMenuGoToRenderNode}>
                    Go to render node
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                </>
              )}
              <ContextMenuItem onSelect={closeAllTabs}>
                Close all
              </ContextMenuItem>
              <ContextMenuItem
                disabled={!tabMenu?.tabId}
                onSelect={closeOtherTabs}
              >
                Close others
              </ContextMenuItem>
              <ContextMenuItem
                disabled={!tabMenu?.tabId}
                onSelect={closeTabsToRight}
              >
                Close to the right
              </ContextMenuItem>
            </>
          );
        })()}
      </ContextMenuContent>
    </ContextMenu>
  );
}
