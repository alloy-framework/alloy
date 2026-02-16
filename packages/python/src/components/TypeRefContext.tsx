import type { Children } from "@alloy-js/core";
import {
  isTypeRefContext,
  TypeRefContextDef,
} from "../context/type-ref-context.js";

// Re-export for external use
export { isTypeRefContext };

export interface TypeRefContextProps {
  /**
   * Children
   */
  children: Children;
}

/**
 * Set the current context of reference to be type reference.
 *
 * @remarks
 * References used inside the children of this component will be treated as
 * type-only references. When a symbol is only referenced in type contexts,
 * it will be imported inside a `if TYPE_CHECKING:` block.
 *
 * @example
 * ```tsx
 * <TypeRefContext>
 *   {someTypeRefkey}
 * </TypeRefContext>
 * ```
 */
export const TypeRefContext = ({ children }: TypeRefContextProps) => {
  return (
    <TypeRefContextDef.Provider value>{children}</TypeRefContextDef.Provider>
  );
};
