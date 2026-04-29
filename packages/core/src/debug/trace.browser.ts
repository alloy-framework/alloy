/**
 * Browser stub for debug/trace.
 *
 * Pure data (TracePhase) and pure helpers (colorText, parseBreakOnIds) are
 * preserved because tracer.ts uses them unconditionally.
 */

export { isDevtoolsEnabled } from "../devtools/devtools-server.js";
export { isTraceEnabled } from "./trace-writer.js";

export function isDebugEnabled() {
  return false;
}
export function isConsoleTraceEnabled() {
  return false;
}
export function parseBreakOnIds() {
  return new Set<number>();
}
export function logDevtoolsMessage() {}
export function trace() {}

export interface TracePhaseInfo {
  area: string;
  subarea: string;
  bg: { r: number; g: number; b: number };
}

export const TracePhase = {
  scope: {
    update: { area: "scope", subarea: "update", bg: { r: 0, g: 255, b: 100 } },
    create: { area: "scope", subarea: "create", bg: { r: 0, g: 150, b: 100 } },
    delete: { area: "scope", subarea: "delete", bg: { r: 150, g: 0, b: 50 } },
    copySymbols: { area: "scope", subarea: "copySymbols", bg: { r: 0, g: 100, b: 100 } },
    moveSymbols: { area: "scope", subarea: "moveSymbols", bg: { r: 0, g: 100, b: 100 } },
  },
  symbol: {
    update: { area: "symbol", subarea: "update", bg: { r: 0, g: 0, b: 255 } },
    resolve: { area: "symbol", subarea: "resolve", bg: { r: 0, g: 0, b: 200 } },
    create: { area: "symbol", subarea: "create", bg: { r: 0, g: 0, b: 150 } },
    flow: { area: "symbol", subarea: "flow", bg: { r: 0, g: 0, b: 100 } },
    addToScope: { area: "symbol", subarea: "addToScope", bg: { r: 0, g: 0, b: 50 } },
    instantiate: { area: "symbol", subarea: "instantiate", bg: { r: 0, g: 0, b: 25 } },
    clone: { area: "symbol", subarea: "clone", bg: { r: 0, g: 0, b: 25 } },
    delete: { area: "symbol", subarea: "delete", bg: { r: 100, g: 0, b: 100 } },
    removeFromScope: { area: "symbol", subarea: "removeFromScope", bg: { r: 50, g: 0, b: 50 } },
  },
  resolve: {
    success: { area: "resolve", subarea: "success", bg: { r: 0, g: 255, b: 0 } },
    pending: { area: "resolve", subarea: "pending", bg: { r: 255, g: 255, b: 0 } },
    failure: { area: "resolve", subarea: "failure", bg: { r: 100, g: 50, b: 50 } },
  },
  effect: {
    schedule: { area: "effect", subarea: "schedule", bg: { r: 100, g: 100, b: 0 } },
    track: { area: "effect", subarea: "track", bg: { r: 75, g: 75, b: 0 } },
    trigger: { area: "effect", subarea: "trigger", bg: { r: 50, g: 50, b: 0 } },
    effectAdded: { area: "effect", subarea: "effectAdded", bg: { r: 75, g: 100, b: 0 } },
    effectUpdated: { area: "effect", subarea: "effectUpdated", bg: { r: 75, g: 75, b: 0 } },
    refAdded: { area: "effect", subarea: "refAdded", bg: { r: 100, g: 75, b: 0 } },
  },
  render: {
    worker: { area: "render", subarea: "worker", bg: { r: 100, g: 50, b: 0 } },
    appendChild: { area: "render", subarea: "appendChild", bg: { r: 100, g: 50, b: 0 } },
    appendTextNode: { area: "render", subarea: "appendChild.textNode", bg: { r: 100, g: 50, b: 0 } },
    appendCachedFragment: { area: "render", subarea: "appendChild.cachedFragment", bg: { r: 100, g: 50, b: 0 } },
    appendCustomContext: { area: "render", subarea: "appendChild.customContext", bg: { r: 100, g: 50, b: 0 } },
    appendPrintHook: { area: "render", subarea: "appendChild.printHook", bg: { r: 100, g: 50, b: 0 } },
    appendComponent: { area: "render", subarea: "appendChild.component", bg: { r: 100, g: 50, b: 0 } },
    appendMemo: { area: "render", subarea: "appendChild.memo", bg: { r: 100, g: 50, b: 0 } },
    renderEffect: { area: "render", subarea: "renderEffect", bg: { r: 100, g: 50, b: 0 } },
  },
} as const;

export function colorText(text: string, fmt?: { fg?: { r: number; g: number; b: number }; bg?: { r: number; g: number; b: number }; bold?: boolean }): string {
  if (!fmt) return text;
  const codes: string[] = [];
  if (fmt.bold) codes.push("1");
  if (fmt.fg) codes.push(`38;2;${fmt.fg.r};${fmt.fg.g};${fmt.fg.b}`);
  if (fmt.bg) codes.push(`48;2;${fmt.bg.r};${fmt.bg.g};${fmt.bg.b}`);
  if (codes.length === 0) return text;
  return `\x1b[${codes.join(";")}m${text}\x1b[0m`;
}

export function traceType(phase: TracePhaseInfo): string {
  return `${phase.area}:${phase.subarea}`;
}
