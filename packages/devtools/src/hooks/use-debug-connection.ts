import type { TreeNode } from "@/components/tree-view";
import {
  applyRenderTreeMessage,
  buildRenderTreeView,
  createRenderTreeState,
  type RenderTreeMessage,
  type RenderTreeViewNode,
} from "@/lib/debug-tree";
import * as devalue from "devalue";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Batching interval for state updates (in milliseconds)
const BATCH_FLUSH_INTERVAL = 100;

// Under heavy load, increase the batch interval
const BATCH_FLUSH_INTERVAL_HEAVY = 250;

// Threshold for considering load as "heavy" (messages per batch interval)
const HEAVY_LOAD_THRESHOLD = 100;

// Maximum number of trace entries to keep
const MAX_TRACE_ENTRIES = 500;

// Maximum number of effect edges to keep
const MAX_EFFECT_EDGES = 10000;

export type DebugConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

// Internal state shape - consolidated into a single object for minimal React updates
// Large data (file contents, effect edges) is kept in refs and accessed via getters
// to avoid expensive copying on every state update
interface DebugConnectionInternalState {
  status: DebugConnectionStatus;
  renderTree: RenderTreeViewNode[];
  fileTree: TreeNode[];
  symbolTree: TreeNode[];
  symbolDetails: Map<string, Record<string, unknown>>;
  scopeDetails: Map<string, Record<string, unknown>>;
  // Version counters - these change to trigger re-renders without copying data
  fileContentsVersion: number;
  fileToRenderNodeVersion: number;
  effectsVersion: number;
  refsVersion: number;
  effectEdgesVersion: number;
  renderErrors: Map<string, RenderErrorDetails>;
  latestRenderErrorId?: string;
  versionLabel?: string;
  cwd?: string;
  diagnostics: Array<{
    id: string;
    message: string;
    severity: string;
    source?: { fileName: string; lineNumber: number; columnNumber: number };
    componentStack?: Array<{
      name: string;
      renderNodeId?: number;
      source?: { fileName: string; lineNumber: number; columnNumber: number };
    }>;
  }>;
  traceEntries: TraceEntry[];
  error?: string;
}

const INITIAL_STATE: DebugConnectionInternalState = {
  status: "disconnected",
  renderTree: [],
  fileTree: [],
  symbolTree: [],
  symbolDetails: new Map(),
  scopeDetails: new Map(),
  fileContentsVersion: 0,
  fileToRenderNodeVersion: 0,
  effectsVersion: 0,
  refsVersion: 0,
  effectEdgesVersion: 0,
  renderErrors: new Map(),
  latestRenderErrorId: undefined,
  versionLabel: undefined,
  cwd: undefined,
  diagnostics: [],
  traceEntries: [],
  error: undefined,
};

export interface DebugConnectionState {
  status: DebugConnectionStatus;
  renderTree: RenderTreeViewNode[];
  fileTree: TreeNode[];
  symbolTree: TreeNode[];
  symbolDetails: Map<string, Record<string, unknown>>;
  scopeDetails: Map<string, Record<string, unknown>>;
  // Getters for large data - these return refs directly, no copying
  fileContents: Map<
    string,
    { path: string; filetype: string; contents: string }
  >;
  fileToRenderNode: Map<string, string>;
  effects: Map<number, EffectDebugInfo>;
  refs: Map<number, RefDebugInfo>;
  effectEdges: EffectEdgeDebugInfo[];
  // Version numbers to track changes (for dependency arrays)
  fileContentsVersion: number;
  fileToRenderNodeVersion: number;
  effectsVersion: number;
  refsVersion: number;
  effectEdgesVersion: number;
  renderErrors: Map<string, RenderErrorDetails>;
  latestRenderErrorId?: string;
  versionLabel?: string;
  cwd?: string;
  formatPath: (path: string) => string;
  diagnostics: Array<{
    id: string;
    message: string;
    severity: string;
    source?: { fileName: string; lineNumber: number; columnNumber: number };
    componentStack?: Array<{
      name: string;
      renderNodeId?: number;
      source?: { fileName: string; lineNumber: number; columnNumber: number };
    }>;
  }>;
  traceEntries: TraceEntry[];
  sendMessage: (message: DebugMessage) => void;
  error?: string;
}

