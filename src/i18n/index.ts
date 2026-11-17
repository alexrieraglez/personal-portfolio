import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLocale, locales, type Locale } from './config';
import { es, type Messages } from './es';
import { en } from './en';

export { defaultLocale, locales, localeNames, type Locale } from './config';

const messages: Record<Locale, Messages> = { es, en };

export function getLocale(locale: string | undefined): Locale {
	return locales.find((supported) => supported === locale) ?? defaultLocale;
}

export function getMessages(locale: Locale): Messages {
	return messages[locale];
}

/** Return a page pathname without the deployment base or language prefix. */
export function getPathWithoutLocale(pathname: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	let path = pathname;
	if (base && (path === base || path.startsWith(`${base}/`))) {
		path = path.slice(base.length);
	}
	const segments = path.split('/').filter(Boolean);
	if (locales.some((locale) => locale === segments[0])) segments.shift();
	return segments.length ? `/${segments.join('/')}/` : '/';
}

/** Use for internal page links only, never for assets, external URLs or mailto links. */
export function localizePath(path: string, locale: Locale): string {
	const suffixIndex = path.search(/[?#]/);
	const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex);
	const suffix = suffixIndex === -1 ? '' : path.slice(suffixIndex);
	return getRelativeLocaleUrl(locale, getPathWithoutLocale(pathname)) + suffix;
}
