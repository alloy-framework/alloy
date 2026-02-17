import type {
  EffectDebugInfo,
  EffectEdgeDebugInfo,
  RefDebugInfo,
} from "@/hooks/debug-connection-types";
import { formatRefLabel, resolveEdgeRefId } from "@/lib/edge-utils";
import {
  buildGraphLookups,
  findAncestorWithIncomingTriggers,
  findDescendantsForTargets,
} from "@/lib/graph-traversal";
import dagre from "dagre";
import { useEffect, useMemo, useState } from "react";

export interface ReactiveChainProps {
  effectId: number;
  effects: Map<number, EffectDebugInfo>;
  refs: Map<number, RefDebugInfo>;
  effectEdges: EffectEdgeDebugInfo[];
  effectEdgesVersion?: number;
  effectsVersion?: number;
  refsVersion?: number;
  onOpenDetailTab: (effectId: number, name: string) => void;
  onOpenRefTab?: (refId: number, label: string) => void;
}

interface NodeData {
  id: string;
  effectId: number;
  label: string;
  type: "focal" | "effect" | "summary";
  count?: number;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  refId: number;
  isSpawn?: boolean;
}

interface LayoutNode extends NodeData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LayoutEdge extends EdgeData {
  points: { x: number; y: number }[];
}

const DEPTH_LIMIT = 2;
const MAX_FAN_PER_REF = 8;
const NODE_W = 150;
const NODE_H = 44;
const SUMMARY_W = 90;
const SUMMARY_H = 32;
const PAD = 24;

