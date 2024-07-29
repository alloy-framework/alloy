import {code} from "@alloy-js/core";

export interface MethodProps {
    accessModifier: string;
    methodName: string;
    isStatic: boolean;
    returnType: string;
}

export function Method({accessModifier, methodName, isStatic, returnType}: MethodProps) {
    return code`
                ${accessModifier} ${isStatic ? 'static' : ''} ${returnType} ${methodName}() {
                  }
    `
}