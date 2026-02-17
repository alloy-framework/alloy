import type { TreeNode } from "@/components/tree-view";
import {
  applyRenderTreeMessage,
  createRenderTreeState,
  type RenderTreeMessage,
  type RenderTreeState,
} from "@/lib/debug-tree";
import { normalizePath } from "@/lib/utils";
import type {
  DiagnosticRow,
  ServerToClientMessage,
  SourceLocation,
} from "@alloy-js/core/devtools";
import {
  type DebugConnectionStatus,
  type DiagnosticInfo,
  type EffectDebugInfo,
  type EffectEdgeDebugInfo,
  type EffectLifecycleEvent,
  type RefDebugInfo,
  type RenderErrorDetails,
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
  effectLifecycleEvents: EffectLifecycleEvent[];
  cwd: string | undefined;
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
    effectLifecycleEvents: [],
    cwd: undefined,
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
  store.effectLifecycleEvents = [];
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
  sourceMapEnabled?: boolean;
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
  | "effectLifecycle"
  | "diagnostics"
  | "renderErrors"
  | "versionLabel"
  | "cwd"
  | "sourceMapEnabled"
  | "latestRenderErrorId"
  | "error";

// ── processMessage ───────────────────────────────────────────────────────────

type MessageHandler = (
  store: DebugStore,
  pending: PendingState,
  message: any,
) => DirtyFlagKey[];

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
  message: { path: string; filetype?: string; render_node_id?: number },
): DirtyFlagKey[] {
  const path = normalizePath(message.path);
  if (!store.files.has(path)) {
    store.files.set(path, {
      path,
      filetype: message.filetype ?? "",
      contents: "",
    });
  }
  if (message.render_node_id != null) {
    store.fileToRenderNode.set(path, String(message.render_node_id));
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
  message: { path: string; content?: string },
): DirtyFlagKey[] {
  const path = normalizePath(message.path);
  const existing = store.files.get(path);
  store.files.set(path, {
    path,
    filetype: existing?.filetype ?? "",
    contents: message.content ?? "",
  });
  return ["fileTree", "fileContents", "fileToRenderNode"];
}

// ── Info / diagnostics / errors ─────────────────────────────────────────────

/** Try to parse a serialized component stack string into structured entries. */
function tryParseComponentStack(
  raw?: string,
):
  | Array<{ name?: string; renderNodeId?: number; source?: SourceLocation }>
  | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((entry: any) => ({
        name: entry.name ?? entry.component,
        renderNodeId: entry.renderNodeId ?? entry.render_node_id,
        source:
          (entry.source_file ?? entry.source?.fileName) ?
            {
              fileName: entry.source_file ?? entry.source?.fileName,
              lineNumber: entry.source_line ?? entry.source?.lineNumber,
              columnNumber: entry.source_col ?? entry.source?.columnNumber,
            }
          : entry.source,
      }));
    }
  } catch {
    // Not valid JSON, ignore
  }
  return undefined;
}

function handleDebuggerInfo(
  store: DebugStore,
  pending: PendingState,
  message: { version: string; cwd?: string; sourceMapEnabled?: boolean },
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
  if (message.sourceMapEnabled !== undefined) {
    pending.sourceMapEnabled = message.sourceMapEnabled;
    dirty.push("sourceMapEnabled");
  }
  return dirty;
}

function handleDiagnosticsReport(
  _store: DebugStore,
  pending: PendingState,
  message: { diagnostics?: DiagnosticRow[] },
): DirtyFlagKey[] {
  pending.diagnostics = (message.diagnostics ?? []).map(
    (row, i): DiagnosticInfo => ({
      id: `diag-${Date.now()}-${i}`,
      message: row.message,
      severity: row.severity ?? "info",
      source:
        row.source_file ?
          {
            fileName: row.source_file,
            lineNumber: row.source_line,
            columnNumber: row.source_col,
          }
        : undefined,
      componentStack:
        row.component_stack ?
          tryParseComponentStack(row.component_stack)
        : undefined,
    }),
  );
  return ["diagnostics"];
}

