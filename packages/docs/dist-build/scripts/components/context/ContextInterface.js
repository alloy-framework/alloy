import { code } from "@alloy-js/core";
import { InterfaceMembers } from "../stc/index.js";
export function ContextInterface(props) {
    return code `
    ### Context interface

    ${typeof props.context.contextInterface === "string" ?
        props.context.contextInterface
        : InterfaceMembers({
            iface: props.context.contextInterface,
        })}
  `;
}
//# sourceMappingURL=ContextInterface.js.map