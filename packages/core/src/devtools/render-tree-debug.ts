import { isReactive, isRef } from "@vue/reactivity";
import * as devalue from "devalue";
import { untrack } from "../reactivity.js";
import type { PrintHook, RenderedTextTree } from "../render.js";
import {
  broadcastDevtoolsMessage,
  isDevtoolsEnabled,
  registerDevtoolsMessageHandler,
} from "./devtools-server.js";

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

export function serializeRenderTreeProps(
  input: Record<string, unknown> | undefined,
) {
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

interface RenderTreeNodeAddedMessage {
  type: "renderTree:nodeAdded";
  parentId: number | null;
  node: RenderTreeNodeInfo & { id: number };
}

interface RenderTreeNodeRemovedMessage {
  type: "renderTree:nodeRemoved";
  parentId: number | null;
  id: number;
}

interface RenderTreeNodeUpdatedMessage {
  type: "renderTree:nodeUpdated";
  id: number;
  propsSerialized?: string;
}

interface RenderTreeResetMessage {
  type: "renderTree:reset";
}

interface RenderTreeRerenderMessage {
  type: "renderTree:rerender" | "renderTree:rerenderAndBreak";
  id: number;
}

interface DirectoryMessage {
  type: "files:directoryAdded" | "files:directoryRemoved";
  path: string;
}

interface FileMessage {
  type: "files:fileAdded" | "files:fileRemoved" | "files:fileUpdated";
  path: string;
  filetype?: string;
  contents?: string;
  unchanged?: boolean;
  renderNodeId?: number;
}

let nodeIds = new WeakMap<object, number>();
let entryIds = new WeakMap<RenderedTextTree, number[]>();
let fileNodes = new Map<number, { path: string; filetype: string }>();
let directoryNodes = new Map<number, { path: string }>();
let nodeProps = new Map<number, string | undefined>();
let rerenderActions = new Map<
  number,
  { rerender: () => void; rerenderAndBreak: () => void }
>();
let nextId = 1;

function emit(
  message:
    | RenderTreeNodeAddedMessage
    | RenderTreeNodeRemovedMessage
    | RenderTreeNodeUpdatedMessage
    | RenderTreeResetMessage
    | DirectoryMessage
    | FileMessage,
) {
  if (!isDevtoolsEnabled()) return;
  void broadcastDevtoolsMessage(message);
}

function emitNodeRemoved(parentId: number | null, id: number) {
  emit({
    type: "renderTree:nodeRemoved",
    parentId,
    id,
  });

  rerenderActions.delete(id);

  const fileInfo = fileNodes.get(id);
  if (fileInfo) {
    emit({
      type: "files:fileRemoved",
      path: fileInfo.path,
    });
    fileNodes.delete(id);
  }

  const dirInfo = directoryNodes.get(id);
  if (dirInfo) {
    emit({
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

function getOrCreateNodeId(node: object) {
  const existing = nodeIds.get(node);
  if (existing) return existing;
  const id = nextId++;
  nodeIds.set(node, id);
  return id;
}

export function getRenderNodeId(node: RenderedTextTree | PrintHook) {
  if (!isDevtoolsEnabled()) return undefined;
  return getOrCreateNodeId(node as unknown as object);
}

function removeEntryId(parent: RenderedTextTree, index: number) {
  const list = entryIds.get(parent);
  if (!list) return undefined;
  const existing = list[index];
  if (existing !== undefined) {
    list[index] = undefined as any;
  }
  return existing;
}

function setEntryId(parent: RenderedTextTree, index: number, id: number) {
  const list = getEntryList(parent);
  list[index] = id;
}

export function initializeRenderTreeDebug(root: RenderedTextTree) {
  if (!isDevtoolsEnabled()) return;
  ensureDevtoolsHandler();
  nodeIds = new WeakMap();
  entryIds = new WeakMap();
  fileNodes = new Map();
  directoryNodes = new Map();
  nodeProps = new Map();
  rerenderActions = new Map();
  nextId = 1;
  emit({ type: "renderTree:reset" });
  const rootId = getOrCreateNodeId(root as unknown as object);
  emit({
    type: "renderTree:nodeAdded",
    parentId: null,
    node: {
      id: rootId,
      kind: "root",
    },
  });
}

export function registerRenderNodeActions(
  node: RenderedTextTree | PrintHook,
  actions: { rerender: () => void; rerenderAndBreak: () => void },
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

let handlerRegistered = false;
function ensureDevtoolsHandler() {
  if (handlerRegistered || !isDevtoolsEnabled()) return;
  handlerRegistered = true;
  registerDevtoolsMessageHandler((message) => {
    if (
      message.type !== "renderTree:rerender" &&
      message.type !== "renderTree:rerenderAndBreak"
    ) {
      return;
    }
    const id = Number((message as RenderTreeRerenderMessage).id);
    if (!Number.isFinite(id)) return;
    const actions = rerenderActions.get(id);
    if (!actions) return;
    if (message.type === "renderTree:rerender") {
      actions.rerender();
    } else {
      actions.rerenderAndBreak();
    }
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
  emit({
    type: "renderTree:nodeAdded",
    parentId: getOrCreateNodeId(parent as unknown as object),
    node: {
      id,
      kind: "text",
      value,
    },
  });
}

export function recordNodeAdded(
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
  emit({
    type: "renderTree:nodeAdded",
    parentId: getOrCreateNodeId(parent as unknown as object),
    node: {
      id,
      ...info,
    },
  });
}

export function recordSubtreeAdded(
  parentNode: RenderedTextTree | PrintHook,
  subtree: RenderedTextTree,
  info: RenderTreeNodeInfo = { kind: "fragment" },
) {
  if (!isDevtoolsEnabled()) return;
  const parentId = getOrCreateNodeId(parentNode as unknown as object);
  const id = getOrCreateNodeId(subtree as unknown as object);
  emit({
    type: "renderTree:nodeAdded",
    parentId,
    node: {
      id,
      ...info,
    },
  });
}

export function recordNodeReplaced(
  parent: RenderedTextTree,
  index: number,
  node: RenderedTextTree | PrintHook,
  info: RenderTreeNodeInfo,
) {
  if (!isDevtoolsEnabled()) return;
  const parentId = getOrCreateNodeId(parent as unknown as object);
  const oldId = removeEntryId(parent, index);
  if (oldId !== undefined) {
    emitNodeRemoved(parentId, oldId);
  }
  const newId = getOrCreateNodeId(node as unknown as object);
  if (info.propsSerialized !== undefined) {
    nodeProps.set(newId, info.propsSerialized);
  }
  setEntryId(parent, index, newId);
  emit({
    type: "renderTree:nodeAdded",
    parentId,
    node: {
      id: newId,
      ...info,
    },
  });
}

export function recordNodePropsUpdated(
  node: RenderedTextTree | PrintHook,
  propsSerialized: string | undefined,
) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node as unknown as object);
  const previous = nodeProps.get(id);
  if (previous === propsSerialized) return;
  nodeProps.set(id, propsSerialized);
  emit({
    type: "renderTree:nodeUpdated",
    id,
    propsSerialized,
  });
}

export function recordTextReplaced(
  parent: RenderedTextTree,
  index: number,
  value: string,
) {
  if (!isDevtoolsEnabled()) return;
  const parentId = getOrCreateNodeId(parent as unknown as object);
  const oldId = removeEntryId(parent, index);
  if (oldId !== undefined) {
    emitNodeRemoved(parentId, oldId);
  }
  const id = nextId++;
  setEntryId(parent, index, id);
  emit({
    type: "renderTree:nodeAdded",
    parentId,
    node: {
      id,
      kind: "text",
      value,
    },
  });
}

export function clearRenderTreeChildren(parent: RenderedTextTree) {
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

export function recordDirectoryNode(node: RenderedTextTree, path: string) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node as unknown as object);
  if (directoryNodes.has(id)) return;
  directoryNodes.set(id, { path });
  emit({ type: "files:directoryAdded", path });
}

export function recordFileNode(
  node: RenderedTextTree,
  path: string,
  filetype: string,
) {
  if (!isDevtoolsEnabled()) return;
  const id = getOrCreateNodeId(node as unknown as object);
  if (fileNodes.has(id)) return;
  fileNodes.set(id, { path, filetype });
  emit({ type: "files:fileAdded", path, filetype, renderNodeId: id });
}

export function recordFileUpdate(
  path: string,
  filetype: string,
  contents: string,
  unchanged: boolean,
) {
  if (!isDevtoolsEnabled()) return;
  emit({
    type: "files:fileUpdated",
    path,
    filetype,
    contents,
    unchanged,
  });
}
