/**
 * Debug-render module — bridges the AlloyNode render tree to the
 * trace-writer SQLite DB and the devtools WebSocket protocol.
 *
 * # Tree shape
 *
 * The trace tree mirrors the AlloyNode tree, with two additions:
 *
 *  - **Component scopes.** Every `<Foo />` produces a synthetic trace
 *    node (kind `"component"`) with the component name, serialized
 *    props, and JSX source location. Whatever AlloyNode(s) the
 *    component thunk produces become children of this scope.
 *  - **Memo scopes.** Each reactive child slot in `insertReactive`
 *    produces a synthetic node (kind `"memo"`) bracketing its
 *    `slot:start` / `slot:end` `CommentNode` pair. The dynamic
 *    children inside become children of the memo scope; on rerun
 *    the old children are removed from the trace and the new ones
 *    are added under the same memo id.
 *
 * Within those scopes, real AlloyNodes are exposed as:
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
 * Scope hooks:
 *  - `beginComponent(opts)` — pushes a component scope. The returned
 *    `ComponentDebugSession` exposes `recordFile` / `recordDirectory`
 *    (used to attach file/dir metadata to the scope) and `dispose()`
 *    (pops the scope; called from `insertComponent`'s finally).
 *  - `prepareMemoNode(start, end)` — registers a memo scope keyed by
 *    the start `CommentNode`. Subsequent attaches inside the
 *    `start..end` range are reparented under the memo scope id.
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
  insertDirectory,
  insertOutputFile,
  insertRenderError,
  isTraceEnabled,
  notifyFlushComplete,
  notifyRenderComplete,
  notifyRenderReset,
  deleteRenderNode as traceDeleteRenderNode,
  insertRenderNode as traceInsertRenderNode,
  updateRenderNodeProps as traceUpdateRenderNodeProps,
  updateEffectComponentByContext,
  updateRenderNodeContext,
} from "./trace-writer.js";
import { isDebugEnabled, logDevtoolsMessage } from "./trace.js";

// ─────────────────────────────────────────────────────────────────────────────
// Public types — kept compatible with `main` so callers that import
// these names don't break.
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Module state — reset in initialize()
// ─────────────────────────────────────────────────────────────────────────────

/** Map AlloyNode → trace node id (assigned when first emitted). */
let nodeIds = new WeakMap<AlloyNode, number>();
/** AlloyNodes that have been emitted to the trace tree. */
let tracked = new WeakSet<AlloyNode>();
/** When a node is attached at a not-yet-rooted location, the scope frame
 * (if any) that was active is stamped here. On later root-time flush,
 * this scope id is used instead of the AlloyNode's parent id. */
let pendingScope = new WeakMap<AlloyNode, ScopeFrame>();
/** Node id → ancestor scope frame whose refcount tracks this node. */
let scopeOfNode = new Map<number, ScopeFrame>();
/** All scope frames keyed by id (for lookup after they leave the stack). */
let scopesById = new Map<number, ScopeFrame>();
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

/**
 * Active scope stack. Each frame redirects the parent_id of subsequently
 * attached nodes to the synthetic scope id. Frames are pushed by
 * `beginComponent` / memo region setup and popped by their `dispose()` /
 * effect cleanup.
 *
 * The top frame's `parentId` is the AlloyNode parent's id at the time
 * the scope was created.
 */
type ScopeFrame = {
  /** Synthetic id for this scope (used as parent_id of attached nodes). */
  id: number;
  /** AlloyNode at whose insertion site this scope lives. */
  hostParent: AlloyNode;
  /** For memo scopes, the start comment; everything between start..end
   *  belongs to this scope when the scope is the active top frame. */
  memoStart?: CommentNode;
  memoEnd?: CommentNode;
  /** Whether `insertRenderNode` has been called for this scope. */
  emitted: boolean;
  /** Captured arguments for deferred emission. */
  emit: () => void;
  /** Number of live emitted children — when 0 and disposed, remove. */
  refcount: number;
  /** Whether `dispose()` has been called. */
  disposed: boolean;
  /** Set true once the scope has been emitRemoved — it can no longer
   *  serve as a parent for any new emission. Pending `emit()` calls
   *  must short-circuit when this is true. */
  defunct?: boolean;
};
let scopeStack: ScopeFrame[] = [];
/**
 * Memo scope index keyed by start CommentNode. Lookup is needed when a
 * node is attached inside an existing memo region but no scope is
 * currently active (e.g. nested reactive reruns).
 */
