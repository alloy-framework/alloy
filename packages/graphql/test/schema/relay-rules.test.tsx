import type { Children } from "@alloy-js/core";
import {
  Boolean,
  Field,
  ID,
  InputValue,
  Int,
  ObjectType,
  PageInfoType,
  Query,
  relayNamePolicy,
  renderSchema,
  String,
} from "@alloy-js/graphql";
import { describe, expect, it } from "vitest";

type RelaySchemaOptions = {
  edgeFields?: Children;
  connectionFields?: Children;
  pageInfoType?: Children;
  queryFieldChildren?: Children;
};

function renderRelaySchema(options: RelaySchemaOptions = {}) {
  const { edgeFields, connectionFields, pageInfoType, queryFieldChildren } =
    options;

  return renderSchema(
    <>
      <ObjectType name="Widget">
        <Field name="id" type={ID} />
      </ObjectType>
      {pageInfoType ?? <PageInfoType />}
      <ObjectType name="WidgetEdge">
        {edgeFields ?? (
          <>
            <Field name="node" type="Widget" />
            <Field name="cursor" type={String} />
          </>
        )}
      </ObjectType>
      <ObjectType name="WidgetConnection">
        {connectionFields ?? (
          <>
            <Field name="edges" type="WidgetEdge">
              <Field.List />
            </Field>
            <Field name="pageInfo" type="PageInfo" nonNull />
          </>
        )}
      </ObjectType>
      <Query>
        <Field name="widgets" type="WidgetConnection">
          {queryFieldChildren ?? null}
        </Field>
      </Query>
    </>,
    { namePolicy: relayNamePolicy },
  );
}

function renderSchemaWithoutRelay(options: RelaySchemaOptions = {}) {
  const { edgeFields, connectionFields, pageInfoType, queryFieldChildren } =
    options;

  return renderSchema(
    <>
      <ObjectType name="Widget">
        <Field name="id" type={ID} />
      </ObjectType>
      {pageInfoType ?? <PageInfoType />}
      <ObjectType name="WidgetEdge">
        {edgeFields ?? (
          <>
            <Field name="node" type="Widget" />
            <Field name="cursor" type={String} />
          </>
        )}
      </ObjectType>
      <ObjectType name="WidgetConnection">
        {connectionFields ?? (
          <>
            <Field name="edges" type="WidgetEdge">
              <Field.List />
            </Field>
            <Field name="pageInfo" type="PageInfo" nonNull />
          </>
        )}
      </ObjectType>
      <Query>
        <Field name="widgets" type="WidgetConnection">
          {queryFieldChildren ?? null}
        </Field>
      </Query>
    </>,
  );
}

describe("relay rules", () => {
  it("requires connection edges to be a list", () => {
    expect(() =>
      renderRelaySchema({
        connectionFields: (
          <>
            <Field name="edges" type="WidgetEdge" />
            <Field name="pageInfo" type="PageInfo" nonNull />
          </>
        ),
      }),
    ).toThrow(
      'Connection type "WidgetConnection" field "edges" must return a list type that wraps an edge type.',
    );
  });

  it("rejects connection edges as a list of lists", () => {
    expect(() =>
      renderRelaySchema({
        connectionFields: (
          <>
            <Field name="edges" type="WidgetEdge">
              <Field.List>
                <Field.List />
              </Field.List>
            </Field>
            <Field name="pageInfo" type="PageInfo" nonNull />
          </>
        ),
      }),
    ).toThrow(
      'Connection type "WidgetConnection" field "edges" must return a list type that wraps an edge type.',
    );
  });

  it("requires pageInfo to be a non-null PageInfo", () => {
    expect(() =>
      renderRelaySchema({
        connectionFields: (
          <>
            <Field name="edges" type="WidgetEdge">
              <Field.List />
            </Field>
            <Field name="pageInfo" type="PageInfo" />
          </>
        ),
      }),
    ).toThrow(
      'Connection type "WidgetConnection" field "pageInfo" must return a non-null PageInfo object type.',
    );
  });

  it("requires edge node fields to be non-list", () => {
    expect(() =>
      renderRelaySchema({
        edgeFields: (
          <>
            <Field name="node" type="Widget">
              <Field.List />
            </Field>
            <Field name="cursor" type={String} />
          </>
        ),
      }),
    ).toThrow(
      'Edge type "WidgetEdge" field "node" must not return a list type.',
    );
  });

  it("requires edge cursor fields to be scalars", () => {
    expect(() =>
      renderRelaySchema({
        edgeFields: (
          <>
            <Field name="node" type="Widget" />
            <Field name="cursor" type="Widget" />
          </>
        ),
      }),
    ).toThrow(
      'Edge type "WidgetEdge" field "cursor" must return a scalar type.',
    );
  });

  it("requires PageInfo to define hasNextPage", () => {
    expect(() =>
      renderRelaySchema({
        pageInfoType: (
          <ObjectType name="PageInfo">
            <Field name="hasPreviousPage" type={Boolean} nonNull />
            <Field name="startCursor" type={String} />
            <Field name="endCursor" type={String} />
          </ObjectType>
        ),
      }),
    ).toThrow(/hasNextPage/);
  });

  it("requires PageInfo cursor fields to be scalar", () => {
    expect(() =>
      renderRelaySchema({
        pageInfoType: (
          <ObjectType name="PageInfo">
            <Field name="hasPreviousPage" type={Boolean} nonNull />
            <Field name="hasNextPage" type={Boolean} nonNull />
            <Field name="startCursor" type="Widget" />
            <Field name="endCursor" type={String} />
          </ObjectType>
        ),
      }),
    ).toThrow('PageInfo field "startCursor" must return a scalar type.');
  });

  it("requires connection fields to define forward or backward args", () => {
    expect(() => renderRelaySchema()).toThrow(
      /must define forward pagination arguments/,
    );
  });

  it("requires pagination argument pairs", () => {
    expect(() =>
      renderRelaySchema({
        queryFieldChildren: <InputValue name="first" type={Int} />,
      }),
    ).toThrow(
      'Connection field "Query.widgets" must define both "first" and "after" arguments.',
    );
  });

  it("requires first and last arguments to be Int", () => {
    expect(() =>
      renderRelaySchema({
        queryFieldChildren: (
          <>
            <InputValue name="first" type={String} />
            <InputValue name="after" type={String} />
          </>
        ),
      }),
    ).toThrow(
      'Connection field "Query.widgets" argument "first" must be an Int.',
    );
  });

  it("requires cursor args to match the cursor type", () => {
    expect(() =>
      renderRelaySchema({
        edgeFields: (
          <>
            <Field name="node" type="Widget" />
            <Field name="cursor" type={ID} />
          </>
        ),
        queryFieldChildren: (
          <>
            <InputValue name="first" type={Int} />
            <InputValue name="after" type={String} />
          </>
        ),
      }),
    ).toThrow(
      'Connection field "Query.widgets" argument "after" must return the cursor type.',
    );
  });

  it("does not enforce relay rules without relay policy", () => {
    expect(() =>
      renderSchemaWithoutRelay({
        connectionFields: (
          <>
            <Field name="edges" type="WidgetEdge" />
            <Field name="pageInfo" type="PageInfo" />
          </>
        ),
        edgeFields: (
          <>
            <Field name="node" type="Widget" />
            <Field name="cursor" type="Widget" />
          </>
        ),
        queryFieldChildren: <InputValue name="first" type={String} />,
      }),
    ).not.toThrow();
  });
});
