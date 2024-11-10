/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        base: {
          css: {
            pre: {
              fontSize: "0.9em",
            },
          },
        },
        sm: {
          css: {
            pre: {
              fontSize: "1em",
            },
          },
        },
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text)",
            "--tw-prose-bold": "var(--text)",
            "--tw-prose-headings": "var(--text)",
            "--tw-prose-code": "var(--text)",
            "--tw-prose-links": "var(--text)",
            "--tw-prose-quotes": "var(--text)",
          },
        },
      },
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
