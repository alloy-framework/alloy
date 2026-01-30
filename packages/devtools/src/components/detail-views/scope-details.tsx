import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { useDevtoolsAppStateContext } from "@/hooks/devtools-app-state-context";
import { findRenderNodeInTree } from "@/lib/render-tree-utils";
import {
  buildDebugInfoRows,
  formatDebugLabel,
  renderDebugLink,
  renderDebugValue,
} from "./debug-utils.tsx";
import { MetadataBlock } from "./metadata-block";
import { NoneText } from "./none-text";
import { ScopeTable } from "./scope-table.tsx";

export interface ScopeDetailsData {
  id: number;
  name?: string;
  parentId?: number | null;
  ownerSymbolId?: number | null;
  renderNodeId?: number | null;
  isMemberScope?: boolean;
  isTransient?: boolean;
  metadata?: Record<string, unknown>;
  debugInfo?: Record<string, unknown>;
  children?: Array<{ id: number; name?: string }>;
  spaces?: Array<{
    key: string;
    symbols: Array<{ id: number; name?: string }>;
  }>;
}

export interface ScopeDetailsProps {
  details: ScopeDetailsData;
}

export function ScopeDetails({ details }: ScopeDetailsProps) {
  const { renderTree, symbolDetails, scopeDetails } =
    useDebugConnectionContext();
  const {
    focusRenderNodeById,
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
  const resolveRenderNodeLabel = (id: number | null | undefined) => {
    if (id === null || id === undefined) return undefined;
    const node = findRenderNodeInTree(renderTree, String(id));
    return node?.name ?? node?.kind ?? `Render node #${id}`;
  };
  const ownerName = resolveSymbolName(details.ownerSymbolId);
  const parentName = resolveScopeName(details.parentId);
  const renderNodeLabel = resolveRenderNodeLabel(details.renderNodeId);
  const debugRows = buildDebugInfoRows(details.debugInfo);
  const options = {
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
  };

  return (
    <div className="p-4 text-sm">
      <div className="mt-3">
        <div className="mt-2 overflow-hidden">
          <table className="w-auto">
            <tbody>
              <tr>
                <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                  Id
                </td>
                <td className="pr-2 py-1">{details.id}</td>
              </tr>
              <tr>
                <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                  Created By
                </td>
                <td className="pr-2 py-1">
                  {renderDebugLink(
                    {
                      type: "renderNode",
                      id: details.renderNodeId ?? null,
                      name:
                        renderNodeLabel ??
                        (details.renderNodeId != null ?
                          `Render node #${details.renderNodeId}`
                        : undefined),
                    },
                    options,
                  )}
                </td>
              </tr>
              <tr>
                <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                  Parent Scope
                </td>
                <td className="pr-2 py-1">
                  {renderDebugLink(
                    {
                      type: "scope",
                      id: details.parentId ?? null,
                      name:
                        parentName ??
                        (details.parentId != null ?
                          `#${details.parentId}`
                        : undefined),
                    },
                    options,
                  )}
                </td>
              </tr>
              <tr>
                <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                  Owner Symbol
                </td>
                <td className="pr-2 py-1">
                  {renderDebugLink(
                    {
                      type: "symbol",
                      id: details.ownerSymbolId ?? null,
                      name:
                        ownerName ??
                        (details.ownerSymbolId != null ?
                          `#${details.ownerSymbolId}`
                        : undefined),
                    },
                    options,
                  )}
                </td>
              </tr>
              <tr>
                <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                  Member Scope
                </td>
                <td className="pr-2 py-1">
                  {details.isMemberScope ? "True" : "False"}
                </td>
              </tr>
              <tr>
                <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                  Transient
                </td>
                <td className="pr-2 py-1">
                  {details.isTransient ? "True" : "False"}
                </td>
              </tr>
              <tr>
                <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                  Children
                </td>
                <td className="pr-2 py-1">
                  <ScopeTable
                    scopes={details.children ?? []}
                    onOpenScope={options.onOpenScope}
                  />
                </td>
              </tr>
              {(details.spaces ?? []).map((space) => (
                <tr key={`space-${space.key}`}>
                  <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                    {formatDebugLabel(space.key)}
                  </td>
                  <td className="pr-2 py-1">
                    {space.symbols.length > 0 ?
                      renderDebugValue(space.symbols, options)
                    : <NoneText label="none" />}
                  </td>
                </tr>
              ))}
              {debugRows.map((row, index) => (
                <tr key={`${row.label}-${index}`}>
                  <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                    {row.rawLabel ? row.label : formatDebugLabel(row.label)}
                  </td>
                  <td className="pr-2 py-1">
                    {renderDebugValue(row.value, options)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MetadataBlock metadata={details.metadata} />
    </div>
  );
}
