/**
 * Debug-render module — bridges the AlloyNode render tree to the
 * trace-writer SQLite DB and the devtools WebSocket protocol.
 *
 * # Tree shape
 *
 * The trace tree mirrors the real AlloyNode tree. Component invocations
 * are recorded separately as canonical metadata (`component_instances`
 * and `component_roots`) so devtools can derive presentation groupings
 * without storing UI artifacts as render nodes.
 *
 * Real AlloyNodes are exposed as:
 *
 *  - `TextNode` → `kind: "text"`, with `value: data`
 *  - `ElementNode` with a marker `localName` (`alloy:source-file`,
 *    `alloy:directory`, `alloy:copy-file`) → `kind` set to the marker
 *  - any other `ElementNode` → `kind: "intrinsic"` with `name: localName`
 *  - `FragmentNode` → `kind: "fragment"`
 *  - `CommentNode` (slot/ctx markers) → not exposed (skipped)
 *
 * # Hook surface
 *
 * Mutation hooks:
 *  - `nodeAttached(node, parent, before)` — called from
 *    `render/node.ts::insertBefore`. Emits a `node_added` event for
 *    `node` (and any descendants it brings with it, e.g. a previously
 *    built subtree being moved or a fragment splice).
 *  - `nodeDetached(node, parent)` — called from
 *    `render/node.ts::detach`. Emits `node_removed` for `node` and all
 *    descendants.
 *
 * Lifecycle hooks:
 *  - `initialize(root)` — called at the start of each `render` /
 *    `renderAsync`. Resets module state and emits `render:reset`.
 *  - `complete()` — emits `render:complete`.
 *  - `flushJobsComplete()` — emits `flushJobs:complete`.
 *  - `error(info, stack)` — emits `render:error` and writes a
 *    `render_errors` row.
 *
 * Component hooks:
 *  - `beginComponent(opts)` — records a component instance and captures
 *    the real top-level AlloyNodes it emits.
 *
 * Each hook short-circuits when neither devtools nor the trace DB
 * are enabled.
 */

import { watch } from "@vue/reactivity";
import * as devalue from "devalue";
import type {
  RenderErrorStackEntry as ProtocolRenderErrorStackEntry,
  RenderTreeNode,
} from "../devtools/devtools-protocol.js";
import {
  isDevtoolsEnabled,
  registerDevtoolsMessageHandler,
} from "../devtools/devtools-server.js";
import { getContext, untrack } from "../reactivity.js";
import { getContextForNode } from "../render/node-context.js";
import {
  AlloyNode,
  CommentNode,
  ELEMENT_NODE,
  ElementNode,
  FRAGMENT_NODE,
  setMutationListener,
  TEXT_NODE,
  TextNode,
} from "../render/node.js";
import { flushJobsAsync } from "../scheduler.js";
import type { ComponentCreator } from "./../runtime/component.js";
import {
  flushAllDirtyFiles,
  markFileDirtyForNode,
  reset as resetFileStreaming,
} from "./file-streaming.js";
import { sanitizeRecord } from "./serialize.js";
import { resolveComponentSource } from "./source-map.js";
import {
  deleteComponentInstance,
  deleteComponentRoot,
  insertComponentInstance,
  insertComponentRoot,
  insertDirectory,
  insertOutputFile,
  insertRenderError,
  isTraceEnabled,
  notifyFlushComplete,
  notifyRenderComplete,
  notifyRenderReset,
  deleteRenderNode as traceDeleteRenderNode,
  insertRenderNode as traceInsertRenderNode,
  updateComponentInstanceProps,
  updateEffectComponentByContext,
} from "./trace-writer.js";
import { isDebugEnabled, logDevtoolsMessage } from "./trace.js";

// #region Public debug types used by runtime and devtools integration

/** The kind discriminant for render tree nodes. */
export type RenderTreeNodeKind = RenderTreeNode["kind"];

/** Information about a render tree node, used when recording nodes to devtools. */
export interface RenderTreeNodeInfo {
  kind: RenderTreeNodeKind;
  name?: string;
  propsSerialized?: string;
  value?: string;
  source?: RenderTreeNode["source"];
}

export interface RenderNodeActions {
  rerender: () => void;
  rerenderAndBreak: () => void;
}

