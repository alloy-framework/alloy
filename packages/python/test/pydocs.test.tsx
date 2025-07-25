import { Prose } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { enumModule } from "../src/builtins/python.js";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";

describe("PyDoc", () => {
  it("formats properly", () => {
    const res = toSourceText(
      [
        <py.PyDoc>
          <Prose>
            This is an example of a long docstring that will be broken in lines.
            We will also render another paragraph after this one.
          </Prose>
          <Prose>
            This is another paragraph, and there's a line break before it.
          </Prose>
        </py.PyDoc>,
      ],
      { printOptions: { printWidth: 40 } },
    );

    expect(res).toRenderTo(
      d`
        """
        This is an example of a long docstring
        that will be broken in lines. We will
        also render another paragraph after this
        one.
        
        This is another paragraph, and there's a
        line break before it.
        """
      `,
    );
  });
});

describe("PyDocExample", () => {
  it("creates docstring with a code sample", () => {
    const res = toSourceText(
      [
        <py.PyDoc>
          <Prose>This is an example of a docstring with a code sample.</Prose>
          <py.PyDocExample>print("Hello world!")</py.PyDocExample>
        </py.PyDoc>,
      ],
      { printOptions: { printWidth: 40 } },
    );

    expect(res).toRenderTo(
      d`
      """
      This is an example of a docstring with a
      code sample.
      
      >> print("Hello world!")
      """
      `,
    );
  });

  it("creates docstring with more than one code sample", () => {
    const res = toSourceText(
      [
        <py.PyDoc>
          <Prose>This is an example of a docstring with a code sample.</Prose>
          <py.PyDocExample>print("Hello world!")</py.PyDocExample>
          <py.PyDocExample>print("Hello world again!")</py.PyDocExample>
        </py.PyDoc>,
      ],
      { printOptions: { printWidth: 40 } },
    );

    expect(res).toRenderTo(
      d`
      """
      This is an example of a docstring with a
      code sample.
      
      >> print("Hello world!")
      
      >> print("Hello world again!")
      """
      `,
    );
  });

  it("creates docstring with a multiline code sample", () => {
    const res = toSourceText(
      [
        <py.PyDoc>
          <Prose>This is an example of a docstring with a code sample.</Prose>
          <py.PyDocExample>
            print("Hello world!")
            <br />
            x = "Hello"
            <br />
            print(x)
          </py.PyDocExample>
        </py.PyDoc>,
      ],
      { printOptions: { printWidth: 40 } },
    );

    expect(res).toRenderTo(
      d`
      """
      This is an example of a docstring with a
      code sample.
      
      >> print("Hello world!")
      >> x = "Hello"
      >> print(x)
      """
      `,
    );
  });
});

