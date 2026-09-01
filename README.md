# ASA of Idaho — asaofidaho.com

A Next.js rebuild of [asaofidaho.com](https://asaofidaho.com/), which currently runs on
WordPress (GeneratePress 3.6 + Beaver Builder 2.10 + Beaver Themer, with Ultimate Addons,
PowerPack, TablePress and HappyForms).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

---

## What's here

| Route            | Source page                | Notes                                                 |
| ---------------- | -------------------------- | ----------------------------------------------------- |
| `/`              | Home (post 17)             | Hero slideshow, mission band, boards, sponsors, contact |
| `/find-a-member` | Find a Member (post 22)    | 38 member cards in two columns                          |
| `/why-join`      | Why Join (post 24)         | Member-benefits copy                                    |
| `/api/contact`   | HappyForms form 135        | Replaces `admin-ajax.php`                               |

Four nav items are external and unchanged: **Join Today** (members.asaonline.com),
**Advocacy** (a Google Doc), **Register for Events** (Constant Contact), and the footer's
**Contact Us** (subcontractorsidaho.com).

### Layout

```
src/
  app/
    layout.tsx            Oswald + Roboto via next/font, site metadata
    globals.css           Design tokens (@theme) + base/component layers
    page.tsx              Home
    find-a-member/page.tsx
    why-join/page.tsx
    api/contact/route.ts  Contact form endpoint
  components/
    Header.tsx            Both header variants + sticky bar + mobile nav
    Footer.tsx            Theme-builder footer (shared by all pages)
    HeroSlideshow.tsx     Cross-fading background slideshow
    SwoopDivider.tsx      The "swoop2" shape on the footer's top edge
    ContactForm.tsx
    MemberCard.tsx        PowerPack infobox, layout-3
    Roster.tsx            TablePress-equivalent board tables
    Icons.tsx             Inlined GP / Font Awesome / PowerPack glyphs
  data/
    members.ts            38 members, extracted from the live page
    leadership.ts         Both boards + annual sponsors
  lib/
    site.ts               Phone, menu, social links, copyright
public/wordpress-assets/  46 referenced images (all already present)
```

### Design tokens

Every colour, size and spacing value was read out of the live site's stylesheets rather
than eyeballed. The full set lives in the `@theme` block at the top of
[globals.css](src/app/globals.css) — brand blues `#2b7ad9` / `#00428e` / `#32aaff`, link
`#1e73be`, body `#222222` on `#f7f8f9`, Oswald for headings and nav, Roboto for body,
container widths 1100 / 1200 / 1350px.

Beaver Builder's spacing defaults are reproduced literally: **20px padding on rows, none on
columns, 20px margin on every module**, with per-node overrides layered on top.

---

## Things that changed, and why

Everything below is a deliberate departure. Each is invisible to visitors except where noted.

**Three WordPress artefacts were resolved rather than copied.**

1. _Phantom paragraphs._ WordPress wraps rich-text in a `<p>`, so a `<table>` or `<div>`
   inside gets hoisted out by the parser and leaves an empty paragraph behind. The original
   cancels that ~25px with negative margins (`-25px` on the rosters, `-35px` on the contact
   form). This markup has no phantom paragraph, so each override is applied as its *net*
   value. Copying the raw numbers would have pulled the roster up over its own subheading.
2. _Nested anchors._ Each member card is one big `<a>` with a `tel:` link inside it. The
   HTML parser clones the outer anchor at every nesting level, producing up to eight anchors
   and seven tab stops per card, and leaving the card's padding ring unclickable. Here a
   single stretched overlay link covers the card: same click target, one tab stop, valid HTML.
3. _Duplicated rows._ The homepage ships two copies of its three-column section — one
   desktop-only, one mobile-only — including two copies of the contact form with duplicate
   DOM ids. One responsive section replaces both.

**Accessibility.** The original emits eight `<h1>` elements on the homepage; here the first
is an `<h1>` and the rest are `<h2>` styled identically. The off-screen sticky bar is
`inert`, so its duplicate links aren't focusable. Decorative icons are `aria-hidden`.

**Performance.** Three webfont files (Font Awesome, PowerPack's icon font, GP's icons)
became inline SVG. `next/font` self-hosts Oswald and Roboto, removing the render-blocking
Google Fonts request. jQuery, YUI, lazysizes and the Beaver Builder runtime are all gone.

**Parallax.** `background-attachment: fixed` is a no-op on iOS, so the footer photo falls
back to `scroll` on touch devices instead of jumping.

---

## Needs a decision before launch

**1. The contact form isn't connected to an inbox.** The endpoint validates, blocks the
honeypot, and forwards to whatever you point it at — but nothing is configured, so it
currently returns a clear "not connected yet" error rather than silently dropping messages.

```bash
CONTACT_WEBHOOK_URL=https://…   # Zapier, Make, Formspree, or an SMTP function
```

Any endpoint that accepts a JSON `POST` works. It receives `{name, email, phone, company,
message, source, receivedAt}`. If you'd rather send mail directly (Resend, Postmark, SES),
that's a small change in [route.ts](src/app/api/contact/route.ts).

The original also ran reCAPTCHA v3. The site key is public but the secret isn't, so it
couldn't be carried over. The honeypot is in place; add reCAPTCHA or Turnstile if spam
becomes a problem.

**2. All five form fields are required.** That's what HappyForms enforces today (every part
carries `data-happyforms-required`), even though no asterisk is shown. Worth relaxing —
requiring a phone number and company name costs enquiries.

