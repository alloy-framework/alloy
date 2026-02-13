import { childrenArray, type Children, type Component } from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import {
  DirectiveTargetContext,
  addArgToTarget,
  createArgDefinition,
  resolveDeprecationReason,
  useArgTargetContext,
  useSchemaContext,
  type DeprecatedProps,
  type NameInput,
  type TypeReference,
} from "../schema.js";
import {
  assertOnlyDirectiveAndListChildren,
  filterListSlotChildren,
  resolveListType,
} from "../schema/children.js";
import { Directive } from "./Directive.js";
import { createListSlot } from "./ListSlot.js";

export interface InputValueProps extends DeprecatedProps {
  name: NameInput;
  type: TypeReference;
  nonNull?: boolean;
  description?: string;
  defaultValue?: unknown;
  children?: Children;
}

export interface InputValueListProps {
  nonNull?: boolean;
  children?: Children;
}

const inputValueList = createListSlot<InputValueListProps>({
  listName: "InputValue.List",
  ownerLabel: "InputValue",
});
const inputValueListTag = inputValueList.tag;

function InputValueBase(props: InputValueProps) {
  const state = useSchemaContext();
  const target = useArgTargetContext();
  const children = childrenArray(() => props.children);
  const listSlot = inputValueList.findListSlot(children);
  assertOnlyDirectiveAndListChildren(children, {
    ownerLabel: "InputValue",
    listName: "InputValue.List",
    listTag: inputValueListTag,
    directiveComponent: Directive,
  });
  const type = resolveListType(
    props.type,
    props.nonNull,
    listSlot,
    inputValueList.applyListType,
  );
  const arg = createArgDefinition(
    state,
    props.name,
    type,
    props.description,
    props.defaultValue,
    resolveDeprecationReason(props),
  );
  addArgToTarget(target, arg);
  return (
    <DirectiveTargetContext.Provider
      value={{
        location: DirectiveLocation.ARGUMENT_DEFINITION,
        directives: arg.directives,
        target: arg,
      }}
    >
      {filterListSlotChildren(children, inputValueListTag)}
    </DirectiveTargetContext.Provider>
  );
}

export interface InputValueComponent {
  (props: InputValueProps): Children;
  List: Component<InputValueListProps> &
    Required<Pick<Component<InputValueListProps>, "tag">>;
}

/**
 * Adds an input value to the nearest Field or DirectiveDefinition.
 *
 * @example Field argument
 * ```tsx
 * <Field name="user" type={User}>
 *   <InputValue name="id" type={ID} nonNull />
 * </Field>
 * ```
 *
 * @example Default value
 * ```tsx
 * <Field name="search" type={String}>
 *   <InputValue name="limit" type={Int} defaultValue={20} />
 * </Field>
 * ```
 *
 * @remarks
 * This component must be used within a `Field` or `DirectiveDefinition`.
 */
export function InputValue(props: InputValueProps) {
  return InputValueBase(props);
}

/**
 * Marks the input value type as a list.
 *
 * @example List input value
 * ```tsx
 * <InputValue name="ids" type={ID}>
 *   <InputValue.List />
 * </InputValue>
 * ```
 *
 * @example Nested list
 * ```tsx
 * <InputValue name="matrix" type={Int}>
 *   <InputValue.List>
 *     <InputValue.List />
 *   </InputValue.List>
 * </InputValue>
 * ```
 */
InputValue.List = inputValueList.List;
