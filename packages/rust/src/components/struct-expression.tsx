import { Children, For, Indent } from "@alloy-js/core";

export interface StructExpressionProps {
  type: Children;
  spread?: Children;
  children?: Children;
}

export interface FieldInitProps {
  name: string;
  children?: Children;
}

export function StructExpression(props: StructExpressionProps) {
  const fields =
    props.children ?
      (Array.isArray(props.children) ?
        props.children
      : [props.children]
      ).filter(
        (child) => !(typeof child === "string" && child.trim().length === 0),
      )
    : [];

  return (
    <>
      {props.type}
      {" {"}
      {fields.length > 0 || props.spread ?
        <>
          <Indent>
            {fields.length > 0 ?
              <For each={fields} joiner={<hbr />}>
                {(field) => field}
              </For>
            : null}
            {props.spread ?
              <>
                {fields.length > 0 ?
                  <hbr />
                : null}
                {".."}
                {props.spread}
              </>
            : null}
          </Indent>
          <hbr />
        </>
      : null}
      {"}"}
    </>
  );
}

export function FieldInit(props: FieldInitProps) {
  return (
    <>
      {props.name}
      {typeof props.children === "undefined" ? null : ": "}
      {props.children}
      {","}
    </>
  );
}
