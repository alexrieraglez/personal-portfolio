import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n/config';

/** The path after es/ or en/ identifies the same project in both languages. */
export function getWorkSlug(entry: CollectionEntry<'work'>): string {
	return entry.id.slice(entry.id.indexOf('/') + 1);
}

export async function getWork(locale: Locale): Promise<CollectionEntry<'work'>[]> {
	const entries = await getCollection('work');
	const projects = new Map<string, CollectionEntry<'work'>>();

	// Spanish defines the available projects. English can override each entry independently.
	for (const entry of entries.filter((entry) => entry.id.startsWith(`${defaultLocale}/`))) {
		projects.set(getWorkSlug(entry), entry);
	}
	if (locale !== defaultLocale) {
		for (const entry of entries.filter((entry) => entry.id.startsWith(`${locale}/`))) {
			const slug = getWorkSlug(entry);
			if (!projects.has(slug)) {
				throw new Error(`Missing ${defaultLocale} source for work entry: ${entry.id}`);
			}
			projects.set(slug, entry);
		}
	}

	return [...projects.values()].sort(
		(a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
	);
}
