import { Children } from "../jsx-runtime.js";

export interface ShowProps {
  children: Children;
  fallback?: Children;
  when: boolean | undefined | null;
}

export function Show(props: ShowProps) {
  return () => (props.when ? props.children : props.fallback);
}
