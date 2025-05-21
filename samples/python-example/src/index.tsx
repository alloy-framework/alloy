import { For, Output, render, writeOutput } from "@alloy-js/core";
import { ApiContext, createApiContext } from "./context/api.js";
import * as py from "@alloy-js/python";
import { api } from "./schema.js";
import { Model } from "./components/Model.jsx";

const output = render(
  <Output>
    <ApiContext.Provider value={createApiContext(api)}>
      <py.SourceFile path="models.py">
        <For each={api.models}>{(model) => <Model model={model} />}</For>
      </py.SourceFile>
      <py.SourceFile path="client.py">
      </py.SourceFile>
      <py.BarrelFile path="index.py" />
    </ApiContext.Provider>
  </Output>,
);

writeOutput(output, "./alloy-output");