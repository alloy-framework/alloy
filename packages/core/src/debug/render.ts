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
import { untrack } from "../reactivity.js";
import type { ComponentCreator } from "../runtime/component.js";
import { flushJobsAsync } from "../scheduler.js";
import { sanitizeRecord } from "./serialize.js";
import { emitDevtoolsMessage } from "./trace.js";

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
  emitDevtoolsMessage({
    type: "render:nodeRemoved",
    parentId,
    id,
  });

  rerenderActions.delete(id);
  nodeProps.delete(id);
  idToNode.delete(id);

  const fileInfo = fileNodes.get(id);
  if (fileInfo) {
    emitDevtoolsMessage({
      type: "files:fileRemoved",
      path: fileInfo.path,
    });
    fileNodes.delete(id);
  }

  const dirInfo = directoryNodes.get(id);
  if (dirInfo) {
    emitDevtoolsMessage({
      type: "files:directoryRemoved",
      path: dirInfo.path,
    });
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
  if (existing) return existing;
  const id = nextId++;
  nodeIds.set(node, id);
  idToNode.set(id, node);
  return id;
}

export function getRenderNodeId(node: RenderedTextTree | PrintHook) {
  if (!isDevtoolsEnabled()) return undefined;
  return getOrCreateNodeId(node);
}

function setEntryId(parent: RenderedTextTree, index: number, id: number) {
  const list = getEntryList(parent);
  list[index] = id;
}

export function initialize(root: RenderedTextTree) {
  if (!isDevtoolsEnabled()) return;
  ensureDevtoolsHandler();
  nodeIds = new WeakMap();
  idToNode = new Map();
  entryIds = new WeakMap();
  fileNodes = new Map();
  directoryNodes = new Map();
  nodeProps = new Map();
  rerenderActions = new Map();
  nextId = 1;
  emitDevtoolsMessage({ type: "render:reset" });
  const rootId = getOrCreateNodeId(root);
  emitDevtoolsMessage({
    type: "render:nodeAdded",
    parentId: null,
    node: {
      id: rootId,
      kind: "root",
    },
  });
}

export function registerRenderNodeActions(
  node: RenderedTextTree | PrintHook,
  actions: RenderNodeActions,
) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node);
  rerenderActions.set(id, actions);
}

export function unregisterRenderNodeActions(
  node: RenderedTextTree | PrintHook,
) {
  if (!isDevtoolsEnabled()) return;
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
  if (!isDevtoolsEnabled()) return;
  const id = nextId++;
  setEntryId(parent, index, id);
  emitDevtoolsMessage({
    type: "render:nodeAdded",
    parentId: getOrCreateNodeId(parent),
    node: {
      id,
      kind: "text",
      value,
    },
  });
}

function recordNodeAdded(
  parent: RenderedTextTree,
  index: number,
  node: RenderedTextTree | PrintHook,
  info: RenderTreeNodeInfo,
) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node);
  if (info.propsSerialized !== undefined) {
    nodeProps.set(id, info.propsSerialized);
  }
  setEntryId(parent, index, id);
  emitDevtoolsMessage({
    type: "render:nodeAdded",
    parentId: getOrCreateNodeId(parent),
    node: {
      id,
      ...info,
    },
  });
}

