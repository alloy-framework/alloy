import { useContext } from "../context.js";
import { MemberDeclarationContext } from "../context/member-declaration.js";

export function MemberName() {
  const declSymbol = useContext(MemberDeclarationContext);
  if (!declSymbol) {
    return "(no member declaration context)";
  }

  return <>{declSymbol.name}</>;
}
