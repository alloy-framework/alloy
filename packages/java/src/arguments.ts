import { Children, mapJoin } from "@alloy-js/core";

/**
 * Collect a set of arguments to be passed to a method, class init.
 * Can take single child, or array of children
 *
 * @param args - Children to collect
 */
export function collectArguments(args: Children): Children {
  return Array.isArray(args) ?
      mapJoin(args, (val) => val, { joiner: ", " })
    : args;
}

/**
 * Collect a set of named arguments. Will pass to object as named arguments.
 *
 * @param args -  of name to argument value
 */
export function collectNamedArguments(
  args: Record<string, Children>,
): Children {
  return mapJoin(
    new Map(Object.entries(args)),
    (key, value) => {
      return [key, " = ", value];
    },
    { joiner: ", " },
  );
}
