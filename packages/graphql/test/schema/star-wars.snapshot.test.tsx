import { namekey } from "@alloy-js/core";
import {
  Connection,
  Field,
  Float,
  ID,
  InputValue,
  Int,
  Node,
  NodeField,
  NodeInterface,
  ObjectType,
  PageInfoType,
  String,
  renderSchema,
  type TypeReference,
} from "@alloy-js/graphql";
import { printSchema } from "graphql";
import pluralize from "pluralize";
import { describe, expect, it } from "vitest";

// Star Wars schema source: https://github.com/graphql/swapi-graphql

const Film = namekey("Film");
const Person = namekey("Person");
const Planet = namekey("Planet");
const Root = namekey("Root");
const Species = namekey("Species");
const Starship = namekey("Starship");
const Vehicle = namekey("Vehicle");
const connectionListDescription = `A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead.`;
const totalCountField = (
  <Field
    name="totalCount"
    type={Int}
    description={`A count of the total number of objects in this connection, ignoring pagination.\nThis allows a client to fetch the first five objects by passing "5" as the\nargument to "first", then fetch the total count so it could display "5 of 83",\nfor example.`}
  />
);
const createdField = (
  <Field
    name="created"
    type={String}
    description={`The ISO 8601 date format of the time that this resource was created.`}
  />
);
const editedField = (
  <Field
    name="edited"
    type={String}
    description={`The ISO 8601 date format of the time that this resource was edited.`}
  />
);
const connectionFieldFor = (
  name: string,
  nodeType: TypeReference,
  fieldName?: string,
) => {
  return (
    <Field name={name} type={nodeType}>
      <Field.Connection fieldName={fieldName ?? `${name}Connection`}>
        <Connection.Fields>
          {totalCountField}
          <Field
            name={pluralize(name)}
            type={nodeType}
            description={connectionListDescription}
          >
            <Field.List />
          </Field>
        </Connection.Fields>
      </Field.Connection>
    </Field>
  );
};

