// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLlmsTxt from "starlight-llms-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://alloy-framework.github.io",
  base: "/alloy",
  integrations: [
    starlight({
      title: "Alloy",
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/alloy-framework/alloy",
        },
      ],
      plugins: [
        starlightLlmsTxt({
          projectName: "Alloy",
          description:
            "Alloy is a code generation framework. You define output structure and content using JSX components, and Alloy renders them into formatted source files.",
          pageSeparator: "\n\n---PAGE_BREAK---\n\n",
          minify: { whitespace: false },
          customSets: [
            {
              label: "Core",
              description: "Core framework API reference",
              paths: ["reference/core/**"],
            },
            {
              label: "TypeScript",
              description: "TypeScript emitter API reference",
              paths: ["reference/typescript/**"],
            },
            {
              label: "Python",
              description: "Python emitter API reference",
              paths: ["reference/python/**"],
            },
            {
              label: "CSharp",
              description: "C# emitter API reference",
              paths: ["reference/csharp/**"],
            },
            {
              label: "Go",
              description: "Go emitter API reference",
              paths: ["reference/go/**"],
            },
            {
              label: "Java",
              description: "Java emitter API reference",
              paths: ["reference/java/**"],
            },
            {
              label: "JSON",
              description: "JSON emitter API reference",
              paths: ["reference/json/**"],
            },
          ],
        }),
      ],
      sidebar: [
        { label: "Getting started", slug: "guides/getting-started" },
        { label: "Basic concepts", slug: "guides/basic-concepts" },
        {
          label: "Example walkthrough",
          slug: "guides/typescript-walkthrough",
        },
        {
          label: "Diagnosing issues",
          slug: "guides/diagnosing-issues",
        },
        {
          label: "@alloy-js/core",
          autogenerate: { directory: "reference/core", collapsed: true },
        },
        {
          label: "@alloy-js/core/testing",
          autogenerate: {
            directory: "reference/core/testing",
            collapsed: true,
          },
        },
        {
          label: "@alloy-js/typescript",
          autogenerate: {
            directory: "reference/typescript",
            collapsed: true,
          },
        },
        {
          label: "@alloy-js/python",
          autogenerate: { directory: "reference/python", collapsed: true },
        },
        {
          label: "@alloy-js/csharp",
          autogenerate: { directory: "reference/csharp", collapsed: true },
        },
        {
          label: "@alloy-js/go",
          autogenerate: { directory: "reference/go", collapsed: true },
        },
        {
          label: "@alloy-js/java",
          autogenerate: { directory: "reference/java", collapsed: true },
        },
        {
          label: "@alloy-js/json",
          autogenerate: { directory: "reference/json", collapsed: true },
        },
      ],
    }),
  ],
});
