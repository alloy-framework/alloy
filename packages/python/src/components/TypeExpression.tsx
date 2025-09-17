import { Children, For, Refkey, Show, childrenArray } from "@alloy-js/core";

export interface TypeArgumentsProps {
  args: Children[];
}

/**
 * Render Python-style type arguments, e.g. [T, P].
 */
export function TypeArguments(props: TypeArgumentsProps) {
  if (!props.args || props.args.length === 0) {
    return undefined;
  }

  return (
    <>
      [
      <For each={props.args} joiner=", ">
        {(arg) => arg}
      </For>
      ]
    </>
  );
}

export interface TypeReferenceProps {
  /** A refkey to a declared symbol. */
  refkey?: Refkey;
  /** A raw name to reference when no refkey is provided. */
  name?: Children;
  /** Type arguments to render inside brackets. */
  typeArgs?: Children[];
}

/**
 * A type reference like Foo[T, P] or int.
 */
export function TypeReference(props: TypeReferenceProps) {
  const type = props.refkey ? props.refkey : props.name;
  const typeArgs =
    props.typeArgs && props.typeArgs.length ?
      <TypeArguments args={props.typeArgs} />
    : undefined;

  return (
    <group>
      <indent>
        <sbr />
        {type}
        <Show when={Boolean(typeArgs)}>{typeArgs}</Show>
      </indent>
      <sbr />
    </group>
  );
}

export interface UnionTypeExpressionProps {
  children: Children;
}

export function UnionTypeExpression(props: UnionTypeExpressionProps) {
  const items = childrenArray(() => props.children);
  return (
    <group>
      <ifBreak>(</ifBreak>
      <indent>
        <sbr />
        <For
          each={items}
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

export type TypeExpressionProps = Children;
