import { namekey } from "@alloy-js/core";
import {
  Connection,
  Field,
  InputValue,
  Int,
  ObjectType,
  PageInfoType,
  Query,
  String,
  renderSchema,
} from "@alloy-js/graphql";
import { GraphQLObjectType } from "graphql";
import { describe, expect, it } from "vitest";

const Widget = namekey("Widget");

describe("Connection", () => {
  it("creates connection and edge types with default fields and descriptions", () => {
    const schema = renderSchema(
      <>
        <ObjectType name={Widget}>
          <Field name="id" type={String} />
        </ObjectType>
        <PageInfoType />
        <Connection name="Widgets" type={Widget}>
          <Field name="totalCount" type={String} />
        </Connection>
        <Query>
          <Field name="widgets" type="WidgetsConnection">
            <InputValue name="after" type={String} />
            <InputValue name="first" type={Int} />
          </Field>
        </Query>
      </>,
    );

    const connectionType = schema.getType("WidgetsConnection");
    if (!(connectionType instanceof GraphQLObjectType)) {
      throw new Error("Expected WidgetsConnection to be an object type.");
    }

    expect(connectionType.description).toBe("A connection to a list of items.");
    expect(connectionType.getFields().pageInfo.description).toBe(
      "Information to aid in pagination.",
    );
    expect(connectionType.getFields().edges.description).toBe(
      "A list of edges.",
    );
    expect(connectionType.getFields().pageInfo.type.toString()).toBe(
      "PageInfo!",
    );
    expect(connectionType.getFields().edges.type.toString()).toBe(
      "[WidgetsEdge]",
    );
    expect(connectionType.getFields().totalCount).toBeDefined();

    const edgeType = schema.getType("WidgetsEdge");
    if (!(edgeType instanceof GraphQLObjectType)) {
      throw new Error("Expected WidgetsEdge to be an object type.");
    }

    expect(edgeType.description).toBe("An edge in a connection.");
    expect(edgeType.getFields().node.description).toBe(
      "The item at the end of the edge",
    );
    expect(edgeType.getFields().cursor.description).toBe(
      "A cursor for use in pagination",
    );
    expect(edgeType.getFields().node.type.toString()).toBe("Widget");
    expect(edgeType.getFields().cursor.type.toString()).toBe("String!");
  });

  it("supports tagged children for edge, fields, and pageInfo", () => {
    const schema = renderSchema(
      <>
        <ObjectType name={Widget}>
          <Field name="id" type={String} />
        </ObjectType>
        <PageInfoType />
        <Connection name="Widgets" type={Widget}>
          <Connection.PageInfo description="Custom page info." />
          <Connection.Edge>
            <Field name="weight" type={String} />
          </Connection.Edge>
          <Connection.Fields>
            <Field name="totalCount" type={String} />
          </Connection.Fields>
        </Connection>
        <Query>
          <Field name="widgets" type="WidgetsConnection">
            <InputValue name="after" type={String} />
            <InputValue name="first" type={Int} />
          </Field>
        </Query>
      </>,
    );

    const connectionType = schema.getType("WidgetsConnection");
    if (!(connectionType instanceof GraphQLObjectType)) {
      throw new Error("Expected WidgetsConnection to be an object type.");
    }

    expect(connectionType.getFields().pageInfo.type.toString()).toBe(
      "PageInfo!",
    );
    expect(connectionType.getFields().pageInfo.description).toBe(
      "Custom page info.",
    );
    expect(connectionType.getFields().totalCount).toBeDefined();

    const edgeType = schema.getType("WidgetsEdge");
    if (!(edgeType instanceof GraphQLObjectType)) {
      throw new Error("Expected WidgetsEdge to be an object type.");
    }

    expect(edgeType.getFields().node).toBeDefined();
    expect(edgeType.getFields().cursor).toBeDefined();
    expect(edgeType.getFields().weight).toBeDefined();
  });

  it("rejects multiple Connection.Edge children", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name={Widget}>
            <Field name="id" type={String} />
          </ObjectType>
          <PageInfoType />
          <Connection name="Widgets" type={Widget}>
            <Connection.Edge />
            <Connection.Edge />
          </Connection>
          <Query>
            <Field name="widgets" type="WidgetsConnection" />
          </Query>
        </>,
      ),
    ).toThrow("Connection only supports a single Connection.Edge child.");
  });

  it("rejects multiple Connection.PageInfo children", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name={Widget}>
            <Field name="id" type={String} />
          </ObjectType>
          <PageInfoType />
          <Connection name="Widgets" type={Widget}>
            <Connection.PageInfo />
            <Connection.PageInfo />
          </Connection>
          <Query>
            <Field name="widgets" type="WidgetsConnection" />
          </Query>
        </>,
      ),
    ).toThrow("Connection only supports a single Connection.PageInfo child.");
  });
});
