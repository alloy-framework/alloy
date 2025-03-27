import {
  Children,
  isRefkey,
  OutputSymbol,
  Refkey,
  useBinder,
} from "@alloy-js/core";

/**
 * Common props shared by both variants
 */
export interface CommonMemberExpressionProps {
  /**
   * Whether this member can be null or undefined
   * This is used to determine if the member access should be optional
   * (e.g., `?.`) or not.
   * @default false
   */
  nullish?: boolean;
}

/**
 * Props variant using Refkey
 */
export interface IdPropsWithRefkey extends CommonMemberExpressionProps {
  /**
   * The refkey of the member being accessed
   * This is used to look up the symbol in the binder.
   * @see {@link useBinder}
   */
  refkey: Refkey;
}

/**
 * Props variant using OutputSymbol
 */
export interface IdPropsWithSymbol extends CommonMemberExpressionProps {
  /**
   * The symbol of the member being accessed
   */
  symbol: OutputSymbol;
}

/**
 * Props for the MemberIdentifier component
 */
export type MemberIdentifierProps = IdPropsWithRefkey | IdPropsWithSymbol;

export function MemberIdentifier(props: IdPropsWithRefkey): Children;
export function MemberIdentifier(props: IdPropsWithSymbol): Children;
export function MemberIdentifier(props: MemberIdentifierProps) {
  if (isMemberIdentifierWithRefkey(props)) {
    const binder = useBinder();
    const sym = binder.getSymbolForRefkey(props.refkey);
    return () => sym?.name;
  } else {
    return () => props.symbol.name;
  }
}

/**
 * Type guard to distinguish between props variants
 */
function isMemberIdentifierWithRefkey(props: any): props is IdPropsWithRefkey {
  return isRefkey(props.refkey);
}
