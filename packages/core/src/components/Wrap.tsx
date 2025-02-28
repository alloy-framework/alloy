import { Children, ComponentDefinition } from "@alloy-js/core/jsx-runtime";

export interface WrapProps<TProps> {
  when: boolean;
  children: Children;
  with: ComponentDefinition<TProps>;
  props?: TProps;
}

export function Wrap<TProps>(props: WrapProps<TProps>) {
  const Wrapper = props.with as any;
  return props.when ?
      <Wrapper {...(props.props ?? {})}>{props.children}</Wrapper>
    : props.children;
}
