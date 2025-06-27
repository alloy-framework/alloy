import {
  Children,
  findKeyedChildren,
  For,
  Indent,
  taggedComponent,
} from "@alloy-js/core";

export interface AttributeItem {
  name: string;
  args?: string[];
}

export interface AttributeListProps {
  attributes?: Children[];
  children?: Children[];
}

/**
 * Render each attributes in a new line.
 */
export function AttributeList(props: AttributeListProps) {
  const attributes =
    props.attributes ??
    (props.children && findKeyedChildren(props.children, Attribute.tag));

  if (!attributes) {
    return null;
  }

  return (
    <>
      <For each={attributes} line>
        {(arg) => arg}
      </For>
      {attributes && attributes.length > 0 && <hbr />}
    </>
  );
}

export interface AttributeProps {
  /** Attribute name */
  name: Children;

  /** Argument */
  args?: Children[];
}

const AttributeTag = Symbol("AttributeTag");
/**
 * Render a csharp attribute.
 *
 * @example
 * ```tsx
 * <Attribute name="Test" /><hbr/>
 * <Attribute name="Test" args={["arg1", "arg2"]} />
 * ```
 *
 * will render:
 * ```csharp
 * [Test]
 * [Test("arg1", "arg2")]
 * ```
 */
export const Attribute = taggedComponent(
  AttributeTag,
  (props: AttributeProps) => {
    return (
      <group>
        [{props.name}
        {props.args && props.args.length > 0 && (
          <>
            (
            <Indent softline>
              <For each={props.args ?? []} comma line>
                {(arg) => arg}
              </For>
            </Indent>
            )
          </>
        )}
        ]
      </group>
    );
  },
);
