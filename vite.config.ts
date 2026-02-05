/// <reference types="vitest/config" />
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import istanbul from "vite-plugin-istanbul";

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: [path.resolve(__dirname, "src")],
    }),
    ...(isDev
      ? [
          istanbul({
            cypress: true,
            nycrcPath: "./.nycrc.json",
          }),
        ]
      : []),
  ],
  build: {
    minify: false,
    cssMinify: false,
    sourcemap: isDev,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VPhoneInput",
      fileName: "v-phone-input",
    },
    rollupOptions: {
      preserveEntrySignatures: "strict",
      external: ["awesome-phonenumber", "vue", "vuetify", "vuetify/components"],
      output: {
        globals: {
          vue: "Vue",
          vuetify: "Vuetify",
          "vuetify/components": "Vuetify",
          "awesome-phonenumber": "PhoneNumber",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    server: {
      deps: {
        inline: ["vuetify"],
      },
    },
    coverage: {
      reportsDirectory: "coverage/unit",
      reporter: ["text", "json", "html", "lcov", "clover"],
    },
  },
});
