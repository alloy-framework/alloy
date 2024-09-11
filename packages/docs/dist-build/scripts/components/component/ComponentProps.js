import { InterfaceMembers, MdxSection } from "../stc/index.js";
export function ComponentProps(props) {
    if (!props.propType)
        return "";
    return MdxSection({ title: "Props", level: 3 }).children(InterfaceMembers({ iface: props.propType, flatten: true }));
}
//# sourceMappingURL=ComponentProps.js.map