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
  label?: string;
  createdAt?: { fileName?: string; lineNumber?: number; columnNumber?: number };
  createdByEffectId?: number;
  sourcePackage?: string;
  isInfrastructure?: boolean;
  isApproxLocation?: boolean;
  tracks: number;
  triggers: number;
}

export function RefsList(props: RefsListProps) {
  const { refList, effects, effectEdges, formatPath, onOpenRefTab } = props;
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

  // Build ref rows with edge counts
  const allRows = useMemo(() => {
    const trackCounts = new Map<number, number>();
    const triggerCounts = new Map<number, number>();

    for (const edge of effectEdges) {
      const rid = resolveEdgeRefId(edge);
      if (rid === undefined) continue;
      if (edge.type === "track")
        trackCounts.set(rid, (trackCounts.get(rid) ?? 0) + 1);
      else if (edge.type === "trigger")
        triggerCounts.set(rid, (triggerCounts.get(rid) ?? 0) + 1);
    }

    const rows: RefRow[] = refList.map((ref) => ({
      id: ref.id,
      kind: ref.kind ?? "ref",
      label: ref.label,
      createdAt: ref.createdAt,
      createdByEffectId: ref.createdByEffectId,
      sourcePackage: ref.sourcePackage,
      isInfrastructure: ref.isInfrastructure,
      isApproxLocation: ref.isApproxLocation,
      tracks: trackCounts.get(ref.id) ?? 0,
      triggers: triggerCounts.get(ref.id) ?? 0,
    }));

    rows.sort((a, b) => a.id - b.id);
    return rows;
  }, [refList, effectEdges]);

  const filtered = useMemo(() => {
    let list = allRows;
    if (userOnly) {
      list = list.filter((r) => !isExternalRef(r));
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
          const label = (r.label ?? r.kind) + " #" + r.id;
          const loc = formatSourceLocation(r.createdAt, formatPath) ?? "";
          return (
            label.toLowerCase().includes(s) ||
            String(r.id).includes(s) ||
            loc.toLowerCase().includes(s) ||
            (r.label?.toLowerCase().includes(s) ?? false)
          );
        });
      }
    }
    if (sortCol) {
      const mul = sortDir === "desc" ? -1 : 1;
      list = [...list].sort((a, b) => (a[sortCol] - b[sortCol]) * mul);
    }
    return list;
  }, [allRows, search, userOnly, sortCol, sortDir, formatPath]);

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
                  const displayLabel =
                    row.label ?? row.kind;
                  const sourceLabel = formatSourceLocation(
                    row.createdAt,
                    formatPath,
                  );
                  const creator =
                    row.createdByEffectId !== undefined ?
                      effects.get(row.createdByEffectId)
                    : undefined;

                  return (
                    <div
                      key={row.id}
                      id={`ref-${row.id}`}
                      onClick={() => onOpenRefTab(row.id, `${displayLabel} #${row.id}`)}
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
                        <span className="font-medium">{displayLabel}</span>{" "}
                        <span className="text-muted-foreground">#{row.id}</span>
                      </div>
                      <div className="w-20 py-1.5 pr-2">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] uppercase ${
                            row.kind === "reactive-property" ?
                              "bg-amber-500/20 text-amber-400"
                            : row.kind === "computed" ?
                              "bg-purple-500/20 text-purple-400"
                            : row.kind === "shallowRef" ?
                              "bg-blue-500/20 text-blue-400"
                            : "bg-muted text-foreground"
                          }`}
                        >
                          {row.kind === "reactive-property" ? "reactive" : row.kind}
                        </span>
                      </div>
                      <div className="w-48 py-1.5 pr-2 text-muted-foreground truncate flex items-center gap-1">
                        {sourceLabel ?
                          <>
                            <SourceLocationLink source={row.createdAt!}>
                              {sourceLabel}
                            </SourceLocationLink>
                            {row.isApproxLocation && (
                              <span
                                title="Approximate: location is from first usage, not creation site"
                                className="text-muted-foreground/50 text-[9px] cursor-help"
                              >
                                ~
                              </span>
                            )}
                          </>
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

function isExternalRef(row: RefRow): boolean {
  // Infrastructure refs are always excluded in user-only mode
  if (row.isInfrastructure) return true;
  // Purely source-location-based: external if source_file is inside node_modules or absent
  if (!row.createdAt?.fileName) return true;
  return row.createdAt.fileName.includes("/node_modules/");
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
