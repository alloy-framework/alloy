import type { TreeNode } from "@/components/tree-view";
import {
  applyRenderTreeMessage,
  createRenderTreeState,
  type RenderTreeMessage,
  type RenderTreeState,
} from "@/lib/debug-tree";
import type {
  DiagnosticInfo,
  ServerToClientMessage,
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

  // ── Trace accumulation (skip noisy events) ──────────────────────────────
  if (
    message.type !== "files:fileUpdated" &&
    message.type !== "render:error" &&
    message.type !== "diagnostics:report"
  ) {
    const sanitized = sanitizeTraceMessage(message);
    store.traceCounter += 1;
    const uniqueId = `${store.traceCounter}-${Date.now()}`;

    if (!pending.traceEntries) {
      pending.traceEntries = [];
    }
    pending.traceEntries.push({
      id: uniqueId,
      type: sanitized.type,
      timestamp: Date.now(),
      message: sanitized,
    });

    if (pending.traceEntries.length > MAX_TRACE_ENTRIES + 100) {
      pending.traceEntries = pending.traceEntries.slice(-MAX_TRACE_ENTRIES);
    }
    dirty.push("traceEntries");
  }

  // ── Render-tree messages ────────────────────────────────────────────────
  if (
    message.type === "render:reset" ||
    message.type === "render:nodeAdded" ||
    message.type === "render:nodeRemoved" ||
    message.type === "render:nodeUpdated"
  ) {
    applyRenderTreeMessage(store.treeState, message as RenderTreeMessage);
    dirty.push("renderTree");
    return dirty;
  }

  // ── File / directory messages ───────────────────────────────────────────
  if (message.type === "files:directoryAdded") {
    const path = String(message.path ?? "");
    const normalized = path.replace(/^\.\/?/, "").replace(/\\/g, "/");
    if (normalized) {
      store.directories.add(normalized);
    }
    dirty.push("fileTree");
    return dirty;
  }

  if (message.type === "files:directoryRemoved") {
    const path = String(message.path ?? "");
    const normalized = path.replace(/^\.\/?/, "").replace(/\\/g, "/");
    if (normalized) {
      store.directories.delete(normalized);
    }
    dirty.push("fileTree");
    return dirty;
  }

  if (message.type === "files:fileAdded") {
    const rawPath = message.path;
    const path = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
    const filetype = message.filetype;
    const renderNodeId = message.renderNodeId;
    if (!store.files.has(path)) {
      store.files.set(path, { path, filetype, contents: "" });
    }
    if (renderNodeId !== undefined) {
      store.fileToRenderNode.set(path, String(renderNodeId));
    }
    dirty.push("fileTree", "fileContents", "fileToRenderNode");
    return dirty;
  }

  if (message.type === "files:fileRemoved") {
    const rawPath = message.path;
    const path = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
    store.files.delete(path);
    store.fileToRenderNode.delete(path);
    dirty.push("fileTree", "fileContents", "fileToRenderNode");
    return dirty;
  }

  if (message.type === "files:fileUpdated") {
    const rawPath = message.path;
    const path = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
    const filetype = message.filetype;
    const contents = message.contents;
    store.files.set(path, { path, filetype, contents });
    dirty.push("fileTree", "fileContents", "fileToRenderNode");
    return dirty;
  }

  // ── Debugger info ───────────────────────────────────────────────────────
  if (message.type === "debugger:info") {
    const version = message.version;
    const cwdValue = message.cwd;
    if (version) {
      pending.versionLabel = `Alloy v${version}`;
      dirty.push("versionLabel");
    }
    if (cwdValue) {
      store.cwd = cwdValue;
      pending.cwd = cwdValue;
      dirty.push("cwd", "fileTree");
    }
    return dirty;
  }

  // ── Diagnostics ─────────────────────────────────────────────────────────
  if (message.type === "diagnostics:report") {
    pending.diagnostics = message.diagnostics ?? [];
    dirty.push("diagnostics");
    return dirty;
  }

  // ── Render errors ───────────────────────────────────────────────────────
  if (message.type === "render:error") {
    const rawId = String(message.id ?? Date.now());
    const id = `error:${rawId}`;
    const rawStack = message.componentStack;
    const componentStack =
      Array.isArray(rawStack) ?
        rawStack.map((entry) => {
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
            source: entry.source,
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
    dirty.push("renderErrors", "latestRenderErrorId");
    return dirty;
  }

  // ── Effects & refs ──────────────────────────────────────────────────────
  if (
    message.type === "effect:effectAdded" ||
    message.type === "effect:effectUpdated"
  ) {
    const effect = message.effect;
    if (effect) {
      store.effects.set(effect.id, effect);
      dirty.push("effects");
    }
    return dirty;
  }

  if (message.type === "effect:refAdded") {
    const ref = message.ref;
    if (ref) {
      store.refs.set(ref.id, ref);
      dirty.push("refs");
    }
    return dirty;
  }

  if (
    message.type === "effect:track" ||
    message.type === "effect:trigger" ||
    message.type === "effect:edgeUpdated"
  ) {
    const edge = message.edge;
    if (edge) {
      store.effectEdges.push(edge);
      if (store.effectEdges.length > MAX_EFFECT_EDGES + 1000) {
        store.effectEdges = store.effectEdges.slice(-MAX_EFFECT_EDGES);
      }
      dirty.push("effectEdges");
    }
    return dirty;
  }

  // ── Scopes ──────────────────────────────────────────────────────────────
  if (message.type === "scope:create" || message.type === "scope:update") {
    const scope = message.scope;
    if (scope) {
      store.scopes.set(scope.id, scope);
      dirty.push("symbolTree", "scopeDetails");
    }
    return dirty;
  }

  if (message.type === "scope:delete") {
    const id = message.id;
    if (Number.isFinite(id)) {
      store.scopes.delete(id);
      dirty.push("symbolTree", "scopeDetails");
    }
    return dirty;
  }

  // ── Symbols ─────────────────────────────────────────────────────────────
  if (message.type === "symbol:create" || message.type === "symbol:update") {
    const symbol = message.symbol;
    if (symbol) {
      store.symbols.set(symbol.id, symbol);
      dirty.push("symbolTree", "symbolDetails");
    }
    return dirty;
  }

  if (message.type === "symbol:delete") {
    const id = message.id;
    if (Number.isFinite(id)) {
      store.symbols.delete(id);
      dirty.push("symbolTree", "symbolDetails");
    }
    return dirty;
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
