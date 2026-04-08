import { namekey } from "@alloy-js/core";
import {
  DirectiveDefinition,
  EnumType,
  EnumValue,
  Field,
  ID,
  InputField,
  InputObjectType,
  InputValue,
  Int,
  ObjectType,
  Query,
  ScalarType,
  String,
  renderSchema,
} from "@alloy-js/graphql";
import { printSchema } from "graphql";
import { describe, expect, it } from "vitest";

// rick and morty schema source: https://github.com/afuh/rick-and-morty-api

const Character = namekey("Character");
const Location = namekey("Location");
const Episode = namekey("Episode");
const FilterCharacter = namekey("FilterCharacter");
const Characters = namekey("Characters");
const Info = namekey("Info");
const FilterLocation = namekey("FilterLocation");
const Locations = namekey("Locations");
const FilterEpisode = namekey("FilterEpisode");
const Episodes = namekey("Episodes");
const CacheControlScope = namekey("CacheControlScope");
const Upload = namekey("Upload");

describe("rick and morty schema", () => {
  it("matches snapshot", () => {
    const schema = renderSchema(
      <>
        <DirectiveDefinition
          name={namekey("cacheControl")}
          locations={["FIELD_DEFINITION", "OBJECT", "INTERFACE"]}
        >
          <InputValue name="maxAge" type={Int} />
          <InputValue name="scope" type={CacheControlScope} />
        </DirectiveDefinition>
        <Query>
          <Field
            name="character"
            type={Character}
            description={"Get a specific character by ID"}
          >
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field
            name="characters"
            type={Characters}
            description={"Get the list of all characters"}
          >
            <InputValue name="page" type={Int} />
            <InputValue name="filter" type={FilterCharacter} />
          </Field>
          <Field
            name="charactersByIds"
            type={Character}
            description={"Get a list of characters selected by ids"}
          >
            <Field.List />
            <InputValue name="ids" type={ID} nonNull>
              <InputValue.List nonNull />
            </InputValue>
          </Field>
          <Field
            name="location"
            type={Location}
            description={"Get a specific locations by ID"}
          >
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field
            name="locations"
            type={Locations}
            description={"Get the list of all locations"}
          >
            <InputValue name="page" type={Int} />
            <InputValue name="filter" type={FilterLocation} />
          </Field>
          <Field
            name="locationsByIds"
            type={Location}
            description={"Get a list of locations selected by ids"}
          >
            <Field.List />
            <InputValue name="ids" type={ID} nonNull>
              <InputValue.List nonNull />
            </InputValue>
          </Field>
          <Field
            name="episode"
            type={Episode}
            description={"Get a specific episode by ID"}
          >
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field
            name="episodes"
            type={Episodes}
            description={"Get the list of all episodes"}
          >
            <InputValue name="page" type={Int} />
            <InputValue name="filter" type={FilterEpisode} />
          </Field>
          <Field
            name="episodesByIds"
            type={Episode}
            description={"Get a list of episodes selected by ids"}
          >
            <Field.List />
            <InputValue name="ids" type={ID} nonNull>
              <InputValue.List nonNull />
            </InputValue>
          </Field>
        </Query>
        <ObjectType name={Character}>
          <Field name="id" type={ID} description={"The id of the character."} />
          <Field
            name="name"
            type={String}
            description={"The name of the character."}
          />
          <Field
            name="status"
            type={String}
            description={
              "The status of the character ('Alive', 'Dead' or 'unknown')."
            }
          />
          <Field
            name="species"
            type={String}
            description={"The species of the character."}
          />
          <Field
            name="type"
            type={String}
            description={"The type or subspecies of the character."}
          />
          <Field
            name="gender"
            type={String}
            description={
              "The gender of the character ('Female', 'Male', 'Genderless' or 'unknown')."
            }
          />
          <Field
            name="origin"
            type={Location}
            description={"The character's origin location"}
          />
          <Field
            name="location"
            type={Location}
            description={"The character's last known location"}
          />
          <Field
            name="image"
            type={String}
            description={
              "Link to the character's image.\nAll images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars."
            }
          />
          <Field
            name="episode"
            type={Episode}
            description={"Episodes in which this character appeared."}
          >
            <Field.List nonNull />
          </Field>
          <Field
            name="created"
            type={String}
            description={
              "Time at which the character was created in the database."
            }
          />
        </ObjectType>
        <ObjectType name={Location}>
          <Field name="id" type={ID} description={"The id of the location."} />
          <Field
            name="name"
            type={String}
            description={"The name of the location."}
          />
          <Field
            name="type"
            type={String}
            description={"The type of the location."}
          />
          <Field
            name="dimension"
            type={String}
            description={"The dimension in which the location is located."}
          />
          <Field
            name="residents"
            type={Character}
            description={
              "List of characters who have been last seen in the location."
            }
          >
            <Field.List nonNull />
          </Field>
          <Field
            name="created"
            type={String}
            description={
              "Time at which the location was created in the database."
            }
          />
        </ObjectType>
        <ObjectType name={Episode}>
          <Field name="id" type={ID} description={"The id of the episode."} />
          <Field
            name="name"
            type={String}
            description={"The name of the episode."}
          />
          <Field
            name="air_date"
            type={String}
            description={"The air date of the episode."}
          />
          <Field
            name="episode"
            type={String}
            description={"The code of the episode."}
          />
          <Field
            name="characters"
            type={Character}
            description={
              "List of characters who have been seen in the episode."
            }
          >
            <Field.List nonNull />
          </Field>
          <Field
            name="created"
            type={String}
            description={
              "Time at which the episode was created in the database."
            }
          />
        </ObjectType>
        <InputObjectType name={FilterCharacter}>
          <InputField name="name" type={String} />
          <InputField name="status" type={String} />
          <InputField name="species" type={String} />
          <InputField name="type" type={String} />
          <InputField name="gender" type={String} />
        </InputObjectType>
        <ObjectType name={Characters}>
          <Field name="info" type={Info} />
          <Field name="results" type={Character}>
            <Field.List />
          </Field>
        </ObjectType>
        <ObjectType name={Info}>
          <Field
            name="count"
            type={Int}
            description={"The length of the response."}
          />
          <Field name="pages" type={Int} description={"The amount of pages."} />
          <Field
            name="next"
            type={Int}
            description={"Number of the next page (if it exists)"}
          />
          <Field
            name="prev"
            type={Int}
            description={"Number of the previous page (if it exists)"}
          />
        </ObjectType>
        <InputObjectType name={FilterLocation}>
          <InputField name="name" type={String} />
          <InputField name="type" type={String} />
          <InputField name="dimension" type={String} />
        </InputObjectType>
        <ObjectType name={Locations}>
          <Field name="info" type={Info} />
          <Field name="results" type={Location}>
            <Field.List />
          </Field>
        </ObjectType>
        <InputObjectType name={FilterEpisode}>
          <InputField name="name" type={String} />
          <InputField name="episode" type={String} />
        </InputObjectType>
        <ObjectType name={Episodes}>
          <Field name="info" type={Info} />
          <Field name="results" type={Episode}>
            <Field.List />
          </Field>
        </ObjectType>
        <EnumType name={CacheControlScope}>
          <EnumValue name="PUBLIC" />
          <EnumValue name="PRIVATE" />
        </EnumType>
        <ScalarType
          name={Upload}
          description={"The `Upload` scalar type represents a file upload."}
        />
      </>,
    );

    expect(printSchema(schema)).toMatchSnapshot();
  });
});
