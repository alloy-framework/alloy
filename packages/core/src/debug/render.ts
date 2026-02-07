import { isReactive, isRef, watch } from "@vue/reactivity";
import * as devalue from "devalue";
import {
  isDevtoolsEnabled,
  registerDevtoolsMessageHandler,
  type DevtoolsMessage,
} from "../devtools/devtools-server.js";
import {
  isPrintHook,
  type PrintHook,
  type RenderedTextTree,
} from "../print-hook.js";
import { untrack } from "../reactivity.js";
import type { ComponentCreator } from "../runtime/component.js";
import { flushJobsAsync } from "../scheduler.js";
import { emitDevtoolsMessage } from "./trace.js";

export type RenderTreeNodeKind =
  | "root"
  | "component"
  | "intrinsic"
  | "printHook"
  | "text"
  | "memo"
  | "customContext"
  | "fragment";

export interface RenderTreeNodeInfo {
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

let nodeIds = new WeakMap<object, number>();
let idToNode = new Map<number, RenderedTextTree | PrintHook>();
let entryIds = new WeakMap<RenderedTextTree, number[]>();
let fileNodes = new Map<number, { path: string; filetype: string }>();
let directoryNodes = new Map<number, { path: string }>();
let nodeProps = new Map<number, string | undefined>();
let rerenderActions = new Map<number, RenderNodeActions>();
let nextId = 1;
let handlerRegistered = false;

function serializeRenderTreeProps(input: Record<string, unknown> | undefined) {
  return untrack(() => {
    if (!input) return undefined;
    const { children: _children, ...rest } = input;
    const seen = new WeakSet<object>();
    const maxEntries = 50;
    const maxDepth = 3;

    function isPlainObject(value: unknown) {
      if (!value || typeof value !== "object") return false;
      const proto = Object.getPrototypeOf(value);
      return proto === Object.prototype || proto === null;
    }

    function sanitize(value: unknown, depth: number): unknown {
      if (depth > maxDepth) return "[MaxDepth]";
      if (
        value === null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return value;
      }
      if (typeof value === "bigint") return value.toString();
      if (typeof value === "symbol") return value.toString();
      if (typeof value === "function") return "[Function]";
      if (isRef(value)) {
        return sanitize(value.value, depth + 1);
      }
      if (isReactive(value)) {
        return "[Reactive]";
      }
      if (Array.isArray(value)) {
        return value
          .slice(0, maxEntries)
          .map((item) => sanitize(item, depth + 1));
      }
      if (typeof value === "object") {
        const obj = value as Record<string, unknown>;
        if (seen.has(obj)) return "[Circular]";
        seen.add(obj);
        if (!isPlainObject(obj)) {
          const name = obj.constructor?.name ?? "Object";
          return `[${name}]`;
        }
        const entries = Object.entries(obj).slice(0, maxEntries);
        const result: Record<string, unknown> = {};
        for (const [key, val] of entries) {
          result[key] = sanitize(val, depth + 1);
        }
        return result;
      }
      return String(value);
    }

    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(rest).slice(0, maxEntries)) {
      sanitized[key] = sanitize(value, 0);
    }
    try {
      return devalue.stringify(sanitized);
    } catch {
      return undefined;
    }
  });
}

function emitNodeRemoved(parentId: number | null, id: number) {
  clearRenderTreeChildrenForId(id);
  emitDevtoolsMessage({
    type: "render:nodeRemoved",
    parentId,
    id,
  } as DevtoolsMessage);

  rerenderActions.delete(id);
  nodeProps.delete(id);
  idToNode.delete(id);

  const fileInfo = fileNodes.get(id);
  if (fileInfo) {
    emitDevtoolsMessage({
      type: "files:fileRemoved",
      path: fileInfo.path,
    } as DevtoolsMessage);
    fileNodes.delete(id);
  }

  const dirInfo = directoryNodes.get(id);
  if (dirInfo) {
    emitDevtoolsMessage({
      type: "files:directoryRemoved",
      path: dirInfo.path,
    } as DevtoolsMessage);
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

function getOrCreateNodeId(node: object) {
  const existing = nodeIds.get(node);
  if (existing) return existing;
  const id = nextId++;
  nodeIds.set(node, id);
  idToNode.set(id, node as RenderedTextTree | PrintHook);
  return id;
}

export function getRenderNodeId(node: RenderedTextTree | PrintHook) {
  if (!isDevtoolsEnabled()) return undefined;
  return getOrCreateNodeId(node as unknown as object);
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
  emitDevtoolsMessage({ type: "render:reset" } as DevtoolsMessage);
  const rootId = getOrCreateNodeId(root as unknown as object);
  emitDevtoolsMessage({
    type: "render:nodeAdded",
    parentId: null,
    node: {
      id: rootId,
      kind: "root",
    },
  } as DevtoolsMessage);
}

export function registerRenderNodeActions(
  node: RenderedTextTree | PrintHook,
  actions: RenderNodeActions,
) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node as unknown as object);
  rerenderActions.set(id, actions);
}

export function unregisterRenderNodeActions(
  node: RenderedTextTree | PrintHook,
) {
  if (!isDevtoolsEnabled()) return;
  const id = nodeIds.get(node as unknown as object);
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
    parentId: getOrCreateNodeId(parent as unknown as object),
    node: {
      id,
      kind: "text",
      value,
    },
  } as DevtoolsMessage);
}

