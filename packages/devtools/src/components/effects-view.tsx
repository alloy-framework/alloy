import { CyclesView } from "@/components/cycles-view";
import { EffectsList } from "@/components/effects-list";
import { RefsList } from "@/components/refs-list";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { findCycles } from "@/lib/cycle-detection";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface GraphNode {
  id: string;
  label: string;
  kind: "effect" | "ref" | "target";
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
    const graph = new Map<string, Set<string>>();
    const addEdge = (from: string, to: string) => {
      let existing = graph.get(from);
      if (!existing) {
        existing = new Set();
        graph.set(from, existing);
      }
      existing.add(to);
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

  const handleNavigate = useCallback(
    (tab: string, type: string, num: string) => {
      setActiveTab(tab);
      setTimeout(() => {
        const element = document.getElementById(`${type}-${num}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    },
    [],
  );

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
        <EffectsList
          effectList={effectList}
          effects={effects}
          edgesByEffect={edgesByEffect}
          graphNodes={graphNodes}
          formatPath={formatPath}
          getEdgeTargetKey={getEdgeTargetKey}
          onNavigate={handleNavigate}
        />
      )}

      {activeTab === "refs" && (
        <RefsList
          refList={refList}
          effects={effects}
          graphNodes={graphNodes}
          formatPath={formatPath}
          onNavigate={handleNavigate}
        />
      )}

      {activeTab === "cycles" && (
        <CyclesView
          cycles={cycles}
          effects={effects}
          graphNodes={graphNodes}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
