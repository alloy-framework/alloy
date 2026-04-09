import { useContext } from "../context.js";
import { MemberDeclarationContext } from "../context/member-declaration.js";

/**
 * Renders the name of the current member declaration from
 * {@link MemberDeclarationContext}. Use this inside a
 * {@link MemberDeclaration} component instead of `<Name />`, which reads from
 * the top-level {@link DeclarationContext}.
 */
export function MemberName() {
  const declSymbol = useContext(MemberDeclarationContext);
  if (!declSymbol) {
    return "(no member declaration context)";
  }

  return <>{declSymbol.name}</>;
}
