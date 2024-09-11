import { code } from "@alloy-js/core";
import type { ApiInterface } from "@microsoft/api-extractor-model";
import type { ContextApi } from "../../build-json.js";
import { InterfaceMembers } from "../stc/index.js";

export interface ContextInterfaceProps {
  context: ContextApi;
}

export function ContextInterface(props: ContextInterfaceProps) {
  return code`
    ### Context interface

    ${
      typeof props.context.contextInterface === "string" ?
        props.context.contextInterface
      : InterfaceMembers({
          iface: props.context.contextInterface as ApiInterface,
        })
    }
  `;
}
