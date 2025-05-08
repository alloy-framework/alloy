import { For, Output, render, writeOutput } from "@alloy-js/core";
import * as jsn from "@alloy-js/json";
import { Rule } from "./component/Rule.js";
import { LIVRContext, createLIVRContext } from "./context/livr.js";
import { livrApi } from "./schema.js";

// Main function to emit LIVR schema as JSON
const output = render(
  <Output>
    <LIVRContext.Provider value={createLIVRContext(livrApi)}>
      <jsn.SourceFile path="rules.json">
        <jsn.JsonObject>
          <For each={Object.entries(livrApi)} comma>
            {([fieldName, rules]) => (
              <jsn.JsonObjectProperty name={fieldName}>
                <Rule rule={rules} />
              </jsn.JsonObjectProperty>
            )}
          </For>
        </jsn.JsonObject>
      </jsn.SourceFile>
    </LIVRContext.Provider>
  </Output>,
);

// Write the output to disk
writeOutput(output, "./alloy-output");
