import type { Children } from "@alloy-js/core";
import { ID } from "../builtins/graphql.js";
import { Node } from "../builtins/node.js";
import { Field } from "./Field.js";
import { InterfaceType } from "./InterfaceType.js";

const DEFAULT_ID_DESCRIPTION = "The ID of an object";

interface NodeIdProps {
  description?: string;
}

function NodeId(props: NodeIdProps) {
  return <Field name="id" type={ID} nonNull description={props.description} />;
}

export interface NodeInterfaceProps {
  description?: string;
  idDescription?: string;
  children?: Children;
}

/**
 * Declares the canonical `Node` interface.
 *
 * @example Default Node interface
 * ```tsx
 * <NodeInterface />
 * ```
 *
 * @example Node interface with extra fields
 * ```tsx
 * <NodeInterface idDescription="Database ID">
 *   <Field name="createdAt" type={DateTime} />
 * </NodeInterface>
 * ```
 */
export function NodeInterface(props: NodeInterfaceProps) {
  return (
    <InterfaceType name={Node} description={props.description}>
      <NodeId description={props.idDescription ?? DEFAULT_ID_DESCRIPTION} />
      {props.children}
    </InterfaceType>
  );
}
