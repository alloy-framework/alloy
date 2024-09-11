import type { ApiInterface } from "@microsoft/api-extractor-model";
import type { ContextApi } from "../../build-json.js";
import { InterfaceMembers, MdxSection } from "../stc/index.js";

export interface ContextInterfaceProps {
  context: ContextApi;
}

export function ContextInterface(props: ContextInterfaceProps) {
  return MdxSection({ title: "Context interface", level: 3 }).children(
    typeof props.context.contextInterface === "string" ?
      props.context.contextInterface
    : InterfaceMembers({
        iface: props.context.contextInterface as ApiInterface,
      }),
  );
}
