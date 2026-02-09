import type { TreeNode } from "@/components/tree-view";
import {
  applyRenderTreeMessage,
  createRenderTreeState,
  type RenderTreeMessage,
  type RenderTreeState,
} from "@/lib/debug-tree";
import { normalizePath } from "@/lib/utils";
import type {
  DiagnosticInfo,
  ServerToClientMessage,
  SourceLocation,
} from "@alloy-js/core/devtools";
import * as devalue from "devalue";
import {
  MAX_EFFECT_EDGES,
  MAX_TRACE_ENTRIES,
  type DebugConnectionStatus,
  type EffectDebugInfo,
  type EffectEdgeDebugInfo,
  type RefDebugInfo,
  type RenderErrorDetails,
  type TraceEntry,
} from "./debug-connection-types";

// ── Scope / symbol shapes stored in refs ─────────────────────────────────────

export interface ScopeRecord {
  id: number;
  name: string;
  parentId: number | null;
  ownerSymbolId: number | null;
  isMemberScope: boolean;
  renderNodeId?: number | null;
}

export interface SymbolRecord {
  id: number;
  name: string;
  originalName: string;
  scopeId: number | null;
  ownerSymbolId: number | null;
  isMemberSymbol: boolean;
  isTransient: boolean;
  isAlias: boolean;
  movedToId: number | null;
  renderNodeId?: number | null;
}

// ── Mutable data store ───────────────────────────────────────────────────────

/**
 * Holds all the data that accumulates from WebSocket messages.
 * This is **not** React state — it lives in refs so that message processing
 * doesn't trigger renders. The hook flushes snapshots to React on a timer.
 */
export interface DebugStore {
  treeState: RenderTreeState;
  directories: Set<string>;
  files: Map<string, { path: string; filetype: string; contents: string }>;
  fileToRenderNode: Map<string, string>;
  scopes: Map<number, ScopeRecord>;
  symbols: Map<number, SymbolRecord>;
  effects: Map<number, EffectDebugInfo>;
  refs: Map<number, RefDebugInfo>;
  effectEdges: EffectEdgeDebugInfo[];
  cwd: string | undefined;
  traceCounter: number;
}

export function createDebugStore(): DebugStore {
  return {
    treeState: createRenderTreeState(),
    directories: new Set(),
    files: new Map(),
    fileToRenderNode: new Map(),
    scopes: new Map(),
    symbols: new Map(),
    effects: new Map(),
    refs: new Map(),
    effectEdges: [],
    cwd: undefined,
    traceCounter: 0,
  };
}

/** Reset the store to a clean state (e.g. on reconnect). */
export function resetDebugStore(store: DebugStore): void {
  store.treeState = createRenderTreeState();
  store.directories = new Set();
  store.files = new Map();
  store.fileToRenderNode = new Map();
  store.scopes = new Map();
  store.symbols = new Map();
  store.effects = new Map();
  store.refs = new Map();
  store.effectEdges = [];
  store.cwd = undefined;
}

// ── Pending (batched) state ──────────────────────────────────────────────────

export interface PendingState {
  status?: DebugConnectionStatus;
  error?: string;
  diagnostics?: DiagnosticInfo[];
  renderErrors?: Map<string, RenderErrorDetails>;
  latestRenderErrorId?: string;
  versionLabel?: string;
  cwd?: string;
  traceEntries?: TraceEntry[];
}

// ── Dirty-flag helpers ───────────────────────────────────────────────────────

export type DirtyFlagKey =
  | "status"
  | "renderTree"
  | "fileTree"
  | "symbolTree"
  | "symbolDetails"
  | "scopeDetails"
  | "fileContents"
  | "fileToRenderNode"
  | "effects"
  | "refs"
  | "effectEdges"
  | "traceEntries"
  | "diagnostics"
  | "renderErrors"
  | "versionLabel"
  | "cwd"
  | "latestRenderErrorId"
  | "error";

// ── processMessage ───────────────────────────────────────────────────────────

type MessageHandler = (
  store: DebugStore,
  pending: PendingState,
  message: any,
) => DirtyFlagKey[];

const TRACE_SKIP_TYPES = new Set([
  "files:fileUpdated",
  "render:error",
  "diagnostics:report",
]);

// ── Render-tree messages ────────────────────────────────────────────────────

function handleRenderTreeMessage(
  store: DebugStore,
  _pending: PendingState,
  message: RenderTreeMessage,
): DirtyFlagKey[] {
  applyRenderTreeMessage(store.treeState, message);
  return ["renderTree"];
}

// ── File / directory messages ───────────────────────────────────────────────

