import { SourceLocationLink } from "@/components/source-location-link";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

interface GraphNode {
  id: string;
  label: string;
  kind: "effect" | "ref" | "target";
}

function normalizeCycle(nodes: string[]): string {
  const length = nodes.length;
  if (length === 0) return "";
  const candidates: string[][] = [];
  for (let i = 0; i < length; i += 1) {
    if (!nodes[i].startsWith("effect:")) continue;
    candidates.push(nodes.slice(i).concat(nodes.slice(0, i)));
  }
  const rotations = candidates.length ? candidates : [nodes];
  let best = rotations[0];
  for (let i = 1; i < rotations.length; i += 1) {
    const current = rotations[i];
    if (current.join("->") < best.join("->")) {
      best = current;
    }
  }
  return best.join("->");
}

function findCycles(
  adjacency: Map<string, string[]>,
  edgeList: Array<{
    effectId: number;
    refId?: number;
    targetId?: number;
    targetKind?: string;
    type: string;
  }>,
  maxDepth = 20,
) {
  const cycles = new Map<string, { cycle: string[]; count: number }>();
  const nodes = Array.from(adjacency.keys());

  const getEdgeTargetKey = (edge: {
    refId?: number;
    targetId?: number;
    targetKind?: string;
  }) => {
    const targetId = edge.targetId ?? edge.refId;
    if (targetId === undefined) return null;
    const kind = edge.targetKind === "target" ? "target" : "ref";
    return `${kind}:${targetId}`;
  };

  // Count the NUMBER of edges (not sum of their counts) by from->to
  const edgeCounts = new Map<string, Map<string, number>>();
  for (const edge of edgeList) {
    let from: string, to: string;
    const targetKey = getEdgeTargetKey(edge);
    if (!targetKey) continue;
    if (edge.type === "trigger") {
      from = `effect:${edge.effectId}`;
      to = targetKey;
    } else if (edge.type === "track") {
      from = targetKey;
      to = `effect:${edge.effectId}`;
    } else {
      continue;
    }

    if (!edgeCounts.has(from)) edgeCounts.set(from, new Map());
    const toMap = edgeCounts.get(from)!;
    const currentCount = toMap.get(to) ?? 0;
    // Count the number of edge events, each edge represents one traversal
    toMap.set(to, currentCount + 1);
  }

  for (const start of nodes) {
    const stack: string[] = [];
    const stackSet = new Set<string>();

    const dfs = (node: string, depth: number) => {
      if (depth > maxDepth) return;

      // Check if we've found a cycle back to the start
      if (node === start && stack.length > 0) {
        const cycle = [...stack];
        const key = normalizeCycle(cycle);
        if (!cycles.has(key)) {
          // Calculate cycle count as minimum of all edge counts in the cycle
          let minCount = Infinity;
          for (let i = 0; i < cycle.length; i++) {
            const from = cycle[i];
            const to = cycle[(i + 1) % cycle.length];
            const count = edgeCounts.get(from)?.get(to) ?? 0;
            if (count > 0) {
              minCount = Math.min(minCount, count);
            }
          }
          cycles.set(key, {
            cycle,
            count: minCount === Infinity ? 0 : minCount,
          });
        }
        return;
      }

      // If already in current path, skip (but not if it's the start we're looking for)
      if (stackSet.has(node)) return;

      stack.push(node);
      stackSet.add(node);

      const neighbors = adjacency.get(node) ?? [];
      for (const next of neighbors) {
        dfs(next, depth + 1);
      }

      stack.pop();
      stackSet.delete(node);
    };

    dfs(start, 0);
  }

  return Array.from(cycles.values());
}

