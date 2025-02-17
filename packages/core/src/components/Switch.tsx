import { Children, memo, taggedComponent } from "@alloy-js/core/jsx-runtime";
import { childrenArray, findKeyedChildren } from "../utils.js";

export interface SwitchProps {
  children: Children;
}

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
  when?: boolean;
  else?: boolean;
  children: Children;
}
export const matchTag = Symbol();
export const Match = taggedComponent(matchTag, (props: MatchProps) => {
  return () => (props.when ? props.children : undefined);
});
