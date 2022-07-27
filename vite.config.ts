import deepmerge from 'deepmerge';
import path from 'path';
import { ComponentResolverObject } from 'unplugin-vue-components';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import components from 'unplugin-vue-components/vite';
import { defineConfig, UserConfig } from 'vite';
import rootConfig from './vite.root.config';

const vuetifyResolver = VuetifyResolver() as ComponentResolverObject;

export default defineConfig(deepmerge(rootConfig as UserConfig, {
  root: path.join(__dirname, 'dev'),
  plugins: [
    components({
      resolvers: [
        (name) => {
          if (!name.startsWith('VPhone')) {
            return vuetifyResolver.resolve(name);
          }
        },
      ],
      dts: false,
    }),
  ],
  build: {
    outDir: path.join(__dirname, 'dist_demo'),
  },
  test: {
    environment: 'jsdom',
    include: ['../tests/unit/**/*.spec.ts'],
    setupFiles: [
      '../tests/unit/setup/vitest.vue.setup.ts',
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
