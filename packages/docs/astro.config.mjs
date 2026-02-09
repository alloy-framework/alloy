// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Alloy",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/alloy-framework/alloy",
        },
      ],
      plugins: [],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
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
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
