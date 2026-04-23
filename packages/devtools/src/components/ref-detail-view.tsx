import { EventBadge } from "@/components/event-badge";
import { SourceLocationLink } from "@/components/source-location-link";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import type {
  EffectDebugInfo,
  EffectEdgeDebugInfo,
} from "@/hooks/debug-connection-types";
import { formatRefLabel, resolveEdgeRefId } from "@/lib/edge-utils";
import { formatSourceLocation } from "@/lib/format-source-location";
import { useMemo } from "react";

export interface RefDetailViewProps {
  refId: string;
  onOpenDetailTab: (effectId: number, name: string) => void;
  onOpenRefTab: (refId: number, label: string) => void;
}

export function RefDetailView(props: RefDetailViewProps) {
  const { effects, refs, effectEdges, formatPath } =
    useDebugConnectionContext();

  const numericId = useMemo(() => {
    const match = props.refId.match(/^ref:(\d+)$/);
    return match ? Number(match[1]) : null;
  }, [props.refId]);

  const refInfo = numericId !== null ? refs.get(numericId) : undefined;

  // Collect all edges for this ref/target
  const { trackEdges, triggerEdges } = useMemo(() => {
    if (numericId === null) return { trackEdges: [], triggerEdges: [] };
    const track: EffectEdgeDebugInfo[] = [];
    const trigger: EffectEdgeDebugInfo[] = [];

    for (const edge of effectEdges) {
      const rid = resolveEdgeRefId(edge);
      if (rid !== numericId) continue;
      if (edge.type === "track") track.push(edge);
      else if (edge.type === "trigger") trigger.push(edge);
    }

    return { trackEdges: track, triggerEdges: trigger };
  }, [effectEdges, numericId]);

  // Deduplicate effects per section
  const trackingEffects = useMemo(
    () => dedupeEffects(trackEdges, effects),
    [trackEdges, effects],
  );
  // "Written by" = causedBy (producer) side of trigger edges
  const writingEffects = useMemo(() => {
    const map = new Map<number, number>();
    for (const edge of triggerEdges) {
      if (edge.causedBy !== undefined) {
        map.set(edge.causedBy, (map.get(edge.causedBy) ?? 0) + 1);
      }
    }
    return [...map.entries()]
      .map(([eid, count]) => ({
        effect: effects.get(eid)!,
        effectId: eid,
        count,
      }))
      .filter(
        (
          e,
        ): e is { effect: EffectDebugInfo; effectId: number; count: number } =>
          e.effect !== undefined,
      );
  }, [triggerEdges, effects]);
  // "Triggers" = effectId (consumer) side of trigger edges
  const triggeredEffects = useMemo(
    () => dedupeEffects(triggerEdges, effects),
    [triggerEdges, effects],
  );

  if (numericId === null) {
    return (
      <div className="text-sm text-muted-foreground/70">Invalid ref ID.</div>
    );
  }

  const kind = refInfo?.kind ?? "ref";
  const displayName = formatRefLabel(refInfo, numericId);
  const isReactiveProp = kind === "reactive-property";
  const sourceLabel =
    refInfo?.createdAt ?
      formatSourceLocation(refInfo.createdAt, formatPath)
    : undefined;

  return (
    <div className="p-4 text-sm space-y-4 overflow-auto h-full">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-base">{displayName}</span>
          <span className="text-muted-foreground">#{numericId}</span>
          <span
            className={`rounded px-2 py-0.5 text-[10px] uppercase tracking-wide ${
              isReactiveProp ? "bg-amber-500/20 text-amber-400"
              : kind === "computed" ? "bg-purple-500/20 text-purple-400"
              : kind === "shallowRef" ? "bg-blue-500/20 text-blue-400"
              : "bg-muted text-foreground"
            }`}
          >
            {isReactiveProp ? "reactive" : kind}
          </span>
        </div>
        {refInfo?.createdAt && sourceLabel && (
          <div className="text-xs flex items-center gap-1">
            <SourceLocationLink source={refInfo.createdAt}>
              {sourceLabel}
            </SourceLocationLink>
            {refInfo.isApproxLocation && (
              <span
                title="Approximate: location is from first usage, not creation site"
                className="text-muted-foreground/50 text-[9px] cursor-help"
              >
                ~
              </span>
            )}
          </div>
        )}
      </div>

      {/* Summary stats */}
      <div className="flex gap-4">
        <StatBadge
          label="Tracked by"
          count={trackingEffects.length}
          color="text-blue-400"
        />
        <StatBadge
          label="Written by"
          count={writingEffects.length}
          color="text-green-400"
        />
        <StatBadge
          label="Triggers"
          count={triggeredEffects.length}
          color="text-orange-400"
        />
      </div>

      {/* Tracked by */}
      <EffectSection
        title="Tracked by"
        subtitle="Effects that read this ref"
        effects={trackingEffects}
        edges={trackEdges}
        onOpenDetailTab={props.onOpenDetailTab}
      />

      {/* Written by */}
      <EffectSection
        title="Written by"
        subtitle="Effects that write to this ref"
        effects={writingEffects}
        edges={triggerEdges}
        onOpenDetailTab={props.onOpenDetailTab}
      />

      {/* Triggers */}
      <EffectSection
        title="Triggers"
        subtitle="Effects re-run when this ref changes"
        effects={triggeredEffects}
        edges={triggerEdges}
        onOpenDetailTab={props.onOpenDetailTab}
      />

      {/* Timeline */}
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Edge Timeline ({trackEdges.length + triggerEdges.length} events)
        </div>
        <EdgeTimeline
          edges={[...trackEdges, ...triggerEdges].sort((a, b) => a.id - b.id)}
          effects={effects}
          onOpenDetailTab={props.onOpenDetailTab}
        />
      </div>
    </div>
  );
}

