import { Children } from "@alloy-js/core/jsx-runtime";
import {
  FunctionDeclaration,
  ParameterDescriptor,
  TypeParameterDescriptor,
} from "./FunctionDeclaration.jsx";

export interface CallSignatureProps {
  /**
   * The parameters to the function. Can be an array of strings for parameters
   * which don't have a type or a default value. Otherwise, it's an array of
   * {@link ParameterDescriptor}s.
   */
  parameters?: ParameterDescriptor[] | string[];

  /**
   * Raw content to be used as the parameter list.
   */
  parametersChildren?: Children;

  /**
   * The type parameters for the function. Can be an array of strings for
   * type parameters which don't have any constraints or a default type, otherwise
   * it's an array of {@link TypeParameterDescriptor}s.
   */
  typeParameters?: TypeParameterDescriptor[] | string[];

  /**
   * Raw content to be used as the type parameter list.
   */
  typeParametersChildren?: Children;

  /**
   * The return type of the function.
   */
  returnType?: Children;
}
/**
 * A TypeScript call signature, e.g. the part after the `function` keyword in an
 * anonymous function expression, or a call signature in an interface.
 *
 * Any parameters or type parameters declared in this signature will be placed
 * in the current scope. This component does not make a scope to hold its
 * parameters.
 */
export function CallSignature(props: CallSignatureProps) {
  const sTypeParameters =
    props.typeParametersChildren ?
      <>
        {"<"}
        {props.typeParametersChildren}
        {">"}
      </>
    : <FunctionDeclaration.TypeParameters parameters={props.typeParameters} />;

  const sParams = props.parametersChildren ?? (
    <FunctionDeclaration.Parameters parameters={props.parameters} />
  );

  const sReturnType = props.returnType ? <>: {props.returnType}</> : undefined;

  return (
    <>
      {sTypeParameters}({sParams}){sReturnType}
    </>
  );
}
