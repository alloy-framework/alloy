import { expect, it } from "vitest";
import { Usings } from "./using.jsx";

it("single using", () => {
  expect(<Usings namespaces={["Foo"]} />).toRenderTo(`
    using Foo;
  `);
});

it("multiple using", () => {
  expect(<Usings namespaces={["Foo", "Bar"]} />).toRenderTo(`
    using Bar;
    using Foo;
  `);
});
