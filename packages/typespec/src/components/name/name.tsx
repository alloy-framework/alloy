import { DeclarationContext, useContext } from "@alloy-js/core";

export function Name() {
  const declSymbol = useContext(DeclarationContext);
  if (!declSymbol) {
    throw new Error("missing declaration context");
  }
  return <>{declSymbol.name}</>;
}
