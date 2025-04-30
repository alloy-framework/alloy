import { getContext, onCleanup, untrack } from "@alloy-js/core/jsx-runtime";
import { effect, Ref, shallowRef } from "@vue/reactivity";
import { OutputSymbol } from "./binder.js";
import { MemberScopeContext, ScopeContext } from "./index.browser.js";

export interface TakeSymbolCallback {
  (symbol: OutputSymbol): void;
}

export function takeSymbol(cb: TakeSymbolCallback) {
  const context = getContext();
  context!.takesSymbols = true;
  context!.takenSymbols.value = new Set();
  effect(() => {
    const firstSymbol = context!.takenSymbols.value!.values().next().value;
    if (firstSymbol !== undefined) {
      cb(firstSymbol);
    }
  });
}

export interface TakeSymbolsCallback {
  (symbols: OutputSymbol[]): void;
}

export function takeSymbols(cb: TakeSymbolsCallback) {
  const context = getContext();
  context!.takesSymbols = true;
  effect(() => {
    const takenSymbols = untrack(() => {
      return context!.takenSymbols.value;
    });

    if (!takenSymbols || takenSymbols.size === 0) {
      cb([]);
      return;
    }
    const symbols = Array.from(takenSymbols);
    cb(symbols);
  });
}

export function emitSymbol(symbol: OutputSymbol) {
  let context = getContext()!.owner;
  while (context) {
    if (context.takesSymbols) {
      context.takenSymbols.value!.add(symbol);
      onCleanup(() => {
        context!.takenSymbols.value!.delete(symbol);
      });
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
}

export interface MergeTakenSymbolsOptions {
  /**
   * Only merge the first taken symbol.
   */
  first?: boolean;
}

export function mergeTakenSymbolsWith(
  baseSymbol: OutputSymbol,
  options?: MergeTakenSymbolsOptions,
) {
  const symbolRef = shallowRef() as Ref<OutputSymbol>;
  takeSymbols((symbols) => {
    console.log("Taken symbols updated", symbols);
    const firstSymbol = baseSymbol;
    const binder = firstSymbol.binder;
    symbolRef.value = binder.mergeSymbols([baseSymbol, ...symbols]);
  });
  return symbolRef;
}
