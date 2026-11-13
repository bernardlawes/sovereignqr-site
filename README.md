# sovereignqr.com

Public landing page for the Sovereign QR family: **Sovereign QR Lite** (free, live at https://lite.sovereignqr.com) and **Sovereign QR** (the full, paid app, coming soon, iPhone first).

Plain HTML and CSS. No JavaScript, no framework, no build step, no CDNs.

© Bernard Lawes. All rights reserved.

## Quick start

```bash
npm test
```

```bash
npm run dev
```

`npm run dev` runs `wrangler pages dev public` at http://localhost:8788 (the preview launch config uses 8790), with the production headers from `public/_headers` and Cloudflare's clean URLs.

## Layout

| Path | What |
|---|---|
| `public/` | The deployed web root: `index.html`, `privacy.html`, `support.html`, `404.html`, `css/site.css`, `icons/`, `img/`, `_headers`, `robots.txt`, `sitemap.xml` |
| `test/site.test.js` | Static checks (`node --test`) |
| `PLAN.md` | The agreed plan and the owner's decisions |

## Images

- `icons/`: copied from Sovereign QR Lite (`qrcode-standard/public/icons/`).
- `img/bg-warehouse.webp`: the owner's photo, shared with Lite.
- `img/lite-qr.svg`: a QR code to `https://lite.sovereignqr.com`, made once with Lite's `makeQr`/`toSvg` (`public/src/qr/render.js`).
- `img/og-image.png`: 1200×630 social preview, drawn once from `icon-512.png`.

## Deploying (Cloudflare Pages)

Pages project `sovereignqr-site`, output folder `public`, no build command, custom domain `sovereignqr.com`.

1. Once: `npx wrangler pages project create sovereignqr-site --production-branch main --force` (without `--force`, current wrangler makes a Workers project).
2. Each release: `npx wrangler pages deploy public --project-name sovereignqr-site --branch main`
3. Once: Custom domains → Set up → `sovereignqr.com` (DNS is on Cloudflare, so it adds the record). Then a Redirect Rule sends `www.sovereignqr.com` to `https://sovereignqr.com`.

The page is public and meant to be indexed: no sign-in gate, no `X-Robots-Tag`. Canonical links point to `sovereignqr.com`, so the `*.pages.dev` copy isn't indexed as a duplicate.
