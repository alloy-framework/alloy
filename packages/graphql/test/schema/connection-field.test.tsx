import { namekey } from "@alloy-js/core";
import {
  Connection,
  ConnectionPagination,
  createGraphQLNamePolicy,
  Field,
  ID,
  InputValue,
  Int,
  ObjectType,
  PageInfoType,
  Query,
  renderSchema,
  String,
} from "@alloy-js/graphql";
import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { describe, expect, it } from "vitest";

const Item = namekey("Item");

describe("Field.Connection", () => {
  it("adds standard connection args in order", () => {
    const schema = renderSchema(
      <>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <PageInfoType />
        <Connection name="Items" type={Item}>
          <Field name="totalCount" type={Int} />
        </Connection>
        <Query>
          <Field name="items" type={Item}>
            <Field.Connection />
          </Field>
        </Query>
      </>,
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    const field = queryType.getFields().items;
    expect(field.args.map((arg) => arg.name)).toEqual([
      "after",
      "first",
      "before",
      "last",
    ]);
  });

  it("respects pagination context toggles", () => {
    const schema = renderSchema(
      <>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <PageInfoType />
        <Connection name="Items" type={Item}>
          <Field name="totalCount" type={Int} />
        </Connection>
        <Connection name="ArchivedItems" type={Item} />
        <Query>
          <ConnectionPagination backward={false}>
            <Field name="items" type={Item}>
              <Field.Connection />
            </Field>
          </ConnectionPagination>
          <ConnectionPagination forward={false}>
            <Field name="archivedItems" type={Item}>
              <Field.Connection />
            </Field>
          </ConnectionPagination>
        </Query>
      </>,
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    const fields = queryType.getFields();
    expect(fields.items.args.map((arg) => arg.name)).toEqual([
      "after",
      "first",
    ]);
    expect(fields.archivedItems.args.map((arg) => arg.name)).toEqual([
      "before",
      "last",
    ]);
  });

  it("allows Connection.Fields under Field.Connection", () => {
    const schema = renderSchema(
      <>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <PageInfoType />
        <Query>
          <Field name="items" type={Item}>
            <Field.Connection>
              <Connection.Fields>
                <Field name="totalCount" type={Int} />
              </Connection.Fields>
            </Field.Connection>
          </Field>
        </Query>
      </>,
    );

    const connectionType = schema.getType("ItemsConnection");
    if (!(connectionType instanceof GraphQLObjectType)) {
      throw new Error("Expected ItemsConnection to be an object type.");
    }

    expect(connectionType.getFields().totalCount).toBeDefined();
  });

  it("does not allow Connection.Edge or Connection.PageInfo under Field.Connection", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name={Item}>
            <Field name="id" type={ID} />
          </ObjectType>
          <PageInfoType />
          <Query>
            <Field name="items" type={Item}>
              <Field.Connection>
                <Connection.PageInfo />
              </Field.Connection>
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(
      "Field.Connection only supports Connection.Fields. Define a Connection type to customize edges or pageInfo.",
    );

    expect(() =>
      renderSchema(
        <>
          <ObjectType name={Item}>
            <Field name="id" type={ID} />
          </ObjectType>
          <Query>
            <Field name="items" type={Item}>
              <Field.Connection>
                <Connection.Edge>
                  <Field name="weight" type={String} />
                </Connection.Edge>
              </Field.Connection>
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(
      "Field.Connection only supports Connection.Fields. Define a Connection type to customize edges or pageInfo.",
    );
  });

  it("passes through field arguments", () => {
    const schema = renderSchema(
      <>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <PageInfoType />
        <Connection name="Items" type={Item}>
          <Connection.Edge>
            <Field name="weight" type={String} />
          </Connection.Edge>
          <Connection.Fields>
            <Field name="totalCount" type={Int} />
          </Connection.Fields>
        </Connection>
        <Query>
          <Field name="items" type={Item}>
            <Field.Connection type="ItemsConnection" />
            <InputValue name="filter" type={String} />
          </Field>
        </Query>
      </>,
    );

    const connectionType = schema.getType("ItemsConnection");
    if (!(connectionType instanceof GraphQLObjectType)) {
      throw new Error("Expected ItemsConnection to be an object type.");
    }

    expect(connectionType.getFields().pageInfo.type.toString()).toBe(
      "PageInfo!",
    );
    expect(connectionType.getFields().totalCount).toBeDefined();

    const edgeType = schema.getType("ItemsEdge");
    if (!(edgeType instanceof GraphQLObjectType)) {
      throw new Error("Expected ItemsEdge to be an object type.");
    }

    expect(edgeType.getFields().weight).toBeDefined();

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    expect(queryType.getFields().items.args.map((arg) => arg.name)).toEqual([
      "after",
      "first",
      "before",
      "last",
      "filter",
    ]);
  });

  it("rejects Connection.Fields when the connection type already exists", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name={Item}>
            <Field name="id" type={ID} />
          </ObjectType>
          <PageInfoType />
          <Connection name="Items" type={Item} />
          <Query>
            <Field name="items" type={Item}>
              <Field.Connection type="ItemsConnection">
                <Connection.Fields>
                  <Field name="totalCount" type={Int} />
                </Connection.Fields>
              </Field.Connection>
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(
      "Field.Connection cannot add Connection.Fields when the connection type already exists. Define a Connection type instead.",
    );
  });

  it("uses standard cursor types for args and edges", () => {
    const schema = renderSchema(
      <>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <PageInfoType />
        <Connection name="Items" type={Item} />
        <Query>
          <Field name="items" type={Item}>
            <Field.Connection />
          </Field>
        </Query>
      </>,
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    const field = queryType.getFields().items;
    expect(field.args.map((arg) => arg.type.toString())).toEqual([
      "String",
      "Int",
      "String",
      "Int",
    ]);

    const edgeType = schema.getType("ItemsEdge");
    if (!(edgeType instanceof GraphQLObjectType)) {
      throw new Error("Expected ItemsEdge to be an object type.");
    }

    expect(edgeType.getFields().cursor.type.toString()).toBe("String!");

    const pageInfoType = schema.getType("PageInfo");
    if (!(pageInfoType instanceof GraphQLObjectType)) {
      throw new Error("Expected PageInfo to be an object type.");
    }

    expect(pageInfoType.getFields().startCursor.type.toString()).toBe("String");
    expect(pageInfoType.getFields().endCursor.type.toString()).toBe("String");
  });

  it("allows customizing cursor types with pagination context", () => {
    const schema = renderSchema(
      <ConnectionPagination cursorType={ID}>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <PageInfoType />
        <Connection name="Items" type={Item} />
        <Query>
          <Field name="items" type={Item}>
            <Field.Connection />
          </Field>
        </Query>
      </ConnectionPagination>,
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    const field = queryType.getFields().items;
    expect(field.args.map((arg) => arg.type.toString())).toEqual([
      "ID",
      "Int",
      "ID",
      "Int",
    ]);

    const edgeType = schema.getType("ItemsEdge");
    if (!(edgeType instanceof GraphQLObjectType)) {
      throw new Error("Expected ItemsEdge to be an object type.");
    }

    expect(edgeType.getFields().cursor.type.toString()).toBe("ID!");

    const pageInfoType = schema.getType("PageInfo");
    if (!(pageInfoType instanceof GraphQLObjectType)) {
      throw new Error("Expected PageInfo to be an object type.");
    }

    expect(pageInfoType.getFields().startCursor.type.toString()).toBe("ID");
    expect(pageInfoType.getFields().endCursor.type.toString()).toBe("ID");
  });

  it("merges nested pagination defaults", () => {
    const schema = renderSchema(
      <ConnectionPagination forward={false} backward cursorType={ID}>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <ConnectionPagination forward cursorType={String}>
          <PageInfoType />
          <Query>
            <Field name="items" type={Item}>
              <Field.Connection />
            </Field>
          </Query>
        </ConnectionPagination>
      </ConnectionPagination>,
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    const field = queryType.getFields().items;
    expect(field.args.map((arg) => arg.type.toString())).toEqual([
      "String",
      "Int",
      "String",
      "Int",
    ]);

    const edgeType = schema.getType("ItemsEdge");
    if (!(edgeType instanceof GraphQLObjectType)) {
      throw new Error("Expected ItemsEdge to be an object type.");
    }

    expect(edgeType.getFields().cursor.type.toString()).toBe("String!");
  });

  it("allows overriding the field name", () => {
    const schema = renderSchema(
      <>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <PageInfoType />
        <Connection name="Items" type={Item} />
        <Query>
          <Field name="items" type={Item}>
            <Field.Connection fieldName="allItems" />
          </Field>
        </Query>
      </>,
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    const fields = queryType.getFields();
    expect(fields.allItems).toBeDefined();
    expect(fields.items).toBeUndefined();
    expect(fields.allItems.type.toString()).toBe("ItemsConnection");
  });

  it("prefixes connection types for non-root fields", () => {
    const schema = renderSchema(
      <>
        <ObjectType name="User">
          <Field name="friends" type="User">
            <Field.Connection />
          </Field>
        </ObjectType>
        <PageInfoType />
        <Query>
          <Field name="user" type="User" />
        </Query>
      </>,
    );

    const userType = schema.getType("User");
    if (!(userType instanceof GraphQLObjectType)) {
      throw new Error("Expected User to be an object type.");
    }

    expect(userType.getFields().friends.type.toString()).toBe(
      "UserFriendsConnection",
    );
    expect(schema.getType("UserFriendsConnection")).toBeDefined();
  });

  it("respects namekey options on the connection field name", () => {
    const fieldName = namekey("AllShips", { ignoreNamePolicy: true });
    const namePolicy = createGraphQLNamePolicy({
      format: { field: (name) => name.toLowerCase() },
    });
    const schema = renderSchema(
      <>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <PageInfoType />
        <Connection name="Items" type={Item} />
        <Query>
          <Field name={fieldName} type={Item}>
            <Field.Connection />
          </Field>
        </Query>
      </>,
      { namePolicy },
    );

    const queryType = schema.getType("Query");
    if (!(queryType instanceof GraphQLObjectType)) {
      throw new Error("Expected Query to be an object type.");
    }

    const fields = queryType.getFields();
    expect(fields.AllShips).toBeDefined();
    expect(fields.allships).toBeUndefined();
  });

  it("requires at least one pagination direction", () => {
    expect(() =>
      renderSchema(
        <ConnectionPagination forward={false} backward={false}>
          <Query />
        </ConnectionPagination>,
      ),
    ).toThrow(
      "ConnectionPagination requires at least one pagination direction.",
    );
  });

  it("rejects Field.List combined with Field.Connection", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Field name="items" type={Item}>
            <Field.List />
            <Field.Connection />
          </Field>
        </Query>,
      ),
    ).toThrow("Field.Connection cannot be combined with Field.List.");
  });

  it("rejects unnamed connection type references", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Field name="items" type={Item}>
            <Field.Connection type={new GraphQLList(GraphQLString)} />
          </Field>
        </Query>,
      ),
    ).toThrow(
      "Field.Connection requires a named connection type to define connection types.",
    );
  });

  it("requires connection type names to end with Connection", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Field name="items" type={Item}>
            <Field.Connection type="ItemsRelay" />
          </Field>
        </Query>,
      ),
    ).toThrow('Connection type name "ItemsRelay" must end with "Connection".');
  });

  it("respects name policy formatting for connection suffix checks", () => {
    const namePolicy = createGraphQLNamePolicy({
      format: { type: (name) => name.toUpperCase() },
    });
    const schema = renderSchema(
      <>
        <ObjectType name={Item}>
          <Field name="id" type={ID} />
        </ObjectType>
        <PageInfoType />
        <Query>
          <Field name="items" type={Item}>
            <Field.Connection />
          </Field>
        </Query>
      </>,
      { namePolicy },
    );

    expect(schema.getType("ITEMSCONNECTION")).toBeDefined();
  });
});