export interface RenderErrorComponentStackEntry {
  name: string;
  props?: Record<string, unknown>;
  renderNodeId?: number;
  source?: {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
  };
}

export interface RenderErrorDetails {
  id: string;
  name: string;
  message: string;
  stack?: string;
  componentStack: RenderErrorComponentStackEntry[];
}

export interface TraceEntry {
  id: string;
  type: string;
  timestamp: number;
  message: DebugMessage;
}

export interface SourceLocation {
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
  stack?: string;
}

export interface EffectDebugInfo {
  id: number;
  name?: string;
  type?: string;
  createdAt?: SourceLocation;
  lastTriggeredByRefId?: number;
  lastTriggeredAt?: SourceLocation;
}

export interface RefDebugInfo {
  id: number;
  kind?: string;
  createdAt?: SourceLocation;
  createdByEffectId?: number;
}

export interface EffectEdgeDebugInfo {
  id: number;
  type: "track" | "trigger" | "triggered-by";
  effectId: number;
  refId?: number;
  targetId?: number;
  targetKind?: "ref" | "target";
  targetLabel?: string;
  targetKey?: string | number;
  location?: SourceLocation;
  count?: number;
}

type DebugMessage = {
  type: string;
  [key: string]: unknown;
};

function resolveDebugUrl() {
  const explicitUrl = import.meta.env.VITE_ALLOY_DEBUG_URL as
    | string
    | undefined;
  if (explicitUrl) return explicitUrl;

  const host =
    (import.meta.env.VITE_ALLOY_DEBUG_HOST as string | undefined) ??
    window.location.hostname ??
    "127.0.0.1";
  const port =
    (import.meta.env.VITE_ALLOY_DEBUG_PORT as string | undefined) ?? "8123";
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  return `${protocol}://${host}:${port}`;
}

