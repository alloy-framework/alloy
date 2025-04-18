import { refkey, StatementList } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/index.js";
import { toSourceText } from "./utils.js";

it("renders a function declaration with documentation", () => {
  const res = toSourceText(
    <ts.FunctionDeclaration
      name="greet"
      doc="A function that greets a person"
      parameters={[{ name: "name", type: "string" }]}
      returnType="string"
    />,
  );
  expect(res).toEqual(d`
    /**
     * A function that greets a person
     *
     * @param {string} name
     */
    function greet(name: string): string {}
  `);
});

it("With documented parameters", () => {
  const res = toSourceText(
    <ts.FunctionDeclaration
      export
      name="calculateTotal"
      doc="Calculates the total price including tax"
      parameters={[
        { name: "price", type: "number" },
        { name: "taxRate", type: "number", optional: true },
      ]}
      returnType="number"
    />,
  );
  expect(res).toEqual(d`
    /**
     * Calculates the total price including tax
     *
     * @param {number} price
     * @param {number} [taxRate]
     */
    export function calculateTotal(price: number, taxRate?: number): number {}
  `);
});

it("renders a function with a reference", () => {
  const userRef = refkey();

  const res = toSourceText(
    <>
      <ts.InterfaceDeclaration name="User" refkey={userRef}>
        <StatementList>
          <ts.InterfaceMember name="id" type="number" />
          <ts.InterfaceMember name="name" type="string" />
        </StatementList>
      </ts.InterfaceDeclaration>
      <hbr />
      <hbr />
      <ts.FunctionDeclaration
        name="createUser"
        doc="Creates a new user"
        parameters={[
          {
            name: "user",
            type: userRef,
            doc: "The user object to create",
          },
        ]}
        returnType="void"
      />
    </>,
  );
  expect(res).toEqual(d`
    interface User {
      id: number;
      name: string;
    }

    /**
     * Creates a new user
     *
     * @param {User} user - The user object to create
     */
    function createUser(user: User): void {}`);
});
