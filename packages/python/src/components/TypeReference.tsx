import { Children, Refkey, Show } from "@alloy-js/core";
import { TypeArguments } from "./TypeArguments.js";
import { TypeRefContext } from "./TypeRefContext.js";

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
 *
 * @remarks
 * This component automatically wraps its content in a type reference context,
 * so any symbols referenced via refkey will be imported as type-only
 * (inside a `if TYPE_CHECKING:` block) unless also used as values elsewhere.
 */
export function TypeReference(props: TypeReferenceProps) {
  const type = props.refkey ? props.refkey : props.name;
  const typeArgs =
    props.typeArgs && props.typeArgs.length ?
      <TypeArguments args={props.typeArgs} />
    : undefined;

  return (
    <TypeRefContext>
      <group>
        <indent>
          <sbr />
          {type}
          <Show when={Boolean(typeArgs)}>{typeArgs}</Show>
        </indent>
        <sbr />
      </group>
    </TypeRefContext>
  );
}
