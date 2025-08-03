import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";
import { OutputSymbol } from "../symbols/output-symbol.js";

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
