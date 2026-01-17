import type { RenderTreeNode } from "@/components/render-tree";

export interface RenderTreeIndex {
  parentById: Map<string, string | null>;
  liftedFromMap: Map<string, string>;
}

export function buildRenderTreeIndex(
  renderTree: RenderTreeNode[],
): RenderTreeIndex {
  const parentById = new Map<string, string | null>();
  const liftedFromMap = new Map<string, string>();
  const stack: Array<{ node: RenderTreeNode; parent: string | null }> =
    renderTree.map((node) => ({ node, parent: null }));
  while (stack.length) {
    const { node, parent } = stack.pop()!;
    parentById.set(node.id, parent);
    if (node.liftedFrom) {
      liftedFromMap.set(node.id, node.liftedFrom);
    }
    if (node.children) {
      for (const child of node.children) {
        stack.push({ node: child, parent: node.id });
      }
    }
  }
  return { parentById, liftedFromMap };
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

export function findLiftedRootForNode(
  nodeId: string,
  liftedFromMap: Map<string, string>,
): string | undefined {
  for (const [candidateId, liftedFrom] of liftedFromMap.entries()) {
    if (liftedFrom === nodeId) return candidateId;
  }
  return undefined;
}

export function findRenderNodeInTree(
  renderTree: RenderTreeNode[],
  nodeId: string,
): RenderTreeNode | undefined {
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
