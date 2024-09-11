import { code } from "@alloy-js/core";
import { InterfaceMembers } from "../stc/index.js";
export function ComponentProps(props) {
    return code `
    ### Props

    ${InterfaceMembers({ iface: props.propType, flatten: true })}
  `;
}
//# sourceMappingURL=ComponentProps.js.map