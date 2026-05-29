import { Children, List } from "@alloy-js/core";

export interface ArrayValueProps {
  /** The array items. */
  values: Children[];
}

/**
 * A TypeSpec array value expression (`#[...]`).
 *
 * @example
 * ```tsx
 * <ArrayValue values={['"one"', '"two"', '"three"']} />
 * ```
 * This will produce:
 * ```typespec
 * #["one", "two", "three"]
 * ```
 */
export function ArrayValue(props: ArrayValueProps) {
  return (
    <>
      #[<List joiner=", ">{props.values}</List>]
    </>
  );
}
