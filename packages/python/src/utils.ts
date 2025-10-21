import {
  Children,
  ComponentCreator,
  defaultProps,
  isComponentCreator,
  splitProps,
} from "@alloy-js/core";
import { ClassMethodDeclaration } from "./components/ClassMethodDeclaration.js";
import { DunderMethodDeclaration } from "./components/DunderMethodDeclaration.js";
import { FunctionDeclaration } from "./components/FunctionDeclaration.js";
import {
  BaseDeclarationProps,
  CallSignatureProps,
} from "./components/index.js";
import { MethodDeclaration } from "./components/MethodDeclaration.js";
import { StaticMethodDeclaration } from "./components/StaticMethodDeclaration.js";

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
    "typeParameters",
    "args",
    "kwargs",
    "returnType",
  ]);

  if (!defaults) {
    return callSignatureProps;
  }

  return defaultProps(callSignatureProps, defaults);
}

/**
 * Find the first function-like child declaration whose name matches one of the
 * provided method names. Returns the method name when found.
 */
export function findMethodDeclaration(
  children: Children[],
  methodNames: string[],
): string | undefined {
  const creators = [
    MethodDeclaration,
    FunctionDeclaration,
    ClassMethodDeclaration,
    StaticMethodDeclaration,
    DunderMethodDeclaration,
  ];
  for (const child of children) {
    if (creators.some((creator) => isComponentCreator(child, creator))) {
      const rawName = (child as ComponentCreator<BaseDeclarationProps>).props
        ?.name;
      const candidateName =
        typeof rawName === "string" ? rawName : rawName?.name;
      if (
        typeof candidateName === "string" &&
        methodNames.includes(candidateName)
      ) {
        return candidateName;
      }
    }
  }
  return undefined;
}
