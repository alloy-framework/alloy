import type { RenderTreeHandle } from "@/components/render-tree";
import type { RefObject } from "react";
import { useCallback, useEffect, useState } from "react";

export function useRenderTreeFocus(
  renderTreeRef: RefObject<RenderTreeHandle | null>,
  focusRefreshKey?: unknown,
) {
  const [selectedRenderNodeId, setSelectedRenderNodeId] = useState<
    string | null
  >(null);
  const [focusRequest, setFocusRequest] = useState<{
    id: string;
    token: number;
  } | null>(null);

  const requestFocusRenderNode = useCallback((nodeId: string) => {
    setSelectedRenderNodeId(nodeId);
    setFocusRequest((prev) => ({
      id: nodeId,
      token: (prev?.token ?? 0) + 1,
    }));
  }, []);

  const focusRenderNodeById = useCallback(
    (renderNodeId: number | null) => {
      if (!renderNodeId) return;
      requestFocusRenderNode(String(renderNodeId));
    },
    [requestFocusRenderNode],
  );

  useEffect(() => {
    if (!focusRequest) return;
    renderTreeRef.current?.focusNode(focusRequest.id);
  }, [focusRequest, renderTreeRef, focusRefreshKey]);

  return {
    selectedRenderNodeId,
    setSelectedRenderNodeId,
    requestFocusRenderNode,
    focusRenderNodeById,
  };
}
