import { Children, For, Indent } from "@alloy-js/core";

export interface DecoratorApplicationProps {
  /** The decorator name or a Reference to a decorator symbol. */
  decorator: Children;

  /** Arguments to pass to the decorator. */
  args?: Children[];
}

/**
 * Renders a TypeSpec decorator application.
 *
 * @example
 * ```tsx
 * <DecoratorApplication decorator="doc" args={['"A pet model"']} />
 * <ModelDeclaration name="Pet" />
 * ```
 * This will produce:
 * ```typespec
 * @doc("A pet model")
 * model Pet {}
 * ```
 */
export function DecoratorApplication(props: DecoratorApplicationProps) {
  return (
    <>
      <group>
        @{props.decorator}
        {props.args && props.args.length > 0 && (
          <>
            (
            <Indent softline trailingBreak>
              <For each={props.args} comma line>
                {(arg) => arg}
              </For>
            </Indent>
            )
          </>
        )}
      </group>
      <hbr />
    </>
  );
}
