import {code} from "@alloy-js/core";
import {AccessModifier} from "../access-modifier.js";
import {FieldModifier} from "../modifiers/index.js";

export interface VariableProps {
    type: string;
    name: string;
    value?: string;
    fieldModifiers?: FieldModifier[];
    accessModifier?: AccessModifier;
}

export function Variable(props: VariableProps) {
    const { type, name, value, accessModifier } = props;
    const fieldModifiers = props.fieldModifiers?.join(" ");
    const declarationParts = [
        accessModifier,
        fieldModifiers,
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