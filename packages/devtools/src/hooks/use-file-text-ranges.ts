import type { OpenTab } from "@/hooks/use-tabs";
import { DIFF_EQUAL, diff_match_patch } from "diff-match-patch";
import { useCallback, useEffect, useState } from "react";

export interface TextNodeSpan {
  id: string;
  text: string;
}

export interface TextRange {
  start: number;
  end: number;
  nodeId: string;
}

export interface UseFileTextRangesOptions {
  activeTabId: string | null;
  openTabs: OpenTab[];
  fileContents: Map<string, { contents: string }>;
  fileToRenderNode: Map<string, string>;
  collectTextNodesForNode: (nodeId: string) => TextNodeSpan[];
  findLiftedRootForNode: (nodeId: string) => string | undefined;
}

export function useFileTextRanges({
  activeTabId,
  openTabs,
  fileContents,
  fileToRenderNode,
  collectTextNodesForNode,
  findLiftedRootForNode,
}: UseFileTextRangesOptions) {
  const [fileTextRanges, setFileTextRanges] = useState<
    Map<string, Array<{ start: number; end: number; nodeId: string }>>
  >(new Map());

  const computeTextRangesForFile = useCallback(
    (fileId: string, renderNodeId: string, contents: string) => {
      let textNodes = collectTextNodesForNode(renderNodeId);
      if (textNodes.length === 0) {
        const liftedRoot = findLiftedRootForNode(renderNodeId);
        if (liftedRoot) {
          textNodes = collectTextNodesForNode(liftedRoot);
        }
      }
      const nodeSpans: Array<{ id: string; start: number; end: number }> = [];
      let nodeCursor = 0;
      for (const node of textNodes) {
        const start = nodeCursor;
        const end = start + node.text.length;
        nodeSpans.push({ id: node.id, start, end });
        nodeCursor = end;
      }

      const nodeText = textNodes.map((node) => node.text).join("");
      const ranges: Array<{ start: number; end: number; nodeId: string }> = [];
      if (nodeText.length === 0 || contents.length === 0) {
        setFileTextRanges((prev) => {
          const next = new Map(prev);
          next.set(fileId, ranges);
          return next;
        });
        return ranges;
      }

      const dmp = new diff_match_patch();
      const diffs = dmp.diff_main(nodeText, contents);
      dmp.diff_cleanupSemantic(diffs);

      const equalSegments: Array<{
        nodeStart: number;
        nodeEnd: number;
        fileStart: number;
        fileEnd: number;
      }> = [];
      let nodePos = 0;
      let filePos = 0;
      for (const [op, text] of diffs) {
        const len = text.length;
        if (op === DIFF_EQUAL) {
          equalSegments.push({
            nodeStart: nodePos,
            nodeEnd: nodePos + len,
            fileStart: filePos,
            fileEnd: filePos + len,
          });
          nodePos += len;
          filePos += len;
        } else if (op === -1) {
          nodePos += len;
        } else {
          filePos += len;
        }
      }

      let segmentIndex = 0;
      for (const span of nodeSpans) {
        while (
          segmentIndex < equalSegments.length &&
          equalSegments[segmentIndex].nodeEnd <= span.start
        ) {
          segmentIndex++;
        }
        let index = segmentIndex;
        while (
          index < equalSegments.length &&
          equalSegments[index].nodeStart < span.end
        ) {
          const segment = equalSegments[index];
          const start = Math.max(span.start, segment.nodeStart);
          const end = Math.min(span.end, segment.nodeEnd);
          if (start < end) {
            const fileStart = segment.fileStart + (start - segment.nodeStart);
            const fileEnd = fileStart + (end - start);
            ranges.push({ start: fileStart, end: fileEnd, nodeId: span.id });
          }
          if (segment.nodeEnd >= span.end) {
            break;
          }
          index++;
        }
      }

      ranges.sort((a, b) => a.start - b.start);
      setFileTextRanges((prev) => {
        const next = new Map(prev);
        next.set(fileId, ranges);
        return next;
      });
      return ranges;
    },
    [collectTextNodesForNode, findLiftedRootForNode],
  );

  useEffect(() => {
    if (!activeTabId) return;
    const activeTab = openTabs.find((tab) => tab.id === activeTabId);
    if (!activeTab || activeTab.type !== "file") return;
    const fileId = activeTab.id;
    const renderNodeId = fileToRenderNode.get(fileId);
    const contents = fileContents.get(fileId)?.contents ?? "";
    const timer = window.setTimeout(() => {
      if (!renderNodeId || contents.length === 0) {
        setFileTextRanges((prev) => {
          const next = new Map(prev);
          next.delete(fileId);
          return next;
        });
        return;
      }
      computeTextRangesForFile(fileId, renderNodeId, contents);
    }, 20);

    return () => window.clearTimeout(timer);
  }, [
    activeTabId,
    openTabs,
    fileContents,
    fileToRenderNode,
    computeTextRangesForFile,
  ]);

  return { fileTextRanges, computeTextRangesForFile };
}