export function ReactiveChain(props: ReactiveChainProps) {
  const {
    effectId,
    effects,
    refs,
    effectEdges,
    effectEdgesVersion,
    effectsVersion,
    refsVersion,
    onOpenDetailTab,
    onOpenRefTab,
  } = props;

  const [debouncedVersion, setDebouncedVersion] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVersion((v) => v + 1);
    }, 500);
    return () => clearTimeout(timer);
  }, [effectEdgesVersion, effectsVersion]);

  const lookups = useMemo(
    () => buildGraphLookups(effects, effectEdges),
    // debouncedVersion batches rapid data updates — actual data deps are effects/effectEdges
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [effectEdges, effects, debouncedVersion],
  );

  // Build the reactive neighborhood graph via BFS
  const graph = useMemo(() => {
    const nodes = new Map<string, NodeData>();
    const edges: EdgeData[] = [];
    const edgeSet = new Set<string>();

    const currentEffect = effects.get(effectId);
    if (!currentEffect) return { nodes: [], edges: [] };

    nodes.set(`e:${effectId}`, {
      id: `e:${effectId}`,
      effectId,
      label: currentEffect.name ?? "(anonymous)",
      type: "focal",
    });

    // --- Upstream BFS: find what caused this effect ---
    const upQueue: { eid: number; depth: number }[] = [
      { eid: effectId, depth: 0 },
    ];
    const visitedUp = new Set<number>([effectId]);
    const summaryUpCounts = new Map<string, number>();

    while (upQueue.length > 0) {
      const { eid, depth } = upQueue.shift()!;
      const trigEdges = lookups.triggeredEdgesByConsumer.get(eid);

      // If this effect has no incoming trigger edges, it was likely
      // spawned by an ancestor effect. Walk up the owner chain to find
      // the nearest ancestor that was triggered.
      if (!trigEdges || trigEdges.length === 0) {
        if (depth < DEPTH_LIMIT) {
          const ancestor = findAncestorWithIncomingTriggers(
            eid,
            lookups.effectToOwnerEffect,
            lookups.triggeredEdgesByConsumer,
          );
          if (ancestor !== undefined) {
            const ek = `spawn:${ancestor}:${eid}`;
            if (!edgeSet.has(ek)) {
              edgeSet.add(ek);
              addEffectNode(nodes, effects, ancestor, "effect");
              edges.push({
                id: ek,
                source: `e:${ancestor}`,
                target: `e:${eid}`,
                refId: -1,
                isSpawn: true,
              });
              if (!visitedUp.has(ancestor)) {
                visitedUp.add(ancestor);
                upQueue.push({ eid: ancestor, depth: depth + 1 });
              }
            }
          }
        }
        continue;
      }

      // Group by causedBy to find distinct upstream producers
      const seenProducers = new Set<string>();
      for (const edge of trigEdges) {
        if (edge.causedBy === undefined) continue;
        const rid = resolveEdgeRefId(edge)!;
        const key = `${edge.causedBy}:${rid}`;
        if (seenProducers.has(key)) continue;
        seenProducers.add(key);

        const upId = edge.causedBy;
        const ek = `${upId}:${eid}:${rid}`;
        if (edgeSet.has(ek)) continue;
        edgeSet.add(ek);

        if (depth >= DEPTH_LIMIT) {
          const nk = `e:${eid}`;
          summaryUpCounts.set(nk, (summaryUpCounts.get(nk) ?? 0) + 1);
          continue;
        }

        addEffectNode(nodes, effects, upId, "effect");
        edges.push({
          id: ek,
          source: `e:${upId}`,
          target: `e:${eid}`,
          refId: rid,
        });

        if (!visitedUp.has(upId)) {
          visitedUp.add(upId);
          upQueue.push({ eid: upId, depth: depth + 1 });
        }
      }
    }

    // --- Downstream BFS: find what this effect triggers ---
    const downQueue: { eid: number; depth: number }[] = [
      { eid: effectId, depth: 0 },
    ];
    const visitedDown = new Set<number>([effectId]);
    const summaryDownCounts = new Map<string, number>();

    while (downQueue.length > 0) {
      const { eid, depth } = downQueue.shift()!;
      const trigEdges = lookups.triggeredEdgesByProducer.get(eid);

      // If this effect has no outgoing trigger edges, look for descendant
      // effects (via owner chain) that write to the same targets that
      // triggered this effect. This captures the render-spawning feedback
      // loop: target triggers parent → parent spawns children → children
      // write back to the same target.
      if (!trigEdges || trigEdges.length === 0) {
        if (depth < DEPTH_LIMIT) {
          // Collect target IDs that trigger this effect
          const incomingEdges = lookups.triggeredEdgesByConsumer.get(eid);
          const relevantTargets = new Set<number>();
          if (incomingEdges) {
            for (const e of incomingEdges) {
              const rid = resolveEdgeRefId(e);
              if (rid !== undefined && rid > 0) relevantTargets.add(rid);
            }
          }

          const descendants = findDescendantsForTargets(
            eid,
            relevantTargets,
            lookups.ownerToChildren,
            lookups.producersByTarget,
          );
          const shown = descendants.slice(0, MAX_FAN_PER_REF);
          const extra = descendants.length - shown.length;
          for (const descId of shown) {
            const ek = `spawn:${eid}:${descId}`;
            if (edgeSet.has(ek)) continue;
            edgeSet.add(ek);
            addEffectNode(nodes, effects, descId, "effect");
            edges.push({
              id: ek,
              source: `e:${eid}`,
              target: `e:${descId}`,
              refId: -1,
              isSpawn: true,
            });
            if (!visitedDown.has(descId)) {
              visitedDown.add(descId);
              downQueue.push({ eid: descId, depth: depth + 1 });
            }
          }
          if (extra > 0) {
            const sumId = `sum:spawn:${eid}`;
            nodes.set(sumId, {
              id: sumId,
              effectId: -1,
              label: `+${extra} more spawned`,
              type: "summary",
              count: extra,
            });
            edges.push({
              id: `${eid}:${sumId}`,
              source: `e:${eid}`,
              target: sumId,
              refId: -1,
              isSpawn: true,
            });
          }
        }
        continue;
      }

      // Group by ref to cap fan-out
      const refFanout = new Map<number, number>();
      const refSkipped = new Map<number, number>();
      for (const edge of trigEdges) {
        const rid = resolveEdgeRefId(edge)!;
        const downId = edge.effectId;
        if (downId === eid) continue;

        const ek = `${eid}:${downId}:${rid}`;
        if (edgeSet.has(ek)) continue;
        edgeSet.add(ek);

        if (depth >= DEPTH_LIMIT) {
          if (nodes.has(`e:${downId}`)) {
            // Already in graph — draw the edge back to it
            edges.push({
              id: ek,
              source: `e:${eid}`,
              target: `e:${downId}`,
              refId: rid,
            });
          } else {
            const nk = `e:${eid}`;
            summaryDownCounts.set(nk, (summaryDownCounts.get(nk) ?? 0) + 1);
          }
          continue;
        }

        const fanCount = refFanout.get(rid) ?? 0;
        if (fanCount >= MAX_FAN_PER_REF) {
          refSkipped.set(rid, (refSkipped.get(rid) ?? 0) + 1);
          continue;
        }
        refFanout.set(rid, fanCount + 1);

        addEffectNode(nodes, effects, downId, "effect");
        edges.push({
          id: ek,
          source: `e:${eid}`,
          target: `e:${downId}`,
          refId: rid,
        });

        if (!visitedDown.has(downId)) {
          visitedDown.add(downId);
          downQueue.push({ eid: downId, depth: depth + 1 });
        }
      }

      // Summary for capped fan-out
      for (const [rid, count] of refSkipped) {
        const sumId = `sum:fan:${eid}:${rid}`;
        nodes.set(sumId, {
          id: sumId,
          effectId: -1,
          label: `+${count} more`,
          type: "summary",
          count,
        });
        edges.push({
          id: `${eid}:${sumId}`,
          source: `e:${eid}`,
          target: sumId,
          refId: rid,
        });
      }
    }

    // Add summary nodes for depth boundary
    for (const [nodeId, count] of summaryUpCounts) {
      const sumId = `sum:up:${nodeId}`;
      nodes.set(sumId, {
        id: sumId,
        effectId: -1,
        label: `+${count} upstream`,
        type: "summary",
        count,
      });
      edges.push({
        id: `${sumId}:${nodeId}`,
        source: sumId,
        target: nodeId,
        refId: -1,
      });
    }
    for (const [nodeId, count] of summaryDownCounts) {
      const sumId = `sum:down:${nodeId}`;
      nodes.set(sumId, {
        id: sumId,
        effectId: -1,
        label: `+${count} downstream`,
        type: "summary",
        count,
      });
      edges.push({
        id: `${nodeId}:${sumId}`,
        source: nodeId,
        target: sumId,
        refId: -1,
      });
    }

    return { nodes: [...nodes.values()], edges };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectId, effects, refs, lookups, refsVersion]);

  // Layout with dagre
  const layout = useMemo((): {
    nodes: LayoutNode[];
    edges: LayoutEdge[];
    width: number;
    height: number;
  } | null => {
    if (graph.nodes.length <= 1) return null;

    const g = new dagre.graphlib.Graph({ multigraph: true });
    g.setGraph({ rankdir: "LR", nodesep: 16, ranksep: 100, edgesep: 10 });
    g.setDefaultEdgeLabel(() => ({}));

    for (const node of graph.nodes) {
      const w = node.type === "summary" ? SUMMARY_W : NODE_W;
      const h = node.type === "summary" ? SUMMARY_H : NODE_H;
      g.setNode(node.id, { width: w, height: h });
    }
    for (const edge of graph.edges) {
      g.setEdge(edge.source, edge.target, {}, edge.id);
    }

    dagre.layout(g);

    const layoutNodes: LayoutNode[] = graph.nodes.map((node) => {
      const pos = g.node(node.id);
      return {
        ...node,
        x: pos.x,
        y: pos.y,
        width: pos.width,
        height: pos.height,
      };
    });

    const layoutEdges: LayoutEdge[] = graph.edges.map((edge) => {
      const edgeObj = g.edge({ v: edge.source, w: edge.target, name: edge.id });
      return { ...edge, points: edgeObj?.points ?? [] };
    });

    const graphInfo = g.graph();
    return {
      nodes: layoutNodes,
      edges: layoutEdges,
      width: (graphInfo.width ?? 400) + PAD * 2,
      height: (graphInfo.height ?? 200) + PAD * 2,
    };
  }, [graph]);

  if (!layout) {
    return (
      <div className="text-xs text-muted-foreground">
        No reactive chain detected for this effect.
      </div>
    );
  }

  return (
    <div>
      <svg width={layout.width} height={layout.height}>
        <style>{`
          .chain-edge { stroke: var(--color-muted-foreground); opacity: 0.3; fill: none; stroke-width: 1.5; }
          .chain-edge:hover, .chain-edge-clickable:hover { opacity: 0.7; stroke-width: 2; }
          .chain-edge-clickable { stroke: var(--color-primary); opacity: 0.35; }
          .chain-edge-spawn { stroke: var(--color-amber-500, #f59e0b); opacity: 0.5; }
          .chain-label { fill: var(--color-muted-foreground); opacity: 0.7; font-size: 8px; }
          .chain-label-clickable { fill: var(--color-primary); cursor: pointer; }
          .chain-label-clickable:hover { opacity: 1; text-decoration: underline; }
          .chain-label-spawn { fill: var(--color-amber-500, #f59e0b); opacity: 0.7; font-style: italic; }
        `}</style>
        <defs>
          <marker
            id="chain-arrow"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#888" />
          </marker>
          <marker
            id="chain-arrow-spawn"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
          </marker>
        </defs>
        <g transform={`translate(${PAD}, ${PAD})`}>
          {layout.edges.map((edge) => (
            <GraphEdgePath
              key={edge.id}
              edge={edge}
              refs={refs}
              onOpenRefTab={onOpenRefTab}
            />
          ))}
          {layout.nodes.map((node) => (
            <GraphNode
              key={node.id}
              node={node}
              onOpenDetailTab={onOpenDetailTab}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

// --- Sub-components ---

function GraphEdgePath(props: {
  edge: LayoutEdge;
  refs: Map<number, RefDebugInfo>;
  onOpenRefTab?: (refId: number, label: string) => void;
}) {
  const { edge, refs: refMap, onOpenRefTab } = props;
  if (edge.points.length < 2) return null;

  // Build a smooth cubic bezier path through dagre's waypoints
  const pts = edge.points;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  if (pts.length === 2) {
    d += ` L ${pts[1].x} ${pts[1].y}`;
  } else {
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const mx = (prev.x + curr.x) / 2;
      d += ` C ${mx} ${prev.y}, ${mx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
  }

  const mid = pts[Math.floor(pts.length / 2)];
  const isSpawn = edge.isSpawn === true;
  const ref = !isSpawn && edge.refId > 0 ? refMap.get(edge.refId) : undefined;
  const label =
    isSpawn ? "spawns"
    : ref ? formatRefLabel(ref, edge.refId)
    : edge.refId > 0 ? `ref #${edge.refId}`
    : "";
  const clickable = !isSpawn && edge.refId > 0 && onOpenRefTab;

  const handleClick =
    clickable ?
      () => {
        onOpenRefTab!(edge.refId, `${label || "ref"} #${edge.refId}`);
      }
    : undefined;

  return (
    <g onClick={handleClick} className={clickable ? "cursor-pointer" : ""}>
      {/* Wider invisible hit area */}
      {clickable && (
        <path d={d} fill="none" stroke="transparent" strokeWidth={12} />
      )}
      <path
        d={d}
        className={`chain-edge ${isSpawn ? "chain-edge-spawn" : ""} ${clickable ? "chain-edge-clickable" : ""}`}
        markerEnd={isSpawn ? "url(#chain-arrow-spawn)" : "url(#chain-arrow)"}
        strokeDasharray={isSpawn ? "4 3" : undefined}
      />
      {label && mid && (
        <text
          x={mid.x}
          y={mid.y - 5}
          textAnchor="middle"
          className={`chain-label ${isSpawn ? "chain-label-spawn" : ""} ${clickable ? "chain-label-clickable" : ""}`}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function GraphNode(props: {
  node: LayoutNode;
  onOpenDetailTab: (effectId: number, name: string) => void;
}) {
  const { node, onOpenDetailTab } = props;
  const x = node.x - node.width / 2;
  const y = node.y - node.height / 2;
  const isClickable = node.effectId > 0 && node.type !== "focal";
  const truncLen = node.type === "summary" ? 14 : 18;
  const displayLabel =
    node.label.length > truncLen ?
      node.label.slice(0, truncLen - 2) + "…"
    : node.label;

  return (
    <foreignObject x={x} y={y} width={node.width} height={node.height}>
      <div
        className={`h-full flex flex-col justify-center items-center rounded-lg px-2.5 text-center leading-tight shadow-sm ${
          node.type === "focal" ?
            "border-2 border-primary bg-primary/10 text-primary font-semibold"
          : node.type === "summary" ?
            "border border-dashed border-muted-foreground/30 bg-muted/10 text-muted-foreground italic"
          : "border border-border bg-card text-foreground hover:bg-accent/50 hover:border-primary/40 transition-colors"
        } ${isClickable ? "cursor-pointer" : ""}`}
        onClick={
          isClickable ?
            () => onOpenDetailTab(node.effectId, node.label)
          : undefined
        }
        title={node.label + (node.effectId > 0 ? ` #${node.effectId}` : "")}
      >
        <div className="text-[10px] truncate w-full">{displayLabel}</div>
        {node.effectId > 0 && (
          <div className="text-[8px] text-muted-foreground/70">
            #{node.effectId}
          </div>
        )}
      </div>
    </foreignObject>
  );
}

// --- Helpers ---

function addEffectNode(
  nodes: Map<string, NodeData>,
  effects: Map<number, EffectDebugInfo>,
  eid: number,
  type: "effect",
) {
  const key = `e:${eid}`;
  if (!nodes.has(key)) {
    const effect = effects.get(eid);
    nodes.set(key, {
      id: key,
      effectId: eid,
      label: effect?.name ?? `#${eid}`,
      type,
    });
  }
}
