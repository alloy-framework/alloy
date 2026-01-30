import * as devalue from "devalue";

export type RenderTreeNodeKind =
  | "root"
  | "component"
  | "intrinsic"
  | "printHook"
  | "text"
  | "memo"
  | "customContext"
  | "fragment";

export interface DevtoolsRenderTreeMessage {
  type: string;
  [key: string]: unknown;
}

export interface DevtoolsRenderTreeNode {
  id: number;
  kind: RenderTreeNodeKind;
  name?: string;
  propsSerialized?: string;
  value?: string;
  source?: {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
  };
}

export interface RenderTreeNodeAddedMessage extends DevtoolsRenderTreeMessage {
  type: "render:nodeAdded";
  parentId: number | null;
  node: DevtoolsRenderTreeNode;
}

export interface RenderTreeNodeRemovedMessage
  extends DevtoolsRenderTreeMessage {
  type: "render:nodeRemoved";
  parentId: number | null;
  id: number;
}

export interface RenderTreeNodeUpdatedMessage
  extends DevtoolsRenderTreeMessage {
  type: "render:nodeUpdated";
  id: number;
  propsSerialized?: string;
}

export interface RenderTreeResetMessage extends DevtoolsRenderTreeMessage {
  type: "render:reset";
}

export type RenderTreeMessage =
  | RenderTreeNodeAddedMessage
  | RenderTreeNodeRemovedMessage
  | RenderTreeNodeUpdatedMessage
  | RenderTreeResetMessage;

export interface RenderTreeNodeState {
  id: string;
  name?: string;
  props?: Record<string, unknown>;
  text?: string;
  kind: RenderTreeNodeKind;
  children: string[];
  source?: {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
  };
}

export interface RenderTreeState {
  nodes: Map<string, RenderTreeNodeState>;
  roots: string[];
  hiddenParents: Map<string, string | null>;
}

export interface RenderTreeViewNode {
  id: string;
  name: string;
  props?: Record<string, unknown>;
  children?: RenderTreeViewNode[];
  text?: string;
  kind?: RenderTreeNodeKind;
  liftedFrom?: string;
  source?: {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
  };
}

export function createRenderTreeState(): RenderTreeState {
  return {
    nodes: new Map(),
    roots: [],
    hiddenParents: new Map(),
  };
}

function defaultNameForKind(kind: RenderTreeNodeKind) {
  switch (kind) {
    case "root":
      return "Root";
    case "memo":
      return "Memo";
    case "printHook":
      return "PrintHook";
    case "customContext":
      return "CustomContext";
    case "intrinsic":
      return "Intrinsic";
    case "fragment":
      return "Fragment";
    default:
      return "Component";
  }
}

function ensureChildList(parent: RenderTreeNodeState) {
  parent.children ??= [];
  return parent.children;
}

function removeNodeRecursive(state: RenderTreeState, id: string) {
  const node = state.nodes.get(id);
  if (!node) return;
  for (const childId of node.children) {
    removeNodeRecursive(state, childId);
  }
  state.nodes.delete(id);
}

