import {
  Children,
  ComponentContext,
  createContext,
  createSymbolSlot,
  effect,
  emitSymbol,
} from "@alloy-js/core";
import { NamedTypeSymbol } from "../../symbols/named-type.js";

export interface PointerProps {
  children: Children;
}

const PointerContext: ComponentContext<never> = createContext();

/**
 * A Go pointer type that wraps the given type.
 */
export function Pointer(props: PointerProps) {
  const SymbolSlot = createSymbolSlot();

  effect(() => {
    const symbols = SymbolSlot.ref.value;
    if (symbols?.size !== 1) return;
    const symbol = Array.from(symbols)[0];
    if (!(symbol instanceof NamedTypeSymbol)) return;
    const pointerSymbol = symbol.pointerSymbol;
    if (!pointerSymbol) return;
    emitSymbol(pointerSymbol);
  });

  return (
    <PointerContext.Provider>
      <SymbolSlot>*{props.children}</SymbolSlot>
    </PointerContext.Provider>
  );
}
