import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Kétnyelvű szövegmező. */
const bilingual = z.object({ hu: z.string(), en: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  // Az `image()` az Astro képkezelőjét használja: több méret és srcset készül belőle
  schema: ({ image }) => z.object({
    title: bilingual,
    summary: bilingual,
    year: z.number(),
    tech: z.array(z.string()),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    /** Képek a src/assets/projects/ mappából, relatív úttal. Az első a borítókép. */
    images: z.array(image()).default([]),
    /** Csak a true értékűek jelennek meg a főoldalon. */
    featured: z.boolean().default(true),
    /** Kisebb szám = előrébb. */
    order: z.number().default(99),
  }),
});

export const collections = { projects };
