import {
  EnumType,
  Field,
  ID,
  InputField,
  InputObjectType,
  InputValue,
  Node,
  NodeInterface,
  ObjectType,
  Query,
  relayNamePolicy,
  renderSchema,
  String,
  type TypeReference,
  UnionMember,
  UnionType,
} from "@alloy-js/graphql";
import { GraphQLObjectType } from "graphql";
import { describe, expect, it } from "vitest";

describe("buildSchema validations", () => {
  it("rejects invalid OneOf input fields", () => {
    expect(() =>
      renderSchema(
        <>
          <InputObjectType name="Filter" oneOf>
            <InputField name="id" type={ID} nonNull />
          </InputObjectType>
          <Query>
            <Field name="search" type={String}>
              <InputValue name="filter" type="Filter" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(/OneOf input "Filter" field "id"/);
  });

  it("rejects deprecated required input fields", () => {
    expect(() =>
      renderSchema(
        <>
          <InputObjectType name="Filter">
            <InputField name="id" type={ID} nonNull deprecated />
          </InputObjectType>
          <Query>
            <Field name="search" type={String}>
              <InputValue name="filter" type="Filter" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(/cannot be deprecated/);
  });

  it("rejects non-output field types", () => {
    expect(() =>
      renderSchema(
        <>
          <InputObjectType name="Filter">
            <InputField name="id" type={ID} />
          </InputObjectType>
          <Query>
            <Field name="filter" type="Filter" />
          </Query>
        </>,
      ),
    ).toThrow(/must be an output type/);
  });

  it("rejects non-input argument types", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="User">
            <Field name="id" type={ID} />
          </ObjectType>
          <Query>
            <Field name="user" type="User">
              <InputValue name="criteria" type="User" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(/InputValue "criteria" must be an input type/);
  });

  it("rejects non-input input fields", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="User">
            <Field name="id" type={ID} />
          </ObjectType>
          <InputObjectType name="Filter">
            <InputField name="user" type="User" />
          </InputObjectType>
          <Query>
            <Field name="user" type="User">
              <InputValue name="filter" type="Filter" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(/Input field "user" on "Filter" must be an input type/);
  });

  it("rejects non-null input object cycles", () => {
    expect(() =>
      renderSchema(
        <>
          <InputObjectType name="SelfInput">
            <InputField name="self" type="SelfInput" nonNull />
          </InputObjectType>
          <Query>
            <Field name="search" type={String}>
              <InputValue name="input" type="SelfInput" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(/Invalid circular reference/);
  });

  it("rejects non-object union members", () => {
    expect(() =>
      renderSchema(
        <>
          <NodeInterface />
          <UnionType name="SearchResult">
            <UnionMember type={Node} />
          </UnionType>
          <Query>
            <Field name="search" type="SearchResult" />
          </Query>
        </>,
      ),
    ).toThrow(/must be an object type/);
  });

  it("rejects enums without values", () => {
    expect(() =>
      renderSchema(
        <>
          <EnumType name="Role" />
          <Query>
            <Field name="role" type="Role" />
          </Query>
        </>,
      ),
    ).toThrow(/Enum "Role" must define values/);
  });

  it("rejects unions without members", () => {
    expect(() =>
      renderSchema(
        <>
          <UnionType name="SearchResult" />
          <Query>
            <Field name="search" type="SearchResult" />
          </Query>
        </>,
      ),
    ).toThrow(/Union "SearchResult" must define members/);
  });

  it("rejects non-null wrapping non-null", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Field
            name="id"
            type={
              {
                kind: "nonNull",
                ofType: { kind: "nonNull", ofType: ID },
              } satisfies TypeReference
            }
          />
        </Query>,
      ),
    ).toThrow(/Non-Null cannot wrap a Non-Null type/);
  });

  it("allows custom connection names when the type already exists", () => {
    const schema = renderSchema(
      <>
        <ObjectType name="Item">
          <Field name="id" type={ID} />
        </ObjectType>
        <ObjectType name="ItemsRelay">
          <Field name="edges" type={String} />
        </ObjectType>
        <Query>
          <Field name="items" type="Item">
            <Field.Connection type="ItemsRelay" />
          </Field>
        </Query>
      </>,
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    expect(queryType.getFields().items.type.toString()).toBe("ItemsRelay");
  });

  it("requires the Connection suffix for auto-generated connection types", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="Item">
            <Field name="id" type={ID} />
          </ObjectType>
          <Query>
            <Field name="items" type="Item">
              <Field.Connection type="ItemsRelay" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow('Connection type name "ItemsRelay" must end with "Connection".');
  });

  it("requires the Connection suffix under Relay policies", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="Item">
            <Field name="id" type={ID} />
          </ObjectType>
          <ObjectType name="ItemsRelay">
            <Field name="edges" type={String} />
          </ObjectType>
          <Query>
            <Field name="items" type="Item">
              <Field.Connection type="ItemsRelay" />
            </Field>
          </Query>
        </>,
        { namePolicy: relayNamePolicy, validate: false },
      ),
    ).toThrow('Connection type name "ItemsRelay" must end with "Connection".');
  });
});
