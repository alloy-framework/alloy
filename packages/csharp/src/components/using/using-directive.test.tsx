import { expect, it } from "vitest";
import { UsingDirective } from "./using-directive.jsx";

it("single using", () => {
  expect(<UsingDirective namespaces={["Foo"]} />).toRenderTo(`
    using Foo;
  `);
});

it("multiple using", () => {
  expect(<UsingDirective namespaces={["Foo", "Bar"]} />).toRenderTo(`
    using Bar;
    using Foo;
  `);
});
