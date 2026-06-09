import type {
  ComponentAddedMessage,
  ComponentRemovedMessage,
  ComponentRootAddedMessage,
  ComponentRootRemovedMessage,
  ComponentUpdatedMessage,
  RenderNodeAddedMessage,
  RenderNodeRemovedMessage,
  RenderNodeUpdatedMessage,
  RenderResetMessage,
  SourceLocation,
} from "@alloy-js/core/devtools";
import * as devalue from "devalue";

export type RenderTreeNodeKind = string;

export type RenderTreeMessage =
  | RenderNodeAddedMessage
  | RenderNodeRemovedMessage
  | RenderNodeUpdatedMessage
  | RenderResetMessage
  | ComponentAddedMessage
  | ComponentUpdatedMessage
  | ComponentRemovedMessage
  | ComponentRootAddedMessage
  | ComponentRootRemovedMessage;

export interface RenderTreeNodeState {
  id: string;
  name?: string;
  props?: Record<string, unknown>;
  text?: string;
  kind: RenderTreeNodeKind;
  children: string[];
  source?: SourceLocation;
  parentId?: string | null;
}

export interface RenderTreeState {
  nodes: Map<string, RenderTreeNodeState>;
  components: Map<string, ComponentNodeState>;
  rootComponents: Map<string, string[]>;
  roots: string[];
}

export interface ComponentNodeState {
  id: string;
  parentId?: string | null;
  name: string;
  props?: Record<string, unknown>;
  roots: string[];
  source?: SourceLocation;
}

export interface RenderTreeViewNode {
  id: string;
  name: string;
  props?: Record<string, unknown>;
  children?: RenderTreeViewNode[];
  text?: string;
  kind?: RenderTreeNodeKind;
  liftedFrom?: string;
  componentId?: string;
  renderNodeId?: string;
  rootIds?: string[];
  source?: SourceLocation;
}

export function createRenderTreeState(): RenderTreeState {
  return {
    nodes: new Map(),
    components: new Map(),
    rootComponents: new Map(),
    roots: [],
  };
}

