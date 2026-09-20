// @ts-check
import { defineConfig, envField } from 'astro/config';
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

  // Környezeti változók. Kötelezők: ha hiányoznak, a build hibával leáll.
  // Helyben a .env fájlból jönnek (minta: .env.example), a deployban a GitHub-változókból.
  env: {
    schema: {
      CONTACT_EMAIL: envField.string({ context: 'server', access: 'public' }),
      // reCAPTCHA v3 publikus kulcs. Ha nincs megadva, az űrlap captcha nélkül megy.
      RECAPTCHA_SITE_KEY: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // A sitemapban is szerepeljen, hogy a két nyelv ugyanannak az oldalnak a változata
      i18n: {
        defaultLocale: 'hu',
        locales: { hu: 'hu-HU', en: 'en-US' },
      },
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
  ],
});