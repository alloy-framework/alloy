import { code } from "@alloy-js/core";
import { Child } from "@alloy-js/core/jsx-runtime";
import { collectNamedArguments } from "../arguments.js";

export interface AnnotationProps {
  type: Child;
  value?: Record<string, Child>; // Either single value or named values if many
}

/**
 * Use an annotation in code, not declaring a new annotation.
 * For instance, use this if you want to annotate a method with '@Override'.
 */
export function Annotation(props: AnnotationProps) {
  const args = props.value
    ? Object.keys(props.value).length === 1
      ? Object.values(props.value)[0]
      : collectNamedArguments(props.value as Record<string, Child>)
    : "";
  const supplyingArgs = props.value ? code`(${args})` : "";
  return code`@${props.type}${supplyingArgs}`;
}
