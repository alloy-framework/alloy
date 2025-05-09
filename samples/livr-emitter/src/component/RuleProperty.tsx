// RuleProperty.tsx
import { For } from "@alloy-js/core";
import * as jsn from "@alloy-js/json";
import {
  ListOfDifferentObjectsRule,
  ListOfObjectsRule,
  ListOfRule,
  LIVRRule,
  LIVRSchema,
  NestedObjectRule,
  OrRule,
  VariableObjectRule,
} from "../schema.js";
import { Rule } from "./Rule.jsx"; // for recursion

interface RulePropertyProps {
  rule: LIVRRule;
}

function renderSimpleRule(rule: LIVRRule) {
  // Render simple rules as string literals
  return <jsn.JsonValue jsValue={rule.rule} />;
}

function renderSimpleObjectRule(name: string, jsValue: any) {
  // Render simple object rules as { rule: value }
  return (
    <jsn.JsonObject>
      <jsn.JsonObjectProperty name={name}>
        <jsn.JsonValue jsValue={jsValue} />
      </jsn.JsonObjectProperty>
    </jsn.JsonObject>
  );
}

function renderSchema(schema: LIVRSchema) {
  return (
    <jsn.JsonObject>
      <For each={Object.entries(schema)} comma>
        {([field, fieldRules]) => (
          <jsn.JsonObjectProperty name={field}>
            <Rule rule={fieldRules} />
          </jsn.JsonObjectProperty>
        )}
      </For>
    </jsn.JsonObject>
  );
}

function renderNestedObjectRule(rule: NestedObjectRule) {
  // Render nested object rules as { nested_object: { ... } }
  return (
    <jsn.JsonObject>
      <jsn.JsonObjectProperty name="nested_object">
        {renderSchema(rule.schema)}
      </jsn.JsonObjectProperty>
    </jsn.JsonObject>
  );
}

function renderOrRule(rule: OrRule) {
  // Render OR rules as { or: [ ... ] }
  return (
    <jsn.JsonObject>
      <jsn.JsonObjectProperty name="or">
        <jsn.JsonArray>
          <For each={rule.alternatives} comma>
            {(alt) => <Rule rule={alt} />}
          </For>
        </jsn.JsonArray>
      </jsn.JsonObjectProperty>
    </jsn.JsonObject>
  );
}

function renderSelectorBasedRules(
  rule: VariableObjectRule | ListOfDifferentObjectsRule,
) {
  return (
    <jsn.JsonObject>
      <jsn.JsonObjectProperty name={rule.rule}>
        <jsn.JsonArray>
          <jsn.JsonValue jsValue={rule.selectorField} />
          <jsn.JsonObject>
            <For each={Object.entries(rule.cases)} comma>
              {([field, schema]) => (
                <jsn.JsonObjectProperty name={field}>
                  {renderSchema(schema)}
                </jsn.JsonObjectProperty>
              )}
            </For>
          </jsn.JsonObject>
        </jsn.JsonArray>
      </jsn.JsonObjectProperty>
    </jsn.JsonObject>
  );
}

function renderListOfRule(rule: ListOfRule) {
  return (
    <jsn.JsonObject>
      <jsn.JsonObjectProperty name="list_of">
        <Rule rule={rule.rules} />
      </jsn.JsonObjectProperty>
    </jsn.JsonObject>
  );
}

function renderListOfObjectsRule(rule: ListOfObjectsRule) {
  return (
    <jsn.JsonObject>
      <jsn.JsonObjectProperty name="list_of_objects">
        {renderSchema(rule.schema)}
      </jsn.JsonObjectProperty>
    </jsn.JsonObject>
  );
}

export function RuleProperty(props: RulePropertyProps) {
  const { rule } = props;

  switch (rule.rule) {
    case "required":
    case "not_empty":
    case "not_empty_list":
    case "any_object":
    case "string":
    case "integer":
    case "positive_integer":
    case "decimal":
    case "positive_decimal":
    case "email":
    case "url":
    case "iso_date":
    case "trim":
    case "to_lc":
    case "to_uc":
      return renderSimpleRule(rule);
    case "nested_object":
      return renderNestedObjectRule(rule);
    case "or":
      return renderOrRule(rule);
    case "variable_object":
      return renderSelectorBasedRules(rule);
    case "list_of":
      return renderListOfRule(rule);
    case "list_of_objects":
      return renderListOfObjectsRule(rule);
    case "list_of_different_objects":
      return renderSelectorBasedRules(rule);
    case "max_length":
    case "min_length":
    case "length_equal":
      return renderSimpleObjectRule(rule.rule, rule.length);
    case "length_between":
      return renderSimpleObjectRule(rule.rule, rule.range);
    case "max_number":
    case "min_number":
    case "eq":
      return renderSimpleObjectRule(rule.rule, rule.value);
    case "number_between":
      return renderSimpleObjectRule(rule.rule, rule.range);
    case "equal_to_field":
      return renderSimpleObjectRule(rule.rule, rule.field);
    case "one_of":
      return renderSimpleObjectRule(rule.rule, rule.values);
    case "like":
      return renderSimpleObjectRule(rule.rule, rule.pattern);
    case "remove":
    case "leave_only":
      return renderSimpleObjectRule(rule.rule, rule.characters);
    case "default":
      return renderSimpleObjectRule(rule.rule, rule.value);
    default:
      return <jsn.JsonValue jsValue={rule} />;
  }
}
