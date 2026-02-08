import type { CycleInfo } from "@/lib/cycle-detection";
import type { EffectInfo } from "@alloy-js/core/devtools";

interface GraphNode {
  id: string;
  label: string;
  kind: "effect" | "ref" | "target";
}

export interface CyclesViewProps {
  cycles: CycleInfo[];
  effects: Map<number, EffectInfo>;
  graphNodes: Map<string, GraphNode>;
  onNavigate: (tab: string, type: string, num: string) => void;
}

export function CyclesView(props: CyclesViewProps) {
  const { cycles, effects, graphNodes, onNavigate } = props;

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

  const renderClickableNode = (id: string, showEffectName = false) => {
    const match = id.match(/^(effect|ref|target):(\d+)$/);
    if (!match)
      return <span>{renderNodeLabel(id, showEffectName)}</span>;
    const [, type, num] = match;
    const label = renderNodeLabel(id, showEffectName);
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
          Circular chains
        </div>
        <div className="flex-1 overflow-auto">
          {cycles.length === 0 ?
            <div className="text-muted-foreground">No cycles detected.</div>
          : <div className="space-y-3">
              {cycles.map((cycleInfo, index) => (
                <div
                  key={`${index}-${cycleInfo.cycle.join("->")}`}
                  className="rounded border border-border p-2 space-y-2"
                >
                  <div className="flex flex-wrap items-center gap-1">
                    {cycleInfo.cycle.map((nodeId, nodeIndex) => (
                      <span
                        key={`${nodeId}-${nodeIndex}`}
                        className="inline-flex items-center"
                      >
                        <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium">
                          {renderClickableNode(nodeId, true)}
                        </span>
                        {nodeIndex < cycleInfo.cycle.length - 1 && (
                          <span className="mx-1 text-muted-foreground">→</span>
                        )}
                        {nodeIndex === cycleInfo.cycle.length - 1 && (
                          <span className="mx-1 text-muted-foreground">→</span>
                        )}
                      </span>
                    ))}
                    <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium">
                      {renderClickableNode(cycleInfo.cycle[0], true)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Observed {cycleInfo.count}{" "}
                    {cycleInfo.count === 1 ? "time" : "times"}
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
