import { Output, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { createModule } from "../src/index.js";
import { findFile } from "./utils.js";

it("uses import from external library", () => {
  const requestsLib = createModule({
    name: "requests",
    descriptor: {
      ".": ["get", "post"],
      "models": ["Response", "Request"],
      "models.anothermodule": ["something"],
    },
  });

  const res = render(
    <Output externals={[requestsLib]}>
      <py.SourceFile path="test.py">
        {requestsLib["."].get}
        <hbr />
        {requestsLib["."].post}
        <hbr />
        {requestsLib["models"].Request}
        <hbr />
        {requestsLib["models"].Response}
        <hbr />
        {requestsLib["models.anothermodule"].something}
      </py.SourceFile>
    </Output>,
  );

  expect(findFile(res, "test.py").contents).toBe(d`
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
  `);
});