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
import { findFileIdForRenderNode } from "@/lib/render-tree-utils";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export interface RenderTreeNode {
  id: string;
  name: string;
  props?: Record<string, unknown>;
  children?: RenderTreeNode[];
  text?: string; // For text nodes
  fileId?: string; // Maps to a file in the file tree
  kind?: string;
  liftedFrom?: string;
  source?: {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
  };
}

export interface RenderTreeHandle {
  focusNode: (nodeId: string) => void;
  expandToNode: (nodeId: string) => void;
}

export interface RenderTreeProps {
  className?: string;
}

// Build a map of node id -> parent path for quick ancestor lookup
function buildAncestorMap(
  nodes: RenderTreeNode[],
  parentPath: string[] = [],
): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const node of nodes) {
    map.set(node.id, parentPath);
    if (node.children) {
      const childMap = buildAncestorMap(node.children, [
        ...parentPath,
        node.id,
      ]);
      childMap.forEach((value, key) => map.set(key, value));
    }
  }
  return map;
}

export const RenderTree = forwardRef<RenderTreeHandle, RenderTreeProps>(
  function RenderTree({ className }, ref) {
    const { renderTree, fileContents, fileToRenderNode, sendMessage } =
      useDebugConnectionContext();
    const {
      selectedRenderNodeId,
      setSelectedRenderNodeId,
      setHoveredRenderNodeId,
      tabs: { openTabs, setOpenTabs, setActiveTabId },
    } = useDevtoolsAppStateContext();
    const {
      parentById,
      liftedFromMap,
      fileNodeToId,
      findLiftedRootForNodeById,
    } = useRenderTreeIndex(renderTree, fileToRenderNode);
    const { collectTextNodesForNode } = useRenderTreeQueries(renderTree);
    const { computeTextRangesForFile } = useFileTextRanges({
      activeTabId: null,
      openTabs,
      fileContents,
      fileToRenderNode,
      collectTextNodesForNode,
      findLiftedRootForNode: findLiftedRootForNodeById,
    });
    const { goToSourceForNode } = useGoToSource({
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
    const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
      const initial = new Set<string>();
      for (const node of renderTree) {
        initial.add(node.id);
        if (node.children) {
          for (const child of node.children) {
            initial.add(child.id);
          }
        }
      }
      return initial;
    });

    const ancestorMap = useMemo(
      () => buildAncestorMap(renderTree),
      [renderTree],
    );
    const nodeRef = useRef<HTMLDivElement>(null);
    const focusedNodeRef = useRef<string | null>(null);
    const [menuNode, setMenuNode] = useState<RenderTreeNode | null>(null);

    const toggleExpanded = useCallback((nodeId: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(nodeId)) {
          next.delete(nodeId);
        } else {
          next.add(nodeId);
        }
        return next;
      });
    }, []);

    const expandToNode = useCallback(
      (nodeId: string) => {
        const ancestors = ancestorMap.get(nodeId);
        if (ancestors) {
          setExpandedIds((prev) => {
            const next = new Set(prev);
            for (const ancestorId of ancestors) {
              next.add(ancestorId);
            }
            return next;
          });
        }
      },
      [ancestorMap],
    );

    const focusNode = useCallback(
      (nodeId: string) => {
        expandToNode(nodeId);
        focusedNodeRef.current = nodeId;
        // Scroll to node after expansion. Retry a few frames to wait for DOM update.
        const scrollToNode = (attemptsLeft: number) => {
          const element = document.querySelector(
            `[data-render-node-id="${nodeId}"]`,
          );
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
          if (attemptsLeft > 0) {
            requestAnimationFrame(() => scrollToNode(attemptsLeft - 1));
          }
        };
        requestAnimationFrame(() => scrollToNode(6));
      },
      [expandToNode],
    );

    const handleRenderNodeSelect = useCallback(
      (node: RenderTreeNode) => {
        if (node.text !== undefined) {
          const fileId = findFileIdForRenderNode(
            node.id,
            fileNodeToId,
            parentById,
            liftedFromMap,
          );
          if (fileId) {
            const label = fileId.split("/").pop() ?? fileId;
            const existingTab = openTabs.find((tab) => tab.id === fileId);
            if (!existingTab) {
              setOpenTabs((prev) => [
                ...prev,
                { id: fileId, label, type: "file" },
              ]);
            }
            setActiveTabId(fileId);
            const contents = fileContents.get(fileId)?.contents ?? "";
            const renderNodeId = fileToRenderNode.get(fileId);
            if (renderNodeId && contents) {
              computeTextRangesForFile(fileId, renderNodeId, contents);
            }
            setHoveredRenderNodeId(node.id);
            setSelectedRenderNodeId(node.id);
            setTimeout(() => {
              const element = document.querySelector(
                `[data-text-node-id="${node.id}"]`,
              );
              element?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 0);
          }
          return;
        }

        setSelectedRenderNodeId(node.id);

        const existingTab = openTabs.find((tab) => tab.id === node.id);
        if (existingTab) {
          setActiveTabId(node.id);
          return;
        }

        setOpenTabs((prev) => [
          ...prev,
          { id: node.id, label: node.name, type: "component" },
        ]);
        setActiveTabId(node.id);
      },
      [
        computeTextRangesForFile,
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
      ],
    );

    const handleNodeContextMenu = useCallback((node: RenderTreeNode) => {
      setMenuNode(node);
    }, []);

    const handleShowDetails = useCallback(
      (node: RenderTreeNode) => {
        handleRenderNodeSelect(node);
      },
      [handleRenderNodeSelect],
    );

    const handleRerender = useCallback(
      (node: RenderTreeNode, withBreak: boolean) => {
        const id = Number(node.id);
        if (!Number.isFinite(id)) return;
        sendMessage({
          type: withBreak ? "render:rerenderAndBreak" : "render:rerender",
          id,
        });
      },
      [sendMessage],
    );

    useImperativeHandle(ref, () => ({ focusNode, expandToNode }), [
      focusNode,
      expandToNode,
    ]);

    return (
      <ContextMenu
        onOpenChange={(open: boolean) => {
          if (!open) setMenuNode(null);
        }}
      >
        <ContextMenuTrigger asChild>
          <div ref={nodeRef} className={cn("text-xs font-mono", className)}>
            {renderTree.map((node) => (
              <RenderTreeNodeItem
                key={node.id}
                node={node}
                level={0}
                expandedIds={expandedIds}
                selectedId={selectedRenderNodeId}
                onToggle={toggleExpanded}
                onSelect={handleRenderNodeSelect}
                onContextMenu={handleNodeContextMenu}
              />
            ))}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            disabled={!menuNode}
            onSelect={() => {
              if (menuNode) {
                goToSourceForNode(menuNode);
              }
            }}
          >
            Go to file
          </ContextMenuItem>
          <ContextMenuItem
            disabled={!menuNode}
            onSelect={() => {
              if (menuNode) {
                handleShowDetails(menuNode);
              }
            }}
          >
            Show details
          </ContextMenuItem>
          <ContextMenuItem
            disabled={!menuNode}
            onSelect={() => {
              if (menuNode) {
                handleRerender(menuNode, false);
              }
            }}
          >
            Rerender
          </ContextMenuItem>
          <ContextMenuItem
            disabled={!menuNode}
            onSelect={() => {
              if (menuNode) {
                handleRerender(menuNode, true);
              }
            }}
          >
            Rerender and Break
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
);

interface RenderTreeNodeItemProps {
  node: RenderTreeNode;
  level: number;
  expandedIds: Set<string>;
  selectedId?: string | null;
  onToggle: (id: string) => void;
  onSelect?: (node: RenderTreeNode) => void;
  onContextMenu?: (node: RenderTreeNode, event: React.MouseEvent) => void;
}

const RenderTreeNodeItem = memo(function RenderTreeNodeItem({
  node,
  level,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
  onContextMenu,
}: RenderTreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = node.id === selectedId;

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggle(node.id);
    },
    [node.id, onToggle],
  );

  const handleSelect = useCallback(() => {
    onSelect?.(node);
  }, [node, onSelect]);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      onContextMenu?.(node, event);
    },
    [node, onContextMenu],
  );

  // Text nodes render differently
  if (node.text !== undefined) {
    return (
      <div
        data-render-node-id={node.id}
        className={cn(
          "py-0.5 px-1 cursor-pointer hover:bg-accent/50 rounded-sm flex items-center",
          isSelected && "bg-accent text-accent-foreground",
        )}
        style={{ paddingLeft: `${level * 16 + 20}px` }}
        onClick={handleSelect}
        onContextMenu={handleContextMenu}
      >
        <span className="text-muted-foreground">"</span>
        <span className="text-green-600 dark:text-green-400 truncate">
          {node.text}
        </span>
        <span className="text-muted-foreground">"</span>
      </div>
    );
  }

  return (
    <div data-render-node-id={node.id}>
      {/* Opening tag line */}
      <div
        className={cn(
          "py-0.5 px-1 cursor-pointer hover:bg-accent/50 rounded-sm flex items-start gap-0.5",
          isSelected && "bg-accent text-accent-foreground",
        )}
        style={{ paddingLeft: `${level * 16 + 4}px` }}
        onClick={handleSelect}
        onContextMenu={handleContextMenu}
      >
        {/* Expand/collapse toggle */}
        <span
          className="shrink-0 w-4 flex items-center justify-center mt-0.5"
          onClick={handleToggle}
        >
          {hasChildren ?
            isExpanded ?
              <ChevronDown className="size-3" />
            : <ChevronRight className="size-3" />
          : null}
        </span>

        {/* Tag content */}
        <span className="flex flex-wrap items-baseline gap-x-1">
          <span className="text-muted-foreground">&lt;</span>
          <span
            className={cn(
              "font-semibold",
              node.name.startsWith("Context ") || node.name === "Provider" ?
                "text-indigo-600/90 dark:text-indigo-300/90"
              : "text-blue-600 dark:text-blue-400",
            )}
          >
            {node.name}
          </span>
          {node.props && Object.keys(node.props).length > 0 && (
            <PropsDisplay props={node.props} />
          )}
          {!hasChildren && <span className="text-muted-foreground">/&gt;</span>}
          {hasChildren && <span className="text-muted-foreground">&gt;</span>}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <>
          {node.children!.map((child) => (
            <RenderTreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
              onContextMenu={onContextMenu}
            />
          ))}
          {/* Closing tag */}
          <div
            className="py-0.5 px-1 text-muted-foreground"
            style={{ paddingLeft: `${level * 16 + 20}px` }}
          >
            &lt;/
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              {node.name}
            </span>
            &gt;
          </div>
        </>
      )}

      {/* Collapsed indicator */}
      {hasChildren && !isExpanded && (
        <div
          className="py-0.5 px-1 text-muted-foreground cursor-pointer hover:bg-accent/50 rounded-sm"
          style={{ paddingLeft: `${level * 16 + 20}px` }}
          onClick={handleToggle}
        >
          <span className="text-muted-foreground/50">...</span>
          <span className="ml-1">
            &lt;/
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              {node.name}
            </span>
            &gt;
          </span>
        </div>
      )}
    </div>
  );
});

