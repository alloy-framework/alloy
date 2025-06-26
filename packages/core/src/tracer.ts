import { effect, ReactiveEffectRunner } from "@vue/reactivity";
import { untrack } from "./reactivity.js";
import type { Refkey } from "./refkey.js";
import { scheduler } from "./scheduler.js";
import { OutputScopeFlags, OutputSymbolFlags } from "./symbols/flags.js";
import { type OutputScope } from "./symbols/output-scope.js";
import type {
  OutputDeclarationSpace,
  OutputMemberSpace,
  OutputSpace,
} from "./symbols/output-space.js";
import { type OutputSymbol } from "./symbols/output-symbol.js";

// enable tracing for specific phases using a comma separated list of
// dotted identifiers, e.g. `scope.update,symbol.create`.
const traceEnv = process.env.ALLOY_TRACE ?? "";
const tracePhases = new Set<string>(
  traceEnv === "" ? [] : traceEnv.split(",").map((t) => t.trim()),
);

if (tracePhases.size > 0) {
  // eslint-disable-next-line no-console
  console.log(
    "Tracing enabled for phases:",
    Array.from(tracePhases).join(", "),
  );
}

const debuggerIdsEnv = process.env.ALLOY_BREAK_ON_DID ?? "";
const dids = new Set<number>();

debuggerIdsEnv.split(",").forEach((id) => {
  const num = parseInt(id, 10);
  if (!isNaN(num)) {
    dids.add(num);
  }
});
export const TracePhase = {
  scope: {
    update: {
      area: "scope",
      subarea: "update",
      bg: { r: 0, g: 255, b: 100 },
    },
    create: {
      area: "scope",
      subarea: "create",
      bg: { r: 0, g: 150, b: 100 },
    },
    copySymbols: {
      area: "scope",
      subarea: "copySymbols",
      bg: { r: 0, g: 100, b: 100 },
    },
  },
  symbol: {
    update: {
      area: "symbol",
      subarea: "update",
      bg: { r: 0, g: 0, b: 255 },
    },
    resolve: {
      area: "symbol",
      subarea: "resolve",
      bg: { r: 0, g: 0, b: 200 },
    },
    create: {
      area: "symbol",
      subarea: "create",
      bg: { r: 0, g: 0, b: 150 },
    },
    flow: {
      area: "symbol",
      subarea: "flow",
      bg: { r: 0, g: 0, b: 100 },
    },
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
    clone: {
      area: "symbol",
      subarea: "clone",
      bg: { r: 0, g: 0, b: 25 },
    },
    delete: {
      area: "symbol",
      subarea: "delete",
      bg: { r: 100, g: 0, b: 100 },
    },
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
    track: {
      area: "effect",
      subarea: "track",
      bg: { r: 75, g: 75, b: 0 },
    },
    trigger: {
      area: "effect",
      subarea: "trigger",
      bg: { r: 50, g: 50, b: 0 },
    },
  },
  render: {
    worker: {
      area: "render",
      subarea: "worker",
      bg: { r: 100, g: 50, b: 0 },
    },
    appendChild: {
      area: "render",
      subarea: "appendChild",
      bg: { r: 100, g: 50, b: 0 },
    },
    renderEffect: {
      area: "render",
      subarea: "render effect",
      bg: { r: 100, g: 50, b: 0 },
    },
  },
} as const;

interface TracePhase extends TextFormat {
  area: string;
  subarea: string;
}

let triggerCount = 0;

function shouldTrace(phase: TracePhase) {
  return (
    tracePhases.has(phase.area) ||
    tracePhases.has(phase.area + "." + phase.subarea)
  );
}
export function trace(
  phase: TracePhase,
  cb: () => string,
  triggerIds: Set<number> = new Set(),
) {
  if (!shouldTrace(phase)) {
    return;
  }
  if (triggerIds.size === 0) {
    // not an effect trace.
    const id = triggerCount++;
    triggerIds.add(id);

    if (dids.has(id)) {
      // eslint-disable-next-line no-debugger
      debugger;
    }
  }

  const areaTag = ` ${phase.area + ":" + phase.subarea} `;
  // eslint-disable-next-line no-console
  console.log(
    colorText(areaTag, { ...phase, bold: true }) +
      " " +
      colorText("[" + [...triggerIds].join(",") + "]", {
        fg: { r: 50, g: 50, b: 50 },
      }) +
      " " +
      cb() +
      "\n",
  );
}

export function traceEffect(phase: TracePhase, cb: () => string) {
  if (!shouldTrace(phase)) {
    return;
  }
  let first = true;
  const triggerIds = new Set<number>();

  const runner: ReactiveEffectRunner<void> = effect(
    () => {
      if (first) {
        // just track what we need, don't log.
        cb();
        first = false;
        return;
      }
      trace(phase, cb, triggerIds);
      triggerIds.clear();
    },
    {
      scheduler: scheduler(() => runner, true),
      onTrigger(event) {
        const id = triggerCount++;
        if (dids.has(id)) {
          // eslint-disable-next-line no-debugger
          debugger;
        }
        triggerIds.add(id);
      },
    },
  );
}

interface Color {
  r: number;
  g: number;
  b: number;
}

/** Descriptor for how to format the text */
interface TextFormat {
  fg?: Color; // optional foreground color
  bg?: Color; // optional background color
  bold?: boolean; // optional bold flag
}

/**
 * Wraps `text` in ANSI escape codes according to the given format.
 *
 * @param text  The string to format.
 * @param fmt   Optional formatting descriptor.
 * @returns     The text wrapped in ANSI codes (or unmodified if no styles given).
 */
