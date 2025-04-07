import { Children, SourceFile as CoreSourceFile, List } from "@alloy-js/core";
import { Link } from "./Link.jsx";

export interface SourceFileProps {
  path: string;
  children: Children;
}
export function SourceFile(props: SourceFileProps) {
  return (
    <CoreSourceFile path={props.path} filetype="md" reference={Link}>
      <List doubleHardline>{props.children}</List>
    </CoreSourceFile>
  );
}
