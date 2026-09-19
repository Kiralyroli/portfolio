// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Cseréld a végleges domainre (a sitemap és az OG-linkek ezt használják)
  site: 'https://kiroland.hu', // TODO: ellenőrizd, hogy ide kerül-e a portfólió

  i18n: {
    defaultLocale: 'hu',
    locales: ['hu', 'en'],
    routing: {
      // A magyar a gyökéren él (/), az angol az /en/ alatt
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});