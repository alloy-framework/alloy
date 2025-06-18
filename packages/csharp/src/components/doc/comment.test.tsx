import { describe, expect, it } from "vitest";
import {
  DocC,
  DocCode,
  DocComment,
  DocDescription,
  DocExample,
  DocException,
  DocInclude,
  DocList,
  DocPara,
  DocParam,
  DocParamRef,
  DocPermission,
  DocRemarks,
  DocReturns,
  DocSee,
  DocSeeAlso,
  DocSummary,
  DocTypeParam,
  DocTypeParamRef,
  DocValue,
} from "./comment.jsx";

it("define summary", () => {
  expect(
    <DocComment>
      <DocSummary>This is a sample doc comment</DocSummary>
    </DocComment>,
  ).toRenderTo(`
    /// <summary>
    /// This is a sample doc comment
    /// </summary>
  `);
});

it("define code", () => {
  expect(
    <DocComment>
      <DocCode>code sample</DocCode>
    </DocComment>,
  ).toRenderTo(`
    /// <code>
    /// code sample
    /// </code>
  `);
});

it("define c", () => {
  expect(
    <DocComment>
      <DocC>inline code</DocC>
    </DocComment>,
  ).toRenderTo(`
    /// <c>inline code</c>
  `);
});

it("define example", () => {
  expect(
    <DocComment>
      <DocExample>example usage</DocExample>
    </DocComment>,
  ).toRenderTo(`
    /// <example>
    /// example usage
    /// </example>
  `);
});

it("define exception", () => {
  expect(
    <DocComment>
      <DocException>exception info</DocException>
    </DocComment>,
  ).toRenderTo(`
    /// <exception>
    /// exception info
    /// </exception>
  `);
});

it("define include", () => {
  expect(
    <DocComment>
      <DocInclude file="external.xml" path="/doc/summary" />
    </DocComment>,
  ).toRenderTo(`
    /// <include file="external.xml" path="/doc/summary" />
  `);
});

it("define param", () => {
  expect(
    <DocComment>
      <DocParam name="x">parameter x</DocParam>
    </DocComment>,
  ).toRenderTo(`
    /// <param name="x">parameter x</param>
  `);
});

it("define typeparam", () => {
  expect(
    <DocComment>
      <DocTypeParam name="T">type parameter T</DocTypeParam>
    </DocComment>,
  ).toRenderTo(`
    /// <typeparam name="T">type parameter T</typeparam>
  `);
});

it("define returns", () => {
  expect(
    <DocComment>
      <DocReturns>return value</DocReturns>
    </DocComment>,
  ).toRenderTo(`
    /// <returns>
    /// return value
    /// </returns>
  `);
});

it("define remarks", () => {
  expect(
    <DocComment>
      <DocRemarks>remarks here</DocRemarks>
    </DocComment>,
  ).toRenderTo(`
    /// <remarks>
    /// remarks here
    /// </remarks>
  `);
});

it("define value", () => {
  expect(
    <DocComment>
      <DocValue>property value</DocValue>
    </DocComment>,
  ).toRenderTo(`
    /// <value>
    /// property value
    /// </value>
  `);
});

it("define permission", () => {
  expect(
    <DocComment>
      <DocPermission>permission info</DocPermission>
    </DocComment>,
  ).toRenderTo(`
    /// <permission>
    /// permission info
    /// </permission>
  `);
});

it("define list", () => {
  expect(
    <DocComment>
      <DocList type="bullet" items={["item 1", "item 2", "item 3"]} />
    </DocComment>,
  ).toRenderTo(`
    /// <list type="bullet">
    ///   <item><description>item 1</description></item>
    ///   <item><description>item 2</description></item>
    ///   <item><description>item 3</description></item>
    /// </list>
  `);
});

it("define description", () => {
  expect(
    <DocComment>
      <DocDescription>description content</DocDescription>
    </DocComment>,
  ).toRenderTo(`
    /// <description>
    /// description content
    /// </description>
  `);
});

