import {children, Children, code, createContext, NamePolicy, refkey} from "@alloy-js/core";
import {ClassConstructor} from "./ClassConstructor.js";
import {AccessModifier} from "../access-modifier.js";
import {Declaration, DeclarationProps} from "./Declaration.js";
import {useJavaNamePolicy} from "../name-policy.js";
import {ClassModifier} from "../modifiers/index.js";
import {Reference} from "./Reference.js";

export interface ClassDeclarationProps extends DeclarationProps{
    children?: Children;
    classModifiers?: ClassModifier[];
    implementsInterface?: string;
}

export function ClassDeclaration(props: ClassDeclarationProps) {
    const name = useJavaNamePolicy().getName(props.name, "class");
    const interfaceRef = props.implementsInterface ? <Reference refkey={refkey(props.implementsInterface)}/> : "";
    return (
        <Declaration {... props} name={name}>
            {props.accessModifier} class {name} {props.implementsInterface ? "implements" : ""} {interfaceRef}{"{"}
              {props.children}
            {"}"}
        </Declaration>
    );
}