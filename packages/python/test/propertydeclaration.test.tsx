import { Prose } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { abcModule } from "../src/index.js";
import { toSourceText } from "./utils.js";

describe("PropertyDeclaration", () => {
  it("renders empty property, setter, deleter", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.PropertyDeclaration name="x">
              <py.PropertyDeclaration.Setter />
              <py.PropertyDeclaration.Deleter />
            </py.PropertyDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      class MyClass:
          @property
          def x(self):
              raise NotImplementedError

          @x.setter
          def x(self, value) -> None:
              raise NotImplementedError

          @x.deleter
          def x(self) -> None:
              raise NotImplementedError


    `);
  });

  it("renders normal property, setter, deleter with children and type", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.PropertyDeclaration name="x" type="int">
              something
              <py.PropertyDeclaration.Setter>
                something else
              </py.PropertyDeclaration.Setter>
              <py.PropertyDeclaration.Deleter>
                some other thing
              </py.PropertyDeclaration.Deleter>
            </py.PropertyDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      class MyClass:
          @property
          def x(self) -> int:
              something

          @x.setter
          def x(self, value: int) -> None:
              something else

          @x.deleter
          def x(self) -> None:
              some other thing


    `);
  });

  it("renders normal property, setter, deleter with children and type, overriding the setter type", () => {
    const propertyDoc = (
      <py.FunctionDoc
        description={[<Prose>Property documentation.</Prose>]}
        style="google"
      />
    );
    const setterDoc = (
      <py.FunctionDoc
        description={[
          <Prose>We can receive a string, a float, or a str.</Prose>,
        ]}
        style="google"
      />
    );
    const deleterDoc = (
      <py.FunctionDoc
        description={[<Prose>Deleter documentation.</Prose>]}
        style="google"
      />
    );
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.PropertyDeclaration name="x" type="int" doc={propertyDoc}>
              something
              <py.PropertyDeclaration.Setter
                type={
                  <py.UnionTypeExpression>
                    {["int", "float", "str"]}
                  </py.UnionTypeExpression>
                }
                doc={setterDoc}
              >
                self._string = str(value)
              </py.PropertyDeclaration.Setter>
              <py.PropertyDeclaration.Deleter doc={deleterDoc}>
                some other thing
              </py.PropertyDeclaration.Deleter>
            </py.PropertyDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      class MyClass:
          @property
          def x(self) -> int:
              """
              Property documentation.
              """
              something

          @x.setter
          def x(self, value: int | float | str) -> None:
              """
              We can receive a string, a float, or a str.
              """
              self._string = str(value)

          @x.deleter
          def x(self) -> None:
              """
              Deleter documentation.
              """
              some other thing


    `);
  });

  it("renders abstract property with getter, setter, deleter", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.PropertyDeclaration name="value" type="int" abstract>
              return self._value
              <py.PropertyDeclaration.Setter type="int">
                self._value = value
              </py.PropertyDeclaration.Setter>
              <py.PropertyDeclaration.Deleter>
                del self._value
              </py.PropertyDeclaration.Deleter>
            </py.PropertyDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      from abc import abstractmethod

      class MyClass:
          @property
          @abstractmethod
          def value(self) -> int:
              return self._value

          @value.setter
          @abstractmethod
          def value(self, value: int) -> None:
              self._value = value

          @value.deleter
          @abstractmethod
          def value(self) -> None:
              del self._value


    `);
  });
});