it("define para", () => {
  expect(
    <DocComment>
      <DocPara>paragraph content</DocPara>
    </DocComment>,
  ).toRenderTo(`
    /// <para>
    /// paragraph content
    /// </para>
  `);
});

describe("define see", () => {
  it("with cref", () => {
    expect(
      <DocComment>
        <DocSee cref="T:MyType" />
      </DocComment>,
    ).toRenderTo(`
      /// <see cref="T:MyType" />
    `);
  });

  it("with href", () => {
    expect(
      <DocComment>
        <DocSee href="https://github.com" />
      </DocComment>,
    ).toRenderTo(`
      /// <see href="https://github.com" />
    `);
  });
  it("with href and children", () => {
    expect(
      <DocComment>
        <DocSee href="https://github.com">GitHub</DocSee>
      </DocComment>,
    ).toRenderTo(`
      /// <see href="https://github.com">GitHub</see>
    `);
  });

  it("with langword", () => {
    expect(
      <DocComment>
        <DocSee langword="keyword" />
      </DocComment>,
    ).toRenderTo(`
      /// <see langword="keyword" />
    `);
  });
});

describe("define seealso", () => {
  it("with cref", () => {
    expect(
      <DocComment>
        <DocSeeAlso cref="T:OtherType" />
      </DocComment>,
    ).toRenderTo(`
      /// <seealso cref="T:OtherType" />
    `);
  });

  it("with href", () => {
    expect(
      <DocComment>
        <DocSeeAlso href="https://github.com" />
      </DocComment>,
    ).toRenderTo(`
      /// <seealso href="https://github.com" />
    `);
  });

  it("with children", () => {
    expect(
      <DocComment>
        <DocSeeAlso cref="T:OtherType">OtherType</DocSeeAlso>
      </DocComment>,
    ).toRenderTo(`
      /// <seealso cref="T:OtherType">OtherType</seealso>
    `);
  });
});

it("define paramref", () => {
  expect(
    <DocComment>
      <DocParamRef name="x" />
    </DocComment>,
  ).toRenderTo(`
    /// <paramref name="${"x"}" />
  `);
});

it("define typeparamref", () => {
  expect(
    <DocComment>
      <DocTypeParamRef name="T" />
    </DocComment>,
  ).toRenderTo(`
    /// <typeparamref name="T" />
  `);
});

it("wrap long summary", () => {
  expect(
    <DocComment>
      <DocSummary>
        This is a very long sample doc comment that exceeds the typical line
        length limit and should be wrapped appropriately in the generated
        documentation.
      </DocSummary>
    </DocComment>,
  ).toRenderTo(`
    /// <summary>
    /// This is a very long sample doc comment that exceeds the typical line length limit
    /// and should be wrapped appropriately in the generated documentation.
    /// </summary>
  `);
});

it("combine multiple tags", () => {
  expect(
    <DocComment>
      <DocSummary>
        This operator determines whether two Points have the same location.
      </DocSummary>
      <DocParam name="p1">The first Point to be compared.</DocParam>
      <DocParam name="p2">The second Point to be compared.</DocParam>
      <DocReturns>
        True if the Points do not have the same location and the exact same
        type; otherwise, false.
      </DocReturns>
      <DocSeeAlso cref="Equals" />
      <DocSeeAlso cref="operator==" />
    </DocComment>,
  ).toRenderTo(`
    /// <summary>
    /// This operator determines whether two Points have the same location.
    /// </summary>
    /// <param name="p1">The first Point to be compared.</param>
    /// <param name="p2">The second Point to be compared.</param>
    /// <returns>
    /// True if the Points do not have the same location and the exact same type; otherwise,
    /// false.
    /// </returns>
    /// <seealso cref="Equals" />
    /// <seealso cref="operator==" />
  `);
});
