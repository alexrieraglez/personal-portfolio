// Run after npm run build: node tests/navigation.browser.mjs
// Uses installed Edge (or BROWSER_PATH) and Node's built-in WebSocket; no dependencies.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const timeout = 30_000;
const browserPath = process.env.BROWSER_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
assert.ok(existsSync(join(dist, 'index.html')), 'Run npm run build first.');
assert.ok(existsSync(browserPath), 'Set BROWSER_PATH to an installed Chromium-based browser.');

const contentTypes = {
	'.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
	'.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json',
	'.woff2': 'font/woff2',
};

const server = createServer(async (request, response) => {
	try {
		const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
		let file = resolve(dist, `.${pathname}`);
		if (file !== dist && !file.startsWith(dist + sep)) {
			response.writeHead(403).end();
			return;
		}
		if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, 'index.html');
		const body = await readFile(file).catch(() => null);
		if (body === null) {
			response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
			response.end(await readFile(join(dist, '404.html')));
			return;
		}
		response.writeHead(200, { 'Content-Type': contentTypes[extname(file)] ?? 'application/octet-stream' });
		response.end(body);
	} catch {
		response.writeHead(500).end();
	}
});

class CDP {
	constructor(socket) {
		this.socket = socket;
		this.nextId = 0;
		this.pending = new Map();
		this.errors = [];
		socket.addEventListener('message', ({ data }) => {
			const message = JSON.parse(data);
			const pending = this.pending.get(message.id);
			if (pending) {
				clearTimeout(pending.timer);
				this.pending.delete(message.id);
				if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
				else pending.resolve(message.result);
			}
			if (message.method === 'Runtime.exceptionThrown') {
				const details = message.params.exceptionDetails;
				this.errors.push(details.exception?.description ?? details.text);
			}
			if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
				this.errors.push(message.params.args.map((arg) => arg.description ?? arg.value).join(' '));
			}
		});
		socket.addEventListener('close', () => {
			for (const pending of this.pending.values()) {
				clearTimeout(pending.timer);
				pending.reject(new Error('Browser connection closed'));
			}
			this.pending.clear();
		});
	}

	call(method, params = {}, sessionId) {
		return new Promise((resolveCall, reject) => {
			const id = ++this.nextId;
			const timer = setTimeout(() => {
				this.pending.delete(id);
				reject(new Error(`CDP timeout: ${method}`));
			}, timeout);
			this.pending.set(id, { resolve: resolveCall, reject, timer });
			this.socket.send(JSON.stringify({ id, method, params, sessionId }));
		});
	}

	async evaluate(sessionId, expression) {
		const result = await this.call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
		if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
		return result.result.value;
	}
}

async function until(check, description) {
	const deadline = Date.now() + timeout;
	let lastError;
	while (Date.now() < deadline) {
		try { if (await check()) return; } catch (error) { lastError = error; }
		await delay(50);
	}
	throw new Error(`Timed out: ${description}${lastError ? ` (${lastError.message})` : ''}`);
}

