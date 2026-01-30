import { FileViewer } from "@/components/detail-views/file-viewer.tsx";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { useFileTextRanges } from "@/hooks/use-file-text-ranges";
import { useRenderTreeIndex } from "@/hooks/use-render-tree-index";
import { useRenderTreeQueries } from "@/hooks/use-render-tree-queries";
import { cn } from "@/lib/utils";

export function FileView() {
  const { renderTree, fileContents, fileToRenderNode } =
    useDebugConnectionContext();
  const {
    hoveredRenderNodeId,
    setHoveredRenderNodeId,
    requestFocusRenderNode,
    tabs: { activeTabId, openTabs },
  } = useDevtoolsAppStateContext();
  const { findLiftedRootForNodeById } = useRenderTreeIndex(
    renderTree,
    fileToRenderNode,
  );
  const { collectTextNodesForNode } = useRenderTreeQueries(renderTree);
  const { fileTextRanges } = useFileTextRanges({
    activeTabId,
    openTabs,
    fileContents,
    fileToRenderNode,
    collectTextNodesForNode,
    findLiftedRootForNode: findLiftedRootForNodeById,
  });
  const activeTab =
    activeTabId ? openTabs.find((tab) => tab.id === activeTabId) : null;
  if (!activeTab || activeTab.type !== "file") return null;
  const contents = fileContents.get(activeTab.id)?.contents ?? "";
  const ranges = fileTextRanges.get(activeTab.id) ?? [];
  const content = (() => {
    if (ranges.length === 0) return contents;

    const segments: Array<
      | { text: string }
      | { text: string; nodeId: string; start: number; end: number }
    > = [];
    let cursor = 0;
    for (const range of ranges) {
      if (range.start > cursor) {
        segments.push({ text: contents.slice(cursor, range.start) });
      }
      segments.push({
        text: contents.slice(range.start, range.end),
        nodeId: range.nodeId,
        start: range.start,
        end: range.end,
      });
      cursor = range.end;
    }
    if (cursor < contents.length) {
      segments.push({ text: contents.slice(cursor) });
    }

    return (
      <>
        {segments.map((segment, index) => {
          if ("nodeId" in segment) {
            const isHovered = hoveredRenderNodeId === segment.nodeId;
            return (
              <span
                key={`${segment.nodeId}-${segment.start}-${index}`}
                data-text-node-id={segment.nodeId}
                className={cn(
                  "cursor-pointer box-border border border-transparent",
                  isHovered &&
                    "bg-amber-200/70 text-amber-950 border-amber-400/70",
                )}
                onMouseEnter={() => setHoveredRenderNodeId(segment.nodeId)}
                onMouseLeave={() => setHoveredRenderNodeId(null)}
                onClick={() => requestFocusRenderNode(segment.nodeId)}
              >
                {segment.text}
              </span>
            );
          }
          return <span key={`plain-${index}`}>{segment.text}</span>;
        })}
      </>
    );
  })();

  return (
    <div className="h-full w-full text-sm bg-muted/30 rounded p-3 whitespace-pre-wrap text-foreground overflow-auto font-mono">
      <FileViewer content={content || "(No contents)"} />
    </div>
  );
}
