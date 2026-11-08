// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://connorhanify.com',
  output: 'static',
  compressHTML: true, // keep Astro 6 whitespace behavior
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
});