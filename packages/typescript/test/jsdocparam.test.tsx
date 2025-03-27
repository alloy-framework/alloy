import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { JSDocParam } from "../src/components/JSDocParam.jsx";
import { JSDoc } from "../src/index.js";

it("name only", () => {
  const template = (
    <JSDoc>
      <JSDocParam name="somebody" />
    </JSDoc>
  );

  expect(template).toRenderTo(
    d`
          /**
           * @param somebody
           **/
        `,
  );
});

it("name and type", () => {
  const template = (
    <JSDoc>
      <JSDocParam name="somebody" type="string" />
    </JSDoc>
  );

  expect(template).toRenderTo(
    d`
          /**
           * @param {string} somebody
           **/
        `,
  );
});

it("name, type and description", () => {
  const template = (
    <JSDoc>
      <JSDocParam name="somebody" type="string">
        Somebody's name.
      </JSDocParam>
    </JSDoc>
  );

  expect(template).toRenderTo(
    d`
          /**
           * @param {string} somebody Somebody's name.
           **/
        `,
  );
});

it("name, type and description with hyphen", () => {
  const template = (
    <JSDoc>
      <JSDocParam name="somebody" type="string" hyphen>
        Somebody's name.
      </JSDocParam>
    </JSDoc>
  );

  expect(template).toRenderTo(
    d`
          /**
           * @param {string} somebody - Somebody's name.
           **/
        `,
  );
});

it("name, type, description, hyphen and optional", () => {
  const template = (
    <JSDoc>
      <JSDocParam name="somebody" type="string" optional hyphen>
        Somebody's name.
      </JSDocParam>
    </JSDoc>
  );

  expect(template).toRenderTo(
    d`
        /**
         * @param {string} [somebody] - Somebody's name.
         **/
        `,
  );
});

it("name, type, description, hyphen and optional with default value", () => {
  const template = (
    <JSDoc>
      <JSDocParam
        name="somebody"
        type="string"
        optional
        defaultValue="John Doe"
        hyphen
      >
        Somebody's name.
      </JSDocParam>
    </JSDoc>
  );

  expect(template).toRenderTo(
    d`
            /**
             * @param {string} [somebody=John Doe] - Somebody's name.
             **/
            `,
  );
});

it("name, type, description, hyphen and optional with default value with a very lon description", () => {
  const template = (
    <JSDoc>
      <JSDocParam
        name="somebody"
        type="string"
        optional
        defaultValue="John Doe"
        hyphen
      >
        Somebody's name. This can be any string representing a person, whether
        it's a first name, full name, nickname, or even a codename (e.g., "Agent
        X"). It's used primarily for display purposes, logging, or greeting
        messages and is not required to be unique or validated unless specified
        by the caller.
      </JSDocParam>
      <JSDocParam name="somebody2" type="string" hyphen>
        Somebody's name. This can be any string representing a person, whether
        it's a first name, full name, nickname, or even a codename (e.g., "Agent
        X"). It's used primarily for display purposes, logging, or greeting
        messages and is not required to be unique or validated unless specified
        by the caller.
      </JSDocParam>
    </JSDoc>
  );

  expect(template).toRenderTo(
    d`
          /**
           * @param {string} [somebody=John Doe] - Somebody's name. This can be any string
           *   representing a person, whether it's a first name, full name, nickname, or
           *   even a codename (e.g., "Agent X"). It's used primarily for display
           *   purposes, logging, or greeting messages and is not required to be unique or
           *   validated unless specified by the caller.
           *
           * @param {string} somebody2 - Somebody's name. This can be any string
           *   representing a person, whether it's a first name, full name, nickname, or
           *   even a codename (e.g., "Agent X"). It's used primarily for display
           *   purposes, logging, or greeting messages and is not required to be unique or
           *   validated unless specified by the caller.
           **/
          `,
    { printWidth: 80 },
  );
});

it("name, type, description, hyphen and optional with default value with a description containing a linebreak", () => {
  const template = (
    <JSDoc>
      <JSDocParam
        name="somebody"
        type="string"
        optional
        defaultValue="John Doe"
        hyphen
      >
        Somebody's name. This is one line
        <hbr />
        This is another line
      </JSDocParam>
    </JSDoc>
  );

  expect(template).toRenderTo(
    d`
          /**
           * @param {string} [somebody=John Doe] - Somebody's name. This is one line
           *   This is another line
           **/
          `,
    { printWidth: 80 },
  );
});
