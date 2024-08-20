import { Children, Refkey } from "@alloy-js/core";
import {
  createTSSymbol,
  TSOutputSymbol,
  TSSymbolFlags,
} from "../symbols/ts-output-symbol.js";
import { ValueExpression } from "./ValueExpression.jsx";
import { useTSNamePolicy } from "../name-policy.js";

export interface EnumMemberProps {
  name: string;
  refkey?: Refkey;
  value?: Children;
  jsValue?: string | number;
}

export function EnumMember(props: EnumMemberProps) {
  const namer = useTSNamePolicy();
  const name = namer.getName(props.name, "enum-member");
  let sym: TSOutputSymbol | undefined = undefined;
  if (props.refkey) {
    sym = createTSSymbol({
      name,
      refkey: props.refkey,
      flags: TSSymbolFlags.MemberSymbol,
    });
  }
  const nameCode = sym ? sym.name : name;
  const valueCode = props.jsValue ?
    <ValueExpression jsValue={props.jsValue} />
  : props.value;

  return <>{nameCode} = {valueCode}</>;
}