function handleRenderError(
  _store: DebugStore,
  pending: PendingState,
  message: {
    seq: number;
    name?: string;
    message?: string;
    stack?: string;
    component_stack?: string;
  },
): DirtyFlagKey[] {
  const rawId = String(message.seq ?? Date.now());
  const id = `error:${rawId}`;
  const componentStack = tryParseComponentStack(message.component_stack) ?? [];

  const details: RenderErrorDetails = {
    id,
    name: String(message.name ?? "Error"),
    message: String(message.message ?? ""),
    stack: message.stack,
    componentStack: componentStack.map((entry) => ({
      name: entry.name ?? "(anonymous)",
      props: undefined,
      renderNodeId: entry.renderNodeId,
      source: entry.source,
    })),
  };

  if (!pending.renderErrors) {
    pending.renderErrors = new Map();
  }
  pending.renderErrors.set(id, details);
  pending.latestRenderErrorId = id;
  return ["renderErrors", "latestRenderErrorId"];
}

// ── Effects / refs ──────────────────────────────────────────────────────────

/**
 * Extract the npm package name from a source file path.
 * Looks for `/node_modules/(@scope/pkg|pkg)/` and returns the package name.
 */
function extractPackageFromPath(filePath: string | undefined): string | undefined {
  if (!filePath) return undefined;
  // Match scoped packages: node_modules/@scope/name
  const scoped = /[/\\]node_modules[/\\](@[^/\\]+[/\\][^/\\]+)/.exec(filePath);
  if (scoped) return scoped[1].replace(/\\/g, "/");
  // Match unscoped packages: node_modules/name
  const unscoped = /[/\\]node_modules[/\\]([^@/\\][^/\\]*)/.exec(filePath);
  if (unscoped) return unscoped[1];
  return undefined;
}

function handleEffectAddedOrUpdated(
  store: DebugStore,
  _pending: PendingState,
  message: any,
): DirtyFlagKey[] {
  const id = message.id as number | undefined;
  if (id === undefined) return [];
  const info: EffectDebugInfo = {
    id,
    name: message.name,
    type: message.effect_type,
    createdAt:
      message.source_file ?
        {
          fileName: message.source_file,
          lineNumber: message.source_line,
          columnNumber: message.source_col,
        }
      : undefined,
    contextId: message.context_id ?? undefined,
    ownerContextId: message.owner_context_id,
    component: message.component,
    sourcePackage: message.source_package ?? extractPackageFromPath(message.source_file),
  };
  const existing = store.effects.get(id);
  if (existing) {
    // Preserve trigger info from edges
    info.lastTriggeredAt = existing.lastTriggeredAt;
    info.lastTriggeredByRefId = existing.lastTriggeredByRefId;
  }
  store.effects.set(id, info);
  return ["effects"];
}

function handleRefAdded(
  store: DebugStore,
  _pending: PendingState,
  message: any,
): DirtyFlagKey[] {
  const id = message.id as number | undefined;
  if (id === undefined) return [];
  const info: RefDebugInfo = {
    id,
    kind: message.kind,
    label: message.label,
    createdAt:
      message.source_file ?
        {
          fileName: message.source_file,
          lineNumber: message.source_line,
          columnNumber: message.source_col,
        }
      : undefined,
    createdByEffectId: message.created_by_effect_id,
    isInfrastructure: Boolean(message.is_infrastructure),
    isApproxLocation: Boolean(message.is_approx_location),
    sourcePackage: message.source_package ?? extractPackageFromPath(message.source_file),
  };
  store.refs.set(id, info);
  return ["refs"];
}

