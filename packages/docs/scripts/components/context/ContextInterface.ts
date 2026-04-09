import { refkey, type Children } from "@alloy-js/core";
import type { ApiInterface } from "@microsoft/api-extractor-model";
import type { ContextApi } from "../../build-json.js";
import { InterfaceMembers, MdxSection } from "../stc/index.js";

export interface ContextInterfaceProps {
  context: ContextApi;
}

export function ContextInterface(props: ContextInterfaceProps) {
  const { contextInterface, contextVariable } = props.context;
  let content: Children;

  if (typeof contextInterface === "string") {
    content = contextInterface;
  } else if (contextInterface.displayName === contextVariable.displayName) {
    // Dedicated context interface — inline its members
    content = InterfaceMembers({
      iface: contextInterface as ApiInterface,
    });
  } else {
    // Shared type (e.g., OutputSymbol) — link to its standalone page
    content = refkey(contextInterface);
  }

  return MdxSection({ title: "Context interface" }).children(content);
}
