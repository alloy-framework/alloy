import { namekey } from "@alloy-js/core";
import {
  EnumType,
  EnumValue,
  Field,
  ID,
  InputField,
  InputObjectType,
  InputValue,
  Int,
  InterfaceType,
  Mutation,
  ObjectType,
  Query,
  ScalarType,
  String,
  Subscription,
  renderSchema,
} from "@alloy-js/graphql";
import { printSchema } from "graphql";
import { describe, expect, it } from "vitest";

// howtographql schema source: https://github.com/howtographql/howtographql

const AuthProviderSignupData = namekey("AuthProviderSignupData");
const AuthProviderEmail = namekey("AUTH_PROVIDER_EMAIL");
const DateTime = namekey("DateTime");
const Link = namekey("Link");
const LinkFilter = namekey("LinkFilter");
const LinkOrderBy = namekey("LinkOrderBy");
const LinkSubscriptionFilter = namekey("LinkSubscriptionFilter");
const LinkSubscriptionPayload = namekey("LinkSubscriptionPayload");
const ModelMutationType = namekey("_ModelMutationType");
const NodeRef = namekey("Node");
const QueryMeta = namekey("_QueryMeta");
const SigninPayload = namekey("SigninPayload");
const User = namekey("User");
const Vote = namekey("Vote");
const VoteSubscriptionFilter = namekey("VoteSubscriptionFilter");
const VoteSubscriptionPayload = namekey("VoteSubscriptionPayload");

describe("howtographql schema", () => {
  it("matches snapshot", () => {
    const schema = renderSchema(
      <>
        <Query>
          <Field name="allLinks" type={Link} nonNull>
            <Field.List nonNull />
            <InputValue name="filter" type={LinkFilter} />
            <InputValue name="orderBy" type={LinkOrderBy} />
            <InputValue name="skip" type={Int} />
            <InputValue name="first" type={Int} />
          </Field>
          <Field name="_allLinksMeta" type={QueryMeta} nonNull />
        </Query>
        <Mutation>
          <Field name="signinUser" type={SigninPayload} nonNull>
            <InputValue name="email" type={AuthProviderEmail} />
          </Field>
          <Field name="createUser" type={User}>
            <InputValue name="name" type={String} nonNull />
            <InputValue
              name="authProvider"
              type={AuthProviderSignupData}
              nonNull
            />
          </Field>
          <Field name="createLink" type={Link}>
            <InputValue name="description" type={String} nonNull />
            <InputValue name="url" type={String} nonNull />
            <InputValue name="postedById" type={ID} />
          </Field>
          <Field name="createVote" type={Vote}>
            <InputValue name="linkId" type={ID} />
            <InputValue name="userId" type={ID} />
          </Field>
        </Mutation>
        <Subscription>
          <Field name="Link" type={LinkSubscriptionPayload}>
            <InputValue name="filter" type={LinkSubscriptionFilter} />
          </Field>
          <Field name="Vote" type={VoteSubscriptionPayload}>
            <InputValue name="filter" type={VoteSubscriptionFilter} />
          </Field>
        </Subscription>
        <InterfaceType name={NodeRef}>
          <Field name="id" type={ID} nonNull />
        </InterfaceType>
        <ObjectType name={User} interfaces={[NodeRef]}>
          <Field name="id" type={ID} nonNull />
          <Field name="createdAt" type={DateTime} nonNull />
          <Field name="name" type={String} nonNull />
          <Field name="links" type={Link} nonNull>
            <Field.List nonNull />
          </Field>
          <Field name="votes" type={Vote} nonNull>
            <Field.List nonNull />
          </Field>
          <Field name="email" type={String} />
          <Field name="password" type={String} />
        </ObjectType>
        <ObjectType name={Link} interfaces={[NodeRef]}>
          <Field name="id" type={ID} nonNull />
          <Field name="createdAt" type={DateTime} nonNull />
          <Field name="url" type={String} nonNull />
          <Field name="description" type={String} nonNull />
          <Field name="postedBy" type={User} nonNull />
          <Field name="votes" type={Vote} nonNull>
            <Field.List nonNull />
          </Field>
        </ObjectType>
        <ObjectType name={Vote} interfaces={[NodeRef]}>
          <Field name="id" type={ID} nonNull />
          <Field name="createdAt" type={DateTime} nonNull />
          <Field name="user" type={User} nonNull />
          <Field name="link" type={Link} nonNull />
        </ObjectType>
        <InputObjectType name={AuthProviderSignupData}>
          <InputField name="email" type={AuthProviderEmail} />
        </InputObjectType>
        <InputObjectType name={AuthProviderEmail}>
          <InputField name="email" type={String} nonNull />
          <InputField name="password" type={String} nonNull />
        </InputObjectType>
        <InputObjectType name={LinkSubscriptionFilter}>
          <InputField name="mutation_in" type={ModelMutationType} nonNull>
            <InputField.List />
          </InputField>
        </InputObjectType>
        <InputObjectType name={VoteSubscriptionFilter}>
          <InputField name="mutation_in" type={ModelMutationType} nonNull>
            <InputField.List />
          </InputField>
        </InputObjectType>
        <InputObjectType name={LinkFilter}>
          <InputField name="OR" type={LinkFilter} nonNull>
            <InputField.List />
          </InputField>
          <InputField name="description_contains" type={String} />
          <InputField name="url_contains" type={String} />
        </InputObjectType>
        <ObjectType name={SigninPayload}>
          <Field name="token" type={String} />
          <Field name="user" type={User} />
        </ObjectType>
        <ObjectType name={LinkSubscriptionPayload}>
          <Field name="mutation" type={ModelMutationType} nonNull />
          <Field name="node" type={Link} />
          <Field name="updatedFields" type={String} nonNull>
            <Field.List />
          </Field>
        </ObjectType>
        <ObjectType name={VoteSubscriptionPayload}>
          <Field name="mutation" type={ModelMutationType} nonNull />
          <Field name="node" type={Vote} />
          <Field name="updatedFields" type={String} nonNull>
            <Field.List />
          </Field>
        </ObjectType>
        <EnumType name={LinkOrderBy}>
          <EnumValue name="createdAt_ASC" />
          <EnumValue name="createdAt_DESC" />
        </EnumType>
        <EnumType name={ModelMutationType}>
          <EnumValue name="CREATED" />
          <EnumValue name="UPDATED" />
          <EnumValue name="DELETED" />
        </EnumType>
        <ObjectType name={QueryMeta}>
          <Field name="count" type={Int} nonNull />
        </ObjectType>
        <ScalarType name={DateTime} />
      </>,
      { namePolicy: null },
    );

    expect(printSchema(schema)).toMatchSnapshot();
  });
});