export function EffectsView() {
  const {
    effects,
    refs,
    effectEdges,
    formatPath,
    effectsVersion,
    refsVersion,
    effectEdgesVersion,
  } = useDebugConnectionContext();
  const [activeTab, setActiveTab] = useState("effects");
  // Track if cycles need to be recalculated (lazy computation)
  const [cyclesVersion, setCyclesVersion] = useState(0);
  const edgesLengthRef = useRef(0);

  const getEdgeTargetKey = (edge: {
    refId?: number;
    targetId?: number;
    targetKind?: string;
  }) => {
    const targetId = edge.targetId ?? edge.refId;
    if (targetId === undefined) return null;
    const kind = edge.targetKind === "target" ? "target" : "ref";
    return `${kind}:${targetId}`;
  };

  // Use version counters in dependencies to trigger re-computation when data changes
  const effectList = useMemo(
    () => Array.from(effects.values()).sort((a, b) => a.id - b.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [effects, effectsVersion],
  );
  const refList = useMemo(
    () => Array.from(refs.values()).sort((a, b) => a.id - b.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refs, refsVersion],
  );
  const edgeList = useMemo(
    () => effectEdges,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [effectEdges, effectEdgesVersion],
  );

  // Only trigger cycle recalculation when actively viewing cycles tab
  // and edges have significantly changed
  useEffect(() => {
    if (activeTab === "cycles") {
      // Debounce cycle recalculation - only if edges changed by more than 10%
      const currentLength = effectEdges.length;
      const prevLength = edgesLengthRef.current;
      if (
        currentLength === 0 ||
        Math.abs(currentLength - prevLength) > prevLength * 0.1 ||
        prevLength === 0
      ) {
        edgesLengthRef.current = currentLength;
        // Delay calculation to avoid blocking UI
        const timer = setTimeout(() => {
          setCyclesVersion((v) => v + 1);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [activeTab, effectEdges.length]);

  const trackEdges = useMemo(
    () => edgeList.filter((edge) => edge.type === "track"),
    [edgeList],
  );
  const triggerEdges = useMemo(
    () => edgeList.filter((edge) => edge.type === "trigger"),
    [edgeList],
  );

  // Debug specific effects once
  useEffect(() => {
    if (edgeList.length > 0) {
      const effect89Tracks = [
        ...new Set(
          edgeList
            .filter((e) => e.effectId === 89 && e.type === "track")
            .map((e) => getEdgeTargetKey(e))
            .filter((value): value is string => value !== null),
        ),
      ];
      const effect89Triggers = [
        ...new Set(
          edgeList
            .filter((e) => e.effectId === 89 && e.type === "trigger")
            .map((e) => getEdgeTargetKey(e))
            .filter((value): value is string => value !== null),
        ),
      ];
      const effect90Tracks = [
        ...new Set(
          edgeList
            .filter((e) => e.effectId === 90 && e.type === "track")
            .map((e) => getEdgeTargetKey(e))
            .filter((value): value is string => value !== null),
        ),
      ];
      const effect90Triggers = [
        ...new Set(
          edgeList
            .filter((e) => e.effectId === 90 && e.type === "trigger")
            .map((e) => getEdgeTargetKey(e))
            .filter((value): value is string => value !== null),
        ),
      ];

      if (effect89Tracks.length > 0 || effect89Triggers.length > 0) {
        console.log(
          `Effect 89 - reads refs: [${effect89Tracks.join(", ")}], writes refs: [${effect89Triggers.join(", ")}]`,
        );
      }
      if (effect90Tracks.length > 0 || effect90Triggers.length > 0) {
        console.log(
          `Effect 90 - reads refs: [${effect90Tracks.join(", ")}], writes refs: [${effect90Triggers.join(", ")}]`,
        );
      }
    }
  }, []); // Run once only

  const graphNodes = useMemo(() => {
    const nodes = new Map<string, GraphNode>();
    for (const effect of effectList) {
      const label = `${effect.name ?? effect.type ?? "effect"} (#${effect.id})`;
      nodes.set(`effect:${effect.id}`, {
        id: `effect:${effect.id}`,
        label,
        kind: "effect",
      });
    }
    for (const refInfo of refList) {
      const label = `${refInfo.kind ?? "ref"} (#${refInfo.id})`;
      nodes.set(`ref:${refInfo.id}`, {
        id: `ref:${refInfo.id}`,
        label,
        kind: "ref",
      });
    }
    for (const edge of edgeList) {
      const targetId = edge.targetId ?? edge.refId;
      const isTarget = edge.targetKind === "target";
      if (!isTarget || targetId === undefined) continue;
      const label =
        edge.targetLabel ?
          `${edge.targetLabel} (#${targetId})`
        : `target (#${targetId})`;
      nodes.set(`target:${targetId}`, {
        id: `target:${targetId}`,
        label,
        kind: "target",
      });
    }
    return nodes;
  }, [effectList, refList, edgeList]);

  const adjacency = useMemo(() => {
    const graph = new Map<string, string[]>();
    const addEdge = (from: string, to: string) => {
      let existing = graph.get(from);
      if (!existing) {
        existing = [];
        graph.set(from, existing);
      }
      if (!existing.includes(to)) {
        existing.push(to);
      }
    };

    // Effect writes to target: effect -> target (trigger edges)
    for (const edge of triggerEdges) {
      const targetKey = getEdgeTargetKey(edge);
      if (!targetKey) continue;
      addEdge(`effect:${edge.effectId}`, targetKey);
    }

    // Effect reads from target: target -> effect (track edges)
    for (const edge of trackEdges) {
      const targetKey = getEdgeTargetKey(edge);
      if (!targetKey) continue;
      addEdge(targetKey, `effect:${edge.effectId}`);
    }

    return graph;
  }, [triggerEdges, trackEdges]);

  const cycles = useMemo(() => {
    // Only compute cycles when on the cycles tab and version changes
    if (activeTab !== "cycles") return [];
    return findCycles(adjacency, edgeList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjacency, edgeList, cyclesVersion, activeTab]);

  const edgesByEffect = useMemo(() => {
    const map = new Map<number, typeof edgeList>();
    for (const edge of edgeList) {
      let existing = map.get(edge.effectId);
      if (!existing) {
        existing = [];
        map.set(edge.effectId, existing);
      }
      existing.push(edge);
    }
    return map;
  }, [edgeList]);

  const formatLocation = (location?: {
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
  }) => {
    if (!location?.fileName) return "";
    const normalizedFileName = location.fileName.replace(/^file:\/\//, "");
    const path = formatPath(normalizedFileName);
    const line = location.lineNumber ?? "?";
    const column = location.columnNumber ?? "?";
    return `${path}:${line}:${column}`;
  };

  const renderNodeLabel = (id: string, showEffectName = false) => {
    const node = graphNodes.get(id);
    if (!node) return id;

    // Extract the type and number from the id
    const match = id.match(/^(effect|ref|target):(\d+)$/);
    if (match) {
      const [, type, num] = match;
      if (type === "effect" && showEffectName) {
        // Find the effect to get its name
        const effect = effects.get(Number(num));
        const name = effect?.name ?? `Effect`;
        return `${name} #${num}`;
      }
      if (type === "target") {
        return node.label;
      }
      const typeName = type.charAt(0).toUpperCase() + type.slice(1);
      return `${typeName} #${num}`;
    }

    return node.label;
  };

  const renderClickableNode = (id: string, showEffectName = false) => {
    const match = id.match(/^(effect|ref|target):(\d+)$/);
    if (!match) return <span>{renderNodeLabel(id, showEffectName)}</span>;

    const [, type, num] = match;
    const label = renderNodeLabel(id, showEffectName);

    if (type === "target") {
      return <span>{label}</span>;
    }

    return (
      <button
        onClick={() => {
          setActiveTab(type === "effect" ? "effects" : "refs");
          // Scroll to the element after a short delay to let the tab switch
          setTimeout(() => {
            const element = document.getElementById(`${type}-${num}`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        }}
        className="hover:underline text-foreground font-medium"
      >
        {label}
      </button>
    );
  };

  return (
    <div className="h-full w-full flex text-sm">
      <div className="h-full flex flex-col border-r border-border bg-muted/50">
        <button
          onClick={() => setActiveTab("effects")}
          className={cn(
            "px-4 py-2 text-left text-sm font-medium transition-colors",
            activeTab === "effects" ?
              "bg-background border-r-2 border-r-primary text-foreground"
            : "text-muted-foreground hover:bg-accent/50",
          )}
        >
          Effects
        </button>
        <button
          onClick={() => setActiveTab("refs")}
          className={cn(
            "px-4 py-2 text-left text-sm font-medium transition-colors",
            activeTab === "refs" ?
              "bg-background border-r-2 border-r-primary text-foreground"
            : "text-muted-foreground hover:bg-accent/50",
          )}
        >
          Refs
        </button>
        <button
          onClick={() => setActiveTab("cycles")}
          className={cn(
            "px-4 py-2 text-left text-sm font-medium transition-colors",
            activeTab === "cycles" ?
              "bg-background border-r-2 border-r-primary text-foreground"
            : "text-muted-foreground hover:bg-accent/50",
          )}
        >
          Circular chains
        </button>
        <div className="flex-1"></div>
      </div>

      {activeTab === "effects" && (
        <div className="flex-1 min-h-0">
          <div className="p-3 flex flex-col min-h-0 h-full">
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              Effects
            </div>
            <div className="flex-1 overflow-auto">
              {effectList.length === 0 ?
                <div className="text-muted-foreground">
                  No effects recorded.
                </div>
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
                              const locationLabel = formatLocation(
                                edge.location,
                              );
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
      )}

      {activeTab === "refs" && (
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
      )}

      {activeTab === "cycles" && (
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
                              <span className="mx-1 text-muted-foreground">
                                →
                              </span>
                            )}
                            {nodeIndex === cycleInfo.cycle.length - 1 && (
                              <span className="mx-1 text-muted-foreground">
                                →
                              </span>
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
      )}
    </div>
  );
}
