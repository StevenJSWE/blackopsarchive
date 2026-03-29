import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title:    z.string(),
    date:     z.coerce.date(),
    era:      z.string(),
    country:  z.array(z.string()),
    agency:   z.array(z.string()),
    category: z.array(z.string()),
    status:   z.enum(["confirmed", "alleged", "disputed"]),
    lat:      z.number(),
    lng:      z.number(),
    summary:  z.string(),
    sources:  z.array(
      z.object({
        label: z.string(),
        url:   z.string(),
      })
    ),
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { articles };