describe("star wars schema", () => {
  it("matches snapshot", () => {
    const schema = renderSchema(
      <>
        <ObjectType
          name={Film}
          description={`A single film.`}
          interfaces={[Node]}
        >
          <Field
            name="title"
            type={String}
            description={`The title of this film.`}
          />
          <Field
            name="episodeID"
            type={Int}
            description={`The episode number of this film.`}
          />
          <Field
            name="openingCrawl"
            type={String}
            description={`The opening paragraphs at the beginning of this film.`}
          />
          <Field
            name="director"
            type={String}
            description={`The name of the director of this film.`}
          />
          <Field
            name="producers"
            type={String}
            description={`The name(s) of the producer(s) of this film.`}
          >
            <Field.List />
          </Field>
          <Field
            name="releaseDate"
            type={String}
            description={`The ISO 8601 date format of film release at original creator country.`}
          />
          {connectionFieldFor("species", Species)}
          {connectionFieldFor("starship", Starship)}
          {connectionFieldFor("vehicle", Vehicle)}
          {connectionFieldFor("character", Person)}
          {connectionFieldFor("planet", Planet)}
          {createdField}
          {editedField}
        </ObjectType>
        <NodeInterface
          description={`An object with an ID`}
          idDescription={`The id of the object.`}
        />
        <PageInfoType />
        <ObjectType
          name={Person}
          description={`An individual person or character within the Star Wars universe.`}
          interfaces={[Node]}
        >
          <Field
            name="name"
            type={String}
            description={`The name of this person.`}
          />
          <Field
            name="birthYear"
            type={String}
            description={`The birth year of the person, using the in-universe standard of BBY or ABY -\nBefore the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is\na battle that occurs at the end of Star Wars episode IV: A New Hope.`}
          />
          <Field
            name="eyeColor"
            type={String}
            description={`The eye color of this person. Will be "unknown" if not known or "n/a" if the\nperson does not have an eye.`}
          />
          <Field
            name="gender"
            type={String}
            description={`The gender of this person. Either "Male", "Female" or "unknown",\n"n/a" if the person does not have a gender.`}
          />
          <Field
            name="hairColor"
            type={String}
            description={`The hair color of this person. Will be "unknown" if not known or "n/a" if the\nperson does not have hair.`}
          />
          <Field
            name="height"
            type={Int}
            description={`The height of the person in centimeters.`}
          />
          <Field
            name="mass"
            type={Float}
            description={`The mass of the person in kilograms.`}
          />
          <Field
            name="skinColor"
            type={String}
            description={`The skin color of this person.`}
          />
          <Field
            name="homeworld"
            type={Planet}
            description={`A planet that this person was born on or inhabits.`}
          />
          {connectionFieldFor("film", Film)}
          <Field
            name="species"
            type={Species}
            description={`The species that this person belongs to, or null if unknown.`}
          />
          {connectionFieldFor("starship", Starship)}
          {connectionFieldFor("vehicle", Vehicle)}
          {createdField}
          {editedField}
        </ObjectType>
        <ObjectType
          name={Planet}
          description={`A large mass, planet or planetoid in the Star Wars Universe, at the time of\n0 ABY.`}
          interfaces={[Node]}
        >
          <Field
            name="name"
            type={String}
            description={`The name of this planet.`}
          />
          <Field
            name="diameter"
            type={Int}
            description={`The diameter of this planet in kilometers.`}
          />
          <Field
            name="rotationPeriod"
            type={Int}
            description={`The number of standard hours it takes for this planet to complete a single\nrotation on its axis.`}
          />
          <Field
            name="orbitalPeriod"
            type={Int}
            description={`The number of standard days it takes for this planet to complete a single orbit\nof its local star.`}
          />
          <Field
            name="gravity"
            type={String}
            description={`A number denoting the gravity of this planet, where "1" is normal or 1 standard\nG. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.`}
          />
          <Field
            name="population"
            type={Float}
            description={`The average population of sentient beings inhabiting this planet.`}
          />
          <Field
            name="climates"
            type={String}
            description={`The climates of this planet.`}
          >
            <Field.List />
          </Field>
          <Field
            name="terrains"
            type={String}
            description={`The terrains of this planet.`}
          >
            <Field.List />
          </Field>
          <Field
            name="surfaceWater"
            type={Float}
            description={`The percentage of the planet surface that is naturally occurring water or bodies\nof water.`}
          />
          {connectionFieldFor("resident", Person)}
          {connectionFieldFor("film", Film)}
          {createdField}
          {editedField}
        </ObjectType>
        <ObjectType name={Root}>
          {connectionFieldFor("film", Film, "allFilms")}
          <Field name="film" type={Film}>
            <InputValue name="id" type={ID} />
            <InputValue name="filmID" type={ID} />
          </Field>
          {connectionFieldFor("person", Person, "allPeople")}
          <Field name="person" type={Person}>
            <InputValue name="id" type={ID} />
            <InputValue name="personID" type={ID} />
          </Field>
          {connectionFieldFor("planet", Planet, "allPlanets")}
          <Field name="planet" type={Planet}>
            <InputValue name="id" type={ID} />
            <InputValue name="planetID" type={ID} />
          </Field>
          {connectionFieldFor("species", Species, "allSpecies")}
          <Field name="species" type={Species}>
            <InputValue name="id" type={ID} />
            <InputValue name="speciesID" type={ID} />
          </Field>
          {connectionFieldFor("starship", Starship, "allStarships")}
          <Field name="starship" type={Starship}>
            <InputValue name="id" type={ID} />
            <InputValue name="starshipID" type={ID} />
          </Field>
          {connectionFieldFor("vehicle", Vehicle, "allVehicles")}
          <Field name="vehicle" type={Vehicle}>
            <InputValue name="id" type={ID} />
            <InputValue name="vehicleID" type={ID} />
          </Field>
          <NodeField />
        </ObjectType>
        <ObjectType
          name={Species}
          description={`A type of person or character within the Star Wars Universe.`}
          interfaces={[Node]}
        >
          <Field
            name="name"
            type={String}
            description={`The name of this species.`}
          />
          <Field
            name="classification"
            type={String}
            description={`The classification of this species, such as "mammal" or "reptile".`}
          />
          <Field
            name="designation"
            type={String}
            description={`The designation of this species, such as "sentient".`}
          />
          <Field
            name="averageHeight"
            type={Float}
            description={`The average height of this species in centimeters.`}
          />
          <Field
            name="averageLifespan"
            type={Int}
            description={`The average lifespan of this species in years, null if unknown.`}
          />
          <Field
            name="eyeColors"
            type={String}
            description={`Common eye colors for this species, null if this species does not typically\nhave eyes.`}
          >
            <Field.List />
          </Field>
          <Field
            name="hairColors"
            type={String}
            description={`Common hair colors for this species, null if this species does not typically\nhave hair.`}
          >
            <Field.List />
          </Field>
          <Field
            name="skinColors"
            type={String}
            description={`Common skin colors for this species, null if this species does not typically\nhave skin.`}
          >
            <Field.List />
          </Field>
          <Field
            name="language"
            type={String}
            description={`The language commonly spoken by this species.`}
          />
          <Field
            name="homeworld"
            type={Planet}
            description={`A planet that this species originates from.`}
          />
          {connectionFieldFor("person", Person)}
          {connectionFieldFor("film", Film)}
          {createdField}
          {editedField}
        </ObjectType>
        <ObjectType
          name={Starship}
          description={`A single transport craft that has hyperdrive capability.`}
          interfaces={[Node]}
        >
          <Field
            name="name"
            type={String}
            description={`The name of this starship. The common name, such as "Death Star".`}
          />
          <Field
            name="model"
            type={String}
            description={`The model or official name of this starship. Such as "T-65 X-wing" or "DS-1\nOrbital Battle Station".`}
          />
          <Field
            name="starshipClass"
            type={String}
            description={`The class of this starship, such as "Starfighter" or "Deep Space Mobile\nBattlestation"`}
          />
          <Field
            name="manufacturers"
            type={String}
            description={`The manufacturers of this starship.`}
          >
            <Field.List />
          </Field>
          <Field
            name="costInCredits"
            type={Float}
            description={`The cost of this starship new, in galactic credits.`}
          />
          <Field
            name="length"
            type={Float}
            description={`The length of this starship in meters.`}
          />
          <Field
            name="crew"
            type={String}
            description={`The number of personnel needed to run or pilot this starship.`}
          />
          <Field
            name="passengers"
            type={String}
            description={`The number of non-essential people this starship can transport.`}
          />
          <Field
            name="maxAtmospheringSpeed"
            type={Int}
            description={`The maximum speed of this starship in atmosphere. null if this starship is\nincapable of atmosphering flight.`}
          />
          <Field
            name="hyperdriveRating"
            type={Float}
            description={`The class of this starships hyperdrive.`}
          />
          <Field
            name="MGLT"
            type={Int}
            description={`The Maximum number of Megalights this starship can travel in a standard hour.\nA "Megalight" is a standard unit of distance and has never been defined before\nwithin the Star Wars universe. This figure is only really useful for measuring\nthe difference in speed of starships. We can assume it is similar to AU, the\ndistance between our Sun (Sol) and Earth.`}
          />
          <Field
            name="cargoCapacity"
            type={Float}
            description={`The maximum number of kilograms that this starship can transport.`}
          />
          <Field
            name="consumables"
            type={String}
            description={`The maximum length of time that this starship can provide consumables for its\nentire crew without having to resupply.`}
          />
          {connectionFieldFor("pilot", Person)}
          {connectionFieldFor("film", Film)}
          {createdField}
          {editedField}
        </ObjectType>
        <ObjectType
          name={Vehicle}
          description={`A single transport craft that does not have hyperdrive capability`}
          interfaces={[Node]}
        >
          <Field
            name="name"
            type={String}
            description={`The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder\nbike".`}
          />
          <Field
            name="model"
            type={String}
            description={`The model or official name of this vehicle. Such as "All-Terrain Attack\nTransport".`}
          />
          <Field
            name="vehicleClass"
            type={String}
            description={`The class of this vehicle, such as "Wheeled" or "Repulsorcraft".`}
          />
          <Field
            name="manufacturers"
            type={String}
            description={`The manufacturers of this vehicle.`}
          >
            <Field.List />
          </Field>
          <Field
            name="costInCredits"
            type={Float}
            description={`The cost of this vehicle new, in Galactic Credits.`}
          />
          <Field
            name="length"
            type={Float}
            description={`The length of this vehicle in meters.`}
          />
          <Field
            name="crew"
            type={String}
            description={`The number of personnel needed to run or pilot this vehicle.`}
          />
          <Field
            name="passengers"
            type={String}
            description={`The number of non-essential people this vehicle can transport.`}
          />
          <Field
            name="maxAtmospheringSpeed"
            type={Int}
            description={`The maximum speed of this vehicle in atmosphere.`}
          />
          <Field
            name="cargoCapacity"
            type={Float}
            description={`The maximum number of kilograms that this vehicle can transport.`}
          />
          <Field
            name="consumables"
            type={String}
            description={`The maximum length of time that this vehicle can provide consumables for its\nentire crew without having to resupply.`}
          />
          {connectionFieldFor("pilot", Person)}
          {connectionFieldFor("film", Film)}
          {createdField}
          {editedField}
        </ObjectType>
      </>,
      {
        query: Root,
      },
    );

    expect(printSchema(schema)).toMatchSnapshot();
  });
});
