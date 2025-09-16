import * as core from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { createClassScope } from "../../scopes/factories.js";
import {
  createNamedTypeSymbol,
  createTypeParameterSymbol,
} from "../../symbols/factories.js";
import { DocWhen } from "../doc/comment.jsx";
import { Name } from "../Name.jsx";
import { ParameterProps, Parameters } from "../parameters/parameters.jsx";

export interface RecordModifiers {
  readonly partial?: boolean;
}

const getRecordModifiers = makeModifiers<RecordModifiers>(["partial"]);

/** Props to use the {@link RecordDeclaration} component */
export interface RecordDeclarationProps
  extends Omit<core.DeclarationProps, "nameKind">,
    AccessModifiers,
    RecordModifiers {
  name: string | core.Namekey;

  /** Doc comment */
  doc?: core.Children;
  refkey?: core.Refkey;
  typeParameters?: Record<string, core.Refkey>;

  /**
   * Set the primary constructor parameters
   * @example
   * ```tsx
   *  <ClassDeclaration name="MyClass" primaryConstructor={[
   *    {name: "value", type: "int"}
   *  ]}>
   * ```
   * This will produce:
   * ```csharp
   * public class MyClass(int value)
   * {
   *
   * }
   * ```
   */
  primaryConstructor?: ParameterProps[];
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
  // records don't have their own type kind but instead use class or struct
  // depending on what kind of record we have.
  const thisRecordSymbol = createNamedTypeSymbol(props.name, "record", {
    refkeys: props.refkey,
    namePolicy: useCSharpNamePolicy().for("record"),
  });

  const thisRecordScope = createClassScope(thisRecordSymbol);

  let typeParams: core.Children;
  if (props.typeParameters) {
    const typeParamNames = new Array<string>();
    for (const entry of Object.entries(props.typeParameters)) {
      typeParamNames.push(
        useCSharpNamePolicy().getName(entry[0], "type-parameter"),
      );
      // create a symbol for each type param so its
      // refkey resolves to the type param's name
      createTypeParameterSymbol(entry[0], {
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
      {props.primaryConstructor && (
        <core.Scope value={thisRecordScope}>
          <Parameters parameters={props.primaryConstructor} />
        </core.Scope>
      )}
      {props.children ?
        <core.Block newline>
          <core.Scope value={thisRecordScope}>{props.children}</core.Scope>
        </core.Block>
      : ";"}
    </core.Declaration>
  );
}
