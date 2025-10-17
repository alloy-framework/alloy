import { ComponentContext, createContext, useContext } from "@alloy-js/core";

/** What kind of reference.
 * - 'standard' Default reference nothing special.
 * - 'attribute' means we are referencing an attribute and so the name should be trimmed of "Attribute" suffix.
 */

export type ReferenceContext = "standard" | "attribute";

/**
 * Provides scopes for instance and static private members.
 */
export const ReferenceContext: ComponentContext<ReferenceContext> =
  createContext<ReferenceContext>();

export function useReferenceContext(): "standard" | "attribute" {
  return useContext(ReferenceContext) ?? "standard";
}
