import { BinderContext, createOutputBinder } from "../binder.js";
import { Children } from "../jsx-runtime.js";

export interface OutputProps {
  children?: Children
}

export function Output({ children }: OutputProps) {
  const binder = createOutputBinder();
  return <BinderContext.Provider value={binder}>
    {children}
  </BinderContext.Provider>
}
