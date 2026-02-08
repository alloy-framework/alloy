import type { RenderTreeHandle } from "@/components/render-tree";
import type { RefObject } from "react";
import { useCallback, useEffect, useState } from "react";

export function useRenderTreeFocus(
  renderTreeRef: RefObject<RenderTreeHandle | null>,
  focusRefreshKey?: unknown,
  setBottomTab?: (tab: "render" | "problems" | "effects" | "trace") => void,
) {
  const [selectedRenderNodeId, setSelectedRenderNodeId] = useState<
    string | null
  >(null);
  const [focusRequest, setFocusRequest] = useState<{
    id: string;
    token: number;
  } | null>(null);

  const requestFocusRenderNode = useCallback(
    (nodeId: string) => {
      setBottomTab?.("render");
      setSelectedRenderNodeId(nodeId);
      setFocusRequest((prev) => ({
        id: nodeId,
        token: (prev?.token ?? 0) + 1,
      }));
    },
    [setBottomTab],
  );

  const focusRenderNodeById = useCallback(
    (renderNodeId: number | null) => {
      if (!renderNodeId) return;
      requestFocusRenderNode(String(renderNodeId));
    },
    [requestFocusRenderNode],
  );

  useEffect(() => {
    if (!focusRequest) return;
    // Use a small delay to ensure the tab content is fully rendered
    const timeoutId = setTimeout(() => {
      renderTreeRef.current?.focusNode(focusRequest.id);
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [focusRequest, renderTreeRef, focusRefreshKey]);

  return {
    selectedRenderNodeId,
    setSelectedRenderNodeId,
    requestFocusRenderNode,
    focusRenderNodeById,
  };
}
