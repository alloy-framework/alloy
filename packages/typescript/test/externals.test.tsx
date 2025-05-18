import { Output, refkey, render, useBinder } from "@alloy-js/core";
import { it } from "vitest";
import { fs } from "../src/builtins/node.js";
import {
  ClassDeclaration,
  ClassMethod,
  createPackage,
  FunctionDeclaration,
  PackageDirectory,
  SourceFile,
} from "../src/index.js";
import { assertFileContents } from "./utils.js";

it("can import builtins", () => {
  const testLib = createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": {
        default: "defaultExport",
        named: ["foo", "bar"],
      },
      "./subpath": {
        named: ["nice", "cool"],
      },
    },
  });

  const res = render(
    <Output externals={[testLib, fs]}>
      <PackageDirectory path="." name="test" version="1.0.0">
        <SourceFile path="index.ts">
          {testLib["./subpath"].nice};<hbr />
          await {fs["./promises"].readFile}();
        </SourceFile>
      </PackageDirectory>
    </Output>,
  );

  assertFileContents(res, {
    "package.json": `
      {
        "name": "test",
        "version": "1.0.0",
        "type": "module",
        "dependencies": {
          "testLib": "1.0.0"
        },
        "devDependencies": {
          "typescript": "^5.5.2"
        }
      }
    `,
    "index.ts": `
      import { readFile } from "node:fs/promises";
      import { nice } from "testLib/subpath";

      nice;
      await readFile();
    `,
  });
});

it("can import builtins without a package", () => {
  const testLib = createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": {
        default: "defaultExport",
        named: ["foo", "bar"],
      },
      "./subpath": {
        named: ["nice", "cool"],
      },
    },
  });

  const res = render(
    <Output externals={[testLib, fs]}>
      <SourceFile path="index.ts">
        {testLib["./subpath"].nice};<hbr />
        await {fs["./promises"].readFile}();
      </SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "index.ts": `
      import { readFile } from "node:fs/promises";
      import { nice } from "testLib/subpath";

      nice;
      await readFile();
    `,
  });
});

it("can import builtins without a package", () => {
  const testLib = createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": {
        default: "defaultExport",
        named: ["foo", "bar"],
      },
      "./subpath": {
        named: ["nice", "cool"],
      },
    },
  });

  const res = render(
    <Output externals={[testLib, fs]}>
      <SourceFile path="index.ts">
        <FunctionDeclaration name="foo">
          <FunctionDeclaration name="bar">
            {testLib["./subpath"].nice};<hbr />
            await {fs["./promises"].readFile}();
          </FunctionDeclaration>
        </FunctionDeclaration>
      </SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "index.ts": `
      import { readFile } from "node:fs/promises";
      import { nice } from "testLib/subpath";

      function foo() {
        function bar() {
          nice;
          await readFile();
        }
      }
    `,
  });
});

it("can import static members", () => {
  const mcpSdk = createPackage({
    name: "@modelcontextprotocol/sdk",
    version: "^3.23.0",
    descriptor: {
      "./server/index.js": {
        named: [
          {
            name: "server",
            staticMembers: [
              "setRequestHandler",
              { name: "nested", staticMembers: ["nestedHandler"] },
            ],
          },
          { name: "noMembers" },
          "simpleName",
        ],
      },
    },
  });

  const res = render(
    <Output externals={[mcpSdk, fs]}>
      <SourceFile path="index.ts">
        <FunctionDeclaration name="foo">
          {mcpSdk["./server/index.js"].server}();
          <hbr />
          {mcpSdk["./server/index.js"].server.setRequestHandler}();
          <hbr />
          {mcpSdk["./server/index.js"].server.nested.nestedHandler}();
          <hbr />
          {mcpSdk["./server/index.js"].noMembers}();
          <hbr />
          {mcpSdk["./server/index.js"].simpleName}();
        </FunctionDeclaration>
      </SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "index.ts": `
      import { noMembers, server, simpleName } from "@modelcontextprotocol/sdk/server/index.js";

      function foo() {
        server();
        server.setRequestHandler();
        server.nested.nestedHandler();
        noMembers();
        simpleName();
      }
    `,
  });
});

it.only("can import instance members", () => {
  const mcpSdk = createPackage({
    name: "@modelcontextprotocol/sdk",
    version: "^3.23.0",
    descriptor: {
      "./server/index.js": {
        named: [
          {
            name: "Server",
            instanceMembers: ["instanceHandler"],
            staticMembers: ["create"],
          },
        ],
      },
    },
  });

  const res = render(
    <Output externals={[mcpSdk]}>
      <SourceFile path="index.ts">
        <ClassDeclaration
          name="MyServer"
          refkey={refkey("MyServer")}
          extends={mcpSdk["./server/index.js"].Server}
        >
          <ClassMethod name="handleRequest">
            Static: {mcpSdk["./server/index.js"].Server.create}();
            <hbr />
            Instance:{" "}
            {refkey([
              mcpSdk["./server/index.js"].Server.instanceHandler,
              "MyServer",
            ])}
            ();
          </ClassMethod>
        </ClassDeclaration>
      </SourceFile>
    </Output>,
  );

  console.log(res.contents[0].contents);
  assertFileContents(res, {
    "index.ts": `
      import { Server } from "@modelcontextprotocol/sdk/server/index.js";

      class MyServer extends Server {
        handleRequest() {
          Static: Server.create();
          Instance: this.instanceHandler();
        }
      }
    `,
  });
});
