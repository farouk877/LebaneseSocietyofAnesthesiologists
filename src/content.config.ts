import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const resourceCategories = [
  'guidelines',
  'lsa-events',
  'university-resources',
  'article-of-the-month'
] as const;

const statusValues = ['draft', 'published', 'archived'] as const;

const board = defineCollection({
  loader: glob({ base: './src/content/board', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    specialty: z.string().optional(),
    professionalTitle: z.string().optional(),
    institution: z.string().optional(),
    cardBio: z.string().optional(),
    email: z.union([z.email(), z.literal('')]).optional(),
    linkedinUrl: z.union([z.url(), z.literal('')]).optional(),
    photo: z.string().optional(),
    photoAlt: z.string().optional(),
    order: z.number().int().nonnegative().default(0),
    active: z.boolean().default(true)
  })
});

const resources = defineCollection({
  loader: glob({ base: './src/content/resources', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    category: z.enum(resourceCategories),
    summary: z.string().min(1),
    date: z.coerce.date(),
    source: z.string().optional(),
    externalUrl: z.union([z.url(), z.literal('')]).optional(),
    file: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(statusValues).default('draft'),
    order: z.number().int().nonnegative().optional()
  })
});

export const collections = {
  board,
  resources
};
