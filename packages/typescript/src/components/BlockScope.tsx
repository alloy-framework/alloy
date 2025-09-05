import {
  Block,
  BlockProps,
  ScopePropsWithInfo,
  ScopePropsWithValue,
} from "@alloy-js/core";
import { LexicalScope } from "./LexicalScope.jsx";

export interface BlockScopePropsWithScopeValue
  extends ScopePropsWithValue,
    BlockProps {}
export interface BlockScopePropsWithScopeInfo
  extends ScopePropsWithInfo,
    BlockProps {}

export type BlockScopeProps =
  | BlockScopePropsWithScopeValue
  | BlockScopePropsWithScopeInfo;

/**
 * Create a TypeScript block which includes a scope for any nested declarations.
 * Can either provide the scope directly via the `value` prop, or else provide
 * information about the scope.
 */
export function BlockScope(props: BlockScopeProps) {
  return (
    <LexicalScope {...props}>
      <Block {...props}>{props.children}</Block>
    </LexicalScope>
  );
}
