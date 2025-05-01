import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://127.0.0.1:4173',
    supportFile: './tests/e2e/support/e2e.ts',
    specPattern: 'tests/e2e/**/*.spec.{ts,js}',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
  },
});
