import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const hunqzProxy = {
  target: 'https://www.hunqz.com',
  changeOrigin: true,
  secure: true,
  rewrite: (path: string) => path.replace(/^\/hunqz-api/, '/api/opengrid'),
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/hunqz-api': hunqzProxy,
    },
  },
  preview: {
    port: 4173,
    proxy: {
      '/hunqz-api': hunqzProxy,
    },
  },
});
