/**
 * Trace helpers and configuration.
 */
import {
  broadcastDevtoolsMessage,
  isDevtoolsEnabled,
  type DevtoolsMessage,
} from "../devtools/devtools-server.js";
import { untrack } from "../reactivity.js";

// ─────────────────────────────────────────────────────────────────────────────
// Environment configuration
// ─────────────────────────────────────────────────────────────────────────────

const traceEnv = process.env.ALLOY_TRACE ?? "";
const tracePhases = new Set<string>(
  traceEnv === "" ? [] : traceEnv.split(",").map((t) => t.trim()),
);

const debuggerIdsEnv = process.env.ALLOY_BREAK_ON_DID ?? "";
const debuggerIds = new Set<number>();
debuggerIdsEnv.split(",").forEach((id) => {
  const num = parseInt(id, 10);
  if (!isNaN(num)) {
    debuggerIds.add(num);
  }
});

/** Parse the ALLOY_BREAK_ON_DID environment variable into a set of IDs. */
export function parseBreakOnIds(): Set<number> {
  const env = process.env.ALLOY_BREAK_ON_DID ?? "";
  const ids = new Set<number>();
  env.split(",").forEach((id) => {
    const num = parseInt(id, 10);
    if (!isNaN(num)) {
      ids.add(num);
    }
  });
  return ids;
}

/** Returns true if console tracing is enabled for the given phase (or any phase if not specified). */
export function isConsoleTraceEnabled(phase?: string): boolean {
  if (tracePhases.size === 0) return false;
  if (!phase) return true;
  const [area, subarea] = phase.split(".");
  return tracePhases.has(area) || (subarea ? tracePhases.has(phase) : false);
}

/** Returns true if any tracing/debugging is enabled (console or devtools). */
export function isDebugEnabled(): boolean {
  return tracePhases.size > 0 || isDevtoolsEnabled();
}