function handleDirectoryMessage(
  store: DebugStore,
  _pending: PendingState,
  message: { path: string },
  action: "add" | "remove",
): DirtyFlagKey[] {
  const normalized = normalizePath(message.path);
  if (normalized) {
    if (action === "add") store.directories.add(normalized);
    else store.directories.delete(normalized);
  }
  return ["fileTree"];
}

function handleFileAdded(
  store: DebugStore,
  _pending: PendingState,
  message: { path: string; filetype: string; renderNodeId?: number },
): DirtyFlagKey[] {
  const path = normalizePath(message.path);
  if (!store.files.has(path)) {
    store.files.set(path, { path, filetype: message.filetype, contents: "" });
  }
  if (message.renderNodeId !== undefined) {
    store.fileToRenderNode.set(path, String(message.renderNodeId));
  }
  return ["fileTree", "fileContents", "fileToRenderNode"];
}

function handleFileRemoved(
  store: DebugStore,
  _pending: PendingState,
  message: { path: string },
): DirtyFlagKey[] {
  const path = normalizePath(message.path);
  store.files.delete(path);
  store.fileToRenderNode.delete(path);
  return ["fileTree", "fileContents", "fileToRenderNode"];
}

function handleFileUpdated(
  store: DebugStore,
  _pending: PendingState,
  message: { path: string; filetype: string; contents: string },
): DirtyFlagKey[] {
  const path = normalizePath(message.path);
  store.files.set(path, {
    path,
    filetype: message.filetype,
    contents: message.contents,
  });
  return ["fileTree", "fileContents", "fileToRenderNode"];
}

// ── Info / diagnostics / errors ─────────────────────────────────────────────

function handleDebuggerInfo(
  store: DebugStore,
  pending: PendingState,
  message: { version: string; cwd?: string },
): DirtyFlagKey[] {
  const dirty: DirtyFlagKey[] = [];
  if (message.version) {
    pending.versionLabel = `Alloy v${message.version}`;
    dirty.push("versionLabel");
  }
  if (message.cwd) {
    store.cwd = message.cwd;
    pending.cwd = message.cwd;
    dirty.push("cwd", "fileTree");
  }
  return dirty;
}

function handleDiagnosticsReport(
  _store: DebugStore,
  pending: PendingState,
  message: { diagnostics?: DiagnosticInfo[] },
): DirtyFlagKey[] {
  pending.diagnostics = message.diagnostics ?? [];
  return ["diagnostics"];
}

function handleRenderError(
  _store: DebugStore,
  pending: PendingState,
  message: {
    id: number;
    name?: string;
    message?: string;
    stack?: string;
    componentStack: Array<{
      name?: string;
      propsSerialized?: string;
      renderNodeId?: number;
      source?: unknown;
    }>;
  },
): DirtyFlagKey[] {
  const rawId = String(message.id ?? Date.now());
  const id = `error:${rawId}`;
  const componentStack =
    Array.isArray(message.componentStack) ?
      message.componentStack.map((entry) => {
        let props: Record<string, unknown> | undefined;
        if (entry.propsSerialized) {
          try {
            props = devalue.parse(entry.propsSerialized) as Record<
              string,
              unknown
            >;
          } catch {
            props = undefined;
          }
        }
        return {
          name: entry.name ?? "(anonymous)",
          props,
          renderNodeId: entry.renderNodeId,
          source: entry.source as SourceLocation | undefined,
        };
      })
    : [];

  const details: RenderErrorDetails = {
    id,
    name: String(message.name ?? "Error"),
    message: String(message.message ?? ""),
    stack: message.stack,
    componentStack,
  };

  if (!pending.renderErrors) {
    pending.renderErrors = new Map();
  }
  pending.renderErrors.set(id, details);
  pending.latestRenderErrorId = id;
  return ["renderErrors", "latestRenderErrorId"];
}

// ── Effects / refs ──────────────────────────────────────────────────────────

function handleEffectAddedOrUpdated(
  store: DebugStore,
  _pending: PendingState,
  message: { effect: { id: number } },
): DirtyFlagKey[] {
  if (message.effect) {
    store.effects.set(message.effect.id, message.effect);
    return ["effects"];
  }
  return [];
}

function handleRefAdded(
  store: DebugStore,
  _pending: PendingState,
  message: { ref: { id: number } },
): DirtyFlagKey[] {
  if (message.ref) {
    store.refs.set(message.ref.id, message.ref);
    return ["refs"];
  }
  return [];
}

function handleEdge(
  store: DebugStore,
  _pending: PendingState,
  message: { edge: any },
): DirtyFlagKey[] {
  if (message.edge) {
    store.effectEdges.push(message.edge);
    if (store.effectEdges.length > MAX_EFFECT_EDGES + 1000) {
      store.effectEdges = store.effectEdges.slice(-MAX_EFFECT_EDGES);
    }
    return ["effectEdges"];
  }
  return [];
}

