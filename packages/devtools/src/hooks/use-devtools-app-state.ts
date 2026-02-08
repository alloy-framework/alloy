import type { RenderTreeHandle } from "@/components/render-tree";
import { useRenderTreeFocus } from "@/hooks/use-render-tree-focus";
import { useTabs } from "@/hooks/use-tabs";
import type { RefObject } from "react";
import { useState } from "react";

export function useDevtoolsAppState(
  renderTreeRef: RefObject<RenderTreeHandle | null>,
  renderTree: unknown,
  setBottomTab?: (tab: "render" | "problems" | "effects" | "trace") => void,
) {
  const {
    selectedRenderNodeId,
    setSelectedRenderNodeId,
    requestFocusRenderNode,
    focusRenderNodeById,
  } = useRenderTreeFocus(renderTreeRef, renderTree, setBottomTab);
  const tabs = useTabs({
    onActivateComponentTab: requestFocusRenderNode,
    onClearSelection: () => setSelectedRenderNodeId(null),
  });
  const [hoveredRenderNodeId, setHoveredRenderNodeId] = useState<string | null>(
    null,
  );

  return {
    selectedRenderNodeId,
    setSelectedRenderNodeId,
    requestFocusRenderNode,
    focusRenderNodeById,
    hoveredRenderNodeId,
    setHoveredRenderNodeId,
    tabs,
  };
}
