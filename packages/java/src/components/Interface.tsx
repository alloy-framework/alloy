import {Children, code} from "@alloy-js/core";
import {Declaration, DeclarationProps} from "./Declaration.js";
import {useJavaNamePolicy} from "../name-policy.js";

export interface InterfaceProps extends DeclarationProps{
    isPackagePrivate: boolean;
}

export function Interface(props: InterfaceProps) {
    const name = useJavaNamePolicy().getName(props.name, "interface");
    return (
        <Declaration {...props} name={name}>
            {props.isPackagePrivate ? "" : "public"} interface {name} {"{"}
              {props.children}
            {"{"}
        </Declaration>
    )
}