function defaultNameForKind(kind: RenderTreeNodeKind) {
  switch (kind) {
    case "root":
      return "Root";
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
    state.components.clear();
    state.rootComponents.clear();
    state.roots = [];
    return;
  }

  if (message.type === "component:added") {
    const id = String(message.id);
    let props: Record<string, unknown> | undefined;
    if (message.props) {
      try {
        props = devalue.parse(message.props) as Record<string, unknown>;
      } catch {
        props = undefined;
      }
    }
    const source: SourceLocation | undefined =
      message.source_file ?
        {
          fileName: message.source_file,
          lineNumber: message.source_line,
          columnNumber: message.source_col,
        }
      : undefined;
    state.components.set(id, {
      id,
      parentId: message.parent_id === null ? null : String(message.parent_id),
      name: message.name,
      props,
      roots: [],
      source,
    });
    return;
  }

  if (message.type === "component:updated") {
    const component = state.components.get(String(message.id));
    if (!component) return;
    if (message.props !== undefined) {
      try {
        component.props = devalue.parse(message.props) as Record<
          string,
          unknown
        >;
      } catch {
        component.props = undefined;
      }
    } else {
      component.props = undefined;
    }
    return;
  }

  if (message.type === "component:removed") {
    const id = String(message.id);
    const component = state.components.get(id);
    if (component) {
      for (const root of component.roots) {
        const list = state.rootComponents.get(root);
        if (!list) continue;
        state.rootComponents.set(
          root,
          list.filter((componentId) => componentId !== id),
        );
      }
    }
    state.components.delete(id);
    return;
  }

  if (message.type === "component:root_added") {
    const componentId = String(message.component_id);
    const renderNodeId = String(message.render_node_id);
    const component = state.components.get(componentId);
    if (!component) return;
    component.roots[message.ordinal] = renderNodeId;
    const list = state.rootComponents.get(renderNodeId) ?? [];
    if (!list.includes(componentId)) list.push(componentId);
    state.rootComponents.set(renderNodeId, list);
    return;
  }

  if (message.type === "component:root_removed") {
    const componentId = String(message.component_id);
    const renderNodeId = String(message.render_node_id);
    const component = state.components.get(componentId);
    if (!component) return;
    const list = state.rootComponents.get(renderNodeId);
    if (list) {
      const next = list.filter((id) => id !== componentId);
      if (next.length > 0) state.rootComponents.set(renderNodeId, next);
      else state.rootComponents.delete(renderNodeId);
    }
    component.roots = component.roots.filter((id) => id !== renderNodeId);
    return;
  }

  if (message.type === "render:node_added") {
    const id = String(message.id);
    const rawParentId =
      message.parent_id === null ? null : String(message.parent_id);
    const parentId: string | null = rawParentId;
    const kind = message.kind;
    let props: Record<string, unknown> | undefined;
    if (message.props) {
      try {
        props = devalue.parse(message.props) as Record<string, unknown>;
      } catch {
        props = undefined;
      }
    }
    const source: SourceLocation | undefined =
      message.source_file ?
        {
          fileName: message.source_file,
          lineNumber: message.source_line,
          columnNumber: message.source_col,
        }
      : undefined;
    const node: RenderTreeNodeState = {
      id,
      kind,
      name:
        kind === "text" ? "Text" : (message.name ?? defaultNameForKind(kind)),
      props,
      text: message.value ?? undefined,
      children: [],
      source,
      parentId,
    };
    state.nodes.set(id, node);

    if (parentId === null) {
      if (kind !== "root") {
        console.warn("Unparented render tree node received:", {
          id,
          kind,
          name: message.name,
          value: message.value,
        });
      }
      state.roots.push(id);
      return;
    }

    const parent = state.nodes.get(parentId);
    if (!parent) {
      console.warn("Render tree node parent missing:", {
        id,
        kind,
        name: message.name,
        value: message.value,
        parentId,
      });
      state.roots.push(id);
      return;
    }

    const list = ensureChildList(parent);
    list.push(id);
    return;
  }

  if (message.type === "render:node_removed") {
    const id = String(message.id);

    const node = state.nodes.get(id);
    const parentId = node?.parentId ?? null;

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

  if (message.type === "render:node_updated") {
    const id = String(message.id);
    const node = state.nodes.get(id);
    if (!node) return;
    if (message.props !== undefined) {
      try {
        node.props = devalue.parse(message.props) as Record<string, unknown>;
      } catch {
        node.props = undefined;
      }
    } else {
      node.props = undefined;
    }
  }
}

function componentForSingleRoot(
  state: RenderTreeState,
  nodeId: string,
  excluded: Set<string>,
): ComponentNodeState | undefined {
  const componentIds = state.rootComponents.get(nodeId);
  if (!componentIds) return undefined;
  for (let i = componentIds.length - 1; i >= 0; i--) {
    if (excluded.has(componentIds[i])) continue;
    const component = state.components.get(componentIds[i]);
    if (component?.roots.length === 1) return component;
  }
  return undefined;
}

function componentGroupStartingAt(
  state: RenderTreeState,
  nodeId: string,
  excluded: Set<string>,
): ComponentNodeState | undefined {
  const componentIds = state.rootComponents.get(nodeId);
  if (!componentIds) return undefined;
  const candidates: ComponentNodeState[] = [];
  const candidateIds = new Set<string>();
  for (const componentId of componentIds) {
    if (excluded.has(componentId)) continue;
    const component = state.components.get(componentId);
    if (
      component &&
      component.roots.length > 1 &&
      component.roots[0] === nodeId
    ) {
      candidates.push(component);
      candidateIds.add(component.id);
    }
  }
  if (candidates.length === 0) return undefined;
  return (
    candidates.find(
      (component) =>
        component.parentId === null ||
        component.parentId === undefined ||
        !candidateIds.has(component.parentId),
    ) ?? candidates[0]
  );
}

interface BuildResult {
  node: RenderTreeViewNode | null;
  lifted: RenderTreeViewNode[];
}

function isContextPresentationNode(node: RenderTreeViewNode) {
  return (
    node.name === "Provider" ||
    node.name.startsWith("Context ") ||
    node.kind === "customContext"
  );
}

function canLiftContextChild(node: RenderTreeViewNode) {
  return node.componentId !== undefined || node.kind === "component-group";
}

function withContextLift(node: RenderTreeViewNode): BuildResult {
  const children = node.children ?? [];
  if (
    canLiftContextChild(node) &&
    children.length === 1 &&
    isContextPresentationNode(children[0])
  ) {
    const { children: _children, ...rest } = node;
    return {
      node: rest,
      lifted: [{ ...children[0], liftedFrom: node.id }],
    };
  }
  return { node, lifted: [] };
}

function buildPresentationAtRoot(
  state: RenderTreeState,
  id: string,
  consumed: Set<string>,
  excluded: Set<string>,
): BuildResult {
  if (consumed.has(id)) return { node: null, lifted: [] };
  const group = componentGroupStartingAt(state, id, excluded);
  if (group) return buildComponentGroup(state, group, consumed, excluded);
  consumed.add(id);
  return buildNode(state, id, excluded);
}

function buildComponentGroup(
  state: RenderTreeState,
  group: ComponentNodeState,
  consumed: Set<string>,
  excluded: Set<string>,
): BuildResult {
  for (const rootId of group.roots) {
    consumed.add(rootId);
  }
  const childExcluded = new Set(excluded);
  childExcluded.add(group.id);
  const childConsumed = new Set<string>();
  const groupChildren: RenderTreeViewNode[] = [];
  for (const rootId of group.roots) {
    const built = buildPresentationAtRoot(
      state,
      rootId,
      childConsumed,
      childExcluded,
    );
    if (built.node) groupChildren.push(built.node);
    if (built.lifted.length > 0) groupChildren.push(...built.lifted);
  }
  return withContextLift({
    id: `component:${group.id}`,
    name: group.name,
    props: group.props,
    componentId: group.id,
    renderNodeId: group.roots[0],
    rootIds: group.roots,
    children: groupChildren.length > 0 ? groupChildren : undefined,
    kind: "component-group",
    source: group.source,
  });
}

function buildChildren(
  state: RenderTreeState,
  childIds: string[],
  excluded = new Set<string>(),
): RenderTreeViewNode[] {
  const children: RenderTreeViewNode[] = [];
  const consumed = new Set<string>();
  for (const childId of childIds) {
    const built = buildPresentationAtRoot(state, childId, consumed, excluded);
    if (built.node) children.push(built.node);
    if (built.lifted.length > 0) children.push(...built.lifted);
  }
  return children;
}

function buildNode(
  state: RenderTreeState,
  id: string,
  excluded: Set<string>,
): BuildResult {
  const node = state.nodes.get(id);
  if (!node) return { node: null, lifted: [] };

  const children = buildChildren(state, node.children, excluded);

  const component = componentForSingleRoot(state, node.id, excluded);
  return withContextLift({
    id: node.id,
    name: component?.name ?? node.name ?? defaultNameForKind(node.kind),
    props: component?.props ?? node.props,
    text: node.text,
    kind: node.kind,
    componentId: component?.id,
    renderNodeId: node.id,
    rootIds: component?.roots,
    source: component?.source ?? node.source,
    children: children.length > 0 ? children : undefined,
  });
}

export function buildRenderTreeView(state: RenderTreeState) {
  const roots = state.roots
    .map((rootId) => state.nodes.get(rootId))
    .filter(Boolean) as RenderTreeNodeState[];

  const view: RenderTreeViewNode[] = [];
  for (const root of roots) {
    if (root.kind === "root") {
      view.push(...buildChildren(state, root.children));
    } else {
      const built = buildNode(state, root.id, new Set());
      if (built.node) view.push(built.node);
      if (built.lifted.length > 0) view.push(...built.lifted);
    }
  }

  return view;
}
