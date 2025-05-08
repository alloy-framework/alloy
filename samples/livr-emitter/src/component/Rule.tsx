// src/component/Rule.tsx
import { For } from "@alloy-js/core";
import * as jsn from "@alloy-js/json";
import { LIVRFieldRules } from "../schema.js";
import { RuleProperty } from "./RuleProperty.jsx";

interface RuleProps {
  rule: LIVRFieldRules;
}

export function Rule(props: RuleProps) {
  const { rule } = props;

  if (Array.isArray(rule)) {
    // Array of rules: output as array of processed rules, with commas
    return (
      <jsn.JsonArray>
        <For each={rule} comma>
          {(r) => <RuleProperty rule={r} />}
        </For>
      </jsn.JsonArray>
    );
  }
  if (typeof rule === "object" && rule !== null && "rule" in rule) {
    return <RuleProperty rule={rule} />;
  }
  // Fallback: output as JSON
  return <jsn.JsonValue jsValue={rule} />;
}
