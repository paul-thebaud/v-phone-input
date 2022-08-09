import deepmerge from 'deepmerge';
import path from 'path';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import rootConfig from './vite.root.config';

export default defineConfig(deepmerge(rootConfig as UserConfig, {
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
        assetFileNames: (assetInfo) => (
          assetInfo.name == 'style.css' ? 'v-phone-input.css' : assetInfo.name
        ),
        globals: {
          vue: 'Vue',
          'awesome-phonenumber': 'PhoneNumber',
          'country-telephone-data': 'CountryTelephoneData',
        },
      },
    },
  },
}));
