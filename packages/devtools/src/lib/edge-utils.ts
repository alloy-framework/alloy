import type {
  EffectEdgeDebugInfo,
  RefDebugInfo,
} from "@/hooks/debug-connection-types";

/**
 * Resolve the ref/target ID from an edge. For reactive objects (e.g.
 * shallowReactive), trigger edges may have refId=null and only targetId.
 * This function returns whichever is valid.
 */
export function resolveEdgeRefId(
  edge: Pick<EffectEdgeDebugInfo, "refId" | "targetId">,
): number | undefined {
  if (edge.refId !== undefined && edge.refId !== null && edge.refId > 0) {
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
  // Prefer explicit label from the edge itself
  if (edge.targetLabel) return edge.targetLabel;

  // For reactive targets, show "target #<id>"
  if (edge.targetKind === "target" && edge.targetId !== undefined) {
    return `target #${edge.targetId}`;
  }

  // Resolve the ID (refId or targetId fallback)
  const resolvedId = resolveEdgeRefId(edge);
  if (resolvedId === undefined) return "—";

  // Look up in refs map for a friendly kind label
  const ref = refs.get(resolvedId);
  if (ref) {
    return `${ref.kind ?? "ref"} #${resolvedId}`;
  }

  return `ref #${resolvedId}`;
}
