import { defaultProps, splitProps } from "@alloy-js/core";
import { CallSignatureProps } from "./components/index.js";

/**
 * Extract only the call signature props from a props object which extends
 * `CallSignatureProps`. You can provide default values for the props.
 */
export function getCallSignatureProps(
  props: CallSignatureProps,
  defaults?: Partial<CallSignatureProps>,
) {
  const [callSignatureProps] = splitProps(props, [
    "parameters",
    "args",
    "kwargs",
    "instanceFunction",
    "classFunction",
    "returnType",
  ]);

  if (!defaults) {
    return callSignatureProps;
  }

  return defaultProps(callSignatureProps, defaults);
}

const pythonIdentifierRegex = /^[A-Za-z_][A-Za-z0-9_]*$/;

export function isValidPythonIdentifier(str: string) {
  return pythonIdentifierRegex.test(str);
}