describe("GoogleStyleDocParam", () => {
  it("name only", () => {
    const res = toSourceText([
      <py.PyDoc>
        <py.GoogleStyleDocParam name="somebody" />
      </py.PyDoc>,
    ]);
    expect(res).toRenderTo(
      d`
          """
          somebody
          """
          `,
    );
  });
  it("name and type", () => {
    const res = toSourceText([
      <py.PyDoc>
        <py.GoogleStyleDocParam name="somebody" type="str" />
      </py.PyDoc>,
    ]);
    expect(res).toRenderTo(
      d`
          """
          somebody (str)
          """
          `,
    );
  });
  it("name, type and description", () => {
    const res = toSourceText([
      <py.PyDoc>
        <py.GoogleStyleDocParam name="somebody" type="str">
          Somebody's name.
        </py.GoogleStyleDocParam>
      </py.PyDoc>,
    ]);
    expect(res).toRenderTo(
      d`
          """
          somebody (str): Somebody's name.
          """
          `,
    );
  });
  it("name, type, description, and optional", () => {
    const res = toSourceText([
      <py.PyDoc>
        <py.GoogleStyleDocParam name="somebody" type="str" optional>
          Somebody's name.
        </py.GoogleStyleDocParam>
      </py.PyDoc>,
    ]);
    expect(res).toRenderTo(
      d`
          """
          somebody (str, optional): Somebody's name.
          """
          `,
    );
  });
  it("name, type, description, and optional with default value", () => {
    const res = toSourceText([
      <py.PyDoc>
        <py.GoogleStyleDocParam
          name="somebody"
          type="str"
          optional
          defaultValue="John Doe"
        >
          Somebody's name.
        </py.GoogleStyleDocParam>
      </py.PyDoc>,
    ]);
    expect(res).toRenderTo(
      d`
        """
        somebody (str, optional): Somebody's name. Defaults to \"John Doe\".
        """
        `,
    );
  });
  it("name, type, description, and optional with default value with a very long description", () => {
    const res = toSourceText(
      [
        <py.PyDoc>
          <py.GoogleStyleDocParam
            name="somebody"
            type="str"
            optional
            defaultValue="John Doe"
          >
            Somebody's name. This can be any string representing a person,
            whether it's a first name, full name, nickname, or even a codename
            (e.g., "Agent X"). It's used primarily for display purposes,
            logging, or greeting messages and is not required to be unique or
            validated unless specified by the caller.
          </py.GoogleStyleDocParam>
          <py.GoogleStyleDocParam name="somebody2" type="str">
            Somebody's name. This can be any string representing a person,
            whether it's a first name, full name, nickname, or even a codename
            (e.g., "Agent X"). It's used primarily for display purposes,
            logging, or greeting messages and is not required to be unique or
            validated unless specified by the caller.
          </py.GoogleStyleDocParam>
        </py.PyDoc>,
      ],
      { printOptions: { printWidth: 80 } },
    );
    expect(res).toRenderTo(
      d`
          """
          somebody (str, optional): Somebody's name. This can be any string representing a
              person, whether it's a first name, full name, nickname, or even a codename
              (e.g., "Agent X"). It's used primarily for display purposes, logging, or
              greeting messages and is not required to be unique or validated unless
              specified by the caller. Defaults to \"John Doe\".
          
          somebody2 (str): Somebody's name. This can be any string representing a person,
              whether it's a first name, full name, nickname, or even a codename (e.g.,
              "Agent X"). It's used primarily for display purposes, logging, or greeting
              messages and is not required to be unique or validated unless specified by
              the caller.
          """
          `,
    );
  });
  it("name, type, description, and optional with default value with a description containing a linebreak", () => {
    const res = toSourceText(
      [
        <py.PyDoc>
          <py.GoogleStyleDocParam
            name="somebody"
            type="str"
            optional
            defaultValue="John Doe"
          >
            Somebody's name. This is one line
            <hbr />
            This is another line.
          </py.GoogleStyleDocParam>
        </py.PyDoc>,
      ],
      { printOptions: { printWidth: 80 } },
    );
    expect(res).toRenderTo(
      d`
          """
          somebody (str, optional): Somebody's name. This is one line
              This is another line. Defaults to \"John Doe\".
          """
          `,
    );
  });
});