// ── Scopes / symbols ────────────────────────────────────────────────────────

function handleScopeCreateOrUpdate(
  store: DebugStore,
  _pending: PendingState,
  message: any,
): DirtyFlagKey[] {
  const scope = message.scope;
  if (scope) {
    store.scopes.set(scope.id, scope);
    return ["symbolTree", "scopeDetails"];
  }
  return [];
}

function handleScopeDelete(
  store: DebugStore,
  _pending: PendingState,
  message: any,
): DirtyFlagKey[] {
  const id = message.id;
  if (Number.isFinite(id)) {
    store.scopes.delete(id);
    return ["symbolTree", "scopeDetails"];
  }
  return [];
}

function handleSymbolCreateOrUpdate(
  store: DebugStore,
  _pending: PendingState,
  message: any,
): DirtyFlagKey[] {
  const symbol = message.symbol;
  if (symbol) {
    store.symbols.set(symbol.id, symbol);
    return ["symbolTree", "symbolDetails"];
  }
  return [];
}

function handleSymbolDelete(
  store: DebugStore,
  _pending: PendingState,
  message: any,
): DirtyFlagKey[] {
  const id = message.id;
  if (Number.isFinite(id)) {
    store.symbols.delete(id);
    return ["symbolTree", "symbolDetails"];
  }
  return [];
}

// ── Dispatch table ──────────────────────────────────────────────────────────

const messageHandlers: Record<string, MessageHandler> = {
  "render:reset": handleRenderTreeMessage,
  "render:nodeAdded": handleRenderTreeMessage,
  "render:nodeRemoved": handleRenderTreeMessage,
  "render:nodeUpdated": handleRenderTreeMessage,
  "files:directoryAdded": (s, p, m) => handleDirectoryMessage(s, p, m, "add"),
  "files:directoryRemoved": (s, p, m) =>
    handleDirectoryMessage(s, p, m, "remove"),
  "files:fileAdded": handleFileAdded,
  "files:fileRemoved": handleFileRemoved,
  "files:fileUpdated": handleFileUpdated,
  "debugger:info": handleDebuggerInfo,
  "diagnostics:report": handleDiagnosticsReport,
  "render:error": handleRenderError,
  "effect:effectAdded": handleEffectAddedOrUpdated,
  "effect:effectUpdated": handleEffectAddedOrUpdated,
  "effect:refAdded": handleRefAdded,
  "effect:track": handleEdge,
  "effect:trigger": handleEdge,
  "effect:edgeUpdated": handleEdge,
  "scope:create": handleScopeCreateOrUpdate,
  "scope:update": handleScopeCreateOrUpdate,
  "scope:delete": handleScopeDelete,
  "symbol:create": handleSymbolCreateOrUpdate,
  "symbol:update": handleSymbolCreateOrUpdate,
  "symbol:delete": handleSymbolDelete,
};

/**
 * Process a single server-to-client message, mutating the `store` and
 * `pending` in place. Returns the dirty-flag keys that should be marked.
 */
export function processMessage(
  store: DebugStore,
  pending: PendingState,
  message: ServerToClientMessage,
): DirtyFlagKey[] {
  const dirty: DirtyFlagKey[] = [];

  // Accumulate trace entries for all messages except noisy ones
  if (!TRACE_SKIP_TYPES.has(message.type)) {
    const sanitized = sanitizeTraceMessage(message);
    store.traceCounter += 1;

    if (!pending.traceEntries) {
      pending.traceEntries = [];
    }
    pending.traceEntries.push({
      id: `${store.traceCounter}-${Date.now()}`,
      type: sanitized.type,
      timestamp: Date.now(),
      message: sanitized,
    });

    if (pending.traceEntries.length > MAX_TRACE_ENTRIES + 100) {
      pending.traceEntries = pending.traceEntries.slice(-MAX_TRACE_ENTRIES);
    }
    dirty.push("traceEntries");
  }

  const handler = messageHandlers[message.type];
  if (handler) {
    dirty.push(...handler(store, pending, message));
  }

  return dirty;
}

// ── Tree builders ────────────────────────────────────────────────────────────