let browser;
let cdp;
let profile;
let browserExited;
try {
	await new Promise((resolveListen, reject) => {
		server.once('error', reject);
		server.listen(0, '127.0.0.1', resolveListen);
	});
	const origin = `http://127.0.0.1:${server.address().port}`;
	profile = await mkdtemp(join(tmpdir(), 'portfolio-navigation-'));
	browser = spawn(browserPath, [
		'--headless=new', '--no-first-run', '--no-default-browser-check',
		'--disable-background-networking', '--disable-extensions',
		'--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
	], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
	let browserLog = '';
	let launchError;
	browser.stderr.on('data', (data) => { browserLog = (browserLog + data).slice(-8_000); });
	browser.on('error', (error) => { launchError = error; });
	browserExited = new Promise((resolveExit) => browser.once('exit', resolveExit));
	const devtoolsFile = join(profile, 'DevToolsActivePort');
	await until(async () => {
		if (launchError) throw launchError;
		return existsSync(devtoolsFile);
	}, `browser startup; ${browserLog}`);
	const [port, endpoint] = (await readFile(devtoolsFile, 'utf8')).trim().split(/\r?\n/);
	const socket = new WebSocket(`ws://127.0.0.1:${port}${endpoint}`);
	await new Promise((resolveOpen, reject) => {
		const timer = setTimeout(() => reject(new Error('Browser WebSocket timeout')), timeout);
		socket.addEventListener('open', () => { clearTimeout(timer); resolveOpen(); }, { once: true });
		socket.addEventListener('error', () => { clearTimeout(timer); reject(new Error('Browser WebSocket failed')); }, { once: true });
	});
	cdp = new CDP(socket);

	async function newPage() {
		const { targetId } = await cdp.call('Target.createTarget', { url: 'about:blank' });
		const { sessionId } = await cdp.call('Target.attachToTarget', { targetId, flatten: true });
		await cdp.call('Page.enable', {}, sessionId);
		await cdp.call('Runtime.enable', {}, sessionId);
		return sessionId;
	}
	const session = await newPage();
	const evaluate = (expression) => cdp.evaluate(session, expression);
	const click = (selector) => evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
	const settled = (path, locale) => until(() => evaluate(`
		location.pathname === ${JSON.stringify(path)} && document.documentElement.lang === ${JSON.stringify(locale)} &&
		document.documentElement.classList.contains('loaded') &&
		!document.documentElement.hasAttribute('data-astro-transition') &&
		!!document.querySelector('theme-toggle button[aria-pressed]')
	`), `navigation to ${path}`);

	await cdp.call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, session);
	await cdp.call('Page.navigate', { url: origin + '/' }, session);
	await settled('/', 'es');
	const started = await evaluate(`window.__navigationSentinel = 'same-document'; performance.timeOrigin`);
	await evaluate(`if (!document.documentElement.classList.contains('theme-dark')) document.querySelector('theme-toggle button').click()`);

	async function checkState(path, locale) {
		await settled(path, locale);
		const state = await evaluate(`({
			timeOrigin: performance.timeOrigin, sentinel: window.__navigationSentinel,
			dark: document.documentElement.classList.contains('theme-dark'),
			theme: localStorage.getItem('theme'), pressed: document.querySelector('theme-toggle button').getAttribute('aria-pressed'),
			menuButtons: document.querySelectorAll('menu-button button').length,
			activeLanguage: document.querySelector('#menu-content .language-switcher a[aria-current="true"]').hreflang
		})`);
		assert.equal(state.timeOrigin, started, `${path}: full page reload`);
		assert.equal(state.sentinel, 'same-document', `${path}: window state was lost`);
		assert.equal(state.dark, true, `${path}: dark theme was lost`);
		assert.equal(state.theme, 'dark', `${path}: stored theme changed`);
		assert.equal(state.pressed, 'true', `${path}: theme button is out of sync`);
		assert.equal(state.menuButtons, 1, `${path}: duplicate or missing menu button`);
		assert.equal(state.activeLanguage, locale, `${path}: language selector is out of sync`);
	}
	const languageLink = (locale) => `#menu-content .language-switcher a[hreflang="${locale}"]`;
	await click(languageLink('en'));
	await checkState('/en/', 'en');
	await click(languageLink('es'));
	await checkState('/', 'es');
	await click('#menu-content a.link[href="/about/"]');
	await checkState('/about/', 'es');
	await click(languageLink('en'));
	await checkState('/en/about/', 'en');
	await click('#menu-content a.link[href="/en/work/"]');
	await checkState('/en/work/', 'en');
	await click('a.card[href="/en/work/nested/duvet-genius/"]');
	await checkState('/en/work/nested/duvet-genius/', 'en');
	await evaluate('history.back()');
	await checkState('/en/work/', 'en');
	console.log('PASS: locale, nested project, history and theme preserve the same document');

	await cdp.call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false }, session);
	await until(() => evaluate(`document.querySelector('menu-button button').getAttribute('aria-expanded') === 'false'`), 'mobile menu collapses');
	await click('menu-button button');
	assert.equal(await evaluate(`document.querySelector('#menu-content').hidden`), false);
	await click(languageLink('es'));
	await checkState('/work/', 'es');
	await click('menu-button button');
	assert.equal(await evaluate(`document.querySelector('#menu-content').hidden`), false, 'menu opens after navigation');
	await click('menu-button button');
	assert.equal(await evaluate(`document.querySelector('#menu-content').hidden`), true, 'menu closes exactly once');
	await click('theme-toggle button');
	assert.equal(await evaluate(`document.documentElement.classList.contains('theme-dark')`), false, 'theme still responds after navigation');
	await click('theme-toggle button');
	console.log('PASS: mobile menu and theme remain interactive after swaps');

	await cdp.call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }, session);
	await click('menu-button button');
	await click(languageLink('en'));
	await checkState('/en/work/', 'en');
	assert.equal(await evaluate(`matchMedia('(prefers-reduced-motion: reduce)').matches`), true);
	assert.equal(await evaluate(`document.getAnimations().filter(a => a.playState === 'running').length`), 0, 'reduced motion has no running animations');
	console.log('PASS: reduced-motion navigation remains functional');

	const noScript = await newPage();
	await cdp.call('Emulation.setScriptExecutionDisabled', { value: true }, noScript);
	await cdp.call('Page.navigate', { url: origin + '/about/' }, noScript);
	await until(() => cdp.evaluate(noScript, `document.documentElement.lang === 'es' && !!document.querySelector('noscript .language-switcher')`), 'no-JavaScript Spanish page');
	await cdp.evaluate(noScript, `document.querySelector('noscript .language-switcher a[hreflang="en"]').click()`);
	await until(() => cdp.evaluate(noScript, `location.pathname === '/en/about/' && document.documentElement.lang === 'en'`), 'no-JavaScript English page');
	assert.deepEqual(cdp.errors, [], 'browser JavaScript errors');
	console.log('PASS: language links work without JavaScript; no browser exceptions or console errors');
} finally {
	if (cdp) {
		await cdp.call('Browser.close').catch(() => {});
		cdp.socket.close();
	}
	if (browser && browser.exitCode === null) {
		await Promise.race([browserExited, delay(3_000)]);
		if (browser.exitCode === null) browser.kill();
		await Promise.race([browserExited, delay(3_000)]);
	}
	server.closeAllConnections();
	await new Promise((resolveClose) => server.close(resolveClose));
	if (profile) {
		const absoluteProfile = resolve(profile);
		assert.equal(dirname(absoluteProfile), resolve(tmpdir()), 'refusing to remove unexpected temporary profile path');
		assert.ok(absoluteProfile.startsWith(join(resolve(tmpdir()), 'portfolio-navigation-')), 'unexpected temporary profile name');
		await rm(absoluteProfile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
	}
}
