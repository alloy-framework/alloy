import { For, Show } from "@alloy-js/core";
import { snakeCase } from "change-case";
import { dataclassesModule } from "../builtins/python.js";
import { usePythonScope } from "../symbols/scopes.js";
import { Atom } from "./Atom.jsx";
import type { ClassDeclarationProps } from "./ClassDeclaration.js";
import { ClassDeclaration } from "./ClassDeclaration.js";
import { StatementList } from "./StatementList.js";

/**
 * Validate decorator-only rules that do not depend on class members.
 */
function validateDataclassDecoratorArgs(kwargs: DataclassDecoratorKwargs) {
  if (kwargs.weakrefSlot === true && kwargs.slots !== true) {
    throw new Error(
      "weakref_slot=True requires slots=True in @dataclass decorator",
    );
  }
  if (kwargs.order === true && kwargs.eq === false) {
    throw new Error("order=True requires eq=True in @dataclass decorator");
  }
}

/**
 * Validate symbol-level conflicts. Must be called from within a member scope
 * (inside the class body) so member symbols are available.
 */
function validateDataclassMemberConflicts(kwargs: DataclassDecoratorKwargs) {
  const scope = usePythonScope();
  const owner: any = (scope as any).ownerSymbol;
  if (!owner) return;

  const hasMemberNamed = (name: string): boolean => {
    const instanceNames: Set<string> | undefined = (
      owner.instanceMembers as any
    )?.symbolNames;
    const staticNames: Set<string> | undefined = (owner.staticMembers as any)
      ?.symbolNames;
    return Boolean(instanceNames?.has(name) || staticNames?.has(name));
  };

  if (kwargs.order === true) {
    for (const m of ["__lt__", "__le__", "__gt__", "__ge__"]) {
      if (hasMemberNamed(m)) {
        throw new TypeError(
          `Cannot specify order=True when the class already defines ${m}()`,
        );
      }
    }
  }

  if (kwargs.unsafeHash === true && hasMemberNamed("__hash__")) {
    throw new TypeError(
      "Cannot specify unsafe_hash=True when the class already defines __hash__()",
    );
  }

  if (kwargs.frozen === true) {
    if (hasMemberNamed("__setattr__")) {
      throw new TypeError(
        "Cannot specify frozen=True when the class already defines __setattr__()",
      );
    }
    if (hasMemberNamed("__delattr__")) {
      throw new TypeError(
        "Cannot specify frozen=True when the class already defines __delattr__()",
      );
    }
  }

  if (kwargs.slots === true && hasMemberNamed("__slots__")) {
    throw new TypeError(
      "Cannot specify slots=True when the class already defines __slots__()",
    );
  }

  // Enforce at most one KW_ONLY sentinel as a symbol
  let kwOnlyCount = 0;
  for (const sym of owner.instanceMembers as Iterable<any>) {
    if (sym.originalName === "_") kwOnlyCount++;
  }
  if (kwOnlyCount > 1) {
    throw new Error("Only one KW_ONLY sentinel is allowed per dataclass body");
  }
}

/**
 * Allowed keyword arguments for the Python `@dataclass(...)` decorator.
 * Single source of truth: runtime keys and compile-time type are derived here.
 */
export const dataclassDecoratorKeys = [
  "init",
  "repr",
  "eq",
  "order",
  "unsafeHash",
  "frozen",
  "matchArgs",
  "kwOnly",
  "slots",
  "weakrefSlot",
] as const;
export const dataclassDecoratorKeySet = new Set<string>(
  dataclassDecoratorKeys as unknown as string[],
);
export type DataclassDecoratorKey = (typeof dataclassDecoratorKeys)[number];
export type DataclassDecoratorKwargs = Partial<
  Record<DataclassDecoratorKey, boolean>
>;

export interface DataclassDeclarationProps
  extends ClassDeclarationProps,
    DataclassDecoratorKwargs {}

/**
 * Renders a Python dataclass.
 *
 * Example:
 * ```tsx
 * <py.DataclassDeclaration name="User" kwOnly>
 *   <py.VariableDeclaration instanceVariable omitNone name="id" type="int" />
 *   <py.VariableDeclaration instanceVariable name={namekey("_", { ignoreNamePolicy: true })} type={dataclassesModule["."].KW_ONLY} omitNone />
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
  // Collect flags from props in the order they appear (preserves emission order)
  const decoratorEntries: Array<[string, any]> = [];
  const kwargs = {} as DataclassDecoratorKwargs;
  for (const key of Object.keys(props)) {
    // Only include known flags; skip undefined values
    if (dataclassDecoratorKeySet.has(key)) {
      const value = (props as any)[key];
      if (value !== undefined) {
        (kwargs as any)[key] = value;
        decoratorEntries.push([snakeCase(key), value]);
      }
    }
  }
  const hasDecoratorArgs = decoratorEntries.length > 0;

  if (hasDecoratorArgs) {
    validateDataclassDecoratorArgs(kwargs);
  }

  return (
    <>
      {"@"}
      {dataclassesModule["."].dataclass}
      <Show when={hasDecoratorArgs}>
        (
        <For each={decoratorEntries} comma space>
          {([k, v]) => (
            <>
              {k}=<Atom jsValue={v} />
            </>
          )}
        </For>
        )
      </Show>
      <hbr />
      <ClassDeclaration name={props.name} bases={props.bases} doc={props.doc}>
        <StatementList>{props.children}</StatementList>
        {validateDataclassMemberConflicts(kwargs as DataclassDecoratorKwargs)}
      </ClassDeclaration>
    </>
  );
}
