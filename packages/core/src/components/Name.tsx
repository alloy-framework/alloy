import { useContext } from "../context.js";
import { DeclarationContext } from "../context/declaration.js";

export function Name() {
  const declSymbol = useContext(DeclarationContext);
  if (!declSymbol) {
    return "";
  }

  return <>{declSymbol.name}</>;
}
