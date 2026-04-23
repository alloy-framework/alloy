import type { TreeNode } from "@/components/tree-view";
import type { ScopeRecord, SymbolRecord } from "@/hooks/debug-state";
import type { RenderTreeViewNode } from "@/lib/debug-tree";
import type {
  ClientToServerMessage,
  SourceLocation,
} from "@alloy-js/core/devtools";

// ── Constants ────────────────────────────────────────────────────────────────

/** Batching interval for state updates (ms) */
export const BATCH_FLUSH_INTERVAL = 100;
/** Under heavy load, increase the batch interval */
export const BATCH_FLUSH_INTERVAL_HEAVY = 250;
/** Threshold for considering load as "heavy" (messages per batch interval) */
export const HEAVY_LOAD_THRESHOLD = 100;

// ── Local type definitions (matching what the UI consumes) ───────────────────

export type { SourceLocation };

export interface EffectDebugInfo {
  id: number;
  name?: string;
  type?: string;
  createdAt?: SourceLocation;
  contextId?: number;
  ownerContextId?: number | null;
  component?: string;
  sourcePackage?: string;
  lastTriggeredByRefId?: number;
  lastTriggeredAt?: SourceLocation;
}

export interface RefDebugInfo {
  id: number;
  kind?: string;
  label?: string;
  createdAt?: SourceLocation;
  createdByEffectId?: number;
  isInfrastructure?: boolean;
  isApproxLocation?: boolean;
  sourcePackage?: string;
}

export interface EffectEdgeDebugInfo {
  id: number;
  type: string;
  effectId: number;
  causedBy?: number;
  refId?: number;
  targetId?: number;
  targetKind?: string;
  targetLabel?: string;
  targetKey?: string | number;
  count?: number;
}

export interface EffectLifecycleEvent {
  id: number;
  effectId: number;
  event: string;
  triggerRefId?: number;
}

export interface DiagnosticComponentStackEntry {
  name?: string;
  renderNodeId?: number;
  source?: SourceLocation;
}

export interface DiagnosticInfo {
  id: string;
  message: string;
  severity: string;
  source?: SourceLocation;
  componentStack?: DiagnosticComponentStackEntry[];
}

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
  effectLifecycleVersion: number;
  renderErrors: Map<string, RenderErrorDetails>;
  latestRenderErrorId?: string;
  versionLabel?: string;
  cwd?: string;
  sourceMapEnabled: boolean;
  diagnostics: DiagnosticInfo[];
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
  effectLifecycleVersion: 0,
  renderErrors: new Map(),
  latestRenderErrorId: undefined,
  versionLabel: undefined,
  cwd: undefined,
  sourceMapEnabled: false,
  diagnostics: [],
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
  effectLifecycleEvents: EffectLifecycleEvent[];
  fileContentsVersion: number;
  fileToRenderNodeVersion: number;
  effectsVersion: number;
  refsVersion: number;
  effectEdgesVersion: number;
  effectLifecycleVersion: number;
  renderErrors: Map<string, RenderErrorDetails>;
  latestRenderErrorId?: string;
  versionLabel?: string;
  cwd?: string;
  sourceMapEnabled: boolean;
  formatPath: (path: string) => string;
  diagnostics: DiagnosticInfo[];
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
  effectLifecycle: boolean;
  diagnostics: boolean;
  renderErrors: boolean;
  versionLabel: boolean;
  cwd: boolean;
  sourceMapEnabled: boolean;
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
    effectLifecycle: false,
    diagnostics: false,
    renderErrors: false,
    versionLabel: false,
    cwd: false,
    sourceMapEnabled: false,
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
    effectLifecycle: true,
    diagnostics: true,
    renderErrors: true,
    versionLabel: true,
    cwd: true,
    sourceMapEnabled: true,
    latestRenderErrorId: true,
    error: true,
  };
}
