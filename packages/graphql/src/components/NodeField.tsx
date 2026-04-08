import type { Children } from "@alloy-js/core";
import { ID } from "../builtins/graphql.js";
import { Node } from "../builtins/node.js";
import type { NameInput, TypeReference } from "../schema.js";
import { Field } from "./Field.js";
import { InputValue } from "./InputValue.js";

const DEFAULT_DESCRIPTIONS = {
  id: "The ID of an object",
  node: "Fetches an object given its ID",
};

export interface NodeFieldProps {
  name?: NameInput;
  type?: TypeReference;
  description?: string;
  idDescription?: string;
  children?: Children;
}

/**
 * Adds a `node` field that resolves objects by ID.
 *
 * @example Default node field
 * ```tsx
 * <Query>
 *   <NodeField />
 * </Query>
 * ```
 *
 * @example Custom node field
 * ```tsx
 * <Query>
 *   <NodeField name="userById" type={User} />
 * </Query>
 * ```
 */
export function NodeField(props: NodeFieldProps) {
  return (
    <Field
      name={props.name ?? "node"}
      type={props.type ?? Node}
      description={props.description ?? DEFAULT_DESCRIPTIONS.node}
    >
      <InputValue
        name="id"
        type={ID}
        nonNull
        description={props.idDescription ?? DEFAULT_DESCRIPTIONS.id}
      />
      {props.children}
    </Field>
  );
}
