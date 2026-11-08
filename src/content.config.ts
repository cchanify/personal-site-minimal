import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';
import { parse } from 'yaml';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Resource lists (src/data/*.yaml): each entry is a section of links.
const resourceSection = z.object({
  order: z.number(),
  title: z.string(),
  items: z.array(z.object({
    title: z.string(),
    url: z.url().optional(),
    before: z.string().optional(), // text before the link
    after: z.string().optional(),  // text after the link
  })),
});

const resources = (name: string) =>
  defineCollection({
    // Record each section's position so pages keep the file's order.
    loader: file(`src/data/${name}.yaml`, {
      parser: (text) => parse(text).map((section: object, order: number) => ({ ...section, order })),
    }),
    schema: resourceSection,
  });

export const collections = {
  blog,
  security: resources('security'),
  ai: resources('ai'),
  links: resources('links'),
};
