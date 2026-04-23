import { ComponentContext, createContext, useContext } from "@alloy-js/core";

/**
 * Context for tracking whether we are in a type annotation position.
 * Used to determine if imports should be guarded with TYPE_CHECKING.
 *
 * @internal Use the TypeRefContext component instead.
 */
export const TypeRefContextDef: ComponentContext<true> = createContext<true>();

/**
 * @returns 'true' if in a type context, 'false' if in a value context.
 */
export function isTypeRefContext(): boolean {
  return useContext(TypeRefContextDef) === true;
}
