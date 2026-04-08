import { namekey } from "@alloy-js/core";
import {
  Boolean,
  Field,
  ID,
  InputField,
  InputObjectType,
  InputValue,
  ObjectType,
  Query,
  String,
  renderSchema,
} from "@alloy-js/graphql";
import { printSchema } from "graphql";
import { describe, expect, it } from "vitest";

// countries schema source: https://github.com/trevorblades/countries

const Continent = namekey("Continent");
const ContinentFilterInput = namekey("ContinentFilterInput");
const Country = namekey("Country");
const CountryFilterInput = namekey("CountryFilterInput");
const Language = namekey("Language");
const LanguageFilterInput = namekey("LanguageFilterInput");
const State = namekey("State");
const StringQueryOperatorInput = namekey("StringQueryOperatorInput");
const Subdivision = namekey("Subdivision");

describe("countries schema", () => {
  it("matches snapshot", () => {
    const schema = renderSchema(
      <>
        <ObjectType name={Continent}>
          <Field name="code" type={ID} nonNull />
          <Field name="countries" type={Country} nonNull>
            <Field.List nonNull />
          </Field>
          <Field name="name" type={String} nonNull />
        </ObjectType>
        <InputObjectType name={ContinentFilterInput}>
          <InputField name="code" type={StringQueryOperatorInput} />
        </InputObjectType>
        <ObjectType name={Country}>
          <Field name="awsRegion" type={String} nonNull />
          <Field name="capital" type={String} />
          <Field name="code" type={ID} nonNull />
          <Field name="continent" type={Continent} nonNull />
          <Field name="currencies" type={String} nonNull>
            <Field.List nonNull />
          </Field>
          <Field name="currency" type={String} />
          <Field name="emoji" type={String} nonNull />
          <Field name="emojiU" type={String} nonNull />
          <Field name="languages" type={Language} nonNull>
            <Field.List nonNull />
          </Field>
          <Field name="name" type={String} nonNull>
            <InputValue name="lang" type={String} />
          </Field>
          <Field name="native" type={String} nonNull />
          <Field name="phone" type={String} nonNull />
          <Field name="phones" type={String} nonNull>
            <Field.List nonNull />
          </Field>
          <Field name="states" type={State} nonNull>
            <Field.List nonNull />
          </Field>
          <Field name="subdivisions" type={Subdivision} nonNull>
            <Field.List nonNull />
          </Field>
        </ObjectType>
        <InputObjectType name={CountryFilterInput}>
          <InputField name="code" type={StringQueryOperatorInput} />
          <InputField name="continent" type={StringQueryOperatorInput} />
          <InputField name="currency" type={StringQueryOperatorInput} />
          <InputField name="name" type={StringQueryOperatorInput} />
        </InputObjectType>
        <ObjectType name={Language}>
          <Field name="code" type={ID} nonNull />
          <Field name="countries" type={Country} nonNull>
            <Field.List nonNull />
          </Field>
          <Field name="name" type={String} nonNull />
          <Field name="native" type={String} nonNull />
          <Field name="rtl" type={Boolean} nonNull />
        </ObjectType>
        <InputObjectType name={LanguageFilterInput}>
          <InputField name="code" type={StringQueryOperatorInput} />
        </InputObjectType>
        <Query>
          <Field name="continent" type={Continent}>
            <InputValue name="code" type={ID} nonNull />
          </Field>
          <Field name="continents" type={Continent} nonNull>
            <Field.List nonNull />
            <InputValue
              name="filter"
              type={ContinentFilterInput}
              defaultValue={{}}
            />
          </Field>
          <Field name="countries" type={Country} nonNull>
            <Field.List nonNull />
            <InputValue
              name="filter"
              type={CountryFilterInput}
              defaultValue={{}}
            />
          </Field>
          <Field name="country" type={Country}>
            <InputValue name="code" type={ID} nonNull />
          </Field>
          <Field name="language" type={Language}>
            <InputValue name="code" type={ID} nonNull />
          </Field>
          <Field name="languages" type={Language} nonNull>
            <Field.List nonNull />
            <InputValue
              name="filter"
              type={LanguageFilterInput}
              defaultValue={{}}
            />
          </Field>
        </Query>
        <ObjectType name={State}>
          <Field name="code" type={String} />
          <Field name="country" type={Country} nonNull />
          <Field name="name" type={String} nonNull />
        </ObjectType>
        <InputObjectType name={StringQueryOperatorInput}>
          <InputField name="eq" type={String} />
          <InputField name="in" type={String} nonNull>
            <InputField.List />
          </InputField>
          <InputField name="ne" type={String} />
          <InputField name="nin" type={String} nonNull>
            <InputField.List />
          </InputField>
          <InputField name="regex" type={String} />
        </InputObjectType>
        <ObjectType name={Subdivision}>
          <Field name="code" type={ID} nonNull />
          <Field name="emoji" type={String} />
          <Field name="name" type={String} nonNull />
        </ObjectType>
      </>,
    );

    expect(printSchema(schema)).toMatchSnapshot();
  });
});
