import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import {
  accessibilityFromProps,
  nonAccessibilityFromProps,
} from "../../symbols/csharp.js";
import { createFieldSymbol } from "../../symbols/factories.js";
import { DocWhen } from "../doc/comment.jsx";

/** Field modifiers. */
export interface FieldModifiers {
  readonly new?: boolean;
  readonly static?: boolean;
  readonly readonly?: boolean;
  readonly volatile?: boolean;
}

const getModifiers = makeModifiers<FieldModifiers>([
  "new",
  "static",
  "readonly",
  "volatile",
]);

export interface FieldProps extends AccessModifiers, FieldModifiers {
  name: string | Namekey;
  type: Children;
  refkey?: Refkey;
  /** Doc comment */
  doc?: Children;
}

/** Render a c# field */
export function Field(props: FieldProps) {
  const options = {
    accessibility: accessibilityFromProps(props),
    refkeys: props.refkey,
    ...nonAccessibilityFromProps(props),
  };

  const memberSymbol = createFieldSymbol(props.name, options);

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getModifiers(props),
  ]);

  return (
    <Declaration symbol={memberSymbol}>
      <DocWhen doc={props.doc} />
      {modifiers}
      {props.type} <Name />;
    </Declaration>
  );
}
