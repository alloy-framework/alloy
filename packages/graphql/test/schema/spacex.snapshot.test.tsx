import { namekey } from "@alloy-js/core";
import {
  Argument,
  Boolean,
  Directive,
  DirectiveDefinition,
  EnumType,
  EnumValue,
  Field,
  Float,
  ID,
  InputField,
  InputObjectType,
  InputValue,
  Int,
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

// spacex schema source: https://github.com/apollographql/spacex

const contact = namekey("contact");
const link = namekey("link");
const Address = namekey("Address");
const Capsule = namekey("Capsule");
const CapsuleMission = namekey("CapsuleMission");
const CapsulesFind = namekey("CapsulesFind");
const Core = namekey("Core");
const CoresFind = namekey("CoresFind");
const Date = namekey("Date");
const Distance = namekey("Distance");
const Dragon = namekey("Dragon");
const DragonHeatShield = namekey("DragonHeatShield");
const DragonPressurizedCapsule = namekey("DragonPressurizedCapsule");
const DragonThrust = namekey("DragonThrust");
const DragonTrunk = namekey("DragonTrunk");
const DragonTrunkCargo = namekey("DragonTrunkCargo");
const Force = namekey("Force");
const HistoriesResult = namekey("HistoriesResult");
const History = namekey("History");
const HistoryFind = namekey("HistoryFind");
const Info = namekey("Info");
const InfoLinks = namekey("InfoLinks");
const Landpad = namekey("Landpad");
const Launch = namekey("Launch");
const LaunchFind = namekey("LaunchFind");
const LaunchLinks = namekey("LaunchLinks");
const LaunchRocket = namekey("LaunchRocket");
const LaunchRocketFairings = namekey("LaunchRocketFairings");
const LaunchRocketFirstStage = namekey("LaunchRocketFirstStage");
const LaunchRocketFirstStageCore = namekey("LaunchRocketFirstStageCore");
const LaunchRocketSecondStage = namekey("LaunchRocketSecondStage");
const LaunchSite = namekey("LaunchSite");
const LaunchTelemetry = namekey("LaunchTelemetry");
const LaunchesPastResult = namekey("LaunchesPastResult");
const Launchpad = namekey("Launchpad");
const Link = namekey("Link");
const Location = namekey("Location");
const Mass = namekey("Mass");
const Mission = namekey("Mission");
const MissionResult = namekey("MissionResult");
const MissionsFind = namekey("MissionsFind");
const Payload = namekey("Payload");
const PayloadOrbitParams = namekey("PayloadOrbitParams");
const PayloadsFind = namekey("PayloadsFind");
const Result = namekey("Result");
const Roadster = namekey("Roadster");
const Rocket = namekey("Rocket");
const RocketEngines = namekey("RocketEngines");
const RocketFirstStage = namekey("RocketFirstStage");
const RocketLandingLegs = namekey("RocketLandingLegs");
const RocketPayloadWeight = namekey("RocketPayloadWeight");
const RocketSecondStage = namekey("RocketSecondStage");
const RocketSecondStagePayloadCompositeFairing = namekey(
  "RocketSecondStagePayloadCompositeFairing",
);
const RocketSecondStagePayloads = namekey("RocketSecondStagePayloads");
const RocketsResult = namekey("RocketsResult");
const Ship = namekey("Ship");
const ShipLocation = namekey("ShipLocation");
const ShipMission = namekey("ShipMission");
const ShipsFind = namekey("ShipsFind");
const ShipsResult = namekey("ShipsResult");
const String_comparison_exp = namekey("String_comparison_exp");
const Volume = namekey("Volume");
const order_by = namekey("order_by");
const timestamptz = namekey("timestamptz");
const timestamptz_comparison_exp = namekey("timestamptz_comparison_exp");
const users = namekey("users");
const users_aggregate = namekey("users_aggregate");
const users_aggregate_fields = namekey("users_aggregate_fields");
const users_bool_exp = namekey("users_bool_exp");
const users_constraint = namekey("users_constraint");
const users_insert_input = namekey("users_insert_input");
const users_max_fields = namekey("users_max_fields");
const users_max_order_by = namekey("users_max_order_by");
const users_min_fields = namekey("users_min_fields");
const users_min_order_by = namekey("users_min_order_by");
const users_mutation_response = namekey("users_mutation_response");
const users_on_conflict = namekey("users_on_conflict");
const users_order_by = namekey("users_order_by");
const users_select_column = namekey("users_select_column");
const users_set_input = namekey("users_set_input");
const users_update_column = namekey("users_update_column");
const uuid = namekey("uuid");
const uuid_comparison_exp = namekey("uuid_comparison_exp");

describe("spacex schema", () => {
  it("matches snapshot", () => {
    const schema = renderSchema(
      <>
        <DirectiveDefinition name={contact} locations={["SCHEMA"]}>
          <InputValue
            name="name"
            type={String}
            nonNull
            description={"Contact title of the subgraph owner"}
          />
          <InputValue
            name="url"
            type={String}
            description={"URL where the subgraph's owner can be reached"}
          />
          <InputValue
            name="description"
            type={String}
            description={
              "Other relevant notes can be included here; supports markdown links"
            }
          />
        </DirectiveDefinition>
        <DirectiveDefinition name={link} locations={["SCHEMA"]}>
          <InputValue name="url" type={String} nonNull />
          <InputValue name="import" type={String}>
            <InputValue.List />
          </InputValue>
        </DirectiveDefinition>
        <Directive name={contact}>
          <Argument name="name" value={"Thing Server Team"} />
          <Argument
            name="url"
            value={"https://myteam.slack.com/archives/teams-chat-room-url"}
          />
          <Argument
            name="description"
            value={
              "send urgent issues to [#oncall](https://yourteam.slack.com/archives/oncall)."
            }
          />
        </Directive>
        <Directive name={link}>
          <Argument
            name="url"
            value={"https://specs.apollo.dev/federation/v2.3"}
          />
          <Argument name="import" value={["@key"]} />
        </Directive>
        <ObjectType name={Address}>
          <Field name="address" type={String} />
          <Field name="city" type={String} />
          <Field name="state" type={String} />
        </ObjectType>
        <ObjectType name={Capsule}>
          <Field
            name="dragon"
            type={Dragon}
            deprecated={
              "This is not available in the REST API after MongoDB has been deprecated"
            }
          />
          <Field name="id" type={ID} />
          <Field name="landings" type={Int} />
          <Field name="missions" type={CapsuleMission}>
            <Field.List />
          </Field>
          <Field name="original_launch" type={Date} />
          <Field name="reuse_count" type={Int} />
          <Field name="status" type={String} />
          <Field name="type" type={String} />
        </ObjectType>
        <ObjectType name={CapsuleMission}>
          <Field name="flight" type={Int} />
          <Field name="name" type={String} />
        </ObjectType>
        <InputObjectType name={CapsulesFind}>
          <InputField name="id" type={ID} />
          <InputField name="landings" type={Int} />
          <InputField name="mission" type={String} />
          <InputField name="original_launch" type={Date} />
          <InputField name="reuse_count" type={Int} />
          <InputField name="status" type={String} />
          <InputField name="type" type={String} />
        </InputObjectType>
        <ObjectType name={Core}>
          <Field name="asds_attempts" type={Int} />
          <Field name="asds_landings" type={Int} />
          <Field name="block" type={Int} />
          <Field name="id" type={ID} />
          <Field name="missions" type={CapsuleMission}>
            <Field.List />
          </Field>
          <Field name="original_launch" type={Date} />
          <Field name="reuse_count" type={Int} />
          <Field name="rtls_attempts" type={Int} />
          <Field name="rtls_landings" type={Int} />
          <Field name="status" type={String} />
          <Field name="water_landing" type={Boolean} />
        </ObjectType>
        <ObjectType name={namekey("CoreMission")}>
          <Field name="flight" type={Int} />
          <Field name="name" type={String} />
        </ObjectType>
        <InputObjectType name={CoresFind}>
          <InputField name="asds_attempts" type={Int} />
          <InputField name="asds_landings" type={Int} />
          <InputField name="block" type={Int} />
          <InputField name="id" type={String} />
          <InputField name="missions" type={String} />
          <InputField name="original_launch" type={Date} />
          <InputField name="reuse_count" type={Int} />
          <InputField name="rtls_attempts" type={Int} />
          <InputField name="rtls_landings" type={Int} />
          <InputField name="status" type={String} />
          <InputField name="water_landing" type={Boolean} />
        </InputObjectType>
        <ScalarType name={Date} />
        <ObjectType name={Distance}>
          <Field name="feet" type={Float} />
          <Field name="meters" type={Float} />
        </ObjectType>
        <ObjectType name={Dragon}>
          <Field name="active" type={Boolean} />
          <Field name="crew_capacity" type={Int} />
          <Field name="description" type={String} />
          <Field name="diameter" type={Distance} />
          <Field name="dry_mass_kg" type={Int} />
          <Field name="dry_mass_lb" type={Int} />
          <Field name="first_flight" type={String} />
          <Field name="heat_shield" type={DragonHeatShield} />
          <Field name="height_w_trunk" type={Distance} />
          <Field name="id" type={ID} />
          <Field name="launch_payload_mass" type={Mass} />
          <Field name="launch_payload_vol" type={Volume} />
          <Field name="name" type={String} />
          <Field name="orbit_duration_yr" type={Int} />
          <Field name="pressurized_capsule" type={DragonPressurizedCapsule} />
          <Field name="return_payload_mass" type={Mass} />
          <Field name="return_payload_vol" type={Volume} />
          <Field name="sidewall_angle_deg" type={Float} />
          <Field name="thrusters" type={DragonThrust}>
            <Field.List />
          </Field>
          <Field name="trunk" type={DragonTrunk} />
          <Field name="type" type={String} />
          <Field name="wikipedia" type={String} />
        </ObjectType>
        <ObjectType name={DragonHeatShield}>
          <Field name="dev_partner" type={String} />
          <Field name="material" type={String} />
          <Field name="size_meters" type={Float} />
          <Field name="temp_degrees" type={Int} />
        </ObjectType>
        <ObjectType name={DragonPressurizedCapsule}>
          <Field name="payload_volume" type={Volume} />
        </ObjectType>
        <ObjectType name={DragonThrust}>
          <Field name="amount" type={Int} />
          <Field name="fuel_1" type={String} />
          <Field name="fuel_2" type={String} />
          <Field name="pods" type={Int} />
          <Field name="thrust" type={Force} />
          <Field name="type" type={String} />
        </ObjectType>
        <ObjectType name={DragonTrunk}>
          <Field name="cargo" type={DragonTrunkCargo} />
          <Field name="trunk_volume" type={Volume} />
        </ObjectType>
        <ObjectType name={DragonTrunkCargo}>
          <Field name="solar_array" type={Int} />
          <Field name="unpressurized_cargo" type={Boolean} />
        </ObjectType>
        <ObjectType name={Force}>
          <Field name="kN" type={Float} />
          <Field name="lbf" type={Float} />
        </ObjectType>
        <ObjectType name={HistoriesResult}>
          <Field name="data" type={History}>
            <Field.List />
          </Field>
          <Field name="result" type={Result} />
        </ObjectType>
        <ObjectType name={History}>
          <Field name="details" type={String} />
          <Field name="event_date_unix" type={Date} />
          <Field name="event_date_utc" type={Date} />
          <Field name="flight" type={Launch} />
          <Field name="id" type={ID} />
          <Field name="links" type={Link} />
          <Field name="title" type={String} />
        </ObjectType>
        <InputObjectType name={HistoryFind}>
          <InputField name="end" type={Date} />
          <InputField name="flight_number" type={Int} />
          <InputField name="id" type={ID} />
          <InputField name="start" type={Date} />
        </InputObjectType>
        <ObjectType name={Info}>
          <Field name="ceo" type={String} />
          <Field name="coo" type={String} />
          <Field name="cto" type={String} />
          <Field name="cto_propulsion" type={String} />
          <Field name="employees" type={Int} />
          <Field name="founded" type={Int} />
          <Field name="founder" type={String} />
          <Field name="headquarters" type={Address} />
          <Field name="launch_sites" type={Int} />
          <Field name="links" type={InfoLinks} />
          <Field name="name" type={String} />
          <Field name="summary" type={String} />
          <Field name="test_sites" type={Int} />
          <Field name="valuation" type={Float} />
          <Field name="vehicles" type={Int} />
        </ObjectType>
        <ObjectType name={InfoLinks}>
          <Field name="elon_twitter" type={String} />
          <Field name="flickr" type={String} />
          <Field name="twitter" type={String} />
          <Field name="website" type={String} />
        </ObjectType>
        <ObjectType name={Landpad}>
          <Field name="attempted_landings" type={String} />
          <Field name="details" type={String} />
          <Field name="full_name" type={String} />
          <Field name="id" type={ID} />
          <Field name="landing_type" type={String} />
          <Field name="location" type={Location} />
          <Field name="status" type={String} />
          <Field name="successful_landings" type={String} />
          <Field name="wikipedia" type={String} />
        </ObjectType>
        <ObjectType name={Launch}>
          <Field name="details" type={String} />
          <Field name="id" type={ID} />
          <Field name="is_tentative" type={Boolean} />
          <Field name="launch_date_local" type={Date} />
          <Field name="launch_date_unix" type={Date} />
          <Field name="launch_date_utc" type={Date} />
          <Field name="launch_site" type={LaunchSite} />
          <Field name="launch_success" type={Boolean} />
          <Field name="launch_year" type={String} />
          <Field name="links" type={LaunchLinks} />
          <Field name="mission_id" type={String}>
            <Field.List />
          </Field>
          <Field name="mission_name" type={String} />
          <Field name="rocket" type={LaunchRocket} />
          <Field name="ships" type={Ship}>
            <Field.List />
          </Field>
          <Field name="static_fire_date_unix" type={Date} />
          <Field name="static_fire_date_utc" type={Date} />
          <Field name="telemetry" type={LaunchTelemetry} />
          <Field name="tentative_max_precision" type={String} />
          <Field name="upcoming" type={Boolean} />
        </ObjectType>
        <InputObjectType name={LaunchFind}>
          <InputField name="apoapsis_km" type={Float} />
          <InputField name="block" type={Int} />
          <InputField name="cap_serial" type={String} />
          <InputField name="capsule_reuse" type={String} />
          <InputField name="core_flight" type={Int} />
          <InputField name="core_reuse" type={String} />
          <InputField name="core_serial" type={String} />
          <InputField name="customer" type={String} />
          <InputField name="eccentricity" type={Float} />
          <InputField name="end" type={Date} />
          <InputField name="epoch" type={Date} />
          <InputField name="fairings_recovered" type={String} />
          <InputField name="fairings_recovery_attempt" type={String} />
          <InputField name="fairings_reuse" type={String} />
          <InputField name="fairings_reused" type={String} />
          <InputField name="fairings_ship" type={String} />
          <InputField name="gridfins" type={String} />
          <InputField name="id" type={ID} />
          <InputField name="inclination_deg" type={Float} />
          <InputField name="land_success" type={String} />
          <InputField name="landing_intent" type={String} />
          <InputField name="landing_type" type={String} />
          <InputField name="landing_vehicle" type={String} />
          <InputField name="launch_date_local" type={Date} />
          <InputField name="launch_date_utc" type={Date} />
          <InputField name="launch_success" type={String} />
          <InputField name="launch_year" type={String} />
          <InputField name="legs" type={String} />
          <InputField name="lifespan_years" type={Float} />
          <InputField name="longitude" type={Float} />
          <InputField name="manufacturer" type={String} />
          <InputField name="mean_motion" type={Float} />
          <InputField name="mission_id" type={String} />
          <InputField name="mission_name" type={String} />
          <InputField name="nationality" type={String} />
          <InputField name="norad_id" type={Int} />
          <InputField name="orbit" type={String} />
          <InputField name="payload_id" type={String} />
          <InputField name="payload_type" type={String} />
          <InputField name="periapsis_km" type={Float} />
          <InputField name="period_min" type={Float} />
          <InputField name="raan" type={Float} />
          <InputField name="reference_system" type={String} />
          <InputField name="regime" type={String} />
          <InputField name="reused" type={String} />
          <InputField name="rocket_id" type={String} />
          <InputField name="rocket_name" type={String} />
          <InputField name="rocket_type" type={String} />
          <InputField name="second_stage_block" type={String} />
          <InputField name="semi_major_axis_km" type={Float} />
          <InputField name="ship" type={String} />
          <InputField name="side_core1_reuse" type={String} />
          <InputField name="side_core2_reuse" type={String} />
          <InputField name="site_id" type={String} />
          <InputField name="site_name_long" type={String} />
          <InputField name="site_name" type={String} />
          <InputField name="start" type={Date} />
          <InputField name="tbd" type={String} />
          <InputField name="tentative_max_precision" type={String} />
          <InputField name="tentative" type={String} />
        </InputObjectType>
        <ObjectType name={LaunchLinks}>
          <Field name="article_link" type={String} />
          <Field name="flickr_images" type={String}>
            <Field.List />
          </Field>
          <Field name="mission_patch" type={String} />
          <Field name="mission_patch_small" type={String} />
          <Field name="presskit" type={String} />
          <Field name="reddit_campaign" type={String} />
          <Field name="reddit_launch" type={String} />
          <Field name="reddit_media" type={String} />
          <Field name="reddit_recovery" type={String} />
          <Field name="video_link" type={String} />
          <Field name="wikipedia" type={String} />
        </ObjectType>
        <ObjectType name={LaunchRocket}>
          <Field name="fairings" type={LaunchRocketFairings} />
          <Field name="first_stage" type={LaunchRocketFirstStage} />
          <Field name="rocket" type={Rocket} />
          <Field name="rocket_name" type={String} />
          <Field name="rocket_type" type={String} />
          <Field name="second_stage" type={LaunchRocketSecondStage} />
        </ObjectType>
        <ObjectType name={LaunchRocketFairings}>
          <Field name="recovered" type={Boolean} />
          <Field name="recovery_attempt" type={Boolean} />
          <Field name="reused" type={Boolean} />
          <Field name="ship" type={String} />
        </ObjectType>
        <ObjectType name={LaunchRocketFirstStage}>
          <Field name="cores" type={LaunchRocketFirstStageCore}>
            <Field.List />
          </Field>
        </ObjectType>
        <ObjectType name={LaunchRocketFirstStageCore}>
          <Field name="block" type={Int} />
          <Field name="core" type={Core} />
          <Field name="flight" type={Int} />
          <Field name="gridfins" type={Boolean} />
          <Field name="land_success" type={Boolean} />
          <Field name="landing_intent" type={Boolean} />
          <Field name="landing_type" type={String} />
          <Field name="landing_vehicle" type={String} />
          <Field name="legs" type={Boolean} />
          <Field name="reused" type={Boolean} />
        </ObjectType>
        <ObjectType name={LaunchRocketSecondStage}>
          <Field name="block" type={Int} />
          <Field name="payloads" type={Payload}>
            <Field.List />
          </Field>
        </ObjectType>
        <ObjectType name={LaunchSite}>
          <Field name="site_id" type={String} />
          <Field name="site_name" type={String} />
          <Field name="site_name_long" type={String} />
        </ObjectType>
        <ObjectType name={LaunchTelemetry}>
          <Field name="flight_club" type={String} />
        </ObjectType>
        <ObjectType name={LaunchesPastResult}>
          <Field name="data" type={Launch}>
            <Field.List />
          </Field>
          <Field name="result" type={Result} />
        </ObjectType>
        <ObjectType name={Launchpad}>
          <Field name="attempted_launches" type={Int} />
          <Field name="details" type={String} />
          <Field name="id" type={ID} />
          <Field name="location" type={Location} />
          <Field name="name" type={String} />
          <Field name="status" type={String} />
          <Field name="successful_launches" type={Int} />
          <Field name="vehicles_launched" type={Rocket}>
            <Field.List />
          </Field>
          <Field name="wikipedia" type={String} />
        </ObjectType>
        <ObjectType name={Link}>
          <Field name="article" type={String} />
          <Field name="reddit" type={String} />
          <Field name="wikipedia" type={String} />
        </ObjectType>
        <ObjectType name={Location}>
          <Field name="latitude" type={Float} />
          <Field name="longitude" type={Float} />
          <Field name="name" type={String} />
          <Field name="region" type={String} />
        </ObjectType>
        <ObjectType name={Mass}>
          <Field name="kg" type={Int} />
          <Field name="lb" type={Int} />
        </ObjectType>
        <ObjectType name={Mission}>
          <Field name="description" type={String} />
          <Field name="id" type={ID} />
          <Field name="manufacturers" type={String}>
            <Field.List />
          </Field>
          <Field name="name" type={String} />
          <Field name="payloads" type={Payload}>
            <Field.List />
          </Field>
          <Field name="twitter" type={String} />
          <Field name="website" type={String} />
          <Field name="wikipedia" type={String} />
        </ObjectType>
        <ObjectType name={MissionResult}>
          <Field name="data" type={Mission}>
            <Field.List />
          </Field>
          <Field name="result" type={Result} />
        </ObjectType>
        <InputObjectType name={MissionsFind}>
          <InputField name="id" type={ID} />
          <InputField name="manufacturer" type={String} />
          <InputField name="name" type={String} />
          <InputField name="payload_id" type={String} />
        </InputObjectType>
        <Mutation>
          <Field
            name="delete_users"
            type={users_mutation_response}
            description={'delete data from the table: "users"'}
          >
            <InputValue
              name="where"
              type={users_bool_exp}
              nonNull
              description={"filter the rows which have to be deleted"}
            />
          </Field>
          <Field
            name="insert_users"
            type={users_mutation_response}
            description={'insert data into the table: "users"'}
          >
            <InputValue
              name="objects"
              type={users_insert_input}
              nonNull
              description={"the rows to be inserted"}
            >
              <InputValue.List nonNull />
            </InputValue>
            <InputValue
              name="on_conflict"
              type={users_on_conflict}
              description={"on conflict condition"}
            />
          </Field>
          <Field
            name="update_users"
            type={users_mutation_response}
            description={'update data of the table: "users"'}
          >
            <InputValue
              name="_set"
              type={users_set_input}
              description={
                "sets the columns of the filtered rows to the given values"
              }
            />
            <InputValue
              name="where"
              type={users_bool_exp}
              nonNull
              description={"filter the rows which have to be updated"}
            />
          </Field>
        </Mutation>
        <ScalarType name={namekey("ObjectID")} />
        <ObjectType name={Payload}>
          <Field name="customers" type={String}>
            <Field.List />
          </Field>
          <Field name="id" type={ID} />
          <Field name="manufacturer" type={String} />
          <Field name="nationality" type={String} />
          <Field name="norad_id" type={Int}>
            <Field.List />
          </Field>
          <Field name="orbit" type={String} />
          <Field name="orbit_params" type={PayloadOrbitParams} />
          <Field name="payload_mass_kg" type={Float} />
          <Field name="payload_mass_lbs" type={Float} />
          <Field name="payload_type" type={String} />
          <Field name="reused" type={Boolean} />
        </ObjectType>
        <ObjectType name={PayloadOrbitParams}>
          <Field name="apoapsis_km" type={Float} />
          <Field name="arg_of_pericenter" type={Float} />
          <Field name="eccentricity" type={Float} />
          <Field name="epoch" type={Date} />
          <Field name="inclination_deg" type={Float} />
          <Field name="lifespan_years" type={Float} />
          <Field name="longitude" type={Float} />
          <Field name="mean_anomaly" type={Float} />
          <Field name="mean_motion" type={Float} />
          <Field name="periapsis_km" type={Float} />
          <Field name="period_min" type={Float} />
          <Field name="raan" type={Float} />
          <Field name="reference_system" type={String} />
          <Field name="regime" type={String} />
          <Field name="semi_major_axis_km" type={Float} />
        </ObjectType>
        <InputObjectType name={PayloadsFind}>
          <InputField name="apoapsis_km" type={Float} />
          <InputField name="customer" type={String} />
          <InputField name="eccentricity" type={Float} />
          <InputField name="epoch" type={Date} />
          <InputField name="inclination_deg" type={Float} />
          <InputField name="lifespan_years" type={Float} />
          <InputField name="longitude" type={Float} />
          <InputField name="manufacturer" type={String} />
          <InputField name="mean_motion" type={Float} />
          <InputField name="nationality" type={String} />
          <InputField name="norad_id" type={Int} />
          <InputField name="orbit" type={String} />
          <InputField name="payload_id" type={ID} />
          <InputField name="payload_type" type={String} />
          <InputField name="periapsis_km" type={Float} />
          <InputField name="period_min" type={Float} />
          <InputField name="raan" type={Float} />
          <InputField name="reference_system" type={String} />
          <InputField name="regime" type={String} />
          <InputField name="reused" type={Boolean} />
          <InputField name="semi_major_axis_km" type={Float} />
        </InputObjectType>
        <Query>
          <Field name="capsule" type={Capsule}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="capsules" type={Capsule}>
            <Field.List />
            <InputValue name="find" type={CapsulesFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="capsulesPast" type={Capsule}>
            <Field.List />
            <InputValue name="find" type={CapsulesFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="capsulesUpcoming" type={Capsule}>
            <Field.List />
            <InputValue name="find" type={CapsulesFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="company" type={Info} />
          <Field name="core" type={Core}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="cores" type={Core}>
            <Field.List />
            <InputValue name="find" type={CoresFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="coresPast" type={Core}>
            <Field.List />
            <InputValue name="find" type={CoresFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="coresUpcoming" type={Core}>
            <Field.List />
            <InputValue name="find" type={CoresFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="dragon" type={Dragon}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="dragons" type={Dragon}>
            <Field.List />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
          </Field>
          <Field name="histories" type={History}>
            <Field.List />
            <InputValue name="find" type={HistoryFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="historiesResult" type={HistoriesResult}>
            <InputValue name="find" type={HistoryFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="history" type={History}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="landpad" type={Landpad}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="landpads" type={Landpad}>
            <Field.List />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
          </Field>
          <Field name="launch" type={Launch}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="launchLatest" type={Launch}>
            <InputValue name="offset" type={Int} />
          </Field>
          <Field name="launchNext" type={Launch}>
            <InputValue name="offset" type={Int} />
          </Field>
          <Field name="launches" type={Launch}>
            <Field.List />
            <InputValue name="find" type={LaunchFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="launchesPast" type={Launch}>
            <Field.List />
            <InputValue name="find" type={LaunchFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="launchesPastResult" type={LaunchesPastResult}>
            <InputValue name="find" type={LaunchFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="launchesUpcoming" type={Launch}>
            <Field.List />
            <InputValue name="find" type={LaunchFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="launchpad" type={Launchpad}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="launchpads" type={Launchpad}>
            <Field.List />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
          </Field>
          <Field
            name="mission"
            type={Mission}
            deprecated={
              "Mission is not available on REST API after MongoDB deprecation"
            }
          >
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field
            name="missions"
            type={Mission}
            deprecated={
              "Mission is not available on REST API after MongoDB deprecation"
            }
          >
            <Field.List />
            <InputValue name="find" type={MissionsFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
          </Field>
          <Field
            name="missionsResult"
            type={MissionResult}
            deprecated={
              "Mission is not available on REST API after MongoDB deprecation"
            }
          >
            <InputValue name="find" type={MissionsFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
          </Field>
          <Field name="payload" type={Payload}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="payloads" type={Payload}>
            <Field.List />
            <InputValue name="find" type={PayloadsFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="roadster" type={Roadster} />
          <Field name="rocket" type={Rocket}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="rockets" type={Rocket}>
            <Field.List />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
          </Field>
          <Field name="rocketsResult" type={RocketsResult}>
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
          </Field>
          <Field name="ship" type={Ship}>
            <InputValue name="id" type={ID} nonNull />
          </Field>
          <Field name="ships" type={Ship}>
            <Field.List />
            <InputValue name="find" type={ShipsFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field name="shipsResult" type={ShipsResult}>
            <InputValue name="find" type={ShipsFind} />
            <InputValue name="limit" type={Int} />
            <InputValue name="offset" type={Int} />
            <InputValue name="order" type={String} />
            <InputValue name="sort" type={String} />
          </Field>
          <Field
            name="users"
            type={users}
            nonNull
            description={'fetch data from the table: "users"'}
          >
            <Field.List nonNull />
            <InputValue
              name="distinct_on"
              type={users_select_column}
              nonNull
              description={"distinct select on columns"}
            >
              <InputValue.List />
            </InputValue>
            <InputValue
              name="limit"
              type={Int}
              description={"limit the nuber of rows returned"}
            />
            <InputValue
              name="offset"
              type={Int}
              description={"skip the first n rows. Use only with order_by"}
            />
            <InputValue
              name="order_by"
              type={users_order_by}
              nonNull
              description={"sort the rows by one or more columns"}
            >
              <InputValue.List />
            </InputValue>
            <InputValue
              name="where"
              type={users_bool_exp}
              description={"filter the rows returned"}
            />
          </Field>
          <Field
            name="users_aggregate"
            type={users_aggregate}
            nonNull
            description={'fetch aggregated fields from the table: "users"'}
          >
            <InputValue
              name="distinct_on"
              type={users_select_column}
              nonNull
              description={"distinct select on columns"}
            >
              <InputValue.List />
            </InputValue>
            <InputValue
              name="limit"
              type={Int}
              description={"limit the nuber of rows returned"}
            />
            <InputValue
              name="offset"
              type={Int}
              description={"skip the first n rows. Use only with order_by"}
            />
            <InputValue
              name="order_by"
              type={users_order_by}
              nonNull
              description={"sort the rows by one or more columns"}
            >
              <InputValue.List />
            </InputValue>
            <InputValue
              name="where"
              type={users_bool_exp}
              description={"filter the rows returned"}
            />
          </Field>
          <Field
            name="users_by_pk"
            type={users}
            description={
              'fetch data from the table: "users" using primary key columns'
            }
          >
            <InputValue name="id" type={uuid} nonNull />
          </Field>
        </Query>
        <ObjectType name={Result}>
          <Field name="totalCount" type={Int} />
        </ObjectType>
        <ObjectType name={Roadster}>
          <Field name="apoapsis_au" type={Float} />
          <Field name="details" type={String} />
          <Field name="earth_distance_km" type={Float} />
          <Field name="earth_distance_mi" type={Float} />
          <Field name="eccentricity" type={Float} />
          <Field name="epoch_jd" type={Float} />
          <Field name="inclination" type={Float} />
          <Field name="launch_date_unix" type={Date} />
          <Field name="launch_date_utc" type={Date} />
          <Field name="launch_mass_kg" type={Int} />
          <Field name="launch_mass_lbs" type={Int} />
          <Field name="longitude" type={Float} />
          <Field name="mars_distance_km" type={Float} />
          <Field name="mars_distance_mi" type={Float} />
          <Field name="name" type={String} />
          <Field name="norad_id" type={Int} />
          <Field name="orbit_type" type={Float} />
          <Field name="periapsis_arg" type={Float} />
          <Field name="periapsis_au" type={Float} />
          <Field name="period_days" type={Float} />
          <Field name="semi_major_axis_au" type={Float} />
          <Field name="speed_kph" type={Float} />
          <Field name="speed_mph" type={Float} />
          <Field name="wikipedia" type={String} />
        </ObjectType>
        <ObjectType name={Rocket}>
          <Field name="active" type={Boolean} />
          <Field name="boosters" type={Int} />
          <Field name="company" type={String} />
          <Field name="cost_per_launch" type={Int} />
          <Field name="country" type={String} />
          <Field name="description" type={String} />
          <Field name="diameter" type={Distance} />
          <Field name="engines" type={RocketEngines} />
          <Field name="first_flight" type={Date} />
          <Field name="first_stage" type={RocketFirstStage} />
          <Field name="height" type={Distance} />
          <Field name="id" type={ID} />
          <Field name="landing_legs" type={RocketLandingLegs} />
          <Field name="mass" type={Mass} />
          <Field name="name" type={String} />
          <Field name="payload_weights" type={RocketPayloadWeight}>
            <Field.List />
          </Field>
          <Field name="second_stage" type={RocketSecondStage} />
          <Field name="stages" type={Int} />
          <Field name="success_rate_pct" type={Int} />
          <Field name="type" type={String} />
          <Field name="wikipedia" type={String} />
        </ObjectType>
        <ObjectType name={RocketEngines}>
          <Field name="engine_loss_max" type={String} />
          <Field name="layout" type={String} />
          <Field name="number" type={Int} />
          <Field name="propellant_1" type={String} />
          <Field name="propellant_2" type={String} />
          <Field name="thrust_sea_level" type={Force} />
          <Field name="thrust_to_weight" type={Float} />
          <Field name="thrust_vacuum" type={Force} />
          <Field name="type" type={String} />
          <Field name="version" type={String} />
        </ObjectType>
        <ObjectType name={RocketFirstStage}>
          <Field name="burn_time_sec" type={Int} />
          <Field name="engines" type={Int} />
          <Field name="fuel_amount_tons" type={Float} />
          <Field name="reusable" type={Boolean} />
          <Field name="thrust_sea_level" type={Force} />
          <Field name="thrust_vacuum" type={Force} />
        </ObjectType>
        <ObjectType name={RocketLandingLegs}>
          <Field name="material" type={String} />
          <Field name="number" type={Int} />
        </ObjectType>
        <ObjectType name={RocketPayloadWeight}>
          <Field name="id" type={String} />
          <Field name="kg" type={Int} />
          <Field name="lb" type={Int} />
          <Field name="name" type={String} />
        </ObjectType>
        <ObjectType name={RocketSecondStage}>
          <Field name="burn_time_sec" type={Int} />
          <Field name="engines" type={Int} />
          <Field name="fuel_amount_tons" type={Float} />
          <Field name="payloads" type={RocketSecondStagePayloads} />
          <Field name="thrust" type={Force} />
        </ObjectType>
        <ObjectType name={RocketSecondStagePayloadCompositeFairing}>
          <Field name="diameter" type={Distance} />
          <Field name="height" type={Distance} />
        </ObjectType>
        <ObjectType name={RocketSecondStagePayloads}>
          <Field
            name="composite_fairing"
            type={RocketSecondStagePayloadCompositeFairing}
          />
          <Field name="option_1" type={String} />
        </ObjectType>
        <ObjectType name={RocketsResult}>
          <Field name="data" type={Rocket}>
            <Field.List />
          </Field>
          <Field name="result" type={Result} />
        </ObjectType>
        <ObjectType name={Ship}>
          <Field name="abs" type={Int} />
          <Field name="active" type={Boolean} />
          <Field name="attempted_landings" type={Int} />
          <Field name="class" type={Int} />
          <Field name="course_deg" type={Int} />
          <Field name="home_port" type={String} />
          <Field name="id" type={ID} />
          <Field name="image" type={String} />
          <Field name="imo" type={Int} />
          <Field name="missions" type={ShipMission}>
            <Field.List />
          </Field>
          <Field name="mmsi" type={Int} />
          <Field name="model" type={String} />
          <Field name="name" type={String} />
          <Field name="position" type={ShipLocation} />
          <Field name="roles" type={String}>
            <Field.List />
          </Field>
          <Field name="speed_kn" type={Float} />
          <Field name="status" type={String} />
          <Field name="successful_landings" type={Int} />
          <Field name="type" type={String} />
          <Field name="url" type={String} />
          <Field name="weight_kg" type={Int} />
          <Field name="weight_lbs" type={Int} />
          <Field name="year_built" type={Int} />
        </ObjectType>
        <ObjectType name={ShipLocation}>
          <Field name="latitude" type={Float} />
          <Field name="longitude" type={Float} />
        </ObjectType>
        <ObjectType name={ShipMission}>
          <Field name="flight" type={String} />
          <Field name="name" type={String} />
        </ObjectType>
        <InputObjectType name={ShipsFind}>
          <InputField name="id" type={ID} />
          <InputField name="name" type={String} />
          <InputField name="model" type={String} />
          <InputField name="type" type={String} />
          <InputField name="role" type={String} />
          <InputField name="active" type={Boolean} />
          <InputField name="imo" type={Int} />
          <InputField name="mmsi" type={Int} />
          <InputField name="abs" type={Int} />
          <InputField name="class" type={Int} />
          <InputField name="weight_lbs" type={Int} />
          <InputField name="weight_kg" type={Int} />
          <InputField name="year_built" type={Int} />
          <InputField name="home_port" type={String} />
          <InputField name="status" type={String} />
          <InputField name="speed_kn" type={Int} />
          <InputField name="course_deg" type={Int} />
          <InputField name="latitude" type={Float} />
          <InputField name="longitude" type={Float} />
          <InputField name="successful_landings" type={Int} />
          <InputField name="attempted_landings" type={Int} />
          <InputField name="mission" type={String} />
        </InputObjectType>
        <ObjectType name={ShipsResult}>
          <Field name="data" type={Ship}>
            <Field.List />
          </Field>
          <Field name="result" type={Result} />
        </ObjectType>
        <InputObjectType
          name={String_comparison_exp}
          description={
            "expression to compare columns of type String. All fields are combined with logical 'AND'."
          }
        >
          <InputField name="_eq" type={String} />
          <InputField name="_gt" type={String} />
          <InputField name="_gte" type={String} />
          <InputField name="_ilike" type={String} />
          <InputField name="_in" type={String} nonNull>
            <InputField.List />
          </InputField>
          <InputField name="_is_null" type={Boolean} />
          <InputField name="_like" type={String} />
          <InputField name="_lt" type={String} />
          <InputField name="_lte" type={String} />
          <InputField name="_neq" type={String} />
          <InputField name="_nilike" type={String} />
          <InputField name="_nin" type={String} nonNull>
            <InputField.List />
          </InputField>
          <InputField name="_nlike" type={String} />
          <InputField name="_nsimilar" type={String} />
          <InputField name="_similar" type={String} />
        </InputObjectType>
        <Subscription>
          <Field
            name="users"
            type={users}
            nonNull
            description={'fetch data from the table: "users"'}
          >
            <Field.List nonNull />
            <InputValue
              name="distinct_on"
              type={users_select_column}
              nonNull
              description={"distinct select on columns"}
            >
              <InputValue.List />
            </InputValue>
            <InputValue
              name="limit"
              type={Int}
              description={"limit the nuber of rows returned"}
            />
            <InputValue
              name="offset"
              type={Int}
              description={"skip the first n rows. Use only with order_by"}
            />
            <InputValue
              name="order_by"
              type={users_order_by}
              nonNull
              description={"sort the rows by one or more columns"}
            >
              <InputValue.List />
            </InputValue>
            <InputValue
              name="where"
              type={users_bool_exp}
              description={"filter the rows returned"}
            />
          </Field>
          <Field
            name="users_aggregate"
            type={users_aggregate}
            nonNull
            description={'fetch aggregated fields from the table: "users"'}
          >
            <InputValue
              name="distinct_on"
              type={users_select_column}
              nonNull
              description={"distinct select on columns"}
            >
              <InputValue.List />
            </InputValue>
            <InputValue
              name="limit"
              type={Int}
              description={"limit the nuber of rows returned"}
            />
            <InputValue
              name="offset"
              type={Int}
              description={"skip the first n rows. Use only with order_by"}
            />
            <InputValue
              name="order_by"
              type={users_order_by}
              nonNull
              description={"sort the rows by one or more columns"}
            >
              <InputValue.List />
            </InputValue>
            <InputValue
              name="where"
              type={users_bool_exp}
              description={"filter the rows returned"}
            />
          </Field>
          <Field
            name="users_by_pk"
            type={users}
            description={
              'fetch data from the table: "users" using primary key columns'
            }
          >
            <InputValue name="id" type={uuid} nonNull />
          </Field>
        </Subscription>
        <ObjectType name={Volume}>
          <Field name="cubic_feet" type={Int} />
          <Field name="cubic_meters" type={Int} />
        </ObjectType>
        <EnumType
          name={namekey("conflict_action")}
          description={"conflict action"}
        >
          <EnumValue
            name="ignore"
            description={"ignore the insert on this row"}
          />
          <EnumValue
            name="update"
            description={"update the row with the given values"}
          />
        </EnumType>
        <EnumType name={order_by} description={"column ordering options"}>
          <EnumValue
            name="asc"
            description={"in the ascending order, nulls last"}
          />
          <EnumValue
            name="asc_nulls_first"
            description={"in the ascending order, nulls first"}
          />
          <EnumValue
            name="asc_nulls_last"
            description={"in the ascending order, nulls last"}
          />
          <EnumValue
            name="desc"
            description={"in the descending order, nulls first"}
          />
          <EnumValue
            name="desc_nulls_first"
            description={"in the descending order, nulls first"}
          />
          <EnumValue
            name="desc_nulls_last"
            description={"in the descending order, nulls last"}
          />
        </EnumType>
        <ScalarType name={timestamptz} />
        <InputObjectType
          name={timestamptz_comparison_exp}
          description={
            "expression to compare columns of type timestamptz. All fields are combined with logical 'AND'."
          }
        >
          <InputField name="_eq" type={timestamptz} />
          <InputField name="_gt" type={timestamptz} />
          <InputField name="_gte" type={timestamptz} />
          <InputField name="_in" type={timestamptz} nonNull>
            <InputField.List />
          </InputField>
          <InputField name="_is_null" type={Boolean} />
          <InputField name="_lt" type={timestamptz} />
          <InputField name="_lte" type={timestamptz} />
          <InputField name="_neq" type={timestamptz} />
          <InputField name="_nin" type={timestamptz} nonNull>
            <InputField.List />
          </InputField>
        </InputObjectType>
        <ObjectType
          name={users}
          description={'columns and relationships of "users"'}
        >
          <Field name="id" type={uuid} nonNull />
          <Field name="name" type={String} />
          <Field name="rocket" type={String} />
          <Field name="timestamp" type={timestamptz} nonNull />
          <Field name="twitter" type={String} />
        </ObjectType>
        <ObjectType
          name={users_aggregate}
          description={'aggregated selection of "users"'}
        >
          <Field name="aggregate" type={users_aggregate_fields} />
          <Field name="nodes" type={users} nonNull>
            <Field.List nonNull />
          </Field>
        </ObjectType>
        <ObjectType
          name={users_aggregate_fields}
          description={'aggregate fields of "users"'}
        >
          <Field name="count" type={Int}>
            <InputValue name="columns" type={users_select_column} nonNull>
              <InputValue.List />
            </InputValue>
            <InputValue name="distinct" type={Boolean} />
          </Field>
          <Field name="max" type={users_max_fields} />
          <Field name="min" type={users_min_fields} />
        </ObjectType>
        <InputObjectType
          name={namekey("users_aggregate_order_by")}
          description={'order by aggregate values of table "users"'}
        >
          <InputField name="count" type={order_by} />
          <InputField name="max" type={users_max_order_by} />
          <InputField name="min" type={users_min_order_by} />
        </InputObjectType>
        <InputObjectType
          name={namekey("users_arr_rel_insert_input")}
          description={
            'input type for inserting array relation for remote table "users"'
          }
        >
          <InputField name="data" type={users_insert_input} nonNull>
            <InputField.List nonNull />
          </InputField>
          <InputField name="on_conflict" type={users_on_conflict} />
        </InputObjectType>
        <InputObjectType
          name={users_bool_exp}
          description={
            "Boolean expression to filter rows from the table \"users\". All fields are combined with a logical 'AND'."
          }
        >
          <InputField name="_and" type={users_bool_exp}>
            <InputField.List />
          </InputField>
          <InputField name="_not" type={users_bool_exp} />
          <InputField name="_or" type={users_bool_exp}>
            <InputField.List />
          </InputField>
          <InputField name="id" type={uuid_comparison_exp} />
          <InputField name="name" type={String_comparison_exp} />
          <InputField name="rocket" type={String_comparison_exp} />
          <InputField name="timestamp" type={timestamptz_comparison_exp} />
          <InputField name="twitter" type={String_comparison_exp} />
        </InputObjectType>
        <EnumType
          name={users_constraint}
          description={'unique or primary key constraints on table "users"'}
        >
          <EnumValue name="unique" />
          <EnumValue name="or" />
          <EnumValue name="primary" />
          <EnumValue name="key" />
          <EnumValue name="constraint" />
          <EnumValue name="users_pkey" />
        </EnumType>
        <InputObjectType
          name={users_insert_input}
          description={'input type for inserting data into table "users"'}
        >
          <InputField name="id" type={uuid} />
          <InputField name="name" type={String} />
          <InputField name="rocket" type={String} />
          <InputField name="timestamp" type={timestamptz} />
          <InputField name="twitter" type={String} />
        </InputObjectType>
        <ObjectType
          name={users_max_fields}
          description={"aggregate max on columns"}
        >
          <Field name="name" type={String} />
          <Field name="rocket" type={String} />
          <Field name="timestamp" type={timestamptz} />
          <Field name="twitter" type={String} />
        </ObjectType>
        <InputObjectType
          name={users_max_order_by}
          description={'order by max() on columns of table "users"'}
        >
          <InputField name="name" type={order_by} />
          <InputField name="rocket" type={order_by} />
          <InputField name="timestamp" type={order_by} />
          <InputField name="twitter" type={order_by} />
        </InputObjectType>
        <ObjectType
          name={users_min_fields}
          description={"aggregate min on columns"}
        >
          <Field name="name" type={String} />
          <Field name="rocket" type={String} />
          <Field name="timestamp" type={timestamptz} />
          <Field name="twitter" type={String} />
        </ObjectType>
        <InputObjectType
          name={users_min_order_by}
          description={'order by min() on columns of table "users"'}
        >
          <InputField name="name" type={order_by} />
          <InputField name="rocket" type={order_by} />
          <InputField name="timestamp" type={order_by} />
          <InputField name="twitter" type={order_by} />
        </InputObjectType>
        <ObjectType
          name={users_mutation_response}
          description={'response of any mutation on the table "users"'}
        >
          <Field
            name="affected_rows"
            type={Int}
            nonNull
            description={"number of affected rows by the mutation"}
          />
          <Field
            name="returning"
            type={users}
            nonNull
            description={"data of the affected rows by the mutation"}
          >
            <Field.List nonNull />
          </Field>
        </ObjectType>
        <InputObjectType
          name={namekey("users_obj_rel_insert_input")}
          description={
            'input type for inserting object relation for remote table "users"'
          }
        >
          <InputField name="data" type={users_insert_input} nonNull />
          <InputField name="on_conflict" type={users_on_conflict} />
        </InputObjectType>
        <InputObjectType
          name={users_on_conflict}
          description={'on conflict condition type for table "users"'}
        >
          <InputField name="constraint" type={users_constraint} nonNull />
          <InputField name="update_columns" type={users_update_column} nonNull>
            <InputField.List nonNull />
          </InputField>
        </InputObjectType>
        <InputObjectType
          name={users_order_by}
          description={'ordering options when selecting data from "users"'}
        >
          <InputField name="id" type={order_by} />
          <InputField name="name" type={order_by} />
          <InputField name="rocket" type={order_by} />
          <InputField name="timestamp" type={order_by} />
          <InputField name="twitter" type={order_by} />
        </InputObjectType>
        <EnumType
          name={users_select_column}
          description={'select columns of table "users"'}
        >
          <EnumValue name="column" />
          <EnumValue name="name" />
          <EnumValue name="id" />
          <EnumValue name="rocket" />
          <EnumValue name="timestamp" />
          <EnumValue name="twitter" />
        </EnumType>
        <InputObjectType
          name={users_set_input}
          description={'input type for updating data in table "users"'}
        >
          <InputField name="id" type={uuid} />
          <InputField name="name" type={String} />
          <InputField name="rocket" type={String} />
          <InputField name="timestamp" type={timestamptz} />
          <InputField name="twitter" type={String} />
        </InputObjectType>
        <EnumType
          name={users_update_column}
          description={'update columns of table "users"'}
        >
          <EnumValue name="column" />
          <EnumValue name="name" />
          <EnumValue name="id" />
          <EnumValue name="rocket" />
          <EnumValue name="timestamp" />
          <EnumValue name="twitter" />
        </EnumType>
        <ScalarType name={uuid} />
        <InputObjectType
          name={uuid_comparison_exp}
          description={
            "expression to compare columns of type uuid. All fields are combined with logical 'AND'."
          }
        >
          <InputField name="_eq" type={uuid} />
          <InputField name="_gt" type={uuid} />
          <InputField name="_gte" type={uuid} />
          <InputField name="_in" type={uuid} nonNull>
            <InputField.List />
          </InputField>
          <InputField name="_is_null" type={Boolean} />
          <InputField name="_lt" type={uuid} />
          <InputField name="_lte" type={uuid} />
          <InputField name="_neq" type={uuid} />
          <InputField name="_nin" type={uuid} nonNull>
            <InputField.List />
          </InputField>
        </InputObjectType>
      </>,
      { namePolicy: null },
    );

    expect(printSchema(schema)).toMatchSnapshot();
  });
});
