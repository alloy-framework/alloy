import type { Binder } from "../binder.js";
import {
  type ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Output } from "../components/Output.js";

/**
 * The binder context provides the binder instance to all components. This
 * context is provided by the {@link Output | output component}.
 */
export const BinderContext: ComponentContext<Binder> =
  createNamedContext("Binder");

export function useBinder() {
  return useContext(BinderContext);
}