let memoScopesByStart = new WeakMap<CommentNode, ScopeFrame>();

/**
 * Reverse index: parent render-tree id → set of currently-emitted child
 * render-tree ids. Maintained by every `insertRenderNode` call in this
 * module, and used by `emitRemoved` to cascade-remove descendants whose
 * lifetime is bound to the removed parent (in particular, child scopes
 * whose `parent_id` is the removed scope's id but whose AlloyNodes
 * aren't part of the removed parent's AlloyNode subtree).
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

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function initialize(root: AlloyNode) {
  if (!isDebugEnabled()) {
    setMutationListener(null);
    return;
  }
  ensureDevtoolsHandler();
  nodeIds = new WeakMap();
  tracked = new WeakSet();
  pendingScope = new WeakMap();
  scopeOfNode = new Map();
  scopesById = new Map();
  renderChildIds = new Map();
  nodeKinds = new Map();
  fileNodes = new Map();
  directoryNodes = new Map();
  nodeProps = new Map();
  rerenderActions = new Map();
  scopeStack = [];
  memoScopesByStart = new WeakMap();
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

// ─────────────────────────────────────────────────────────────────────────────
// Node-id management
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Kind classification
// ─────────────────────────────────────────────────────────────────────────────

const SKIPPED_COMMENT_DATAS = new Set([
  "slot:start",
  "slot:end",
  "slot:item:start",
  "slot:item:end",
  "ctx:start",
  "ctx:end",
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

// ─────────────────────────────────────────────────────────────────────────────
// Scope resolution
// ─────────────────────────────────────────────────────────────────────────────

function ensureScopeEmitted(frame: ScopeFrame): boolean {
  if (frame.defunct) return false;
  if (frame.emitted) return true;
  // Need parent's id first.
  const parentId = resolveScopeParentId(frame);
  if (parentId === undefined) return false;
  frame.emit();
  frame.emitted = true;
  return true;
}

/**
 * Eagerly "track" an alloy:* wrapper ElementNode (alloy:directory,
 * alloy:source-file, alloy:copy-file) currently being constructed inside
 * a component thunk's body. The wrapper does NOT get its own render-tree
 * node — it's collapsed onto the enclosing component scope (which is
 * already a SourceDirectory / SourceFile / CopyFile component). Children
 * attached to the wrapper resolve their parent_id to that scope's id.
 */
function ensureWrapperHostTracked(host: AlloyNode): boolean {
  if (tracked.has(host)) return true;
  if (!(host instanceof ElementNode)) return false;
  const ln = host.localName;
  if (
    ln !== "alloy:directory" &&
    ln !== "alloy:source-file" &&
    ln !== "alloy:copy-file"
  ) {
    return false;
  }
  let enclosing: ScopeFrame | undefined;
  for (let i = scopeStack.length - 1; i >= 0; i--) {
    const f = scopeStack[i];
    if (f.hostParent !== host) {
      enclosing = f;
      break;
    }
  }
  if (enclosing === undefined) return false;
  if (!ensureScopeEmitted(enclosing)) return false;
  // Alias: wrapper id == enclosing scope id (no separate node emitted).
  nodeIds.set(host, enclosing.id);
  tracked.add(host);
  return true;
}

function resolveScopeParentId(frame: ScopeFrame): number | null | undefined {
  // Only consider frames pushed BEFORE this one — ancestors. Same-host
  // siblings later on the stack don't dominate this frame.
  const idx = scopeStack.indexOf(frame);
  for (let i = (idx === -1 ? scopeStack.length : idx) - 1; i >= 0; i--) {
    const f = scopeStack[i];
    if (f.defunct) continue;
    if (f.hostParent === frame.hostParent) {
      if (!ensureScopeEmitted(f)) return undefined;
      return f.id;
    }
  }
  if (tracked.has(frame.hostParent)) {
    return nodeIds.get(frame.hostParent) ?? null;
  }
  if (ensureWrapperHostTracked(frame.hostParent)) {
    return nodeIds.get(frame.hostParent) ?? null;
  }
  return undefined;
}