export interface BeginComponentOptions {
  component: ComponentCreator<unknown>;
  propsSource: Record<string, unknown> | undefined;
  source: RenderTreeNodeInfo["source"] | undefined;
  /** Parent AlloyNode the component is being inserted into. */
  parent: AlloyNode;
  /** Optional rerender bindings (only meaningful in devtools). */
  actions?: RenderNodeActions;
}

export function isRerenderEnabled(): boolean {
  return isDevtoolsEnabled();
}

export interface ComponentDebugSession {
  recordDirectory(path: string): void;
  recordFile(path: string, filetype: string): void;
  dispose(): void;
}

export interface RenderErrorInfo {
  name: string;
  message: string;
  stack?: string;
}

export interface RenderErrorStackEntry extends ProtocolRenderErrorStackEntry {
  props?: Record<string, unknown> | undefined;
}

// #endregion

// #region Module state

/** Map AlloyNode → trace node id (assigned when first emitted). */
let nodeIds = new WeakMap<AlloyNode, number>();
/** AlloyNodes that have been emitted to the trace tree. */
let tracked = new WeakSet<AlloyNode>();
/** Component owner captured while a subtree is built before being rooted. */
let pendingOwnerComponent = new WeakMap<AlloyNode, ComponentFrame>();
/** Component roots captured while a subtree is built before being rooted. */
let pendingRootComponents = new WeakMap<AlloyNode, ComponentFrame[]>();
/** Sidecar metadata per node id — kind + name + source for cleanup re-emit. */
let nodeKinds = new Map<
  number,
  { kind: string; name?: string; source?: RenderTreeNodeInfo["source"] }
>();
/** Sidecar: nodes that own a file/directory entry in the trace DB. */
let fileNodes = new Map<number, { path: string; filetype: string }>();
let directoryNodes = new Map<number, { path: string }>();
/** Latest props-serialized value per id (for de-duplicated updates). */
let nodeProps = new Map<number, string | undefined>();
/** Devtools-side rerender bindings keyed by render-tree node id. */
let rerenderActions = new Map<number, RenderNodeActions>();

type ComponentFrame = {
  id: number;
  parentComponentId: number | null;
  hostParent: AlloyNode;
  name: string;
  propsSerialized: string | undefined;
  source: RenderTreeNodeInfo["source"] | undefined;
  contextId: number | null;
  roots: number[];
  rootSet: Set<number>;
  file?: { path: string; filetype: string };
  directory?: { path: string };
  actions?: RenderNodeActions;
  stopWatch?: () => void;
};
let componentStack: ComponentFrame[] = [];
let componentsById = new Map<number, ComponentFrame>();
let componentByContextId = new Map<number, ComponentFrame>();
let ownerComponentByNodeId = new Map<number, number>();
let childComponentsById = new Map<number, Set<number>>();
let rootComponentsByNodeId = new Map<number, Set<number>>();

/**
 * Reverse index: parent render-tree id → set of currently-emitted child
 * render-tree ids. Maintained by every `insertRenderNode` call in this
 * module, and used by `emitRemoved` to cascade-remove descendants whose
 * lifetime is bound to the removed parent.
 */
let renderChildIds = new Map<number, Set<number>>();

function insertRenderNode(
  id: number,
  parentId: number | null,
  kind: string,
  name: string | undefined,
  props: string | undefined,
  sourceFile: string | undefined,
  sourceLine: number | undefined,
  sourceCol: number | undefined,
  contextId: number | null,
  value: string | undefined,
): void {
  if (parentId !== null) {
    let set = renderChildIds.get(parentId);
    if (!set) {
      set = new Set();
      renderChildIds.set(parentId, set);
    }
    set.add(id);
  }
  traceInsertRenderNode(
    id,
    parentId,
    kind,
    name,
    props,
    sourceFile,
    sourceLine,
    sourceCol,
    contextId,
    value,
  );
}

let nextId = 1;
let nextErrorId = 1;
let handlerRegistered = false;

// #endregion

// #region Lifecycle

export function initialize(root: AlloyNode) {
  for (const frame of componentsById.values()) {
    frame.stopWatch?.();
  }
  if (!isDebugEnabled()) {
    setMutationListener(null);
    return;
  }
  ensureDevtoolsHandler();
  nodeIds = new WeakMap();
  tracked = new WeakSet();
  pendingOwnerComponent = new WeakMap();
  pendingRootComponents = new WeakMap();
  renderChildIds = new Map();
  nodeKinds = new Map();
  fileNodes = new Map();
  directoryNodes = new Map();
  nodeProps = new Map();
  rerenderActions = new Map();
  componentStack = [];
  componentsById = new Map();
  componentByContextId = new Map();
  ownerComponentByNodeId = new Map();
  childComponentsById = new Map();
  rootComponentsByNodeId = new Map();
  nextId = 1;
  resetFileStreaming();
  setMutationListener({ attached: nodeAttached, detached: nodeDetached });
  notifyRenderReset();
  const rootId = getOrCreateNodeId(root);
  tracked.add(root);
  nodeKinds.set(rootId, { kind: "root" });
  insertRenderNode(
    rootId,
    null,
    "root",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    null,
    undefined,
  );
}

