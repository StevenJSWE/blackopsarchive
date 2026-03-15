import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const articles = defineCollection({
	loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
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

export const collections = { blog, articles };
