import { code } from "@alloy-js/core";
import type { ApiInterface } from "@microsoft/api-extractor-model";
import { InterfaceMembers } from "../stc/index.js";

export interface ComponentPropsProps {
  propType: ApiInterface;
}

export function ComponentProps(props: ComponentPropsProps) {
  return code`
    ### Props

    ${InterfaceMembers({ iface: props.propType, flatten: true })}
  `;
}
