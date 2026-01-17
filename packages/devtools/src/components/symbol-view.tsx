import {
  ScopeDetails,
  SymbolDetails,
  type ScopeDetailsData,
  type SymbolDetailsData,
} from "@/components/detail-views";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";

export interface SymbolViewProps {
  tabId: string;
  tabType: "symbol" | "scope";
  focusRenderNodeById: (id: number | null) => void;
}

export function SymbolView({
  tabId,
  tabType,
  focusRenderNodeById,
}: SymbolViewProps) {
  const { symbolDetails, scopeDetails } = useDebugConnectionContext();
  const {
    tabs: { openDetailTab },
  } = useDevtoolsAppStateContext();
  const resolveSymbolName = (id: number | null | undefined) => {
    if (id === null || id === undefined) return undefined;
    return symbolDetails.get(`symbol:${id}`)?.name as string | undefined;
  };

  const resolveScopeName = (id: number | null | undefined) => {
    if (id === null || id === undefined) return undefined;
    return scopeDetails.get(`scope:${id}`)?.name as string | undefined;
  };

  if (tabType === "symbol") {
    const details = symbolDetails.get(tabId) as SymbolDetailsData | undefined;
    if (!details) {
      return (
        <div className="text-xs text-muted-foreground/70">
          No symbol details available.
        </div>
      );
    }
    return (
      <SymbolDetails
        details={details}
        onGoToRenderNode={() =>
          focusRenderNodeById((details.renderNodeId as number | null) ?? null)
        }
        onOpenSymbol={(id) =>
          openDetailTab(
            `symbol:${id}`,
            resolveSymbolName(id) ?? "(unknown symbol)",
            "symbol",
          )
        }
        onOpenScope={(id) =>
          openDetailTab(
            `scope:${id}`,
            resolveScopeName(id) ?? "(unknown scope)",
            "scope",
          )
        }
        resolveSymbolName={resolveSymbolName}
        resolveScopeName={resolveScopeName}
      />
    );
  }

  const details = scopeDetails.get(tabId) as ScopeDetailsData | undefined;
  if (!details) {
    return (
      <div className="text-xs text-muted-foreground/70">
        No scope details available.
      </div>
    );
  }
  return (
    <ScopeDetails
      details={details}
      onGoToRenderNode={() =>
        focusRenderNodeById((details.renderNodeId as number | null) ?? null)
      }
      onOpenSymbol={(id) =>
        openDetailTab(
          `symbol:${id}`,
          resolveSymbolName(id) ?? "(unknown symbol)",
          "symbol",
        )
      }
      onOpenScope={(id) =>
        openDetailTab(
          `scope:${id}`,
          resolveScopeName(id) ?? "(unknown scope)",
          "scope",
        )
      }
      resolveSymbolName={resolveSymbolName}
      resolveScopeName={resolveScopeName}
    />
  );
}
