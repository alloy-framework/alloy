import type { Children, Namekey } from "@alloy-js/core";
import type {
  DirectiveLocation,
  GraphQLNamedType,
  GraphQLScalarType,
  GraphQLType,
} from "graphql";
import type { GraphQLNamePolicy, GraphQLNameRules } from "../name-policy.js";

/**
 * The kinds of GraphQL types supported by the schema state.
 */
export type TypeKind =
  | "object"
  | "interface"
  | "input"
  | "enum"
  | "union"
  | "scalar";

/**
 * Accepted input values for a name.
 *
 * @remarks
 * In GraphQL, name is identity. Strings assert the final name; `Namekey` lets
 * you apply naming policy once and reuse the same handle for references.
 */
export type NameInput = string | Namekey;

/**
 * Accepted input values for directive references.
 *
 * @remarks
 * Prefer names/namekeys; name is identity in GraphQL.
 */
export type DirectiveReference = string | Namekey;

/**
 * A reference to a GraphQL type (by name or GraphQLJS type).
 *
 * @remarks
 * Name is identity; prefer strings/namekeys when building schemas.
 */
export type TypeReference = string | Namekey | GraphQLType | TypeRef;

/**
 * A named type reference.
 */
export interface NamedTypeRef {
  kind: "named";
  name: string | Namekey | GraphQLNamedType;
}

/**
 * A list type reference.
 */
export interface ListTypeRef {
  kind: "list";
  ofType: TypeReference;
}

/**
 * A non-null type reference.
 */
export interface NonNullTypeRef {
  kind: "nonNull";
  ofType: TypeReference;
}

/**
 * A structured type reference.
 */
export type TypeRef = NamedTypeRef | ListTypeRef | NonNullTypeRef;

/**
 * The name policy used for GraphQL definitions.
 */
export type NamePolicy = GraphQLNamePolicy;
/**
 * Name policy rules for GraphQL definitions.
 */
export type NamePolicyRules = GraphQLNameRules;
/**
 * Accepted input values for a name policy.
 */
export type NamePolicyInput = GraphQLNamePolicy | GraphQLNameRules | null;

/**
 * Options for configuring a schema.
 */
export interface SchemaOptions {
  query?: TypeReference;
  mutation?: TypeReference;
  subscription?: TypeReference;
  description?: string;
  /**
   * Naming policy for GraphQL definitions.
   *
   * @remarks
   * - `undefined`: use the default naming conventions.
   * - `relayNamePolicy`: enable Relay-specific validation in addition to naming conventions.
   * - `null`: disable naming conventions; GraphQL hard naming rules still apply.
   */
  namePolicy?: NamePolicyInput;
}

/**
 * Options for `renderSchema`.
 */
export interface RenderSchemaOptions extends SchemaOptions {
  validate?: boolean;
}

/**
 * Props for the `Schema` component.
 */
export interface SchemaProps extends SchemaOptions {
  children?: Children;
}

interface BaseTypeDefinition {
  kind: TypeKind;
  name: string;
  description?: string;
  ignoreNamePolicy?: boolean;
  directives: AppliedDirective[];
}

/**
 * Definition for an object type.
 */
export interface ObjectTypeDefinition extends BaseTypeDefinition {
  kind: "object";
  fields: FieldDefinition[];
  fieldNames: Set<string>;
  interfaces: TypeReference[];
}

/**
 * Definition for an interface type.
 */
export interface InterfaceTypeDefinition extends BaseTypeDefinition {
  kind: "interface";
  fields: FieldDefinition[];
  fieldNames: Set<string>;
  interfaces: TypeReference[];
}

/**
 * Definition for an input object type.
 */
export interface InputObjectTypeDefinition extends BaseTypeDefinition {
  kind: "input";
  fields: InputFieldDefinition[];
  fieldNames: Set<string>;
  isOneOf: boolean;
}

/**
 * Definition for an enum type.
 */
export interface EnumTypeDefinition extends BaseTypeDefinition {
  kind: "enum";
  values: EnumValueDefinition[];
  valueNames: Set<string>;
}

