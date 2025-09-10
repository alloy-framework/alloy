import { expect, it } from "vitest";
import { access } from "./access.jsx";

it("makes a member access expression", () => {
  const template = access("Foo").member("Bar");
  expect(template).toRenderTo(`Foo.Bar`);
});

it("makes a conditional member access expression", () => {
  const template = access("Foo").member("Bar", { conditional: true });
  expect(template).toRenderTo(`Foo?.Bar`);
});

it("handles nullable", () => {
  const template = access("Foo", { nullable: true }).member("Bar");
  expect(template).toRenderTo(`Foo?.Bar`);
});

it("can make calls", () => {
  const template = access("Foo").call([]);
  expect(template).toRenderTo(`Foo()`);

  const template2 = access("Foo").member("Bar").call([1, 2, 3]);
  expect(template2).toRenderTo(`Foo.Bar(1, 2, 3)`);

  const template3 = access("Foo").member("Bar").call().member("Baz");
  expect(template3).toRenderTo(`Foo.Bar().Baz`);

  const template4 = access("Foo").call("Bar", [1, 2, 3]);
  expect(template4).toRenderTo(`Foo.Bar(1, 2, 3)`);
});

it("can do array access", () => {
  const template = access("Foo").index([0]);
  expect(template).toRenderTo(`Foo[0]`);

  const template2 = access("Foo").index([0, 1]).member("Bar");
  expect(template2).toRenderTo(`Foo[0, 1].Bar`);
});

it("can do complex chains", () => {
  const template = access("Foo")
    .member("Bar", { conditional: true })
    .index([0], { nullable: true })
    .call("Method", [access("Other").call("Method")])
    .member("Baz");

  expect(template).toRenderTo(`Foo?.Bar[0]?.Method(Other.Method()).Baz`);
});
