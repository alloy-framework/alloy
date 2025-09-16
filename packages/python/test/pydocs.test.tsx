import { Prose } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { enumModule } from "../src/builtins/python.js";
import * as py from "../src/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.jsx";

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

describe("SimpleCommentBlock", () => {
  it("renders simple comment block", () => {
    const res = toSourceText([
      <py.SimpleCommentBlock>
        This is a simple comment block that spans multiple lines.
      </py.SimpleCommentBlock>,
    ]);
    expect(res).toRenderTo(
      d`
          # This is a simple comment block that spans multiple lines.
          
          `,
    );
  });

  it("renders comment block with line breaks", () => {
    const res = toSourceText([
      <py.SimpleCommentBlock>
        First line of comment.
        <br />
        Second line of comment.
      </py.SimpleCommentBlock>,
    ]);
    expect(res).toRenderTo(
      d`
          # First line of comment. Second line of comment.
          
          `,
    );
  });
});

describe("SimpleInlineComment", () => {
  it("renders inline comment", () => {
    const res = toSourceText([
      <>
        x = 42
        <py.SimpleInlineComment>
          This is an inline comment
        </py.SimpleInlineComment>
      </>,
    ]);
    expect(res).toRenderTo(
      d`
          x = 42  # This is an inline comment
          `,
    );
  });

  it("renders inline comment with complex text", () => {
    const res = toSourceText([
      <>
        result = calculate()
        <py.SimpleInlineComment>
          TODO: Add error handling here
        </py.SimpleInlineComment>
      </>,
    ]);
    expect(res).toRenderTo(
      d`
          result = calculate()  # TODO: Add error handling here
          `,
    );
  });
});

describe("SimpleInlineMemberComment", () => {
  it("renders inline member comment", () => {
    const res = toSourceText([
      <>
        status: int
        <py.SimpleInlineMemberComment>
          HTTP status code
        </py.SimpleInlineMemberComment>
      </>,
    ]);
    expect(res).toRenderTo(
      d`
          status: int  #: HTTP status code
          `,
    );
  });

  it("renders inline member comment for variable declaration", () => {
    const res = toSourceText([
      <>
        max_retries = 3
        <py.SimpleInlineMemberComment>
          Maximum number of retry attempts
        </py.SimpleInlineMemberComment>
      </>,
    ]);
    expect(res).toRenderTo(
      d`
          max_retries = 3  #: Maximum number of retry attempts
          `,
    );
  });
});

