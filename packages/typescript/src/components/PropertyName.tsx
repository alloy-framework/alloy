import { MemberDeclarationContext, useContext } from "@alloy-js/core";
import { TSOutputSymbol } from "../symbols/ts-output-symbol.js";
import { isValidJSIdentifier } from "../utils.js";

export interface PropertyNameProps {
  /**
   * The name of the property.
   */
  name?: string;

  /**
   * Whether the property is a private property. If `true`, the property will be
   * prefixed with `#`.
   */
  private?: boolean;
}

/**
 * A TypeScript property name for an interface, class, or object member. If the
 * name is not a valid JavaScript identifier, it will be quoted. If a `name` prop
 * is provided, it will be used as the property name. Otherwise, the name will be
 * taken from the {@link (MemberDeclarationContext:variable)}.
 */
export function PropertyName(props: PropertyNameProps) {
  if (props.name) {
    if (props.private) {
      return "#" + props.name;
    }
    return quoteIfNeeded(props.name);
  } else {
    const declSymbol = useContext(MemberDeclarationContext) as TSOutputSymbol;
    if (!declSymbol) {
      return "(no member declaration context)";
    }

    if (declSymbol.isPrivateMemberSymbol) {
      return <>#{declSymbol.name}</>;
    } else {
      return <>{quoteIfNeeded(declSymbol.name)}</>;
    }
  }
}

function quoteIfNeeded(name: string) {
  if (isValidJSIdentifier(name)) {
    return name;
  } else {
    return `"${name.replace(/"/g, '\\"')}"`;
  }
}
