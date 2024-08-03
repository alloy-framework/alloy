import {useJavaNamePolicy} from "../name-policy.js";
import {Declaration, DeclarationProps} from "./Declaration.js";
import {Reference} from "./Reference.js";
import {code, refkey} from "@alloy-js/core";


interface ObjectDeclarationProps extends DeclarationProps{
    variableName: string;
    constructorArgs?: string[];
}

export function ObjectDeclaration(props: ObjectDeclarationProps) {
    const name = useJavaNamePolicy().getName(props.name, "class");
    const ref = <Reference refkey={refkey(name)} />;
    return code`
        ${ref} ${props.variableName} = new ${name}();
    `;
}