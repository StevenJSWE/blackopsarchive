import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    era: z.string(),
    country: z.array(z.string()),
    category: z.array(z.string()),
    lat: z.number(),
    lng: z.number(),
    summary: z.string(),
    sources: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    ),
  }),
});

export const collections = { articles };
