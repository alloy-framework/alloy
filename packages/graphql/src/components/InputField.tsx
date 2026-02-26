import { childrenArray, type Children, type Component } from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import {
  DirectiveTargetContext,
  addInputFieldToType,
  createInputFieldDefinition,
  resolveDeprecationReason,
  useSchemaContext,
  useTypeContext,
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

export interface InputFieldProps extends DeprecatedProps {
  name: NameInput;
  type: TypeReference;
  nonNull?: boolean;
  description?: string;
  defaultValue?: unknown;
  children?: Children;
}

export interface InputFieldListProps {
  nonNull?: boolean;
  children?: Children;
}

const inputFieldList = createListSlot<InputFieldListProps>({
  listName: "InputField.List",
  ownerLabel: "InputField",
});
const inputFieldListTag = inputFieldList.tag;

function InputFieldBase(props: InputFieldProps) {
  const state = useSchemaContext();
  const typeDefinition = useTypeContext();
  if (typeDefinition.kind !== "input") {
    throw new Error("InputField must be used within an InputObjectType.");
  }

  const children = childrenArray(() => props.children);
  const listSlot = inputFieldList.findListSlot(children);
  assertOnlyDirectiveAndListChildren(children, {
    ownerLabel: "InputField",
    listName: "InputField.List",
    listTag: inputFieldListTag,
    directiveComponent: Directive,
  });
  const type = resolveListType(
    props.type,
    props.nonNull,
    listSlot,
    inputFieldList.applyListType,
  );
  const field = createInputFieldDefinition(
    state,
    props.name,
    type,
    props.description,
    props.defaultValue,
    resolveDeprecationReason(props),
  );
  addInputFieldToType(typeDefinition, field);
  return (
    <DirectiveTargetContext.Provider
      value={{
        location: DirectiveLocation.INPUT_FIELD_DEFINITION,
        directives: field.directives,
        target: field,
      }}
    >
      {filterListSlotChildren(children, inputFieldListTag)}
    </DirectiveTargetContext.Provider>
  );
}

export interface InputFieldComponent {
  (props: InputFieldProps): Children;
  List: Component<InputFieldListProps> &
    Required<Pick<Component<InputFieldListProps>, "tag">>;
}

/**
 * Adds an input field to the nearest `InputObjectType`.
 *
 * @example Basic input field
 * ```tsx
 * <InputObjectType name="UserFilter">
 *   <InputField name="name" type={String} />
 * </InputObjectType>
 * ```
 *
 * @example Default value
 * ```tsx
 * <InputObjectType name="Paging">
 *   <InputField name="limit" type={Int} defaultValue={20} />
 * </InputObjectType>
 * ```
 *
 * @remarks
 * This component must be used within an `InputObjectType`. Unlike `Field`, it
 * defines input object fields and does not accept arguments.
 */
export function InputField(props: InputFieldProps) {
  return InputFieldBase(props);
}

/**
 * Marks the input field type as a list.
 *
 * @example List input field
 * ```tsx
 * <InputField name="tags" type={String}>
 *   <InputField.List />
 * </InputField>
 * ```
 *
 * @example Nested list
 * ```tsx
 * <InputField name="matrix" type={Int}>
 *   <InputField.List>
 *     <InputField.List />
 *   </InputField.List>
 * </InputField>
 * ```
 */
InputField.List = inputFieldList.List;
