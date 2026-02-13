import { SourceLocationLink } from "@/components/source-location-link";
import type {
  EffectDebugInfo,
  EffectEdgeDebugInfo,
  RefDebugInfo,
} from "@/hooks/debug-connection-types";
import { resolveEdgeRefId } from "@/lib/edge-utils";
import { formatSourceLocation } from "@/lib/format-source-location";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useMemo, useRef, useState } from "react";

export interface RefsListProps {
  refList: RefDebugInfo[];
  effects: Map<number, EffectDebugInfo>;
  effectEdges: EffectEdgeDebugInfo[];
  formatPath: (path: string) => string;
  onOpenRefTab: (refId: number, label: string) => void;
  onOpenDetailTab: (effectId: number, name: string) => void;
}

type SortColumn = "tracks" | "triggers";
type SortDir = "asc" | "desc";

interface RefRow {
  id: number;
  kind: string;
  createdAt?: { fileName?: string; lineNumber?: number; columnNumber?: number };
  createdByEffectId?: number;
  isInfrastructure?: boolean;
  sourcePackage?: string;
  isTarget: boolean;
  targetLabel?: string;
  tracks: number;
  triggers: number;
}

export function RefsList(props: RefsListProps) {
  const { refList, effects, effectEdges, formatPath, onOpenRefTab } = props;
  const [search, setSearch] = useState("");
  const [hideInfra, setHideInfra] = useState(true);
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

  // Build unified ref rows: real refs + synthesized non-ref reactive targets
  const allRows = useMemo(() => {
    // Count edges per ref/target
    const trackCounts = new Map<number, number>();
    const triggerCounts = new Map<number, number>();
    const targetLabels = new Map<number, string>();
    const knownRefIds = new Set(refList.map((r) => r.id));

    for (const edge of effectEdges) {
      const rid = resolveEdgeRefId(edge);
      if (rid === undefined || rid <= 0) continue;
      if (edge.type === "track")
        trackCounts.set(rid, (trackCounts.get(rid) ?? 0) + 1);
      else if (edge.type === "trigger")
        triggerCounts.set(rid, (triggerCounts.get(rid) ?? 0) + 1);

      // Collect non-ref targets
      if (
        edge.refId === undefined &&
        edge.targetId !== undefined &&
        edge.targetId > 0 &&
        !knownRefIds.has(edge.targetId)
      ) {
        if (edge.targetLabel && !targetLabels.has(edge.targetId)) {
          targetLabels.set(edge.targetId, edge.targetLabel);
        }
      }
    }

    const rows: RefRow[] = [];

    // Real refs
    for (const ref of refList) {
      rows.push({
        id: ref.id,
        kind: ref.kind ?? "ref",
        createdAt: ref.createdAt,
        createdByEffectId: ref.createdByEffectId,
        isInfrastructure: ref.isInfrastructure,
        sourcePackage: ref.sourcePackage,
        isTarget: false,
        tracks: trackCounts.get(ref.id) ?? 0,
        triggers: triggerCounts.get(ref.id) ?? 0,
      });
    }

    // Synthesized non-ref targets
    const seenTargets = new Set<number>();
    for (const edge of effectEdges) {
      if (
        edge.refId !== undefined ||
        edge.targetId === undefined ||
        edge.targetId <= 0
      )
        continue;
      if (knownRefIds.has(edge.targetId) || seenTargets.has(edge.targetId))
        continue;
      seenTargets.add(edge.targetId);
      rows.push({
        id: edge.targetId,
        kind: "reactive",
        isTarget: true,
        targetLabel: targetLabels.get(edge.targetId),
        tracks: trackCounts.get(edge.targetId) ?? 0,
        triggers: triggerCounts.get(edge.targetId) ?? 0,
      });
    }

    rows.sort((a, b) => a.id - b.id);
    return rows;
  }, [refList, effectEdges]);

  const filtered = useMemo(() => {
    let list = allRows;
    if (hideInfra) {
      list = list.filter((r) => !r.isInfrastructure);
    }
    if (userOnly) {
      list = list.filter((r) => !isFrameworkRef(r));
    }
    if (search) {
      if (search.startsWith("#")) {
        const idStr = search.slice(1);
        if (idStr) {
          list = list.filter((r) => String(r.id).startsWith(idStr));
        }
      } else {
        const s = search.toLowerCase();
        list = list.filter((r) => {
          const label = r.kind + " #" + r.id;
          const loc = formatSourceLocation(r.createdAt, formatPath) ?? "";
          return (
            label.toLowerCase().includes(s) ||
            String(r.id).includes(s) ||
            loc.toLowerCase().includes(s) ||
            (r.targetLabel?.toLowerCase().includes(s) ?? false)
          );
        });
      }
    }
    if (sortCol) {
      const mul = sortDir === "desc" ? -1 : 1;
      list = [...list].sort((a, b) => (a[sortCol] - b[sortCol]) * mul);
    }
    return list;
  }, [allRows, search, hideInfra, userOnly, sortCol, sortDir, formatPath]);

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
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Search refs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-7 rounded border border-border bg-background px-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={() => setHideInfra(!hideInfra)}
            className={`h-7 px-2 rounded border text-[10px] font-medium whitespace-nowrap transition-colors ${
              hideInfra ?
                "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:bg-accent/50"
            }`}
          >
            Hide infra
          </button>
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
          {filtered.length} of {allRows.length} refs
        </div>
        <div ref={parentRef} className="flex-1 overflow-auto">
          {filtered.length === 0 ?
            <div className="text-muted-foreground text-xs">No refs match.</div>
          : <>
              <div className="flex items-center text-left text-[10px] text-muted-foreground border-b border-border pb-1">
                <div className="flex-1 pr-2 font-medium">Ref</div>
                <div className="w-20 pr-2 font-medium">Kind</div>
                <div className="w-48 pr-2 font-medium">Source</div>
                <div className="w-36 pr-2 font-medium">Creator</div>
                <SortableHeader
                  col="tracks"
                  label="Tracked by"
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
              </div>
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const row = filtered[virtualRow.index];
                  const displayKind =
                    row.isTarget ? (row.targetLabel ?? "reactive") : row.kind;
                  const sourceLabel = formatSourceLocation(
                    row.createdAt,
                    formatPath,
                  );
                  const creator =
                    row.createdByEffectId !== undefined ?
                      effects.get(row.createdByEffectId)
                    : undefined;
                  const refLabel = `${displayKind} #${row.id}`;

                  return (
                    <div
                      key={row.id}
                      id={`ref-${row.id}`}
                      onClick={() => onOpenRefTab(row.id, refLabel)}
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
                        <span className="font-medium">{displayKind}</span>{" "}
                        <span className="text-muted-foreground">#{row.id}</span>
                      </div>
                      <div className="w-20 py-1.5 pr-2">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] uppercase ${
                            row.isTarget ? "bg-amber-500/20 text-amber-400"
                            : row.kind === "computed" ?
                              "bg-purple-500/20 text-purple-400"
                            : row.kind === "shallowRef" ?
                              "bg-blue-500/20 text-blue-400"
                            : "bg-muted text-foreground"
                          }`}
                        >
                          {row.isTarget ? "reactive" : row.kind}
                        </span>
                      </div>
                      <div className="w-48 py-1.5 pr-2 text-muted-foreground truncate">
                        {sourceLabel ?
                          <SourceLocationLink source={row.createdAt!}>
                            {sourceLabel}
                          </SourceLocationLink>
                        : "—"}
                      </div>
                      <div className="w-36 py-1.5 pr-2 text-muted-foreground truncate">
                        {creator ?
                          `${creator.name ?? "effect"} #${creator.id}`
                        : "—"}
                      </div>
                      <div className="w-20 py-1.5 pr-2 text-right text-muted-foreground tabular-nums">
                        {row.tracks || "—"}
                      </div>
                      <div className="w-20 py-1.5 pr-2 text-right text-muted-foreground tabular-nums">
                        {row.triggers || "—"}
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

function isFrameworkRef(row: RefRow): boolean {
  if (row.sourcePackage) {
    return row.sourcePackage.startsWith("@alloy-js/");
  }
  return false;
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
      className={`w-20 pr-2 font-medium text-right cursor-pointer select-none whitespace-nowrap hover:text-foreground ${active ? "text-foreground" : ""}`}
      onClick={() => props.onSort(props.col)}
    >
      {props.label}
      {arrow}
    </div>
  );
}