export function complete() {
  flushAllDirtyFiles();
  logDevtoolsMessage({ type: "render:complete" });
  notifyRenderComplete();
}

export function flushJobsComplete() {
  logDevtoolsMessage({ type: "flushJobs:complete" });
  notifyFlushComplete();
}

// #endregion

// #region Node-id management

function getOrCreateNodeId(node: AlloyNode): number {
  const existing = nodeIds.get(node);
  if (existing !== undefined) return existing;
  const id = nextId++;
  nodeIds.set(node, id);
  return id;
}

export function getRenderNodeId(node: AlloyNode | unknown): number | undefined {
  if (!isDebugEnabled()) return undefined;
  if (!(node instanceof AlloyNode)) return undefined;
  return nodeIds.get(node);
}

// #endregion

// #region Kind classification

const SKIPPED_COMMENT_DATAS = new Set([
  "slot:start",
  "slot:end",
  "slot:item:start",
  "slot:item:end",
  "ctx:start",
  "ctx:end",
  "component:start",
  "component:end",
]);

function shouldExposeNode(node: AlloyNode): boolean {
  if (node instanceof CommentNode) {
    // Bookkeeping comments are not part of the render tree.
    return !SKIPPED_COMMENT_DATAS.has(node.data);
  }
  return true;
}

function classifyNode(node: AlloyNode): {
  kind: string;
  name?: string;
  value?: string;
} {
  const t = node.nodeType;
  if (t === TEXT_NODE) {
    return { kind: "text", value: (node as TextNode).data };
  }
  if (t === FRAGMENT_NODE) {
    return { kind: "fragment" };
  }
  if (t === ELEMENT_NODE) {
    const ln = (node as ElementNode).localName;
    if (
      ln === "alloy:source-file" ||
      ln === "alloy:directory" ||
      ln === "alloy:copy-file"
    ) {
      return { kind: ln.slice("alloy:".length), name: ln };
    }
    return { kind: "intrinsic", name: ln };
  }
  // CommentNode that's exposed — generic "comment" kind. Marker
  // comments are filtered out by `shouldExposeNode`, so this is rare.
  return { kind: "comment", value: (node as CommentNode).data };
}

// #endregion

// #region Component ownership resolution

function currentComponentFrame(): ComponentFrame | undefined {
  return componentStack[componentStack.length - 1];
}

function currentContextComponentFrame(): ComponentFrame | undefined {
  const ctx = getContext();
  return ctx ? componentByContextId.get(ctx.id) : undefined;
}

function findRootComponentsForAttach(parent: AlloyNode): ComponentFrame[] {
  const frames: ComponentFrame[] = [];
  for (let i = componentStack.length - 1; i >= 0; i--) {
    const frame = componentStack[i];
    if (frame.hostParent === parent) frames.unshift(frame);
  }
  return frames;
}

function ownerFrameForAttach(
  parentId: number | null,
  inheritedOwner: ComponentFrame | undefined,
): ComponentFrame | undefined {
  if (inheritedOwner) return inheritedOwner;
  const active = currentComponentFrame();
  if (active) return active;
  const contextFrame = currentContextComponentFrame();
  if (contextFrame) return contextFrame;
  if (parentId !== null) {
    const parentOwner = ownerComponentByNodeId.get(parentId);
    if (parentOwner !== undefined) return componentsById.get(parentOwner);
  }
  return undefined;
}