**3. Sponsor logos differed between desktop and mobile.** Desktop showed the current ISG
artwork; the separate mobile row was never updated and still showed a 2021 Graphic Zen logo.
This build uses the current desktop pair everywhere. If Graphic Zen is still a sponsor, add
them back in [leadership.ts](src/data/leadership.ts).

---

## Deliberate departures from the original's layout

Requested after the first pass, so they will not match the live site:

- **The mission band sits inside the hero**, bottom-anchored over the slideshow, rather than
  as a separate band below it. It is a flow child, not an absolute overlay, so on narrow
  screens it grows past the hero's minimum height instead of spilling out.
- **The header is 12px shorter** — 12px of vertical padding instead of the original's 20px.
- **The JOIN TODAY button no longer overlaps the mission text.** The original computes a
  10px overlap (the paragraph's bottom margin is zeroed while the button's module has
  `margin-top: -10px`); this uses the standard 20px module margin.
- **The swoop divider is filled `#f7f8f9`** to meet the section above it. The original fills
  it white because GeneratePress puts page content on a white `.inside-article`; this build
  leaves content on the gray body, so the swoop tracks that instead. It reads from the
  `--color-asa-page` token, so the two stay in sync if that colour changes.

---

## Data issues worth cleaning up

Found while extracting the member directory. All are carried over as-is so nothing silently
disappears — none is fixed in code.

- **Boise Demolition** has a mangled line: `vega@boisedemolition.comtBoise Demolition`.
- **Rodda Paint's** "Contact: Mike Royeton" links to `_wp_link_placeholder` — an unsaved
  WordPress link. Dropped here, since it goes nowhere.
- **Western Wallboard**, **Brant Freeman & Associates** and **Leighton Enterprises** have no
  website link; their cards render as plain blocks.
- **Precision Steel & Gypsum's** link is a Google search URL, not their site.
- **Leighton Enterprises** uses a Leighton Motorsports logo.
- **D & A Glass** and **D & A Door & Specialties** are separate members sharing one logo and
  one website.
- Eight links are still `http://`, and eleven `tel:` hrefs don't match their displayed
  number (e.g. `tel:2083661660` shown as `208-366-1660`) — harmless, but inconsistent.
- **Card text colour is uneven** on the live site: company names render in link blue, while
  the four taglines render dark, because the nested-anchor bug reparents them out of the
  link. Reproduced faithfully; normalising it would be a one-line change in
  [MemberCard.tsx](src/components/MemberCard.tsx).

---

## Not carried over

- **Blog.** One post exists (`/hello-world/`), the WordPress default. Nothing links to it.
- **`/wp-json`, `/xmlrpc.php`, comment and RSS feeds.** WordPress plumbing.
- **Constant Contact newsletter widget.** It was in a mobile-only block on the homepage and
  rendered nothing — the script was present but no form was configured. The **Register for
  Events** nav item still points at their Constant Contact page.
- **Redirects.** Old URLs end in a trailing slash (`/find-a-member/`). Next.js normalises
  these by default, so existing links keep working.
