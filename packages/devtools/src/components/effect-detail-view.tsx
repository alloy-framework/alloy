import { EventBadge } from "@/components/event-badge";
import { ReactiveChain } from "@/components/reactive-chain";
import { SourceLocationLink } from "@/components/source-location-link";
import { useDebugConnectionContext } from "@/hooks/debug-connection-context";
import type {
  EffectEdgeDebugInfo,
  EffectLifecycleEvent,
  RefDebugInfo,
} from "@/hooks/debug-connection-types";
import { formatEdgeTarget } from "@/lib/edge-utils";
import { formatSourceLocation } from "@/lib/format-source-location";
import { useMemo } from "react";

export interface EffectDetailViewProps {
  effectId: string;
  onOpenDetailTab?: (effectId: number, name: string) => void;
  onOpenRefTab?: (refId: number, label: string) => void;
}

type TimelineEvent =
  | (EffectEdgeDebugInfo & { _kind: "edge" })
  | (EffectLifecycleEvent & { _kind: "lifecycle" });

export function EffectDetailView(props: EffectDetailViewProps) {
  const {
    effects,
    refs,
    effectEdges,
    effectLifecycleEvents,
    formatPath,
    effectEdgesVersion,
    effectLifecycleVersion,
    effectsVersion,
    refsVersion,
  } = useDebugConnectionContext();

  const numericId = useMemo(() => {
    const match = props.effectId.match(/^effect:(\d+)$/);
    return match ? Number(match[1]) : null;
  }, [props.effectId]);

  const effect = numericId !== null ? effects.get(numericId) : undefined;

  // Build a unified timeline of edge + lifecycle events for this effect
  const timeline = useMemo(() => {
    if (numericId === null) return [];

    // Edge events (track, trigger) for this effect as consumer
    let edges: TimelineEvent[] = effectEdges
      .filter(
        (e) =>
          e.effectId === numericId && !(e.refId !== undefined && e.refId < 0),
      )
      .map((e) => ({ ...e, _kind: "edge" as const }));

    // Hide the initial trigger for memo effects (it's just the memo's first run)
    const isMemo = effect?.name?.includes("memo");
    if (isMemo && edges.length > 0) {
      const firstTriggerIdx = edges.findIndex(
        (e) => e._kind === "edge" && e.type === "trigger",
      );
      if (firstTriggerIdx !== -1) {
        edges = edges.filter((_, i) => i !== firstTriggerIdx);
      }
    }

    // Lifecycle events (ran, skipped — exclude scheduled)
    const lifecycle: TimelineEvent[] = effectLifecycleEvents
      .filter((e) => e.effectId === numericId && e.event !== "scheduled")
      .map((e) => ({ ...e, _kind: "lifecycle" as const }));

    return [...edges, ...lifecycle].sort((a, b) => a.id - b.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    effectEdges,
    effectLifecycleEvents,
    numericId,
    effect,
    effectEdgesVersion,
    effectLifecycleVersion,
  ]);

  if (!effect) {
    return (
      <div className="text-sm text-muted-foreground/70">
        No effect details available.
      </div>
    );
  }

  const displayName = effect.name ?? "(anonymous)";
  const sourceLabel = formatSourceLocation(effect.createdAt, formatPath);
  const runCount = effectLifecycleEvents.filter(
    (e) => e.effectId === numericId && e.event === "ran",
  ).length;

  return (
    <div className="p-4 text-sm space-y-4 overflow-auto h-full">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-base">{displayName}</span>
          <span className="text-muted-foreground">#{effect.id}</span>
          {effect.type && (
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide">
              {effect.type}
            </span>
          )}
          {effect.sourcePackage && (
            <span className="rounded bg-primary/10 text-primary px-2 py-0.5 text-[10px]">
              {effect.sourcePackage}
            </span>
          )}
          {runCount > 0 && (
            <span className="rounded bg-green-500/10 text-green-400 px-2 py-0.5 text-[10px]">
              {runCount} {runCount === 1 ? "run" : "runs"}
            </span>
          )}
        </div>
        {effect.component && (
          <div className="text-xs text-muted-foreground">
            Owner: {effect.component}
          </div>
        )}
        {effect.createdAt && sourceLabel && (
          <div className="text-xs">
            <SourceLocationLink source={effect.createdAt}>
              {sourceLabel}
            </SourceLocationLink>
          </div>
        )}
      </div>

      {/* Reactive chain */}
      {numericId !== null && (
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            Reactive Chain
          </div>
          <ReactiveChain
            effectId={numericId}
            effects={effects}
            refs={refs}
            effectEdges={effectEdges}
            effectEdgesVersion={effectEdgesVersion}
            effectsVersion={effectsVersion}
            refsVersion={refsVersion}
            onOpenDetailTab={props.onOpenDetailTab ?? (() => {})}
            onOpenRefTab={props.onOpenRefTab}
          />
        </div>
      )}

      {/* Lifecycle timeline */}
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Lifecycle ({timeline.length} events)
        </div>
        {timeline.length === 0 ?
          <div className="text-xs text-muted-foreground">
            No lifecycle events recorded.
          </div>
        : <TimelineTable events={timeline} effects={effects} refs={refs} />}
      </div>
    </div>
  );
}

function TimelineTable(props: {
  events: TimelineEvent[];
  effects: Map<number, { name?: string }>;
  refs: Map<number, RefDebugInfo>;
}) {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="pb-1 pr-3 font-medium">Event</th>
          <th className="pb-1 pr-3 font-medium">Target</th>
          <th className="pb-1 font-medium">Key</th>
        </tr>
      </thead>
      <tbody>
        {props.events.map((event, i) => {
          if (event._kind === "lifecycle") {
            const triggerLabel =
              event.triggerRefId !== undefined ?
                formatEdgeTarget({ refId: event.triggerRefId }, props.refs)
              : undefined;
            return (
              <tr
                key={`lc-${event.id}-${i}`}
                className="border-b border-border/50"
              >
                <td className="py-1 pr-3">
                  <EventBadge type={event.event} label={event.event} />
                </td>
                <td className="py-1 pr-3">{triggerLabel ?? "—"}</td>
                <td className="py-1 text-muted-foreground">—</td>
              </tr>
            );
          }
          const targetLabel = formatEdgeTarget(event, props.refs);
          const causedByEffect =
            event.type === "trigger" && event.causedBy !== undefined ?
              props.effects.get(event.causedBy)
            : undefined;
          const causedByLabel =
            causedByEffect ?
              `← ${causedByEffect.name ?? "effect"} #${event.causedBy}`
            : event.type === "trigger" ? "← (external)"
            : undefined;
          return (
            <tr
              key={`edge-${event.id}-${i}`}
              className="border-b border-border/50"
            >
              <td className="py-1 pr-3">
                <EventBadge
                  type={event.type}
                  label={event.type === "trigger" ? "triggered by" : event.type}
                />
              </td>
              <td className="py-1 pr-3">
                {targetLabel}
                {causedByLabel && (
                  <span className="ml-2 text-muted-foreground">
                    {causedByLabel}
                  </span>
                )}
              </td>
              <td className="py-1 text-muted-foreground">
                {event.targetKey !== undefined ? String(event.targetKey) : "—"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
