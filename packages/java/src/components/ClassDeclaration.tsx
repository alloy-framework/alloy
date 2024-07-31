import {children, Children, code, createContext, NamePolicy} from "@alloy-js/core";
import {ClassConstructor} from "./ClassConstructor.js";
import {AccessModifier} from "../access-modifier.js";
import {Declaration, DeclarationProps} from "./Declaration.js";
import {useJavaNamePolicy} from "../name-policy.js";

export interface ClassDeclarationProps extends DeclarationProps{
    children?: Children;
}

export function ClassDeclaration(props: ClassDeclarationProps) {
    const name = useJavaNamePolicy().getName(props.name, "class");
    return (
        <Declaration {... props} name={name}>
            {props.accessModifier} class {name} {"{"}
              {props.children}
            {"}"}
        </Declaration>
    );
}