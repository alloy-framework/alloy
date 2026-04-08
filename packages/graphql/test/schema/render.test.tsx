import { namekey, renderTree, type Children } from "@alloy-js/core";
import {
  EnumType,
  EnumValue,
  Field,
  ID,
  InputField,
  InputObjectType,
  InputValue,
  Mutation,
  Node,
  NodeInterface,
  ObjectType,
  Query,
  renderSchema,
  ScalarType,
  String,
  Subscription,
  UnionMember,
  UnionType,
} from "@alloy-js/graphql";
import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { describe, expect, it } from "vitest";
import { buildSchema } from "../../src/schema/build.js";
import { createSchemaState, Schema } from "../../src/schema/state.js";
import type {
  SchemaProps,
  SchemaState,
  TypeReference,
} from "../../src/schema/types.js";

type SchemaInternalProps = SchemaProps & { _state: SchemaState };
const SchemaWithState = Schema as unknown as (
  props: SchemaInternalProps,
) => Children;

describe("renderSchema", () => {
  it("builds a basic schema", () => {
    const schema = renderSchema(
      <Query>
        <Field name="hello" type={String} />
      </Query>,
    );

    expect(schema.getQueryType()?.name).toBe("Query");
  });

  it("uses built-in mutation and subscription roots without options", () => {
    const schema = renderSchema(
      <>
        <Query>
          <Field name="ping" type={String} />
        </Query>
        <Mutation>
          <Field name="update" type={String} />
        </Mutation>
        <Subscription>
          <Field name="pinged" type={String} />
        </Subscription>
      </>,
    );

    expect(schema.getMutationType()?.name).toBe("Mutation");
    expect(schema.getSubscriptionType()?.name).toBe("Subscription");
  });

  it("rejects <Query> when a query root is specified in renderSchema", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Field name="hello" type={String} />
        </Query>,
        { query: "RootQuery" },
      ),
    ).toThrow(/Query cannot be used/);
  });

  it("rejects duplicate root components", () => {
    const cases = [
      { name: "Query", Root: Query, includeQuery: false },
      { name: "Mutation", Root: Mutation, includeQuery: true },
      { name: "Subscription", Root: Subscription, includeQuery: true },
    ] as const;

    for (const { name, Root, includeQuery } of cases) {
      expect(() =>
        renderSchema(
          <>
            {includeQuery ?
              <Query>
                <Field name="ping" type={String} />
              </Query>
            : null}
            <Root>
              <Field name="first" type={String} />
            </Root>
            <Root>
              <Field name="second" type={String} />
            </Root>
          </>,
        ),
      ).toThrow(new RegExp(`${name} cannot be used`));
    }
  });

  it("supports interfaces, enums, inputs, unions, and directives", () => {
    const schema = renderSchema(
      <>
        <NodeInterface />
        <ObjectType name="User" interfaces={[Node]}>
          <Field name="name" type={String} />
          <Field name="role" type="Role" deprecated />
        </ObjectType>
        <EnumType name="Role">
          <EnumValue name="ADMIN" />
          <EnumValue name="USER" deprecated />
        </EnumType>
        <InputObjectType name="UserFilter" oneOf>
          <InputField name="id" type={ID} />
          <InputField name="name" type={String} />
        </InputObjectType>
        <UnionType name="SearchResult">
          <UnionMember type="User" />
        </UnionType>
        <ScalarType
          name="Url"
          specifiedByUrl="https://example.com/spec#url"
          serialize={(value: unknown) => value}
        />
        <Query>
          <Field name="me" type="User" />
          <Field name="search" type="SearchResult">
            <Field.List />
            <InputValue name="term" type={String} nonNull />
            <InputValue name="filter" type="UserFilter" />
          </Field>
          <Field name="website" type="Url" />
        </Query>
      </>,
    );

    const typeMap = schema.getTypeMap();
    expect(typeMap.Node).toBeDefined();
    expect(typeMap.Role).toBeDefined();
    expect(typeMap.UserFilter).toBeDefined();
    expect(typeMap.SearchResult).toBeDefined();
    expect(typeMap.Url).toBeDefined();
  });

  it("supports nested list modifiers on fields, arguments, and inputs", () => {
    const schema = renderSchema(
      <>
        <InputObjectType name="MatrixInput">
          <InputField name="values" type={String}>
            <InputField.List nonNull>
              <InputField.List />
            </InputField.List>
          </InputField>
        </InputObjectType>
        <Query>
          <Field name="matrix" type={String}>
            <Field.List nonNull>
              <Field.List />
            </Field.List>
          </Field>
          <Field name="matrixInput" type={String}>
            <InputValue name="input" type="MatrixInput" />
          </Field>
          <Field name="search" type={String}>
            <InputValue name="matrix" type={String}>
              <InputValue.List nonNull>
                <InputValue.List />
              </InputValue.List>
            </InputValue>
          </Field>
        </Query>
      </>,
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    expect(queryType.getFields().matrix.type.toString()).toBe("[[String]]!");
    expect(queryType.getFields().search.args[0].type.toString()).toBe(
      "[[String]]!",
    );

    const inputType = schema.getType("MatrixInput");
    if (!(inputType instanceof GraphQLInputObjectType)) {
      throw new Error("Expected MatrixInput to be an input object type.");
    }

    expect(inputType.getFields().values.type.toString()).toBe("[[String]]!");
  });

  it("handles circular references", () => {
    const schema = renderSchema(
      <>
        <ObjectType name="User">
          <Field name="posts" type="Post">
            <Field.List />
          </Field>
        </ObjectType>
        <ObjectType name="Post">
          <Field name="author" type="User" />
        </ObjectType>
        <Query>
          <Field name="post" type="Post" />
        </Query>
      </>,
    );

    expect(schema.getType("User")).toBeDefined();
  });

  it("builds independent schemas without shared state", () => {
    const schemaA = renderSchema(
      <>
        <ObjectType name="ThingA">
          <Field name="name" type={String} />
        </ObjectType>
        <Query>
          <Field name="thingA" type="ThingA" />
        </Query>
      </>,
    );

    const schemaB = renderSchema(
      <>
        <ObjectType name="ThingB">
          <Field name="size" type={String} />
        </ObjectType>
        <Query>
          <Field name="thingB" type="ThingB" />
        </Query>
      </>,
    );

    expect(schemaA.getType("ThingA")).toBeDefined();
    expect(schemaA.getType("ThingB")).toBeUndefined();
    expect(schemaA.getQueryType()?.getFields()).toHaveProperty("thingA");
    expect(schemaA.getQueryType()?.getFields()).not.toHaveProperty("thingB");

    expect(schemaB.getType("ThingB")).toBeDefined();
    expect(schemaB.getType("ThingA")).toBeUndefined();
    expect(schemaB.getQueryType()?.getFields()).toHaveProperty("thingB");
    expect(schemaB.getQueryType()?.getFields()).not.toHaveProperty("thingA");
  });

  it("accepts graphql-js types in type references", () => {
    const schema = renderSchema(
      <Query>
        <Field name="name" type={GraphQLString} />
      </Query>,
    );

    expect(schema.getQueryType()?.getFields().name.type.toString()).toBe(
      "String",
    );
  });

  it("resolves structured type references", () => {
    const User = namekey("User");
    const schema = renderSchema(
      <>
        <ObjectType name={User}>
          <Field name="id" type={ID} />
        </ObjectType>
        <Query>
          <Field
            name="users"
            type={
              {
                kind: "nonNull",
                ofType: {
                  kind: "list",
                  ofType: {
                    kind: "nonNull",
                    ofType: { kind: "named", name: User },
                  },
                },
              } satisfies TypeReference
            }
          />
          <Field
            name="title"
            type={
              {
                kind: "named",
                name: GraphQLString,
              } satisfies TypeReference
            }
          />
        </Query>
      </>,
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    expect(queryType.getFields().users.type.toString()).toBe("[User!]!");
    expect(queryType.getFields().title.type.toString()).toBe("String");
  });

  it("supports rendering Schema with an existing state", () => {
    const state = createSchemaState({
      query: "InitialQuery",
      description: "Initial",
    });

    renderTree(
      <SchemaWithState _state={state} query="RootQuery" description="Updated">
        <ObjectType name="RootQuery">
          <Field name="ping" type={String} />
        </ObjectType>
      </SchemaWithState>,
    );

    const schema = buildSchema(state, true);
    expect(state.schema.query).toBe("RootQuery");
    expect(schema.getQueryType()?.name).toBe("RootQuery");
    expect(schema.description).toBe("Updated");
  });
});