function StatBadge(props: { label: string; count: number; color: string }) {
  return (
    <div className="rounded border border-border px-3 py-1.5 text-center">
      <div className={`text-lg font-semibold tabular-nums ${props.color}`}>
        {props.count}
      </div>
      <div className="text-[10px] text-muted-foreground">{props.label}</div>
    </div>
  );
}

function EffectSection(props: {
  title: string;
  subtitle: string;
  effects: { effect: EffectDebugInfo; count: number }[];
  edges: EffectEdgeDebugInfo[];
  onOpenDetailTab: (effectId: number, name: string) => void;
}) {
  if (props.effects.length === 0) return null;

  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
        {props.title}
      </div>
      <div className="text-[10px] text-muted-foreground mb-2">
        {props.subtitle}
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-[10px] text-muted-foreground border-b border-border">
            <th className="pb-1 pr-2 font-medium">Effect</th>
            <th className="pb-1 pr-2 font-medium text-right">Count</th>
          </tr>
        </thead>
        <tbody>
          {props.effects.map(({ effect, count }) => (
            <tr
              key={effect.id}
              onClick={() =>
                props.onOpenDetailTab(effect.id, effect.name ?? `#${effect.id}`)
              }
              className="border-b border-border/50 cursor-pointer hover:bg-accent/30 transition-colors"
            >
              <td className="py-1 pr-2">
                <span className="font-medium">
                  {effect.name ?? "(anonymous)"}
                </span>{" "}
                <span className="text-muted-foreground">#{effect.id}</span>
              </td>
              <td className="py-1 pr-2 text-right text-muted-foreground tabular-nums">
                {count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EdgeTimeline(props: {
  edges: EffectEdgeDebugInfo[];
  effects: Map<number, EffectDebugInfo>;
  onOpenDetailTab: (effectId: number, name: string) => void;
}) {
  if (props.edges.length === 0) {
    return (
      <div className="text-xs text-muted-foreground">No events recorded.</div>
    );
  }

  // Show last 200 edges max
  const displayed =
    props.edges.length > 200 ? props.edges.slice(-200) : props.edges;
  const truncated = props.edges.length > 200 ? props.edges.length - 200 : 0;

  return (
    <>
      {truncated > 0 && (
        <div className="text-[10px] text-muted-foreground mb-1">
          Showing last 200 of {props.edges.length} events
        </div>
      )}
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-muted-foreground border-b border-border">
            <th className="pb-1 pr-3 font-medium">Event</th>
            <th className="pb-1 pr-3 font-medium">Effect</th>
            <th className="pb-1 font-medium">Key</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((edge, i) => {
            const effect = props.effects.get(edge.effectId);
            return (
              <tr key={`${edge.id}-${i}`} className="border-b border-border/50">
                <td className="py-1 pr-3">
                  <EventBadge type={edge.type} label={edge.type} />
                </td>
                <td className="py-1 pr-3">
                  <button
                    onClick={() =>
                      props.onOpenDetailTab(
                        edge.effectId,
                        effect?.name ?? `#${edge.effectId}`,
                      )
                    }
                    className="hover:underline"
                  >
                    {effect?.name ?? "(anonymous)"}{" "}
                    <span className="text-muted-foreground">
                      #{edge.effectId}
                    </span>
                  </button>
                </td>
                <td className="py-1 text-muted-foreground">
                  {edge.targetKey !== undefined ? String(edge.targetKey) : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function dedupeEffects(
  edges: EffectEdgeDebugInfo[],
  effects: Map<number, EffectDebugInfo>,
): { effect: EffectDebugInfo; count: number }[] {
  const counts = new Map<number, number>();
  for (const edge of edges) {
    counts.set(edge.effectId, (counts.get(edge.effectId) ?? 0) + 1);
  }
  const result: { effect: EffectDebugInfo; count: number }[] = [];
  for (const [eid, count] of counts) {
    const effect = effects.get(eid);
    if (effect) result.push({ effect, count });
  }
  result.sort((a, b) => b.count - a.count);
  return result;
}