describe("New Documentation Components", () => {
  it("ModuleDoc renders correctly", () => {
    const res = toSourceText([
      <py.ModuleDoc
        description={[
          <Prose>
            This module demonstrates documentation as specified by the Google
            Python Style Guide.
          </Prose>,
        ]}
        attributes={[
          {
            name: "module_level_variable1",
            type: { children: "int" },
            children: "Module level variables may be documented.",
          },
        ]}
        examples={[<py.PyDocExample>print("mod")</py.PyDocExample>]}
        seeAlso={["another_module.func", "RelatedClass"]}
        warning="Internal API."
        deprecated="Use new_module instead."
        todo={[
          "For module TODOs",
          "You have to also use sphinx.ext.todo extension",
        ]}
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        This module demonstrates documentation as specified by the Google Python Style
        Guide.

        Attributes:
            module_level_variable1 (int): Module level variables may be documented.

        Examples:
            >> print("mod")

        See Also:
            another_module.func
            RelatedClass

        Warning:
            Internal API.

        Deprecated:
            Use new_module instead.

        Todo:
            * For module TODOs
            * You have to also use sphinx.ext.todo extension
        """


        `,
    );
  });

  it("PropertyDoc renders correctly", () => {
    const res = toSourceText([
      <py.PropertyDoc
        description={[
          <Prose>
            Properties should be documented in their getter method.
          </Prose>,
        ]}
        returns="str: The readonly property value."
        examples={[<py.PyDocExample>print(obj.name)</py.PyDocExample>]}
        seeAlso={["other_property"]}
        warning="Access may be slow."
        deprecated="Use full_name instead."
        note="If the setter method contains notable behavior, it should be mentioned here."
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        Properties should be documented in their getter method.

        Returns:
            str: The readonly property value.

        Examples:
            >> print(obj.name)

        See Also:
            other_property

        Warning:
            Access may be slow.

        Deprecated:
            Use full_name instead.

        Note:
            If the setter method contains notable behavior, it should be mentioned here.
        """


        `,
    );
  });

  it("GeneratorDoc renders correctly", () => {
    const res = toSourceText([
      <py.GeneratorDoc
        description={[
          <Prose>
            Generators have a Yields section instead of a Returns section.
          </Prose>,
        ]}
        parameters={[
          {
            name: "n",
            type: { children: "int" },
            doc: "The upper limit of the range to generate, from 0 to n - 1.",
          },
        ]}
        yields="int: The next number in the range of 0 to n - 1."
        examples={[<py.PyDocExample>print(next(gen))</py.PyDocExample>]}
        seeAlso={["make_generator"]}
        warning="Do not consume in tight loops without sleep."
        deprecated="Use new_generator instead."
        note="Examples should be written in doctest format."
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        Generators have a Yields section instead of a Returns section.

        Args:
            n (int): The upper limit of the range to generate, from 0 to n - 1.

        Yields:
            int: The next number in the range of 0 to n - 1.

        Examples:
            >> print(next(gen))

        See Also:
            make_generator

        Warning:
            Do not consume in tight loops without sleep.

        Deprecated:
            Use new_generator instead.

        Note:
            Examples should be written in doctest format.
        """


        `,
    );
  });

  it("ExceptionDoc renders correctly", () => {
    const res = toSourceText([
      <py.ExceptionDoc
        description={[
          <Prose>Exceptions are documented in the same way as classes.</Prose>,
        ]}
        parameters={[
          {
            name: "msg",
            type: { children: "str" },
            doc: "Human readable string describing the exception.",
          },
          {
            name: "code",
            type: { children: "int" },
            default: undefined,
            doc: "Error code.",
          },
        ]}
        attributes={[
          {
            name: "msg",
            type: { children: "str" },
            children: "Human readable string describing the exception.",
          },
          {
            name: "code",
            type: { children: "int" },
            children: "Exception error code.",
          },
        ]}
        seeAlso={["BaseException"]}
        deprecated="Use NewException instead."
        note="Do not include the 'self' parameter in the Args section."
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        Exceptions are documented in the same way as classes.

        Args:
            msg (str): Human readable string describing the exception.

            code (int): Error code.

        Attributes:
            msg (str): Human readable string describing the exception.

            code (int): Exception error code.

        See Also:
            BaseException

        Deprecated:
            Use NewException instead.

        Note:
            Do not include the 'self' parameter in the Args section.
        """


        `,
    );
  });

  it("MethodDoc renders correctly without default note", () => {
    const res = toSourceText([
      <py.MethodDoc
        description={[
          <Prose>Class methods are similar to regular functions.</Prose>,
        ]}
        parameters={[
          {
            name: "param1",
            doc: "The first parameter.",
          },
          {
            name: "param2",
            doc: "The second parameter.",
          },
        ]}
        returns="True if successful, False otherwise."
        overrides="Base.method"
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        Class methods are similar to regular functions.

        Args:
            param1: The first parameter.

            param2: The second parameter.

        Returns:
            True if successful, False otherwise.

        Overrides:
            Base.method
        """


        `,
    );
  });

  it("MethodDoc renders correctly with custom note", () => {
    const res = toSourceText([
      <py.MethodDoc
        description={[
          <Prose>Class methods are similar to regular functions.</Prose>,
        ]}
        parameters={[
          {
            name: "param1",
            doc: "The first parameter.",
          },
        ]}
        returns="True if successful, False otherwise."
        note="This method has special behavior when called multiple times."
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        Class methods are similar to regular functions.

        Args:
            param1: The first parameter.

        Returns:
            True if successful, False otherwise.

        Note:
            This method has special behavior when called multiple times.
        """


        `,
    );
  });

  it("ModuleDoc with minimal content", () => {
    const res = toSourceText([
      <py.ModuleDoc
        description={[<Prose>Simple module description.</Prose>]}
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        Simple module description.
        """


        `,
    );
  });

  it("ModuleDoc with only todo items", () => {
    const res = toSourceText([
      <py.ModuleDoc
        description={[<Prose>Module with pending tasks.</Prose>]}
        todo={["Implement feature X", "Add more tests", "Update documentation"]}
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        Module with pending tasks.

        Todo:
            * Implement feature X
            * Add more tests
            * Update documentation
        """


        `,
    );
  });

  it("PropertyDoc minimal (description only)", () => {
    const res = toSourceText([
      <py.PropertyDoc
        description={[<Prose>A simple readonly property.</Prose>]}
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        A simple readonly property.
        """


        `,
    );
  });

  it("PropertyDoc with getter and setter info", () => {
    const res = toSourceText([
      <py.PropertyDoc
        description={[
          <Prose>
            Properties with both a getter and setter should only be documented
            in their getter method.
          </Prose>,
        ]}
        returns=":obj:`list` of :obj:`str`: The property value."
        note="If the setter method contains notable behavior, it should be mentioned here."
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        Properties with both a getter and setter should only be documented in their
        getter method.

        Returns:
            :obj:\`list\` of :obj:\`str\`: The property value.

        Note:
            If the setter method contains notable behavior, it should be mentioned here.
        """


        `,
    );
  });

  it("GeneratorDoc with complex parameters", () => {
    const res = toSourceText([
      <py.GeneratorDoc
        description={[
          <Prose>
            A more complex generator example with multiple parameters.
          </Prose>,
        ]}
        parameters={[
          {
            name: "start",
            type: { children: "int" },
            default: "0",
            doc: "Starting value for the sequence.",
          },
          {
            name: "stop",
            type: { children: "int" },
            doc: "Ending value for the sequence (exclusive).",
          },
          {
            name: "step",
            type: { children: "int" },
            default: "1",
            doc: "Step size between values.",
          },
        ]}
        yields="int: The next number in the sequence."
        raises={[
          "ValueError: If step is zero.",
          "TypeError: If parameters are not integers.",
        ]}
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        A more complex generator example with multiple parameters.

        Args:
            start (int, optional): Starting value for the sequence. Defaults to "0".

            stop (int): Ending value for the sequence (exclusive).

            step (int, optional): Step size between values. Defaults to "1".

        Yields:
            int: The next number in the sequence.

        Raises:
            ValueError: If step is zero.

        Raises:
            TypeError: If parameters are not integers.
        """


        `,
    );
  });

  it("ExceptionDoc with comprehensive documentation", () => {
    const res = toSourceText([
      <py.ExceptionDoc
        description={[
          <Prose>A custom exception for authentication failures.</Prose>,
          <Prose>
            This exception is raised when authentication credentials are invalid
            or when authentication tokens have expired.
          </Prose>,
        ]}
        parameters={[
          {
            name: "message",
            type: { children: "str" },
            doc: "Human readable error message describing the authentication failure.",
          },
          {
            name: "error_code",
            type: { children: "int" },
            default: "401",
            doc: "HTTP error code associated with the authentication failure.",
          },
          {
            name: "retry_after",
            type: { children: "int" },
            default: undefined,
            doc: "Number of seconds to wait before retrying authentication.",
          },
        ]}
        attributes={[
          {
            name: "message",
            type: { children: "str" },
            children: "The error message.",
          },
          {
            name: "error_code",
            type: { children: "int" },
            children: "HTTP status code.",
          },
          {
            name: "retry_after",
            type: { children: "int" },
            children: "Retry delay in seconds, if applicable.",
          },
        ]}
        note="This exception should be caught and handled gracefully in production code."
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        A custom exception for authentication failures.

        This exception is raised when authentication credentials are invalid or when
        authentication tokens have expired.

        Args:
            message (str): Human readable error message describing the authentication
                failure.

            error_code (int, optional): HTTP error code associated with the
                authentication failure. Defaults to "401".

            retry_after (int): Number of seconds to wait before retrying authentication.

        Attributes:
            message (str): The error message.

            error_code (int): HTTP status code.

            retry_after (int): Retry delay in seconds, if applicable.

        Note:
            This exception should be caught and handled gracefully in production code.
        """


        `,
    );
  });

  it("MethodDoc with raises but no returns", () => {
    const res = toSourceText([
      <py.MethodDoc
        description={[
          <Prose>
            A method that performs an action but doesn't return a value.
          </Prose>,
        ]}
        parameters={[
          {
            name: "data",
            type: { children: "bytes" },
            doc: "Raw data to process.",
          },
        ]}
        raises={[
          "ValueError: If data is empty or invalid.",
          "IOError: If processing fails due to I/O issues.",
        ]}
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        A method that performs an action but doesn't return a value.

        Args:
            data (bytes): Raw data to process.

        Raises:
            ValueError: If data is empty or invalid.

        Raises:
            IOError: If processing fails due to I/O issues.
        """


        `,
    );
  });

  it("MethodDoc with no parameters", () => {
    const res = toSourceText([
      <py.MethodDoc
        description={[
          <Prose>A simple method with no parameters (except self).</Prose>,
        ]}
        returns="bool: True if the operation was successful."
        note="This is a parameterless method that only operates on instance state."
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        A simple method with no parameters (except self).

        Returns:
            bool: True if the operation was successful.

        Note:
            This is a parameterless method that only operates on instance state.
        """


        `,
    );
  });

  it("AttributeDoc standalone usage", () => {
    const res = toSourceText([
      <py.PyDoc>
        <py.AttributeDoc name="connection_timeout" type={{ children: "float" }}>
          Maximum time in seconds to wait for a connection to be established.
        </py.AttributeDoc>
      </py.PyDoc>,
    ]);

    expect(res).toRenderTo(
      d`
        """
        connection_timeout (float): Maximum time in seconds to wait for a connection to
            be established.
        """


        `,
    );
  });

  it("GeneratorDoc with examples in description", () => {
    const res = toSourceText([
      <py.GeneratorDoc
        description={[
          <Prose>
            Generators have a Yields section instead of a Returns section.
          </Prose>,
          <py.PyDocExample>
            print([i for i in example_generator(4)])
            <br />
            [0, 1, 2, 3]
          </py.PyDocExample>,
        ]}
        parameters={[
          {
            name: "n",
            type: { children: "int" },
            doc: "The upper limit of the range to generate, from 0 to n - 1.",
          },
        ]}
        yields="int: The next number in the range of 0 to n - 1."
        note="Examples should be written in doctest format, and should illustrate how to use the function."
      />,
    ]);

    expect(res).toRenderTo(
      d`
        """
        Generators have a Yields section instead of a Returns section.

        >> print([i for i in example_generator(4)])
        >> [0, 1, 2, 3]

        Args:
            n (int): The upper limit of the range to generate, from 0 to n - 1.

        Yields:
            int: The next number in the range of 0 to n - 1.

        Note:
            Examples should be written in doctest format, and should illustrate how to use the function.
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
        attributes={[
          {
            name: "attr1",
            type: { children: "str" },
            children: "Description of attr1.",
          },
          {
            name: "attr2",
            type: { children: "int" },
            children: "Description of attr2.",
          },
        ]}
        examples={[<py.PyDocExample>print("class-doc")</py.PyDocExample>]}
        seeAlso={["RelatedClass", "helper_function"]}
        warning="This class is experimental."
        deprecated="Use NewClass instead."
        parameters={[
          {
            name: "somebody",
            type: { children: "str" },
            default: "John Doe",
            doc: "Somebody's name. This can be any string representing a person, whether it's a first name, full name, nickname, or even a codename (e.g., 'Agent X'). It's used primarily for display purposes, logging, or greeting messages and is not required to be unique or validated unless specified by the caller.",
          },
          {
            name: "somebody2",
            type: { children: "str" },
            doc: "Somebody's name. This can be any string representing a person, whether it's a first name, full name, nickname, or even a codename (e.g., 'Agent X'). It's used primarily for display purposes, logging, or greeting messages and is not required to be unique or validated unless specified by the caller.",
          },
        ]}
        note="Do not include the 'self' parameter in the Args section."
        style="google"
      />
    );
    const res = toSourceText(
      [
        <py.ClassDeclaration name="A" doc={doc}>
          <py.StatementList>
            <py.VariableDeclaration name="just_name" />
            <py.VariableDeclaration
              name="name_and_type"
              type={{ children: "int" }}
            />
            <py.VariableDeclaration
              name="name_type_and_value"
              type={{ children: "int" }}
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

              Attributes:
                  attr1 (str): Description of attr1.

                  attr2 (int): Description of attr2.

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

              Examples:
                  >> print("class-doc")

              See Also:
                  RelatedClass
                  helper_function

              Warning:
                  This class is experimental.

              Deprecated:
                  Use NewClass instead.

              Note:
                  Do not include the 'self' parameter in the Args section.
              """
              just_name = None
              name_and_type: int = None
              name_type_and_value: int = 12


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
            type: { children: "str" } as py.SingleTypeExpressionProps,
            default: "John Doe",
            doc: "Somebody's name. This can be any string representing a person, whether it's a first name, full name, nickname, or even a codename (e.g., 'Agent X'). It's used primarily for display purposes, logging, or greeting messages and is not required to be unique or validated unless specified by the caller.",
          },
          {
            name: "somebody2",
            type: { children: "str" } as py.SingleTypeExpressionProps,
            doc: "Somebody's name. This can be any string representing a person, whether it's a first name, full name, nickname, or even a codename (e.g., 'Agent X'). It's used primarily for display purposes, logging, or greeting messages and is not required to be unique or validated unless specified by the caller.",
          },
        ]}
        returns="The return value. True for success, False otherwise."
        yields="int: The next number in the sequence."
        raises={["ValueError: If somebody2 is equal to somebody."]}
        note="This function can be used as both a regular function and a generator."
        style="google"
      />
    );
    const res = toSourceText(
      [
        <py.FunctionDeclaration name="some_function" doc={doc}>
          <py.StatementList>
            <py.VariableDeclaration name="just_name" />
            <py.VariableDeclaration
              name="name_and_type"
              type={{ children: "number" } as py.SingleTypeExpressionProps}
            />
            <py.VariableDeclaration
              name="name_type_and_value"
              type={{ children: "number" } as py.SingleTypeExpressionProps}
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

              Yields:
                  int: The next number in the sequence.

              Raises:
                  ValueError: If somebody2 is equal to somebody.

              Note:
                  This function can be used as both a regular function and a generator.
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
        <py.ClassEnumDeclaration
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
          RED = 1  #: The color red.
          GREEN = 2  #: The color green.
          BLUE = 3  #: The color blue.


    `;
    expect(result).toRenderTo(expected);
  });

  it("ModuleDoc with SourceFile integration", () => {
    const moduleDoc = (
      <py.ModuleDoc
        description={[
          <Prose>
            This module provides utility functions for data processing. It
            includes functions for validation, transformation, and analysis.
          </Prose>,
        ]}
        attributes={[
          {
            name: "DEFAULT_TIMEOUT",
            type: { children: "int" },
            children: "Default timeout value in seconds.",
          },
          {
            name: "MAX_RETRIES",
            type: { children: "int" },
            children: "Maximum number of retry attempts.",
          },
        ]}
        todo={["Add caching functionality", "Improve error messages"]}
        style="google"
      />
    );

    const content = (
      <py.SourceFile path="utils.py" doc={moduleDoc}>
        <py.VariableDeclaration name="DEFAULT_TIMEOUT" initializer={30} />
        <py.VariableDeclaration name="MAX_RETRIES" initializer={3} />
        <py.FunctionDeclaration name="process_data">
          pass
        </py.FunctionDeclaration>
      </py.SourceFile>
    );

    const res = toSourceTextMultiple([content]);
    const file = res.contents.find(
      (f) => f.kind === "file" && f.path === "utils.py",
    );
    expect(file).toBeDefined();

    assertFileContents(res, {
      "utils.py": d`
        """
        This module provides utility functions for data processing. It includes
        functions for validation, transformation, and analysis.

        Attributes:
            DEFAULT_TIMEOUT (int): Default timeout value in seconds.

            MAX_RETRIES (int): Maximum number of retry attempts.

        Todo:
            * Add caching functionality
            * Improve error messages
        """


        default_timeout = 30

        max_retries = 3

        def process_data():
            pass


        `,
    });
  });

  it("GeneratorDoc with FunctionDeclaration integration", () => {
    const generatorDoc = (
      <py.GeneratorDoc
        description={[
          <Prose>
            A generator function that yields fibonacci numbers. This is an
            efficient way to generate the sequence on demand.
          </Prose>,
        ]}
        parameters={[
          {
            name: "n",
            type: { children: "int" },
            doc: "Number of fibonacci numbers to generate.",
          },
        ]}
        yields="int: The next fibonacci number in the sequence."
        style="google"
      />
    );

    const result = toSourceText([
      <py.FunctionDeclaration name="fibonacci_generator" doc={generatorDoc}>
        yield 0
      </py.FunctionDeclaration>,
    ]);

    expect(result).toRenderTo(
      d`
        def fibonacci_generator():
            """
            A generator function that yields fibonacci numbers. This is an efficient way
            to generate the sequence on demand.

            Args:
                n (int): Number of fibonacci numbers to generate.

            Yields:
                int: The next fibonacci number in the sequence.
            """
            yield 0


        `,
    );
  });

  it("ExceptionDoc with ClassDeclaration integration", () => {
    const exceptionDoc = (
      <py.ExceptionDoc
        description={[
          <Prose>
            Custom exception raised when data validation fails. This exception
            includes details about the validation error.
          </Prose>,
        ]}
        attributes={[
          {
            name: "field_name",
            type: { children: "str" },
            children: "Name of the field that failed validation.",
          },
          {
            name: "error_code",
            type: { children: "int" },
            children: "Numeric error code for the validation failure.",
          },
        ]}
        style="google"
      />
    );

    const result = toSourceText([
      <py.ClassDeclaration
        name="ValidationError"
        bases={["Exception"]}
        doc={exceptionDoc}
      >
        <py.StatementList>
          <py.VariableDeclaration
            name="field_name"
            type={{ children: "str" }}
          />
          <py.VariableDeclaration
            name="error_code"
            type={{ children: "int" }}
          />
        </py.StatementList>
      </py.ClassDeclaration>,
    ]);

    expect(result).toRenderTo(
      d`
        class ValidationError(Exception):
            """
            Custom exception raised when data validation fails. This exception includes
            details about the validation error.

            Attributes:
                field_name (str): Name of the field that failed validation.

                error_code (int): Numeric error code for the validation failure.
            """
            field_name: str = None
            error_code: int = None


        `,
    );
  });

  it("PropertyDoc with FunctionDeclaration (as property method) integration", () => {
    const propertyDoc = (
      <py.PropertyDoc
        description={[
          <Prose>
            The full name of the person, combining first and last name. This
            property automatically formats the name with proper capitalization.
          </Prose>,
        ]}
        style="google"
      />
    );

    const result = toSourceText([
      <py.ClassDeclaration name="Person">
        <py.PropertyDeclaration
          name="full_name"
          doc={propertyDoc}
          type={{ children: "str" }}
        >
          return "John Doe"
        </py.PropertyDeclaration>
      </py.ClassDeclaration>,
    ]);

    expect(result).toRenderTo(
      d`
        class Person:
            @property
            def full_name(self) -> str:
                """
                The full name of the person, combining first and last name. This
                property automatically formats the name with proper capitalization.
                """
                return "John Doe"





        `,
    );
  });

  it("MethodDoc with FunctionDeclaration (inside class) integration", () => {
    const methodDoc = (
      <py.MethodDoc
        description={[
          <Prose>
            Validates the input data according to the defined schema. This
            method performs comprehensive validation including type checking.
          </Prose>,
        ]}
        parameters={[
          {
            name: "data",
            type: { children: "dict" },
            doc: "The data dictionary to validate.",
          },
          {
            name: "strict",
            type: { children: "bool" },
            default: "True",
            doc: "Whether to enforce strict validation rules.",
          },
        ]}
        returns="bool: True if validation passes, False otherwise."
        raises={["ValidationError: If data format is invalid."]}
        note="This method modifies the internal validation state."
        style="google"
      />
    );

    const result = toSourceText([
      <py.ClassDeclaration name="DataValidator">
        <py.MethodDeclaration
          name="validate"
          doc={methodDoc}
          parameters={[
            { name: "data", type: { children: "dict" } },
            { name: "strict", type: { children: "bool" }, default: true },
          ]}
          returnType={{ children: "bool" }}
        >
          return self.validate(data, strict)
        </py.MethodDeclaration>
      </py.ClassDeclaration>,
    ]);

    expect(result).toRenderTo(
      d`
        class DataValidator:
            def validate(self, data: dict, strict: bool = True) -> bool:
                """
                Validates the input data according to the defined schema. This method
                performs comprehensive validation including type checking.

                Args:
                    data (dict): The data dictionary to validate.

                    strict (bool, optional): Whether to enforce strict validation rules.
                        Defaults to "True".

                Returns:
                    bool: True if validation passes, False otherwise.

                Raises:
                    ValidationError: If data format is invalid.

                Note:
                    This method modifies the internal validation state.
                """
                return self.validate(data, strict)



        `,
    );
  });
});
