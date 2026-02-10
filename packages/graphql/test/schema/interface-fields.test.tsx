import {
  Field,
  ID,
  InterfaceType,
  ObjectType,
  Query,
  String,
  renderSchema,
} from "@alloy-js/graphql";
import { GraphQLInterfaceType, GraphQLObjectType } from "graphql";
import { describe, expect, it } from "vitest";

describe("interface field inheritance", () => {
  it("adds interface fields to implementing objects", () => {
    const schema = renderSchema(
      <>
        <InterfaceType name="Node">
          <Field name="id" type={ID} />
        </InterfaceType>
        <ObjectType name="User" interfaces={["Node"]}>
          <Field name="name" type={String} />
        </ObjectType>
        <Query>
          <Field name="user" type="User" />
        </Query>
      </>,
    );

    const userType = schema.getType("User") as GraphQLObjectType;
    const fields = userType.getFields();
    expect(fields.id).toBeDefined();
    expect(fields.name).toBeDefined();
  });

  it("adds transitive interfaces to implementing objects", () => {
    const schema = renderSchema(
      <>
        <InterfaceType name="Node">
          <Field name="id" type={ID} />
        </InterfaceType>
        <InterfaceType name="Resource" interfaces={["Node"]}>
          <Field name="url" type={String} />
        </InterfaceType>
        <ObjectType name="User" interfaces={["Resource"]}>
          <Field name="name" type={String} />
        </ObjectType>
        <Query>
          <Field name="user" type="User" />
        </Query>
      </>,
    );

    const userType = schema.getType("User") as GraphQLObjectType;
    expect(userType.getInterfaces().map((iface) => iface.name)).toEqual([
      "Resource",
      "Node",
    ]);
  });

  it("inherits fields through empty interfaces", () => {
    const schema = renderSchema(
      <>
        <InterfaceType name="Node">
          <Field name="id" type={ID} />
        </InterfaceType>
        <InterfaceType name="Resource" interfaces={["Node"]} />
        <ObjectType name="User" interfaces={["Resource"]}>
          <Field name="name" type={String} />
        </ObjectType>
        <Query>
          <Field name="user" type="User" />
        </Query>
      </>,
    );

    const userType = schema.getType("User") as GraphQLObjectType;
    const fields = userType.getFields();
    expect(fields.id).toBeDefined();
    expect(fields.name).toBeDefined();
  });

  it("inherits fields from interface hierarchies", () => {
    const schema = renderSchema(
      <>
        <InterfaceType name="Node">
          <Field name="id" type={ID} />
        </InterfaceType>
        <InterfaceType name="Resource" interfaces={["Node"]}>
          <Field name="url" type={String} />
        </InterfaceType>
        <Query>
          <Field name="resource" type="Resource" />
        </Query>
      </>,
    );

    const resourceType = schema.getType("Resource") as GraphQLInterfaceType;
    const resourceFields = resourceType.getFields();
    expect(resourceFields.id).toBeDefined();
    expect(resourceFields.url).toBeDefined();
  });
});
