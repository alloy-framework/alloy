import { Block, BlockProps, Scope, ScopeProps } from "@alloy-js/core";

export interface BlockScopeProps extends BlockProps, ScopeProps {}

export function BlockScope(props: BlockScopeProps) {
  return (
    <Scope {...props}>
      <Block {...props}>{props.children}</Block>
    </Scope>
  );
}
