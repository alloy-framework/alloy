import type { Children, Component } from "@alloy-js/core";
import {
  childrenArray,
  findUnkeyedChildren,
  isNamekey,
  namekey,
} from "@alloy-js/core";
import { PageInfo } from "../builtins/page-info.js";
import { useConnectionOptions } from "../connection-options.js";
import { type NameInput, type TypeReference } from "../schema.js";
import { Field } from "./Field.js";
import { ObjectType } from "./ObjectType.js";
import { createTaggedSlot } from "./TaggedSlot.js";

export const CONNECTION_SUFFIX = "Connection";

const DEFAULT_DESCRIPTIONS = {
  connection: "A connection to a list of items.",
  edge: "An edge in a connection.",
  pageInfo: "Information to aid in pagination.",
  edges: "A list of edges.",
  node: "The item at the end of the edge",
  cursor: "A cursor for use in pagination",
};

export interface ConnectionProps {
  name: NameInput;
  type: TypeReference;
  children?: Children;
}

export interface ConnectionEdgeProps {
  description?: string;
  children?: Children;
}

export interface ConnectionFieldsProps {
  children?: Children;
}

export interface ConnectionPageInfoProps {
  description?: string;
}

interface ConnectionEdgeDefinitionProps {
  name: NameInput;
  nodeType: TypeReference;
  cursorType: TypeReference;
  description?: string;
  children?: Children;
}

const connectionEdgeSlot = createTaggedSlot<ConnectionEdgeProps>({
  slotName: "Connection.Edge",
  ownerLabel: "Connection",
});
const connectionFieldsSlot = createTaggedSlot<ConnectionFieldsProps>({
  slotName: "Connection.Fields",
  ownerLabel: "Connection",
});
const connectionPageInfoSlot = createTaggedSlot<ConnectionPageInfoProps>({
  slotName: "Connection.PageInfo",
  ownerLabel: "Connection",
});

function ConnectionEdge(props: ConnectionEdgeDefinitionProps) {
  return (
    <ObjectType
      name={props.name}
      description={props.description ?? DEFAULT_DESCRIPTIONS.edge}
    >
      <>
        <Field
          name="node"
          type={props.nodeType}
          description={DEFAULT_DESCRIPTIONS.node}
        />
        <Field
          name="cursor"
          type={props.cursorType}
          nonNull
          description={DEFAULT_DESCRIPTIONS.cursor}
        />
      </>
      {props.children}
    </ObjectType>
  );
}

function ConnectionBase(props: ConnectionProps) {
  const pagination = useConnectionOptions();
  const connectionName = deriveNameInput(props.name, CONNECTION_SUFFIX);
  const edgeName = deriveNameInput(props.name, "Edge");
  const children = childrenArray(() => props.children);
  const edgeSlot = connectionEdgeSlot.findSlot(children);
  const fieldsChildren = connectionFieldsSlot
    .findSlots(children)
    .flatMap((slot) => childrenArray(() => slot.props.children));
  const pageInfoSlot = connectionPageInfoSlot.findSlot(children);
  const unkeyedChildren = findUnkeyedChildren(children);
  const extraFields = [...fieldsChildren, ...unkeyedChildren];
  const pageInfoField = (
    <Field
      name="pageInfo"
      type={PageInfo}
      nonNull
      description={
        pageInfoSlot?.props.description ?? DEFAULT_DESCRIPTIONS.pageInfo
      }
    />
  );
  return (
    <>
      <ObjectType
        name={connectionName}
        description={DEFAULT_DESCRIPTIONS.connection}
      >
        {pageInfoField}
        <Field
          name="edges"
          type={edgeName}
          description={DEFAULT_DESCRIPTIONS.edges}
        >
          <Field.List />
        </Field>
        {extraFields}
      </ObjectType>
      <ConnectionEdge
        name={edgeName}
        nodeType={props.type}
        cursorType={pagination.cursorType}
        description={edgeSlot?.props.description}
        children={edgeSlot?.props.children}
      />
    </>
  );
}

export interface ConnectionComponent {
  (props: ConnectionProps): Children;
  Edge: Component<ConnectionEdgeProps> &
    Required<Pick<Component<ConnectionEdgeProps>, "tag">>;
  Fields: Component<ConnectionFieldsProps> &
    Required<Pick<Component<ConnectionFieldsProps>, "tag">>;
  PageInfo: Component<ConnectionPageInfoProps> &
    Required<Pick<Component<ConnectionPageInfoProps>, "tag">>;
}

/**
 * Creates a Relay-style connection and edge type.
 *
 * @example Basic connection
 * ```tsx
 * <Connection name="User" type={User} />
 * ```
 *
 * @example Connection with extra fields
 * ```tsx
 * <Connection name="User" type={User}>
 *   <Connection.Fields>
 *     <Field name="totalCount" type={Int} />
 *   </Connection.Fields>
 * </Connection>
 * ```
 *
 * @remarks
 * Use `Connection` when you want a named, shareable connection type.
 * `Field.Connection` auto-generates a private connection type tied to the field.
 * Use `Connection.Edge` to customize the generated edge type and
 * `Connection.PageInfo` to customize the pageInfo field.
 */
export function Connection(props: ConnectionProps) {
  return ConnectionBase(props);
}

/**
 * Adds fields to the generated edge type.
 *
 * @example Custom edge fields
 * ```tsx
 * <Connection name="User" type={User}>
 *   <Connection.Edge>
 *     <Field name="addedAt" type={DateTime} />
 *   </Connection.Edge>
 * </Connection>
 * ```
 */
Connection.Edge = connectionEdgeSlot.Slot;
/**
 * Adds fields to the generated connection type.
 *
 * @example Custom connection fields
 * ```tsx
 * <Connection name="User" type={User}>
 *   <Connection.Fields>
 *     <Field name="totalCount" type={Int} />
 *   </Connection.Fields>
 * </Connection>
 * ```
 */
Connection.Fields = connectionFieldsSlot.Slot;
/**
 * Overrides the `pageInfo` field on the generated connection type.
 *
 * @example Custom pageInfo description
 * ```tsx
 * <Connection name="User" type={User}>
 *   <Connection.PageInfo description="Pagination information." />
 * </Connection>
 * ```
 *
 * @remarks
 * Relay requires `pageInfo: PageInfo!`, so this slot only customizes the
 * field description.
 */
Connection.PageInfo = connectionPageInfoSlot.Slot;

function deriveNameInput(base: NameInput, suffix: string): NameInput {
  if (isNamekey(base)) {
    return namekey(`${base.name}${suffix}`, { ...base.options });
  }
  return `${base}${suffix}`;
}
