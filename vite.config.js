import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
        `
      }
    }
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  base: process.env.NODE_ENV === "production" ? "/marulic/" : "/"
});