export function applyRenderTreeMessage(
  state: RenderTreeState,
  message: RenderTreeMessage,
) {
  if (message.type === "render:reset") {
    state.nodes.clear();
    state.roots = [];
    state.hiddenParents.clear();
    return;
  }

  if (message.type === "render:nodeAdded") {
    const id = String(message.node.id);
    const rawParentId =
      message.parentId === null ? null : String(message.parentId);
    const parentId =
      rawParentId && state.hiddenParents.has(rawParentId) ?
        (state.hiddenParents.get(rawParentId) ?? null)
      : rawParentId;
    const kind = message.node.kind;
    if (kind === "memo") {
      state.hiddenParents.set(id, parentId ?? null);
      return;
    }
    let props: Record<string, unknown> | undefined;
    if (message.node.propsSerialized) {
      try {
        props = devalue.parse(message.node.propsSerialized) as Record<
          string,
          unknown
        >;
      } catch {
        props = undefined;
      }
    }
    const node: RenderTreeNodeState = {
      id,
      kind,
      name:
        kind === "text" ? "Text" : (
          (message.node.name ?? defaultNameForKind(kind))
        ),
      props,
      text: message.node.value,
      children: [],
      source: message.node.source,
    };
    state.nodes.set(id, node);

    if (parentId === null) {
      if (kind !== "root") {
        // eslint-disable-next-line no-console
        console.warn("Unparented render tree node received:", {
          id,
          kind,
          name: message.node.name,
          value: message.node.value,
        });
      }
      state.roots.push(id);
      return;
    }

    const parent = state.nodes.get(parentId);
    if (!parent) {
      // eslint-disable-next-line no-console
      console.warn("Render tree node parent missing:", {
        id,
        kind,
        name: message.node.name,
        value: message.node.value,
        parentId,
      });
      state.roots.push(id);
      return;
    }

    const list = ensureChildList(parent);
    list.push(id);
    return;
  }

  if (message.type === "render:nodeRemoved") {
    const id = String(message.id);
    const rawParentId =
      message.parentId === null ? null : String(message.parentId);
    const parentId =
      rawParentId && state.hiddenParents.has(rawParentId) ?
        (state.hiddenParents.get(rawParentId) ?? null)
      : rawParentId;

    if (state.hiddenParents.has(id)) {
      state.hiddenParents.delete(id);
      return;
    }

    if (parentId === null) {
      state.roots = state.roots.filter((rootId) => rootId !== id);
      removeNodeRecursive(state, id);
      return;
    }

    const parent = state.nodes.get(parentId);
    if (!parent) {
      removeNodeRecursive(state, id);
      return;
    }

    parent.children = parent.children.filter((childId) => childId !== id);
    removeNodeRecursive(state, id);
  }

  if (message.type === "render:nodeUpdated") {
    const id = String(message.id);
    const node = state.nodes.get(id);
    if (!node) return;
    if (message.propsSerialized !== undefined) {
      try {
        node.props = devalue.parse(message.propsSerialized) as Record<
          string,
          unknown
        >;
      } catch {
        node.props = undefined;
      }
    } else {
      node.props = undefined;
    }
  }
}

function buildNodeWithLifts(
  state: RenderTreeState,
  id: string,
): { node: RenderTreeViewNode | null; lifted: RenderTreeViewNode[] } {
  const node = state.nodes.get(id);
  if (!node) return { node: null, lifted: [] };

  const isContextNode = (candidate?: RenderTreeNodeState) => {
    return (
      candidate?.kind === "component" &&
      candidate.name !== undefined &&
      (candidate.name.startsWith("Context ") || candidate.name === "Provider")
    );
  };

  let childIds = node.children;
  const lifted: RenderTreeViewNode[] = [];

  if (node.kind === "component" && childIds.length === 1) {
    const child = state.nodes.get(childIds[0]);
    if (isContextNode(child)) {
      const built = buildNodeWithLifts(state, child!.id);
      if (built.node) {
        built.node.liftedFrom = node.id;
        for (const liftedNode of built.lifted) {
          liftedNode.liftedFrom = node.id;
        }
        lifted.push(built.node, ...built.lifted);
      } else {
        for (const liftedNode of built.lifted) {
          liftedNode.liftedFrom = node.id;
        }
        lifted.push(...built.lifted);
      }
      childIds = [];
    }
  }

  const children: RenderTreeViewNode[] = [];
  for (const childId of childIds) {
    const built = buildNodeWithLifts(state, childId);
    if (built.node) {
      children.push(built.node);
    }
    if (built.lifted.length > 0) {
      children.push(...built.lifted);
    }
  }

  const viewNode: RenderTreeViewNode = {
    id: node.id,
    name: node.name ?? defaultNameForKind(node.kind),
    props: node.props,
    text: node.text,
    kind: node.kind,
    source: node.source,
    children: children.length > 0 ? children : undefined,
  };

  return { node: viewNode, lifted };
}

export function buildRenderTreeView(state: RenderTreeState) {
  const roots = state.roots
    .map((rootId) => state.nodes.get(rootId))
    .filter(Boolean) as RenderTreeNodeState[];

  const view: RenderTreeViewNode[] = [];
  for (const root of roots) {
    if (root.kind === "root") {
      for (const childId of root.children) {
        const built = buildNodeWithLifts(state, childId);
        if (built.node) view.push(built.node);
        if (built.lifted.length > 0) view.push(...built.lifted);
      }
    } else {
      const built = buildNodeWithLifts(state, root.id);
      if (built.node) view.push(built.node);
      if (built.lifted.length > 0) view.push(...built.lifted);
    }
  }

  return view;
}
