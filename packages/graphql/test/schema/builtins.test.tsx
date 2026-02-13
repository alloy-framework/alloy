import {
  Field,
  NodeField,
  NodeInterface,
  PageInfoType,
  Query,
  String,
  renderSchema,
} from "@alloy-js/graphql";
import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
} from "graphql";
import { describe, expect, it } from "vitest";

describe("builtins and helpers", () => {
  it("wires NodeInterface and NodeField defaults", () => {
    const schema = renderSchema(
      <>
        <NodeInterface />
        <Query>
          <NodeField />
        </Query>
      </>,
    );

    const nodeType = schema.getType("Node");
    if (!(nodeType instanceof GraphQLInterfaceType)) {
      throw new Error("Expected Node to be an interface type.");
    }
    expect(nodeType.getFields().id.type.toString()).toBe("ID!");
    expect(nodeType.getFields().id.description).toBe("The ID of an object");

    const nodeField = schema.getQueryType()?.getFields().node;
    if (!nodeField) {
      throw new Error("Expected Query.node to be defined.");
    }
    expect(nodeField.type.toString()).toBe("Node");
    expect(nodeField.description).toBe("Fetches an object given its ID");
    expect(nodeField.args[0]?.name).toBe("id");
    expect(nodeField.args[0]?.type.toString()).toBe("ID!");
    expect(nodeField.args[0]?.description).toBe("The ID of an object");
  });

  it("provides PageInfoType default fields and descriptions", () => {
    const schema = renderSchema(
      <>
        <PageInfoType />
        <Query>
          <Field name="pageInfo" type="PageInfo" />
        </Query>
      </>,
    );

    const pageInfo = schema.getType("PageInfo");
    if (!(pageInfo instanceof GraphQLObjectType)) {
      throw new Error("Expected PageInfo to be an object type.");
    }

    expect(pageInfo.description).toBe(
      "Information about pagination in a connection.",
    );
    expect(pageInfo.getFields().hasNextPage.description).toBe(
      "When paginating forwards, are there more items?",
    );
    expect(pageInfo.getFields().hasPreviousPage.description).toBe(
      "When paginating backwards, are there more items?",
    );
    expect(pageInfo.getFields().startCursor.description).toBe(
      "When paginating backwards, the cursor to continue.",
    );
    expect(pageInfo.getFields().endCursor.description).toBe(
      "When paginating forwards, the cursor to continue.",
    );
  });

  it("resolves built-in scalar names", () => {
    const schema = renderSchema(
      <Query>
        <Field name="name" type={String} />
      </Query>,
    );

    const stringType = schema.getType("String");
    expect(stringType).toBeInstanceOf(GraphQLScalarType);
    expect(schema.getQueryType()?.getFields().name.type.toString()).toBe(
      "String",
    );
  });
});
