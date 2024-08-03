import {useJavaNamePolicy} from "../name-policy.js";
import {Declaration, DeclarationProps} from "./Declaration.js";
import {Reference} from "./Reference.js";
import {code, refkey} from "@alloy-js/core";
import {ClassConstructor} from "./ClassConstructor.js";


interface ObjectDeclarationProps extends DeclarationProps{
    variableName: string;
    constructorArgs?: { value: any, type: 'string' | 'number' }[];
}

export function ObjectDeclaration(props: ObjectDeclarationProps) {
    const name = useJavaNamePolicy().getName(props.name, "class");
    const ref = <Reference refkey={refkey(name)} />;
    const params = <ObjectDeclaration.Parameters parameters = {props.constructorArgs}/>;
    return code`
        ${ref} ${props.variableName} = new ${name}(${params});
    `;
}

export interface ObjectDeclarationParameterProps {
    parameters?: { value: any, type: 'string' | 'number' }[];
}

ObjectDeclaration.Parameters = function Parameters(props: ObjectDeclarationParameterProps) {
    const { parameters = [] } = props;

    const formatParameter = (param: { value: any, type: 'string' | 'number' }) => {
        if (param.type === 'string') {
            return `"${param.value}"`;
        } else if (param.type === 'number') {
            return param.value;
        }
        return param.value;
    };

    return parameters.map(param => formatParameter(param)).join(', ');
};