interface PropsDisplayProps {
  props: Record<string, unknown>;
}

const PropsDisplay = memo(function PropsDisplay({ props }: PropsDisplayProps) {
  const entries = Object.entries(props);

  return (
    <>
      {entries.map(([key, value]) => (
        <span key={key} className="inline-flex items-baseline gap-0.5">
          <span className="text-orange-600 dark:text-orange-400">{key}</span>
          <span className="text-muted-foreground">=</span>
          <PropValue value={value} />
        </span>
      ))}
    </>
  );
});

interface PropValueProps {
  value: unknown;
}

const PropValue = memo(function PropValue({ value }: PropValueProps) {
  if (typeof value === "string") {
    return (
      <span className="text-green-600 dark:text-green-400">"{value}"</span>
    );
  }

  if (typeof value === "number") {
    return (
      <span>
        <span className="text-muted-foreground">{"{"}</span>
        <span className="text-purple-600 dark:text-purple-400">{value}</span>
        <span className="text-muted-foreground">{"}"}</span>
      </span>
    );
  }

  if (typeof value === "boolean") {
    return (
      <span>
        <span className="text-muted-foreground">{"{"}</span>
        <span className="text-purple-600 dark:text-purple-400">
          {value ? "true" : "false"}
        </span>
        <span className="text-muted-foreground">{"}"}</span>
      </span>
    );
  }

  if (value === null) {
    return (
      <span>
        <span className="text-muted-foreground">{"{"}</span>
        <span className="text-red-600 dark:text-red-400">null</span>
        <span className="text-muted-foreground">{"}"}</span>
      </span>
    );
  }

  if (value === undefined) {
    return (
      <span>
        <span className="text-muted-foreground">{"{"}</span>
        <span className="text-red-600 dark:text-red-400">undefined</span>
        <span className="text-muted-foreground">{"}"}</span>
      </span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <span>
        <span className="text-muted-foreground">{"{"}</span>
        <span className="text-yellow-600 dark:text-yellow-400">
          Array({value.length})
        </span>
        <span className="text-muted-foreground">{"}"}</span>
      </span>
    );
  }

  if (typeof value === "object") {
    return (
      <span>
        <span className="text-muted-foreground">{"{"}</span>
        <span className="text-yellow-600 dark:text-yellow-400">{"{...}"}</span>
        <span className="text-muted-foreground">{"}"}</span>
      </span>
    );
  }

  if (typeof value === "function") {
    return (
      <span>
        <span className="text-muted-foreground">{"{"}</span>
        <span className="text-cyan-600 dark:text-cyan-400">ƒ()</span>
        <span className="text-muted-foreground">{"}"}</span>
      </span>
    );
  }

  return (
    <span>
      <span className="text-muted-foreground">{"{"}</span>
      <span className="text-muted-foreground">{String(value)}</span>
      <span className="text-muted-foreground">{"}"}</span>
    </span>
  );
});
