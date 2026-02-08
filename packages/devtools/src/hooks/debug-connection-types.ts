import type { TreeNode } from "@/components/tree-view";
import type { ScopeRecord, SymbolRecord } from "@/hooks/debug-state";
import type { RenderTreeViewNode } from "@/lib/debug-tree";
import type {
  ClientToServerMessage,
  DiagnosticInfo,
  EffectEdgeInfo,
  EffectInfo,
  RefInfo,
  ServerToClientMessage,
  SourceLocation,
} from "@alloy-js/core/devtools";

// ── Constants ────────────────────────────────────────────────────────────────

/** Batching interval for state updates (ms) */
export const BATCH_FLUSH_INTERVAL = 100;
/** Under heavy load, increase the batch interval */
export const BATCH_FLUSH_INTERVAL_HEAVY = 250;
/** Threshold for considering load as "heavy" (messages per batch interval) */
export const HEAVY_LOAD_THRESHOLD = 100;
/** Maximum number of trace entries to keep */
export const MAX_TRACE_ENTRIES = 500;
/** Maximum number of effect edges to keep */
export const MAX_EFFECT_EDGES = 10000;

// ── Re-exported type aliases ─────────────────────────────────────────────────

export type { SourceLocation };
export type EffectDebugInfo = EffectInfo;
export type RefDebugInfo = RefInfo;
export type EffectEdgeDebugInfo = EffectEdgeInfo;

// ── Connection status ────────────────────────────────────────────────────────

export type DebugConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

// ── Render-error types ───────────────────────────────────────────────────────

export interface RenderErrorComponentStackEntry {
  name: string;
  props?: Record<string, unknown>;
  renderNodeId?: number;
  source?: SourceLocation;
}

export interface RenderErrorDetails {
  id: string;
  name: string;
  message: string;
  stack?: string;
  componentStack: RenderErrorComponentStackEntry[];
}

// ── Trace entry ──────────────────────────────────────────────────────────────

export interface TraceEntry {
  id: string;
  type: string;
  timestamp: number;
  message: ServerToClientMessage;
}

// ── Internal state (one setState per flush) ──────────────────────────────────

export interface DebugConnectionInternalState {
  status: DebugConnectionStatus;
  renderTree: RenderTreeViewNode[];
  fileTree: TreeNode[];
  symbolTree: TreeNode[];
  symbolDetails: Map<string, SymbolRecord>;
  scopeDetails: Map<string, ScopeRecord>;
  fileContentsVersion: number;
  fileToRenderNodeVersion: number;
  effectsVersion: number;
  refsVersion: number;
  effectEdgesVersion: number;
  renderErrors: Map<string, RenderErrorDetails>;
  latestRenderErrorId?: string;
  versionLabel?: string;
  cwd?: string;
  diagnostics: DiagnosticInfo[];
  traceEntries: TraceEntry[];
  error?: string;
}

export const INITIAL_STATE: DebugConnectionInternalState = {
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

// ── Public state returned from the hook ──────────────────────────────────────

export interface DebugConnectionState {
  status: DebugConnectionStatus;
  renderTree: RenderTreeViewNode[];
  fileTree: TreeNode[];
  symbolTree: TreeNode[];
  symbolDetails: Map<string, SymbolRecord>;
  scopeDetails: Map<string, ScopeRecord>;
  fileContents: Map<
    string,
    { path: string; filetype: string; contents: string }
  >;
  fileToRenderNode: Map<string, string>;
  effects: Map<number, EffectDebugInfo>;
  refs: Map<number, RefDebugInfo>;
  effectEdges: EffectEdgeDebugInfo[];
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
  diagnostics: DiagnosticInfo[];
  traceEntries: TraceEntry[];
  sendMessage: (message: ClientToServerMessage) => void;
  error?: string;
}

// ── Dirty flags for batching ─────────────────────────────────────────────────

export interface DirtyFlags {
  status: boolean;
  renderTree: boolean;
  fileTree: boolean;
  symbolTree: boolean;
  symbolDetails: boolean;
  scopeDetails: boolean;
  fileContents: boolean;
  fileToRenderNode: boolean;
  effects: boolean;
  refs: boolean;
  effectEdges: boolean;
  traceEntries: boolean;
  diagnostics: boolean;
  renderErrors: boolean;
  versionLabel: boolean;
  cwd: boolean;
  latestRenderErrorId: boolean;
  error: boolean;
}

export function createCleanFlags(): DirtyFlags {
  return {
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
}

export function createAllDirtyFlags(): DirtyFlags {
  return {
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
}