describe("Full example", () => {
  it("renders correctly in a Class", () => {
    const doc = (
      <py.ClassDoc
        description={[
          <Prose>
            This is an example of a long docstring that will be broken in lines.
            We will also render another paragraph after this one.
          </Prose>,
          <py.PyDocExample>
            print("Hello world!")
            <br />
            x = "Hello"
            <br />
            print(x)
          </py.PyDocExample>,
        ]}
        parameters={[
          {
            name: "somebody",
            type: "str",
            optional: true,
            default: "John Doe",
            doc: "Somebody's name. This can be any string representing a person, whether it's a first name, full name, nickname, or even a codename (e.g., 'Agent X'). It's used primarily for display purposes, logging, or greeting messages and is not required to be unique or validated unless specified by the caller. Defaults to \"John Doe\".",
          },
          {
            name: "somebody2",
            type: "str",
            doc: "Somebody's name. This can be any string representing a person, whether it's a first name, full name, nickname, or even a codename (e.g., 'Agent X'). It's used primarily for display purposes, logging, or greeting messages and is not required to be unique or validated unless specified by the caller.",
          },
        ]}
        style="google"
      />
    );
    const res = toSourceText(
      [
        <py.ClassDeclaration name="A" doc={doc}>
          <py.StatementList>
            <py.VariableDeclaration name="just_name" />
            <py.VariableDeclaration name="name_and_type" type="number" />
            <py.VariableDeclaration
              name="name_type_and_value"
              type="number"
              initializer={12}
            />
          </py.StatementList>
        </py.ClassDeclaration>,
      ],
      { printOptions: { printWidth: 80, tabWidth: 4 } },
    );

    expect(res).toRenderTo(
      d`
          class A:
              """
              This is an example of a long docstring that will be broken in lines. We will
              also render another paragraph after this one.

              >> print("Hello world!")
              >> x = "Hello"
              >> print(x)

              Args:
                  somebody (str, optional): Somebody's name. This can be any string
                      representing a person, whether it's a first name, full name,
                      nickname, or even a codename (e.g., 'Agent X'). It's used primarily
                      for display purposes, logging, or greeting messages and is not
                      required to be unique or validated unless specified by the caller.
                      Defaults to \"John Doe\".

                  somebody2 (str): Somebody's name. This can be any string representing a
                      person, whether it's a first name, full name, nickname, or even a
                      codename (e.g., 'Agent X'). It's used primarily for display
                      purposes, logging, or greeting messages and is not required to be
                      unique or validated unless specified by the caller.
              """
              just_name = None
              name_and_type: number = None
              name_type_and_value: number = 12


          `,
    );
  });

  it("renders correctly in a Function", () => {
    const doc = (
      <py.FunctionDoc
        description={[
          <Prose>
            This is an example of a long docstring that will be broken in lines.
            We will also render another paragraph after this one.
          </Prose>,
          <py.PyDocExample>
            print("Hello world!")
            <br />
            x = "Hello"
            <br />
            print(x)
          </py.PyDocExample>,
        ]}
        parameters={[
          {
            name: "somebody",
            type: "str",
            optional: true,
            default: "John Doe",
            doc: "Somebody's name. This can be any string representing a person, whether it's a first name, full name, nickname, or even a codename (e.g., 'Agent X'). It's used primarily for display purposes, logging, or greeting messages and is not required to be unique or validated unless specified by the caller. Defaults to \"John Doe\".",
          },
          {
            name: "somebody2",
            type: "str",
            doc: "Somebody's name. This can be any string representing a person, whether it's a first name, full name, nickname, or even a codename (e.g., 'Agent X'). It's used primarily for display purposes, logging, or greeting messages and is not required to be unique or validated unless specified by the caller.",
          },
        ]}
        returns="The return value. True for success, False otherwise."
        raises={["ValueError: If somebody2 is equal to somebody."]}
        style="google"
      />
    );
    const res = toSourceText(
      [
        <py.FunctionDeclaration name="some_function" doc={doc}>
          <py.StatementList>
            <py.VariableDeclaration name="just_name" />
            <py.VariableDeclaration name="name_and_type" type="number" />
            <py.VariableDeclaration
              name="name_type_and_value"
              type="number"
              initializer={12}
            />
          </py.StatementList>
        </py.FunctionDeclaration>,
      ],
      { printOptions: { printWidth: 80, tabWidth: 4 } },
    );

    expect(res).toRenderTo(
      d`
          def some_function():
              """
              This is an example of a long docstring that will be broken in lines. We will
              also render another paragraph after this one.

              >> print("Hello world!")
              >> x = "Hello"
              >> print(x)

              Args:
                  somebody (str, optional): Somebody's name. This can be any string
                      representing a person, whether it's a first name, full name,
                      nickname, or even a codename (e.g., 'Agent X'). It's used primarily
                      for display purposes, logging, or greeting messages and is not
                      required to be unique or validated unless specified by the caller.
                      Defaults to \"John Doe\".

                  somebody2 (str): Somebody's name. This can be any string representing a
                      person, whether it's a first name, full name, nickname, or even a
                      codename (e.g., 'Agent X'). It's used primarily for display
                      purposes, logging, or greeting messages and is not required to be
                      unique or validated unless specified by the caller.

              Returns:
                  The return value. True for success, False otherwise.

              Raises:
                  ValueError: If somebody2 is equal to somebody.
              """
              just_name = None
              name_and_type: number = None
              name_type_and_value: number = 12


          `,
    );
  });

  it("renders correctly in a Variable", () => {
    const res = toSourceText(
      [
        <py.VariableDeclaration
          name="myVar"
          initializer={42}
          doc="This is a very long docstring that will be broken in two lines when rendered. This part of the docstring will be in the second line."
        />,
      ],
      { printOptions: { printWidth: 80, tabWidth: 4 } },
    );

    expect(res).toRenderTo(
      d`
            # This is a very long docstring that will be broken in two lines when rendered.
            # This part of the docstring will be in the second line.
            my_var = 42
            `,
    );
  });

  it("classic enum with explicit values", () => {
    const result = toSourceText(
      [
        <py.EnumDeclaration
          name="Color"
          baseType="IntEnum"
          members={[
            { name: "RED", value: "1", doc: "The color red." },
            { name: "GREEN", value: "2", doc: "The color green." },
            { name: "BLUE", value: "3", doc: "The color blue." },
          ]}
          doc="An enum representing colors."
        />,
      ],
      { externals: [enumModule] },
    );
    const expected = d`
      from enum import IntEnum

      # An enum representing colors.
      class Color(IntEnum):
          RED = 1  # The color red.
          GREEN = 2  # The color green.
          BLUE = 3  # The color blue.


    `;
    expect(result).toRenderTo(expected);
  });
});
