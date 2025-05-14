import {
  Context,
  effect,
  getContext,
  onCleanup,
} from "@alloy-js/core/jsx-runtime";
import { isRef, Ref, shallowReactive } from "@vue/reactivity";
import { MemberScopeContext, ScopeContext } from "../index.browser.js";
import { OutputSymbol, OutputSymbolFlags } from "./output-symbol.js";

export interface TakeSymbolCallback {
  (symbol: OutputSymbol): void;
}

export interface TakeSymbolsCallback {
  (symbols: Set<OutputSymbol>): void;
}

export function takeSymbols() {
  const context = getContext()!;
  context.takesSymbols = true;
  context.takenSymbols = shallowReactive(new Set<OutputSymbol>());
  return context.takenSymbols;
}

export function emitSymbol(
  symbol: OutputSymbol | Ref<OutputSymbol | undefined>,
) {
  let ownerContext: Context | undefined;
  let context = getContext()!.owner;
  while (context) {
    if (context.takesSymbols) {
      ownerContext = context;
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

  if (!ownerContext) {
    return;
  }

  if (isRef(symbol)) {
    effect<OutputSymbol | undefined>((prevSymbol) => {
      onCleanup(() => {
        if (symbol.value) {
          ownerContext.takenSymbols!.delete(symbol.value);
        }
      });
      if (symbol.value === undefined) {
        ownerContext.takenSymbols!.delete(prevSymbol!);
        return undefined;
      } else {
        ownerContext.takenSymbols!.add(symbol.value);
        return symbol.value;
      }
    });
  } else {
    ownerContext.takenSymbols!.add(symbol);
    onCleanup(() => {
      context!.takenSymbols!.delete(symbol);
    });
  }
}

export function moveTakenMembersTo(baseSymbol: OutputSymbol) {
  const taken = takeSymbols();

  effect(() => {
    for (const symbol of taken) {
      if (symbol.staticMemberScope) {
        baseSymbol.flags |= OutputSymbolFlags.StaticMemberContainer;
        baseSymbol.staticMemberScope!.moveSymbolsFrom(symbol.staticMemberScope);
      }

      if (symbol.instanceMemberScope) {
        baseSymbol.flags |= OutputSymbolFlags.InstanceMemberContainer;
        baseSymbol.instanceMemberScope!.moveSymbolsFrom(
          symbol.instanceMemberScope,
        );
      }
    }
  });
}
