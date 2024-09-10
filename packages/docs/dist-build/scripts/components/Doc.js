import { ComponentDoc } from "./stc/index.js";
export function Doc(props) {
    switch (props.api.kind) {
        case "component":
            return ComponentDoc({ component: props.api });
        default:
            return undefined;
    }
}
//# sourceMappingURL=Doc.js.map