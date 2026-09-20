# Portfólió

Statikus portfólióoldal Astro + Tailwind CSS alapon, magyar és angol nyelven.
A kimenet sima HTML/CSS/JS, tehát bármilyen tárhelyen elfut — a nethely.hu-n is,
ahol nincs Node futtatókörnyezet.

## Indítás

```bash
npm install
cp .env.example .env   # majd írd be a saját értékeidet
npm run dev      # http://localhost:4321
npm run build    # a kész oldal a dist/ mappába kerül
npm run preview  # a buildelt oldal megtekintése
```

## Mit hol kell átírni?

| Mit | Hol |
|---|---|
| Név, pozíció, bemutatkozás, skillek, linkek | `src/data/site.ts` |
| Az oldalon megjelenő e-mail-cím | `CONTACT_EMAIL` környezeti változó (helyben `.env`, deployban GitHub-változó) |
| Felületi szövegek (gombok, űrlap, címkék) mindkét nyelven | `src/i18n/ui.ts` |
| Projektek | `src/content/projects/*.md` — fájlonként egy projekt |
| Színek, betűtípusok | `src/styles/global.css` (`@theme` blokk) |
| Domain | `astro.config.mjs` → `site`, és `public/robots.txt` |
| Kapcsolati űrlap címzettje és feladója | GitHub: `MAIL_TO` titok és `CONTACT_EMAIL` változó — a deploy ebből generálja a `mail-config.php`-t |

### Új projekt felvétele

Hozz létre egy új `.md` fájlt a `src/content/projects/` mappában:

```markdown
---
title:
  hu: "Projekt neve"
  en: "Project name"
summary:
  hu: "Egy-két mondat: mit old meg, és mi volt benne a nehéz."
  en: "One or two sentences: what it solves and what was hard."
year: 2025
tech: ["C#", ".NET 8"]
repo: "https://github.com/felhasznalonev/repo"
demo: "https://demo.pelda.hu"        # elhagyható
images:                               # elhagyható; képek a public/images/projects/ alá
  - "/images/projects/kep-1.png"       # az első a borítókép
  - "/images/projects/kep-2.png"       # több kép esetén a kártyán lapozható
featured: true                        # false = nem jelenik meg a főoldalon
order: 1                              # kisebb szám = előrébb
---
```

A képek ideális mérete 1280×720 (16:9).

## Hiányzó fájlok

Ezeket még be kell tenned a `public/` mappába:

- `cv-kiraly-roland-hu.pdf` és `cv-kiraly-roland-en.pdf` — önéletrajzok

## SEO

- **Címek és leírások** nyelvenként az `src/i18n/ui.ts`-ben (`meta.title`,
  `meta.description`). A cím 60, a leírás 160 karakter alatt maradjon.
- **Strukturált adat** (JSON-LD `Person` és `WebSite`) a `src/layouts/Base.astro`-ban
  készül a `site.ts` adataiból — nem kell külön karbantartani.
- **Megosztási kép:** `public/og.png`. Ha a név vagy a pozíció változik, újragenerálható:
  ```bash
  node scripts/generate-og.mjs
  ```
- **Sitemap** buildkor készül, a két nyelvet `hreflang` kapcsolatokkal összekötve.
- **`public/.htaccess`**: saját 404-es oldal és hosszú gyorsítótár a hash-elt fájlokra.
- `meta keywords` szándékosan nincs: a Google évek óta figyelmen kívül hagyja.

## Élesítés a nethely.hu-ra

**Kézzel:** `npm run build`, majd a `dist/` mappa **tartalmát** töltsd fel
SFTP-vel a tárhely webgyökerébe (`/web` vagy `/public_html`).
A `public/mail.php` automatikusan a `dist/` gyökerébe kerül, a szerver PHP-ja futtatja.
Kézi feltöltésnél mellé egy `mail-config.php` is kell:

```php
<?php
return ['to' => 'ide-erkeznek@pelda.hu', 'from' => 'letezo-cim@domain.hu'];
```

**GitHub Actions-szel:** a `.github/workflows/deploy.yml` buildel, legenerálja a
`mail-config.php`-t, és feltölt. A repóban ezeket kell beállítani
(*Settings → Secrets and variables → Actions*):

| Típus | Név | Mi ez |
|---|---|---|
| Secret | `SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD` | SFTP-belépés |
| Secret | `MAIL_TO` | ide érkeznek az űrlap üzenetei |
| Secret | `RECAPTCHA_SECRET` | reCAPTCHA v3 titkos kulcs (elhagyható) |
| Variable | `SFTP_PATH` | a célmappa, pl. `/` |
| Variable | `CONTACT_EMAIL` | az oldalon megjelenő cím és az űrlap feladója |
| Variable | `RECAPTCHA_SITE_KEY` | reCAPTCHA v3 publikus kulcs (elhagyható) |

A nethelynél a feladónak (`CONTACT_EMAIL`) a tárhelyen létező e-mail-címnek
vagy aliasnak kell lennie, különben a szerver eldobja a levelet.

HTTPS-t a nethely admin felületén, ingyenes Let's Encrypt tanúsítvánnyal kapcsolj be.

## Spamvédelem

Az űrlapot egy rejtett csapdamező és opcionálisan a **reCAPTCHA v3** védi. A v3
nem kérdez semmit a látogatótól, csak pontoz a háttérben.

1. Kulcspár igénylése: <https://www.google.com/recaptcha/admin> → *reCAPTCHA v3*,
   domainként `kiroland.hu` (fejlesztéshez `localhost` is felvehető).
2. A publikus kulcs a `RECAPTCHA_SITE_KEY`, a titkos a `RECAPTCHA_SECRET`.
3. Kulcsok nélkül az űrlap ugyanúgy működik, csak captcha-ellenőrzés nélkül.

A `mail.php` akkor fogadja el a beküldést, ha a Google válasza sikeres, az
action `contact`, és a pontszám eléri a `recaptcha_min_score` értéket (0.5).
Ha a Google nem érhető el, az üzenet átmegy — jobb egy kihagyott ellenőrzés,
mint egy elveszett megkeresés. Ez a naplóba bekerül.

## Megjegyzések

- A betűtípusok (Geist, Geist Mono) a projekt részeként települnek, nincs külső
  Google Fonts kérés — így GDPR szempontból is rendben van.
- A kapcsolati űrlap JavaScript nélkül is működik: olyankor a `mail.php`
  egy egyszerű visszajelző oldalt ad.
- Az oldal szándékosan csak sötét témájú. Ha kell világos változat is,
  a `global.css` tokenjeit kell megduplázni `prefers-color-scheme` alatt.
