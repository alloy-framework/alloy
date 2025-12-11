import { Output, render } from "@alloy-js/core";
import { expect, it } from "vitest";
import { fs } from "../src/builtins/node.js";
import {
  createPackage,
  FunctionDeclaration,
  PackageDirectory,
  SourceFile,
} from "../src/index.js";

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

  expect(
    <Output externals={[testLib, fs]}>
      <PackageDirectory path="." name="test" version="1.0.0">
        <SourceFile path="index.ts">
          {testLib["./subpath"].nice};<hbr />
          await {fs["./promises"].readFile}();
        </SourceFile>
      </PackageDirectory>
    </Output>,
  ).toRenderTo({
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
    "tsconfig.json": expect.anything(),
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

  expect(
    <Output externals={[testLib, fs]}>
      <SourceFile path="index.ts">
        {testLib["./subpath"].nice};<hbr />
        await {fs["./promises"].readFile}();
      </SourceFile>
    </Output>,
  ).toRenderTo({
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

  expect(
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
  ).toRenderTo({
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
            instanceMembers: ["instanceHandler"],
          },
          { name: "noMembers" },
          "simpleName",
        ],
      },
    },
  });

  expect(
    <Output externals={[mcpSdk]}>
      <SourceFile path="index.ts">
        <FunctionDeclaration name="foo">
          {mcpSdk["./server/index.js"].server}();
          <hbr />
          {mcpSdk["./server/index.js"].server.static.setRequestHandler}();
          <hbr />
          {
            mcpSdk["./server/index.js"].server.static.nested.static
              .nestedHandler
          }
          ();
          <hbr />
          {mcpSdk["./server/index.js"].noMembers}();
          <hbr />
          {mcpSdk["./server/index.js"].simpleName}();
        </FunctionDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
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

it("can specify packages as dev dependencies", () => {
  const testLib = createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": {
        named: ["foo"],
      },
    },
  });

  expect(
    <Output externals={[testLib, fs]}>
      <PackageDirectory
        path="."
        name="test"
        version="1.0.0"
        packages={[[testLib, { version: "2.0.0", kind: "devDependencies" }]]}
      >
        <SourceFile path="index.ts">{testLib.foo};</SourceFile>
      </PackageDirectory>
    </Output>,
  ).toRenderTo({
    "package.json": `
      {
        "name": "test",
        "version": "1.0.0",
        "type": "module",
        "devDependencies": {
          "typescript": "^5.5.2",
          "testLib": "2.0.0"
        }
      }
    `,
    "tsconfig.json": expect.anything(),
    "index.ts": expect.anything(),
  });
});

it("can specify packages as peer dependencies", () => {
  const testLib = createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": {
        named: ["foo"],
      },
    },
  });

  expect(
    <Output externals={[testLib, fs]}>
      <PackageDirectory
        path="."
        name="test"
        version="1.0.0"
        packages={[[testLib, { version: "2.0.0", kind: "peerDependencies" }]]}
      >
        <SourceFile path="index.ts">{testLib.foo};</SourceFile>
      </PackageDirectory>
    </Output>,
  ).toRenderTo({
    "package.json": `
      {
        "name": "test",
        "version": "1.0.0",
        "type": "module",
        "devDependencies": {
          "typescript": "^5.5.2"
        },
        "peerDependencies": {
          "testLib": "2.0.0"
        }
      }
    `,
    "tsconfig.json": expect.anything(),
    "index.ts": expect.anything(),
  });
});

it("can inherit package version as peer dependency", () => {
  const testLib = createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": {
        named: ["foo"],
      },
    },
  });

  expect(
    <Output externals={[testLib, fs]}>
      <PackageDirectory
        path="."
        name="test"
        version="1.0.0"
        packages={[[testLib, { kind: "peerDependencies" }]]}
      >
        <SourceFile path="index.ts">{testLib.foo};</SourceFile>
      </PackageDirectory>
    </Output>,
  ).toRenderTo({
    "package.json": `
      {
        "name": "test",
        "version": "1.0.0",
        "type": "module",
        "devDependencies": {
          "typescript": "^5.5.2"
        },
        "peerDependencies": {
          "testLib": "1.0.0"
        }
      }
    `,
    "tsconfig.json": expect.anything(),
    "index.ts": expect.anything(),
  });
});

it("must throw an error if package configuration is not provided", () => {
  const testLib = createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": {
        named: ["foo"],
      },
    },
  });

  expect(() =>
    render(
      <Output externals={[testLib, fs]}>
        <PackageDirectory
          path="."
          name="test"
          version="1.0.0"
          // @ts-expect-error
          packages={[[testLib]]}
        >
          <SourceFile path="index.ts">{testLib.foo};</SourceFile>
        </PackageDirectory>
      </Output>,
    ),
  ).toThrowError("Package configuration must be provided");
});
