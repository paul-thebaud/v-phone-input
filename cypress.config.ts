import initCoverageTask from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:5173',
    supportFile: './tests/e2e/support/e2e.ts',
    specPattern: 'tests/e2e/**/*.spec.{ts,js}',
    setupNodeEvents(on, config) {
      initCoverageTask(on, config);

      return config;
    },
  },
});
