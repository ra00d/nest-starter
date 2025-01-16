import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
console.log(resolve('./src/resource/assets/spa/src/*'));

export default defineConfig({
  // plugins: [react()],
  // root:""
  // root: resolve(process.cwd(), 'client'),

  build: {
    assetsDir: '',
    outDir: './dist/client',
    manifest: true,
    rollupOptions: {
      input: './client/react/index.tsx',
    },
  },
  publicDir: '',
  resolve: {
    alias: {
      '@': resolve('./client/react/'),
    },
  },
});
