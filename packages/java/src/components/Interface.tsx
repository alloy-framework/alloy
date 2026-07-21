import type { Children } from "@alloy-js/core";
import { Block } from "@alloy-js/core";

import type { CommonDeclarationProps } from "./Declaration.js";
import { Declaration } from "./Declaration.js";
import { ExtendsClause } from "./ExtendsClause.jsx";
import { LexicalScope } from "./LexicalScope.jsx";
import type { ModifierProps } from "./Modifiers.jsx";
import { Modifiers } from "./Modifiers.jsx";
import { Name } from "./Name.js";
import type { TypeParametersProps } from "./TypeParameters.jsx";
import { TypeParameters } from "./TypeParameters.jsx";

export interface InterfaceProps
  extends CommonDeclarationProps, ModifierProps, TypeParametersProps {
  extends?: Children[];
}

export function Interface(props: InterfaceProps) {
  return (
    <Declaration {...props} name={props.name} nameKind="interface">
      <group>
        <Modifiers {...props} />
        interface <Name />
        <TypeParameters generics={props.generics} />
        <ExtendsClause extends={props.extends} />{" "}
      </group>
      <LexicalScope>
        <Block>{props.children}</Block>
      </LexicalScope>
    </Declaration>
  );
}
