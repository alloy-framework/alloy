import type {
  EffectDebugInfo,
  EffectEdgeDebugInfo,
} from "@/hooks/debug-connection-types";
import { formatSourceLocation } from "@/lib/format-source-location";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useMemo, useRef, useState } from "react";

export interface EffectsListProps {
  effectList: EffectDebugInfo[];
  edgesByEffect: Map<number, EffectEdgeDebugInfo[]>;
  triggersByCausedBy: Map<number, number>;
  runCountByEffect: Map<number, number>;
  formatPath: (path: string) => string;
  onOpenDetailTab: (effectId: number, name: string) => void;
}

const TYPE_COLORS: Record<string, string> = {
  render: "bg-blue-500/20 text-blue-400",
  content: "bg-green-500/20 text-green-400",
  binder: "bg-purple-500/20 text-purple-400",
  resource: "bg-orange-500/20 text-orange-400",
  list: "bg-yellow-500/20 text-yellow-400",
  symbol: "bg-cyan-500/20 text-cyan-400",
  context: "bg-pink-500/20 text-pink-400",
  collection: "bg-teal-500/20 text-teal-400",
  reactive: "bg-red-500/20 text-red-400",
  debug: "bg-gray-500/20 text-gray-400",
  tracer: "bg-indigo-500/20 text-indigo-400",
};

type SortColumn = "track" | "triggered" | "triggers" | "runs";
type SortDir = "asc" | "desc";

function isExternalEffect(effect: EffectDebugInfo): boolean {
  // Purely source-location-based: external if source_file is inside node_modules or absent
  if (!effect.createdAt?.fileName) return true;
  return effect.createdAt.fileName.includes("/node_modules/");
}

function edgeCounts(
  effect: EffectDebugInfo,
  edgesByEffect: Map<number, EffectEdgeDebugInfo[]>,
  triggersByCausedBy: Map<number, number>,
): { track: number; triggered: number; triggers: number } {
  const edges = edgesByEffect.get(effect.id) ?? [];
  const track = edges.filter((e) => e.type === "track").length;
  // "Triggered by": trigger edges where this effect is the consumer
  const triggerEdges = edges.filter((e) => e.type === "trigger");
  const isMemo = effect.name?.includes("memo");
  // Memos are always eagerly triggered on creation; hide that initial one
  const triggered =
    isMemo && triggerEdges.length > 0 ?
      triggerEdges.length - 1
    : triggerEdges.length;
  // "Triggers": count of trigger edges where this effect is the producer (causedBy)
  const triggers = triggersByCausedBy.get(effect.id) ?? 0;
  return { track, triggered, triggers };
}

