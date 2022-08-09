import initCoverageTask from '@cypress/code-coverage/task';
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/dist/plugin';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:4173',
    supportFile: './tests/e2e/support/e2e.ts',
    specPattern: 'tests/e2e/**/*.spec.{ts,js}',
    setupNodeEvents(on, config) {
      initCoverageTask(on, config);
      getCompareSnapshotsPlugin(on, config);

      return config;
    },
  },
});
