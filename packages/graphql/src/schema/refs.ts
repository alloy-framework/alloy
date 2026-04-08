import { isNamekey, type Namekey } from "@alloy-js/core";
import { GraphQLNonNull, isNamedType, isType } from "graphql";
import { builtInScalars, builtInScalarsFallback } from "./constants.js";
import type { SchemaState, TypeRef, TypeReference } from "./types.js";

export function extractNamedTypeName(
  state: SchemaState,
  type: TypeReference,
): string | undefined {
  if (typeof type === "string") {
    return normalizeTypeName(state, type);
  }
  if (isNamekey(type)) {
    return normalizeTypeNameInput(state, type);
  }
  if (isType(type) && isNamedType(type)) {
    return type.name;
  }
  if (isTypeRef(type)) {
    if (type.kind === "named") {
      if (typeof type.name === "string" || isNamekey(type.name)) {
        return normalizeTypeNameInput(state, type.name);
      }
      if (isType(type.name) && isNamedType(type.name)) {
        return type.name.name;
      }
      return undefined;
    }
    return extractNamedTypeName(state, type.ofType);
  }
  return undefined;
}

export function normalizeTypeName(state: SchemaState, name: string): string {
  if (builtInScalars.has(name) || builtInScalarsFallback.has(name)) {
    return name;
  }
  if (!state.namePolicy) {
    return name;
  }
  return state.namePolicy.getName(name, "type");
}

function normalizeTypeNameInput(
  state: SchemaState,
  name: string | Namekey,
): string {
  if (isNamekey(name)) {
    if (name.options.ignoreNamePolicy) {
      return name.name;
    }
    return normalizeTypeName(state, name.name);
  }
  return normalizeTypeName(state, name);
}

export function isTypeRef(value: TypeReference): value is TypeRef {
  return (
    typeof value === "object" &&
    value !== null &&
    "kind" in value &&
    (value.kind === "named" ||
      value.kind === "list" ||
      value.kind === "nonNull")
  );
}

export function isNonNullTypeReference(type: TypeReference): boolean {
  if (isType(type)) {
    return type instanceof GraphQLNonNull;
  }
  if (isTypeRef(type)) {
    return type.kind === "nonNull";
  }
  return false;
}

export function wrapNonNullType(type: TypeReference): TypeRef {
  return { kind: "nonNull", ofType: type };
}

export function wrapListType(type: TypeReference): TypeRef {
  return { kind: "list", ofType: type };
}

export function applyNonNullType(
  type: TypeReference,
  nonNull?: boolean,
): TypeReference {
  return nonNull ? wrapNonNullType(type) : type;
}
