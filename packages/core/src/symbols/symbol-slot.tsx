import { Ref, ShallowReactive, shallowRef } from "@vue/reactivity";
import { Children, effect, onCleanup } from "../jsx-runtime.js";
import { OutputSymbol } from "./output-symbol.js";
import { takeSymbols } from "./symbol-flow.js";

export function createSymbolSlot() {
  const symbolSlotRef: Ref<ShallowReactive<Set<OutputSymbol>> | undefined> =
    shallowRef();
  function SymbolSlot(props: { children: Children }) {
    const set = takeSymbols();
    symbolSlotRef.value = set;

    onCleanup(() => {
      symbolSlotRef.value = undefined;
    });

    return props.children;
  }

  SymbolSlot.ref = symbolSlotRef;

  SymbolSlot.instantiateInto = (baseSymbol: OutputSymbol) => {
    effect(() => {
      if (!symbolSlotRef.value) {
        return;
      }

      for (const symbol of symbolSlotRef.value) {
        symbol.instantiateTo(baseSymbol);
      }
    });
  };

  SymbolSlot.copyInto = (baseSymbol: OutputSymbol) => {
    effect(() => {
      if (!symbolSlotRef.value) {
        return;
      }

      for (const symbol of symbolSlotRef.value) {
        symbol.copyTo(baseSymbol);
      }
    });
  };

  return SymbolSlot;
}
