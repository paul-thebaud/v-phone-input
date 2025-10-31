import codeCoverageTask from "@cypress/code-coverage/task";
import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);

      return config;
    },
  },
});
