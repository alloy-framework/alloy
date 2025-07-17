import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { createModule } from "../src/index.js";
import { toSourceText } from "./utils.js";

it("uses import from external library", () => {
  const requestsLib = createModule({
    name: "requests",
    descriptor: {
      ".": ["get", "post"],
      models: ["Response", "Request"],
      "models.anothermodule": ["something"],
    },
  });
  const result = toSourceText([
    <py.StatementList>
      {requestsLib["."].get}
      {requestsLib["."].post}
      {requestsLib["models"].Request}
      {requestsLib["models"].Response}
      {requestsLib["models.anothermodule"].something}
    </py.StatementList>],
    { externals: [requestsLib] },
  );
  const expected = d`
    from requests import get
    from requests import post
    from requests.models import Request
    from requests.models import Response
    from requests.models.anothermodule import something

    get
    post
    Request
    Response
    something
  `;
  expect(result).toRenderTo(expected);
});
