import { Children, ComponentDefinition } from "@alloy-js/core/jsx-runtime";

export interface WrapProps<TProps> {
  /**
   * When true, the children will be wrapped with the provided component.
   * Otherwise, the children will be rendered as is.
   */
  when: boolean;

  /** Children to be wrapped. */
  children: Children;

  /** Component to be used for wrapping. */
  with: ComponentDefinition<TProps>;

  /** Props to pass to the wrapper component. */
  props?: TProps;
}

/**
 * Conditionally wrap the children of this component with the component given to
 * `with` and passing `props` to it.
 */
export function Wrap<TProps>(props: WrapProps<TProps>) {
  const Wrapper = props.with as any;
  return props.when ?
      <Wrapper {...(props.props ?? {})}>{props.children}</Wrapper>
    : props.children;
}
