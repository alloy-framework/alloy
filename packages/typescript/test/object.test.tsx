import { List, namekey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import {
  CommaList,
  ObjectExpression,
  ObjectProperty,
  ObjectSpreadProperty,
} from "../src/index.js";
import { toSourceText } from "./utils.jsx";

it("from js value", () => {
  expect(toSourceText(<ObjectExpression jsValue={{ a: 1, b: 2 }} />)).toBe(d`
  {
    a: 1,
    b: 2,
  }
  `);
});

it("from object property", () => {
  const comp = (
    <ObjectExpression>
      <List joiner={",\n"}>
        <ObjectProperty name="a" value={1} />
        <ObjectProperty name="b" value={2} />
      </List>
    </ObjectExpression>
  );
  expect(toSourceText(comp)).toBe(d`
  {
    a: 1,
    b: 2
  }
  `);
});

it("spread property", () => {
  const comp = (
    <ObjectExpression>
      <ObjectSpreadProperty>abc</ObjectSpreadProperty>
    </ObjectExpression>
  );
  expect(toSourceText(comp)).toBe(d`
  {
    ...abc
  }
  `);
});

it("Works with both children and jsvalue", () => {
  const comp = (
    <ObjectExpression jsValue={{ a: 1, b: 2 }}>
      <ObjectProperty name="c" value={3} />
    </ObjectExpression>
  );
  expect(toSourceText(comp)).toBe(d`
  {
    a: 1,
    b: 2,
    c: 3
  }
  `);
});

it("Handles name conflicts and namekeys", () => {
  const nk1 = namekey("a");
  const nk2 = namekey("a");
  const nk3 = namekey("a", { ignoreNameConflict: true });

  const comp = (
    <ObjectExpression>
      <CommaList>
        <ObjectProperty name={nk1} value={3} />
        <ObjectProperty name={nk2} value={1} />
        <ObjectProperty name={nk3} value={1} />
      </CommaList>
    </ObjectExpression>
  );
  expect(toSourceText(comp)).toBe(d`
    {
      a: 3,
      a_2: 1,
      a: 1,
    }
  `);
});
