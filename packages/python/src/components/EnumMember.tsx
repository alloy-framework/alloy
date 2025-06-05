import { Children, Show } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";

export interface EnumMemberProps {
  /**
   * The name of the enum member.
   */
  name: string;

  /**
   * The value of the enum member.
   */
  value?: Children;

  /**
   * Functional mappings/list
   */
  functional?: boolean;
}

/**
 * A Python enum member.
 */
export function EnumMember(props: EnumMemberProps) {
  const name = usePythonNamePolicy().getName(props.name, "class");
  if (props.functional) {
    return (
      <>
        '{name}'<Show when={props.value !== undefined}> : {props.value}</Show>
      </>
    );
  }
  return (
    <>
      {props.name}
      <Show when={props.value !== undefined}> = {props.value}</Show>
    </>
  );
}
