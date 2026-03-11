import { Children, For } from "@alloy-js/core";

export interface TypeParameterProp {
  name?: string;
  lifetime?: string;
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

  const lifetimes: TypeParameterProp[] = [];
  const typeParameters: TypeParameterProp[] = [];

  for (const param of props.params) {
    if (param.lifetime) {
      lifetimes.push(param);
      continue;
    }

    if (param.name) {
      typeParameters.push(param);
      continue;
    }

    throw new Error(
      "TypeParameters entries must include either `lifetime` or `name`.",
    );
  }

  const orderedParams = [...lifetimes, ...typeParameters];

  return (
    <>
      {"<"}
      <For each={orderedParams} joiner={", "}>
        {(param) => (
          <>
            {param.lifetime ?? param.name}
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
