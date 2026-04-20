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
import {
  isPrintHook,
  type PrintHook,
  type RenderedTextTree,
} from "../print-hook.js";
import { getContext, untrack } from "../reactivity.js";
import type { ComponentCreator } from "../runtime/component.js";
import { flushJobsAsync } from "../scheduler.js";
import { sanitizeRecord } from "./serialize.js";
import { resolveComponentSource } from "./source-map.js";
import {
  deleteDirectory,
  deleteOutputFile,
  insertDirectory,
  insertOutputFile,
  insertRenderError,
  insertRenderNode,
  isTraceEnabled,
  notifyFlushComplete,
  notifyRenderComplete,
  notifyRenderReset,
  deleteRenderNode as traceDeleteRenderNode,
  updateRenderNodeProps as traceUpdateRenderNodeProps,
  updateEffectComponentByContext,
  updateRenderNodeContext,
} from "./trace-writer.js";
import { isDebugEnabled, logDevtoolsMessage } from "./trace.js";

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
  parent: RenderedTextTree;
  index: number;
  node: RenderedTextTree;
  component: ComponentCreator<unknown>;
  propsSource: Record<string, unknown> | undefined;
  source: RenderTreeNodeInfo["source"] | undefined;
  isExisting: boolean;
  actions: RenderNodeActions;
}

export interface ComponentDebugSession {
  recordDirectory(path: string): void;
  recordFile(path: string, filetype: string): void;
  dispose(): void;
}

/** Any node tracked by the devtools render tree. */
type TrackedNode = RenderedTextTree | PrintHook;

// ─────────────────────────────────────────────────────────────────────────────
// Module state — reset in initialize()
// ─────────────────────────────────────────────────────────────────────────────

let nodeIds = new WeakMap<TrackedNode, number>();
let idToNode = new Map<number, TrackedNode>();
let entryIds = new WeakMap<RenderedTextTree, number[]>();
let nodeKinds = new WeakMap<
  TrackedNode,
  { kind: string; name?: string; source?: RenderTreeNodeInfo["source"] }
>();
let fileNodes = new Map<number, { path: string; filetype: string }>();
let directoryNodes = new Map<number, { path: string }>();
let nodeProps = new Map<number, string | undefined>();
let rerenderActions = new Map<number, RenderNodeActions>();
let nextId = 1;
let handlerRegistered = false;

// ─────────────────────────────────────────────────────────────────────────────
// Props serialization
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

// ─────────────────────────────────────────────────────────────────────────────
// Node ID management & tree structure
// ─────────────────────────────────────────────────────────────────────────────

function emitNodeRemoved(parentId: number | null, id: number) {
  clearRenderTreeChildrenForId(id);
  traceDeleteRenderNode(id);

  rerenderActions.delete(id);
  nodeProps.delete(id);
  idToNode.delete(id);

  const fileInfo = fileNodes.get(id);
  if (fileInfo) {
    deleteOutputFile(fileInfo.path);
    fileNodes.delete(id);
  }

  const dirInfo = directoryNodes.get(id);
  if (dirInfo) {
    deleteDirectory(dirInfo.path);
    directoryNodes.delete(id);
  }
}

function getEntryList(parent: RenderedTextTree) {
  let list = entryIds.get(parent);
  if (!list) {
    list = [];
    entryIds.set(parent, list);
  }
  return list;
}

function getOrCreateNodeId(node: TrackedNode) {
  const existing = nodeIds.get(node);
  if (existing) {
    // Restore reverse mapping — emitNodeRemoved deletes idToNode but nodeIds
    // (WeakMap) survives.  Without this, clearRenderTreeChildrenForId can't
    // find the node on the next cleanup, leaving orphaned children in the DB.
    idToNode.set(existing, node);
    return existing;
  }
  const id = nextId++;
  nodeIds.set(node, id);
  idToNode.set(id, node);
  return id;
}

export function getRenderNodeId(node: RenderedTextTree | PrintHook) {
  if (!isDebugEnabled()) return undefined;
  return getOrCreateNodeId(node);
}

function setEntryId(parent: RenderedTextTree, index: number, id: number) {
  const list = getEntryList(parent);
  list[index] = id;
}

