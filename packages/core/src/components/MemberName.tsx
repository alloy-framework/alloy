import { useContext } from "../context.js";
import { MemberDeclarationContext } from "../context/member-declaration.js";
import { Children } from "../jsx-runtime.js";

export function MemberName(): Children {
  const declSymbol = useContext(MemberDeclarationContext);
  if (!declSymbol) {
    return "(no member declaration context)";
  }

  return <>{declSymbol.name}</>;
}
