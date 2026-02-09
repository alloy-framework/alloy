import { SourceLocationLink } from "@/components/source-location-link";
import { formatSourceLocation } from "@/lib/format-source-location";
import type { EffectInfo, RefInfo } from "@alloy-js/core/devtools";

interface GraphNode {
  id: string;
  label: string;
  kind: "effect" | "ref" | "target";
}

export interface RefsListProps {
  refList: RefInfo[];
  effects: Map<number, EffectInfo>;
  graphNodes: Map<string, GraphNode>;
  formatPath: (path: string) => string;
  onNavigate: (tab: string, type: string, num: string) => void;
}

export function RefsList(props: RefsListProps) {
  const { refList, effects, graphNodes, formatPath, onNavigate } = props;

  const formatLocation = (location?: {
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
  }) => formatSourceLocation(location, formatPath);

  const renderNodeLabel = (id: string, showEffectName = false) => {
    const node = graphNodes.get(id);
    if (!node) return id;
    const match = id.match(/^(effect|ref|target):(\d+)$/);
    if (match) {
      const [, type, num] = match;
      if (type === "effect" && showEffectName) {
        const effect = effects.get(Number(num));
        const name = effect?.name ?? `Effect`;
        return `${name} #${num}`;
      }
      if (type === "target") return node.label;
      const typeName = type.charAt(0).toUpperCase() + type.slice(1);
      return `${typeName} #${num}`;
    }
    return node.label;
  };

  const renderClickableNode = (id: string) => {
    const match = id.match(/^(effect|ref|target):(\d+)$/);
    if (!match) return <span>{renderNodeLabel(id)}</span>;
    const [, type, num] = match;
    const label = renderNodeLabel(id);
    if (type === "target") return <span>{label}</span>;
    return (
      <button
        onClick={() =>
          onNavigate(type === "effect" ? "effects" : "refs", type, num)
        }
        className="hover:underline text-foreground font-medium"
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex-1 min-h-0">
      <div className="p-3 flex flex-col min-h-0 h-full">
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Refs
        </div>
        <div className="flex-1 overflow-auto">
          {refList.length === 0 ?
            <div className="text-muted-foreground">No refs recorded.</div>
          : <div className="space-y-2">
              {refList.map((refInfo) => {
                const createdLabel = formatLocation(refInfo.createdAt);
                return (
                  <div
                    key={refInfo.id}
                    id={`ref-${refInfo.id}`}
                    className="rounded border border-border p-2 space-y-1"
                  >
                    <div className="font-medium">
                      {refInfo.kind ?? "ref"}{" "}
                      <span className="text-muted-foreground">
                        #{refInfo.id}
                      </span>
                    </div>
                    {refInfo.createdAt && createdLabel ?
                      <div className="text-xs">
                        <SourceLocationLink source={refInfo.createdAt}>
                          {createdLabel}
                        </SourceLocationLink>
                      </div>
                    : null}
                    {refInfo.createdByEffectId !== undefined && (
                      <div className="text-xs text-muted-foreground">
                        Created by:{" "}
                        {renderClickableNode(
                          `effect:${refInfo.createdByEffectId}`,
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
