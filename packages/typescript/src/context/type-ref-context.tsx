import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "@alloy-js/core";

interface TypeRefContext {
  /** If in a type context */
  type?: boolean;
}

/**
 * Provides scopes for instance and static private members.
 */
export const TypeRefContext: ComponentContext<TypeRefContext> =
  createNamedContext<TypeRefContext>("@alloy-js/typescript TypeRef");

/**
 * @returns 'true' if in a type context, 'false' if in a value context.
 */
export function isTypeRefContext(): boolean {
  return useContext(TypeRefContext)?.type ?? false;
}
