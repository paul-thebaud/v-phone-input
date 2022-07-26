import deepmerge from 'deepmerge';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import rootConfig from './vite.root.config';

export default defineConfig(deepmerge(rootConfig, {
  plugins: [
    dts({
      include: [path.resolve(__dirname, 'src')],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VPhoneInput',
      fileName: 'v-phone-input',
    },
    rollupOptions: {
      external: [
        'vue',
        'vuetify',
        'vuetify/lib',
        'awesome-phonenumber',
        'country-telephone-data',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
}));
