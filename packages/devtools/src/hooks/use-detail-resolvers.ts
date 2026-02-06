import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { findRenderNodeInTree } from "@/lib/render-tree-utils";
import { useCallback, useMemo } from "react";

export interface DetailResolvers {
  resolveSymbolName: (id: number | null | undefined) => string | undefined;
  resolveScopeName: (id: number | null | undefined) => string | undefined;
  resolveRenderNodeLabel: (id: number | null | undefined) => string | undefined;
  options: {
    onOpenSymbol: (id: number) => void;
    onOpenScope: (id: number) => void;
    onOpenRenderNode: (id: number) => void;
  };
}

export function useDetailResolvers(): DetailResolvers {
  const { renderTree, symbolDetails, scopeDetails } =
    useDebugConnectionContext();
  const {
    focusRenderNodeById,
    tabs: { openDetailTab },
  } = useDevtoolsAppStateContext();

  const resolveSymbolName = useCallback(
    (id: number | null | undefined) => {
      if (id === null || id === undefined) return undefined;
      return symbolDetails.get(`symbol:${id}`)?.name as string | undefined;
    },
    [symbolDetails],
  );

  const resolveScopeName = useCallback(
    (id: number | null | undefined) => {
      if (id === null || id === undefined) return undefined;
      return scopeDetails.get(`scope:${id}`)?.name as string | undefined;
    },
    [scopeDetails],
  );

  const resolveRenderNodeLabel = useCallback(
    (id: number | null | undefined) => {
      if (id === null || id === undefined) return undefined;
      const node = findRenderNodeInTree(renderTree, String(id));
      return node?.name ?? node?.kind ?? `Render node #${id}`;
    },
    [renderTree],
  );

  const options = useMemo(
    () => ({
      onOpenSymbol: (id: number) =>
        openDetailTab(
          `symbol:${id}`,
          resolveSymbolName(id) ?? "(unknown symbol)",
          "symbol",
        ),
      onOpenScope: (id: number) =>
        openDetailTab(
          `scope:${id}`,
          resolveScopeName(id) ?? "(unknown scope)",
          "scope",
        ),
      onOpenRenderNode: (id: number) => focusRenderNodeById(id),
    }),
    [
      openDetailTab,
      focusRenderNodeById,
      resolveSymbolName,
      resolveScopeName,
    ],
  );

  return { resolveSymbolName, resolveScopeName, resolveRenderNodeLabel, options };
}
