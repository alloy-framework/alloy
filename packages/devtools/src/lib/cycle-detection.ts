export interface CycleInfo {
  cycle: string[];
  count: number;
}

export function normalizeCycle(nodes: string[]): string {
  const length = nodes.length;
  if (length === 0) return "";
  const candidates: string[][] = [];
  for (let i = 0; i < length; i += 1) {
    if (!nodes[i].startsWith("effect:")) continue;
    candidates.push(nodes.slice(i).concat(nodes.slice(0, i)));
  }
  const rotations = candidates.length ? candidates : [nodes];
  let best = rotations[0];
  for (let i = 1; i < rotations.length; i += 1) {
    const current = rotations[i];
    if (current.join("->") < best.join("->")) {
      best = current;
    }
  }
  return best.join("->");
}

export function findCycles(
  adjacency: Map<string, Set<string>>,
  edgeList: Array<{
    effectId: number;
    refId?: number;
    targetId?: number;
    targetKind?: string;
    type: string;
  }>,
  maxDepth = 20,
): CycleInfo[] {
  const cycles = new Map<string, CycleInfo>();
  const nodes = Array.from(adjacency.keys());

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

  // Count the NUMBER of edges (not sum of their counts) by from->to
  const edgeCounts = new Map<string, Map<string, number>>();
  for (const edge of edgeList) {
    let from: string, to: string;
    const targetKey = getEdgeTargetKey(edge);
    if (!targetKey) continue;
    if (edge.type === "trigger") {
      from = `effect:${edge.effectId}`;
      to = targetKey;
    } else if (edge.type === "track") {
      from = targetKey;
      to = `effect:${edge.effectId}`;
    } else {
      continue;
    }

    if (!edgeCounts.has(from)) edgeCounts.set(from, new Map());
    const toMap = edgeCounts.get(from)!;
    const currentCount = toMap.get(to) ?? 0;
    // Count the number of edge events, each edge represents one traversal
    toMap.set(to, currentCount + 1);
  }

  for (const start of nodes) {
    const stack: string[] = [];
    const stackSet = new Set<string>();

    const dfs = (node: string, depth: number) => {
      if (depth > maxDepth) return;

      // Check if we've found a cycle back to the start
      if (node === start && stack.length > 0) {
        const cycle = [...stack];
        const key = normalizeCycle(cycle);
        if (!cycles.has(key)) {
          // Calculate cycle count as minimum of all edge counts in the cycle
          let minCount = Infinity;
          for (let i = 0; i < cycle.length; i++) {
            const from = cycle[i];
            const to = cycle[(i + 1) % cycle.length];
            const count = edgeCounts.get(from)?.get(to) ?? 0;
            if (count > 0) {
              minCount = Math.min(minCount, count);
            }
          }
          cycles.set(key, {
            cycle,
            count: minCount === Infinity ? 0 : minCount,
          });
        }
        return;
      }

      // If already in current path, skip (but not if it's the start we're looking for)
      if (stackSet.has(node)) return;

      stack.push(node);
      stackSet.add(node);

      const neighbors = adjacency.get(node) ?? new Set<string>();
      for (const next of neighbors) {
        dfs(next, depth + 1);
      }

      stack.pop();
      stackSet.delete(node);
    };

    dfs(start, 0);
  }

  return Array.from(cycles.values());
}
