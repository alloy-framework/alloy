export interface AnnotationProps {
  name: string;
  value?: string; // If one argument, provide this
  arguments?: Map<string, string>; // Arg name to value, provide if many named arguments
}

/**
 * Use an annotation in code, not declaring a new annotation.
 * For instance, use this if you want to annotate a method with '@Override'.
 */
export function Annotation(props: AnnotationProps) {
  const args = props.value ? `(${props.value})` :  props.arguments ? `(${Array.from(props.arguments).map(([k, v]) => `${k} = ${v}`).join(', ')})` : '';

  return `@${props.name}${args}`
}