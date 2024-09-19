import { mapJoin, Output, render, writeOutput } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";

import { Client } from "./components/Client.jsx";
import { Model } from "./components/Model.jsx";
import { ApiContext, createApiContext } from "./context/api.js";
import { api } from "./schema.js";

const modelDecls = mapJoin(api.models, (model) => <Model model={model} />);

const namePolicy = ts.createTSNamePolicy();

const output = render(
  <Output namePolicy={namePolicy}>
    <ApiContext.Provider value={createApiContext(api)}>
      <ts.PackageDirectory name={`${api.name}-client`} version="1.0.0">
        <ts.SourceFile path="models.ts">
          {modelDecls}
        </ts.SourceFile>
        <ts.SourceFile path="client.ts">
          <Client />
        </ts.SourceFile>
        <ts.BarrelFile export />
      </ts.PackageDirectory>
    </ApiContext.Provider>
  </Output>,
);

writeOutput(output, "./alloy-output");
