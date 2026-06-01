import {
  For,
  List,
  childrenArray,
  splitProps,
  type Children,
} from "@alloy-js/core";
import { snakeCase } from "change-case";
import { pydanticModule } from "../builtins/python.js";
import { Atom } from "./Atom.jsx";
import type { ClassDeclarationProps } from "./ClassDeclaration.js";
import { ClassDeclaration } from "./ClassDeclaration.js";

/**
 * Keyword-style options for Pydantic v2 `ConfigDict`, using camelCase prop names
 * that map to snake_case Python arguments (for example `validateAssignment` →
 * `validate_assignment`).
 */
export interface PydanticModelConfigDictProps {
  /** Allow non-pydantic/arbitrary Python types in field annotations. */
  arbitraryTypesAllowed?: boolean;
  /** Behavior for unknown input keys: allow, forbid, or ignore. */
  extra?: "allow" | "forbid" | "ignore";
  /** Populate models from object attributes (ORM-style) instead of mapping keys. */
  fromAttributes?: boolean;
  /** Make models immutable (`frozen=True`). */
  frozen?: boolean;
  /** Allow population by field name even when aliases are defined. */
  populateByName?: boolean;
  /** Strip leading/trailing whitespace from all `str` fields. */
  strStripWhitespace?: boolean;
  /** Enable strict validation globally for the model. */
  strict?: boolean;
  /** Re-validate when attributes are assigned after model creation. */
  validateAssignment?: boolean;
  /** Validate default values in addition to provided input values. */
  validateDefault?: boolean;
}

const PydanticModelConfigKeys = [
  "arbitraryTypesAllowed",
  "frozen",
  "extra",
  "fromAttributes",
  "populateByName",
  "strStripWhitespace",
  "strict",
  "validateAssignment",
  "validateDefault",
] as const satisfies readonly (keyof PydanticModelConfigDictProps)[];

export interface PydanticClassDeclarationProps
  extends ClassDeclarationProps,
    PydanticModelConfigDictProps {
  /**
   * Canonical structured config object for `ConfigDict(...)`. Values here are
   * merged with top-level config props.
   *
   * Top-level config props take precedence over `modelConfig` when the same key
   * is provided in both places.
   */
  modelConfig?: PydanticModelConfigDictProps;
  /**
   * Emits `model_config = <expression>` verbatim (use for arbitrary `ConfigDict`
   * kwargs or dynamic config). Takes precedence over both `modelConfig` and
   * top-level config props.
   *
   * @example
   * A typical value emits `ConfigDict(frozen=True, extra="forbid")`.
   */
  modelConfigExpression?: Children;
}

/**
 * Renders a Python class that subclasses Pydantic's `BaseModel`:
 * `class Name(BaseModel): ...`.
 *
 * When `bases` is omitted, the class extends `pydanticModule["."].BaseModel`.
 * Pass `bases` to inherit from another generated class (or to combine bases explicitly).
 *
 * Optional `modelConfig={{...}}` and top-level config props (for example
 * `frozen`, `strict`, `extra`) emit `model_config = ConfigDict(...)` for common
 * Pydantic v2 model settings (see {@link PydanticModelConfigDictProps}).
 * When both are used, top-level props override `modelConfig` keys.
 *
 * Fields are ordinary class body declarations; use `pydanticModule["."].Field` in
 * initializers when you need `Field(...)`.
 *
 * @example
 * ```tsx
 * import { pydanticModule } from "@alloy-js/python";
 * import * as py from "@alloy-js/python";
 *
 * <py.PydanticClassDeclaration name="User" frozen>
 *   <py.VariableDeclaration instanceVariable omitNone name="id" type="int" />
 *   <py.VariableDeclaration
 *     instanceVariable
 *     name="name"
 *     type="str"
 *     initializer={"Field(default=\"anonymous\")"}
 *   />
 * </py.PydanticClassDeclaration>
 * ```
 *
 * ```py
 * from pydantic import BaseModel
 * from pydantic import ConfigDict
 * from pydantic import Field
 *
 * class User(BaseModel):
 *     model_config = ConfigDict(frozen=True)
 *     id: int
 *     name: str = Field(default="anonymous")
 * ```
 */
export function PydanticClassDeclaration(props: PydanticClassDeclarationProps) {
  const [modelConfigProps, bodyProps, rest] = splitProps(
    props,
    PydanticModelConfigKeys,
    ["modelConfig", "modelConfigExpression", "children"],
  );
  const bases = rest.bases ?? [pydanticModule["."].BaseModel];
  const { modelConfig, modelConfigExpression, children } = bodyProps;

  const configEntries: Array<[string, unknown]> = [];
  if (modelConfigExpression === undefined) {
    for (const key of PydanticModelConfigKeys) {
      const value = modelConfigProps[key] ?? modelConfig?.[key];
      if (value === undefined) continue;
      configEntries.push([snakeCase(key), value]);
    }
  }
  const hasStructuredModelConfig =
    modelConfigExpression === undefined && configEntries.length > 0;
  const hasExpressionModelConfig = modelConfigExpression !== undefined;

  const bodyItems: Children[] = [];
  if (hasExpressionModelConfig) {
    bodyItems.push(
      <>
        {"model_config = "}
        {modelConfigExpression}
      </>,
    );
  } else if (hasStructuredModelConfig) {
    bodyItems.push(
      <>
        {"model_config = "}
        {pydanticModule["."].ConfigDict}
        {"("}
        <For each={configEntries} comma space>
          {([k, v]) => (
            <>
              {k}=<Atom jsValue={v} />
            </>
          )}
        </For>
        {")"}
      </>,
    );
  }
  bodyItems.push(...childrenArray(() => children));

  return (
    <ClassDeclaration
      name={rest.name}
      bases={bases}
      doc={rest.doc}
      refkey={rest.refkey}
      decorators={rest.decorators}
    >
      <List hardline>
        <For each={bodyItems}>{(item) => item}</For>
      </List>
    </ClassDeclaration>
  );
}
