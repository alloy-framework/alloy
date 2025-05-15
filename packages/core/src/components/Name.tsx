import { useContext } from "../context.js";
import { DeclarationContext } from "../context/declaration.js";
import { Children } from "../jsx-runtime.js";

export function Name(): Children {
  const declSymbol = useContext(DeclarationContext);
  if (!declSymbol) {
    return "";
  }

  return <>{declSymbol.name}</>;
}