function recordSubtreeAdded(
  parentNode: RenderedTextTree | PrintHook,
  subtree: RenderedTextTree,
  info: RenderTreeNodeInfo = { kind: "fragment" },
) {
  if (!isDevtoolsEnabled()) return;
  const parentId = getOrCreateNodeId(parentNode);
  // Check if this node was previously rendered (cached) by seeing if it already has an ID
  const existingId = nodeIds.get(subtree);
  const isCached = existingId !== undefined;
  const id = isCached ? existingId : getOrCreateNodeId(subtree);
  // Track in entryIds so clearRenderTreeChildren can find and remove it
  if (Array.isArray(parentNode)) {
    const list = getEntryList(parentNode);
    list.push(id);
  }
  emitDevtoolsMessage({
    type: "render:nodeAdded",
    parentId,
    node: {
      id,
      ...info,
    },
  });
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
  if (!isDevtoolsEnabled()) return;
  const parentId = getOrCreateNodeId(node);

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
        emitDevtoolsMessage({
          type: "render:nodeAdded",
          parentId,
          node: {
            id,
            kind: "text",
            value: child,
          },
        });
      }
    } else if (Array.isArray(child)) {
      // Nested RenderedTextTree - record and recurse
      const id = getOrCreateNodeId(child);
      list.push(id);
      emitDevtoolsMessage({
        type: "render:nodeAdded",
        parentId,
        node: {
          id,
          kind: "fragment",
        },
      });
      recordCachedSubtreeChildrenRecursively(child);
    } else if (isPrintHook(child)) {
      // PrintHook - record and recurse into subtree
      const id = getOrCreateNodeId(child);
      list.push(id);
      emitDevtoolsMessage({
        type: "render:nodeAdded",
        parentId,
        node: {
          id,
          kind: "printHook",
          name: (child as { name?: string }).name ?? "hook",
        },
      });
      if (child.subtree) {
        const subtreeId = getOrCreateNodeId(child.subtree);
        const hookList = getEntryList(child as unknown as RenderedTextTree);
        hookList.length = 0;
        hookList.push(subtreeId);
        emitDevtoolsMessage({
          type: "render:nodeAdded",
          parentId: id,
          node: {
            id: subtreeId,
            kind: "fragment",
          },
        });
        recordCachedSubtreeChildrenRecursively(child.subtree);
      }
    }
  }
}

function recordNodePropsUpdated(
  node: RenderedTextTree | PrintHook,
  propsSerialized: string | undefined,
) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node);
  const previous = nodeProps.get(id);
  if (previous === propsSerialized) return;
  nodeProps.set(id, propsSerialized);
  emitDevtoolsMessage({
    type: "render:nodeUpdated",
    id,
    propsSerialized,
  });
}

function clearRenderTreeChildren(parent: RenderedTextTree) {
  if (!isDevtoolsEnabled()) return;
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
  const subtree = (node as { subtree?: RenderedTextTree }).subtree;
  if (subtree && Array.isArray(subtree)) {
    clearRenderTreeChildren(subtree);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// File / directory node tracking
// ─────────────────────────────────────────────────────────────────────────────

function recordDirectoryNode(node: RenderedTextTree, path: string) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node);
  if (directoryNodes.has(id)) return;
  directoryNodes.set(id, { path });
  emitDevtoolsMessage({
    type: "files:directoryAdded",
    path,
  });
}

function recordFileNode(
  node: RenderedTextTree,
  path: string,
  filetype: string,
) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node);
  if (fileNodes.has(id)) return;
  fileNodes.set(id, { path, filetype });
  emitDevtoolsMessage({
    type: "files:fileAdded",
    path,
    filetype,
    renderNodeId: id,
  });
}

function removeFileEntriesForNode(node: RenderedTextTree | PrintHook) {
  if (!isDevtoolsEnabled()) return;
  const id = nodeIds.get(node);
  if (id === undefined) return;
  const fileInfo = fileNodes.get(id);
  if (fileInfo) {
    emitDevtoolsMessage({
      type: "files:fileRemoved",
      path: fileInfo.path,
    });
    fileNodes.delete(id);
  }
  const dirInfo = directoryNodes.get(id);
  if (dirInfo) {
    emitDevtoolsMessage({
      type: "files:directoryRemoved",
      path: dirInfo.path,
    });
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

  if (!isDevtoolsEnabled()) {
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
    if (isExisting) {
      clearRenderTreeChildren(node);
    } else {
      recordNodeAdded(parent, index, node, {
        kind: "component",
        name: componentName,
        propsSerialized,
        source,
      });
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
  if (!isDevtoolsEnabled()) return;
  const serializedStack = untrack(() =>
    componentStack.map((entry) => ({
      name: entry.name,
      propsSerialized: entry.propsSerialized,
      renderNodeId: entry.renderNodeId,
      source: entry.source,
    })),
  );
  const message = {
    type: "render:error" as const,
    id: nextErrorId++,
    name: error.name,
    message: error.message,
    stack: error.stack,
    componentStack: serializedStack,
  };
  emitDevtoolsMessage(message);
}

export function complete() {
  emitDevtoolsMessage({ type: "render:complete" });
}

export function flushJobsComplete() {
  emitDevtoolsMessage({ type: "flushJobs:complete" });
}
