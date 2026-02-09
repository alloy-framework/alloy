import {
  ScopeDetails,
  type ScopeDetailsData,
} from "@/components/detail-views/scope-details.tsx";
import {
  SymbolDetails,
  type SymbolDetailsData,
} from "@/components/detail-views/symbol-details.tsx";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";

export interface SymbolViewProps {
  tabId: string;
  tabType: "symbol" | "scope";
}

export function SymbolView({ tabId, tabType }: SymbolViewProps) {
  const { symbolDetails, scopeDetails } = useDebugConnectionContext();

  if (tabType === "symbol") {
    const details = symbolDetails.get(tabId) as SymbolDetailsData | undefined;
    if (!details) {
      return (
        <div className="text-sm text-muted-foreground/70">
          No symbol details available.
        </div>
      );
    }
    return <SymbolDetails details={details} />;
  }

  const details = scopeDetails.get(tabId) as ScopeDetailsData | undefined;
  if (!details) {
    return (
      <div className="text-sm text-muted-foreground/70">
        No scope details available.
      </div>
    );
  }
  return <ScopeDetails details={details} />;
}
