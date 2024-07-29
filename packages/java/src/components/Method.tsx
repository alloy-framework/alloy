import {code} from "@alloy-js/core";

export interface MethodProps {
    accessModifier: string;
    methodName: string;
    isStatic: boolean;
    returnType: string;
    parameters?: Record<string, string>
}

export function Method({accessModifier, methodName, isStatic, returnType, parameters}: MethodProps) {
    const params = <Method.Parameters parameters = {parameters}></Method.Parameters>
    return code`
        ${accessModifier}${isStatic ? ' static' : ''} ${returnType} ${methodName}(${params}) {
          }
    `;
}

export interface ParameterProps {
    parameters?: Record<string, string>
}
Method.Parameters = function Parameters(props: ParameterProps) {
    const { parameters = {} } = props;
    return Object.entries(parameters)
        .map(([type, name]) => `${type} ${name}`)
        .join(', ');
};