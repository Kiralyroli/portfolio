# Portfólió

Statikus portfólióoldal Astro + Tailwind CSS alapon, magyar és angol nyelven.
A kimenet sima HTML/CSS/JS, tehát bármilyen tárhelyen elfut — a nethely.hu-n is,
ahol nincs Node futtatókörnyezet.

## Indítás

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # a kész oldal a dist/ mappába kerül
npm run preview  # a buildelt oldal megtekintése
```

## Mit hol kell átírni?

| Mit | Hol |
|---|---|
| Név, pozíció, bemutatkozás, skillek, linkek, e-mail | `src/data/site.ts` |
| Felületi szövegek (gombok, űrlap, címkék) mindkét nyelven | `src/i18n/ui.ts` |
| Projektek | `src/content/projects/*.md` — fájlonként egy projekt |
| Színek, betűtípusok | `src/styles/global.css` (`@theme` blokk) |
| Domain | `astro.config.mjs` → `site`, és `public/robots.txt` |
| Kapcsolati űrlap címzettje | `public/mail.php` → `$to` |

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
- `og.png` — 1200×630-as kép a közösségi megosztáshoz
- `images/projects/*.png` — projekt képernyőképek

## Élesítés a nethely.hu-ra

**Kézzel:** `npm run build`, majd a `dist/` mappa **tartalmát** töltsd fel
SFTP-vel a tárhely webgyökerébe (`/web` vagy `/public_html`).
A `public/mail.php` automatikusan a `dist/` gyökerébe kerül, a szerver PHP-ja futtatja.

**Automatikusan:** a `.github/workflows/deploy.yml` minden `main`-re pushnál
buildel és feltölt. Ehhez a GitHub repóban be kell állítani a titkokat
(`SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD`, `SFTP_PATH`) — a fájl tetején
le van írva.

HTTPS-t a nethely admin felületén, ingyenes Let's Encrypt tanúsítvánnyal kapcsolj be.

## Megjegyzések

- A betűtípusok (Geist, Geist Mono) a projekt részeként települnek, nincs külső
  Google Fonts kérés — így GDPR szempontból is rendben van.
- A kapcsolati űrlap JavaScript nélkül is működik: olyankor a `mail.php`
  egy egyszerű visszajelző oldalt ad.
- Az oldal szándékosan csak sötét témájú. Ha kell világos változat is,
  a `global.css` tokenjeit kell megduplázni `prefers-color-scheme` alatt.
