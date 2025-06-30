import { type Children } from "@alloy-js/core";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { FunctionDeclaration } from "./FunctionDeclaration.jsx";

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
   * Indicates if there are positional arguments (`*args`) in the function
   */
  args?: boolean;

  /**
   * Indicates if there are keyword arguments (`**kwargs`) in the function
   */
  kwargs?: boolean;

  /**
   * Indicates that this is an instance function.
   */
  instanceFunction?: boolean; // true if this is an instance function

  /**
   * Indicates that this is a class function.
   */
  classFunction?: boolean; // true if this is a class function

  /**
   * The return type of the function.
   */
  returnType?: Children;
}
/**
 * A Python call signature, e.g. the part after the `def` keyword and the name in a
 * function expression.
 *
 * Any parameters or type parameters declared in this signature will be placed
 * in the current scope. This component does not make a scope to hold its
 * parameters.
 */
export function CallSignature(props: CallSignatureProps) {
  const sParams = props.parametersChildren ?? (
    <FunctionDeclaration.Parameters
      parameters={props.parameters}
      args={props.args}
      kwargs={props.kwargs}
      instanceFunction={props.instanceFunction}
      classFunction={props.classFunction}
    />
  );

  const sReturnType =
    props.returnType ?
      <>
        {" -> "}
        {props.returnType}
      </>
    : undefined;

  return (
    <>
      ({sParams}){sReturnType}
    </>
  );
}
