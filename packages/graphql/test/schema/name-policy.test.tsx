import { namekey } from "@alloy-js/core";
import {
  createGraphQLNamePolicy,
  DirectiveDefinition,
  EnumType,
  EnumValue,
  Field,
  InputField,
  InputObjectType,
  InputValue,
  Int,
  Mutation,
  ObjectType,
  Query,
  relayNamePolicy,
  renderSchema,
  String,
} from "@alloy-js/graphql";
import { describe, expect, it } from "vitest";

describe("name policy", () => {
  it("allows uppercase field names for acronyms", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="Starship">
            <Field name="ASMR" type={Int} />
          </ObjectType>
          <Query>
            <Field name="ship" type="Starship" />
          </Query>
        </>,
      ),
    ).not.toThrow();
  });

  it("rejects lowercase type names by default", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="starship">
            <Field name="name" type={String} />
          </ObjectType>
          <Query>
            <Field name="ship" type="starship" />
          </Query>
        </>,
      ),
    ).toThrow(/type naming policy/);
  });

  it("rejects enum values that are not all caps", () => {
    expect(() =>
      renderSchema(
        <>
          <EnumType name="Role">
            <EnumValue name="user" />
          </EnumType>
          <Query>
            <Field name="role" type="Role" />
          </Query>
        </>,
      ),
    ).toThrow(/enumValue naming policy/);
  });

  it("allows disabling the policy entirely", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="starship">
            <Field name="name" type={String} />
          </ObjectType>
          <Query>
            <Field name="ship" type="starship" />
          </Query>
        </>,
        { namePolicy: null },
      ),
    ).not.toThrow();
  });

  it("rejects invalid argument names", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Field name="search" type={String}>
            <InputValue name="BadArg" type={String} />
          </Field>
        </Query>,
      ),
    ).toThrow(/argument naming policy/);
  });

  it("rejects invalid input field names", () => {
    expect(() =>
      renderSchema(
        <>
          <InputObjectType name="SearchInput">
            <InputField name="BadField" type={String} />
          </InputObjectType>
          <Query>
            <Field name="search" type={String}>
              <InputValue name="input" type="SearchInput" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(/inputField naming policy/);
  });

  it("rejects invalid directive names", () => {
    expect(() =>
      renderSchema(
        <>
          <DirectiveDefinition name="BadDirective" locations={["FIELD"]} />
          <Query>
            <Field name="ping" type={String} />
          </Query>
        </>,
      ),
    ).toThrow(/directive naming policy/);
  });

  it("rejects invalid GraphQL names", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="Bad-Name">
            <Field name="name" type={String} />
          </ObjectType>
          <Query>
            <Field name="ship" type="Bad-Name" />
          </Query>
        </>,
      ),
    ).toThrow(/GraphQL naming rules/);
  });

  it("allows namekeys to bypass policy rules while preserving spec validation", () => {
    const typeName = namekey("starship", { ignoreNamePolicy: true });
    const argName = namekey("BadArg", { ignoreNamePolicy: true });
    expect(() =>
      renderSchema(
        <>
          <ObjectType name={typeName}>
            <Field name="name" type={String} />
          </ObjectType>
          <Query>
            <Field name="ship" type={typeName}>
              <InputValue name={argName} type={String} />
            </Field>
          </Query>
        </>,
      ),
    ).not.toThrow();
  });

  it("still rejects spec-invalid names when ignoreNamePolicy is set", () => {
    const badName = namekey("Bad-Name", { ignoreNamePolicy: true });
    expect(() =>
      renderSchema(
        <>
          <ObjectType name={badName}>
            <Field name="name" type={String} />
          </ObjectType>
          <Query>
            <Field name="ship" type={badName} />
          </Query>
        </>,
      ),
    ).toThrow(/GraphQL naming rules/);
  });

  it("requires namekeys to reference ignoreNamePolicy types", () => {
    const typeName = namekey("starship", { ignoreNamePolicy: true });
    const namePolicy = createGraphQLNamePolicy({
      format: { type: (name) => name.toUpperCase() },
    });
    expect(() =>
      renderSchema(
        <>
          <ObjectType name={typeName}>
            <Field name="name" type={String} />
          </ObjectType>
          <Query>
            <Field name="ship" type="starship" />
          </Query>
        </>,
        { namePolicy },
      ),
    ).toThrow(/Unknown GraphQL type/);
  });

  it("applies formatters before validation", () => {
    const schema = renderSchema(
      <Query>
        <Field name="DisplayName" type={String} />
      </Query>,
      {
        namePolicy: createGraphQLNamePolicy({
          format: { field: (name) => name.toLowerCase() },
          rules: { field: /^[a-z]+$/ },
        }),
      },
    );

    const fields = schema.getQueryType()?.getFields();
    expect(fields).toHaveProperty("displayname");
    expect(fields).not.toHaveProperty("DisplayName");
  });

  it("normalizes string type references with a type formatter", () => {
    const schema = renderSchema(
      <>
        <ObjectType name="widget">
          <Field name="name" type={String} />
        </ObjectType>
        <Query>
          <Field name="widget" type="widget" />
        </Query>
      </>,
      {
        namePolicy: createGraphQLNamePolicy({
          format: { type: (name) => name.toUpperCase() },
        }),
      },
    );

    expect(schema.getType("WIDGET")).toBeDefined();
    expect(schema.getQueryType()?.getFields().widget.type.toString()).toBe(
      "WIDGET",
    );
  });

  it("allows mutation fields to use multiple arguments by default", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="Widget">
            <Field name="id" type={String} />
          </ObjectType>
          <Mutation>
            <Field name="updateWidget" type={String}>
              <InputValue name="payload" type={String} />
            </Field>
          </Mutation>
          <Query>
            <Field name="widget" type="Widget" />
          </Query>
        </>,
      ),
    ).not.toThrow();
  });

  it("requires mutation fields to use a single input argument in Relay policy", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="Widget">
            <Field name="id" type={String} />
          </ObjectType>
          <Mutation>
            <Field name="updateWidget" type={String}>
              <InputValue name="payload" type={String} />
            </Field>
          </Mutation>
          <Query>
            <Field name="widget" type="Widget" />
          </Query>
        </>,
        { namePolicy: relayNamePolicy },
      ),
    ).toThrow(
      'Mutation field "Mutation.updateWidget" must define a single "input" argument.',
    );
  });

  it("allows disabling naming conventions with namePolicy: null", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="Widget">
            <Field name="widgetName" type={String} />
          </ObjectType>
          <Mutation>
            <Field name="updateWidget" type={String}>
              <InputValue name="payload" type={String} />
              <InputValue name="mode" type={String} />
            </Field>
          </Mutation>
          <Query>
            <Field name="widget" type="Widget" />
          </Query>
        </>,
        { namePolicy: null },
      ),
    ).not.toThrow();
  });
});
