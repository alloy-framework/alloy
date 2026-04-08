import {
  Argument,
  Field,
  InputField,
  InputObjectType,
  InputValue,
  ObjectType,
  Query,
  String,
  renderSchema,
} from "@alloy-js/graphql";
import { describe, expect, it } from "vitest";

describe("component usage validation", () => {
  it("rejects Field in input object types", () => {
    expect(() =>
      renderSchema(
        <>
          <InputObjectType name="BadInput">
            <Field name="oops" type={String} />
          </InputObjectType>
          <Query>
            <Field name="ok" type={String} />
          </Query>
        </>,
      ),
    ).toThrow("Field must be used within an ObjectType or InterfaceType.");
  });

  it("rejects InputField outside input objects", () => {
    expect(() =>
      renderSchema(
        <>
          <ObjectType name="User">
            <InputField name="oops" type={String} />
          </ObjectType>
          <Query>
            <Field name="user" type="User" />
          </Query>
        </>,
      ),
    ).toThrow("InputField must be used within an InputObjectType.");
  });

  it("rejects InputValue outside fields or directives", () => {
    expect(() =>
      renderSchema(
        <Query>
          <InputValue name="id" type={String} />
          <Field name="ok" type={String} />
        </Query>,
      ),
    ).toThrow("InputValue must be used within a Field or DirectiveDefinition.");
  });

  it("rejects Argument outside directives", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Argument name="state" value="on" />
          <Field name="ok" type={String} />
        </Query>,
      ),
    ).toThrow("Argument must be used within a Directive.");
  });

  it("rejects multiple list children", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Field name="tags" type={String}>
            <Field.List />
            <Field.List />
          </Field>
        </Query>,
      ),
    ).toThrow("Field only supports a single Field.List child.");

    expect(() =>
      renderSchema(
        <>
          <InputObjectType name="Filter">
            <InputField name="tags" type={String}>
              <InputField.List />
              <InputField.List />
            </InputField>
          </InputObjectType>
          <Query>
            <Field name="items" type={String}>
              <InputValue name="filter" type="Filter" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow("InputField only supports a single InputField.List child.");

    expect(() =>
      renderSchema(
        <Query>
          <Field name="items" type={String}>
            <InputValue name="ids" type={String}>
              <InputValue.List />
              <InputValue.List />
            </InputValue>
          </Field>
        </Query>,
      ),
    ).toThrow("InputValue only supports a single InputValue.List child.");
  });

  it("rejects non-list children for list-only components", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Field name="items" type={String}>
            <Field.List>{"oops"}</Field.List>
          </Field>
        </Query>,
      ),
    ).toThrow("Field.List only supports Field.List as a child.");

    expect(() =>
      renderSchema(
        <>
          <InputObjectType name="Filter">
            <InputField name="tags" type={String}>
              <InputField.List>{"oops"}</InputField.List>
            </InputField>
          </InputObjectType>
          <Query>
            <Field name="items" type={String}>
              <InputValue name="filter" type="Filter" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow("InputField.List only supports InputField.List as a child.");

    expect(() =>
      renderSchema(
        <Query>
          <Field name="items" type={String}>
            <InputValue name="ids" type={String}>
              <InputValue.List>{"oops"}</InputValue.List>
            </InputValue>
          </Field>
        </Query>,
      ),
    ).toThrow("InputValue.List only supports InputValue.List as a child.");
  });

  it("rejects non-directive children for InputField and InputValue", () => {
    expect(() =>
      renderSchema(
        <Query>
          <Field name="items" type={String}>
            <InputValue name="ids" type={String}>
              {"oops"}
            </InputValue>
          </Field>
        </Query>,
      ),
    ).toThrow(
      "InputValue only supports Directive and InputValue.List children.",
    );

    expect(() =>
      renderSchema(
        <>
          <InputObjectType name="Filter">
            <InputField name="term" type={String}>
              {"oops"}
            </InputField>
          </InputObjectType>
          <Query>
            <Field name="items" type={String}>
              <InputValue name="filter" type="Filter" />
            </Field>
          </Query>
        </>,
      ),
    ).toThrow(
      "InputField only supports Directive and InputField.List children.",
    );
  });
});
