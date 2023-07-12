import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      router: path.resolve(__dirname, './src/router'),
      style_constants: path.resolve(__dirname, './src/_constants.scss'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      api: path.resolve(__dirname, 'src', 'api'),
      hooks: path.resolve(__dirname, 'src', 'hooks'),
      app: path.resolve(__dirname, 'src', 'app'),
      hocs: path.resolve(__dirname, 'src', 'hocs'),
      utils: path.resolve(__dirname, 'src', 'utils'),
    },
  },
});
