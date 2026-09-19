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
    'work.all': 'Minden projekt a GitHubon',
    'gallery.prev': 'Előző kép',
    'gallery.next': 'Következő kép',
    'gallery.image': 'kép',
    'gallery.goto': 'Ugrás a képre:',
    'gallery.enlarge': 'Kép nagyítása',
    'gallery.close': 'Bezárás',
    'meta.title': 'portfólió',
    'meta.description': 'Full-stack fejlesztő portfóliója — projektek, szakterület, elérhetőség.',
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
    'work.all': 'All projects on GitHub',
    'gallery.prev': 'Previous image',
    'gallery.next': 'Next image',
    'gallery.image': 'image',
    'gallery.goto': 'Go to image',
    'gallery.enlarge': 'Enlarge image',
    'gallery.close': 'Close',
    'meta.title': 'portfolio',
    'meta.description': 'Portfolio of a full-stack developer — projects, expertise, contact.',
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
