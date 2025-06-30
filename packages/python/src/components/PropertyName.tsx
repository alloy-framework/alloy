import { MemberDeclarationContext, useContext } from "@alloy-js/core";
import { PythonOutputSymbol } from "../symbols/python-output-symbol.js";

export interface PropertyNameProps {
  /**
   * The name of the property.
   */
  name?: string;
}

/**
 * A Python property name for a class or object member. If a `name` prop is provided, 
 * it will be used as the property name. Otherwise, the name will be taken from the
 * {@link (MemberDeclarationContext:variable)}.
 */
export function PropertyName(props: PropertyNameProps) {
  if (props.name) {
    return props.name;
  } else {
    const declSymbol = useContext(
      MemberDeclarationContext,
    ) as PythonOutputSymbol;
    if (!declSymbol) {
      return "(no member declaration context)";
    }

    return <>{declSymbol.name}</>;
  }
}
