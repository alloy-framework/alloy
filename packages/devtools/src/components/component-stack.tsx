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
import { useToast } from "@/hooks/use-toast";

export interface ComponentStackEntry {
  name: string;
  renderNodeId?: number;
  source?: {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
  };
  props?: Record<string, unknown>;
}

export interface ComponentStackProps {
  entries: ComponentStackEntry[];
}

export function ComponentStack({ entries }: ComponentStackProps) {
  const { renderTree, fileContents, fileToRenderNode, formatPath } =
    useDebugConnectionContext();
  const {
    requestFocusRenderNode,
    setHoveredRenderNodeId,
    setSelectedRenderNodeId,
    tabs: {
      activeTabId,
      openDetailTab,
      openTab,
      openTabs,
      setOpenTabs,
      setActiveTabId,
    },
  } = useDevtoolsAppStateContext();
  const { toast } = useToast();
  const { findLiftedRootForNodeById, fileNodeToId, parentById, liftedFromMap } =
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

  const openComponent = (entry: ComponentStackEntry) => {
    if (!entry.renderNodeId) return;
    const id = String(entry.renderNodeId);
    openDetailTab(id, entry.name ?? "Component", "component");
    requestFocusRenderNode(id);
  };

  const showNodeInTree = (entry: ComponentStackEntry) => {
    if (!entry.renderNodeId) return;
    requestFocusRenderNode(String(entry.renderNodeId));
  };

  const goToFile = (entry: ComponentStackEntry) => {
    if (entry.renderNodeId !== undefined && entry.renderNodeId !== null) {
      goToSourceForRenderNodeId(entry.renderNodeId);
      return;
    }
    if (!entry.source) return;
    const label =
      formatPath(entry.source.fileName).split("/").pop() ??
      entry.source.fileName;
    openTab({ id: entry.source.fileName, label, type: "file" });
  };

  const copyVscodeCommand = async (entry: ComponentStackEntry) => {
    if (!entry.source) return;
    const command = `code -g ${entry.source.fileName}:${entry.source.lineNumber}:${entry.source.columnNumber}`;
    try {
      await navigator.clipboard.writeText(command);
      toast({ description: "VSCode open command copied" });
    } catch {
      toast({ description: "Unable to copy the VSCode open command." });
    }
  };

  if (entries.length === 0) {
    return (
      <div className="text-sm text-muted-foreground/70 mt-1">
        No component stack available.
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-2">
      {[...entries].reverse().map((entry, index) => {
        const location =
          entry.source ?
            `${formatPath(entry.source.fileName)}:${entry.source.lineNumber}:${entry.source.columnNumber}`
          : undefined;
        const canOpenNode =
          entry.renderNodeId !== undefined && entry.renderNodeId !== null;
        return (
          <ContextMenu key={`${entry.name}-${index}`}>
            <ContextMenuTrigger asChild>
              <div
                className={
                  canOpenNode ?
                    "border border-border rounded p-2 cursor-pointer"
                  : "border border-border rounded p-2"
                }
                onClick={() => {
                  if (canOpenNode) {
                    openComponent(entry);
                  }
                }}
              >
                <div className="flex items-center gap-2 text-sm">
                  {entry.renderNodeId ?
                    <button
                      className="text-primary underline"
                      onClick={() => openComponent(entry)}
                    >
                      {entry.name}
                    </button>
                  : <span className="font-medium">{entry.name}</span>}
                  {entry.renderNodeId && (
                    <span className="text-muted-foreground">
                      #{entry.renderNodeId}
                    </span>
                  )}
                  {location && (
                    <span className="text-xs text-muted-foreground">
                      {location}
                    </span>
                  )}
                </div>
                {entry.props && (
                  <pre className="text-sm mt-2 p-2 rounded bg-muted/40 overflow-auto">
                    {JSON.stringify(entry.props, null, 2)}
                  </pre>
                )}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                disabled={!canOpenNode}
                onSelect={() => openComponent(entry)}
              >
                Open node
              </ContextMenuItem>
              <ContextMenuItem
                disabled={!canOpenNode}
                onSelect={() => showNodeInTree(entry)}
              >
                Show node in render tree
              </ContextMenuItem>
              <ContextMenuItem
                disabled={!entry.source}
                onSelect={() => goToFile(entry)}
              >
                Go to file
              </ContextMenuItem>
              <ContextMenuItem
                disabled={!entry.source}
                onSelect={() => void copyVscodeCommand(entry)}
              >
                Copy VSCode open command
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        );
      })}
    </div>
  );
}
