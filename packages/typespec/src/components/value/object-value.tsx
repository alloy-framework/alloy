import { Block, Children } from "@alloy-js/core";

export interface ObjectValueProps {
  /** The object value body (key-value pairs). */
  children: Children;
}

/**
 * A TypeSpec object value expression (`#{ ... }`).
 *
 * @example
 * ```tsx
 * <ObjectValue>
 *   <List comma hardline enderPunctuation>
 *     <ObjectValueProperty name="x" value="0" />
 *     <ObjectValueProperty name="y" value="0" />
 *   </List>
 * </ObjectValue>
 * ```
 * This will produce:
 * ```typespec
 * #{
 *   x: 0,
 *   y: 0,
 * }
 * ```
 */
export function ObjectValue(props: ObjectValueProps) {
  return <Block opener="#{">{props.children}</Block>;
}

export interface ObjectValuePropertyProps {
  /** The property name. */
  name: string;
  /** The property value. */
  value: Children;
}

/**
 * A property inside an {@link ObjectValue}.
 *
 * @example
 * ```tsx
 * <ObjectValueProperty name="x" value="0" />
 * ```
 * This will produce:
 * ```typespec
 * x: 0
 * ```
 */
export function ObjectValueProperty(props: ObjectValuePropertyProps) {
  return <>{props.name}: {props.value}</>;
}
