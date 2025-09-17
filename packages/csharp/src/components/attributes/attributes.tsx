import {
  Children,
  findKeyedChildren,
  For,
  Indent,
  Refkey,
  RefkeyableObject,
  taggedComponent,
} from "@alloy-js/core";
import { ReferenceContext } from "../../contexts/reference-context.js";
import { normalizeAttributeName } from "../../symbols/reference.jsx";

export type AttributesProp = Array<string | AttributeProps | Children>;

export interface AttributeListProps {
  /** If the attribute list should finish with a hard line if there is any attribute */
  endline?: boolean;
  attributes?: AttributesProp;
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
        {(arg) => renderAttribute(arg)}
      </For>
      {props.endline && attributes.length > 0 && <hbr />}
    </>
  );
}

function renderAttribute(attr: string | AttributeProps | Children): Children {
  if (typeof attr === "string") {
    return <Attribute name={attr} />;
  } else if (typeof attr === "object" && attr && "name" in attr) {
    return <Attribute {...attr} />;
  } else {
    return attr;
  }
}

export interface AttributeProps {
  /** Attribute name */
  name: string | Refkeyable

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
        [
        <AttributeName name={props.name} />
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

function AttributeName(props: Pick<AttributeProps, "name">) {
  return typeof props.name === "string" ?
      normalizeAttributeName(props.name)
    : <ReferenceContext.Provider value={"attribute"}>
        {props.name}
      </ReferenceContext.Provider>;
}
