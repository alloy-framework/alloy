import { code, mapJoin, Refkey, refkey } from "@alloy-js/core";
import { Reference } from "./Reference.js";
import { Child, Children } from "@alloy-js/core/jsx-runtime";
import { collectNamedArguments } from "../arguments.js";

export interface AnnotationProps {
  type: Child;
  value?: Child; // If one argument, provide this
  arguments?: Record<string, Child>; // Arg name to value, provide if many named arguments
}

/**
 * Use an annotation in code, not declaring a new annotation.
 * For instance, use this if you want to annotate a method with '@Override'.
 */
export function Annotation(props: AnnotationProps) {
  const args = props.value ? props.value : props.arguments ? collectNamedArguments(props.arguments) : '';
  const supplyingArgs = props.arguments || props.value ? code`(${args})` : '';
  return code`@${props.type}${supplyingArgs}`
}