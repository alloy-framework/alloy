import { Children, memo, taggedComponent } from "@alloy-js/core/jsx-runtime";
import { childrenArray, findKeyedChildren } from "../utils.js";

export interface SwitchProps {
  children: Children;
}

/**
 * Conditionally render blocks of content based on the `when` prop of nested
 * {@link Match} components.
 *
 * @example
 *
 * ```tsx
 * <Switch>
 *   <Match when={someCondition}>
 *     <div>Condition met!</div>
 *   </Match>
 *   <Match else>
 *     <div>Condition not met!</div>
 *   </Match>
 * </Switch>
 * ```
 */
export function Switch(props: SwitchProps) {
  const children = childrenArray(() => props.children);
  const matches = findKeyedChildren(children, matchTag);

  return memo(() => {
    for (const match of matches) {
      if (match.props.when || match.props.else) {
        return match.props.children;
      }
    }

    return undefined;
  });
}

export interface MatchProps {
  /**
   * Condition under which the children of this element will be rendered.
   */
  when?: boolean;

  /**
   * If no `when` is matched, the children of this element will be rendered.
   * The `else` match must be placed last.
   */
  else?: boolean;
  children: Children;
}

export const matchTag = Symbol();

/**
 * The Match component is used inside of a {@link Switch} component to
 * define conditionally rendered blocks of content.
 */
export const Match = taggedComponent(matchTag, (props: MatchProps) => {
  return () => (props.when ? props.children : undefined);
});