function colorText(text: string, fmt?: TextFormat): string {
  if (!fmt) return text;

  const codes: string[] = [];

  if (fmt.bold) {
    codes.push("1"); // ANSI code for bold
  }

  if (fmt.fg) {
    const { r, g, b } = fmt.fg;
    codes.push(`38;2;${r};${g};${b}`);
  }

  if (fmt.bg) {
    const { r, g, b } = fmt.bg;
    codes.push(`48;2;${r};${g};${b}`);
  }

  if (codes.length === 0) {
    return text;
  }

  const prefix = `\x1b[${codes.join(";")}m`;
  const reset = `\x1b[0m`;
  return `${prefix}${text}${reset}`;
}

/**
 * Format flag values in a concise way, showing only the flags that are set
 * @param flags The numeric flags value to format
 * @param flagEnum The enum containing flag definitions
 * @returns An array of flag names that are set
 */
function formatFlags<T extends Record<string, string | number>>(
  flags: number,
  flagEnum: T,
): string[] {
  return Object.entries(flagEnum)
    .filter(
      ([name, value]) =>
        typeof value === "number" && value !== 0 && (flags & value) === value,
    )
    .map(([name]) => name);
}

/**
 * Format a symbol name with its ID in a blue-green color
 * @param symbol The symbol to format
 * @returns A formatted string representation of the symbol name with ID
 */
export function formatSymbolName(symbol: OutputSymbol): string {
  return colorText(`Symbol ${symbol.name}[${symbol.id}]`, {
    fg: {
      r: 0,
      b: 150,
      g: 100,
    },
  });
}

export function formatSymbol(symbol: OutputSymbol): string {
  // Base display with name and ID
  let result = formatSymbolName(symbol);

  // Add details on subsequent lines
  const details: string[] = [];

  if (!symbol.binder) {
    details.push(colorText("  !UNBOUND", { fg: { r: 255, g: 0, b: 0 } }));
  }

  // Show only enabled flags
  const flagsInfo = formatFlags(symbol.flags, OutputSymbolFlags);

  if (flagsInfo.length > 0) {
    details.push(`  flags: ${flagsInfo.join(", ")}`);
  }

  // Show scope info with formatted name
  if (symbol.scope) {
    details.push(untrack(() => `  scope: ${formatScopeName(symbol.scope)}`));
  }

  for (const space of symbol.memberSpaces) {
    details.push(untrack(() => formatSpaceSymbols(space)));
  }

  // Show all refkeys with proper formatting
  if (symbol.refkeys && symbol.refkeys.length > 0) {
    details.push(`  refkeys: ${formatRefkeys(symbol.refkeys)}`);
  }

  if (details.length > 0) {
    result += "\n" + details.join("\n");
  }

  return result;
}

export function formatSpaceSymbols(space: OutputSpace) {
  return `  ${space.key} symbols (${space.symbols.size}): ${[...space.symbols].map((s) => s.name).join(", ")}`;
}

export function formatScopeName(scope: OutputScope | undefined): string {
  if (!scope) {
    return "no scope";
  }

  return colorText(`${scope.name}[${scope.id}]`, {
    fg: {
      r: 0,
      g: 150,
      b: 50,
    },
  });
}

export function formatSpaceName(space: OutputSpace): string {
  // avoid instance of checks here in order to not create circular module imports.
  const name =
    "symbol" in space ?
      formatSymbolName((space as OutputMemberSpace).symbol)
    : formatScopeName((space as OutputDeclarationSpace).scope);
  return colorText(`${name}:${space.key}`, {
    fg: {
      r: 0,
      g: 125,
      b: 25,
    },
  });
}

/**
 * Format an OutputScope for display, showing information in a concise format
 * @param scope The scope to format
 * @returns A formatted string representation of the scope
 */
export function formatScope(scope: OutputScope): string {
  if (!scope) {
    return "!Undefined scope!";
  }
  // Base display with name
  let result = colorText(`Scope ${formatScopeName(scope)}`, {
    fg: {
      r: 0,
      b: 200,
      g: 100,
    },
  });

  // Add details on subsequent lines
  const details: string[] = [];

  if (!scope.binder) {
    details.push(colorText("  !UNBOUND", { fg: { r: 255, g: 0, b: 0 } }));
  }
  // Show only enabled flags
  const flagsInfo = formatFlags(scope.flags, OutputScopeFlags);

  if (flagsInfo.length > 0) {
    details.push(`  flags: ${flagsInfo.join(", ")}`);
  }

  // Show parent scope if present
  if (scope.parent) {
    details.push(`  parent: ${formatScopeName(scope.parent)}`);
  }

  // Show child scopes if present
  if (scope.children && scope.children.size > 0) {
    details.push(`  children: ${scope.children.size}`);
  }

  // Show declaration spaces
  for (const space of scope.spaces) {
    details.push(`  ${untrack(() => formatSpaceSymbols(space))}`);
  }

  if (details.length > 0) {
    result += "\n" + details.join("\n");
  }

  return result;
}

export function formatRefkeys(refkeys: Refkey[] | Refkey | undefined) {
  if (!refkeys) {
    return "";
  }

  if (Array.isArray(refkeys)) {
    return refkeys.map(formatRefkey).join(", ");
  }

  return formatRefkey(refkeys);
}

function formatRefkey(refkey: Refkey): string {
  return colorText(`refkey[${refkey.key}]`, {
    fg: {
      r: 150,
      g: 0,
      b: 0,
    },
  });
}
