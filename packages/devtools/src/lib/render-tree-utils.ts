import type { RenderTreeNode } from "@/components/render-tree";

export interface RenderTreeIndex {
  parentById: Map<string, string | null>;
  liftedFromMap: Map<string, string>;
  /** Reverse of liftedFromMap: original node id → lifted node id */
  liftedToMap: Map<string, string>;
  /** O(1) node lookup by id */
  nodeById: Map<string, RenderTreeNode>;
}

export function buildRenderTreeIndex(
  renderTree: RenderTreeNode[],
): RenderTreeIndex {
  const parentById = new Map<string, string | null>();
  const liftedFromMap = new Map<string, string>();
  const liftedToMap = new Map<string, string>();
  const nodeById = new Map<string, RenderTreeNode>();
  const stack: Array<{ node: RenderTreeNode; parent: string | null }> =
    renderTree.map((node) => ({ node, parent: null }));
  while (stack.length) {
    const { node, parent } = stack.pop()!;
    parentById.set(node.id, parent);
    nodeById.set(node.id, node);
    if (node.liftedFrom) {
      liftedFromMap.set(node.id, node.liftedFrom);
      liftedToMap.set(node.liftedFrom, node.id);
    }
    if (node.children) {
      for (const child of node.children) {
        stack.push({ node: child, parent: node.id });
      }
    }
  }
  return { parentById, liftedFromMap, liftedToMap, nodeById };
}

export function invertFileToRenderNode(
  fileToRenderNode: Map<string, string>,
): Map<string, string> {
  const map = new Map<string, string>();
  for (const [fileId, nodeId] of fileToRenderNode.entries()) {
    map.set(nodeId, fileId);
  }
  return map;
}

export function findFileIdForRenderNode(
  nodeId: string,
  fileNodeToId: Map<string, string>,
  parentById: Map<string, string | null>,
  liftedFromMap: Map<string, string>,
): string | undefined {
  let current: string | null | undefined = nodeId;
  while (current) {
    const fileId = fileNodeToId.get(current);
    if (fileId) return fileId;
    const liftedFrom = liftedFromMap.get(current);
    if (liftedFrom) {
      current = liftedFrom;
      continue;
    }
    current = parentById.get(current) ?? null;
  }
  return undefined;
}

/** O(1) lookup using the pre-built reverse `liftedToMap`. */
export function findLiftedRootForNode(
  nodeId: string,
  liftedToMap: Map<string, string>,
): string | undefined {
  return liftedToMap.get(nodeId);
}

/**
 * Find a render tree node by id.
 * Uses the pre-built `nodeById` index for O(1) lookup when available,
 * falls back to DFS when no index is provided.
 */
export function findRenderNodeInTree(
  renderTree: RenderTreeNode[],
  nodeId: string,
  nodeById?: Map<string, RenderTreeNode>,
): RenderTreeNode | undefined {
  if (nodeById) return nodeById.get(nodeId);
  const stack = [...renderTree];
  while (stack.length) {
    const current = stack.pop()!;
    if (current.id === nodeId) return current;
    if (current.children) {
      stack.push(...current.children);
    }
  }
  return undefined;
}

export function collectTextNodes(
  root: RenderTreeNode,
): Array<{ id: string; text: string }> | [] {
  const result: Array<{ id: string; text: string }> = [];
  const stack: RenderTreeNode[] = [root];
  while (stack.length) {
    const current = stack.pop()!;
    if (current.text !== undefined) {
      if (current.text.length > 0) {
        result.push({ id: current.id, text: current.text });
      }
      continue;
    }
    if (current.children) {
      for (let i = current.children.length - 1; i >= 0; i--) {
        stack.push(current.children[i]);
      }
    }
  }
  return result;
}

export function findFirstTextNodeId(root: RenderTreeNode): string | undefined {
  const stack: RenderTreeNode[] = [root];
  while (stack.length) {
    const current = stack.pop()!;
    if (current.text !== undefined) {
      return current.id;
    }
    if (current.children) {
      for (let i = current.children.length - 1; i >= 0; i--) {
        stack.push(current.children[i]);
      }
    }
  }
  return undefined;
}
