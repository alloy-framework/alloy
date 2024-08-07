import {useJavaNamePolicy} from "../name-policy.js";
import {DeclarationProps} from "./Declaration.js";
import {Reference} from "./Reference.js";
import {code, refkey} from "@alloy-js/core";

/**
 * I have seperated object and variable components. I thought this might be a good idea as I think this
 * component will require more complex logic. Perhaps it should have a different name? I'm not sure if
 * declaration is the correct word to describe it.
 */
interface ObjectDeclarationProps extends DeclarationProps{
    variableName: string;
    constructorArgs?: any[];
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
    parameters?: any[];
}

//format the parameters passed to the class constructor based on type.
ObjectDeclaration.Parameters = function Parameters(props: ObjectDeclarationParameterProps) {
    const { parameters = [] } = props;

    const formatParameter = (param: any) => {
        if (typeof param === 'string') {
            return `"${param}"`;
        }
        return param;
    };

    return parameters.map(param => formatParameter(param)).join(', ');
};