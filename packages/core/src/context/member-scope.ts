import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";
import { OutputSymbol } from "../symbols/output-symbol.js";

/**
 * The member scope context provides the symbol upon which new member symbols
 * should be created.
 */
export interface MemberScopeContext {
  ownerSymbol: OutputSymbol;
}

export const MemberScopeContext: ComponentContext<MemberScopeContext> =
  createNamedContext("MemberScope");

export function useMemberScope() {
  return useContext(MemberScopeContext);
}
