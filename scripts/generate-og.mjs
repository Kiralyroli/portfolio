/**
 * Az og.png előállítása (1200×630), az oldal színvilágával.
 * Futtatás:  node scripts/generate-og.mjs
 * A kimenet a public/og.png fájlba kerül, és a repóba is bekerül.
 */
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const W = 1200;
const H = 630;

const C = {
  ground: '#0B0D11',
  side: '#0C1216',
  line: '#1E222A',
  grid: '#121A1F',
  tx: '#EAECEF',
  mu: '#98A0AB',
  fa: '#666E7A',
  accent: '#E4C98F',
};

const name = 'Király Roland';
const role = 'FULL STACK FEJLESZTŐ';
const tagline = 'Webshopok, ERP- és API-integrációk — PHP-tól a Node.js-ig';
const domain = 'kiroland.hu';

// Függőleges rácsvonalak, mint az oldalon
const gridLines = Array.from({ length: 6 }, (_, i) => {
  const x = Math.round(((i + 1) * W) / 7);
  return `<rect x="${x}" y="0" width="1" height="${H}" fill="${C.grid}"/>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.ground}"/>
  ${gridLines}
  <rect x="0" y="0" width="14" height="${H}" fill="${C.accent}"/>

  <g font-family="DejaVu Sans, Verdana, Arial, sans-serif">
    <rect x="96" y="150" width="14" height="14" fill="${C.accent}"/>
    <text x="126" y="163" fill="${C.accent}" font-size="22" letter-spacing="4"
          font-family="DejaVu Sans Mono, Consolas, monospace">${role}</text>

    <text x="96" y="290" fill="${C.tx}" font-size="92" font-weight="600" letter-spacing="-2">${name}</text>

    <text x="96" y="356" fill="${C.mu}" font-size="30">${tagline}</text>

    <rect x="96" y="430" width="1008" height="1" fill="${C.line}"/>

    <text x="96" y="492" fill="${C.fa}" font-size="24"
          font-family="DejaVu Sans Mono, Consolas, monospace">PHP · Symfony · TypeScript · React · Node.js</text>
    <text x="1104" y="492" fill="${C.accent}" font-size="26" text-anchor="end"
          font-family="DejaVu Sans Mono, Consolas, monospace">${domain}</text>
  </g>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile('public/og.png', png);

const { width, height, size } = await sharp(png).metadata();
console.log(`public/og.png kész: ${width}×${height}, ${Math.round(size / 1024)} KB`);
