import {
  For,
  Show,
  childrenArray,
  computed,
  findKeyedChildren,
  taggedComponent,
} from "@alloy-js/core";
import { dataclassesModule } from "../builtins/python.js";
import { findMethodDeclaration } from "../utils.js";
import { Atom } from "./Atom.jsx";
import type { ClassDeclarationProps } from "./ClassDeclaration.js";
import { ClassDeclaration } from "./ClassDeclaration.js";
import { StatementList } from "./StatementList.js";

/**
 * Validate the keyword arguments for the Python `@dataclass(...)` decorator.
 */
function validateDataclassDecoratorKwargs(
  children: any[],
  kwargs: DataclassDecoratorKwargs,
) {
  if (kwargs.weakref_slot === true && kwargs.slots !== true) {
    throw new Error(
      "weakref_slot=True requires slots=True in @dataclass decorator",
    );
  }

  if (kwargs.order === true && kwargs.eq === false) {
    throw new Error("order=True requires eq=True in @dataclass decorator");
  }

  if (kwargs.order === true) {
    const orderingMethods = ["__lt__", "__le__", "__gt__", "__ge__"];
    const conflict = findMethodDeclaration(children, orderingMethods);
    if (conflict) {
      throw new TypeError(
        `Cannot specify order=True when the class already defines ${conflict}()`,
      );
    }
  }

  if (kwargs.unsafe_hash === true) {
    const conflict = findMethodDeclaration(children, ["__hash__"]);
    if (conflict) {
      throw new TypeError(
        `Cannot specify unsafe_hash=True when the class already defines ${conflict}()`,
      );
    }
  }

  if (kwargs.frozen === true) {
    const conflict = findMethodDeclaration(children, [
      "__setattr__",
      "__delattr__",
    ]);
    if (conflict) {
      throw new TypeError(
        `Cannot specify frozen=True when the class already defines ${conflict}()`,
      );
    }
  }

  if (kwargs.slots === true) {
    const conflict = findMethodDeclaration(children, ["__slots__"]);
    if (conflict) {
      throw new TypeError(
        `Cannot specify slots=True when the class already defines ${conflict}()`,
      );
    }
  }
}

/**
 * Allowed keyword arguments for the Python `@dataclass(...)` decorator.
 * Showcases arguments valid for Python 3.11+.
 */
export interface DataclassDecoratorKwargs {
  init?: boolean;
  repr?: boolean;
  eq?: boolean;
  order?: boolean;
  unsafe_hash?: boolean;
  frozen?: boolean;
  match_args?: boolean;
  kw_only?: boolean;
  slots?: boolean;
  weakref_slot?: boolean;
}

export interface DataclassDeclarationProps extends ClassDeclarationProps {
  /** Keyword arguments to pass to `@dataclass(...)` (only valid dataclass params). */
  decoratorKwargs?: DataclassDecoratorKwargs;
}

/**
 * Renders a Python dataclass. Uses ClassDeclaration component internally.
 *
 * Example:
 * ```tsx
 * <py.DataclassDeclaration name="User" decoratorKwargs={{ kw_only: true }}>
 *   <py.VariableDeclaration instanceVariable omitNone name="id" type="int" />
 *   <py.DataclassKWOnly />
 *   <py.VariableDeclaration
 *     instanceVariable
 *     name="name"
 *     type="str"
 *     initializer={"Anonymous"}
 *   />
 * </py.DataclassDeclaration>
 * ```
 * Will render as:
 * ```py
 * from dataclasses import dataclass
 * from dataclasses import KW_ONLY
 *
 * @dataclass(kw_only=True)
 * class User:
 *     id: int
 *     _: KW_ONLY
 *     name: str = "Anonymous"
 * ```
 */
export function DataclassDeclaration(props: DataclassDeclarationProps) {
  const kwargs = props.decoratorKwargs as DataclassDecoratorKwargs | undefined;
  const hasDecoratorArgs =
    kwargs !== undefined && Object.keys(kwargs).length > 0;
  const childrenComputed = computed(() => childrenArray(() => props.children));
  const hasBodyChildren = childrenComputed.value.some(Boolean);
  const children = childrenComputed.value;

  if (props.decoratorKwargs) {
    validateDataclassDecoratorKwargs(children, props.decoratorKwargs);
  }

  // Validate at most one KW_ONLY sentinel in children
  if (hasBodyChildren) {
    if (findKeyedChildren(children, DataclassKWOnly.tag).length > 1) {
      throw new Error(
        "Only one KW_ONLY sentinel is allowed per dataclass body",
      );
    }
  }

  return (
    <>
      {"@"}
      {dataclassesModule["."].dataclass}
      <Show when={hasDecoratorArgs}>
        {"("}
        <For
          each={Object.keys(kwargs ?? {}).map((k) => [k, (kwargs as any)[k]])}
          comma
          space
        >
          {([k, v]) => (
            <>
              {k}=<Atom jsValue={v} />
            </>
          )}
        </For>
        {")"}
      </Show>
      <hbr />
      <ClassDeclaration name={props.name} bases={props.bases} doc={props.doc}>
        {hasBodyChildren ?
          <StatementList>{props.children}</StatementList>
        : undefined}
      </ClassDeclaration>
    </>
  );
}

/**
 * Emits the `KW_ONLY` sentinel line inside a dataclass body.
 */
const kwOnlyTag = Symbol();
// Tagging DataclassKWOnly allows us to use findKeyedChild to accurately detect and
// count occurrences, ensuring the “only one KW_ONLY” rule is enforced.
export const DataclassKWOnly = taggedComponent(
  kwOnlyTag,
  function DataclassKWOnly() {
    return (
      <>
        {"_"}: {dataclassesModule["."].KW_ONLY}
      </>
    );
  },
);