/**
 * Decide whether `attachedParent` is currently part of the live trace
 * tree (rooted at the initialized root or under an active scope), and
 * if so, which trace node id should be the new node's parent.
 *
 * Returns `undefined` when `attachedParent` isn't tracked — the caller
 * should defer emission until the subtree is later attached at a
 * tracked location.
 */
function resolveParentId(
  node: AlloyNode,
  attachedParent: AlloyNode,
): number | null | undefined {
  // Active scope match — the scope's hostParent IS the attach site.
  for (let i = scopeStack.length - 1; i >= 0; i--) {
    const frame = scopeStack[i];
    if (frame.defunct) continue;
    if (frame.hostParent === attachedParent) {
      if (!ensureScopeEmitted(frame)) return undefined;
      return frame.id;
    }
  }
  // Memo region: walk siblings backward looking for a slot:start with
  // a registered memo scope.
  for (
    let sib: AlloyNode | null = node.previousSibling;
    sib !== null;
    sib = sib.previousSibling
  ) {
    if (sib instanceof CommentNode) {
      if (sib.data === "slot:start") {
        const frame = memoScopesByStart.get(sib);
        if (frame !== undefined && !frame.defunct) {
          if (!ensureScopeEmitted(frame)) return undefined;
          return frame.id;
        }
      }
      if (sib.data === "slot:end" || sib.data === "slot:start") break;
    }
  }
  if (tracked.has(attachedParent)) {
    const id = nodeIds.get(attachedParent);
    return id === undefined ? null : id;
  }
  if (ensureWrapperHostTracked(attachedParent)) {
    return nodeIds.get(attachedParent) ?? null;
  }
  return undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tree-mutation hooks (called from render/node.ts)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Called after `node` is attached as a child of `parent`. Emits an
 * `added` event for `node` itself (if exposed) and recursively for any
 * descendants it brought with it (move / fragment splice / cached subtree).
 *
 * If `parent` isn't part of the live tree yet, stamps the active scope
 * onto `node` and defers emission until the subtree finally attaches.
 */
export function nodeAttached(node: AlloyNode, parent: AlloyNode): void {
  if (!isDebugEnabled()) return;
  markFileDirtyForNode(parent);
  const parentId = resolveParentId(node, parent);
  if (parentId === undefined) {
    // Not rooted — record the active scope (if any) so that when this
    // subtree later flushes we know which scope to attribute it to.
    if (scopeStack.length > 0) {
      // Find the topmost scope whose hostParent === parent.
      for (let i = scopeStack.length - 1; i >= 0; i--) {
        if (scopeStack[i].hostParent === parent) {
          pendingScope.set(node, scopeStack[i]);
          break;
        }
      }
    }
    return;
  }
  attachWithSelf(node, parent, parentId);
}

function attachWithSelf(
  node: AlloyNode,
  parent: AlloyNode,
  parentId: number | null,
): void {
  let owningScope: ScopeFrame | undefined;
  // Honour any deferred scope stamp.
  const stamped = pendingScope.get(node);
  if (stamped !== undefined) {
    pendingScope.delete(node);
    if (ensureScopeEmitted(stamped)) {
      parentId = stamped.id;
      owningScope = stamped;
    }
  } else if (parentId !== null && scopesById.has(parentId)) {
    owningScope = scopesById.get(parentId);
  }
  if (!shouldExposeNode(node)) {
    for (let c = node.firstChild; c !== null; c = c.nextSibling) {
      attachWithSelf(c, node, parentId);
    }
    return;
  }
  if (tracked.has(node)) {
    // Already eagerly emitted (e.g. an alloy:* wrapper pre-emitted via
    // ensureWrapperHostTracked while inside a thunk body). Don't re-emit;
    // just walk newly-attached children that may not have been seen yet.
    const existingId = nodeIds.get(node)!;
    for (let c = node.firstChild; c !== null; c = c.nextSibling) {
      if (!tracked.has(c)) attachWithSelf(c, node, existingId);
    }
    return;
  }
  const id = getOrCreateNodeId(node);
  emitAdded(node, id, parentId);
  tracked.add(node);
  if (owningScope !== undefined) {
    scopeOfNode.set(id, owningScope);
    owningScope.refcount++;
  }
  for (let c = node.firstChild; c !== null; c = c.nextSibling) {
    if (!tracked.has(c)) attachWithSelf(c, node, id);
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
    null,
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
  // If this node is a memo-region start marker, tear down the scope.
  if (node instanceof CommentNode) {
    const frame = memoScopesByStart.get(node);
    if (frame !== undefined) {
      memoScopesByStart.delete(node);
      if (!frame.disposed) {
        frame.disposed = true;
        if (frame.emitted) {
          if (frame.refcount === 0) {
            // emitRemoved sets defunct + deletes from scopesById.
            emitRemoved(frame.id);
          }
          // else: refcount > 0 — siblings between start..end will be
          // detached next; their emitRemoved decrements refcount and
          // triggers cleanup once it hits zero.
        } else {
          // Never emitted — drop registration and mark defunct so any
          // pending eager-emission attempts short-circuit.
          frame.defunct = true;
          scopesById.delete(frame.id);
          nodeKinds.delete(frame.id);
        }
      }
    }
  }
  if (!tracked.has(node)) return;
  tracked.delete(node);
  if (!shouldExposeNode(node)) return;
  const id = nodeIds.get(node);
  if (id === undefined) return;
  emitRemoved(id);
}

function emitRemoved(id: number): void {
  traceDeleteRenderNode(id);
  rerenderActions.delete(id);
  nodeProps.delete(id);
  nodeKinds.delete(id);
  // Files & directories owned by this node.
  fileNodes.delete(id);
  directoryNodes.delete(id);
  // If this id corresponds to a scope frame, that scope is now gone
  // from the trace tree — mark it defunct and remove from the index so
  // any later emit() that would have resolved to this id short-circuits
  // and no orphans are produced.
  const ownScope = scopesById.get(id);
  if (ownScope !== undefined) {
    ownScope.defunct = true;
    ownScope.disposed = true;
    scopesById.delete(id);
  }
  // Cascade to any descendants currently registered as children of
  // this id. This catches scopes (memo / component) whose AlloyNodes
  // aren't part of the removed parent's AlloyNode subtree, and so
  // wouldn't be torn down by `detachRecursive` alone.
  const children = renderChildIds.get(id);
  if (children !== undefined) {
    renderChildIds.delete(id);
    for (const childId of children) {
      emitRemoved(childId);
    }
  }
  // Detach from the parent's child set so a later cascade doesn't
  // re-visit us.
  const scope = scopeOfNode.get(id);
  if (scope !== undefined) {
    scopeOfNode.delete(id);
    const sset = renderChildIds.get(scope.id);
    if (sset !== undefined) {
      sset.delete(id);
      if (sset.size === 0) renderChildIds.delete(scope.id);
    }
    scope.refcount--;
    if (scope.refcount === 0 && scope.disposed && scope.emitted) {
      // Remove the scope itself; propagate up the scope-chain so an
      // outer scope's refcount stays consistent.
      emitRemoved(scope.id);
    }
  } else {
    // Non-scope node — still need to detach from parent maps if present.
    // Cheap: leave stale entries in renderChildIds; they self-clean
    // when the parent itself is emitRemoved (above).
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Component scope
// ─────────────────────────────────────────────────────────────────────────────

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
    nodeKinds.set(id, {
      kind: "component",
      name: componentName,
      source: resolvedSource,
    });
    if (propsSerialized !== undefined) nodeProps.set(id, propsSerialized);
    if (actions) rerenderActions.set(id, actions);

    const frame: ScopeFrame = {
      id,
      hostParent: parent,
      emitted: false,
      refcount: 0,
      disposed: false,
      emit: () => {
        if (frame.defunct) return;
        const parentId = resolveScopeParentId(frame);
        if (parentId === undefined) return;
        insertRenderNode(
          id,
          parentId,
          "component",
          componentName,
          propsSerialized,
          resolvedSource?.fileName,
          resolvedSource?.lineNumber,
          resolvedSource?.columnNumber,
          null,
          undefined,
        );
        if (isTraceEnabled()) {
          const ctx = getContext();
          if (ctx) {
            updateRenderNodeContext(id, ctx.id);
            updateEffectComponentByContext(ctx.id, componentName);
          }
        }
        // If the scope's parent is itself a scope, count ourselves
        // toward its refcount so it doesn't tear down beneath us.
        if (parentId !== null && parentId !== undefined) {
          const ps = scopesById.get(parentId);
          if (ps !== undefined) {
            scopeOfNode.set(id, ps);
            ps.refcount++;
          }
        }
      },
    };
    scopesById.set(id, frame);
    scopeStack.push(frame);
    // Eager emission attempt — preserves "scope before child" ordering
    // when the host parent is already in the live tree.
    ensureScopeEmitted(frame);

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
            traceUpdateRenderNodeProps(id, next);
          },
        );
      }
    }

    let disposed = false;
    return {
      recordDirectory(path: string) {
        if (directoryNodes.has(id)) return;
        directoryNodes.set(id, { path });
        insertDirectory(path);
      },
      recordFile(path: string, filetype: string) {
        if (fileNodes.has(id)) return;
        fileNodes.set(id, { path, filetype });
        insertOutputFile(path, filetype, id);
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        frame.disposed = true;
        // Remove this scope from the stack (could be non-top if a
        // child component disposed out-of-order; tolerate it).
        for (let i = scopeStack.length - 1; i >= 0; i--) {
          if (scopeStack[i].id === id) {
            scopeStack.splice(i, 1);
            break;
          }
        }
        // If the scope was emitted but never received any children,
        // remove it now — otherwise it sticks around as a ghost.
        if (frame.emitted && frame.refcount === 0) {
          emitRemoved(frame.id);
        }
        stopWatch?.();
      },
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Memo scope
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register a memo scope between two slot-marker `CommentNode`s. Returns
 * a controller that pushes the scope on each effect run and pops on
 * cleanup. The `start` comment's id is the scope id.
 */
export function prepareMemoNode(
  start: CommentNode,
  end: CommentNode,
): { enter(): void; leave(): void; clearChildren(): void; dispose(): void } {
  if (!isDebugEnabled()) {
    return {
      enter() {},
      leave() {},
      clearChildren() {},
      dispose() {},
    };
  }
  const id = nextId++;
  nodeKinds.set(id, { kind: "memo" });

  const frame: ScopeFrame = {
    id,
    hostParent: start.parentNode!,
    memoStart: start,
    memoEnd: end,
    emitted: false,
    refcount: 0,
    disposed: false,
    emit: () => {
      if (frame.defunct) return;
      const parentId = resolveScopeParentId(frame);
      if (parentId === undefined) return;
      insertRenderNode(
        id,
        parentId,
        "memo",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        null,
        undefined,
      );
      // If our parent is itself a scope, register ourselves as a child
      // of that scope so it doesn't tear down beneath us.
      if (parentId !== null && parentId !== undefined) {
        const ps = scopesById.get(parentId);
        if (ps !== undefined) {
          scopeOfNode.set(id, ps);
          ps.refcount++;
        }
      }
    },
  };
  scopesById.set(id, frame);
  memoScopesByStart.set(start, frame);

  return {
    enter() {
      // Refresh hostParent in case the start comment was moved.
      if (start.parentNode !== null) frame.hostParent = start.parentNode;
      scopeStack.push(frame);
    },
    leave() {
      for (let i = scopeStack.length - 1; i >= 0; i--) {
        if (scopeStack[i] === frame) {
          scopeStack.splice(i, 1);
          break;
        }
      }
    },
    clearChildren() {
      // Walk the live region (start..end) and emit removed for any
      // exposed descendant ids that were tracked. This is invoked
      // before insertReactive replaces the bracketed range.
      let n = start.nextSibling;
      while (n !== null && n !== end) {
        detachRecursive(n);
        n = n.nextSibling;
      }
    },
    dispose() {
      // Memo region is permanently torn down (e.g. enclosing scope
      // cleared the bracketed range). Emit removed for the scope.
      memoScopesByStart.delete(start);
      emitRemoved(id);
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Devtools rerender bridge
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Errors
// ─────────────────────────────────────────────────────────────────────────────

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
