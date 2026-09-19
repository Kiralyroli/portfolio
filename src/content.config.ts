import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Kétnyelvű szövegmező. */
const bilingual = z.object({ hu: z.string(), en: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: bilingual,
    summary: bilingual,
    year: z.number(),
    tech: z.array(z.string()),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    /** Képek a public/images/projects/ mappából; több kép esetén lapozható. Az első a borítókép. */
    images: z.array(z.string()).default([]),
    /** Csak a true értékűek jelennek meg a főoldalon. */
    featured: z.boolean().default(true),
    /** Kisebb szám = előrébb. */
    order: z.number().default(99),
  }),
});

export const collections = { projects };
