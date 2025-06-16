import { defaultProps, splitProps } from "@alloy-js/core";
import { CallSignatureProps } from "./components/CallSignature.jsx";

export function modulePath(path: string) {
  if (path[0] !== ".") {
    path = "./" + path;
  }

  return path.replace(/\.ts$/, ".js");
}

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
    "parametersChildren",
    "typeParameters",
    "typeParametersChildren",
    "returnType",
  ]);

  if (!defaults) {
    return callSignatureProps;
  }

  return defaultProps(callSignatureProps, defaults);
}

const identifierRegex =
  /^(?:[\p{ID_Start}$_])(?:[\p{ID_Continue}$\u200C\u200D])*$/u;

export function isValidJSIdentifier(str: string) {
  return identifierRegex.test(str);
}
