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

export type DebugConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export interface DebugConnectionState {
  status: DebugConnectionStatus;
  renderTree: RenderTreeViewNode[];
  fileTree: TreeNode[];
  symbolTree: TreeNode[];
  symbolDetails: Map<string, Record<string, unknown>>;
  scopeDetails: Map<string, Record<string, unknown>>;
  fileContents: Map<
    string,
    { path: string; filetype: string; contents: string }
  >;
  fileToRenderNode: Map<string, string>;
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
  effects: Map<number, EffectDebugInfo>;
  refs: Map<number, RefDebugInfo>;
  effectEdges: EffectEdgeDebugInfo[];
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
  const [status, setStatus] = useState<DebugConnectionStatus>("disconnected");
  const [renderTree, setRenderTree] = useState<RenderTreeViewNode[]>([]);
  const [fileTree, setFileTree] = useState<TreeNode[]>([]);
  const [symbolTree, setSymbolTree] = useState<TreeNode[]>([]);
  const [symbolDetails, setSymbolDetails] = useState<
    Map<string, Record<string, unknown>>
  >(new Map());
  const [scopeDetails, setScopeDetails] = useState<
    Map<string, Record<string, unknown>>
  >(new Map());
  const [fileContents, setFileContents] = useState<
    Map<string, { path: string; filetype: string; contents: string }>
  >(new Map());
  const [fileToRenderNode, setFileToRenderNode] = useState<Map<string, string>>(
    new Map(),
  );
  const [renderErrors, setRenderErrors] = useState<
    Map<string, RenderErrorDetails>
  >(new Map());
  const [latestRenderErrorId, setLatestRenderErrorId] = useState<
    string | undefined
  >(undefined);
  const [versionLabel, setVersionLabel] = useState<string | undefined>(
    undefined,
  );
  const [cwd, setCwd] = useState<string | undefined>(undefined);
  const [diagnostics, setDiagnostics] = useState<
    Array<{
      id: string;
      message: string;
      severity: string;
      source?: { fileName: string; lineNumber: number; columnNumber: number };
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
  >([]);
  const [traceEntries, setTraceEntries] = useState<TraceEntry[]>([]);
  const [effects, setEffects] = useState<Map<number, EffectDebugInfo>>(
    new Map(),
  );
  const [refs, setRefs] = useState<Map<number, RefDebugInfo>>(new Map());
  const [effectEdges, setEffectEdges] = useState<EffectEdgeDebugInfo[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
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
    let socket: WebSocket | null = null;
    let cancelled = false;
    let retryTimer: number | undefined;
    let attempts = 0;

    const connect = () => {
      if (cancelled) return;
      setStatus("connecting");
      setError(undefined);
      setVersionLabel(undefined);

      try {
        socket = new WebSocket(resolveDebugUrl());
        socketRef.current = socket;
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : String(err));
        return;
      }

      socket.addEventListener("open", () => {
        if (cancelled) return;
        attempts = 0;
        setStatus("connected");
        treeStateRef.current = createRenderTreeState();
        directoriesRef.current = new Set();
        filesRef.current = new Map();
        fileToRenderNodeRef.current = new Map();
        scopesRef.current = new Map();
        symbolsRef.current = new Map();
        setRenderTree([]);
        setFileTree([]);
        setSymbolTree([]);
        setSymbolDetails(new Map());
        setScopeDetails(new Map());
        setFileContents(new Map());
        setFileToRenderNode(new Map());
        setRenderErrors(new Map());
        setLatestRenderErrorId(undefined);
        setCwd(undefined);
        cwdRef.current = undefined;
        setDiagnostics([]);
        setTraceEntries([]);
        effectsRef.current = new Map();
        refsDebugRef.current = new Map();
        effectEdgesRef.current = [];
        setEffects(new Map());
        setRefs(new Map());
        setEffectEdges([]);
      });

      socket.addEventListener("close", () => {
        if (cancelled) return;
        setStatus("disconnected");
        socketRef.current = null;
        const delay = Math.min(2000, 250 * 2 ** attempts);
        attempts += 1;
        retryTimer = window.setTimeout(connect, delay);
      });

      socket.addEventListener("error", () => {
        if (cancelled) return;
        setStatus("error");
        socketRef.current = null;
        setError("Failed to connect to debug server");
      });

      socket.addEventListener("message", (event) => {
        if (cancelled) return;
        let message: DebugMessage | null = null;
        try {
          message = JSON.parse(String(event.data)) as DebugMessage;
        } catch {
          return;
        }
        if (!message) return;
        if (
          message.type === "files:fileUpdated" ||
          message.type === "render:error" ||
          message.type === "diagnostics:report"
        ) {
          // Skip noisy file update events in the trace.
        } else {
          const sanitizedMessage = sanitizeTraceMessage(message);
          traceCounter.current += 1;
          setTraceEntries((prev) => {
            const uniqueId =
              typeof crypto !== "undefined" && "randomUUID" in crypto ?
                crypto.randomUUID()
              : `${Date.now()}-${traceCounter.current}-${Math.random()
                  .toString(36)
                  .slice(2, 8)}`;
            const next = [
              ...prev,
              {
                id: uniqueId,
                type: sanitizedMessage.type,
                timestamp: Date.now(),
                message: sanitizedMessage,
              },
            ];
            if (next.length > 500) {
              next.splice(0, next.length - 500);
            }
            return next;
          });
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
          setRenderTree(buildRenderTreeView(treeStateRef.current));
          return;
        }

        if (message.type === "files:directoryAdded") {
          const path = String((message as any).path ?? "");
          const normalized = path.replace(/^\.\/?/, "").replace(/\\/g, "/");
          if (normalized) {
            directoriesRef.current.add(normalized);
          }
          setFileTree(buildFileTree());
          return;
        }

        if (message.type === "files:directoryRemoved") {
          const path = String((message as any).path ?? "");
          const normalized = path.replace(/^\.\/?/, "").replace(/\\/g, "/");
          if (normalized) {
            directoriesRef.current.delete(normalized);
          }
          setFileTree(buildFileTree());
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
          setFileTree(buildFileTree());
          setFileContents(new Map(filesRef.current));
          setFileToRenderNode(new Map(fileToRenderNodeRef.current));
          return;
        }

        if (message.type === "files:fileRemoved") {
          const rawPath = (message as any).path as string;
          const path = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
          filesRef.current.delete(path);
          fileToRenderNodeRef.current.delete(path);
          setFileTree(buildFileTree());
          setFileContents(new Map(filesRef.current));
          setFileToRenderNode(new Map(fileToRenderNodeRef.current));
          return;
        }

        if (message.type === "files:fileUpdated") {
          const rawPath = (message as any).path as string;
          const path = rawPath.replace(/^\.\/?/, "").replace(/\\/g, "/");
          const filetype = (message as any).filetype as string;
          const contents = (message as any).contents as string;
          filesRef.current.set(path, { path, filetype, contents });
          setFileTree(buildFileTree());
          setFileContents(new Map(filesRef.current));
          setFileToRenderNode(new Map(fileToRenderNodeRef.current));
          return;
        }

        if (message.type === "debugger:info") {
          const version = (message as any).version as string | undefined;
          const cwdValue = (message as any).cwd as string | undefined;
          if (version) {
            setVersionLabel(`Alloy v${version}`);
          }
          if (cwdValue) {
            cwdRef.current = cwdValue;
            setCwd(cwdValue);
            setFileTree(buildFileTree());
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
          setDiagnostics(incoming ?? []);
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

          setRenderErrors((prev) => {
            const next = new Map(prev);
            next.set(id, details);
            return next;
          });
          setLatestRenderErrorId(id);
          return;
        }

        if (message.type === "effect:effectAdded") {
          const effect = (message as any).effect as EffectDebugInfo | undefined;
          if (effect) {
            effectsRef.current.set(effect.id, effect);
            setEffects(new Map(effectsRef.current));
          }
          return;
        }

        if (message.type === "effect:effectUpdated") {
          const effect = (message as any).effect as EffectDebugInfo | undefined;
          if (effect) {
            effectsRef.current.set(effect.id, effect);
            setEffects(new Map(effectsRef.current));
          }
          return;
        }

        if (message.type === "effect:refAdded") {
          const ref = (message as any).ref as RefDebugInfo | undefined;
          if (ref) {
            refsDebugRef.current.set(ref.id, ref);
            setRefs(new Map(refsDebugRef.current));
          }
          return;
        }

        if (
          message.type === "effect:track" ||
          message.type === "effect:trigger"
        ) {
          const edge = (message as any).edge as EffectEdgeDebugInfo | undefined;
          if (edge) {
            effectEdgesRef.current = [...effectEdgesRef.current, edge];
            setEffectEdges(effectEdgesRef.current);
          }
          return;
        }

        if (message.type === "effect:edgeUpdated") {
          const edge = (message as any).edge as EffectEdgeDebugInfo | undefined;
          if (edge) {
            effectEdgesRef.current = [...effectEdgesRef.current, edge];
            setEffectEdges(effectEdgesRef.current);
          }
          return;
        }

        if (message.type === "scope:create") {
          const scope = (message as any).scope;
          if (scope) {
            scopesRef.current.set(scope.id, scope);
            setSymbolTree(buildSymbolTree());
            setScopeDetails((prev) => {
              const next = new Map(prev);
              next.set(`scope:${scope.id}`, scope);
              return next;
            });
          }
          return;
        }

        if (message.type === "scope:update") {
          const scope = (message as any).scope;
          if (scope) {
            scopesRef.current.set(scope.id, scope);
            setSymbolTree(buildSymbolTree());
            setScopeDetails((prev) => {
              const next = new Map(prev);
              next.set(`scope:${scope.id}`, scope);
              return next;
            });
          }
          return;
        }

        if (message.type === "scope:delete") {
          const id = Number((message as any).id);
          if (Number.isFinite(id)) {
            scopesRef.current.delete(id);
            setSymbolTree(buildSymbolTree());
            setScopeDetails((prev) => {
              const next = new Map(prev);
              next.delete(`scope:${id}`);
              return next;
            });
          }
          return;
        }

        if (message.type === "symbol:create") {
          const symbol = (message as any).symbol;
          if (symbol) {
            symbolsRef.current.set(symbol.id, symbol);
            setSymbolTree(buildSymbolTree());
            setSymbolDetails((prev) => {
              const next = new Map(prev);
              next.set(`symbol:${symbol.id}`, symbol);
              return next;
            });
          }
          return;
        }

        if (message.type === "symbol:update") {
          const symbol = (message as any).symbol;
          if (symbol) {
            symbolsRef.current.set(symbol.id, symbol);
            setSymbolTree(buildSymbolTree());
            setSymbolDetails((prev) => {
              const next = new Map(prev);
              next.set(`symbol:${symbol.id}`, symbol);
              return next;
            });
          }
          return;
        }

        if (message.type === "symbol:delete") {
          const id = Number((message as any).id);
          if (Number.isFinite(id)) {
            symbolsRef.current.delete(id);
            setSymbolTree(buildSymbolTree());
            setSymbolDetails((prev) => {
              const next = new Map(prev);
              next.delete(`symbol:${id}`);
              return next;
            });
          }
        }
      });
    };

    connect();

    return () => {
      cancelled = true;
      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
      }
      socket?.close();
      socketRef.current = null;
    };
  }, []);

  const sendMessage = useMemo(() => {
    return (message: DebugMessage) => {
      const socket = socketRef.current;
      if (!socket || socket.readyState !== WebSocket.OPEN) return;
      socket.send(JSON.stringify(message));
    };
  }, []);

  return useMemo(
    () => ({
      status,
      renderTree,
      fileTree,
      symbolTree,
      symbolDetails,
      scopeDetails,
      fileContents,
      fileToRenderNode,
      renderErrors,
      latestRenderErrorId,
      versionLabel,
      cwd,
      formatPath,
      diagnostics,
      traceEntries,
      effects,
      refs,
      effectEdges,
      sendMessage,
      error,
    }),
    [
      status,
      renderTree,
      fileTree,
      symbolTree,
      symbolDetails,
      scopeDetails,
      fileContents,
      fileToRenderNode,
      renderErrors,
      latestRenderErrorId,
      versionLabel,
      cwd,
      formatPath,
      diagnostics,
      traceEntries,
      effects,
      refs,
      effectEdges,
      sendMessage,
      error,
    ],
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
