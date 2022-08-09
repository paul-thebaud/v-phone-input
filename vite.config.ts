import deepmerge from 'deepmerge';
import path from 'path';
import { defineConfig, UserConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify';
import rootConfig from './vite.root.config';

export default defineConfig(deepmerge(rootConfig as UserConfig, {
  root: path.join(__dirname, 'dev'),
  plugins: [
    vuetify(),
  ],
  build: {
    sourcemap: true,
    emptyOutDir: true,
    outDir: path.join(__dirname, 'dist_demo'),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['../tests/unit/**/*.spec.ts'],
    deps: { inline: ['vuetify'] },
    setupFiles: [
      '../tests/unit/setup/vitest.vuetify.setup.ts',
    ],
    coverage: {
      reportsDirectory: '../coverage-unit',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,vue}'],
      exclude: [
        '**/*.setup.ts',
        '**/*.d.ts',
      ],
      all: true,
    },
  },
}));
