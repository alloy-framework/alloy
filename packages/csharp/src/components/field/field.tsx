import type { Children, Namekey, Refkey } from "@alloy-js/core";
import { Declaration, Name } from "@alloy-js/core";

import type { AccessModifiers } from "../../modifiers.js";
import {
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import {
  accessibilityFromProps,
  nonAccessibilityFromProps,
} from "../../symbols/csharp.js";
import { createFieldSymbol } from "../../symbols/factories.js";
import type { AttributesProp } from "../attributes/attributes.jsx";
import { AttributeList } from "../attributes/attributes.jsx";
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

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <Field name="myField" type="int" attributes={[
   *  <Attribute name="Test" />
   * ]} />
   * ```
   * This will produce:
   * ```csharp
   * [Test]
   * int myField;
   * ```
   */
  attributes?: AttributesProp;
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
      <AttributeList attributes={props.attributes} endline />
      {modifiers}
      {props.type} <Name />;
    </Declaration>
  );
}
