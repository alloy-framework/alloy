import {
  Children,
  For,
  Output,
  Prose,
  render,
  writeOutput,
} from "@alloy-js/core";
import * as py from "@alloy-js/python";
import { Client } from "./components/Client.jsx";
import { Model } from "./components/Model.jsx";
import { Usage } from "./components/Usage.jsx";
import { ApiContext, createApiContext } from "./context/api.js";
import { api, RestApiModel } from "./schema.js";

const modelsDoc = (
  <py.ModuleDoc
    description={[
      <Prose>
        Data models for the Petstore API. This module contains dataclass
        definitions for all entities used in the API.
      </Prose>,
    ]}
  />
);

const clientDoc = (
  <py.ModuleDoc
    description={[
      <Prose>
        HTTP client for the Petstore API. This module provides the
        PetstoreClient class for interacting with the pet store service.
      </Prose>,
    ]}
  />
);

const usageDoc = (
  <py.ModuleDoc
    description={[<Prose>Example usage of the Petstore API client.</Prose>]}
  />
);

let apiContext = createApiContext(api);
type ModelItem = [RestApiModel, Children[]];

function getTopologicallySortedModels(
  restApiModels: RestApiModel[],
  apiContext: ReturnType<typeof createApiContext>,
): Set<ModelItem> {
  let modelsWithDependency = new Set<ModelItem>();

  for (const model of restApiModels) {
    let modelProperties: Children[] = [];
    const properties = model.properties;
    for (const property of properties) {
      const apiType = property.type;
      let memberType: Children;
      if (typeof apiType === "object") {
        if ("ref" in apiType) {
          const refModel = apiContext.resolveReference(apiType);
          memberType = refModel?.name;
        } else {
          memberType = apiType.name;
        }
      }
      if (memberType !== undefined) {
        modelProperties.push(memberType);
      }
    }
    modelsWithDependency.add([model, modelProperties]);
  }

  function topologicalSortModels(modelsSet: Set<ModelItem>): ModelItem[] {
    const modelsArr = Array.from(modelsSet);
    const modelNameToItem = new Map<string, ModelItem>();
    for (const [model] of modelsArr) {
      modelNameToItem.set(
        model.name,
        modelsArr.find(([m]) => m.name === model.name)!,
      );
    }

    const visited = new Set<string>();
    const sorted: ModelItem[] = [];

    function visit(modelItem: ModelItem) {
      const [model, dependencies] = modelItem;
      if (visited.has(model.name)) return;
      visited.add(model.name);
      for (const dep of dependencies) {
        if (typeof dep === "string" && modelNameToItem.has(dep)) {
          visit(modelNameToItem.get(dep)!);
        }
      }
      sorted.push(modelItem);
    }

    for (const modelItem of modelsArr) {
      visit(modelItem);
    }

    return sorted;
  }

  return new Set(topologicalSortModels(modelsWithDependency));
}

let models = getTopologicallySortedModels(api.models, apiContext);
const output = render(
  <Output externals={[py.requestsModule]}>
    <ApiContext.Provider value={apiContext}>
      <py.SourceFile
        path="models.py"
        doc={modelsDoc}
        header={<py.FutureStatement feature="annotations" />}
      >
        <For each={Array.from(models)} doubleHardline>
          {(item) => <Model model={item[0]} />}
        </For>
      </py.SourceFile>
      <py.SourceFile path="client.py" doc={clientDoc}>
        <Client />
      </py.SourceFile>
      <py.SourceFile path="usage.py" doc={usageDoc}>
        <Usage />
      </py.SourceFile>
    </ApiContext.Provider>
  </Output>,
  { tabWidth: 4 },
);

writeOutput(output, "./alloy-output");
