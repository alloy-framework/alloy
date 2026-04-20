import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { createEnumMemberSymbol } from "../../symbols/factories.js";

export interface EnumMemberProps {
  name: string | Namekey;
  refkey?: Refkey;
  value?: Children;
}

export function EnumMember(props: EnumMemberProps) {
  const sym = createEnumMemberSymbol(props.name, {
    refkeys: props.refkey,
  });

  return (
    <Declaration symbol={sym}>
      <Name />
      {props.value !== undefined && <>: {props.value}</>}
    </Declaration>
  );
}