export function initialize(root: RenderedTextTree) {
  if (!isDebugEnabled()) return;
  ensureDevtoolsHandler();
  nodeIds = new WeakMap();
  idToNode = new Map();
  entryIds = new WeakMap();
  nodeKinds = new WeakMap();
  fileNodes = new Map();
  directoryNodes = new Map();
  nodeProps = new Map();
  rerenderActions = new Map();
  nextId = 1;
  notifyRenderReset();
  const rootId = getOrCreateNodeId(root);
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

export function registerRenderNodeActions(
  node: RenderedTextTree | PrintHook,
  actions: RenderNodeActions,
) {
  if (!isDebugEnabled()) return;
  const id = getOrCreateNodeId(node);
  rerenderActions.set(id, actions);
}

export function unregisterRenderNodeActions(
  node: RenderedTextTree | PrintHook,
) {
  if (!isDebugEnabled()) return;
  const id = nodeIds.get(node);
  if (id !== undefined) {
    rerenderActions.delete(id);
  }
}

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

export function recordTextNode(
  parent: RenderedTextTree,
  index: number,
  value: string,
) {
  if (!isDebugEnabled()) return;
  const id = nextId++;
  setEntryId(parent, index, id);
  insertRenderNode(
    id,
    getOrCreateNodeId(parent),
    "text",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    null,
    value,
  );
}

function recordNodeAdded(
  parent: RenderedTextTree,
  index: number,
  node: RenderedTextTree | PrintHook,
  info: RenderTreeNodeInfo,
) {
  if (!isDebugEnabled()) return;
  const id = getOrCreateNodeId(node);
  if (info.propsSerialized !== undefined) {
    nodeProps.set(id, info.propsSerialized);
  }
  // Remember the kind and source so cached re-adds preserve them
  nodeKinds.set(node, {
    kind: info.kind,
    name: info.name,
    source: info.source,
  });
  setEntryId(parent, index, id);
  insertRenderNode(
    id,
    getOrCreateNodeId(parent),
    info.kind,
    info.name,
    info.propsSerialized,
    info.source?.fileName,
    info.source?.lineNumber,
    info.source?.columnNumber,
    null,
    undefined,
  );
}

function recordSubtreeAdded(
  parentNode: RenderedTextTree | PrintHook,
  subtree: RenderedTextTree,
  info: RenderTreeNodeInfo = { kind: "fragment" },
) {
  if (!isDebugEnabled()) return;
  const parentId = getOrCreateNodeId(parentNode);
  // Check if this node was previously rendered (cached) by seeing if it already has an ID
  const existingId = nodeIds.get(subtree);
  const isCached = existingId !== undefined;
  const id = isCached ? existingId : getOrCreateNodeId(subtree);
  // Merge source from previously-saved nodeKinds if the caller didn't provide one
  const savedKind = nodeKinds.get(subtree);
  const source = info.source ?? savedKind?.source;
  // Remember the kind and source so cached re-adds preserve them
  nodeKinds.set(subtree, { kind: info.kind, name: info.name, source });
  // Track in entryIds so clearRenderTreeChildren can find and remove it
  if (Array.isArray(parentNode)) {
    const list = getEntryList(parentNode);
    list.push(id);
  }
  insertRenderNode(
    id,
    parentId,
    info.kind,
    info.name,
    info.propsSerialized,
    source?.fileName,
    source?.lineNumber,
    source?.columnNumber,
    null,
    undefined,
  );

  // For cached nodes, we need to recursively re-add all their children since
  // clearRenderTreeChildren removed them when the parent re-rendered
  if (isCached) {
    recordCachedSubtreeChildrenRecursively(subtree);
  }
}

/**
 * Recursively re-adds all children of a cached render tree node to devtools.
 * This is needed because clearRenderTreeChildren recursively removes all
 * descendants, but cached nodes aren't re-rendered so their children need
 * to be explicitly re-added.
 */
function recordCachedSubtreeChildrenRecursively(node: RenderedTextTree) {
  if (!isDebugEnabled()) return;
  const parentId = getOrCreateNodeId(node);

  // Clear any previously-recorded children from the DB before re-adding.
  // The in-memory tree may have changed since the last cached re-add
  // (e.g., a memo inside the cached subtree re-ran), so old DB children
  // that are no longer in the tree would become orphans.
  clearRenderTreeChildren(node);

  // Rebuild the entryIds for this node
  const list = getEntryList(node);
  list.length = 0;

  for (let i = 0; i < node.length; i++) {
    const child = node[i];
    if (typeof child === "string") {
      // Text nodes - re-record them with new IDs
      if (child !== "") {
        const id = nextId++;
        list.push(id);
        idToNode.set(id, child as unknown as RenderedTextTree);
        insertRenderNode(
          id,
          parentId,
          "text",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          null,
          child,
        );
      }
    } else if (Array.isArray(child)) {
      // Nested RenderedTextTree - record and recurse, preserving original kind and source
      const id = getOrCreateNodeId(child);
      list.push(id);
      const savedKind = nodeKinds.get(child);
      insertRenderNode(
        id,
        parentId,
        savedKind?.kind ?? "fragment",
        savedKind?.name,
        undefined,
        savedKind?.source?.fileName,
        savedKind?.source?.lineNumber,
        savedKind?.source?.columnNumber,
        null,
        undefined,
      );
      recordCachedSubtreeChildrenRecursively(child);
    } else if (isPrintHook(child)) {
      // PrintHook - record and recurse into subtree
      const id = getOrCreateNodeId(child);
      list.push(id);
      insertRenderNode(
        id,
        parentId,
        "printHook",
        (child as { name?: string }).name ?? "hook",
        undefined,
        undefined,
        undefined,
        undefined,
        null,
        undefined,
      );
      if (child.subtree) {
        const subtreeId = getOrCreateNodeId(child.subtree);
        const hookList = getEntryList(child as unknown as RenderedTextTree);
        hookList.length = 0;
        hookList.push(subtreeId);
        insertRenderNode(
          subtreeId,
          id,
          "fragment",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          null,
          undefined,
        );
        recordCachedSubtreeChildrenRecursively(child.subtree);
      }
    }
  }
}

function recordNodePropsUpdated(
  node: RenderedTextTree | PrintHook,
  propsSerialized: string | undefined,
) {
  if (!isDebugEnabled()) return;
  const id = getOrCreateNodeId(node);
  const previous = nodeProps.get(id);
  if (previous === propsSerialized) return;
  nodeProps.set(id, propsSerialized);
  traceUpdateRenderNodeProps(id, propsSerialized);
}

function clearRenderTreeChildren(parent: RenderedTextTree) {
  if (!isDebugEnabled()) return;
  const list = entryIds.get(parent);
  if (!list || list.length === 0) return;
  const parentId = getOrCreateNodeId(parent);
  for (const id of list) {
    if (id !== undefined) {
      emitNodeRemoved(parentId, id);
    }
  }
  entryIds.set(parent, []);
}

function clearRenderTreeChildrenForId(id: number) {
  const node = idToNode.get(id);
  if (!node) return;
  if (Array.isArray(node)) {
    clearRenderTreeChildren(node);
    return;
  }
  // For PrintHook nodes: clear the subtree's children, then remove
  // the subtree node itself (which is a child of this hook).
  const subtree = (node as { subtree?: RenderedTextTree }).subtree;
  if (subtree && Array.isArray(subtree)) {
    clearRenderTreeChildren(subtree);
    const subtreeId = nodeIds.get(subtree);
    if (subtreeId !== undefined) {
      emitNodeRemoved(id, subtreeId);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// File / directory node tracking
// ─────────────────────────────────────────────────────────────────────────────

function recordDirectoryNode(node: RenderedTextTree, path: string) {
  if (!isDebugEnabled()) return;
  const id = getOrCreateNodeId(node);
  if (directoryNodes.has(id)) return;
  directoryNodes.set(id, { path });
  insertDirectory(path);
}

function recordFileNode(
  node: RenderedTextTree,
  path: string,
  filetype: string,
) {
  if (!isDebugEnabled()) return;
  const id = getOrCreateNodeId(node);
  if (fileNodes.has(id)) return;
  fileNodes.set(id, { path, filetype });
  insertOutputFile(path, filetype, id);
}

function removeFileEntriesForNode(node: RenderedTextTree | PrintHook) {
  if (!isDebugEnabled()) return;
  const id = nodeIds.get(node);
  if (id === undefined) return;
  const fileInfo = fileNodes.get(id);
  if (fileInfo) {
    deleteOutputFile(fileInfo.path);
    fileNodes.delete(id);
  }
  const dirInfo = directoryNodes.get(id);
  if (dirInfo) {
    deleteDirectory(dirInfo.path);
    directoryNodes.delete(id);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API — called from render.ts via the debug object
// ─────────────────────────────────────────────────────────────────────────────

/** Begin tracking a component render. Returns a session to record files/dirs and dispose watchers. */
export function beginComponent(
  options: BeginComponentOptions,
): ComponentDebugSession {
  const {
    parent,
    index,
    node,
    component,
    propsSource,
    source,
    isExisting,
    actions,
  } = options;

  if (!isDebugEnabled()) {
    return {
      recordDirectory() {},
      recordFile() {},
      dispose() {},
    };
  }

  return untrack(() => {
    let componentName = component.component.name;
    if (componentName === "Provider") {
      const contextName = (component.component as any).contextName as
        | string
        | undefined;
      if (contextName) {
        componentName = `Context ${contextName}`;
      }
    }
    const propsSerialized = serializeRenderTreeProps(propsSource);
    const resolvedSource = resolveComponentSource(source);
    if (isExisting) {
      clearRenderTreeChildren(node);
    } else {
      recordNodeAdded(parent, index, node, {
        kind: "component",
        name: componentName,
        propsSerialized,
        source: resolvedSource,
      });
    }

    if (isTraceEnabled()) {
      const ctx = getContext();
      if (ctx) {
        updateRenderNodeContext(getOrCreateNodeId(node), ctx.id);
        updateEffectComponentByContext(ctx.id, componentName);
      }
    }
    recordNodePropsUpdated(node, propsSerialized);
    registerRenderNodeActions(node, actions);

    let stopWatch: (() => void) | undefined;
    if (propsSource) {
      const propKeys = Object.keys(propsSource).filter(
        (key) => key !== "children",
      );
      if (propKeys.length > 0) {
        stopWatch = watch(
          () => propKeys.map((key) => propsSource[key]),
          () => {
            const nextSerialized = serializeRenderTreeProps(propsSource);
            recordNodePropsUpdated(node, nextSerialized);
          },
        );
      }
    }

    return {
      recordDirectory(path: string) {
        recordDirectoryNode(node, path);
      },
      recordFile(path: string, filetype: string) {
        recordFileNode(node, path, filetype);
      },
      dispose() {
        stopWatch?.();
        removeFileEntriesForNode(node);
        unregisterRenderNodeActions(node);
      },
    };
  });
}

export function appendCustomContext(
  parent: RenderedTextTree,
  node: RenderedTextTree,
) {
  recordSubtreeAdded(parent, node, { kind: "customContext" });
}

export function appendPrintHook(
  parent: RenderedTextTree,
  index: number,
  hook: PrintHook,
  name: string,
  subtree?: RenderedTextTree,
) {
  recordNodeAdded(parent, index, hook, { kind: "printHook", name });
  if (subtree) {
    recordSubtreeAdded(hook, subtree);
  }
}

export function appendFragmentChild(
  parent: RenderedTextTree,
  child: RenderedTextTree,
) {
  recordSubtreeAdded(parent, child, { kind: "fragment" });
}

export function appendTextNode(
  parent: RenderedTextTree,
  index: number,
  value: string,
) {
  recordTextNode(parent, index, value);
}

export function prepareMemoNode(
  parent: RenderedTextTree,
  node: RenderedTextTree,
  isExisting: boolean,
) {
  if (isExisting) {
    clearRenderTreeChildren(node);
    return;
  }
  recordSubtreeAdded(parent, node, { kind: "memo" });
}

let nextErrorId = 1;

export interface RenderErrorInfo {
  name: string;
  message: string;
  stack?: string;
}

/** Render error stack entry with optional runtime props (extends protocol type). */
export interface RenderErrorStackEntry extends ProtocolRenderErrorStackEntry {
  props?: Record<string, unknown> | undefined;
}

export function error(
  error: RenderErrorInfo,
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
    name: error.name,
    message: error.message,
    stack: error.stack,
    componentStack: serializedStack,
  });

  insertRenderError(
    error.name,
    error.message,
    error.stack,
    JSON.stringify(serializedStack),
  );
}

export function complete() {
  logDevtoolsMessage({ type: "render:complete" });
  notifyRenderComplete();
}

export function flushJobsComplete() {
  logDevtoolsMessage({ type: "flushJobs:complete" });
  notifyFlushComplete();
}
