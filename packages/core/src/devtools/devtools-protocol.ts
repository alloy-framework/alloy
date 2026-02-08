/**
 * Shared protocol types for communication between the Alloy devtools server
 * and the devtools UI client. Both sides import these types to ensure
 * compile-time safety and prevent protocol drift.
 */

import type { SourceLocation } from "../debug/effects.js";

export type { SourceLocation };

// ─────────────────────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────────────────────

export interface RenderTreeNode {
  id: number;
  kind:
    | "root"
    | "component"
    | "intrinsic"
    | "printHook"
    | "text"
    | "memo"
    | "customContext"
    | "fragment";
  name?: string;
  propsSerialized?: string;
  value?: string;
  source?: SourceLocation;
}

export interface EffectInfo {
  id: number;
  name?: string;
  type?: string;
  createdAt?: SourceLocation;
  lastTriggeredByRefId?: number;
  lastTriggeredAt?: SourceLocation;
}

export interface RefInfo {
  id: number;
  kind?: string;
  createdAt?: SourceLocation;
  createdByEffectId?: number;
}

export interface EffectEdgeInfo {
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

export interface ScopeInfo {
  id: number;
  name: string;
  parentId: number | null;
  ownerSymbolId: number | null;
  renderNodeId?: number | null;
  isMemberScope: boolean;
  isTransient?: boolean;
  metadata?: Record<string, unknown>;
  debugInfo?: Record<string, unknown>;
  children?: Array<{ id: number; name?: string }>;
  spaces?: Array<{
    key: string;
    symbols: Array<{ id: number; name?: string }>;
  }>;
}

export interface SymbolInfo {
  id: number;
  name: string;
  originalName: string;
  scopeId: number | null;
  ownerSymbolId: number | null;
  renderNodeId?: number | null;
  isMemberSymbol: boolean;
  isTransient: boolean;
  isAlias: boolean;
  movedToId: number | null;
  metadata?: Record<string, unknown>;
  debugInfo?: Record<string, unknown>;
  memberSpaces?: Array<{
    key: string;
    symbols: Array<{ id: number; name?: string }>;
  }>;
}

export interface RenderErrorStackEntry {
  name: string;
  propsSerialized?: string;
  renderNodeId?: number;
  source?: SourceLocation;
}

export interface DiagnosticInfo {
  id: string;
  message: string;
  severity: string;
  source?: SourceLocation;
  componentStack?: Array<{
    name: string;
    renderNodeId?: number;
    source?: SourceLocation;
  }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Server → Client messages
// ─────────────────────────────────────────────────────────────────────────────

export interface DebuggerInfoMessage {
  type: "debugger:info";
  version: string;
  cwd?: string;
}

export interface RenderResetMessage {
  type: "render:reset";
}

export interface RenderNodeAddedMessage {
  type: "render:nodeAdded";
  parentId: number | null;
  node: RenderTreeNode;
}

export interface RenderNodeUpdatedMessage {
  type: "render:nodeUpdated";
  id: number;
  propsSerialized?: string;
}

export interface RenderNodeRemovedMessage {
  type: "render:nodeRemoved";
  parentId: number | null;
  id: number;
  name?: string;
}

export interface RenderErrorMessage {
  type: "render:error";
  id: number;
  name?: string;
  message?: string;
  stack?: string;
  componentStack: RenderErrorStackEntry[];
}

export interface RenderCompleteMessage {
  type: "render:complete";
}

export interface FlushJobsCompleteMessage {
  type: "flushJobs:complete";
}

export interface DirectoryAddedMessage {
  type: "files:directoryAdded";
  path: string;
}

export interface DirectoryRemovedMessage {
  type: "files:directoryRemoved";
  path: string;
}

export interface FileAddedMessage {
  type: "files:fileAdded";
  path: string;
  filetype: string;
  renderNodeId?: number;
}

export interface FileRemovedMessage {
  type: "files:fileRemoved";
  path: string;
}

export interface FileUpdatedMessage {
  type: "files:fileUpdated";
  path: string;
  filetype: string;
  contents: string;
}

export interface ScopeCreateMessage {
  type: "scope:create";
  scope: ScopeInfo;
}

export interface ScopeUpdateMessage {
  type: "scope:update";
  scope: ScopeInfo;
}

export interface ScopeDeleteMessage {
  type: "scope:delete";
  id: number;
}

export interface SymbolCreateMessage {
  type: "symbol:create";
  symbol: SymbolInfo;
}

export interface SymbolUpdateMessage {
  type: "symbol:update";
  symbol: SymbolInfo;
}

export interface SymbolDeleteMessage {
  type: "symbol:delete";
  id: number;
}

export interface EffectAddedMessage {
  type: "effect:effectAdded";
  effect: EffectInfo;
}

export interface EffectUpdatedMessage {
  type: "effect:effectUpdated";
  effect: EffectInfo;
}

export interface RefAddedMessage {
  type: "effect:refAdded";
  ref: RefInfo;
}

export interface EffectTrackMessage {
  type: "effect:track";
  edge: EffectEdgeInfo;
  message?: string;
}

export interface EffectTriggerMessage {
  type: "effect:trigger";
  edge: EffectEdgeInfo;
  message?: string;
}

export interface EffectEdgeUpdatedMessage {
  type: "effect:edgeUpdated";
  edge: EffectEdgeInfo;
}

export interface DiagnosticsReportMessage {
  type: "diagnostics:report";
  diagnostics: DiagnosticInfo[];
}

export interface BatchMessage {
  type: "batch";
  messages: ServerToClientMessage[];
}

export type ServerToClientMessage =
  | DebuggerInfoMessage
  | RenderResetMessage
  | RenderNodeAddedMessage
  | RenderNodeUpdatedMessage
  | RenderNodeRemovedMessage
  | RenderErrorMessage
  | RenderCompleteMessage
  | FlushJobsCompleteMessage
  | DirectoryAddedMessage
  | DirectoryRemovedMessage
  | FileAddedMessage
  | FileRemovedMessage
  | FileUpdatedMessage
  | ScopeCreateMessage
  | ScopeUpdateMessage
  | ScopeDeleteMessage
  | SymbolCreateMessage
  | SymbolUpdateMessage
  | SymbolDeleteMessage
  | EffectAddedMessage
  | EffectUpdatedMessage
  | RefAddedMessage
  | EffectTrackMessage
  | EffectTriggerMessage
  | EffectEdgeUpdatedMessage
  | DiagnosticsReportMessage
  | BatchMessage;

// ─────────────────────────────────────────────────────────────────────────────
// Client → Server messages
// ─────────────────────────────────────────────────────────────────────────────

export interface RerenderRequestMessage {
  type: "render:rerender";
  id: number;
}

export interface RerenderBreakRequestMessage {
  type: "render:rerenderAndBreak";
  id: number;
}

export type ClientToServerMessage =
  | RerenderRequestMessage
  | RerenderBreakRequestMessage;
