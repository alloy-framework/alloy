import { DeclarationContext, useContext } from "@alloy-js/core";
import { TypeScriptElements, useTSNamePolicy } from "../name-policy.js";


export function Name() {
  const declSymbol = useContext(DeclarationContext);
  if (!declSymbol) {
    return "";
  }

  return <>{declSymbol.name}</>
}