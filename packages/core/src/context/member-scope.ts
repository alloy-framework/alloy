import type { ComponentContext } from "../context.js";
import { createNamedContext, useContext } from "../context.js";
import type { OutputSymbol } from "../symbols/output-symbol.js";

/**
 * The member context provides the symbol upon which new member symbols
 * should be created.
 */
export interface MemberContext {
  ownerSymbol: OutputSymbol;
}

export const MemberContext: ComponentContext<MemberContext> =
  createNamedContext("MemberContext");

export function useMemberContext() {
  return useContext(MemberContext);
}
