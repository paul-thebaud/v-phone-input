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
}));
