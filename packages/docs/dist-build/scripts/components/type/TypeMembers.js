import { code, mapJoin } from "@alloy-js/core";
import { Excerpt, InterfaceMembers } from "../stc/index.js";
export function TypeMembers(props) {
    let extendsInfo = "";
    if (props.type.extendsTypes.length > 0) {
        const extendsItems = mapJoin(props.type.extendsTypes, (type) => Excerpt({ excerpt: type.excerpt, context: props.type }), { joiner: "," });
        extendsInfo = code `Extends ${extendsItems}`;
    }
    return code `
    ### Members

    ${extendsInfo}
    
    ${InterfaceMembers({ iface: props.type })}
  `;
}
//# sourceMappingURL=TypeMembers.js.map