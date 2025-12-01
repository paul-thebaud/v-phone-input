import codeCoverageTask from "@cypress/code-coverage/task";
import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin';

export default defineConfig({
  video: false,
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      getCompareSnapshotsPlugin(on, config);

      return config;
    },
  },
});
