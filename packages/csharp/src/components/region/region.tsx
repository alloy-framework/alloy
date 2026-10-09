import type { Children } from "@alloy-js/core";
import { code, List } from "@alloy-js/core";

export interface RegionProps {
  name: string;
  children: Children;
}

export function Region(props: RegionProps) {
  return (
    <List>
      {code`#region ${props.name}`}
      {props.children}
      {code`#endregion`}
    </List>
  );
}
