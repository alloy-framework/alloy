import { Children, OutputSymbolFlags, Refkey } from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { createTSSymbol, TSOutputSymbol } from "../symbols/ts-output-symbol.js";
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
}

/**
 * A TypeScript enum member.
 */
export function EnumMember(props: EnumMemberProps) {
  const namer = useTSNamePolicy();
  const name = namer.getName(props.name, "enum-member");
  let sym: TSOutputSymbol | undefined = undefined;
  if (props.refkey) {
    sym = createTSSymbol({
      name,
      refkey: props.refkey,
      flags: OutputSymbolFlags.StaticMember,
      metadata: props.metadata,
    });
  }
  const nameCode = sym ? sym.name : name;
  const valueCode =
    props.jsValue ? <ValueExpression jsValue={props.jsValue} /> : props.value;

  return (
    <>
      {nameCode} = {valueCode}
    </>
  );
}
