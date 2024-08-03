import {useJavaNamePolicy} from "../name-policy.js";
import {Declaration, DeclarationProps} from "./Declaration.js";
import {Reference} from "./Reference.js";
import {refkey} from "@alloy-js/core";


interface ObjectDeclarationProps extends DeclarationProps{
    variableName: string;
    constructorArgs?: string[];
}

export function ObjectDeclaration(props: ObjectDeclarationProps) {
    const name = useJavaNamePolicy().getName(props.name, "class");
    return (
        <Declaration {... props} name={name}>
            {<Reference refkey={refkey(name)} />} {props.variableName} {"= new"} {name}{"();"}
        </Declaration>
    );
}