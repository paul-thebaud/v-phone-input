import path from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  plugins: [
    createVuePlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
