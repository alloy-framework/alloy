import type { Children } from "@alloy-js/core";
import type { GraphQLScalarType } from "graphql";
import { DirectiveLocation } from "graphql";
import {
  DirectiveTargetContext,
  createScalarTypeDefinition,
  registerType,
  useSchemaContext,
  type NameInput,
} from "../schema.js";

export interface ScalarTypeProps {
  name: NameInput;
  description?: string;
  specifiedByUrl?: string;
  serialize?: GraphQLScalarType["serialize"];
  parseValue?: GraphQLScalarType["parseValue"];
  parseLiteral?: GraphQLScalarType["parseLiteral"];
  children?: Children;
}

/**
 * Defines a custom GraphQL scalar type.
 *
 * @example Specified by URL
 * ```tsx
 * <ScalarType name="DateTime" specifiedByUrl="https://example.com" />
 * ```
 *
 * @example Scalar with custom parsing
 * ```tsx
 * <ScalarType
 *   name="DateTime"
 *   serialize={(value) =>
 *     value instanceof Date ? value.toISOString() : value
 *   }
 *   parseValue={(value) => new Date(value as string)}
 *   parseLiteral={(ast) =>
 *     ast.kind === "StringValue" ? new Date(ast.value) : null
 *   }
 * />
 * ```
 *
 * @remarks
 * You can optionally provide `serialize`, `parseValue`, and `parseLiteral`
 * implementations to integrate with `graphql-js`.
 */
export function ScalarType(props: ScalarTypeProps) {
  const state = useSchemaContext();
  const definition = createScalarTypeDefinition(
    state,
    props.name,
    props.description,
  );
  definition.serialize = props.serialize;
  definition.parseValue = props.parseValue;
  definition.parseLiteral = props.parseLiteral;
  definition.specifiedByUrl = props.specifiedByUrl;
  registerType(state, definition);
  return (
    <DirectiveTargetContext.Provider
      value={{
        location: DirectiveLocation.SCALAR,
        directives: definition.directives,
        target: definition,
      }}
    >
      {props.children}
    </DirectiveTargetContext.Provider>
  );
}
