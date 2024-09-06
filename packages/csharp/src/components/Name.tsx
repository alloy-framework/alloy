import * as core from "@alloy-js/core";

// the name within the current declaration
export function Name() {
  const declSymbol = core.useContext(core.DeclarationContext);
  if (!declSymbol) {
    throw new Error("missing declaration context");
  }

  return <>{declSymbol.name}</>;
}
