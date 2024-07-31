import {Children, code} from "@alloy-js/core";
import {AccessModifier} from "../access-modifier.js";

export interface MethodProps {
    accessModifier: AccessModifier;
    methodName: string;
    isStatic: boolean;
    returnType: string;
    parameters?: Record<string, string>;
    children?: Children;
}

export function Method({accessModifier, methodName, isStatic, returnType, parameters, children}: MethodProps) {
    const params = <Method.Parameters parameters = {parameters}></Method.Parameters>;
    return code`
        ${accessModifier}${isStatic ? ' static' : ''} ${returnType} ${methodName}(${params}) {
          ${children}
        }
    `;
}

// Maybe unnecessary, trying to base this component on the FunctionDeclaration component in the typescript package.
export interface ParameterProps {
    parameters?: Record<string, string>;
}

// Maps each record to a string and joins them with ', '
Method.Parameters = function Parameters(props: ParameterProps) {
    const { parameters = {} } = props;
    return Object.entries(parameters)
        .map(([type, name]) => `${type} ${name}`)
        .join(', ');
};