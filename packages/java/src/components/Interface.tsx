import {Children, code} from "@alloy-js/core";

export interface InterfaceProps {
    isPackagePrivate: boolean;
    interfaceName: string;
    children?: Children;
}

export function Interface(props: InterfaceProps) {
    return code`
        ${props.isPackagePrivate ? "" : " public"} interface ${props.interfaceName} {
            ${props.children}
        }
    `
}