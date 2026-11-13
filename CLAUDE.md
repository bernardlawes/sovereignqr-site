# sovereignqr-site — project conventions

Public landing page at `https://sovereignqr.com` for Sovereign QR Lite (free, `https://lite.sovereignqr.com`) and Sovereign QR (full, paid, coming soon, iPhone first). `PLAN.md` holds the agreed plan and the owner's decisions.

## Rules
- Plain HTML and CSS only. **No JavaScript**, no inline styles or `<style>`, no event handlers, no framework, no build step, no CDNs, no web fonts, no analytics. The CSP in `public/_headers` (`default-src 'none'`) enforces it; keep it that strict.
- `public/` is the only deployed folder. Link pages by clean URL (`/privacy`), never `*.html` (Cloudflare Pages 308-redirects them).
- **Never link to or mention the full app's own address**, and never copy code from the full app's repo (`qrcode-offline`, local folder `qrcode-tesserae`). Reading its docs for feature names is fine. Every feature claim must be confirmed from its README/CLAUDE.md; don't invent any.
- Every page has the footer line "QR Code is a registered trademark of DENSO WAVE INCORPORATED."
- The site is public and indexed: no sign-in gate, no `X-Robots-Tag`. New pages need a canonical `https://sovereignqr.com/<path>` link and a `sitemap.xml` entry (the tests check both). Only `404.html` is `noindex`.
- Copy is short and plain; the owner prefers terse text.
- The privacy page describes the website and Lite only. Before the full app is released, add its section (what it stores on the device, any network use).

## Look
Same as Lite: dark frosted-glass panels over `img/bg-warehouse.webp` (set in `body::before`, since iOS ignores `background-attachment: fixed`), teal accent `#8cd7d7`, theme colour `#1f4e79`. Tokens on `:root` in `public/css/site.css`. QR codes always black on white.

## Commands
- `npm test`: static checks in `test/site.test.js`.
- `npm run dev`: `wrangler pages dev public` (applies `_headers`).

## Workflow
- Ask before creating repos or Cloudflare projects, pushing, or deploying.
- Stage files by name (never `git add -A`).
