// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Alloy",
      social: {
        github: "https://github.com/alloy-framework/alloy",
      },
      plugins: [],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Getting started", slug: "guides/getting-started" },
            { label: "Basic concepts", slug: "guides/basic-concepts" },
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
