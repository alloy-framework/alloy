import { Ref, ShallowReactive, shallowRef } from "@vue/reactivity";
import { effect, onCleanup } from "../reactivity.js";
import type { Children, Component } from "../runtime/component.js";
import { OutputSymbol } from "./output-symbol.js";
import { takeSymbols } from "./symbol-flow.js";

export interface SymbolSlot extends Component<{}> {
  /**
   * A ref for the set of symbols taken by this slot. Undefined when the Slot component
   * has not been rendered yet.
   */
  ref: Ref<ShallowReactive<Set<OutputSymbol>> | undefined>;
  /**
   * A ref for the first symbol taken by this slot. Undefined when the Slot component
   * has not been rendered yet or has not taken any symbols.
   */
  firstSymbol: Ref<OutputSymbol | undefined>;

  /**
   * Copy any members from taken symbols to the given symbol.
   */
  copyMembersTo(baseSymbol: OutputSymbol): void;

  /**
   * Move any members from transient taken symbols to the given symbol.
   */
  moveMembersTo(baseSymbol: OutputSymbol): void;
}
/**
 * Create a component which accepts emitted symbols. The returned component has
 * a `ref` property which is a ref to a reactive set of all symbols emitted by
 * children of the component.
 */
export function createSymbolSlot(): SymbolSlot {
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

  Object.defineProperty(SymbolSlot, "firstSymbol", {
    get() {
      const ref = shallowRef();
      effect(
        () => {
          ref.value = symbolSlotRef.value?.values().next().value;
        },
        undefined,
        {
          debug: {
            name: "symbolSlot:firstSymbol",
            type: "symbol",
          },
        },
      );
      return ref;
    },
  });

  SymbolSlot.copyMembersTo = (baseSymbol: OutputSymbol) => {
    effect(
      () => {
        if (!symbolSlotRef.value) {
          return;
        }

        for (const symbol of symbolSlotRef.value) {
          symbol.copyMembersTo(baseSymbol);
        }
      },
      undefined,
      {
        debug: {
          name: "symbolSlot:copyMembers",
          type: "symbol",
        },
      },
    );
  };

  SymbolSlot.moveMembersTo = (baseSymbol: OutputSymbol) => {
    effect(
      () => {
        if (!symbolSlotRef.value) {
          return;
        }
        for (const symbol of symbolSlotRef.value) {
          if (symbol.isTransient) {
            symbol.moveMembersTo(baseSymbol);
          }
        }
      },
      undefined,
      {
        debug: {
          name: "symbolSlot:moveMembers",
          type: "symbol",
        },
      },
    );
  };

  return SymbolSlot as any;
}
