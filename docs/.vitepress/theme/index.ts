import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "virtual:group-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "./style.css";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#263FD1",
          background: "#ffffff",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#6E83FF",
          background: "#1b1b1f",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    VTextField: { color: "primary" },
  },
});

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // "layout-top": () => h(Banner),
    });
  },
  enhanceApp({ app }) {
    app.use(vuetify);
  },
} satisfies Theme;