function recordNodeAdded(
  parent: RenderedTextTree,
  index: number,
  node: RenderedTextTree | PrintHook,
  info: RenderTreeNodeInfo,
) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node as unknown as object);
  if (info.propsSerialized !== undefined) {
    nodeProps.set(id, info.propsSerialized);
  }
  setEntryId(parent, index, id);
  emitDevtoolsMessage({
    type: "render:nodeAdded",
    parentId: getOrCreateNodeId(parent as unknown as object),
    node: {
      id,
      ...info,
    },
  } as DevtoolsMessage);
}

function recordSubtreeAdded(
  parentNode: RenderedTextTree | PrintHook,
  subtree: RenderedTextTree,
  info: RenderTreeNodeInfo = { kind: "fragment" },
) {
  if (!isDevtoolsEnabled()) return;
  const parentId = getOrCreateNodeId(parentNode as unknown as object);
  // Check if this node was previously rendered (cached) by seeing if it already has an ID
  const existingId = nodeIds.get(subtree as unknown as object);
  const isCached = existingId !== undefined;
  const id =
    isCached ? existingId : getOrCreateNodeId(subtree as unknown as object);
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
  } as DevtoolsMessage);
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
  const parentId = getOrCreateNodeId(node as unknown as object);

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
        } as DevtoolsMessage);
      }
    } else if (Array.isArray(child)) {
      // Nested RenderedTextTree - record and recurse
      const id = getOrCreateNodeId(child as unknown as object);
      list.push(id);
      emitDevtoolsMessage({
        type: "render:nodeAdded",
        parentId,
        node: {
          id,
          kind: "fragment",
        },
      } as DevtoolsMessage);
      recordCachedSubtreeChildrenRecursively(child);
    } else if (isPrintHook(child)) {
      // PrintHook - record and recurse into subtree
      const id = getOrCreateNodeId(child as unknown as object);
      list.push(id);
      emitDevtoolsMessage({
        type: "render:nodeAdded",
        parentId,
        node: {
          id,
          kind: "printHook",
          name: (child as { name?: string }).name ?? "hook",
        },
      } as DevtoolsMessage);
      if (child.subtree) {
        const subtreeId = getOrCreateNodeId(child.subtree as unknown as object);
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
        } as DevtoolsMessage);
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
  const id = getOrCreateNodeId(node as unknown as object);
  const previous = nodeProps.get(id);
  if (previous === propsSerialized) return;
  nodeProps.set(id, propsSerialized);
  emitDevtoolsMessage({
    type: "render:nodeUpdated",
    id,
    propsSerialized,
  } as DevtoolsMessage);
}

function clearRenderTreeChildren(parent: RenderedTextTree) {
  if (!isDevtoolsEnabled()) return;
  const list = entryIds.get(parent);
  if (!list || list.length === 0) return;
  const parentId = getOrCreateNodeId(parent as unknown as object);
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

function recordDirectoryNode(node: RenderedTextTree, path: string) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node as unknown as object);
  if (directoryNodes.has(id)) return;
  directoryNodes.set(id, { path });
  emitDevtoolsMessage({
    type: "files:directoryAdded",
    path,
  } as DevtoolsMessage);
}

function recordFileNode(
  node: RenderedTextTree,
  path: string,
  filetype: string,
) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node as unknown as object);
  if (fileNodes.has(id)) return;
  fileNodes.set(id, { path, filetype });
  emitDevtoolsMessage({
    type: "files:fileAdded",
    path,
    filetype,
    renderNodeId: id,
  } as DevtoolsMessage);
}

function removeFileEntriesForNode(node: RenderedTextTree | PrintHook) {
  if (!isDevtoolsEnabled()) return;
  const id = nodeIds.get(node as unknown as object);
  if (id === undefined) return;
  const fileInfo = fileNodes.get(id);
  if (fileInfo) {
    emitDevtoolsMessage({
      type: "files:fileRemoved",
      path: fileInfo.path,
    } as DevtoolsMessage);
    fileNodes.delete(id);
  }
  const dirInfo = directoryNodes.get(id);
  if (dirInfo) {
    emitDevtoolsMessage({
      type: "files:directoryRemoved",
      path: dirInfo.path,
    } as DevtoolsMessage);
    directoryNodes.delete(id);
  }
}

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

    const stopHandles: Array<() => void> = [];
    if (propsSource) {
      const propKeys = Object.keys(propsSource).filter(
        (key) => key !== "children",
      );
      const emitPropsUpdate = () => {
        const nextSerialized = serializeRenderTreeProps(propsSource);
        recordNodePropsUpdated(node, nextSerialized);
      };

      for (const key of propKeys) {
        stopHandles.push(
          watch(
            () => propsSource[key],
            () => emitPropsUpdate(),
          ),
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
        for (const stop of stopHandles) {
          stop();
        }
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

export function worker(childrenDescription: () => string) {
  void childrenDescription;
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

export interface RenderErrorStackEntry {
  name: string;
  props?: Record<string, unknown> | undefined;
  propsSerialized?: string;
  renderNodeId?: number;
  source?: RenderTreeNodeInfo["source"];
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
    type: "render:error",
    id: nextErrorId++,
    name: error.name,
    message: error.message,
    stack: error.stack,
    componentStack: serializedStack,
  } as DevtoolsMessage;
  emitDevtoolsMessage(message);
}

export function complete() {
  emitDevtoolsMessage({ type: "render:complete" } as DevtoolsMessage);
}

export function flushJobsComplete() {
  emitDevtoolsMessage({ type: "flushJobs:complete" } as DevtoolsMessage);
}
