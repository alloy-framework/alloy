import {Children, code, useContext} from "@alloy-js/core";
import {AccessModifier} from "../access-modifier.js";
import {Method} from "./Method.js";
export interface ClassConstructorProps {
    accessModifier: AccessModifier;
    className: string;
    parameters?: Record<string, string>;
    children?: Children;
}

export function ClassConstructor (props: ClassConstructorProps) {
    const params = <ClassConstructor.Parameters parameters = {props.parameters}></ClassConstructor.Parameters>;
    return code`
        ${props.accessModifier} ${props.className}(${params}) {
          ${props.children}
         }
    `;
}

export interface ClassConstructorParameterProps {
    parameters?: Record<string, string>;
}

// Maps each record to a string and joins them with ', '
ClassConstructor.Parameters = function Parameters(props: ClassConstructorParameterProps) {
    const { parameters = {} } = props;
    return Object.entries(parameters)
        .map(([type, name]) => `${type} ${name}`)
        .join(', ');
};