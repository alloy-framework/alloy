import {
  Children,
  ComponentContext,
  createContext,
  effect,
  emitSymbol,
  OutputSymbol,
  Ref,
  ref,
  takeSymbols,
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
  const symbols = ref<Set<OutputSymbol>>(new Set()) as Ref<
    Set<OutputSymbol>,
    Set<OutputSymbol>
  >;

  effect(() => {
    if (symbols.value.size !== 1) return;
    const symbol = Array.from(symbols.value)[0];
    if (!(symbol instanceof NamedTypeSymbol)) return;
    const pointerSymbol = symbol.pointerSymbol;
    if (!pointerSymbol) return;
    emitSymbol(pointerSymbol);
  });

  return (
    <PointerContext.Provider>
      <PointerInner symbols={symbols}>*{props.children}</PointerInner>
    </PointerContext.Provider>
  );
}

function PointerInner(props: {
  symbols: Ref<Set<OutputSymbol>, Set<OutputSymbol>>;
  children: Children;
}) {
  const taken = takeSymbols();
  effect(() => (props.symbols.value = taken));
  return props.children;
}
