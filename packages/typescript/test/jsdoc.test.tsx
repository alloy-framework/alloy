import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { JSDoc } from "../src/components/JSDoc.jsx";
import { JSDocComment } from "../src/components/JSDocComment.jsx";
import { JSDocExample } from "../src/components/JSDocExample.jsx";
import { JSDocParagraph } from "../src/components/JSDocParagraph.jsx";
import { FunctionCallExpression } from "../src/index.js";

describe("JSDoc", () => {
  it("formats properly", () => {
    const template = (
      <JSDocComment>
        Hello!
        <hbr />
        <hbr />
        This is another line
      </JSDocComment>
    );

    expect(template).toRenderTo(
      d`
      /**
       * Hello!
       *
       * This is another line
       **/
    `,
      { printWidth: 40 },
    );
  });
});

describe("JSDocParagraph", () => {
  it("formats properly", () => {
    const template = (
      <JSDoc>
        <JSDocParagraph>
          This is a long paragraph that should end up being broken into multiple
          paragraphs. Moreover, the line breaks in this paragraph should not be
          carried over into the JSDoc comment.
        </JSDocParagraph>
        <JSDocParagraph>
          This is another paragraph. There should be a couple breaks in front of
          it.
        </JSDocParagraph>
      </JSDoc>
    );

    expect(template).toRenderTo(
      d`
        /**
         * This is a long paragraph that should
         * end up being broken into multiple
         * paragraphs. Moreover, the line breaks
         * in this paragraph should not be
         * carried over into the JSDoc comment.
         *
         * This is another paragraph. There
         * should be a couple breaks in front of
         * it.
         **/
      `,
      { printWidth: 40 },
    );
  });
});

describe("JSDocExample", () => {
  it("creates unfenced code samples", () => {
    const template = (
      <JSDoc>
        <JSDocParagraph>
          This API is awesome, and it comes with an example!
        </JSDocParagraph>
        <JSDocExample>console.log("Hello world!")</JSDocExample>
      </JSDoc>
    );

    expect(template).toRenderTo(
      d`
      /**
       * This API is awesome, and it comes
       * with an example!
       *
       * @example
       * console.log("Hello world!")
       **/
      `,
      { printWidth: 40 },
    );
  });

  it("creates fenced code samples", () => {
    const template = (
      <JSDoc>
        <JSDocParagraph>
          This API is awesome, and it comes with an example!
        </JSDocParagraph>
        <JSDocExample fenced language="ts">
          console.log("Hello world!")
        </JSDocExample>
      </JSDoc>
    );

    expect(template).toRenderTo(
      d`
      /**
       * This API is awesome, and it comes
       * with an example!
       *
       * @example
       * \`\`\`ts
       * console.log("Hello world!")
       * \`\`\`
       **/
      `,
      { printWidth: 40 },
    );
  });

  it("creates code samples using other components", () => {
    const template = (
      <JSDoc>
        <JSDocParagraph>
          This API is awesome, and it comes with an example!
        </JSDocParagraph>
        <JSDocExample language="ts">
          // make a function call.
          <hbr />
          <FunctionCallExpression
            target="console.log"
            args={["arg1", "arg2"]}
          />
          ;
        </JSDocExample>
      </JSDoc>
    );

    expect(template).toRenderTo(
      d`
      /**
       * This API is awesome, and it comes
       * with an example!
       *
       * @example
       * // make a function call.
       * console.log(arg1, arg2);
       **/
      `,
      { printWidth: 40 },
    );
  });
});