export function buildFileTree(
  store: DebugStore,
  formatPath: (p: string) => string,
): TreeNode[] {
  const dirs = Array.from(store.directories.values());
  const files = Array.from(store.files.values());
  const rootMap = new Map<
    string,
    TreeNode & { childrenMap?: Map<string, any> }
  >();

  function ensureFolder(parts: string[]) {
    let currentMap = rootMap;
    let currentPath = "";
    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      let node = currentMap.get(currentPath);
      if (!node) {
        node = {
          id: currentPath,
          label: part,
          icon: "folder",
          children: [],
          childrenMap: new Map(),
        } as TreeNode & { childrenMap?: Map<string, any> };
        currentMap.set(currentPath, node);
      }
      if (!node.childrenMap) {
        node.childrenMap = new Map();
      }
      currentMap = node.childrenMap;
    }
  }

  for (const dir of dirs) {
    const displayPath = formatPath(dir);
    if (!displayPath || displayPath === ".") continue;
    const parts = displayPath.split("/").filter(Boolean);
    ensureFolder(parts);
  }

  for (const file of files) {
    const displayPath = formatPath(file.path);
    const parts = displayPath.split("/").filter(Boolean);
    const fileName = parts.pop();
    if (!fileName) continue;
    if (parts.length) {
      ensureFolder(parts);
    }
    let currentMap = rootMap;
    let currentPath = "";
    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const node = currentMap.get(currentPath);
      if (node?.childrenMap) {
        currentMap = node.childrenMap;
      }
    }
    const fileId = file.path;
    currentMap.set(fileId, {
      id: fileId,
      label: fileName,
      icon: "file",
    });
  }

  function materialize(map: Map<string, any>): TreeNode[] {
    return Array.from(map.values()).map((node) => {
      if (node.childrenMap) {
        const children = materialize(node.childrenMap);
        return {
          id: node.id,
          label: node.label,
          icon: "folder",
          children,
        } as TreeNode;
      }
      return node as TreeNode;
    });
  }

  return materialize(rootMap);
}

export function buildSymbolTree(store: DebugStore): TreeNode[] {
  const scopeNodes = new Map<number, TreeNode>();
  const symbolNodes = new Map<number, TreeNode>();
  const memberScopesByOwner = new Map<number, TreeNode[]>();
  const attached = new Set<string>();
  const roots: TreeNode[] = [];

  for (const scope of store.scopes.values()) {
    if (scope.ownerSymbolId !== null) {
      const owner = store.symbols.get(scope.ownerSymbolId);
      if (owner?.isTransient) {
        continue;
      }
    }
    const node: TreeNode = {
      id: `scope:${scope.id}`,
      label: scope.name,
      icon: "scope",
      children: [],
    };
    scopeNodes.set(scope.id, node);
    if (scope.ownerSymbolId !== null) {
      const list = memberScopesByOwner.get(scope.ownerSymbolId) ?? [];
      list.push(node);
      memberScopesByOwner.set(scope.ownerSymbolId, list);
    }
  }

  for (const symbol of store.symbols.values()) {
    if (symbol.isTransient) continue;
    symbolNodes.set(symbol.id, {
      id: `symbol:${symbol.id}`,
      label: symbol.name,
      icon: "symbol",
      children: [],
    });
  }

  const addChild = (parent: TreeNode | undefined, child: TreeNode) => {
    if (!parent) {
      roots.push(child);
      attached.add(child.id);
      return;
    }
    parent.children ??= [];
    parent.children.push(child);
    attached.add(child.id);
  };

  for (const scope of store.scopes.values()) {
    const node = scopeNodes.get(scope.id);
    if (!node) continue;
    if (scope.ownerSymbolId !== null) {
      const owner = symbolNodes.get(scope.ownerSymbolId);
      addChild(owner, node);
      continue;
    }
    if (scope.parentId !== null) {
      const parent = scopeNodes.get(scope.parentId);
      addChild(parent, node);
      continue;
    }
    roots.push(node);
    attached.add(node.id);
  }

  for (const symbol of store.symbols.values()) {
    if (symbol.isTransient) continue;
    const node = symbolNodes.get(symbol.id);
    if (!node) continue;
    if (symbol.isMemberSymbol && symbol.ownerSymbolId !== null) {
      const memberScopes = memberScopesByOwner.get(symbol.ownerSymbolId);
      if (memberScopes && memberScopes.length > 0) {
        for (const scopeNode of memberScopes) {
          addChild(scopeNode, node);
        }
        continue;
      }
    }
    if (symbol.ownerSymbolId !== null) {
      const owner = symbolNodes.get(symbol.ownerSymbolId);
      addChild(owner, node);
      continue;
    }
    if (symbol.scopeId !== null) {
      const scope = scopeNodes.get(symbol.scopeId);
      addChild(scope, node);
      continue;
    }
    roots.push(node);
    attached.add(node.id);
  }

  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => a.label.localeCompare(b.label));
    for (const node of nodes) {
      if (node.children) sortNodes(node.children);
    }
  };
  sortNodes(roots);
  return roots;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function sanitizeTraceMessage(
  message: ServerToClientMessage,
): ServerToClientMessage {
  if (message.type === "files:fileUpdated") {
    return {
      ...message,
      contents:
        typeof message.contents === "string" ?
          `[${message.contents.length} chars]`
        : message.contents,
    };
  }
  return message;
}
