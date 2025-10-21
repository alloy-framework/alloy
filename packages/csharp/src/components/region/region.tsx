import { Children, code, List } from "@alloy-js/core";

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
