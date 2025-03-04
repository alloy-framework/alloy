import { Children, List, Show } from "@alloy-js/core";

export interface ImplementsClauseProps {
  interfaces: Children[] | undefined;
}

/**
 * The implements clause for a class, interface, or enum.
 */
export function ImplementsClause(props: ImplementsClauseProps) {
  return (
    <Show when={props.interfaces !== undefined && props.interfaces.length > 0}>
      <indent>
        <br />
        implements <List children={props.interfaces} comma space />
      </indent>
    </Show>
  );
}
