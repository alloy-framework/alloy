import { namekey } from "@alloy-js/core";
import {
  Boolean,
  EnumType,
  EnumValue,
  Field,
  ID,
  InputValue,
  Int,
  Mutation,
  ObjectType,
  Query,
  String,
  Subscription,
  UnionMember,
  UnionType,
  renderSchema,
} from "@alloy-js/graphql";
import { printSchema } from "graphql";
import { describe, expect, it } from "vitest";

// snowtooth schema source: https://github.com/MoonHighway/snowtooth

const Lift = namekey("Lift");
const LiftStatus = namekey("LiftStatus");
const SearchResult = namekey("SearchResult");
const Trail = namekey("Trail");
const TrailStatus = namekey("TrailStatus");

describe("snowtooth schema", () => {
  it("matches snapshot", () => {
    const schema = renderSchema(
      <>
        <ObjectType
          name={Lift}
          description="A `Lift` is a chairlift, gondola, tram, funicular, pulley, rope tow, or other means of ascending a mountain."
        >
          <Field
            name="id"
            type={ID}
            nonNull
            description={'The unique identifier for a `Lift` (id: "panorama")'}
          />
          <Field
            name="name"
            type={String}
            nonNull
            description="The name of a `Lift`"
          />
          <Field
            name="status"
            type={LiftStatus}
            description="The current status for a `Lift`: `OPEN`, `CLOSED`, `HOLD`"
          />
          <Field
            name="capacity"
            type={Int}
            nonNull
            description="The number of people that a `Lift` can hold"
          />
          <Field
            name="night"
            type={Boolean}
            nonNull
            description="A boolean describing whether a `Lift` is open for night skiing"
          />
          <Field
            name="elevationGain"
            type={Int}
            nonNull
            description="The number of feet in elevation that a `Lift` ascends"
          />
          <Field
            name="trailAccess"
            type={Trail}
            nonNull
            description="A list of trails that this `Lift` serves"
          >
            <Field.List nonNull />
          </Field>
        </ObjectType>
        <ObjectType
          name={Trail}
          description="A `Trail` is a run at a ski resort"
        >
          <Field
            name="id"
            type={ID}
            nonNull
            description="A unique identifier for a `Trail` (id: 'hemmed-slacks')"
          />
          <Field
            name="name"
            type={String}
            nonNull
            description="The name of a `Trail`"
          />
          <Field
            name="status"
            type={TrailStatus}
            description="The current status for a `Trail`: OPEN, CLOSED"
          />
          <Field
            name="difficulty"
            type={String}
            nonNull
            description="The difficulty rating for a `Trail`"
          />
          <Field
            name="groomed"
            type={Boolean}
            nonNull
            description="A boolean describing whether or not a `Trail` is groomed"
          />
          <Field
            name="trees"
            type={Boolean}
            nonNull
            description="A boolean describing whether or not a `Trail` has trees"
          />
          <Field
            name="night"
            type={Boolean}
            nonNull
            description="A boolean describing whether or not a `Trail` is open for night skiing"
          />
          <Field
            name="accessedByLifts"
            type={Lift}
            nonNull
            description="A list of Lifts that provide access to this `Trail`"
          >
            <Field.List nonNull />
          </Field>
        </ObjectType>
        <EnumType
          name={LiftStatus}
          description="An enum describing the options for `LiftStatus`: `OPEN`, `CLOSED`, `HOLD`"
        >
          <EnumValue name="OPEN" />
          <EnumValue name="CLOSED" />
          <EnumValue name="HOLD" />
        </EnumType>
        <EnumType
          name={TrailStatus}
          description="An enum describing the options for `TrailStatus`: `OPEN`, `CLOSED`"
        >
          <EnumValue name="OPEN" />
          <EnumValue name="CLOSED" />
        </EnumType>
        <UnionType
          name={SearchResult}
          description="This union type returns one of two types: a `Lift` or a `Trail`. When we search for a letter, we'll return a list of either `Lift` or `Trail` objects."
        >
          <UnionMember type={Lift} />
          <UnionMember type={Trail} />
        </UnionType>
        <Query>
          <Field
            name="allLifts"
            type={Lift}
            nonNull
            description="A list of all `Lift` objects"
          >
            <Field.List nonNull />
            <InputValue name="status" type={LiftStatus} />
          </Field>
          <Field
            name="allTrails"
            type={Trail}
            nonNull
            description="A list of all `Trail` objects"
          >
            <Field.List nonNull />
            <InputValue name="status" type={TrailStatus} />
          </Field>
          <Field
            name="Lift"
            type={Lift}
            nonNull
            description={'Returns a `Lift` by `id` (id: "panorama")'}
          >
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field
            name="Trail"
            type={Trail}
            nonNull
            description={'Returns a `Trail` by `id` (id: "old-witch")'}
          >
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field
            name="liftCount"
            type={Int}
            nonNull
            description="Returns an `Int` of `Lift` objects with optional `LiftStatus` filter"
          >
            <InputValue name="status" type={LiftStatus} />
          </Field>
          <Field
            name="trailCount"
            type={Int}
            nonNull
            description="Returns an `Int` of `Trail` objects with optional `TrailStatus` filter"
          >
            <InputValue name="status" type={TrailStatus} />
          </Field>
          <Field
            name="search"
            type={SearchResult}
            nonNull
            description="Returns a list of `SearchResult` objects based on `term` or `status`"
          >
            <Field.List nonNull />
            <InputValue name="term" type={String} />
            <InputValue name="status" type={LiftStatus} />
          </Field>
        </Query>
        <Mutation>
          <Field
            name="setLiftStatus"
            type={Lift}
            nonNull
            description="Sets a `Lift` status by sending `id` and `status`"
          >
            <InputValue name="id" type={ID} nonNull />
            <InputValue name="status" type={LiftStatus} nonNull />
          </Field>
          <Field
            name="setTrailStatus"
            type={Trail}
            nonNull
            description="Sets a `Trail` status by sending `id` and `status`"
          >
            <InputValue name="id" type={ID} nonNull />
            <InputValue name="status" type={TrailStatus} nonNull />
          </Field>
        </Mutation>
        <Subscription>
          <Field
            name="liftStatusChange"
            type={Lift}
            description="Listens for changes in lift status"
          />
          <Field
            name="trailStatusChange"
            type={Trail}
            description="Listens for changes in trail status"
          />
        </Subscription>
      </>,
    );

    expect(printSchema(schema)).toMatchSnapshot();
  });
});
