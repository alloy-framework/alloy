import { expect, it } from "vitest";
import { findFile, toSourceText } from "./utils.js";
import * as jv from "../src/components/index.js";
import { code } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";

it("Annotates object", () => {
  const res = toSourceText(code`
    ${<jv.Annotation type="Getter" />}
    class TestClass {
    }
  `)

  expect(res).toBe(d`
    package me.test.code;

    @Getter
    class TestClass {
    }
  `)
});

it('Takes single parameter', () => {
  const res = toSourceText(code`
    ${<jv.Annotation type="Getter" value={<jv.Value value='Test' /> } />}
    class TestClass {
    }
  `)

  expect(res).toBe(d`
    package me.test.code;

    @Getter("Test")
    class TestClass {
    }
  `)
});

it('Takes named parameters', () => {
  const res = toSourceText(code`
    ${<jv.Annotation type="Getter" arguments={{
      value1: <jv.Value value='Tester' />,
      value2: <jv.Value value='Tested' />
  }} />}
    class TestClass {
    }
  `)

  expect(res).toBe(d`
    package me.test.code;

    @Getter(value1 = "Tester", value2 = "Tested")
    class TestClass {
    }
  `)
});
