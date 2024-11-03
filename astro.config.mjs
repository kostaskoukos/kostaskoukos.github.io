import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://kostaskoukos.github.io",
  integrations: [tailwind({ applyBaseStyles: true })],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "github-dark-default",
        light: "github-light-default",
      },
    },
  },
});