/**
 * Definition for a union type.
 */
export interface UnionTypeDefinition extends BaseTypeDefinition {
  kind: "union";
  members: UnionMemberDefinition[];
  memberNames: Set<string>;
}

/**
 * Definition for a scalar type.
 */
export interface ScalarTypeDefinition extends BaseTypeDefinition {
  kind: "scalar";
  serialize?: GraphQLScalarType["serialize"];
  parseValue?: GraphQLScalarType["parseValue"];
  parseLiteral?: GraphQLScalarType["parseLiteral"];
  specifiedByUrl?: string;
}

/**
 * A field definition on an object or interface type.
 */
export interface FieldDefinition {
  name: string;
  type: TypeReference;
  args: ArgDefinition[];
  argNames: Set<string>;
  description?: string;
  deprecationReason?: string;
  directives: AppliedDirective[];
}

/**
 * A field or directive argument definition.
 */
export interface ArgDefinition {
  name: string;
  type: TypeReference;
  description?: string;
  defaultValue?: unknown;
  deprecationReason?: string;
  directives: AppliedDirective[];
}

/**
 * Tracks argument names and definitions for a target.
 */
export interface ArgTargetContextValue {
  args: ArgDefinition[];
  argNames: Set<string>;
}

/**
 * An input field definition on an input object type.
 */
export interface InputFieldDefinition {
  name: string;
  type: TypeReference;
  description?: string;
  defaultValue?: unknown;
  deprecationReason?: string;
  directives: AppliedDirective[];
}

/**
 * An enum value definition.
 */
export interface EnumValueDefinition {
  name: string;
  description?: string;
  deprecationReason?: string;
  directives: AppliedDirective[];
}

/**
 * A union member definition.
 */
export interface UnionMemberDefinition {
  type: TypeReference;
}

/**
 * A directive definition with arguments.
 */
export interface DirectiveDefinition {
  name: string;
  description?: string;
  ignoreNamePolicy?: boolean;
  repeatable: boolean;
  locations: DirectiveLocation[];
  args: ArgDefinition[];
  argNames: Set<string>;
  directives: AppliedDirective[];
}

/**
 * An applied directive with argument values.
 */
export interface AppliedDirective {
  name: string;
  args: AppliedDirectiveArgument[];
  argNames: Set<string>;
}

/**
 * A directive argument value.
 */
export interface AppliedDirectiveArgument {
  name: string;
  value: unknown;
}

/**
 * Tracks directive applications for a target.
 */
export interface DirectiveTargetContextValue {
  location: DirectiveLocation;
  directives: AppliedDirective[];
  target: DirectiveTarget;
}

/**
 * Allowed directive application targets.
 */
export type DirectiveTarget =
  | SchemaDirectiveTarget
  | TypeDefinition
  | FieldDefinition
  | ArgDefinition
  | InputFieldDefinition
  | EnumValueDefinition
  | DirectiveDefinition;

/**
 * Schema-level directive target marker.
 */
export interface SchemaDirectiveTarget {
  kind: "schema";
}

/**
 * Tracks directive arguments for a directive application.
 */
export interface DirectiveArgTargetContextValue {
  args: AppliedDirectiveArgument[];
  argNames: Set<string>;
}

/**
 * Mutable schema state collected while rendering components.
 */
export interface SchemaState {
  types: Map<string, TypeDefinition>;
  directives: Map<string, DirectiveDefinition>;
  schemaDirectives: AppliedDirective[];
  schema: {
    query?: TypeReference;
    mutation?: TypeReference;
    subscription?: TypeReference;
  };
  description?: string;
  namePolicy: NamePolicy | null;
}

/**
 * Any GraphQL type definition tracked by the schema.
 */
export type TypeDefinition =
  | ObjectTypeDefinition
  | InterfaceTypeDefinition
  | InputObjectTypeDefinition
  | EnumTypeDefinition
  | UnionTypeDefinition
  | ScalarTypeDefinition;

/**
 * Common deprecation props for schema elements.
 */
export interface DeprecatedProps {
  deprecated?: boolean | string;
  deprecationReason?: string;
}
