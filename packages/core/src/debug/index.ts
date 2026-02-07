import {
  assertDevtoolsConnectedForSyncRender,
  initDevtoolsIfEnabled,
  isDevtoolsEnabled,
} from "../devtools/devtools-server.js";
import type { PrintHook, RenderedTextTree } from "../render.js";
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
  type EffectDebugInfo,
  type SourceLocation,
} from "./effects.js";
import {
  updated,
  recordDirectory,
  recordFile,
  type FileUpdateInfo,
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
  worker,
  type BeginComponentOptions,
  type ComponentDebugSession,
  type RenderErrorInfo,
  type RenderErrorStackEntry,
} from "./render.js";
import {
  registerScope,
  registerSymbol,
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
  isDebugEnabled,
  trace,
  TracePhase,
  type TracePhaseInfo,
} from "./trace.js";

export interface DebugInterface {
  component: {
    stack(): void;
    tree(): void;
    watch(): void;
    render(): void;
    context(): void;
  };
  effect: {
    register(input: {
      name?: string;
      type?: string;
      createdAt?: SourceLocation;
    }): number;
    update(input: Partial<EffectDebugInfo> & { id: number }): void;
    registerRef(input: {
      id: number;
      kind?: string;
      createdAt?: SourceLocation;
      createdByEffectId?: number;
    }): void;
    ensureRef(input: { id: number; kind?: string }): void;
    track(input: {
      effectId: number;
      target: unknown;
      refId?: number;
      targetKey?: string | number;
      location?: SourceLocation;
    }): void;
    trigger(input: {
      effectId: number;
      target: unknown;
      refId?: number;
      targetKey?: string | number;
      location?: SourceLocation;
      kind?: "trigger" | "triggered-by";
    }): void;
    reset(): void;
  };
  render: {
    initialize(root: RenderedTextTree): void;
    worker(childrenDescription: () => string): void;
    appendTextNode(
      parent: RenderedTextTree,
      index: number,
      value: string,
    ): void;
    appendCustomContext(parent: RenderedTextTree, node: RenderedTextTree): void;
    appendPrintHook(
      parent: RenderedTextTree,
      index: number,
      hook: PrintHook,
      name: string,
      subtree?: RenderedTextTree,
    ): void;
    appendFragmentChild(
      parent: RenderedTextTree,
      child: RenderedTextTree,
    ): void;
    beginComponent(options: BeginComponentOptions): ComponentDebugSession;
    prepareMemoNode(
      parent: RenderedTextTree,
      node: RenderedTextTree,
      isExisting: boolean,
    ): void;
    error(
      error: RenderErrorInfo,
      componentStack: RenderErrorStackEntry[],
    ): void;
    complete(): void;
    flushJobsComplete(): void;
  };
  files: {
    recordDirectory(path: string): void;
    recordFile(path: string, filetype: string): void;
    updated(info: FileUpdateInfo): void;
  };
  symbols: {
    registerScope(scope: Parameters<typeof registerScope>[0]): void;
    unregisterScope(scope: Parameters<typeof unregisterScope>[0]): void;
    registerSymbol(symbol: Parameters<typeof registerSymbol>[0]): void;
    unregisterSymbol(symbol: Parameters<typeof unregisterSymbol>[0]): void;
  };
}

export interface DebugRuntime extends DebugInterface {
  trace(
    phase: TracePhaseInfo,
    cb: () => string,
    triggerIds?: Set<number>,
  ): void;
  prepare(): Promise<void>;
  assertReadyForSyncRender(): void;
}

export const debug: DebugRuntime = {
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
    worker,
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
  },
  symbols: {
    registerScope,
    unregisterScope,
    registerSymbol,
    unregisterSymbol,
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
