// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
// import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static',
  outDir: './dist',
  server: {
    port: 4201
  },
  devToolbar: {
    enabled: false
  },
  build: {
    format: 'directory'
  }
  // vite: {
  //   plugins: [tailwindcss()],
  // }
});