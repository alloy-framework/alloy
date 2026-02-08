import { SourceLocationLink } from "@/components/source-location-link";
import { formatSourceLocation } from "@/lib/format-source-location";
import type { EffectEdgeInfo, EffectInfo } from "@alloy-js/core/devtools";

interface GraphNode {
  id: string;
  label: string;
  kind: "effect" | "ref" | "target";
}

export interface EffectsListProps {
  effectList: EffectInfo[];
  effects: Map<number, EffectInfo>;
  edgesByEffect: Map<number, EffectEdgeInfo[]>;
  graphNodes: Map<string, GraphNode>;
  formatPath: (path: string) => string;
  getEdgeTargetKey: (edge: EffectEdgeInfo) => string | null;
  onNavigate: (tab: string, type: string, num: string) => void;
}

export function EffectsList(props: EffectsListProps) {
  const {
    effectList,
    effects,
    edgesByEffect,
    graphNodes,
    formatPath,
    getEdgeTargetKey,
    onNavigate,
  } = props;

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
          Effects
        </div>
        <div className="flex-1 overflow-auto">
          {effectList.length === 0 ?
            <div className="text-muted-foreground">No effects recorded.</div>
          : <div className="space-y-3">
              {effectList.map((effect) => {
                const edges = (edgesByEffect.get(effect.id) ?? []).slice();
                const createdLabel = formatLocation(effect.createdAt);
                const lastTriggeredLabel = formatLocation(
                  effect.lastTriggeredAt,
                );
                const displayName = effect.name ?? "(anonymous)";
                return (
                  <div
                    key={effect.id}
                    id={`effect-${effect.id}`}
                    className="rounded border border-border p-3 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {displayName}{" "}
                          <span className="text-muted-foreground">
                            #{effect.id}
                          </span>
                        </div>
                        {effect.createdAt && createdLabel ?
                          <div className="text-xs">
                            <SourceLocationLink source={effect.createdAt}>
                              {createdLabel}
                            </SourceLocationLink>
                          </div>
                        : null}
                        {lastTriggeredLabel ?
                          <div className="text-xs text-muted-foreground">
                            Last triggered: {lastTriggeredLabel}
                            {effect.lastTriggeredByRefId !== undefined ?
                              <>
                                {" "}
                                by{" "}
                                {renderClickableNode(
                                  `ref:${effect.lastTriggeredByRefId}`,
                                )}
                              </>
                            : null}
                          </div>
                        : null}
                      </div>
                    </div>

                    {edges.length === 0 ?
                      <div className="text-xs text-muted-foreground mt-1">
                        No edges recorded.
                      </div>
                    : <div className="mt-1 space-y-1">
                        {edges.map((edge, index) => {
                          const locationLabel = formatLocation(edge.location);
                          const label =
                            edge.type === "triggered-by" ?
                              "triggered by"
                            : edge.type;
                          return (
                            <div
                              key={`edge-${edge.id}-${index}`}
                              className="text-xs"
                            >
                              <span className="rounded bg-muted px-2 py-0.5 text-[10px] uppercase">
                                {label}
                              </span>{" "}
                              {(() => {
                                const targetKey = getEdgeTargetKey(edge);
                                return targetKey ?
                                    <>
                                      {renderClickableNode(targetKey)}
                                      {edge.targetKey !== undefined ?
                                        `.${edge.targetKey}`
                                      : ""}
                                    </>
                                  : null;
                              })()}
                              {edge.count !== undefined ?
                                <span className="text-muted-foreground">
                                  {" "}
                                  · count: {edge.count}
                                </span>
                              : null}
                              {locationLabel ?
                                <span className="text-muted-foreground">
                                  {" "}
                                  · {locationLabel}
                                </span>
                              : null}
                            </div>
                          );
                        })}
                      </div>
                    }
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
