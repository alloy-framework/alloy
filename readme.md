## Alloy

[Documentation](https://alloy-framework.github.io/alloy)

Alloy is a framework for code generation that borrows concepts from JavaScript
front-end frameworks like React and Solid to provide highly ergonomic and
productive source code generation. Use JSX syntax or string templates to define
source files and the language elements within them. Alloy helps handle a lot of
the hard bits like building source text from strings, linking declarations and
importing necessary dependencies, applying naming conventions, formatting, and
generating syntax for a number of languages.

```tsx
import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";

const helloWorldRef = ay.refkey();

const res = ay.render(
  <ay.Output>
    <ay.SourceFile path="readme.md" filetype="markdown">
      This is a sample output project.
    </ay.SourceFile>

    <ts.SourceFile path="test1.ts">
      <ts.VarDeclaration export name="foo" refkey={helloWorldRef}>
        "Hello world"
      </ts.VarDeclaration>
    </ts.SourceFile>

    <ts.SourceFile path="test2.ts">
      <ts.VarDeclaration name="v">{helloWorldRef}</ts.VarDeclaration>
      console.log(v);
    </ts.SourceFile>
  </ay.Output>,
);

console.log(res[2].contents);
// import { foo } from "./test2.ts";
//
// const v = foo;
```

Or, if you prefer, you can use string templates:

```tsx
import { refkey, render, code } from "@alloy-js/core";
import * as ay from "@alloy-js/core/stc";
import * as ts from "@alloy-js/typescript/stc";

const helloWorldRef = refkey();

const res = render(
  ay.Output().children(
    ay.SourceFile({ path: "readme.md", filetype: "markdown" }).code`
      This is a sample output project.
    `,

    ts.SourceFile({ path: "test1.ts" }).children(
      ts.VarDeclaration({ export: true, name: "foo", refkey: helloWorldRef })
        .code`
        "Hello world"
      `,
    ),

    ts.SourceFile({ path: "test2.ts" }).code`
      ${ts.VarDeclaration({ name: "v" }).children(helloWorldRef)}
      
      console.log(v);
    `,
  ),
);

console.log(res[2].contents);
// import { foo } from "./test2.ts";
//
// const v = foo;
```

This project is in pre-beta. Expect everything to change. Feedback is especially
appreciated. The docs are not great but are being worked on.

### Dependencies

- pnpm
- node 20+

### Installation

[Use this template to get started](https://github.com/alloy-framework/alloy-project-template).

Alternatively, you can find the latest packages on GitHub by clicking the green checkbox next to the latest commit and clicking "details" next to Continuous Releases. Alloy will be published to NPM in the coming weeks.

### Building

Clone the repo, then:

```bash
> pnpm install
> pnpm build
```

### Supported Languages

- C#: @alloy-js/csharp
- Java: @alloy-js/java
- TypeScript: @alloy-js/typescript

More are coming soon.