function handleEdge(
  store: DebugStore,
  _pending: PendingState,
  message: any,
): DirtyFlagKey[] {
  const effectId = message.effect_id as number | undefined;
  if (effectId === undefined) return [];
  const msgType = message.type as string;
  const edgeType = msgType === "edge:track" ? "track" : "trigger";
  const edge: EffectEdgeDebugInfo = {
    id: message.seq ?? Date.now(),
    type: edgeType,
    effectId,
    causedBy: message.caused_by ?? undefined,
    refId: message.ref_id,
    targetId: message.target_id,
    targetKind: message.target_kind,
    targetLabel: message.target_label,
    targetKey: message.target_key,
  };
  store.effectEdges.push(edge);
  // Update last-triggered info on the effect for trigger edges
  if (edgeType === "trigger") {
    const effect = store.effects.get(effectId);
    if (effect) {
      effect.lastTriggeredByRefId = message.ref_id;
    }
  }
  return ["effectEdges"];
}

function handleEffectLifecycle(
  store: DebugStore,
  _pending: PendingState,
  message: any,
): DirtyFlagKey[] {
  const effectId = message.effect_id as number | undefined;
  if (effectId === undefined) return [];
  const event: EffectLifecycleEvent = {
    id: message.seq ?? Date.now(),
    effectId,
    event: message.event,
    triggerRefId: message.trigger_ref_id ?? undefined,
  };
  store.effectLifecycleEvents.push(event);
  return ["effectLifecycle"];
}

// ── Scopes / symbols ────────────────────────────────────────────────────────

function handleScopeCreateOrUpdate(
  store: DebugStore,
  _pending: PendingState,
  message: any,
): DirtyFlagKey[] {
  const id = message.id as number | undefined;
  if (id === undefined) return [];
  const scope: ScopeRecord = {
    id,
    name: message.name ?? "",
    parentId: message.parent_id ?? null,
    ownerSymbolId: message.owner_symbol_id ?? null,
    isMemberScope: !!message.is_member_scope,
    renderNodeId: message.render_node_id,
  };
  store.scopes.set(id, scope);
  return ["symbolTree", "scopeDetails"];
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
  const id = message.id as number | undefined;
  if (id === undefined) return [];
  const symbol: SymbolRecord = {
    id,
    name: message.name ?? "",
    originalName: message.original_name ?? "",
    scopeId: message.scope_id ?? null,
    ownerSymbolId: message.owner_symbol_id ?? null,
    isMemberSymbol: !!message.is_member,
    isTransient: !!message.is_transient,
    isAlias: !!message.is_alias,
    movedToId: message.moved_to_id ?? null,
    renderNodeId: message.render_node_id,
  };
  store.symbols.set(id, symbol);
  return ["symbolTree", "symbolDetails"];
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
  "render:node_added": handleRenderTreeMessage,
  "render:node_removed": handleRenderTreeMessage,
  "render:node_updated": handleRenderTreeMessage,
  "directory:added": (s, p, m) => handleDirectoryMessage(s, p, m, "add"),
  "directory:removed": (s, p, m) => handleDirectoryMessage(s, p, m, "remove"),
  "file:added": handleFileAdded,
  "file:removed": handleFileRemoved,
  "file:updated": handleFileUpdated,
  "debugger:info": handleDebuggerInfo,
  "diagnostics:report": handleDiagnosticsReport,
  "render:error": handleRenderError,
  "effect:added": handleEffectAddedOrUpdated,
  "effect:updated": handleEffectAddedOrUpdated,
  "ref:added": handleRefAdded,
  "edge:track": handleEdge,
  "edge:trigger": handleEdge,
  "effect:lifecycle": handleEffectLifecycle,
  "scope:added": handleScopeCreateOrUpdate,
  "scope:updated": handleScopeCreateOrUpdate,
  "scope:removed": handleScopeDelete,
  "symbol:added": handleSymbolCreateOrUpdate,
  "symbol:updated": handleSymbolCreateOrUpdate,
  "symbol:removed": handleSymbolDelete,
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
