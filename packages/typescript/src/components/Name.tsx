import { DeclarationContext, useContext } from "@alloy-js/core";

export function Name() {
  const declSymbol = useContext(DeclarationContext);
  if (!declSymbol) {
    return "";
  }

  return <>{declSymbol.name}</>
}