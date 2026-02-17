import { Child, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { useTypeSpecNamePolicy } from "../../name-policy.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";

export interface ScalarDeclarationProps {
  name: string | Namekey;
  refkey?: Refkey;
  is?: Child;
  extends?: Child;
}

export function ScalarDeclaration(props: ScalarDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "scalar", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("scalar"),
  });
  if (props.is && props.extends) {
    throw new Error(
      "A scalar declaration cannot have both 'is' and 'extends' properties.",
    );
  }
  return (
    <>
      <Declaration symbol={sym}>
        scalar <Name />
        {props.is && <> is {props.is}</>}
        {props.extends && <> extends {props.extends}</>}
      </Declaration>
    </>
  );
}
