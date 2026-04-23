/**
 * Alloy Devtools Protocol
 * =======================
 *
 * Communication protocol between the Alloy debug runtime (core) and the
 * devtools UI client, transported over WebSocket.
 *
 * Message shapes are flat snake_case objects that mirror the SQLite trace-writer
 * row shapes so no format translation is needed on the wire.
 *
 * ─── IDs ─────────────────────────────────────────────────────────────────────
 *
 * All entity IDs (effects, refs, reactive-property refs, non-ref targets)
 * are positive monotonically increasing integers drawn from their respective
 * counters. Ref IDs and reactive-property IDs share a single counter so
 * they never collide. There are no negative or sentinel IDs.
 *
 * ─── Effects ─────────────────────────────────────────────────────────────────
 *
 * An effect is any reactive computation tracked by Alloy's reactivity system.
 *
 *   name        Human-readable label. Format varies:
 *                 "render:ComponentName"         — render effect for a component
 *                 "memo:For"                     — memo inside a For component
 *                 "memo:props.children"          — memo from JSX expression
 *                 "binder:notifySymbolCreated"   — binder infrastructure
 *                 "myCallback"                   — user effect from fn.name
 *               For memos created by JSX expression tracking, the babel plugin
 *               generates a description of the expression (e.g. "props.foo").
 *
 *   effect_type Optional effect category string. Set by framework code via
 *               the debug options on effect(). Values include "render",
 *               "content", "context", "resource", "binder", "list", "symbol",
 *               "collection", etc. null when no category was assigned (common
 *               for memos and user-created effects). Useful for display and
 *               grouping but NOT used for user-vs-external filtering.
 *
 *   source_file / source_line / source_col
 *               Where the effect was created. Captured via V8 CallSite API
 *               with source map resolution (when --enable-source-maps is
 *               active). Points at the component or user code that called
 *               effect()/memo(), not the reactivity internals. May be null
 *               if the entire call stack is framework-internal.
 *
 *   "User only" filtering:
 *     Based purely on source_file. An effect is "user code" when its
 *     source_file resolves to a path OUTSIDE node_modules (i.e. inside the
 *     user's project). Effects whose source_file is inside node_modules
 *     (including @alloy-js/* and any third-party library packages) or is
 *     null are "external" effects. The effect type and name are never used
 *     for this classification.
 *
 * ─── Refs ────────────────────────────────────────────────────────────────────
 *
 * A ref is any individually tracked reactive value. There are several kinds:
 *
 *   kind="ref"                  Created by alloy's ref() wrapper.
 *   kind="shallowRef"          Created by alloy's shallowRef() wrapper.
 *   kind="computed"             Created by alloy's computed() wrapper.
 *   kind="reactive-property"   A property of a reactive object, lazily
 *                               registered on first track/trigger. Each
 *                               (target, key) pair gets its own ref entry.
 *
 * Alloy wraps shallowReactive() to capture creation locations. Objects
 * created via alloy's shallowReactive() wrapper have their creation site
 * stored in a WeakMap. When a reactive-property ref is registered for such
 * an object, the property ref inherits the shallowReactive() creation
 * location. For objects using manual reactivity (e.g. OutputSymbol, which
 * calls Vue's track()/trigger() directly on `this` rather than going through
 * alloy's shallowReactive wrapper), the creation site is unknown and the
 * first track/trigger site is used instead (flagged with is_approx_location).
 *
 *   label       Optional human-readable name. Takes priority over kind for
 *               display. Examples:
 *                 "memo:For"                        — memo's internal ref
 *                 "TSOutputSymbol \"Foo\".name"     — reactive property
 *               When displaying, prefer: label ?? kind. The numeric ID is
 *               always shown separately as a dimmed suffix, never as part
 *               of the label text.
 *
 *   is_infrastructure
 *               Boolean. True for refs created by framework internals that
 *               are implementation details (context.isEmpty, mapJoin index/
 *               joiner counters, devtools rerender tokens). These are not
 *               meaningful to end users and are always excluded in
 *               "user only" mode.
 *
 *   is_approx_location
 *               Boolean. True when the source location was inferred from
 *               first usage rather than the actual creation site. Applies
 *               to reactive-property refs whose parent object was not
 *               created via alloy's shallowReactive() wrapper (e.g.
 *               OutputSymbol class instances with manual track/trigger).
 *               The UI should show a subtle indicator (e.g. a small muted
 *               icon with a tooltip), not a prominent warning.
 *
 *   source_file / source_line / source_col
 *               Where the ref was created. For reactive-property refs from
 *               shallowReactive() objects, this is the shallowReactive()
 *               call site. For reactive-property refs from manual-reactivity
 *               objects, this is the first track site (is_approx_location=1).
 *               For regular refs/shallowRefs/computed, this is the call site
 *               with framework-internal stack frames skipped.
 *
 *   "User only" filtering:
 *     A ref is "user code" when is_infrastructure is false AND source_file
 *     resolves to a path outside node_modules. Infrastructure refs are
 *     always excluded in user-only mode regardless of source location.
 *
 * ─── Edges ───────────────────────────────────────────────────────────────────
 *
 * Edges connect effects to refs via track/trigger relationships.
 * ref_id points to a registered ref. target_id/target_key provide the
 * raw reactive target info. For ref-backed edges, ref_id == target_id.
 *
 * ─── Source Location Resolution ──────────────────────────────────────────────
 *
 * Captured at entity creation time via V8's structured CallSite API.
 * Framework-internal frames (reactivity engine, renderer, scheduler, debug
 * infra) are skipped so the location points at the component or user code.
 *
 * When --enable-source-maps is active, paths and line numbers are resolved
 * through source maps (.js → .ts). The server reports sourceMapEnabled in
 * its handshake. Note: pnpm symlinks require realpathSync before
 * findSourceMap lookup (Node's cache is keyed by real paths).
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
  label?: string;
  created_by_effect_id?: number;
  source_file?: string;
  source_line?: number;
  source_col?: number;
  source_package?: string;
  is_approx_location?: number;
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
