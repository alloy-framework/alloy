import { Children, List, Show } from "@alloy-js/core";

export interface ExtendsClauseProps {
  extends: Children[] | undefined;
}

export function ExtendsClause(props: ExtendsClauseProps) {
  return (
    <Show when={props.extends !== undefined && props.extends.length > 0}>
      <indent>
        <br />
        extends <List children={props.extends} comma space />
      </indent>
    </Show>
  );
}
