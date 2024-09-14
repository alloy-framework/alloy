import { InterfaceMembers, MdxSection } from "../stc/index.js";
export function ContextInterface(props) {
    return MdxSection({ title: "Context interface", level: 3 }).children(typeof props.context.contextInterface === "string" ?
        props.context.contextInterface
        : InterfaceMembers({
            iface: props.context.contextInterface,
        }));
}
//# sourceMappingURL=ContextInterface.js.map