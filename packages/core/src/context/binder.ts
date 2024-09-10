import { Binder } from "../binder.js";
import { ComponentContext, createContext, useContext } from "../context.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Output } from "../components/Output.js";

/**
 * The binder context provides the binder instance to all components. This
 * context is provided by the {@link Output | output component}.
 */
export const BinderContext: ComponentContext<Binder> = createContext();

export function useBinder() {
  return useContext(BinderContext)!;
}
