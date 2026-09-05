// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { satteri } from "@astrojs/markdown-satteri";
import satteriCallouts from "satteri-callouts";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://kostaskoukos.github.io",
  integrations: [sitemap()],
  image: { responsiveStyles: true },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: satteri({
      hastPlugins: [satteriCallouts()],
    }),
  },
});
