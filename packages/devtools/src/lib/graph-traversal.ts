import type {
  EffectDebugInfo,
  EffectEdgeDebugInfo,
} from "@/hooks/debug-connection-types";
import { getEdgeTargetKey, resolveEdgeRefId } from "@/lib/edge-utils";

export interface GraphLookups {
  triggeredEdgesByConsumer: Map<number, EffectEdgeDebugInfo[]>;
  triggeredEdgesByProducer: Map<number, EffectEdgeDebugInfo[]>;
  ownerToChildren: Map<number, number[]>;
  effectToOwnerEffect: Map<number, number>;
  producersByTarget: Map<number, Set<number>>;
}

/**
 * Build lookup maps for reactive graph traversal from raw effect and edge data.
 */
export function buildGraphLookups(
  effects: Map<number, EffectDebugInfo>,
  effectEdges: EffectEdgeDebugInfo[],
): GraphLookups {
  const triggeredEdgesByConsumer = new Map<number, EffectEdgeDebugInfo[]>();
  const triggeredEdgesByProducer = new Map<number, EffectEdgeDebugInfo[]>();

  for (const edge of effectEdges) {
    if (edge.type !== "trigger") continue;
    const rid = resolveEdgeRefId(edge);
    if (rid === undefined || rid <= 0) continue;
    pushMap(triggeredEdgesByConsumer, edge.effectId, edge);
    if (edge.causedBy !== undefined) {
      pushMap(triggeredEdgesByProducer, edge.causedBy, edge);
    }
  }

  const contextIdToEffect = new Map<number, number>();
  for (const [eid, eff] of effects) {
    if (eff.contextId !== undefined) {
      contextIdToEffect.set(eff.contextId, eid);
    }
  }
  const ownerToChildren = new Map<number, number[]>();
  const effectToOwnerEffect = new Map<number, number>();
  for (const [eid, eff] of effects) {
    if (eff.ownerContextId != null) {
      const parentId = contextIdToEffect.get(eff.ownerContextId);
      if (parentId !== undefined) {
        pushMap(ownerToChildren, parentId, eid);
        effectToOwnerEffect.set(eid, parentId);
      }
    }
  }

  const producersByTarget = new Map<number, Set<number>>();
  for (const edge of effectEdges) {
    if (edge.type !== "trigger" || edge.causedBy === undefined) continue;
    const rid = resolveEdgeRefId(edge);
    if (rid === undefined || rid <= 0) continue;
    let set = producersByTarget.get(rid);
    if (!set) {
      set = new Set();
      producersByTarget.set(rid, set);
    }
    set.add(edge.causedBy);
  }

  return {
    triggeredEdgesByConsumer,
    triggeredEdgesByProducer,
    ownerToChildren,
    effectToOwnerEffect,
    producersByTarget,
  };
}

/**
 * Walk the ownership tree from `parentId` to find descendant effects that write
 * to specific targets. Captures feedback loops where a parent is triggered by a
 * target, spawns children, and those children write back to the same target.
 */
export function findDescendantsForTargets(
  parentId: number,
  relevantTargets: Set<number>,
  ownerToChildren: Map<number, number[]>,
  producersByTarget: Map<number, Set<number>>,
): number[] {
  const targetProducers = new Set<number>();
  for (const targetId of relevantTargets) {
    const producers = producersByTarget.get(targetId);
    if (producers) {
      for (const p of producers) targetProducers.add(p);
    }
  }

  const result: number[] = [];
  const visited = new Set<number>();
  const queue = [parentId];
  visited.add(parentId);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const children = ownerToChildren.get(current);
    if (!children) continue;
    for (const child of children) {
      if (visited.has(child)) continue;
      visited.add(child);
      if (targetProducers.has(child)) {
        result.push(child);
      }
      queue.push(child);
    }
  }
  return result;
}

/**
 * Walk the owner chain upward from `childId` to find the nearest ancestor
 * effect that has incoming trigger edges.
 */
export function findAncestorWithIncomingTriggers(
  childId: number,
  effectToOwnerEffect: Map<number, number>,
  triggeredEdgesByConsumer: Map<number, EffectEdgeDebugInfo[]>,
): number | undefined {
  let current = childId;
  const visited = new Set<number>();
  for (let i = 0; i < 200; i++) {
    const parentId = effectToOwnerEffect.get(current);
    if (parentId === undefined) break;
    if (visited.has(parentId)) break; // cycle in ownership chain
    visited.add(parentId);
    if (triggeredEdgesByConsumer.has(parentId)) {
      return parentId;
    }
    current = parentId;
  }
  return undefined;
}

/**
 * Build a full adjacency graph (string-keyed) including track edges,
 * trigger edges, and spawn edges. Used for cycle detection.
 */
export function buildAdjacencyGraph(
  effectEdges: EffectEdgeDebugInfo[],
  lookups: GraphLookups,
): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();
  const addEdge = (from: string, to: string) => {
    let s = graph.get(from);
    if (!s) {
      s = new Set();
      graph.set(from, s);
    }
    s.add(to);
  };

  for (const edge of effectEdges) {
    const targetKey = getEdgeTargetKey(edge);
    if (!targetKey) continue;
    if (edge.type === "track") {
      addEdge(targetKey, `effect:${edge.effectId}`);
    } else if (edge.type === "trigger") {
      if (edge.causedBy !== undefined) {
        addEdge(`effect:${edge.causedBy}`, targetKey);
      }
      addEdge(targetKey, `effect:${edge.effectId}`);
    }
  }

  // Spawn edges: for consumers with no outgoing trigger edges, find descendant
  // effects (via owner chain) that write to the same targets.
  for (const [consumerId, incomingEdges] of lookups.triggeredEdgesByConsumer) {
    if (lookups.triggeredEdgesByProducer.has(consumerId)) continue;
    const targets = new Set<number>();
    for (const e of incomingEdges) {
      const rid = resolveEdgeRefId(e);
      if (rid !== undefined && rid > 0) targets.add(rid);
    }
    const descendants = findDescendantsForTargets(
      consumerId,
      targets,
      lookups.ownerToChildren,
      lookups.producersByTarget,
    );
    for (const descId of descendants) {
      addEdge(`effect:${consumerId}`, `effect:${descId}`);
    }
  }

  return graph;
}

function pushMap<K, V>(map: Map<K, V[]>, key: K, value: V) {
  let list = map.get(key);
  if (!list) {
    list = [];
    map.set(key, list);
  }
  list.push(value);
}
