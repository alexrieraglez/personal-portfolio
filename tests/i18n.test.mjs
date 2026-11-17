import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { before, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const dist = join(projectRoot, 'dist');
const locales = ['es', 'en'];
const origin = 'https://portfolio.test';
let projectSlugs;
let pages;

function markdownSlugs(directory, prefix = '') {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const relativePath = `${prefix}${entry.name}`;
		if (entry.isDirectory()) {
			return markdownSlugs(join(directory, entry.name), `${relativePath}/`);
		}
		return entry.name.endsWith('.md') ? [relativePath.slice(0, -3)] : [];
	});
}

function localizedPath(locale, path = '') {
	const prefix = locale === 'es' ? '/' : '/en/';
	return path ? `${prefix}${path.replace(/^\/+|\/+$/g, '')}/` : prefix;
}

function normalizePath(path) {
	return path === '/' ? path : `${path.replace(/\/+$/, '')}/`;
}

// Inspect rendered attributes without depending on formatting or placeholder text.
function attributes(source) {
	return Object.fromEntries(
		Array.from(
			source.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g),
			([, name, doubleQuoted, singleQuoted, unquoted]) => [
				name.toLowerCase(),
				doubleQuoted ?? singleQuoted ?? unquoted ?? '',
			],
		),
	);
}

function elements(html, tag) {
	return Array.from(html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, 'gi')), ([, source]) =>
		attributes(source),
	);
}

function hasClass(element, className) {
	return (element.class ?? '').split(/\s+/).includes(className);
}

function targetPath(href, page) {
	return new URL(href.replaceAll('&amp;', '&'), `${origin}${page.path}`).pathname;
}

function isFile(path) {
	return existsSync(path) && statSync(path).isFile();
}

before(() => {
	assert.ok(existsSync(dist), 'Build the site with npm run build before running these tests.');
	projectSlugs = markdownSlugs(join(projectRoot, 'src/content/work/es')).sort();
	pages = locales.flatMap((locale) =>
		['', 'about', 'work', ...projectSlugs.map((slug) => `work/${slug}`)].map((route) => {
			const path = localizedPath(locale, route);
			return {
				locale,
				route,
				path,
				html: readFileSync(join(dist, path.slice(1), 'index.html'), 'utf8'),
			};
		}),
	);
	pages.push({
		locale: 'es',
		route: '404',
		path: '/404.html',
		html: readFileSync(join(dist, '404.html'), 'utf8'),
	});
});

test('all pages, including nested projects, declare their locale; the global 404 defaults to Spanish', () => {
	for (const page of pages) {
		assert.equal(elements(page.html, 'html')[0]?.lang, page.locale, page.path);
	}
});

test('language links preserve the current page and expose the active locale', () => {
	for (const page of pages) {
		const switchers = Array.from(page.html.matchAll(/<ul\b([^>]*)>([\s\S]*?)<\/ul>/gi))
			.filter(([, source]) => hasClass(attributes(source), 'language-switcher'))
			.map(([, , content]) => elements(content, 'a'));
		assert.ok(switchers.length > 0, `${page.path}: missing language selector`);
		for (const links of switchers) {
			assert.deepEqual(new Set(links.map((link) => link.hreflang)), new Set(locales), page.path);
			for (const link of links) {
				const route = page.route === '404' ? '' : page.route;
				assert.equal(link.lang, link.hreflang, `${page.path}: language link lang`);
				assert.equal(
					normalizePath(targetPath(link.href, page)),
					localizedPath(link.hreflang, route),
					`${page.path}: switching to ${link.hreflang}`,
				);
				assert.equal(
					link['aria-current'] === 'true',
					link.hreflang === page.locale,
					`${page.path}: active language`,
				);
			}
		}
	}
});

test('navigation and project back links stay in the current locale and highlight only the current section', () => {
	for (const page of pages) {
		const links = elements(page.html, 'a');
		const navigation = links.filter((link) => hasClass(link, 'link'));
		const expectedNavigation = ['', 'work', 'about'].map((route) => localizedPath(page.locale, route));
		assert.deepEqual(
			new Set(navigation.map((link) => normalizePath(targetPath(link.href, page)))),
			new Set(expectedNavigation),
			`${page.path}: navigation destinations`,
		);
		const section = page.route.startsWith('work/') ? 'work' : page.route;
		const activePath = page.route === '404' ? undefined : localizedPath(page.locale, section);
		for (const link of navigation) {
			assert.equal(
				link['aria-current'] === 'page',
				normalizePath(targetPath(link.href, page)) === activePath,
				`${page.path}: active navigation item ${link.href}`,
			);
		}
		const siteTitle = links.find((link) => hasClass(link, 'site-title'));
		assert.ok(siteTitle, `${page.path}: missing home link`);
		assert.equal(normalizePath(targetPath(siteTitle.href, page)), localizedPath(page.locale), page.path);
		if (page.route === '') {
			assert.ok(
				links.some((link) =>
					!hasClass(link, 'link') && !link.hreflang && link.href &&
					normalizePath(targetPath(link.href, page)) === localizedPath(page.locale, 'work'),
				),
				`${page.path}: missing localized call to action for all projects`,
			);
		}
		if (page.route.startsWith('work/')) {
			const backLink = links.find((link) => hasClass(link, 'back-link'));
			assert.ok(backLink, `${page.path}: missing project back link`);
			assert.equal(
				normalizePath(targetPath(backLink.href, page)),
				localizedPath(page.locale, 'work'),
				page.path,
			);
		}
	}
});

test('project listings contain localized project links without duplicate language variants', () => {
	for (const page of pages.filter(({ route }) => route === '' || route === 'work')) {
		const cards = elements(page.html, 'a').filter((link) => hasClass(link, 'card'));
		const actual = cards.map((link) => normalizePath(targetPath(link.href, page)));
		const expected = projectSlugs.map((slug) => localizedPath(page.locale, `work/${slug}`));
		assert.equal(new Set(actual).size, actual.length, `${page.path}: duplicate projects`);
		for (const path of actual) assert.ok(expected.includes(path), `${page.path}: unexpected project ${path}`);
		if (page.route === 'work') {
			assert.deepEqual(new Set(actual), new Set(expected), `${page.path}: missing projects`);
		} else if (expected.length > 0) {
			assert.ok(actual.length > 0, `${page.path}: missing featured projects`);
		}
	}
});

test('all internal links resolve to built files, and ordinary page links retain the locale', () => {
	for (const page of pages) {
		for (const link of elements(page.html, 'a')) {
			if (!link.href || link.href.startsWith('#')) continue;
			const url = new URL(link.href.replaceAll('&amp;', '&'), `${origin}${page.path}`);
			if (url.origin !== origin) continue;
			const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, '');
			const file = join(dist, relativePath);
			assert.ok(
				isFile(file) || isFile(join(file, 'index.html')),
				`${page.path}: broken internal link ${link.href}`,
			);
			if (link.hreflang || /\.[^/]+$/.test(url.pathname) || url.pathname.startsWith('/assets/')) continue;
			const targetLocale = /^\/en(?:\/|$)/.test(url.pathname) ? 'en' : 'es';
			assert.equal(targetLocale, page.locale, `${page.path}: link changes locale: ${link.href}`);
		}
	}
});
