import { Children, Refkey, Show } from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { createStaticMemberSymbol } from "../symbols/index.js";
import { TSOutputSymbol } from "../symbols/ts-output-symbol.js";
import { JSDoc } from "./JSDoc.jsx";
import { PropertyName } from "./PropertyName.jsx";
import { ValueExpression } from "./ValueExpression.jsx";

export interface EnumMemberProps {
  /**
   * The name of the member.
   *
   * If a naming policy is provided in context, the policy name "enum-member" is
   * used.
   */
  name: string;

  /**
   * Refkey for the enum member symbol. If the refkey is not provided, a symbol
   * is not created and the member cannot be referenced by refkey.
   */
  refkey?: Refkey;

  /**
   * The value of the enum member.
   */
  value?: Children;

  /**
   * The JS value of the enum member.
   */
  jsValue?: string | number;

  /**
   * Arbitrary symbol metadata for the enum member.
   */
  metadata?: Record<string, unknown>;

  /**
   * Documentation for the enum member.
   */
  doc?: Children;
}

/**
 * A TypeScript enum member.
 */
export function EnumMember(props: EnumMemberProps) {
  const namer = useTSNamePolicy();
  const name = namer.getName(props.name, "enum-member");
  let sym: TSOutputSymbol | undefined = undefined;
  if (props.refkey) {
    sym = createStaticMemberSymbol(name, {
      refkeys: props.refkey,
      metadata: props.metadata,
    });
  }
  const actualName = sym ? sym.name : name;
  const valueCode =
    props.jsValue !== undefined ?
      <ValueExpression jsValue={props.jsValue} />
    : props.value;

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <PropertyName name={actualName} />
      <Show when={valueCode !== undefined}> = {valueCode}</Show>
    </>
  );
}
