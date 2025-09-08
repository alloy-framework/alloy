import { Children, For, memo } from "@alloy-js/core";
import { resolveTypeExpression } from "../utils.js";

export interface SingleTypeExpressionProps {
  children: Children;
  typeArguments?: SingleTypeExpressionProps[];
}

export function SingleTypeExpression(props: SingleTypeExpressionProps) {
  const resolvedChildren = memo(() => props.children);
  let resolvedTypeArguments: Children | undefined = undefined;
  if (props.typeArguments) {
    const typeArguments = props.typeArguments.map(resolveTypeExpression);
    resolvedTypeArguments = (
      <>
        [
        <For each={typeArguments} joiner=", ">
          {(arg) => arg}
        </For>
        ]
      </>
    );
  }

  return (
    <group>
      <indent>
        <sbr />
        {resolvedChildren()}
        {resolvedTypeArguments}
      </indent>
      <sbr />
    </group>
  );
}

export interface UnionTypeExpressionProps {
  children: SingleTypeExpressionProps[];
}

export function UnionTypeExpression(props: UnionTypeExpressionProps) {
  // Map each SingleTypeExpressionProps to a SingleTypeExpression element (Children)
  const childrenElements: Children[] = props.children.map((childProps) => (
    <SingleTypeExpression {...childProps} />
  ));

  return (
    <group>
      <ifBreak>(</ifBreak>
      <indent>
        <sbr />
        <For
          each={childrenElements}
          joiner={
            <>
              <br />|{" "}
            </>
          }
        >
          {(child) => child}
        </For>
      </indent>
      <sbr />
      <ifBreak>)</ifBreak>
    </group>
  );
}

export type TypeExpressionProps =
  | SingleTypeExpressionProps
  | UnionTypeExpressionProps;