export function EffectsList(props: EffectsListProps) {
  const {
    effectList,
    edgesByEffect,
    triggersByCausedBy,
    runCountByEffect,
    formatPath,
    onOpenDetailTab,
  } = props;
  const [search, setSearch] = useState("");
  const [userOnly, setUserOnly] = useState(false);
  const [sortCol, setSortCol] = useState<SortColumn | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = useCallback(
    (col: SortColumn) => {
      if (sortCol === col) {
        setSortDir((d) => (d === "desc" ? "asc" : "desc"));
      } else {
        setSortCol(col);
        setSortDir("desc");
      }
    },
    [sortCol],
  );

  const filtered = useMemo(() => {
    let list = effectList;
    if (search) {
      if (search.startsWith("#")) {
        const idStr = search.slice(1);
        if (idStr) {
          list = list.filter((e) => String(e.id).startsWith(idStr));
        }
      } else {
        const lowerSearch = search.toLowerCase();
        list = list.filter((e) => {
          const name = e.name ?? "(anonymous)";
          const loc = formatSourceLocation(e.createdAt, formatPath) ?? "";
          return (
            name.toLowerCase().includes(lowerSearch) ||
            String(e.id).includes(lowerSearch) ||
            loc.toLowerCase().includes(lowerSearch)
          );
        });
      }
    }
    if (userOnly) {
      list = list.filter((e) => !isExternalEffect(e));
    }
    if (sortCol) {
      const mul = sortDir === "desc" ? -1 : 1;
      list = [...list].sort((a, b) => {
        if (sortCol === "runs") {
          return (
            ((runCountByEffect.get(a.id) ?? 0) -
              (runCountByEffect.get(b.id) ?? 0)) *
            mul
          );
        }
        const ca = edgeCounts(a, edgesByEffect, triggersByCausedBy);
        const cb = edgeCounts(b, edgesByEffect, triggersByCausedBy);
        return (ca[sortCol] - cb[sortCol]) * mul;
      });
    }
    return list;
  }, [
    effectList,
    search,
    userOnly,
    formatPath,
    sortCol,
    sortDir,
    edgesByEffect,
    triggersByCausedBy,
    runCountByEffect,
  ]);

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 20,
  });

  return (
    <div className="flex-1 min-h-0">
      <div className="p-3 flex flex-col min-h-0 h-full">
        {/* Header with search and filter */}
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Search effects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-7 rounded border border-border bg-background px-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={() => setUserOnly(!userOnly)}
            className={`h-7 px-2 rounded border text-[10px] font-medium whitespace-nowrap transition-colors ${
              userOnly ?
                "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:bg-accent/50"
            }`}
          >
            User only
          </button>
        </div>
        <div className="text-[10px] text-muted-foreground mb-1">
          {filtered.length} of {effectList.length} effects
        </div>
        {/* Effect rows */}
        <div ref={parentRef} className="flex-1 overflow-auto">
          {filtered.length === 0 ?
            <div className="text-muted-foreground text-xs">
              No effects match.
            </div>
          : <>
              <div className="flex items-center text-left text-[10px] text-muted-foreground border-b border-border pb-1">
                <div className="flex-1 pr-2 font-medium">Effect</div>
                <div className="w-20 pr-2 font-medium">Type</div>
                <div className="w-48 pr-2 font-medium">Source</div>
                <SortableHeader
                  col="track"
                  label="Tracks"
                  sortCol={sortCol}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
                <SortableHeader
                  col="triggered"
                  label="Triggered"
                  sortCol={sortCol}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
                <SortableHeader
                  col="triggers"
                  label="Triggers"
                  sortCol={sortCol}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
                <SortableHeader
                  col="runs"
                  label="Runs"
                  sortCol={sortCol}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
              </div>
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const effect = filtered[virtualRow.index];
                  const counts = edgeCounts(
                    effect,
                    edgesByEffect,
                    triggersByCausedBy,
                  );
                  const displayName = effect.name ?? "(anonymous)";
                  const typeColor =
                    TYPE_COLORS[effect.type ?? ""] ??
                    "bg-muted text-foreground";
                  const isExternal = isExternalEffect(effect);

                  return (
                    <div
                      key={effect.id}
                      id={`effect-${effect.id}`}
                      onClick={() => onOpenDetailTab(effect.id, displayName)}
                      className="flex items-center border-b border-border/50 cursor-pointer hover:bg-accent/30 transition-colors text-xs"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <div className="flex-1 py-1.5 pr-2">
                        <span className="font-medium">{displayName}</span>{" "}
                        <span className="text-muted-foreground">
                          #{effect.id}
                        </span>
                      </div>
                      <div className="w-20 py-1.5 pr-2">
                        <div className="flex items-center gap-1">
                          {effect.type && (
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] uppercase ${typeColor}`}
                            >
                              {effect.type}
                            </span>
                          )}
                          {isExternal && (
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              ext
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-48 py-1.5 pr-2 text-muted-foreground truncate">
                        {formatSourceLocation(effect.createdAt, formatPath) ??
                          "—"}
                      </div>
                      <div className="w-16 py-1.5 pr-2 text-right text-muted-foreground tabular-nums">
                        {counts.track || "—"}
                      </div>
                      <div className="w-16 py-1.5 pr-2 text-right text-muted-foreground tabular-nums">
                        {counts.triggered || "—"}
                      </div>
                      <div className="w-16 py-1.5 pr-2 text-right text-muted-foreground tabular-nums">
                        {counts.triggers || "—"}
                      </div>
                      <div className="w-16 py-1.5 pr-2 text-right text-muted-foreground tabular-nums">
                        {runCountByEffect.get(effect.id) || "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}

function SortableHeader(props: {
  col: SortColumn;
  label: string;
  sortCol: SortColumn | null;
  sortDir: SortDir;
  onSort: (col: SortColumn) => void;
}) {
  const active = props.sortCol === props.col;
  const arrow =
    active ?
      props.sortDir === "desc" ?
        " ▼"
      : " ▲"
    : "";
  return (
    <div
      className={`w-16 pr-2 font-medium text-right cursor-pointer select-none whitespace-nowrap hover:text-foreground ${active ? "text-foreground" : ""}`}
      onClick={() => props.onSort(props.col)}
    >
      {props.label}
      {arrow}
    </div>
  );
}
