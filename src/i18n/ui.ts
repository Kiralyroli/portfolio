import type { Lang } from '../data/site';

/** Felületi szövegek. Új szöveg: vedd fel mindkét nyelvhez. */
export const ui = {
  hu: {
    'nav.about': 'Bemutatkozás',
    'nav.skills': 'Szakterület',
    'nav.work': 'Munkák',
    'nav.contact': 'Kapcsolat',
    'cta.contact': 'Kapcsolat',
    'cta.cv': 'Önéletrajz',
    'cta.github': 'GitHub',
    'cta.repo': 'Forráskód',
    'cta.demo': 'Élő demó',
    'contact.heading': 'Kapcsolatfelvétel',
    'contact.form.name': 'Név',
    'contact.form.email': 'E-mail',
    'contact.form.message': 'Üzenet',
    'contact.form.send': 'Küldés',
    'contact.form.sending': 'Küldés…',
    'contact.form.ok': 'Köszönöm, megkaptam az üzenetet. Hamarosan válaszolok.',
    'contact.form.error': 'Nem sikerült elküldeni. Írj inkább közvetlenül e-mailben.',
    'contact.form.nojs': 'Az űrlaphoz JavaScript kell. Ha ki van kapcsolva, írj közvetlenül e-mailben.',
    'recaptcha.notice': 'Az űrlapot a Google reCAPTCHA védi:',
    'recaptcha.privacy': 'adatvédelem',
    'recaptcha.terms': 'feltételek',
    'work.all': 'Minden projekt a GitHubon',
    'gallery.prev': 'Előző kép',
    'gallery.next': 'Következő kép',
    'gallery.image': 'kép',
    'gallery.goto': 'Ugrás a képre:',
    'gallery.enlarge': 'Kép nagyítása',
    'gallery.close': 'Bezárás',
    'nav.label': 'Szekciók',
    'gallery.screenshot': 'képernyőkép',
    'meta.title': 'Király Roland — Full Stack fejlesztő | PHP, Symfony, React',
    'meta.description': 'Full stack fejlesztő 2019 óta: webshopok, ERP- és API-integrációk PHP és Symfony alapon, React, Node.js és TypeScript. Projektek, szakterület, elérhetőség.',
    'meta.ogAlt': 'Király Roland — Full Stack fejlesztő portfóliója',
    '404.title': 'Nincs ilyen oldal',
    '404.body': 'A keresett oldal nem található. Lehet, hogy elírás történt, vagy régi linkre kattintottál.',
    '404.back': 'Vissza a főoldalra',
    'skip': 'Ugrás a tartalomra',
  },
  en: {
    'nav.about': 'About',
    'nav.skills': 'Expertise',
    'nav.work': 'Work',
    'nav.contact': 'Contact',
    'cta.contact': 'Get in touch',
    'cta.cv': 'Résumé',
    'cta.github': 'GitHub',
    'cta.repo': 'Source',
    'cta.demo': 'Live demo',
    'contact.heading': 'Get in touch',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send',
    'contact.form.sending': 'Sending…',
    'contact.form.ok': 'Thank you, your message arrived. I will reply soon.',
    'contact.form.error': 'Could not send. Please email me directly instead.',
    'contact.form.nojs': 'This form needs JavaScript. If it is disabled, please email me directly.',
    'recaptcha.notice': 'This form is protected by Google reCAPTCHA:',
    'recaptcha.privacy': 'privacy',
    'recaptcha.terms': 'terms',
    'work.all': 'All projects on GitHub',
    'gallery.prev': 'Previous image',
    'gallery.next': 'Next image',
    'gallery.image': 'image',
    'gallery.goto': 'Go to image',
    'gallery.enlarge': 'Enlarge image',
    'gallery.close': 'Close',
    'nav.label': 'Sections',
    'gallery.screenshot': 'screenshot',
    'meta.title': 'Király Roland — Full Stack Developer | PHP, Symfony, React',
    'meta.description': 'Full stack developer since 2019: webshops, ERP and API integrations on PHP and Symfony, plus React, Node.js and TypeScript. Projects, expertise, contact.',
    'meta.ogAlt': 'Portfolio of Király Roland, full stack developer',
    '404.title': 'Page not found',
    '404.body': 'The page you are looking for does not exist. It may be a typo or an old link.',
    '404.back': 'Back to the homepage',
    'skip': 'Skip to content',
  },
} as const;

export type UIKey = keyof (typeof ui)['hu'];

/** t('nav.about') stílusú fordító az adott nyelvhez. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key];
  };
}

/** Az aktuális nyelv az URL-ből (/en/... => 'en'). */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' ? 'en' : 'hu';
}

/** Nyelvhelyes útvonal: path('/#kapcsolat', 'en') => '/en/#kapcsolat' */
export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'hu' ? clean : `/en${clean === '/' ? '/' : clean}`;
}
