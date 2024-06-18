import deepmerge from 'deepmerge';
import { defineConfig, UserConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import rootConfig from './vite.config';

export default defineConfig(deepmerge(rootConfig as UserConfig, {
  define: {
    __E2E_TEST__: true,
  },
  plugins: [
    istanbul({
      include: ['src/**/*', 'dev/**/*'],
      exclude: ['node_modules', 'tests/'],
      extension: ['.ts', '.vue'],
      forceBuildInstrument: true,
    }),
  ],
}));
