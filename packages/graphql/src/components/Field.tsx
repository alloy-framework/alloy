import {
  childrenArray,
  findKeyedChild,
  isNamekey,
  type Children,
  type Component,
} from "@alloy-js/core";
import { DirectiveLocation } from "graphql";
import pluralize from "pluralize";
import { Int } from "../builtins/graphql.js";
import { useConnectionOptions } from "../connection-options.js";
import { isRelayNamePolicy } from "../name-policy.js";
import {
  addFieldToType,
  ArgTargetContext,
  createFieldDefinition,
  DirectiveTargetContext,
  resolveDeprecationReason,
  useSchemaContext,
  useTypeContext,
  type DeprecatedProps,
  type NameInput,
  type TypeReference,
} from "../schema.js";
import { filterTaggedChildren, isTaggedChild } from "../schema/children.js";
import { applyNonNullType, extractNamedTypeName } from "../schema/refs.js";
import type {
  InterfaceTypeDefinition,
  ObjectTypeDefinition,
  SchemaState,
} from "../schema/types.js";
import { Connection, CONNECTION_SUFFIX } from "./Connection.js";
import { InputValue } from "./InputValue.js";
import { createListSlot } from "./ListSlot.js";
import { createTaggedSlot } from "./TaggedSlot.js";

export interface FieldProps extends DeprecatedProps {
  name: NameInput;
  type: TypeReference;
  nonNull?: boolean;
  description?: string;
  children?: Children;
}

function FieldBase(props: FieldProps) {
  const state = useSchemaContext();
  const typeDefinition = useTypeContext();
  if (typeDefinition.kind !== "object" && typeDefinition.kind !== "interface") {
    throw new Error(
      "Field must be used within an ObjectType or InterfaceType.",
    );
  }

  const children = childrenArray(() => props.children);

  const listSlot = fieldList.findListSlot(children);
  const connectionSlot = fieldConnectionSlot.findSlot(children);

  if (connectionSlot && listSlot) {
    throw new Error("Field.Connection cannot be combined with Field.List.");
  }

  const fieldNameInput =
    connectionSlot ?
      (connectionSlot.props.fieldName ?? props.name)
    : props.name;
  const baseFieldName = unwrapNameInput(props.name);
  const connectionInfo =
    connectionSlot ?
      resolveConnectionTypeInfo(
        state,
        connectionSlot,
        typeDefinition,
        baseFieldName,
      )
    : undefined;

  const fieldType =
    connectionSlot ? connectionInfo!.connectionType : props.type;
  const type = resolveFieldType(fieldType, props.nonNull, listSlot);
  const field = createFieldDefinition(
    state,
    fieldNameInput,
    type,
    props.description,
    resolveDeprecationReason(props),
  );
  addFieldToType(typeDefinition, field);

  const fieldChildren = filterTaggedChildren(children, [
    fieldList.tag,
    fieldConnectionSlot.tag,
  ]);

  if (connectionSlot) {
    fieldChildren.unshift(...createPaginationArgs());
  }

  const result = [
    <DirectiveTargetContext.Provider
      value={{
        location: DirectiveLocation.FIELD_DEFINITION,
        directives: field.directives,
        target: field,
      }}
    >
      <ArgTargetContext.Provider
        value={{ args: field.args, argNames: field.argNames }}
      >
        {fieldChildren}
      </ArgTargetContext.Provider>
    </DirectiveTargetContext.Provider>,
  ];

  if (connectionSlot) {
    result.push(
      createConnectionDefinition(props, connectionSlot, state, connectionInfo!),
    );
  }

  return [...result];
}

export interface FieldListProps {
  nonNull?: boolean;
  children?: Children;
}

export interface FieldConnectionProps {
  type?: TypeReference;
  fieldName?: NameInput;
  children?: Children;
}

const fieldList = createListSlot<FieldListProps>({
  listName: "Field.List",
  ownerLabel: "Field",
});
const fieldConnectionSlot = createTaggedSlot<FieldConnectionProps>({
  slotName: "Field.Connection",
  ownerLabel: "Field",
});

export interface FieldComponent {
  (props: FieldProps): Children;
  List: Component<FieldListProps> &
    Required<Pick<Component<FieldListProps>, "tag">>;
  Connection: Component<FieldConnectionProps> &
    Required<Pick<Component<FieldConnectionProps>, "tag">>;
}

function createPaginationArgs() {
  const pagination = useConnectionOptions();
  const args: Children[] = [];
  if (pagination.forward) {
    args.push(<InputValue name="after" type={pagination.cursorType} />);
    args.push(<InputValue name="first" type={Int} />);
  }
  if (pagination.backward) {
    args.push(<InputValue name="before" type={pagination.cursorType} />);
    args.push(<InputValue name="last" type={Int} />);
  }
  return args;
}

function validateConnectionChildren(connectionChildren: Children[]) {
  if (
    findKeyedChild(connectionChildren, Connection.Edge.tag) ||
    findKeyedChild(connectionChildren, Connection.PageInfo.tag)
  ) {
    throw new Error(
      "Field.Connection only supports Connection.Fields. Define a Connection type to customize edges or pageInfo.",
    );
  }

  if (
    !connectionChildren.every(isTaggedChild.bind(null, [Connection.Fields.tag]))
  ) {
    throw new Error(
      "Field.Connection only supports Connection.Fields children. Place field arguments on Field instead.",
    );
  }
}

