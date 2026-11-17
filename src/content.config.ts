import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { locales } from './i18n/config';

export const collections = {
	work: defineCollection({
		// Keep matching paths in es/ and en/ to pair each project's content.
		loader: glob({ base: './src/content/work', pattern: `{${locales.join(',')}}/**/*.md` }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
		}),
	}),
};
