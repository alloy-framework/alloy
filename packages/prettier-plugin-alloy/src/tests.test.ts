import { describe, expect, it } from "vitest";
import prettier from "prettier";
import * as plugin from "./index.js";

function format(code: string, parser: string) {
  return prettier.format(code, {
    parser,
    plugins: [plugin],
  });
}

async function expectFormat({
  parser,
  input,
  output,
}: {
  parser: string;
  input: string;
  output: string;
}) {
  const result = await format(input, parser);
  expect(result.trim()).toEqual(output.trim());
}

it("baseline", async () => {
  await expectFormat({
    parser: "typescript",
    input: `
export const 
Foo = (props: any) => {
return <File>
  
  <Text>Foo</Text>
</File>;
}
  `,
    output: `
export const Foo = (props: any) => {
  return (
    <File>
      <Text>Foo</Text>
    </File>
  );
};
`,
  });
});

describe("keeps new lines ", () => {
  it("typescript files", async () => {
    await expectFormat({
      parser: "alloy-ts",
      input: `
export const 
Foo = (props: any) => {
  return <File>
    
    <Text>Foo</Text>
  </File>;
}
    `,
      output: `
export const Foo = (props: any) => {
  return <File>
    
    <Text>Foo</Text>
  </File>;
};
`,
    });
  });

  it("javascript files", async () => {
    await expectFormat({
      parser: "alloy-js",
      input: `
export const 
Foo = (props) => {
  return <File>
    
    <Text>Foo</Text>
  </File>;
}
    `,
      output: `
export const Foo = (props) => {
  return <File>
    
    <Text>Foo</Text>
  </File>;
};
`,
    });
  });
});
