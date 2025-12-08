import { mdiApi, mdiArrowTopRight } from "@mdi/js";
import type Markdown from "markdown-it";
import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import typedocSidebar from "../api/typedoc-sidebar.json";

const autoLinkIconPlugin = (md: Markdown) => {
  const renderIcon = (icon: string, title: string) => {
    const iconSvg = `<svg class="svg-icon" viewBox="0 0 24 24"><path fill="currentColor" d="${icon}" /></svg>`;

    return `<span role="img" title="${title}">${iconSvg}</span>`;
  };

  md.renderer.rules.autoLinkIcon = (tokens, idx) => tokens[idx]?.content ?? "";
  md.core.ruler.after("linkify", "autoLinkIcon", (state) => {
    state.tokens.forEach((token) => {
      if (token.type !== "inline") {
        return;
      }

      if (token.children) {
        let childrenTokens = token.children;
        for (let index = childrenTokens.length - 1; index >= 0; index--) {
          const childToken = childrenTokens[index];
          if (childToken?.type === "link_close") {
            const href = childrenTokens
              .slice(0, index)
              .findLast(({ type }) => type === "link_open")
              ?.attrGet("href");
            if (href) {
              let iconToken: InstanceType<(typeof state)["Token"]> | null =
                null;
              if (href.startsWith("https://") || href.startsWith("http://")) {
                iconToken = new state.Token("autoLinkIcon", "", 0);
                iconToken.content = renderIcon(
                  mdiArrowTopRight,
                  "(in new tab)",
                );
              } else if (href.startsWith("/api")) {
                iconToken = new state.Token("autoLinkIcon", "", 0);
                iconToken.content = renderIcon(mdiApi, "(in API reference)");
              }

              if (iconToken) {
                token.children = childrenTokens = md.utils.arrayReplaceAt(
                  childrenTokens,
                  index,
                  [iconToken, childToken],
                );
              }
            }
          }
        }
      }
    });
  });
};

export default defineConfig({
  title: "VPhoneInput",
  description:
    "International phone input for Vuetify, reusable phone input composable for Vue.",
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
      md.use(autoLinkIconPlugin);
    },
  },
  cleanUrls: true,
  srcExclude: ["**/api-handwritten/**/*"],
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    plugins: [groupIconVitePlugin()],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: { provider: 'local' },
    nav: [
      {
        text: "Guide",
        link: "/guide/getting-started",
      },
      {
        text: "Playground",
        link: "/playground",
      },
      {
        text: "Links",
        items: [
          {
            text: "Changelog",
            link: "https://github.com/paul-thebaud/v-phone-input/blob/main/CHANGELOG.md",
          },
          {
            text: "Issues",
            link: "https://github.com/paul-thebaud/v-phone-input/issues",
          },
          {
            text: "NPM",
            link: "https://www.npmjs.com/package/v-phone-input",
          },
        ],
      },
      {
        text: "v6.x",
        items: [
          {
            text: "v5.x / Vuetify prior 3.10",
            link: "https://github.com/paul-thebaud/v-phone-input/blob/v5.1.1/README.md",
          },
          {
            text: "v2.x / Vuetify 2",
            link: "https://github.com/paul-thebaud/v-phone-input/blob/2.x.x/README.md",
          },
        ],
      },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          {
            text: "Getting started",
            link: "/guide/getting-started",
          },
          {
            text: "Component",
            link: "/guide/component",
          },
          {
            text: "Composable",
            link: "/guide/composable",
          },
          {
            text: "Features",
            items: [
              {
                text: "Phone formatting",
                link: "/guide/formatting",
              },
              {
                text: "Phone validation",
                link: "/guide/validation",
              },
              {
                text: "Labels localization",
                link: "/guide/localization",
              },
              {
                text: "Country detection",
                link: "/guide/country-detection",
              },
              {
                text: "Country display (flags)",
                link: "/guide/country-display",
              },
              {
                text: "Country autocomplete",
                link: "/guide/country-autocomplete",
              },
              {
                text: "Countries list",
                link: "/guide/countries-list",
              },
            ],
          },
          {
            text: "Migration to v6",
            link: "/guide/migration",
          },
          {
            text: "Contributing",
            link: "/guide/contributing",
          },
        ],
      },
      {
        text: "Try it online",
        items: [
          {
            text: "Playground",
            link: "/playground",
          },
          {
            text: "StackBlitz",
            items: [
              {
                text: "Component",
                link: "https://stackblitz.com/edit/v-phone-input?file=src%2FApp.vue&terminal=dev",
              },
              {
                text: "Composable",
                link: "https://stackblitz.com/edit/v-phone-input-composable?file=src%2FApp.vue&terminal=dev",
              },
            ],
          },
        ],
      },
      {
        text: "API reference",
        items: [
          {
            text: "VPhoneInput",
            link: "/api/variables/VPhoneInput",
          },
          {
            text: "usePhoneInput",
            link: "/api/functions/usePhoneInput",
          },
          ...typedocSidebar,
        ],
      },
    ],

    outline: [2, 3],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/paul-thebaud/v-phone-input",
      },
      { icon: "npm", link: "https://www.npmjs.com/package/v-phone-input" },
    ],

    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    },
  },
});
