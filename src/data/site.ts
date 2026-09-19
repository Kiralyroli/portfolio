/**
 * Minden személyes adat egy helyen.
 * Ezt a fájlt kell átírnod — a komponensekhez nem kell hozzányúlni.
 */

import { CONTACT_EMAIL } from 'astro:env/server';

export const site = {
  // --- alapadatok -------------------------------------------------
  name: 'Király Roland',
  initials: 'KR',
  // A CONTACT_EMAIL környezeti változóból (lásd .env.example)
  email: CONTACT_EMAIL,
  location: { hu: 'Szeged', en: 'Szeged, Hungary' },

  role: {
    hu: 'Full Stack fejlesztő',
    en: 'Full Stack Developer',
  },

  // Egy mondat az oldalsávba
  tagline: {
    hu: 'Webshopokat, integrációkat és a mögöttük futó rendszereket építek — PHP-tól a Node.js-ig.',
    en: 'I build webshops, integrations and the systems behind them — from PHP to Node.js.',
  },

  // A "Bemutatkozás" szekció bekezdései
  about: {
    hu: [
      '2019 óta dolgozom full stack fejlesztőként. Webshopokat építek, és összekötöm őket azokkal a rendszerekkel, amikre egy online vállalkozás épül: ERP-kkel, beszállítói rendszerekkel, számlázókkal, marketingeszközökkel. Integrációs rendszereket is fejlesztek, amelyek kétirányú szinkronnal mozgatják a termék-, készlet- és rendelésadatokat — REST és SOAP API-kon, webhookokon és fájlalapú importokon keresztül. A napi munkám PHP, egyedi rendszerekben és Symfonyn, OpenCart, Shoprenter és UNAS platformokkal.',
      'A kódon túl a teljes fejlesztési folyamatot is szeretem rendben tartani — CI/CD, szerverautomatizálás, adatmigráció. Fontos nekem a tiszta, objektumorientált kód és az előre átgondolt terv, és hogy a kész megoldás mérhető üzleti értéket adjon.',
      'Napi szinten AI-asszisztált fejlesztéssel dolgozom: az AI-eszközök gyorsítják a prototípus-készítést, a tesztelést és a refaktorálást, így több időm jut a tervezésre és a döntésekre. Közben folyamatosan nyitok új területek felé — Node.js és TypeScript alapú valós idejű alkalmazások, C#, mobilapp- és játékfejlesztés. A saját projektjeim között két böngészőben futó, multiplayer 3D autós játék is van.',
    ],
    en: [
      'I have been working as a full stack developer since 2019. I build webshops and connect them to the systems an online business runs on: ERPs, supplier systems, invoicing tools and marketing platforms. I also develop integration systems that move product, stock and order data with two-way sync — over REST and SOAP APIs, webhooks and file-based imports. My daily work is PHP, in custom-built systems and on Symfony, with OpenCart, Shoprenter and UNAS.',
      'Beyond the code, I like keeping the whole development process in shape — CI/CD, server automation, data migration. I care about clean, object-oriented code and a plan thought through in advance, and about the finished solution delivering measurable business value.',
      'I work with AI-assisted development every day: AI tools speed up prototyping, testing and refactoring, which leaves me more time for design and decisions. Meanwhile I keep moving into new areas — real-time applications with Node.js and TypeScript, C#, mobile and game development. My own projects include two multiplayer 3D car games that run in the browser.',
    ],
  },

  // --- linkek -----------------------------------------------------
  links: {
    github: 'https://github.com/Kiralyroli',
    linkedin: 'https://www.linkedin.com/in/roland-kir%C3%A1ly-1b4b58235/',
  },

  // Tedd a PDF-eket a public/ mappába, és írd be az elérési útjukat.
  // Üresen hagyva az Önéletrajz gomb nem jelenik meg.
  cv: {
    hu: '',
    en: '',
  },

  // --- szakterület ------------------------------------------------
  // Tetszőleges számú csoport. Az elem lehet sima szöveg (mindkét nyelven ugyanaz)
  // vagy { hu, en } pár, ha fordítani kell.
  // A `learning: true` csoport halványabban, "most tanulom" jelleggel jelenik meg.
  skills: [
    {
      label: { hu: 'Backend', en: 'Backend' },
      items: ['PHP', { hu: 'Egyedi PHP-architektúra', en: 'Custom PHP architecture' }, 'Symfony', 'CakePHP', 'Node.js', 'MySQL', { hu: 'Ütemezett és háttérfeladatok', en: 'Scheduled and background jobs' }],
    },
    {
      label: { hu: 'Frontend', en: 'Frontend' },
      items: ['JavaScript', 'TypeScript', 'HTML', 'CSS / SCSS', 'Twig', 'Bootstrap', 'Vite'],
    },
    {
      label: { hu: 'API-k, integrációk', en: 'APIs, integrations' },
      items: ['REST API', 'SOAP / WSDL', 'OAuth 2.0', { hu: 'Webhookok', en: 'Webhooks' }, { hu: 'CSV / XML import mezőpárosítással', en: 'CSV / XML import with field mapping' }, 'SFTP', 'Icecat', 'TecDoc', { hu: 'MNB árfolyam', en: 'MNB exchange rates' }],
    },
    {
      label: { hu: 'E-kereskedelem, ERP', en: 'E-commerce, ERP' },
      items: ['Shoprenter', 'UNAS', 'Shopify', 'OpenCart', 'Octopus 8', 'Novodata', 'Cobra', 'Kulcs-Soft', 'Barion'],
    },
    {
      label: { hu: 'AI', en: 'AI' },
      items: [{ hu: 'OpenAI API — termékleírás, fordítás, SEO-szöveg', en: 'OpenAI API — product copy, translation, SEO text' }, { hu: 'AI-asszisztált fejlesztés Claude Code segítségével', en: 'AI-assisted development with Claude Code' }],
    },
    {
      label: { hu: 'DevOps', en: 'DevOps' },
      items: ['CI/CD', { hu: 'VPS-üzemeltetés', en: 'VPS operations' }, 'Docker', 'Fly.io', 'Git', { hu: 'Automatizált tesztelés (Playwright)', en: 'Automated testing (Playwright)' }],
    },
    {
      label: { hu: 'Marketing, termékfeedek', en: 'Marketing, product feeds' },
      items: ['Google Analytics 4', 'Google Tag Manager', 'Klaviyo', 'Google Shopping feed', { hu: 'Meta katalógus', en: 'Meta catalog' }, { hu: 'Árukereső feed', en: 'Árukereső feed' }],
    },
    {
      label: { hu: 'Mobil', en: 'Mobile' },
      items: ['Kotlin', 'Jetpack Compose', 'Android'],
    },
    {
      label: { hu: 'Valós idejű 3D', en: 'Real-time 3D' },
      items: ['Three.js', { hu: 'Rapier fizikamotor', en: 'Rapier physics' }, 'WebSocket', 'Colyseus'],
    },
    {
      label: { hu: 'Most tanulom', en: 'Currently learning' },
      items: ['C#', { hu: 'Játékfejlesztés', en: 'Game development' }],
      learning: true,
    },
  ],
} as const;

export type Lang = 'hu' | 'en';
