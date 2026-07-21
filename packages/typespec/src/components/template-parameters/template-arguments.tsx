import { Children, For, Indent } from "@alloy-js/core";

/**
 * Descriptor for a single template argument at a usage site.
 * Can be positional (just a value) or named (`Name = Value`).
 */
export interface TemplateArgumentDescriptor {
  /** The parameter name for named arguments (e.g. `B` in `B = boolean`). */
  name?: string;
  /** The argument value (type expression). */
  value: Children;
}

export interface TemplateArgumentsProps {
  /** Template arguments, either as raw Children (positional) or descriptors. */
  args: (Children | TemplateArgumentDescriptor)[];
}

/**
 * Renders template arguments at a type usage site.
 * Supports both positional and named arguments.
 *
 * @example
 * ```tsx
 * <TemplateArguments args={["string", { name: "B", value: "boolean" }]} />
 * // renders: <string, B = boolean>
 * ```
 */
export function TemplateArguments(props: TemplateArgumentsProps) {
  const args = normalizeArgs(props.args);

  return (
    <>
      {"<"}
      <group>
        <Indent softline>
          <For each={args} comma line>
            {(arg) => <TemplateArgument {...arg} />}
          </For>
        </Indent>
      </group>
      {">"}
    </>
  );
}

function TemplateArgument(props: TemplateArgumentDescriptor) {
  return (
    <>
      {props.name && <>{props.name} = </>}
      {props.value}
    </>
  );
}

function normalizeArgs(
  args: (Children | TemplateArgumentDescriptor)[],
): TemplateArgumentDescriptor[] {
  return args.map((arg) => {
    if (isDescriptor(arg)) {
      return arg;
    }
    return { value: arg };
  });
}

function isDescriptor(
  arg: Children | TemplateArgumentDescriptor,
): arg is TemplateArgumentDescriptor {
  return (
    arg !== null &&
    typeof arg === "object" &&
    !Array.isArray(arg) &&
    "value" in arg
  );
}
