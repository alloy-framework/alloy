import {
  assertDevtoolsConnectedForSyncRender,
  initDevtoolsIfEnabled,
  isDevtoolsEnabled,
} from "../devtools/devtools-server.js";
import {
  debugContext,
  debugRender,
  debugStack,
  debugTree,
  debugWatch,
} from "./cli.js";
import {
  ensureRef,
  track,
  trigger,
  register,
  registerRef,
  reset,
  update,
} from "./effects.js";
import {
  updated,
  recordDirectory,
  recordFile,
  reset as resetFiles,
} from "./files.js";
import {
  appendCustomContext,
  appendFragmentChild,
  appendPrintHook,
  appendTextNode,
  beginComponent,
  flushJobsComplete,
  initialize,
  prepareMemoNode,
  complete,
  error,
} from "./render.js";
import {
  registerScope,
  registerSymbol,
  reset as resetSymbols,
  unregisterScope,
  unregisterSymbol,
} from "./symbols.js";
import { trace, type TracePhaseInfo } from "./trace.js";

export { captureSourceLocation } from "./effects.js";
export type {
  EffectDebugInfo,
  EffectEdgeDebugInfo,
  RefDebugInfo,
} from "./effects.js";
export { getRenderNodeId, type RenderTreeNodeInfo } from "./render.js";
export type {
  BeginComponentOptions,
  ComponentDebugSession,
  RenderErrorInfo,
  RenderErrorStackEntry,
} from "./render.js";
export {
  isConsoleTraceEnabled,
  isDevtoolsEnabled,
  trace,
  TracePhase,
  type TracePhaseInfo,
} from "./trace.js";

/** The full debug runtime interface, derived from the `debug` object implementation. */
export type DebugRuntime = typeof debug;

export const debug = {
  component: {
    stack: debugStack,
    tree: debugTree,
    watch: debugWatch,
    render: debugRender,
    context: debugContext,
  },
  effect: {
    register,
    update,
    registerRef,
    ensureRef,
    track,
    trigger,
    reset,
  },
  render: {
    initialize,
    appendTextNode,
    appendCustomContext,
    appendPrintHook,
    appendFragmentChild,
    beginComponent,
    prepareMemoNode,
    error,
    complete,
    flushJobsComplete,
  },
  files: {
    recordDirectory,
    recordFile,
    updated,
    reset: resetFiles,
  },
  symbols: {
    registerScope,
    unregisterScope,
    registerSymbol,
    unregisterSymbol,
    reset: resetSymbols,
  },
  trace(phase: TracePhaseInfo, cb: () => string, triggerIds?: Set<number>) {
    trace(phase, cb, triggerIds ?? new Set());
  },
  async prepare(): Promise<void> {
    await initDevtoolsIfEnabled();
  },
  assertReadyForSyncRender(): void {
    if (isDevtoolsEnabled()) {
      assertDevtoolsConnectedForSyncRender();
    }
  },
};