if (tracePhases.size > 0) {
  // eslint-disable-next-line no-console
  console.log(
    "Tracing enabled for phases:",
    Array.from(tracePhases).join(", "),
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Trace phases
// ─────────────────────────────────────────────────────────────────────────────

interface Color {
  r: number;
  g: number;
  b: number;
}

export interface TracePhaseInfo {
  area: string;
  subarea: string;
  bg: Color;
}

export const TracePhase = {
  scope: {
    update: { area: "scope", subarea: "update", bg: { r: 0, g: 255, b: 100 } },
    create: { area: "scope", subarea: "create", bg: { r: 0, g: 150, b: 100 } },
    delete: { area: "scope", subarea: "delete", bg: { r: 150, g: 0, b: 50 } },
    copySymbols: {
      area: "scope",
      subarea: "copySymbols",
      bg: { r: 0, g: 100, b: 100 },
    },
    moveSymbols: {
      area: "scope",
      subarea: "moveSymbols",
      bg: { r: 0, g: 100, b: 100 },
    },
  },
  symbol: {
    update: { area: "symbol", subarea: "update", bg: { r: 0, g: 0, b: 255 } },
    resolve: { area: "symbol", subarea: "resolve", bg: { r: 0, g: 0, b: 200 } },
    create: { area: "symbol", subarea: "create", bg: { r: 0, g: 0, b: 150 } },
    flow: { area: "symbol", subarea: "flow", bg: { r: 0, g: 0, b: 100 } },
    addToScope: {
      area: "symbol",
      subarea: "addToScope",
      bg: { r: 0, g: 0, b: 50 },
    },
    instantiate: {
      area: "symbol",
      subarea: "instantiate",
      bg: { r: 0, g: 0, b: 25 },
    },
    clone: { area: "symbol", subarea: "clone", bg: { r: 0, g: 0, b: 25 } },
    delete: { area: "symbol", subarea: "delete", bg: { r: 100, g: 0, b: 100 } },
    removeFromScope: {
      area: "symbol",
      subarea: "removeFromScope",
      bg: { r: 50, g: 0, b: 50 },
    },
  },
  resolve: {
    success: {
      area: "resolve",
      subarea: "success",
      bg: { r: 0, g: 255, b: 0 },
    },
    pending: {
      area: "resolve",
      subarea: "pending",
      bg: { r: 255, g: 255, b: 0 },
    },
    failure: {
      area: "resolve",
      subarea: "failure",
      bg: { r: 100, g: 50, b: 50 },
    },
  },
  effect: {
    schedule: {
      area: "effect",
      subarea: "schedule",
      bg: { r: 100, g: 100, b: 0 },
    },
    track: { area: "effect", subarea: "track", bg: { r: 75, g: 75, b: 0 } },
    trigger: { area: "effect", subarea: "trigger", bg: { r: 50, g: 50, b: 0 } },
    effectAdded: {
      area: "effect",
      subarea: "effectAdded",
      bg: { r: 75, g: 100, b: 0 },
    },
    effectUpdated: {
      area: "effect",
      subarea: "effectUpdated",
      bg: { r: 75, g: 75, b: 0 },
    },
    refAdded: {
      area: "effect",
      subarea: "refAdded",
      bg: { r: 100, g: 75, b: 0 },
    },
  },
  render: {
    worker: { area: "render", subarea: "worker", bg: { r: 100, g: 50, b: 0 } },
    appendChild: {
      area: "render",
      subarea: "appendChild",
      bg: { r: 100, g: 50, b: 0 },
    },
    appendTextNode: {
      area: "render",
      subarea: "appendChild.textNode",
      bg: { r: 100, g: 50, b: 0 },
    },
    appendCachedFragment: {
      area: "render",
      subarea: "appendChild.cachedFragment",
      bg: { r: 100, g: 50, b: 0 },
    },
    appendCustomContext: {
      area: "render",
      subarea: "appendChild.customContext",
      bg: { r: 100, g: 50, b: 0 },
    },
    appendPrintHook: {
      area: "render",
      subarea: "appendChild.printHook",
      bg: { r: 100, g: 50, b: 0 },
    },
    appendComponent: {
      area: "render",
      subarea: "appendChild.component",
      bg: { r: 100, g: 50, b: 0 },
    },
    appendMemo: {
      area: "render",
      subarea: "appendChild.memo",
      bg: { r: 100, g: 50, b: 0 },
    },
    renderEffect: {
      area: "render",
      subarea: "renderEffect",
      bg: { r: 100, g: 50, b: 0 },
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Console formatting utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface TextFormat {
  fg?: Color;
  bg?: Color;
  bold?: boolean;
}

export function colorText(text: string, fmt?: TextFormat): string {
  if (!fmt) return text;
  const codes: string[] = [];
  if (fmt.bold) codes.push("1");
  if (fmt.fg) codes.push(`38;2;${fmt.fg.r};${fmt.fg.g};${fmt.fg.b}`);
  if (fmt.bg) codes.push(`48;2;${fmt.bg.r};${fmt.bg.g};${fmt.bg.b}`);
  if (codes.length === 0) return text;
  return `\x1b[${codes.join(";")}m${text}\x1b[0m`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Low-level trace API
// ─────────────────────────────────────────────────────────────────────────────

let traceCount = 0;

function shouldTracePhase(area: string, subarea: string): boolean {
  return (
    isConsoleTraceEnabled(area) || isConsoleTraceEnabled(area + "." + subarea)
  );
}

function shouldTrace(phase: TracePhaseInfo): boolean {
  return shouldTracePhase(phase.area, phase.subarea);
}

export function traceType(phase: TracePhaseInfo): string {
  return `${phase.area}:${phase.subarea}`;
}

export function logDevtoolsMessage(message: DevtoolsMessage) {
  if (!isConsoleTraceEnabled()) return;
  const type = String(message.type ?? "");
  const colonIndex = type.indexOf(":");
  if (colonIndex === -1) return;
  const area = type.slice(0, colonIndex);
  const subarea = type.slice(colonIndex + 1);
  if (!area || !subarea) return;
  if (!shouldTracePhase(area, subarea)) return;
  // eslint-disable-next-line no-console
  console.log("devtools:", message.type, message);
}

export function emitDevtoolsMessage(message: DevtoolsMessage) {
  logDevtoolsMessage(message);
  if (!isDevtoolsEnabled()) return;
  broadcastDevtoolsMessage(message);
}

/**
 * Low-level trace function for emitting console output.
 * Use the `debug` object methods for most use cases.
 */
export function trace(
  phase: TracePhaseInfo,
  cb: () => string,
  triggerIds: Set<number> = new Set(),
): void {
  if (shouldTrace(phase)) {
    if (triggerIds.size === 0) {
      const id = traceCount++;
      triggerIds.add(id);
      if (debuggerIds.has(id)) {
        // eslint-disable-next-line no-debugger
        debugger;
      }
    }

    const areaTag = ` ${phase.area}:${phase.subarea} `;
    const message = untrack(cb);
    // eslint-disable-next-line no-console
    console.log(
      colorText(areaTag, { ...phase, bold: true }) +
        " " +
        colorText("[" + [...triggerIds].join(",") + "]", {
          fg: { r: 50, g: 50, b: 50 },
        }) +
        " " +
        message +
        "\n",
    );
  }

  if (isDevtoolsEnabled()) {
    broadcastDevtoolsMessage({
      type: traceType(phase),
      triggerIds: [...triggerIds],
    });
  }
}