function validateConnectionName(
  connectionTypeName: string,
  state: SchemaState,
) {
  const hasConnectionSuffix = connectionTypeName
    .toLowerCase()
    .endsWith(CONNECTION_SUFFIX.toLowerCase());

  if (hasConnectionSuffix) return;

  if (
    isRelayNamePolicy(state.namePolicy) ||
    !state.types.has(connectionTypeName)
  ) {
    throw new Error(
      `Connection type name "${connectionTypeName}" must end with "${CONNECTION_SUFFIX}".`,
    );
  }
}

interface ConnectionTypeInfo {
  connectionType: TypeReference;
  connectionTypeName?: string;
}

function resolveConnectionTypeInfo(
  state: SchemaState,
  connectionSlot: any,
  typeDefinition: ObjectTypeDefinition | InterfaceTypeDefinition,
  baseFieldName: string,
): ConnectionTypeInfo {
  const rootTypeNames = resolveRootTypeNames(state);
  const isRootType =
    typeDefinition.kind === "object" && rootTypeNames.has(typeDefinition.name);
  const defaultConnectionName = `${capitalize(
    pluralize(baseFieldName),
  )}Connection`;
  const connectionType =
    connectionSlot.props.type ??
    (isRootType ?
      defaultConnectionName
    : `${typeDefinition.name}${defaultConnectionName}`);

  const connectionTypeName = extractNamedTypeName(state, connectionType);

  return { connectionType, connectionTypeName };
}

function createConnectionDefinition(
  props: FieldProps,
  connectionSlot: any,
  state: SchemaState,
  connectionInfo: ConnectionTypeInfo,
) {
  const connectionChildren = childrenArray(() => connectionSlot.props.children);
  validateConnectionChildren(connectionChildren);

  const { connectionTypeName } = connectionInfo;
  if (!connectionTypeName) {
    throw new Error(
      "Field.Connection requires a named connection type to define connection types.",
    );
  }
  validateConnectionName(connectionTypeName, state);

  if (state.types.has(connectionTypeName)) {
    if (connectionChildren.length > 0) {
      throw new Error(
        "Field.Connection cannot add Connection.Fields when the connection type already exists. Define a Connection type instead.",
      );
    }
    return null;
  }
  const connectionName = connectionTypeName.slice(0, -CONNECTION_SUFFIX.length);
  return (
    <Connection name={connectionName} type={props.type}>
      {connectionChildren.length > 0 ? connectionChildren : null}
    </Connection>
  );
}

/**
 * Adds a field to the nearest `ObjectType` or `InterfaceType`.
 *
 * @example Basic field
 * ```tsx
 * <ObjectType name="User">
 *   <Field name="id" type={ID} nonNull />
 *   <Field name="name" type={String} />
 * </ObjectType>
 * ```
 *
 * @example Field with arguments
 * ```tsx
 * <ObjectType name="Query">
 *   <Field name="user" type={User}>
 *     <InputValue name="id" type={ID} nonNull />
 *   </Field>
 * </ObjectType>
 * ```
 *
 * @example List field
 * ```tsx
 * <Field name="tags" type={String}>
 *   <Field.List />
 * </Field>
 * ```
 *
 * @example Connection field
 * ```tsx
 * <Field name="users" type={User}>
 *   <Field.Connection />
 * </Field>
 * ```
 *
 * @remarks
 * Use `Field.List` for list types or `Field.Connection` to define a Relay-style
 * connection. A `Field.Connection` child cannot be combined with `Field.List`.
 * The `nonNull` prop controls whether the field's type is wrapped in `Non-Null`.
 * When using `Field.List`, `nonNull` applies to the list items while
 * `Field.List`'s `nonNull` applies to the list itself.
 */
export function Field(props: FieldProps) {
  return FieldBase(props);
}

/**
 * Marks the field type as a list.
 *
 * @example List field wrapper
 * ```tsx
 * <Field name="items" type={Item}>
 *   <Field.List />
 * </Field>
 * ```
 */
Field.List = fieldList.List;
/**
 * Declares a connection field and optionally defines the connection type.
 *
 * @example Connection field slot
 * ```tsx
 * <Field name="users" type={User}>
 *   <Field.Connection />
 * </Field>
 * ```
 *
 * @remarks
 * Define connection arguments on `Field` and use `Connection.Fields` to add
 * additional fields to the generated connection type. `Field.Connection` does
 * not rename the field unless you pass `fieldName`. The connection type name is
 * still derived from the parent `Field` name.
 */
Field.Connection = fieldConnectionSlot.Slot;

function resolveFieldType(
  type: TypeReference,
  itemNonNull: boolean | undefined,
  listSlot?: ReturnType<typeof fieldList.findListSlot>,
): TypeReference {
  const baseType = applyNonNullType(type, itemNonNull);
  return listSlot ? fieldList.applyListType(baseType, listSlot) : baseType;
}

function capitalize(value: string): string {
  if (value.length === 0) {
    return value;
  }
  return value[0].toUpperCase() + value.slice(1);
}

function resolveRootTypeNames(state: SchemaState): Set<string> {
  const rootNames = new Set<string>();
  const addRootName = (typeRef?: TypeReference) => {
    const name = typeRef ? extractNamedTypeName(state, typeRef) : undefined;
    if (name) {
      rootNames.add(name);
    }
  };

  const queryRef =
    state.schema.query ?? (state.types.has("Query") ? "Query" : undefined);
  addRootName(queryRef);
  addRootName(state.schema.mutation);
  addRootName(state.schema.subscription);
  return rootNames;
}

function unwrapNameInput(value: NameInput): string {
  return isNamekey(value) ? value.name : value;
}
