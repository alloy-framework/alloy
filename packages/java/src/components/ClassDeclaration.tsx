import {children, Children, code, createContext} from "@alloy-js/core";
import {ClassConstructor} from "./ClassConstructor.js";

export interface ClassDeclarationProps {
    accessModifier: string;
    className: string;
    children?: Children;
}

export const ClassDeclarationContext = createContext<ClassDeclarationProps | undefined>(undefined);

export function ClassDeclaration(props: ClassDeclarationProps) {
    return (
        <ClassDeclarationContext.Provider value={props}>
            {code`
                ${props.accessModifier} class ${props.className} {
                    ${props.children}
                }
            `}
        </ClassDeclarationContext.Provider>
    );
    //todo: Fix indentation when there are multiple children.
}