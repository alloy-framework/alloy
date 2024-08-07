import {code} from "@alloy-js/core";
import {AccessModifier} from "../access-modifier.js";

export interface VariableProps {
    type: string;
    name: string;
    value?: string;
    isFinal?: boolean;
    isStatic?: boolean;
    accessModifier?: AccessModifier;
}

export function Variable(props: VariableProps) {
    const { type, name, value, isFinal, isStatic, accessModifier } = props;

    const declarationParts = [
        accessModifier,
        isStatic ? 'static' : undefined,
        isFinal ? 'final' : undefined,
        type,
        name,
        value !== undefined ? `= ${value}` : undefined
    ];

    // Filter out undefined parts and join with spaces
    const declaration = declarationParts.filter(part => part).join(' ');

    return code`
        ${declaration};
    `;
}