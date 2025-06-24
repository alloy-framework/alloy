import * as core from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpOutputSymbol } from "../../symbols/csharp-output-symbol.js";
import { CSharpMemberScope } from "../../symbols/scopes.js";
import { DocWhen } from "../doc/comment.jsx";
import { Name } from "../Name.jsx";

export interface RecordModifiers {
  readonly partial?: boolean;
}

const getRecordModifiers = makeModifiers<RecordModifiers>(["partial"]);

// properties for creating a class
export interface RecordDeclarationProps
  extends Omit<core.DeclarationProps, "nameKind">,
    AccessModifiers,
    RecordModifiers {
  name: string;

  /** Doc comment */
  doc?: core.Children;
  refkey?: core.Refkey;
  typeParameters?: Record<string, core.Refkey>;
}

/**
 * CSharp record declaration.
 * @example
 * ```tsx
 * <RecordDeclaration public name="IMyRecord">
 *   <RecordMember public name="MyProperty" type="int" />
 *   <RecordMethod public name="MyMethod" returnType="void">
 *     <Parameter name="value" type="int" />
 *   </RecordMethod>
 * </RecordDeclaration>
 * ```
 * This will produce:
 * ```csharp
 * public record MyIface
 * {
 *   public int MyProperty { get; set; }
 *   public void MyMethod(int value);
 * }
 * ```
 */
export function RecordDeclaration(props: RecordDeclarationProps) {
  const name = useCSharpNamePolicy().getName(props.name!, "record");

  const thisRecordSymbol = new CSharpOutputSymbol(name, {
    refkeys: props.refkey,
  });

  // this creates a new scope for the record definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisRecordScope = new CSharpMemberScope("record-decl", {
    owner: thisRecordSymbol,
  });

  let typeParams: core.Children;
  if (props.typeParameters) {
    const typeParamNames = new Array<string>();
    for (const entry of Object.entries(props.typeParameters)) {
      typeParamNames.push(
        useCSharpNamePolicy().getName(entry[0], "type-parameter"),
      );
      // create a symbol for each type param so its
      // refkey resolves to the type param's name
      new CSharpOutputSymbol(entry[0], {
        scope: thisRecordScope,
        refkeys: entry[1],
      });
    }
    typeParams = (
      <group>
        {"<"}
        <core.For each={typeParamNames} comma line>
          {(name) => name}
        </core.For>
        {">"}
      </group>
    );
  }

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getRecordModifiers(props),
  ]);
  return (
    <core.Declaration symbol={thisRecordSymbol}>
      <DocWhen doc={props.doc} />
      {modifiers}record <Name />
      {typeParams}
      {props.children ?
        <core.Block newline>
          <core.Scope value={thisRecordScope}>{props.children}</core.Scope>
        </core.Block>
      : ";"}
    </core.Declaration>
  );
}
