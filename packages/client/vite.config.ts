import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylelint from 'vite-plugin-stylelint';
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    host: '0.0.0.0',
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react(), stylelint()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      router: path.resolve(__dirname, './src/router'),
      style_constants: path.resolve(__dirname, './src/_constants.scss'),
      assets: path.resolve(__dirname, 'src', 'assets'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  esbuild: {
    define: {
      this: 'window',
    },
  },
});
