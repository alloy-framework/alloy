import { EffectsList } from "@/components/effects-list";
import { RefsList } from "@/components/refs-list";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export interface EffectsViewProps {
  onOpenDetailTab: (effectId: number, name: string) => void;
  onOpenRefTab: (refId: number, label: string) => void;
}

export function EffectsView(props: EffectsViewProps) {
  const {
    effects,
    refs,
    effectEdges,
    effectLifecycleEvents,
    formatPath,
    effectsVersion,
    refsVersion,
    effectEdgesVersion,
    effectLifecycleVersion,
  } = useDebugConnectionContext();
  const [activeTab, setActiveTab] = useState("effects");

  // Use version counters in dependencies to trigger re-computation when data changes
  const effectList = useMemo(
    () => Array.from(effects.values()).sort((a, b) => a.id - b.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [effects, effectsVersion],
  );
  const refList = useMemo(
    () =>
      activeTab !== "refs" ?
        []
      : Array.from(refs.values()).sort((a, b) => a.id - b.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refs, refsVersion, activeTab],
  );
  const edgeList = useMemo(
    () => effectEdges,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [effectEdges, effectEdgesVersion],
  );

  const edgesByEffect = useMemo(() => {
    if (activeTab !== "effects") return new Map<number, typeof edgeList>();
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
  }, [edgeList, activeTab]);

  // Index trigger edges by causedBy (producer) for outgoing trigger counts
  const triggersByCausedBy = useMemo(() => {
    if (activeTab !== "effects") return new Map<number, number>();
    const map = new Map<number, number>();
    for (const edge of edgeList) {
      if (edge.type === "trigger" && edge.causedBy !== undefined) {
        map.set(edge.causedBy, (map.get(edge.causedBy) ?? 0) + 1);
      }
    }
    return map;
  }, [edgeList, activeTab]);

  const runCountByEffect = useMemo(() => {
    if (activeTab !== "effects") return new Map<number, number>();
    const map = new Map<number, number>();
    for (const event of effectLifecycleEvents) {
      if (event.event === "ran") {
        map.set(event.effectId, (map.get(event.effectId) ?? 0) + 1);
      }
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectLifecycleEvents, effectLifecycleVersion, activeTab]);

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
        <div className="flex-1"></div>
      </div>

      {activeTab === "effects" && (
        <EffectsList
          effectList={effectList}
          edgesByEffect={edgesByEffect}
          triggersByCausedBy={triggersByCausedBy}
          runCountByEffect={runCountByEffect}
          formatPath={formatPath}
          onOpenDetailTab={props.onOpenDetailTab}
        />
      )}

      {activeTab === "refs" && (
        <RefsList
          refList={refList}
          effects={effects}
          effectEdges={edgeList}
          formatPath={formatPath}
          onOpenRefTab={props.onOpenRefTab}
          onOpenDetailTab={props.onOpenDetailTab}
        />
      )}
    </div>
  );
}
