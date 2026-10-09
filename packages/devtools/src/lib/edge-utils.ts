import type {
  EffectEdgeDebugInfo,
  RefDebugInfo,
} from "@/hooks/debug-connection-types";

/**
 * Get a human-readable display label for a ref.
 * Prefers the label field (e.g. "TSOutputSymbol.name"), falls back to kind.
 * Does NOT include the numeric ID — callers show that separately.
 */
export function formatRefLabel(
  ref: RefDebugInfo | undefined,
  id: number,
): string {
  if (!ref) return `ref #${id}`;
  if (ref.label) return ref.label;
  return ref.kind ?? "ref";
}

/**
 * Resolve the ref/target ID from an edge. For reactive objects (e.g.
 * shallowReactive), trigger edges may have refId=null and only targetId.
 * This function returns whichever is valid.
 */
export function resolveEdgeRefId(
  edge: Pick<EffectEdgeDebugInfo, "refId" | "targetId">,
): number | undefined {
  if (edge.refId !== undefined && edge.refId !== null) {
    return edge.refId;
  }
  return edge.targetId;
}

/**
 * Get the adjacency graph key for an edge's target (e.g. "ref:4" or "target:7").
 */
export function getEdgeTargetKey(
  edge: Pick<EffectEdgeDebugInfo, "refId" | "targetId" | "targetKind">,
): string | null {
  const targetId = edge.targetId ?? edge.refId;
  if (targetId === undefined) return null;
  const kind = edge.targetKind === "target" ? "target" : "ref";
  return `${kind}:${targetId}`;
}

/**
 * Format a human-readable label for an edge's target ref/reactive object.
 * Looks up the ref in the refs map and produces labels like "shallowRef #4".
 * Falls back to "ref #<id>" or "—" if nothing is available.
 */
export function formatEdgeTarget(
  edge: Pick<
    EffectEdgeDebugInfo,
    "refId" | "targetId" | "targetKind" | "targetLabel"
  >,
  refs: Map<number, RefDebugInfo>,
): string {
  // Resolve the ID (refId or targetId fallback)
  const resolvedId = resolveEdgeRefId(edge);
  if (resolvedId === undefined) return "—";

  // Look up in refs map for a friendly label
  const ref = refs.get(resolvedId);
  if (ref) {
    const label = formatRefLabel(ref, resolvedId);
    // For standalone display, append ID when label is just a generic kind
    return ref.label ? label : `${label} #${resolvedId}`;
  }

  // Prefer explicit label from the edge itself
  if (edge.targetLabel) return edge.targetLabel;

  // For reactive targets, show "target #<id>"
  if (edge.targetKind === "target" && edge.targetId !== undefined) {
    return `target #${edge.targetId}`;
  }

  return `ref #${resolvedId}`;
}
