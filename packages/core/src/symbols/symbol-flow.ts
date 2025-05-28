import { isRef, Ref, shallowReactive } from "@vue/reactivity";
import { Context, effect, getContext, onCleanup } from "../reactivity.js";

import { MemberScopeContext } from "../context/member-scope.js";
import { ScopeContext } from "../context/scope.js";
import { OutputSymbolFlags } from "./flags.js";
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
    effect<Set<OutputSymbol>>((oldSymbols) => {
      for (const symbol of context.takenSymbols!) {
        if (oldSymbols && oldSymbols.has(symbol)) {
          continue;
        }
        cb(symbol);
      }

      return new Set(context.takenSymbols!);
    });
  }
  return context.takenSymbols;
}

export function emitSymbol(
  symbol: OutputSymbol | Ref<OutputSymbol | undefined>,
) {
  let symbolTaker: Context | undefined;
  let context = getContext()!.owner;
  while (context) {
    if (context.takesSymbols) {
      symbolTaker = context;
      break;
    }

    if (
      context.context &&
      (context.context[ScopeContext.id] ||
        context.context[MemberScopeContext.id])
    ) {
      // don't cross scope boundaries.
      break;
    }

    context = context.owner;
  }

  if (!symbolTaker) {
    return;
  }

  if (isRef(symbol)) {
    effect<OutputSymbol | undefined>((prevSymbol) => {
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
    });
  } else {
    symbolTaker.takenSymbols!.add(symbol);
    onCleanup(() => {
      context!.takenSymbols!.delete(symbol);
    });
  }
}

export function moveTakenMembersTo(baseSymbol: OutputSymbol) {
  const taken = takeSymbols();

  effect(() => {
    for (const symbol of taken) {
      if (symbol.flags & OutputSymbolFlags.Transient) {
        symbol.moveTo(baseSymbol);
      }
    }
  });
}

export function instantiateTakenMembersTo(baseSymbol: OutputSymbol) {
  takeSymbols((symbol) => symbol.instantiateTo(baseSymbol));
}
