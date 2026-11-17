// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { defaultLocale, locales } from './src/i18n/config.ts';
import responsiveContent from './src/lib/responsive-content.mjs';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	// Fetch pages on navigation; avoid speculative downloads on static hosting.
	prefetch: false,
	markdown: {
		processor: satteri({ hastPlugins: [responsiveContent] }),
	},
	i18n: {
		defaultLocale,
		locales: [...locales],
		routing: { prefixDefaultLocale: false },
	},
});
