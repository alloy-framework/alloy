## Alloy

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
  </ay.Output>
);

console.log(res[2].contents);
// import { foo } from "./test2.ts";
//
// const v = foo;
```

This project is in pre-beta. Expect everything to change. Feedback is especially
appreciated.

### Dependencies

- pnpm
- node 20+

### Building

Clone the repo, then:

```bash
> pnpm install
> pnpm build
```

### Experimenting

The sample package under `packages/sample` is set up, feel free to add
interesting things there or play around.
