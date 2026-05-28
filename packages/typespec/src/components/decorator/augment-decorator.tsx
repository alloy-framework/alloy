import { Children, For, Indent } from "@alloy-js/core";

export interface AugmentDecoratorProps {
  /** The decorator name or a Reference to a decorator symbol. */
  decorator: Children;

  /** The target type/member to apply the decorator to. */
  target: Children;

  /** Additional arguments to pass to the decorator. */
  args?: Children[];
}

/**
 * Renders a TypeSpec augment decorator statement.
 *
 * @example
 * ```tsx
 * <AugmentDecorator decorator="tag" target="Dog" args={['"Sample"']} />
 * ```
 * This will produce:
 * ```typespec
 * @@tag(Dog, "Sample");
 * ```
 */
export function AugmentDecorator(props: AugmentDecoratorProps) {
  const allArgs = () => {
    const result: Children[] = [props.target];
    if (props.args && props.args.length > 0) {
      result.push(...props.args);
    }
    return result;
  };

  return (
    <group>
      @@{props.decorator}(
      <Indent softline trailingBreak>
        <For each={allArgs()} comma line>
          {(arg) => arg}
        </For>
      </Indent>
      )
    </group>
  );
}
