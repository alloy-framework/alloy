import { Children, For } from "@alloy-js/core";

export interface TypeParameterProp {
  name: string;
  constraint?: Children;
}

export interface TypeParametersProps {
  params?: TypeParameterProp[];
}

export interface WhereClauseProps {
  children?: Children;
}

export function TypeParameters(props: TypeParametersProps) {
  if (!props.params || props.params.length === 0) {
    return <></>;
  }

  return (
    <>
      {"<"}
      <For each={props.params} joiner={", "}>
        {(param) => (
          <>
            {param.name}
            {param.constraint ? (
              <>
                {": "}
                {param.constraint}
              </>
            ) : null}
          </>
        )}
      </For>
      {">"}
    </>
  );
}

export function WhereClause(props: WhereClauseProps) {
  if (!props.children) {
    return <></>;
  }

  return (
    <>
      {"where "}
      {props.children}
    </>
  );
}
