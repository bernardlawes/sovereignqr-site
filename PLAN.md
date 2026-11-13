# sovereignqr.com — landing page plan

Status: **live at https://sovereignqr.com since 2026-11-13.** The owner accepted every recommendation below and confirmed the background photo is theirs. Support contact: support@sovereignqr.com (Cloudflare Email Routing to the owner's inbox). www redirects to the bare domain.

## Open questions for the owner

Each has a recommendation; the owner accepted all of them.

1. **Notify-me sign-up?** It needs somewhere to store addresses. Options:
   - **a. None at launch** *(recommended)*. The page says "Coming soon. iPhone first." Once the app is in App Store Connect, add an App Store **pre-order** link: Apple then tells people on release, and we store nothing.
   - b. Our own form: a Pages Function writing to D1/KV, plus a privacy notice, double opt-in and bot protection. Bot protection (Turnstile) loads a Cloudflare script, which loosens the CSP.
   - c. A mailing-list service (Buttondown or similar). A third party gets the addresses, and the form posts off-site.
   - d. A `mailto:` link. No backend, but it publishes an email address and gets spam.
2. **Price.** Say "Paid" only, or show a price? The full app has two editions in its config (Personal keys, Teams). Is that one paid app, or two tiers? *Recommended: "Paid", no price, until the App Store listing exists.*
3. **Platforms after iPhone.** Only "iPhone first", or also name what comes next (iPad, Mac, Android, web)? *Recommended: "iPhone first" only.*
4. **Privacy and support pages.** The App Store listing will need a privacy policy URL and a support URL, and the full app's README already reserves the bare domain for them. Add `/privacy` and `/support` now? *Recommended: yes, short ones. Support needs a contact: which address (or a contact form)?*
5. **`www.sovereignqr.com`.** Redirect it to `sovereignqr.com`? *Recommended: yes* (a Cloudflare Redirect Rule, set by you in the dashboard; I'll walk you through it).
6. **Repo.** Git repo in this folder, plus a GitHub repo? Public (like Lite) or private? *Recommended: public `bernardlawes/sovereignqr-site`; there is nothing secret in it.*
7. **Sign-in gate mention.** The full app's private web build has a sign-in gate, but that protects your hosted copy, not a feature buyers get on iPhone. *Recommended: leave it off the page.*
8. **Analytics.** *Recommended: none.* It fits the privacy pitch, and Cloudflare's dashboard already shows basic traffic. (Cloudflare Web Analytics would need its beacon script, which loosens the CSP.)
9. **Background photo.** Reuse Lite's `bg-warehouse.webp`? *Recommended: yes*, for a family look. Is it yours to use on a product page (own photo or a licence that allows it)?

## What the full app does (confirmed from its README and CLAUDE.md on `origin/main`)

Used for copy only; no code from that repo is used.

- **No network needed.** The data lives inside the code; reading never needs a connection.
- **Standard codes**: links, text, WiFi, contact cards. Any phone camera reads them.
- **Data codes**: structured key/value data.
- **Compression**: automatic for Data codes when smaller; roughly 3–6× more, up to about 17 KB of typical JSON in one code.
- **Passphrase lock**: any code, AES-256-GCM. A lost passphrase can't be recovered.
- **Personal keys and contacts**: codes open without a passphrase for up to 5 chosen people. Key cards as QR codes, fingerprints to verify, signed by default so Scan says who made it.
- **Teams**: a shared team key; invite by QR code, any member can invite; new key after removing someone. No server or accounts involved.
- **Animated codes**: content too big for one code plays as a loop (about 450–800 KB of text or JSON). Any frames, any order.
- **Printable sheets**: an animated code printed as a sheet of frames, 20 to a page; Scan reads several codes at once.
- **Edit a scanned code** into a new one; anything unchanged comes back identical.
- **Save a scanned contact**: the phone shows the card and asks first.
- Keys need iOS 17 or later.

Lite (from its README/CLAUDE.md): links, text, WiFi, contact cards; offline, nothing uploaded, installable; never opens a link without asking; WiFi password hidden until revealed; recognises full-app codes and says to open them in the full app.

## Page sections, in order

One page, `/`. All copy is draft; terse on purpose.

### 1. Top bar
Logo (S | M icon) + **Sovereign QR**. Right: **Lite** (→ lite.sovereignqr.com).

### 2. Hero
- **Sovereign QR**
- QR codes that need no network.
- Made and read on your device. Nothing is uploaded.
- Buttons: **Try Lite, free** (→ `https://lite.sovereignqr.com`) · **Full app: coming soon** (→ `#full`)

### 3. No network needed
Three short points:
- **On your device.** Codes are made and read on your phone.
- **Nothing uploaded.** Your data stays in the code and on your device.
- **The data is the code.** Scan it anywhere, even with no signal.

### 4. Two editions
Two cards side by side (stacked on phones):

| Sovereign QR Lite | Sovereign QR |
|---|---|
| **Free. Live now.** | **Coming soon. iPhone first.** |
| Links, text, WiFi and contact cards. Works offline, in your browser. | Everything in Lite, plus encryption, teams and big data codes. |
| **Open Lite** | **See what's coming** (→ `#full`) |

### 5. The full app (`id="full"`)
Heading: **Sovereign QR** · sub: *Your data, sealed in a code.*
Feature tiles (title + one line):
- **Teams.** Share a team key by QR code. Everyone in the team reads and makes its codes. No server.
- **Personal keys.** Codes that open only for the people you pick. No passphrase to share.
- **Passphrase lock.** Seal any code with AES-256. Lose the passphrase, lose the code.
- **Data codes.** Structured key/value data, compressed to fit more.
- **Animated codes.** Too big for one code? It plays as a loop. Scan any frames, in any order.
- **Printable sheets.** Print an animated code on paper. Scan the page.
- **Edit a code.** Scan, change, make a new one.
- **Signed.** See who made a code.

### 6. Lite vs Sovereign QR

| | Lite | Sovereign QR |
|---|---|---|
| Price | Free | Paid |
| Available | Now, in your browser | Coming soon, iPhone first |
| Works with no network | Yes | Yes |
| Links, text, WiFi, contacts | Yes | Yes |
| Save a scanned contact | — | Yes |
| Edit a scanned code | — | Yes |
| Data codes, compressed | — | Yes |
| Passphrase lock | — | Yes |
| Personal keys and contacts | — | Yes |
| Teams | — | Yes |
| Animated codes | — | Yes |
| Printable sheets | — | Yes |

Under it, small: *Lite recognises codes made by the full app and tells you to open them there.*

### 7. Coming soon
- **iPhone first.**
- The full app is coming to iPhone. Until then, Lite is free and ready.
- **Open Lite**
- (Notify-me form or pre-order link here, depending on question 1.)

### 8. Footer
- © 2026 Bernard Lawes
- Privacy · Support (if question 4 is yes)
- QR Code is a registered trademark of DENSO WAVE INCORPORATED.

Never link to or mention the full app's own address.

Optional: a static QR code to `https://lite.sovereignqr.com` in the Lite card, so a desktop visitor can open Lite on their phone. Made once as an SVG with Lite's own tooling, black on white like both apps.

## Look

Reuse Lite's look so the family matches:
- Dark frosted-glass panels (translucent navy, `backdrop-filter: blur(22px)`) over the fixed background photo, set in `body::before` (iOS ignores `background-attachment: fixed`).
- Tokens copied from Lite's `public/css/app.css` `:root`: text `#fff`, muted `rgba(255,255,255,.62)`, accent teal `#8cd7d7`, glass `rgba(16,24,40,.38)`, radius 22px / 13px, `color-scheme: dark`. Theme colour `#1f4e79`.
- System font stack, no web fonts.
- Pill buttons in the teal accent, like Lite's chips.
- Icons: copy `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` from `C:\CODE\AI\qrcode-standard\public\icons\` (the S | M mark).
- Social preview `og-image.png` (1200×630): icon + "Sovereign QR" + "No network needed", static.
- Works at phone width with 16px gutters and no sideways scroll. Comparison table stays two narrow columns on phones.

## Stack and hosting

- **Plain HTML and CSS. No JavaScript at all**, no framework, no build step, no CDNs, no web fonts. Nothing to vendor.
- Folder layout:
  ```
  public/            the only deployed folder
    index.html
    privacy.html, support.html   (if question 4 is yes)
    404.html
    css/site.css
    icons/  img/  og-image.png
    _headers  robots.txt  sitemap.xml
  test/site.test.js  node --test checks (below)
  README.md  CLAUDE.md  package.json
  ```
- `public/_headers`, stricter than Lite's because there is no script:
  ```
  /*
    Content-Security-Policy: default-src 'none'; style-src 'self'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; require-trusted-types-for 'script'; trusted-types 'none'
    Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
    Referrer-Policy: no-referrer
    X-Content-Type-Options: nosniff
    Cross-Origin-Opener-Policy: same-origin
    Strict-Transport-Security: max-age=31536000
  ```
  plus `Cache-Control: no-cache` on HTML. `form-action` changes only if question 1 picks a form.
- **Indexed on purpose**: no sign-in gate and no `X-Robots-Tag: noindex` (the private-app baseline doesn't apply to this public page). `robots.txt` allows all and points to `https://sovereignqr.com/sitemap.xml`; the sitemap lists `/` (and `/privacy`, `/support`). Each page has `<link rel="canonical" href="https://sovereignqr.com/…">`, so the `*.pages.dev` copy isn't indexed as a duplicate.
- Clean URLs (`/privacy`, never `privacy.html`), as in Lite.
- **Tests** (`npm test`, Node built-in runner, no dependencies): no `<script>`, no inline `style=`/`<style>`, every internal link and image resolves, the trademark line is on every page, canonical and sitemap agree, and no page mentions the full app's own subdomain.
- **Local preview**: `npx wrangler pages dev public` (applies `_headers`).
- **Hosting**: new Cloudflare Pages project `sovereignqr-site`, output folder `public`, no build command.
  1. `npx wrangler pages project create sovereignqr-site --production-branch main --force` (without `--force`, current wrangler makes a Workers project).
  2. `npx wrangler pages deploy public --project-name sovereignqr-site --branch main`
  3. Custom domain `sovereignqr.com` in the Pages project (DNS is on Cloudflare, so it adds the record). Today the bare domain serves nothing.
  4. `www` redirect, if question 5 is yes.

  Each step waits for your OK.

## Build order (for the next session)

1. Answers to the open questions.
2. `git init`, `README.md`, `CLAUDE.md`, `.gitignore`, `package.json` (test script only).
3. `index.html` + `site.css` + icons + background; check at phone and desktop widths in the browser pane.
4. `_headers`, `robots.txt`, `sitemap.xml`, `404.html`, tests.
5. Privacy/support pages, if wanted.
6. Commit (files staged by name). Then, each on your OK: GitHub repo and push, Pages project, deploy, custom domain.