function recordComponentRoot(
  frame: ComponentFrame,
  renderNodeId: number,
): void {
  if (frame.rootSet.has(renderNodeId)) return;
  frame.rootSet.add(renderNodeId);
  const ordinal = frame.roots.length;
  frame.roots.push(renderNodeId);
  let components = rootComponentsByNodeId.get(renderNodeId);
  if (!components) {
    components = new Set();
    rootComponentsByNodeId.set(renderNodeId, components);
  }
  components.add(frame.id);
  insertComponentRoot(frame.id, renderNodeId, ordinal);
  if (ordinal === 0) {
    if (frame.file) {
      fileNodes.set(renderNodeId, frame.file);
      insertOutputFile(frame.file.path, frame.file.filetype, renderNodeId);
    }
    if (frame.directory) {
      directoryNodes.set(renderNodeId, frame.directory);
    }
  }
  if (frame.actions) rerenderActions.set(renderNodeId, frame.actions);
}

function removeComponentRoot(
  frame: ComponentFrame,
  renderNodeId: number,
  deleteWhenEmpty = true,
): void {
  if (!frame.rootSet.delete(renderNodeId)) return;
  frame.roots = frame.roots.filter((id) => id !== renderNodeId);
  const components = rootComponentsByNodeId.get(renderNodeId);
  if (components) {
    components.delete(frame.id);
    if (components.size === 0) rootComponentsByNodeId.delete(renderNodeId);
  }
  deleteComponentRoot(frame.id, renderNodeId);
  if (deleteWhenEmpty && frame.rootSet.size === 0) {
    deleteComponentFrame(frame);
  }
}

function deleteComponentFrame(frame: ComponentFrame): void {
  if (!componentsById.delete(frame.id)) return;

  const children = childComponentsById.get(frame.id);
  if (children) {
    childComponentsById.delete(frame.id);
    for (const childId of [...children]) {
      const child = componentsById.get(childId);
      if (child) deleteComponentFrame(child);
    }
  }

  for (const rootId of [...frame.roots]) {
    removeComponentRoot(frame, rootId, false);
  }

  if (frame.parentComponentId !== null) {
    const siblings = childComponentsById.get(frame.parentComponentId);
    siblings?.delete(frame.id);
  }
  if (
    frame.contextId !== null &&
    componentByContextId.get(frame.contextId)?.id === frame.id
  ) {
    componentByContextId.delete(frame.contextId);
  }
  nodeProps.delete(frame.id);
  frame.stopWatch?.();
  deleteComponentInstance(frame.id);
}

/**
 * Decide whether `attachedParent` is currently part of the live trace
 * tree (rooted at the initialized root), and if so which trace node id
 * should be the new node's parent.
 *
 * Returns `undefined` when `attachedParent` isn't tracked — the caller
 * should defer emission until the subtree is later attached at a
 * tracked location.
 */
function resolveParentId(
  node: AlloyNode,
  attachedParent: AlloyNode,
): number | null | undefined {
  if (tracked.has(attachedParent)) {
    const id = nodeIds.get(attachedParent);
    return id === undefined ? null : id;
  }
  return undefined;
}

// #endregion

// #region Tree-mutation hooks

/**
 * Called after `node` is attached as a child of `parent`. Emits an
 * `added` event for `node` itself (if exposed) and recursively for any
 * descendants it brought with it (move / fragment splice / cached subtree).
 *
 * If `parent` isn't part of the live tree yet, stamps the active component
 * ownership onto `node` and defers emission until the subtree finally attaches.
 */
export function nodeAttached(node: AlloyNode, parent: AlloyNode): void {
  if (!isDebugEnabled()) return;
  markFileDirtyForNode(parent);
  const parentId = resolveParentId(node, parent);
  const ownerFrame = currentComponentFrame() ?? currentContextComponentFrame();
  let rootFrames = findRootComponentsForAttach(parent);
  if (
    rootFrames.length === 0 &&
    ownerFrame !== undefined &&
    parentId !== undefined &&
    (parentId === null ||
      ownerComponentByNodeId.get(parentId) !== ownerFrame.id)
  ) {
    rootFrames = [ownerFrame];
  }
  if (parentId === undefined) {
    if (ownerFrame) pendingOwnerComponent.set(node, ownerFrame);
    if (rootFrames.length > 0) pendingRootComponents.set(node, rootFrames);
    return;
  }
  attachWithSelf(node, parentId, ownerFrame, rootFrames);
}

