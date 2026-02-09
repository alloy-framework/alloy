import { useDetailResolvers } from "@/hooks/use-detail-resolvers";
import {
  buildDebugInfoRows,
  formatDebugLabel,
  renderDebugLink,
  renderDebugValue,
} from "./debug-utils.tsx";
import { MetadataBlock } from "./metadata-block";
import { NoneText } from "./none-text";

export interface SymbolDetailsData {
  id: number;
  name?: string;
  originalName?: string;
  renderNodeId?: number | null;
  scopeId?: number | null;
  ownerSymbolId?: number | null;
  isMemberSymbol?: boolean;
  isTransient?: boolean;
  isAlias?: boolean;
  movedToId?: number | null;
  metadata?: Record<string, unknown>;
  debugInfo?: Record<string, unknown>;
  memberSpaces?: Array<{
    key: string;
    symbols: Array<{ id: number; name?: string }>;
  }>;
}

export interface SymbolDetailsProps {
  details: SymbolDetailsData;
}

export function SymbolDetails({ details }: SymbolDetailsProps) {
  const {
    resolveSymbolName,
    resolveScopeName,
    resolveRenderNodeLabel,
    options,
  } = useDetailResolvers();
  const scopeName = resolveScopeName(details.scopeId);
  const ownerName = resolveSymbolName(details.ownerSymbolId);
  const movedName = resolveSymbolName(details.movedToId);
  const renderNodeLabel = resolveRenderNodeLabel(details.renderNodeId);
  const debugRows = buildDebugInfoRows(details.debugInfo);

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
                  Original
                </td>
                <td className="pr-2 py-1">
                  {details.originalName ?? <NoneText />}
                </td>
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
                  Scope
                </td>
                <td className="pr-2 py-1">
                  {renderDebugLink(
                    {
                      type: "scope",
                      id: details.scopeId ?? null,
                      name:
                        scopeName ??
                        (details.scopeId != null ?
                          `#${details.scopeId}`
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
                  Moved To
                </td>
                <td className="pr-2 py-1">
                  {renderDebugLink(
                    {
                      type: "symbol",
                      id: details.movedToId ?? null,
                      name:
                        movedName ??
                        (details.movedToId != null ?
                          `#${details.movedToId}`
                        : undefined),
                    },
                    options,
                  )}
                </td>
              </tr>
              <tr>
                <td className="pr-2 py-1 align-top text-muted-foreground font-semibold whitespace-nowrap">
                  Alias
                </td>
                <td className="pr-2 py-1">
                  {details.isAlias ? "True" : "False"}
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
                  Member Symbol
                </td>
                <td className="pr-2 py-1">
                  {details.isMemberSymbol ? "True" : "False"}
                </td>
              </tr>
              {(details.memberSpaces ?? []).map((space) => (
                <tr key={`member-space-${space.key}`}>
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
