import { Match, Switch } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { NamedArgumentList } from "./NamedArgumentList.jsx";

export interface AnnotationProps {
  type: Children;
  value?: Record<string, Children>; // Either single value or named values if many
}

/**
 * Use an annotation in code, not declaring a new annotation.
 * For instance, use this if you want to annotate a method with '\@Override'.
 */
export function Annotation(props: AnnotationProps) {
  return (
    <>
      @{props.type}
      <Switch>
        <Match
          when={
            props.value &&
            Object.keys(props.value).length === 1 &&
            "value" in props.value
          }
        >
          ({props.value!["value"]})
        </Match>
        <Match when={!!props.value}>
          <NamedArgumentList args={props.value!} />
        </Match>
      </Switch>
    </>
  );
}
