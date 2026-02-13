/**
 * Shared protocol types for communication between the Alloy devtools server
 * and the devtools UI client.
 *
 * Message shapes are flat snake_case objects that mirror the SQLite row shapes
 * from trace-writer.ts so no format translation is needed on the wire.
 */

import type { SourceLocation } from "../debug/effects.js";

export type { SourceLocation };

// ─────────────────────────────────────────────────────────────────────────────
// Shared flat row types
// ─────────────────────────────────────────────────────────────────────────────

export interface DiagnosticRow {
  message: string;
  severity?: string;
  source_file?: string;
  source_line?: number;
  source_col?: number;
  component_stack?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Legacy shared types (used by server code during migration)
// ─────────────────────────────────────────────────────────────────────────────

/** @deprecated Use flat fields on RenderNodeAddedMessage instead. */
export interface RenderTreeNode {
  id: number;
  kind: string;
  name?: string;
  propsSerialized?: string;
  value?: string;
  source?: SourceLocation;
}

/** @deprecated Use flat fields on RenderErrorMessage instead. */
export interface RenderErrorStackEntry {
  name: string;
  propsSerialized?: string;
  renderNodeId?: number;
  source?: SourceLocation;
}

// ─────────────────────────────────────────────────────────────────────────────
// Server → Client messages
// ─────────────────────────────────────────────────────────────────────────────

// -- debugger --

export interface DebuggerInfoMessage {
  type: "debugger:info";
  version: string;
  cwd?: string;
  sourceMapEnabled: boolean;
}

// -- render --

export interface RenderResetMessage {
  type: "render:reset";
}

export interface RenderNodeAddedMessage {
  type: "render:node_added";
  id: number;
  parent_id: number | null;
  kind: string;
  name?: string;
  props?: string;
  value?: string;
  source_file?: string;
  source_line?: number;
  source_col?: number;
  context_id?: number | null;
  seq: number;
}

export interface RenderNodeUpdatedMessage {
  type: "render:node_updated";
  id: number;
  props?: string;
}

export interface RenderNodeRemovedMessage {
  type: "render:node_removed";
  id: number;
}

export interface RenderErrorMessage {
  type: "render:error";
  name?: string;
  message?: string;
  stack?: string;
  component_stack?: string;
  seq: number;
}

export interface RenderCompleteMessage {
  type: "render:complete";
}

// -- flush --

export interface FlushJobsCompleteMessage {
  type: "flush:complete";
}

// -- effects --

export interface EffectAddedMessage {
  type: "effect:added";
  id: number;
  name?: string;
  effect_type?: string;
  context_id?: number | null;
  owner_context_id?: number | null;
  component?: string;
  source_file?: string;
  source_line?: number;
  source_col?: number;
  source_package?: string;
  is_infrastructure?: number;
  seq: number;
}

export interface EffectUpdatedMessage {
  type: "effect:updated";
  id: number;
  name?: string;
  effect_type?: string;
  context_id?: number | null;
  owner_context_id?: number | null;
  component?: string;
  source_file?: string;
  source_line?: number;
  source_col?: number;
  source_package?: string;
  is_infrastructure?: number;
  seq: number;
}

// -- refs --

export interface RefAddedMessage {
  type: "ref:added";
  id: number;
  kind?: string;
  created_by_effect_id?: number;
  source_file?: string;
  source_line?: number;
  source_col?: number;
  source_package?: string;
  seq: number;
}

// -- edges --

export interface EffectTrackMessage {
  type: "edge:track";
  seq: number;
  effect_id: number;
  ref_id?: number;
  target_id?: number;
  target_kind?: string;
  target_label?: string;
  target_key?: string;
}

export interface EffectTriggerMessage {
  type: "edge:trigger";
  seq: number;
  effect_id: number;
  caused_by?: number;
  ref_id?: number;
  target_id?: number;
  target_kind?: string;
  target_label?: string;
  target_key?: string;
}

export interface EffectEdgeUpdatedMessage {
  type: "edge:updated";
  seq: number;
  effect_id: number;
  caused_by?: number;
  ref_id?: number;
  target_id?: number;
  target_kind?: string;
  target_label?: string;
  target_key?: string;
}

// -- effect lifecycle --

export interface EffectLifecycleMessage {
  type: "effect:lifecycle";
  seq: number;
  effect_id: number;
  event: string;
  trigger_ref_id?: number;
}

// -- scopes --

export interface ScopeAddedMessage {
  type: "scope:added";
  id: number;
  name: string;
  parent_id?: number | null;
  owner_symbol_id?: number | null;
  render_node_id?: number | null;
  is_member_scope?: number;
  is_transient?: number;
  metadata?: string;
  seq: number;
}

export interface ScopeUpdatedMessage {
  type: "scope:updated";
  id: number;
  name: string;
  parent_id?: number | null;
  owner_symbol_id?: number | null;
  render_node_id?: number | null;
  is_member_scope?: number;
  is_transient?: number;
  metadata?: string;
  seq: number;
}

export interface ScopeRemovedMessage {
  type: "scope:removed";
  id: number;
}

// -- symbols --

export interface SymbolAddedMessage {
  type: "symbol:added";
  id: number;
  name: string;
  original_name?: string;
  scope_id?: number | null;
  owner_symbol_id?: number | null;
  render_node_id?: number | null;
  is_member?: number;
  is_transient?: number;
  is_alias?: number;
  moved_to_id?: number | null;
  metadata?: string;
  seq: number;
}

export interface SymbolUpdatedMessage {
  type: "symbol:updated";
  id: number;
  name: string;
  original_name?: string;
  scope_id?: number | null;
  owner_symbol_id?: number | null;
  render_node_id?: number | null;
  is_member?: number;
  is_transient?: number;
  is_alias?: number;
  moved_to_id?: number | null;
  metadata?: string;
  seq: number;
}

export interface SymbolRemovedMessage {
  type: "symbol:removed";
  id: number;
}

// -- files --

export interface FileAddedMessage {
  type: "file:added";
  path: string;
  filetype?: string;
  render_node_id?: number;
  seq: number;
}

export interface FileUpdatedMessage {
  type: "file:updated";
  path: string;
  content?: string;
}

export interface FileRemovedMessage {
  type: "file:removed";
  path: string;
}

// -- directories --

export interface DirectoryAddedMessage {
  type: "directory:added";
  path: string;
}

export interface DirectoryRemovedMessage {
  type: "directory:removed";
  path: string;
}

// -- diagnostics --

export interface DiagnosticsReportMessage {
  type: "diagnostics:report";
  diagnostics: DiagnosticRow[];
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
  | EffectAddedMessage
  | EffectUpdatedMessage
  | RefAddedMessage
  | EffectTrackMessage
  | EffectTriggerMessage
  | EffectEdgeUpdatedMessage
  | EffectLifecycleMessage
  | ScopeAddedMessage
  | ScopeUpdatedMessage
  | ScopeRemovedMessage
  | SymbolAddedMessage
  | SymbolUpdatedMessage
  | SymbolRemovedMessage
  | FileAddedMessage
  | FileUpdatedMessage
  | FileRemovedMessage
  | DirectoryAddedMessage
  | DirectoryRemovedMessage
  | DiagnosticsReportMessage;

// ─────────────────────────────────────────────────────────────────────────────
// Client → Server messages
// ─────────────────────────────────────────────────────────────────────────────

export interface SubscribeMessage {
  type: "subscribe";
  channels: string[];
}

export interface UnsubscribeMessage {
  type: "unsubscribe";
  channels: string[];
}

export interface RerenderRequestMessage {
  type: "render:rerender";
  id: number;
}

export interface RerenderBreakRequestMessage {
  type: "render:rerenderAndBreak";
  id: number;
}

export type ClientToServerMessage =
  | SubscribeMessage
  | UnsubscribeMessage
  | RerenderRequestMessage
  | RerenderBreakRequestMessage;
