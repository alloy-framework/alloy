import {code} from "@alloy-js/core";

export interface VariableProps {
    type: string;
    name: string;
    value?: string;
    isFinal?: boolean;
    isStatic?: boolean;
    accessModifier?: 'public' | 'protected' | 'private';
}

export function Variable(props: VariableProps) {
    const { type, name, value, isFinal, isStatic, accessModifier } = props;

    // todo:Might be good to have a separate component to handle this logic
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