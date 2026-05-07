import { For, List, childrenArray, type Children } from "@alloy-js/core";
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
  arbitraryTypesAllowed?: boolean;
  extra?: "allow" | "forbid" | "ignore";
  fromAttributes?: boolean;
  frozen?: boolean;
  populateByName?: boolean;
  strStripWhitespace?: boolean;
  strict?: boolean;
  validateAssignment?: boolean;
  validateDefault?: boolean;
}

export interface PydanticClassDeclarationProps extends ClassDeclarationProps {
  /**
   * Emits `model_config = ConfigDict(...)` before field declarations, using the
   * given flags. Omitted keys are not passed to `ConfigDict`.
   *
   * Ignored when {@link PydanticClassDeclarationProps.modelConfigExpression} is set.
   */
  modelConfig?: PydanticModelConfigDictProps;
  /**
   * Emits `model_config = <expression>` verbatim (use for arbitrary `ConfigDict`
   * kwargs or dynamic config). Takes precedence over structured `modelConfig`.
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
 * Optional **`modelConfig`** emits `model_config = ConfigDict(...)` for common
 * Pydantic v2 model settings (see {@link PydanticModelConfigDictProps}).
 *
 * Fields are ordinary class body declarations; use `pydanticModule["."].Field` in
 * initializers when you need `Field(...)`.
 *
 * @example
 * ```tsx
 * import { pydanticModule } from "@alloy-js/python";
 * import * as py from "@alloy-js/python";
 *
 * <py.PydanticClassDeclaration name="User" modelConfig={{ frozen: true }}>
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
  const { modelConfig, modelConfigExpression, children, ...rest } = props;
  const bases = rest.bases ?? [pydanticModule["."].BaseModel];

  const configEntries: Array<[string, unknown]> = [];
  if (modelConfig && modelConfigExpression === undefined) {
    for (const key of Object.keys(modelConfig)) {
      const value = (modelConfig as Record<string, unknown>)[key];
      if (value !== undefined) {
        configEntries.push([snakeCase(key), value]);
      }
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
    >
      <List hardline>
        <For each={bodyItems}>{(item) => item}</For>
      </List>
    </ClassDeclaration>
  );
}
