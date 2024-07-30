import {code, useContext} from "@alloy-js/core";
import {ClassDeclarationContext} from "./ClassDeclaration.js";
export interface ClassConstructorProps {
    accessModifier: string;
}

export function ClassConstructor (props: ClassConstructorProps) {
    const classDeclarationProps = useContext(ClassDeclarationContext);

    if (!classDeclarationProps) {
        throw new Error('ClassConstructor must be used within a ClassDeclaration');
    }

    const { className } = classDeclarationProps;

    return code`
        ${props.accessModifier} ${className}() {
        }
    `;
}

