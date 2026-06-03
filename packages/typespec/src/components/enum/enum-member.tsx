import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { createEnumMemberSymbol } from "../../symbols/factories.js";
import { DocWhen } from "../doc/doc-comment.jsx";

export interface EnumMemberProps {
  /** The member name. */
  name: string | Namekey;
  /** Refkey for referencing this member from other declarations. */
  refkey?: Refkey;
  /** Optional explicit value (`: "val"` or `: 123`). */
  value?: Children;
  /** Doc comment rendered as `/** ... *\/` above the member. */
  doc?: Children;
  /** Decorators to apply to the member. */
  decorators?: Children;
}

/**
 * A TypeSpec enum member.
 *
 * @example
 * ```tsx
 * <EnumMember name="North" doc="Points north" />
 * ```
 * This will produce:
 * ```typespec
 * /** Points north *\/
 * North
 * ```
 */
export function EnumMember(props: EnumMemberProps) {
  const sym = createEnumMemberSymbol(props.name, {
    refkeys: props.refkey,
  });

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      {props.decorators}
      <Name />
      {props.value !== undefined && <>: {props.value}</>}
    </Declaration>
  );
}