function attachWithSelf(
  node: AlloyNode,
  parentId: number | null,
  inheritedOwner: ComponentFrame | undefined,
  inheritedRoots: ComponentFrame[],
): void {
  const pendingOwner = pendingOwnerComponent.get(node);
  if (pendingOwner !== undefined) {
    pendingOwnerComponent.delete(node);
  }
  const pendingRoots = pendingRootComponents.get(node);
  if (pendingRoots !== undefined) {
    pendingRootComponents.delete(node);
  }
  const ownerFrame = ownerFrameForAttach(
    parentId,
    pendingOwner ?? inheritedOwner,
  );
  const rootFrames = pendingRoots ?? inheritedRoots;
  if (!shouldExposeNode(node)) {
    for (let c = node.firstChild; c !== null; c = c.nextSibling) {
      attachWithSelf(c, parentId, ownerFrame, rootFrames);
    }
    return;
  }
  if (tracked.has(node)) {
    // Already eagerly emitted (e.g. an alloy:* wrapper pre-emitted via
    // ensureWrapperHostTracked while inside a thunk body). Don't re-emit;
    // just walk newly-attached children that may not have been seen yet.
    const existingId = nodeIds.get(node)!;
    for (let c = node.firstChild; c !== null; c = c.nextSibling) {
      if (!tracked.has(c)) {
        attachWithSelf(c, existingId, ownerFrame, []);
      }
    }
    return;
  }
  const id = getOrCreateNodeId(node);
  emitAdded(node, id, parentId);
  tracked.add(node);
  if (ownerFrame !== undefined) {
    ownerComponentByNodeId.set(id, ownerFrame.id);
  }
  for (const rootFrame of rootFrames) {
    recordComponentRoot(rootFrame, id);
  }
  for (let c = node.firstChild; c !== null; c = c.nextSibling) {
    if (!tracked.has(c)) attachWithSelf(c, id, ownerFrame, []);
  }
}

function emitAdded(node: AlloyNode, id: number, parentId: number | null): void {
  const cls = classifyNode(node);
  // Stamp metadata so cleanup re-emit (and `error()` stack resolution)
  // can recover identity.
  let entry = nodeKinds.get(id);
  if (!entry) {
    entry = { kind: cls.kind, name: cls.name };
    nodeKinds.set(id, entry);
  } else {
    entry.kind = cls.kind;
    if (cls.name !== undefined) entry.name = cls.name;
  }
  const props = nodeProps.get(id);
  insertRenderNode(
    id,
    parentId,
    cls.kind,
    cls.name,
    props,
    entry.source?.fileName,
    entry.source?.lineNumber,
    entry.source?.columnNumber,
    getContextForNode(node)?.id ?? null,
    cls.value,
  );
}

/**
 * Called after `node` has been detached. Emits `node_removed` for
 * `node` and all of its still-attached descendants in post-order.
 */
export function nodeDetached(node: AlloyNode, formerParent: AlloyNode): void {
  if (!isDebugEnabled()) return;
  markFileDirtyForNode(formerParent);
  detachRecursive(node);
}

function detachRecursive(node: AlloyNode): void {
  for (let c = node.firstChild; c !== null; c = c.nextSibling) {
    detachRecursive(c);
  }
  if (!tracked.has(node)) return;
  tracked.delete(node);
  if (!shouldExposeNode(node)) return;
  const id = nodeIds.get(node);
  if (id === undefined) return;
  emitRemoved(id);
}

function emitRemoved(id: number): void {
  const componentIds = rootComponentsByNodeId.get(id);
  if (componentIds) {
    for (const componentId of [...componentIds]) {
      const component = componentsById.get(componentId);
      if (component) removeComponentRoot(component, id);
    }
  }
  traceDeleteRenderNode(id);
  rerenderActions.delete(id);
  nodeProps.delete(id);
  nodeKinds.delete(id);
  // Files & directories owned by this node.
  fileNodes.delete(id);
  directoryNodes.delete(id);
  ownerComponentByNodeId.delete(id);
  // Cascade to any descendants currently registered as children of this id.
  const children = renderChildIds.get(id);
  if (children !== undefined) {
    renderChildIds.delete(id);
    for (const childId of children) {
      emitRemoved(childId);
    }
  }
}

// #endregion

// #region Component lifecycle

function serializeRenderTreeProps(input: Record<string, unknown> | undefined) {
  return untrack(() => {
    if (!input) return undefined;
    const { children: _children, ...rest } = input;
    const sanitized = sanitizeRecord(rest);
    if (!sanitized) return undefined;
    try {
      return devalue.stringify(sanitized);
    } catch {
      return undefined;
    }
  });
}

