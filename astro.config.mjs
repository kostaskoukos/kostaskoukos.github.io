import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: "https://kostaskoukos.github.io",
  integrations: [tailwind({ applyBaseStyles: true })],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { displayMode: true }]],
    shikiConfig: {
      themes: {
        dark: "github-dark-default",
        light: "github-light-default",
      },
    },
  },
});
