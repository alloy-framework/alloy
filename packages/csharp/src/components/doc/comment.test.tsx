import { expect, it } from "vitest";
import {
  DocC,
  DocCode,
  DocComment,
  DocCompletionList,
  DocDescription,
  DocExample,
  DocException,
  DocInclude,
  DocItem,
  DocList,
  DocPara,
  DocParam,
  DocParamRef,
  DocPermission,
  DocRemarks,
  DocResponse,
  DocReturns,
  DocSee,
  DocSeeAlso,
  DocSummary,
  DocTerm,
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
    /// <c>
    /// inline code
    /// </c>
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
      <>{DocInclude({ file: "external.xml", path: "/doc/summary" })}</>
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

it("define response", () => {
  expect(
    <DocComment>
      <DocResponse>response info</DocResponse>
    </DocComment>,
  ).toRenderTo(`
    /// <response>
    /// response info
    /// </response>
  `);
});

it("define completionlist", () => {
  expect(
    <DocComment>
      <DocCompletionList>completion list</DocCompletionList>
    </DocComment>,
  ).toRenderTo(`
    /// <completionlist>
    /// completion list
    /// </completionlist>
  `);
});

it("define list", () => {
  expect(
    <DocComment>
      <DocList>list content</DocList>
    </DocComment>,
  ).toRenderTo(`
    /// <list>
    /// list content
    /// </list>
  `);
});

it("define item", () => {
  expect(
    <DocComment>
      <DocItem>item content</DocItem>
    </DocComment>,
  ).toRenderTo(`
    /// <item>
    /// item content
    /// </item>
  `);
});

it("define term", () => {
  expect(
    <DocComment>
      <DocTerm>term content</DocTerm>
    </DocComment>,
  ).toRenderTo(`
    /// <term>
    /// term content
    /// </term>
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

it("define see", () => {
  expect(
    <DocComment>
      <>{DocSee({ cref: "T:MyType" })}</>
    </DocComment>,
  ).toRenderTo(`
    /// <see cref="T:MyType" />
  `);
});

it("define seealso", () => {
  expect(
    <DocComment>
      <>{DocSeeAlso({ cref: "T:OtherType" })}</>
    </DocComment>,
  ).toRenderTo(`
    /// <seealso cref="T:OtherType" />
  `);
});

it("define paramref", () => {
  expect(
    <DocComment>
      <>{DocParamRef({ name: "x" })}</>
    </DocComment>,
  ).toRenderTo(`
    /// <paramref name="x" />
  `);
});

it("define typeparamref", () => {
  expect(
    <DocComment>
      <>{DocTypeParamRef({ name: "T" })}</>
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
    /// True if the Points do not have the same location and the exact same type; otherwise, false.
    /// </returns>
    /// <seealso cref="Equals" />
    /// <seealso cref="operator==" />
  `);
});
