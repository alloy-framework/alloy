import { Children, List } from "@alloy-js/core";

export interface UnionTypeExpressionProps {
  children: Children;
}

export function UnionTypeExpression(props: UnionTypeExpressionProps) {
  return (
    <group>
      <ifBreak>(</ifBreak>
      <indent>
        <sbr />
        <List
          children={props.children}
          joiner={
            <>
              <br />|{" "}
            </>
          }
        />
      </indent>
      <sbr />
      <ifBreak>)</ifBreak>
    </group>
  );
}
