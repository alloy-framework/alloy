import {AccessModifier} from "../access-modifier.js";
import {DeclarationProps} from "./Declaration.js";
import {children, Children, code} from "@alloy-js/core";
import {useJavaNamePolicy} from "../name-policy.js";

export interface EnumProps extends DeclarationProps{
    accessModifier: AccessModifier
    children?: Children;
}

export function Enum(props: EnumProps) {
    const name = useJavaNamePolicy().getName(props.name, 'enum');
    return code`
      ${props.accessModifier} enum ${name} {
        ${props.children}
        }
    `
}