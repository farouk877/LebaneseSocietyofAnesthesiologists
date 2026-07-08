import { z } from 'zod';

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1)
});

const textCardSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

const presidentMessageSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string(),
  body: z.array(z.string().min(1)).min(1),
  signerName: z.string().min(1),
  signerTitle: z.string(),
  image: z.string().min(1),
  imageAlt: z.string().min(1)
});

export const siteSchema = z.object({
  societyName: z.string().min(1),
  logo: z.object({
    src: z.string().min(1),
    alt: z.string()
  }),
  hero: z.object({
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    subheading: z.string().min(1),
    image: z.string().min(1),
    imageAlt: z.string().min(1),
    primaryCta: linkSchema,
    secondaryCta: linkSchema.optional()
  }),
  navigation: z.array(linkSchema).min(1),
  about: z.object({
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
    milestones: z.array(textCardSchema).default([])
  }),
  mission: z.object({
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    cards: z.array(textCardSchema).min(1)
  }),
  presidentMessage: presidentMessageSchema,
  board: z.object({
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string()
  }),
  resources: z.object({
    eyebrow: z.string().min(1),
    heading: z.string(),
    intro: z.string()
  }),
  mailingList: z.object({
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    description: z.string().min(1),
    buttonLabel: z.string().min(1),
    placeholderEmail: z.string().min(1),
    endpoint: z.union([z.literal(''), z.url()]),
    consentLabel: z.string().min(1),
    successMessage: z.string().min(1),
    errorMessage: z.string().min(1),
    configurationMessage: z.string().min(1)
  }),
  contact: z.object({
    organization: z.string().min(1),
    email: z.string(),
    address: z.string(),
    phone: z.string()
  }),
  socialLinks: z.array(linkSchema),
  footer: z.object({
    missionStatement: z.string().min(1),
    quickLinks: z.array(linkSchema).min(1),
    text: z.string().min(1)
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    canonicalUrl: z.url(),
    socialImage: z.string().min(1)
  })
});

export type SiteSettings = z.infer<typeof siteSchema>;