export function useDebugConnection(): DebugConnectionState {
  // Single consolidated state object - ONE setState call per flush
  const [state, setState] =
    useState<DebugConnectionInternalState>(INITIAL_STATE);

  const socketRef = useRef<WebSocket | null>(null);
  const traceCounter = useRef(0);
  const effectsRef = useRef(new Map<number, EffectDebugInfo>());
  const refsDebugRef = useRef(new Map<number, RefDebugInfo>());
  const effectEdgesRef = useRef<EffectEdgeDebugInfo[]>([]);
  const treeStateRef = useRef(createRenderTreeState());
  const directoriesRef = useRef(new Set<string>());
  const filesRef = useRef(
    new Map<string, { path: string; filetype: string; contents: string }>(),
  );
  const cwdRef = useRef<string | undefined>(undefined);
  const fileToRenderNodeRef = useRef(new Map<string, string>());
  const scopesRef = useRef(
    new Map<
      number,
      {
        id: number;
        name: string;
        parentId: number | null;
        ownerSymbolId: number | null;
        isMemberScope: boolean;
      }
    >(),
  );
  const symbolsRef = useRef(
    new Map<
      number,
      {
        id: number;
        name: string;
        originalName: string;
        scopeId: number | null;
        ownerSymbolId: number | null;
        isMemberSymbol: boolean;
        isTransient: boolean;
        isAlias: boolean;
        movedToId: number | null;
      }
    >(),
  );

  // Batching: track which state needs to be flushed
  const dirtyFlagsRef = useRef({
    status: false,
    renderTree: false,
    fileTree: false,
    symbolTree: false,
    symbolDetails: false,
    scopeDetails: false,
    fileContents: false,
    fileToRenderNode: false,
    effects: false,
    refs: false,
    effectEdges: false,
    traceEntries: false,
    diagnostics: false,
    renderErrors: false,
    versionLabel: false,
    cwd: false,
    latestRenderErrorId: false,
    error: false,
  });

  // Pending state values to be flushed
  const pendingStateRef = useRef<{
    status?: DebugConnectionStatus;
    error?: string;
    diagnostics?: Array<{
      id: string;
      message: string;
      severity: string;
      source?: { fileName: string; lineNumber: number; columnNumber: number };
      componentStack?: Array<{
        name: string;
        renderNodeId?: number;
        source?: { fileName: string; lineNumber: number; columnNumber: number };
      }>;
    }>;
    renderErrors?: Map<string, RenderErrorDetails>;
    latestRenderErrorId?: string;
    versionLabel?: string;
    cwd?: string;
    traceEntries?: TraceEntry[];
  }>({});

  const batchFlushTimerRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);
  const messageCountRef = useRef(0); // Count messages per batch interval
  const lastFlushTimeRef = useRef(Date.now());

  // Flush all dirty state to React with a SINGLE setState call
  const flushBatchedState = useCallback(() => {
    if (!isMountedRef.current) return;

    const dirty = dirtyFlagsRef.current;
    const pending = pendingStateRef.current;

    // Check if anything is dirty at all
    const hasDirtyState = Object.values(dirty).some(Boolean);
    if (!hasDirtyState) return;

    // Reset message counter
    messageCountRef.current = 0;
    lastFlushTimeRef.current = Date.now();

    // Build the state update object - only include changed properties
    setState((prevState) => {
      const updates: Partial<DebugConnectionInternalState> = {};

      if (dirty.status && pending.status !== undefined) {
        updates.status = pending.status;
      }
      if (dirty.error) {
        updates.error = pending.error;
      }
      if (dirty.renderTree) {
        updates.renderTree = buildRenderTreeView(treeStateRef.current);
      }
      if (dirty.fileTree) {
        updates.fileTree = buildFileTree();
      }
      if (dirty.symbolTree) {
        updates.symbolTree = buildSymbolTree();
      }
      if (dirty.symbolDetails) {
        const next = new Map(prevState.symbolDetails);
        for (const [id, symbol] of symbolsRef.current) {
          next.set(`symbol:${id}`, symbol);
        }
        updates.symbolDetails = next;
      }
      if (dirty.scopeDetails) {
        const next = new Map(prevState.scopeDetails);
        for (const [id, scope] of scopesRef.current) {
          next.set(`scope:${id}`, scope);
        }
        updates.scopeDetails = next;
      }
      // For large data, just bump version counters instead of copying
      if (dirty.fileContents) {
        updates.fileContentsVersion = prevState.fileContentsVersion + 1;
      }
      if (dirty.fileToRenderNode) {
        updates.fileToRenderNodeVersion = prevState.fileToRenderNodeVersion + 1;
      }
      if (dirty.effects) {
        updates.effectsVersion = prevState.effectsVersion + 1;
      }
      if (dirty.refs) {
        updates.refsVersion = prevState.refsVersion + 1;
      }
      if (dirty.effectEdges) {
        updates.effectEdgesVersion = prevState.effectEdgesVersion + 1;
      }
      if (dirty.traceEntries && pending.traceEntries) {
        // Merge pending entries with existing state
        let traceEntries = [...prevState.traceEntries, ...pending.traceEntries];
        if (traceEntries.length > MAX_TRACE_ENTRIES) {
          traceEntries = traceEntries.slice(-MAX_TRACE_ENTRIES);
        }
        updates.traceEntries = traceEntries;
      }
      if (dirty.diagnostics && pending.diagnostics !== undefined) {
        updates.diagnostics = pending.diagnostics;
      }
      if (dirty.renderErrors && pending.renderErrors) {
        // Merge pending errors with existing state
        const merged = new Map(prevState.renderErrors);
        for (const [id, error] of pending.renderErrors) {
          merged.set(id, error);
        }
        updates.renderErrors = merged;
      }
      if (dirty.latestRenderErrorId) {
        updates.latestRenderErrorId = pending.latestRenderErrorId;
      }
      if (dirty.versionLabel && pending.versionLabel !== undefined) {
        updates.versionLabel = pending.versionLabel;
      }
      if (dirty.cwd && pending.cwd !== undefined) {
        updates.cwd = pending.cwd;
      }

      // Return new state object with updates merged
      return { ...prevState, ...updates };
    });

    // Reset dirty flags and clear pending state
    dirtyFlagsRef.current = {
      status: false,
      renderTree: false,
      fileTree: false,
      symbolTree: false,
      symbolDetails: false,
      scopeDetails: false,
      fileContents: false,
      fileToRenderNode: false,
      effects: false,
      refs: false,
      effectEdges: false,
      traceEntries: false,
      diagnostics: false,
      renderErrors: false,
      versionLabel: false,
      cwd: false,
      latestRenderErrorId: false,
      error: false,
    };
    pendingStateRef.current = {};
  }, []);

  // Schedule a batched flush if not already scheduled
  // Uses requestIdleCallback when available for better performance
  const scheduleBatchFlush = useCallback(() => {
    if (batchFlushTimerRef.current !== null) return;

    // Determine interval based on load
    const isHeavyLoad = messageCountRef.current > HEAVY_LOAD_THRESHOLD;
    const interval =
      isHeavyLoad ? BATCH_FLUSH_INTERVAL_HEAVY : BATCH_FLUSH_INTERVAL;

    // Use requestIdleCallback if available for better performance
    // This prevents the flush from blocking user interactions
    if (typeof requestIdleCallback !== "undefined") {
      batchFlushTimerRef.current = requestIdleCallback(
        () => {
          batchFlushTimerRef.current = null;
          flushBatchedState();
        },
        { timeout: interval * 2 }, // Max wait time
      ) as unknown as number;
    } else {
      batchFlushTimerRef.current = window.setTimeout(() => {
        batchFlushTimerRef.current = null;
        flushBatchedState();
      }, interval);
    }
  }, [flushBatchedState]);

  // Mark state as dirty and schedule flush
  const markDirty = useCallback(
    (flags: Partial<typeof dirtyFlagsRef.current>) => {
      messageCountRef.current += 1;
      Object.assign(dirtyFlagsRef.current, flags);
      scheduleBatchFlush();
    },
    [scheduleBatchFlush],
  );

  const normalizeCwd = (value: string) =>
    value.replace(/\\/g, "/").replace(/\/+$/, "");

  const formatPath = useCallback((rawPath: string) => {
    const normalized = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
    const cwdValue = cwdRef.current ? normalizeCwd(cwdRef.current) : undefined;
    if (cwdValue) {
      if (normalized === cwdValue) return ".";
      if (normalized.startsWith(`${cwdValue}/`)) {
        return normalized.slice(cwdValue.length + 1);
      }
    }
    return normalized;
  }, []);

  function buildFileTree() {
    const dirs = Array.from(directoriesRef.current.values());
    const files = Array.from(filesRef.current.values());
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

  function buildSymbolTree() {
    const scopeNodes = new Map<number, TreeNode>();
    const symbolNodes = new Map<number, TreeNode>();
    const memberScopesByOwner = new Map<number, TreeNode[]>();
    const attached = new Set<string>();
    const roots: TreeNode[] = [];

    for (const scope of scopesRef.current.values()) {
      if (scope.ownerSymbolId !== null) {
        const owner = symbolsRef.current.get(scope.ownerSymbolId);
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

    for (const symbol of symbolsRef.current.values()) {
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

    for (const scope of scopesRef.current.values()) {
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

    for (const symbol of symbolsRef.current.values()) {
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

  useEffect(() => {
    isMountedRef.current = true;
    let socket: WebSocket | null = null;
    let cancelled = false;
    let retryTimer: number | undefined;
    let attempts = 0;

    const connect = () => {
      if (cancelled) return;
      // Use batching for status updates
      pendingStateRef.current.status = "connecting";
      pendingStateRef.current.error = undefined;
      pendingStateRef.current.versionLabel = undefined;
      markDirty({ status: true, error: true, versionLabel: true });

      try {
        socket = new WebSocket(resolveDebugUrl());
        socketRef.current = socket;
      } catch (err) {
        pendingStateRef.current.status = "error";
        pendingStateRef.current.error =
          err instanceof Error ? err.message : String(err);
        markDirty({ status: true, error: true });
        return;
      }

      socket.addEventListener("open", () => {
        if (cancelled) return;

        // Reset attempts on successful connection
        attempts = 0;

        // Cancel any pending batch flush from previous connection
        if (batchFlushTimerRef.current !== null) {
          window.clearTimeout(batchFlushTimerRef.current);
          batchFlushTimerRef.current = null;
        }

        // Reset all refs and pending state
        treeStateRef.current = createRenderTreeState();
        directoriesRef.current = new Set();
        filesRef.current = new Map();
        fileToRenderNodeRef.current = new Map();
        scopesRef.current = new Map();
        symbolsRef.current = new Map();
        effectsRef.current = new Map();
        refsDebugRef.current = new Map();
        effectEdgesRef.current = [];
        cwdRef.current = undefined;
        pendingStateRef.current = { status: "connected" };
        dirtyFlagsRef.current = {
          status: true,
          renderTree: true,
          fileTree: true,
          symbolTree: true,
          symbolDetails: true,
          scopeDetails: true,
          fileContents: true,
          fileToRenderNode: true,
          effects: true,
          refs: true,
          effectEdges: true,
          traceEntries: true,
          diagnostics: true,
          renderErrors: true,
          versionLabel: true,
          cwd: true,
          latestRenderErrorId: true,
          error: true,
        };

        // Schedule flush - don't call setState directly
        scheduleBatchFlush();
      });

      socket.addEventListener("close", () => {
        if (cancelled) return;
        // Minimal close handler - just reconnect, skip state updates
        socketRef.current = null;
        const delay = Math.min(2000, 250 * 2 ** attempts);
        attempts += 1;
        retryTimer = window.setTimeout(connect, delay);
      });

      socket.addEventListener("error", () => {
        if (cancelled) return;
        // Use batching instead of direct setState
        pendingStateRef.current.status = "error";
        pendingStateRef.current.error = "Failed to connect to debug server";
        markDirty({ status: true, error: true });
        socketRef.current = null;
      });

      socket.addEventListener("message", (event) => {
        if (cancelled) return;
        let parsed: DebugMessage | null = null;
        try {
          parsed = JSON.parse(String(event.data)) as DebugMessage;
        } catch {
          return;
        }
        if (!parsed) return;

        // Handle batch messages from the server
        const messages: DebugMessage[] =
          parsed.type === "batch" && Array.isArray((parsed as any).messages) ?
            (parsed as any).messages
          : [parsed];

        for (const message of messages) {
          processMessage(message);
        }
      });

      function processMessage(message: DebugMessage) {
        if (
          message.type === "files:fileUpdated" ||
          message.type === "render:error" ||
          message.type === "diagnostics:report"
        ) {
          // Skip noisy file update events in the trace.
        } else {
          // Accumulate trace entries efficiently using push instead of spread
          const sanitizedMessage = sanitizeTraceMessage(message);
          traceCounter.current += 1;
          const uniqueId = `${traceCounter.current}-${Date.now()}`;

          // Get or initialize the pending trace entries array
          if (!pendingStateRef.current.traceEntries) {
            // Copy current state only once per batch - read from state via ref callback
            pendingStateRef.current.traceEntries = [];
          }

          pendingStateRef.current.traceEntries.push({
            id: uniqueId,
            type: sanitizedMessage.type,
            timestamp: Date.now(),
            message: sanitizedMessage,
          });

          // Trim if over limit (only check occasionally for performance)
          if (
            pendingStateRef.current.traceEntries.length >
            MAX_TRACE_ENTRIES + 100
          ) {
            pendingStateRef.current.traceEntries =
              pendingStateRef.current.traceEntries.slice(-MAX_TRACE_ENTRIES);
          }
          markDirty({ traceEntries: true });
        }
        if (
          message.type === "render:reset" ||
          message.type === "render:nodeAdded" ||
          message.type === "render:nodeRemoved" ||
          message.type === "render:nodeUpdated"
        ) {
          applyRenderTreeMessage(
            treeStateRef.current,
            message as RenderTreeMessage,
          );
          markDirty({ renderTree: true });
          return;
        }

        if (message.type === "files:directoryAdded") {
          const path = String((message as any).path ?? "");
          const normalized = path.replace(/^\.\/?/, "").replace(/\\/g, "/");
          if (normalized) {
            directoriesRef.current.add(normalized);
          }
          markDirty({ fileTree: true });
          return;
        }

        if (message.type === "files:directoryRemoved") {
          const path = String((message as any).path ?? "");
          const normalized = path.replace(/^\.\/?/, "").replace(/\\/g, "/");
          if (normalized) {
            directoriesRef.current.delete(normalized);
          }
          markDirty({ fileTree: true });
          return;
        }

        if (message.type === "files:fileAdded") {
          const rawPath = (message as any).path as string;
          const path = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
          const filetype = (message as any).filetype as string;
          const renderNodeId = (message as any).renderNodeId as
            | number
            | undefined;
          if (!filesRef.current.has(path)) {
            filesRef.current.set(path, { path, filetype, contents: "" });
          }
          if (renderNodeId !== undefined) {
            fileToRenderNodeRef.current.set(path, String(renderNodeId));
          }
          markDirty({
            fileTree: true,
            fileContents: true,
            fileToRenderNode: true,
          });
          return;
        }

        if (message.type === "files:fileRemoved") {
          const rawPath = (message as any).path as string;
          const path = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
          filesRef.current.delete(path);
          fileToRenderNodeRef.current.delete(path);
          markDirty({
            fileTree: true,
            fileContents: true,
            fileToRenderNode: true,
          });
          return;
        }

        if (message.type === "files:fileUpdated") {
          const rawPath = (message as any).path as string;
          const path = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
          const filetype = (message as any).filetype as string;
          const contents = (message as any).contents as string;
          filesRef.current.set(path, { path, filetype, contents });
          markDirty({
            fileTree: true,
            fileContents: true,
            fileToRenderNode: true,
          });
          return;
        }

        if (message.type === "debugger:info") {
          const version = (message as any).version as string | undefined;
          const cwdValue = (message as any).cwd as string | undefined;
          if (version) {
            pendingStateRef.current.versionLabel = `Alloy v${version}`;
            markDirty({ versionLabel: true });
          }
          if (cwdValue) {
            cwdRef.current = cwdValue;
            pendingStateRef.current.cwd = cwdValue;
            markDirty({ cwd: true, fileTree: true });
          }
          return;
        }

        if (message.type === "diagnostics:report") {
          const incoming = (message as any).diagnostics as
            | Array<{
                id: string;
                message: string;
                severity: string;
                source?: {
                  fileName: string;
                  lineNumber: number;
                  columnNumber: number;
                };
                componentStack?: Array<{
                  name: string;
                  renderNodeId?: number;
                  source?: {
                    fileName: string;
                    lineNumber: number;
                    columnNumber: number;
                  };
                }>;
              }>
            | undefined;
          pendingStateRef.current.diagnostics = incoming ?? [];
          markDirty({ diagnostics: true });
          return;
        }

        if (message.type === "render:error") {
          const rawId = String((message as any).id ?? Date.now());
          const id = `error:${rawId}`;
          const rawStack = (message as any).componentStack as
            | Array<{
                name?: string;
                propsSerialized?: string;
                renderNodeId?: number;
                source?: {
                  fileName: string;
                  lineNumber: number;
                  columnNumber: number;
                };
              }>
            | undefined;
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
            name: String((message as any).name ?? "Error"),
            message: String((message as any).message ?? ""),
            stack: (message as any).stack as string | undefined,
            componentStack,
          };

          // Initialize or update pending errors map
          if (!pendingStateRef.current.renderErrors) {
            pendingStateRef.current.renderErrors = new Map();
          }
          pendingStateRef.current.renderErrors.set(id, details);
          pendingStateRef.current.latestRenderErrorId = id;
          markDirty({ renderErrors: true, latestRenderErrorId: true });
          return;
        }

        if (message.type === "effect:effectAdded") {
          const effect = (message as any).effect as EffectDebugInfo | undefined;
          if (effect) {
            effectsRef.current.set(effect.id, effect);
            markDirty({ effects: true });
          }
          return;
        }

        if (message.type === "effect:effectUpdated") {
          const effect = (message as any).effect as EffectDebugInfo | undefined;
          if (effect) {
            effectsRef.current.set(effect.id, effect);
            markDirty({ effects: true });
          }
          return;
        }

        if (message.type === "effect:refAdded") {
          const ref = (message as any).ref as RefDebugInfo | undefined;
          if (ref) {
            refsDebugRef.current.set(ref.id, ref);
            markDirty({ refs: true });
          }
          return;
        }

        if (
          message.type === "effect:track" ||
          message.type === "effect:trigger"
        ) {
          const edge = (message as any).edge as EffectEdgeDebugInfo | undefined;
          if (edge) {
            // Use push for O(1) instead of spread for O(n)
            effectEdgesRef.current.push(edge);
            // Trim if over limit
            if (effectEdgesRef.current.length > MAX_EFFECT_EDGES + 1000) {
              effectEdgesRef.current =
                effectEdgesRef.current.slice(-MAX_EFFECT_EDGES);
            }
            markDirty({ effectEdges: true });
          }
          return;
        }

        if (message.type === "effect:edgeUpdated") {
          const edge = (message as any).edge as EffectEdgeDebugInfo | undefined;
          if (edge) {
            // Use push for O(1) instead of spread for O(n)
            effectEdgesRef.current.push(edge);
            markDirty({ effectEdges: true });
          }
          return;
        }

        if (message.type === "scope:create") {
          const scope = (message as any).scope;
          if (scope) {
            scopesRef.current.set(scope.id, scope);
            markDirty({ symbolTree: true, scopeDetails: true });
          }
          return;
        }

        if (message.type === "scope:update") {
          const scope = (message as any).scope;
          if (scope) {
            scopesRef.current.set(scope.id, scope);
            markDirty({ symbolTree: true, scopeDetails: true });
          }
          return;
        }

        if (message.type === "scope:delete") {
          const id = Number((message as any).id);
          if (Number.isFinite(id)) {
            scopesRef.current.delete(id);
            markDirty({ symbolTree: true, scopeDetails: true });
          }
          return;
        }

        if (message.type === "symbol:create") {
          const symbol = (message as any).symbol;
          if (symbol) {
            symbolsRef.current.set(symbol.id, symbol);
            markDirty({ symbolTree: true, symbolDetails: true });
          }
          return;
        }

        if (message.type === "symbol:update") {
          const symbol = (message as any).symbol;
          if (symbol) {
            symbolsRef.current.set(symbol.id, symbol);
            markDirty({ symbolTree: true, symbolDetails: true });
          }
          return;
        }

        if (message.type === "symbol:delete") {
          const id = Number((message as any).id);
          if (Number.isFinite(id)) {
            symbolsRef.current.delete(id);
            markDirty({ symbolTree: true, symbolDetails: true });
          }
        }
      }
    };

    connect();

    return () => {
      cancelled = true;
      isMountedRef.current = false;
      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
      }
      if (batchFlushTimerRef.current !== null) {
        if (typeof cancelIdleCallback !== "undefined") {
          cancelIdleCallback(batchFlushTimerRef.current);
        } else {
          window.clearTimeout(batchFlushTimerRef.current);
        }
        batchFlushTimerRef.current = null;
      }
      socket?.close();
      socketRef.current = null;
    };
  }, [markDirty, scheduleBatchFlush]);

  const sendMessage = useMemo(() => {
    return (message: DebugMessage) => {
      const socket = socketRef.current;
      if (!socket || socket.readyState !== WebSocket.OPEN) return;
      socket.send(JSON.stringify(message));
    };
  }, []);

  // Return memoized state object
  // Large data is provided via refs (no copying), with version numbers for change detection
  return useMemo(
    () => ({
      ...state,
      // Provide refs directly - no copying of large data
      fileContents: filesRef.current,
      fileToRenderNode: fileToRenderNodeRef.current,
      effects: effectsRef.current,
      refs: refsDebugRef.current,
      effectEdges: effectEdgesRef.current,
      formatPath,
      sendMessage,
    }),
    [state, formatPath, sendMessage],
  );
}

function sanitizeTraceMessage(message: DebugMessage): DebugMessage {
  if (message.type === "files:fileUpdated") {
    const { contents: _contents, ...rest } = message as DebugMessage & {
      contents?: string;
    };
    return {
      ...rest,
      contents:
        typeof _contents === "string" ?
          `[${_contents.length} chars]`
        : _contents,
    };
  }
  return message;
}
