import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.koparkapawlowski.pl',
  build: {
    format: 'directory',
    // Wszystkie style i skrypty jako pliki zewnętrzne — wymóg ścisłego CSP (script-src 'self')
    inlineStylesheets: 'never'
  },
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  },
  integrations: [sitemap()]
});
