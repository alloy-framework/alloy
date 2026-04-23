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
  ensureReactivePropertyRef,
  ensureRef,
  register,
  registerRef,
  reset,
  track,
  trigger,
  update,
} from "./effects.js";
import {
  recordDirectory,
  recordFile,
  reset as resetFiles,
  updated,
} from "./files.js";
import {
  appendCustomContext,
  appendFragmentChild,
  appendPrintHook,
  appendTextNode,
  beginComponent,
  complete,
  error,
  flushJobsComplete,
  initialize,
  prepareMemoNode,
} from "./render.js";
import {
  registerScope,
  registerSymbol,
  relocateScope,
  reset as resetSymbols,
  unregisterScope,
  unregisterSymbol,
} from "./symbols.js";
import { trace, type TracePhaseInfo } from "./trace.js";

export { isDevtoolsConnected } from "../devtools/devtools-server.js";
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
  isDebugEnabled,
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
    ensureReactivePropertyRef,
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
    relocateScope,
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
