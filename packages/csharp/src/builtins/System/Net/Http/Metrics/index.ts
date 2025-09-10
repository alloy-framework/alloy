import System from "../../../index.js";
import Http from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type MetricsLibrary = LibrarySymbolReference & {
  HttpMetricsEnrichmentContext: LibrarySymbolReference & {
    AddCallback: LibrarySymbolReference;
    AddCustomTag: LibrarySymbolReference;
    Exception: LibrarySymbolReference;
    Request: LibrarySymbolReference;
    Response: LibrarySymbolReference
  }
};
const Metrics: MetricsLibrary = createLibrary("System.Net.Http.Metrics", {
  HttpMetricsEnrichmentContext: {
    kind: "class",
    members: {
      AddCallback: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AddCustomTag: {
        kind: "method",
        methodKind: "ordinary",
      },
      Exception: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
      },
      Request: {
        kind: "property",
        type: () => {
          return Http.HttpRequestMessage;
        },
      },
      Response: {
        kind: "property",
        type: () => {
          return Http.HttpResponseMessage;
        },
      },
    },
    isSealed: true,
  },
});
export default Metrics
