import {
  defaultProps,
  splitProps,
  useMemberContext,
  useScope,
} from "@alloy-js/core";
import { CallSignatureProps } from "./components/CallSignature.jsx";
import { TSLexicalScope } from "./symbols/ts-lexical-scope.js";
import { TSOutputSymbol } from "./symbols/ts-output-symbol.js";

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

export function useLexicalScope(): TSLexicalScope | undefined {
  const scope = useScope();
  if (!scope) {
    return undefined;
  }

  if (!(scope instanceof TSLexicalScope)) {
    throw new Error(
      "A lexical scope is required but the current scope is not a lexical scope",
    );
  }

  return scope;
}

export function useMemberOwner(): TSOutputSymbol {
  const memberScope = useMemberContext();
  if (!memberScope) {
    throw new Error("A member owner is required but no member scope was found");
  }

  if (!(memberScope.ownerSymbol instanceof TSOutputSymbol)) {
    throw new Error(
      "A member owner is required but the current owner is not a TSOutputSymbol",
    );
  }

  return memberScope.ownerSymbol;
}
