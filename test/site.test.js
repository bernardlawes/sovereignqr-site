// Static checks for public/. No dependencies, no browser: `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const ORIGIN = 'https://sovereignqr.com';
const TRADEMARK = 'QR Code is a registered trademark of DENSO WAVE INCORPORATED.';

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}
const files = await walk(root);
const rel = (p) => relative(root, p).split(sep).join('/');
const pages = await Promise.all(files.filter((f) => f.endsWith('.html'))
  .map(async (f) => ({ name: rel(f), html: await readFile(f, 'utf8') })));
const textFiles = await Promise.all(files.filter((f) => /\.(html|css|txt|xml|svg)$|_headers$/.test(f))
  .map(async (f) => ({ name: rel(f), text: await readFile(f, 'utf8') })));

// Clean URL → file, as Cloudflare Pages serves it.
async function exists(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const candidates = clean.endsWith('/')
    ? [join(root, clean, 'index.html')]
    : [join(root, clean), join(root, `${clean}.html`)];
  for (const c of candidates) {
    try { if ((await stat(c)).isFile()) return true; } catch { /* next */ }
  }
  return false;
}

test('no JavaScript and no inline styles', () => {
  for (const { name, html } of pages) {
    assert.doesNotMatch(html, /<script\b/i, `${name}: <script>`);
    assert.doesNotMatch(html, /<style\b/i, `${name}: <style>`);
    assert.doesNotMatch(html, /\sstyle\s*=/i, `${name}: style=`);
    assert.doesNotMatch(html, /\son[a-z]+\s*=/i, `${name}: inline event handler`);
    assert.doesNotMatch(html, /javascript:/i, `${name}: javascript: URL`);
  }
});

test('every page has the trademark line', () => {
  for (const { name, html } of pages) assert.ok(html.includes(TRADEMARK), name);
});

test('internal links and images resolve', async () => {
  for (const { name, html } of pages) {
    for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:)/.test(url) || url.startsWith('#')) continue;
      assert.ok(url.startsWith('/'), `${name}: relative URL ${url}`);
      assert.doesNotMatch(url, /\.html(?:[#?]|$)/, `${name}: link by clean URL, not ${url}`);
      assert.ok(await exists(url), `${name}: missing ${url}`);
    }
  }
});

test('social preview image exists', async () => {
  for (const { name, html } of pages) {
    for (const [, url] of html.matchAll(/<meta property="og:image" content="([^"]+)">/g)) {
      assert.ok(url.startsWith(`${ORIGIN}/`), `${name}: ${url}`);
      assert.ok(await exists(url.slice(ORIGIN.length)), `${name}: missing ${url}`);
    }
  }
});

test('in-page anchors exist', () => {
  for (const { name, html } of pages) {
    for (const [, id] of html.matchAll(/href="(?:\/)?#([^"]+)"/g)) {
      const target = html.includes(`href="/#${id}"`) && name !== 'index.html'
        ? pages.find((p) => p.name === 'index.html').html : html;
      assert.match(target, new RegExp(`id="${id}"`), `${name}: #${id}`);
    }
  }
});

test('email links use only the support address', () => {
  for (const { name, html } of pages) {
    for (const [, addr] of html.matchAll(/href="mailto:([^"]+)"/g)) {
      assert.equal(addr, 'support@sovereignqr.com', name);
    }
  }
});

test('external links go only to the public sites', () => {
  for (const { name, html } of pages) {
    for (const [, url] of html.matchAll(/\shref="(https?:[^"]+)"/g)) {
      const host = new URL(url).host;
      assert.ok(['sovereignqr.com', 'lite.sovereignqr.com'].includes(host), `${name}: ${url}`);
    }
  }
});

test('the full app\'s own address is never mentioned', () => {
  for (const { name, text } of textFiles) {
    const hosts = text.match(/[a-z0-9-]+\.sovereignqr\.com/gi) ?? [];
    for (const h of hosts) assert.equal(h.toLowerCase(), 'lite.sovereignqr.com', `${name}: ${h}`);
    assert.doesNotMatch(text, /pages\.dev|tesserae|bernardlawes\.com/i, name);
  }
});

test('canonical links match the sitemap', async () => {
  const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
  const canon = pages.filter((p) => p.name !== '404.html').map(({ name, html }) => {
    const m = html.match(/<link rel="canonical" href="([^"]+)">/);
    assert.ok(m, `${name}: no canonical`);
    const expected = name === 'index.html' ? `${ORIGIN}/` : `${ORIGIN}/${name.replace(/\.html$/, '')}`;
    assert.equal(m[1], expected, name);
    return m[1];
  }).sort();
  assert.deepEqual(canon, locs);
  const robots = await readFile(join(root, 'robots.txt'), 'utf8');
  assert.match(robots, new RegExp(`Sitemap: ${ORIGIN}/sitemap.xml`));
});

test('the 404 page is not indexed; the others are', () => {
  for (const { name, html } of pages) {
    const noindex = /<meta name="robots" content="noindex">/.test(html);
    assert.equal(noindex, name === '404.html', name);
  }
});

test('headers: strict CSP, indexable', async () => {
  const headers = await readFile(join(root, '_headers'), 'utf8');
  const csp = headers.match(/Content-Security-Policy: (.+)/)[1];
  assert.match(csp, /default-src 'none'/);
  assert.doesNotMatch(csp, /unsafe-|script-src/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(headers, /Strict-Transport-Security/);
  assert.doesNotMatch(headers, /X-Robots-Tag/i);
});

// Cloudflare's email obfuscation needs a script, which the CSP blocks.
test('email addresses are excluded from Cloudflare email obfuscation', () => {
  for (const { name, html } of pages) {
    for (const m of html.matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)) {
      const before = html.lastIndexOf('<!--email_off-->', m.index);
      const end = html.lastIndexOf('<!--/email_off-->', m.index);
      assert.ok(before !== -1 && before > end, `${name}: ${m[0]} outside <!--email_off-->`);
    }
  }
});
