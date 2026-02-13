import { isRef, Ref } from "@vue/reactivity";
import {
  Context,
  effect,
  getContext,
  onCleanup,
  shallowReactive,
} from "../reactivity.js";

import { MemberContext } from "../context/member-scope.js";
import { ScopeContext } from "../context/scope.js";
import { debug, TracePhase } from "../debug/index.js";
import { formatSymbolName } from "../tracer.js";
import { OutputSymbol } from "./output-symbol.js";

export interface TakeSymbolCallback {
  (symbol: OutputSymbol): void;
}

export interface TakeSymbolsCallback {
  (symbols: Set<OutputSymbol>): void;
}

export function takeSymbols(cb?: (symbol: OutputSymbol) => void) {
  const context = getContext()!;
  context.takesSymbols = true;
  context.takenSymbols = shallowReactive(new Set<OutputSymbol>());
  if (cb) {
    effect<Set<OutputSymbol>>(
      (oldSymbols) => {
        for (const symbol of context.takenSymbols!) {
          if (oldSymbols && oldSymbols.has(symbol)) {
            continue;
          }
          cb(symbol);
        }

        return new Set(context.takenSymbols!);
      },
      undefined,
      {
        debug: {
          name: "symbolFlow:takeSymbols",
          type: "symbol",
        },
      },
    );
  }
  return context.takenSymbols;
}

export function emitSymbol(
  symbol: OutputSymbol | Ref<OutputSymbol | undefined>,
) {
  if (isRef(symbol)) {
    debug.trace(TracePhase.symbol.flow, () => `Emitting ref to symbol`);
  } else {
    debug.trace(
      TracePhase.symbol.flow,
      () => `Emitting symbol ${formatSymbolName(symbol)}`,
    );
  }

  let symbolTaker: Context | undefined;
  let context = getContext()!.owner;
  while (context) {
    if (context.takesSymbols) {
      symbolTaker = context;
      break;
    }

    if (
      context.context &&
      (context.context[ScopeContext.id] || context.context[MemberContext.id])
    ) {
      // don't cross scope boundaries.
      debug.trace(
        TracePhase.symbol.flow,
        () => `Not emitting symbol across scope boundary`,
      );
      break;
    }

    context = context.owner;
  }

  if (!symbolTaker) {
    debug.trace(
      TracePhase.symbol.flow,
      () => `No symbol taker found, not emitting`,
    );
    return;
  }

  if (isRef(symbol)) {
    effect<OutputSymbol | undefined>(
      (prevSymbol) => {
        onCleanup(() => {
          if (symbol.value) {
            symbolTaker.takenSymbols!.delete(symbol.value);
          }
        });
        if (symbol.value === undefined) {
          symbolTaker.takenSymbols!.delete(prevSymbol!);
          return undefined;
        } else {
          symbolTaker.takenSymbols!.add(symbol.value);
          return symbol.value;
        }
      },
      undefined,
      {
        debug: {
          name: "symbolFlow:emitRef",
          type: "symbol",
        },
      },
    );
  } else {
    debug.trace(
      TracePhase.symbol.flow,
      () =>
        `Emitting symbol ${formatSymbolName(symbol)} taken by ${symbolTaker.componentOwner?.name ?? "unknown component"}`,
    );
    symbolTaker.takenSymbols!.add(symbol);
    onCleanup(() => {
      context!.takenSymbols!.delete(symbol);
    });
  }
}

export function moveTakenMembersTo(baseSymbol: OutputSymbol) {
  const taken = takeSymbols();
  effect(
    () => {
      for (const symbol of taken) {
        if (symbol.isTransient) {
          symbol.moveMembersTo(baseSymbol);
        }

        for (const refkey of symbol.refkeys) {
          if (!baseSymbol.refkeys.includes(refkey)) {
            baseSymbol.refkeys.push(refkey);
          }
        }
      }
    },
    undefined,
    {
      debug: {
        name: "symbolFlow:moveTakenMembers",
        type: "symbol",
      },
    },
  );
}

export function instantiateTakenMembersTo(
  baseSymbol: OutputSymbol,
  toSpaceKey: string,
  fromSpaceKey: string,
) {
  takeSymbols((symbol) => {
    baseSymbol.type = symbol;
  });
}
