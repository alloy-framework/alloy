import { For, Output, render, writeOutput } from "@alloy-js/core";
import { ApiContext, createApiContext } from "./context/api.js";
import * as py from "@alloy-js/python";
import { api } from "./schema.js";
import { Client } from "./components/Client.jsx";
import { Model } from "./components/Model.jsx";

const output = render(
  <Output>
    <ApiContext.Provider value={createApiContext(api)}>
      <py.SourceFile path="models.py">
        <For each={api.models} doubleHardline>{(model) => <Model model={model} />}</For>
      </py.SourceFile>
      <py.SourceFile path="client.py">
        import requests
        <br />
        <br />
        <Client />
      </py.SourceFile>
    </ApiContext.Provider>
  </Output>,
);

writeOutput(output, "./alloy-output");