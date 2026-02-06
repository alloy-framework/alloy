import { effect } from "@vue/reactivity";
import {
  debug,
  isConsoleTraceEnabled,
  type TracePhaseInfo,
} from "./debug/index.js";
import { colorText, parseBreakOnIds } from "./debug/trace.js";
import { untrack } from "./reactivity.js";
import { inspectRefkey, type Refkey } from "./refkey.js";
import { scheduler } from "./scheduler.js";
import { type OutputScope } from "./symbols/output-scope.js";
import type {
  OutputDeclarationSpace,
  OutputMemberSpace,
} from "./symbols/output-space.js";
import { type OutputSymbol } from "./symbols/output-symbol.js";
import { SymbolTable } from "./symbols/symbol-table.js";

const dids = parseBreakOnIds();

let triggerCount = 0;

export function traceEffect(phase: TracePhaseInfo, cb: () => string) {
  if (!isConsoleTraceEnabled(phase.area) && !isConsoleTraceEnabled(phase.area + "." + phase.subarea)) return;
  let first = true;
  const triggerIds = new Set<number>();

  effect(
    () => {
      if (first) {
        // just track what we need, don't log.
        cb();
        first = false;
        return;
      }
      debug.trace(phase, cb, triggerIds);
      triggerIds.clear();
    },
    {
      scheduler: scheduler(true),
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

  // Show scope info with formatted name
  if (symbol.scope) {
    details.push(untrack(() => `  scope: ${formatScopeName(symbol.scope)}`));
  }

  for (const space of symbol.memberSpaces) {
    details.push(untrack(() => formatSpaceSymbols(space)));
  }

  if (symbol.ownerSymbol) {
    details.push(
      untrack(() => `  ownerSymbol: ${formatSymbolName(symbol.ownerSymbol!)}`),
    );
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

export function formatSpaceSymbols(space: SymbolTable) {
  return `  ${space.key} symbols (${space.size}): ${[...space].map((s) => s.name).join(", ")}`;
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

export function formatSymbolTableName(table: SymbolTable): string {
  // avoid instance of checks here in order to not create circular module imports.
  const name =
    "symbol" in table ?
      formatSymbolName((table as OutputMemberSpace).symbol)
    : formatScopeName((table as OutputDeclarationSpace).scope);
  return colorText(`${name}:${table.key}`, {
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
  const text = inspectRefkey(refkey);

  return colorText(text, {
    fg: {
      r: 150,
      g: 0,
      b: 0,
    },
  });
}
