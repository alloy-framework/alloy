import { Boolean } from "../builtins/graphql.js";
import { PageInfo } from "../builtins/page-info.js";
import { useConnectionOptions } from "../connection-options.js";
import { Field } from "./Field.js";
import { ObjectType } from "./ObjectType.js";

const DEFAULT_DESCRIPTIONS = {
  pageInfo: "Information about pagination in a connection.",
  hasNextPage: "When paginating forwards, are there more items?",
  hasPreviousPage: "When paginating backwards, are there more items?",
  startCursor: "When paginating backwards, the cursor to continue.",
  endCursor: "When paginating forwards, the cursor to continue.",
};

export interface PageInfoTypeProps {
  description?: string;
  hasNextPageDescription?: string;
  hasPreviousPageDescription?: string;
  startCursorDescription?: string;
  endCursorDescription?: string;
}

/**
 * Declares the `PageInfo` type used by Relay-style connections.
 *
 * @example Default PageInfo type
 * ```tsx
 * <PageInfoType />
 * ```
 *
 * @example Custom cursor type
 * ```tsx
 * <ConnectionPagination forward cursorType={ID}>
 *   <PageInfoType />
 * </ConnectionPagination>
 * ```
 *
 * @remarks
 * Cursor fields default to `String` and can be customized with
 * `ConnectionPagination`.
 */
export function PageInfoType(props: PageInfoTypeProps) {
  const pagination = useConnectionOptions();
  return (
    <ObjectType
      name={PageInfo}
      description={props.description ?? DEFAULT_DESCRIPTIONS.pageInfo}
    >
      <Field
        name="hasNextPage"
        type={Boolean}
        nonNull
        description={
          props.hasNextPageDescription ?? DEFAULT_DESCRIPTIONS.hasNextPage
        }
      />
      <Field
        name="hasPreviousPage"
        type={Boolean}
        nonNull
        description={
          props.hasPreviousPageDescription ??
          DEFAULT_DESCRIPTIONS.hasPreviousPage
        }
      />
      <Field
        name="startCursor"
        type={pagination.cursorType}
        description={
          props.startCursorDescription ?? DEFAULT_DESCRIPTIONS.startCursor
        }
      />
      <Field
        name="endCursor"
        type={pagination.cursorType}
        description={
          props.endCursorDescription ?? DEFAULT_DESCRIPTIONS.endCursor
        }
      />
    </ObjectType>
  );
}
