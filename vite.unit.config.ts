import deepmerge from 'deepmerge';
import path from 'path';
import { defineConfig, UserConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import rootConfig from './vite.config';

export default defineConfig(deepmerge(rootConfig as UserConfig, {
  root: path.join(__dirname, 'src'),
  plugins: [
    istanbul(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['../tests/unit/**/*.spec.ts'],
    server: { deps: { inline: ['vuetify'] } },
    setupFiles: [
      '../tests/unit/setup/vitest.vuetify.setup.ts',
    ],
    coverage: {
      provider: 'istanbul',
      reportsDirectory: '../coverage-unit',
      reporter: ['text', 'json', 'html', 'lcov', 'clover'],
    },
  },
}));
