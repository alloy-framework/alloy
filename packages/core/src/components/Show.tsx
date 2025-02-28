import { Children } from "@alloy-js/core/jsx-runtime";

export interface ShowProps {
  children: Children;
  fallback?: Children;
  when: boolean | undefined | null;
}

export function Show(props: ShowProps) {
  return () => (props.when ? props.children : props.fallback);
}
