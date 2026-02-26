import { namekey } from "@alloy-js/core";
import {
  Boolean,
  DirectiveDefinition,
  EnumType,
  EnumValue,
  Field,
  ID,
  InputField,
  InputObjectType,
  InputValue,
  Int,
  Mutation,
  Node,
  NodeInterface,
  ObjectType,
  Query,
  ScalarType,
  String,
  Subscription,
  UnionMember,
  UnionType,
  renderSchema,
} from "@alloy-js/graphql";
import { printSchema } from "graphql";
import { describe, expect, it } from "vitest";

const Url = namekey("Url");
const Role = namekey("Role");
const Profile = namekey("Profile");
const User = namekey("User");
const Post = namekey("Post");
const SearchResult = namekey("SearchResult");
const ProfileInput = namekey("ProfileInput");
const SearchFilter = namekey("SearchFilter");
const RootQuery = namekey("RootQuery");
const RootMutation = namekey("RootMutation");
const UserInput = namekey("UserInput");

describe("renderSchema snapshots", () => {
  it("prints a comprehensive schema snapshot", () => {
    const schema = renderSchema(
      <>
        <DirectiveDefinition
          name="tag"
          locations={["OBJECT", "FIELD_DEFINITION"]}
        >
          <InputValue name="name" type={String} nonNull />
          <InputValue name="important" type={Boolean} defaultValue={false} />
        </DirectiveDefinition>
        <ScalarType
          name={Url}
          specifiedByUrl="https://example.com/spec#url"
          serialize={(value: unknown) => value}
        />
        <NodeInterface />
        <EnumType name={Role}>
          <EnumValue name="ADMIN" />
          <EnumValue name="USER" deprecated />
        </EnumType>
        <ObjectType name={Profile}>
          <Field name="url" type={Url} />
          <Field name="bio" type={String} deprecated />
        </ObjectType>
        <ObjectType name={User} interfaces={[Node]}>
          <Field name="name" type={String} />
          <Field name="role" type={Role} deprecated />
          <Field name="profile" type={Profile} />
        </ObjectType>
        <ObjectType name={Post}>
          <Field name="id" type={ID} nonNull />
          <Field name="author" type={User} />
          <Field name="tags" type={String} nonNull>
            <Field.List />
          </Field>
        </ObjectType>
        <UnionType name={SearchResult}>
          <UnionMember type={User} />
          <UnionMember type={Post} />
        </UnionType>
        <InputObjectType name={ProfileInput}>
          <InputField
            name="displayName"
            type={String}
            defaultValue="Anonymous"
          />
          <InputField name="url" type={Url} />
          <InputField name="legacy" type={String} deprecated />
        </InputObjectType>
        <InputObjectType name={SearchFilter} oneOf>
          <InputField name="id" type={ID} />
          <InputField name="name" type={String} />
        </InputObjectType>
        <Query>
          <Field name="me" type={User} />
          <Field name="search" type={SearchResult}>
            <Field.List />
            <InputValue name="filter" type={SearchFilter} />
            <InputValue name="limit" type={Int} defaultValue={10} />
            <InputValue name="includeArchived" type={Boolean} deprecated />
          </Field>
        </Query>
        <Mutation>
          <Field name="updateProfile" type={Profile}>
            <InputValue name="input" type={ProfileInput} nonNull />
          </Field>
        </Mutation>
        <Subscription>
          <Field name="userAdded" type={User} />
        </Subscription>
      </>,
    );

    expect(printSchema(schema)).toMatchSnapshot();
  });

  it("prints a schema snapshot with custom roots", () => {
    const schema = renderSchema(
      <>
        <DirectiveDefinition
          name="cacheControl"
          locations={["OBJECT", "FIELD_DEFINITION"]}
        >
          <InputValue name="maxAge" type={Int} defaultValue={60} />
        </DirectiveDefinition>
        <ObjectType name={RootQuery}>
          <Field name="ping" type={String} />
        </ObjectType>
        <ObjectType name={RootMutation}>
          <Field name="noop" type={String} />
        </ObjectType>
      </>,
      {
        query: RootQuery,
        mutation: RootMutation,
      },
    );

    expect(printSchema(schema)).toMatchSnapshot();
  });

  it("prints a schema snapshot with descriptions", () => {
    const schema = renderSchema(
      <>
        <DirectiveDefinition
          name="auth"
          description="Authorization details"
          repeatable
          locations={["FIELD_DEFINITION"]}
        >
          <InputValue
            name="scope"
            type={String}
            description="Required scope"
            defaultValue="public"
          />
        </DirectiveDefinition>
        <ScalarType
          name={Url}
          description="A URL scalar"
          specifiedByUrl="https://example.com/spec#url"
          serialize={(value: unknown) => value}
        />
        <EnumType name={Role} description="User roles">
          <EnumValue name="ADMIN" description="Administrator" />
          <EnumValue name="USER" description="Standard user" />
        </EnumType>
        <InputObjectType name={UserInput} description="Input for user creation">
          <InputField name="name" type={String} description="Display name" />
          <InputField name="role" type={Role} description="User role" />
        </InputObjectType>
        <ObjectType name={RootQuery} description="Query root">
          <Field name="user" type={User} description="Fetch a user">
            <InputValue name="id" type={ID} nonNull description="User id" />
          </Field>
        </ObjectType>
        <ObjectType name={RootMutation} description="Mutation root">
          <Field name="createUser" type={User} description="Create a user">
            <InputValue
              name="input"
              type={UserInput}
              nonNull
              description="New user data"
            />
          </Field>
        </ObjectType>
        <ObjectType name={User} description="A user">
          <Field name="id" type={ID} nonNull description="User id" />
          <Field name="role" type={Role} description="User role" deprecated />
          <Field name="website" type={Url} description="Personal site" />
        </ObjectType>
      </>,
      {
        query: RootQuery,
        mutation: RootMutation,
        description: "Example schema",
      },
    );

    expect(printSchema(schema)).toMatchSnapshot();
  });
});