export function beginComponent(
  options: BeginComponentOptions,
): ComponentDebugSession {
  if (!isDebugEnabled()) {
    return {
      recordDirectory() {},
      recordFile() {},
      dispose() {},
    };
  }

  const { component, propsSource, source, parent, actions } = options;

  return untrack(() => {
    let componentName = component.component.name;
    if (componentName === "Provider") {
      const contextName = (component.component as { contextName?: string })
        .contextName;
      if (contextName) {
        componentName = `Context ${contextName}`;
      }
    }
    const propsSerialized = serializeRenderTreeProps(propsSource);
    const resolvedSource = resolveComponentSource(source);

    const id = nextId++;
    const ctx = getContext();
    const parentComponent =
      componentStack[componentStack.length - 1] ??
      (ctx?.owner ? componentByContextId.get(ctx.owner.id) : undefined);
    const frame: ComponentFrame = {
      id,
      parentComponentId: parentComponent?.id ?? null,
      hostParent: parent,
      name: componentName,
      propsSerialized,
      source: resolvedSource,
      contextId: ctx?.id ?? null,
      roots: [],
      rootSet: new Set(),
      actions,
    };
    componentsById.set(id, frame);
    if (frame.parentComponentId !== null) {
      let children = childComponentsById.get(frame.parentComponentId);
      if (!children) {
        children = new Set();
        childComponentsById.set(frame.parentComponentId, children);
      }
      children.add(id);
    }
    componentStack.push(frame);
    if (ctx) componentByContextId.set(ctx.id, frame);
    if (propsSerialized !== undefined) nodeProps.set(id, propsSerialized);
    insertComponentInstance(
      id,
      frame.parentComponentId,
      componentName,
      propsSerialized,
      resolvedSource?.fileName,
      resolvedSource?.lineNumber,
      resolvedSource?.columnNumber,
      frame.contextId,
    );
    if (isTraceEnabled() && ctx) {
      updateEffectComponentByContext(ctx.id, componentName);
    }

    // Watch reactive props and re-emit on change.
    let stopWatch: (() => void) | undefined;
    if (propsSource) {
      const propKeys = Object.keys(propsSource).filter((k) => k !== "children");
      if (propKeys.length > 0) {
        stopWatch = watch(
          () => propKeys.map((k) => propsSource[k]),
          () => {
            const next = serializeRenderTreeProps(propsSource);
            const previous = nodeProps.get(id);
            if (previous === next) return;
            nodeProps.set(id, next);
            updateComponentInstanceProps(id, next);
          },
        );
      }
    }
    frame.stopWatch = stopWatch;

    let disposed = false;
    return {
      recordDirectory(path: string) {
        if (frame.directory) return;
        frame.directory = { path };
        insertDirectory(path);
      },
      recordFile(path: string, filetype: string) {
        if (frame.file) return;
        frame.file = { path, filetype };
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        for (let i = componentStack.length - 1; i >= 0; i--) {
          if (componentStack[i].id === id) {
            componentStack.splice(i, 1);
            break;
          }
        }
      },
    };
  });
}

// #endregion

// #region Devtools rerender bridge

function ensureDevtoolsHandler() {
  if (handlerRegistered || !isDevtoolsEnabled()) return;
  handlerRegistered = true;
  registerDevtoolsMessageHandler((message) => {
    if (
      message.type !== "render:rerender" &&
      message.type !== "render:rerenderAndBreak"
    ) {
      return;
    }
    const rawId = (message as { id?: unknown }).id;
    if (typeof rawId !== "number" && typeof rawId !== "string") return;
    const id = Number(rawId);
    if (!Number.isFinite(id)) return;
    const actions = rerenderActions.get(id);
    if (!actions) return;
    if (message.type === "render:rerender") {
      actions.rerender();
    } else {
      actions.rerenderAndBreak();
    }
    void flushJobsAsync();
  });
}

// #endregion

// #region Errors

export function error(
  err: RenderErrorInfo,
  componentStack: RenderErrorStackEntry[],
) {
  if (!isDebugEnabled()) return;
  const serializedStack = untrack(() =>
    componentStack.map((entry) => ({
      name: entry.name,
      propsSerialized: entry.propsSerialized,
      renderNodeId: entry.renderNodeId,
      source: entry.source,
    })),
  );
  logDevtoolsMessage({
    type: "render:error" as const,
    id: nextErrorId++,
    name: err.name,
    message: err.message,
    stack: err.stack,
    componentStack: serializedStack,
  });
  insertRenderError(
    err.name,
    err.message,
    err.stack,
    JSON.stringify(serializedStack),
  );
}

// #endregion
