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
| `/find-a-member` | Find a Member (post 22)    | 29 member cards in two columns                          |
| `/why-join`      | Why Join (post 24)         | Member-benefits copy                                    |
| `/api/contact`   | HappyForms form 135        | Replaces `admin-ajax.php`                               |

Three nav items are external and unchanged: **Join Today** (members.asaonline.com),
**Advocacy** (a Google Doc) and **Register for Events** (Constant Contact). The footer's
**Contact Us** button is now a `mailto:` to `alex@denaliexecservices.com`, replacing the original's
link to subcontractorsidaho.com.

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
    members.ts            29 current members (see README for the reconciliation)
    leadership.ts         Both boards + annual sponsors
  lib/
    site.ts               Phone, menu, social links, copyright
public/wordpress-assets/  36 referenced images (4 new logos added 2026-09-02)
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

**1. The contact form needs an email provider.** Enquiries go to `alex@denaliexecservices.com`
(set in [site.ts](src/lib/site.ts), overridable with `CONTACT_TO_EMAIL`). The endpoint
validates, blocks the honeypot and sends — but no provider is configured yet, so it
currently returns an explicit "not connected yet" error rather than silently dropping
messages. See [.env.example](.env.example) for the full list.

_Recommended — Resend._ Sends the email directly, no dependency to install:

```bash
RESEND_API_KEY=re_…
CONTACT_FROM_EMAIL=website@asaofidaho.com
```

**The sending domain has to be verified with Resend.** Use `asaofidaho.com`, which the
association already owns — you cannot send *from* a `gmail.com` address, only *to* one.
That means adding the DKIM/SPF records Resend gives you to the domain's DNS. The email's
`Reply-To` is set to the enquirer, so hitting Reply in the inbox answers them directly.

_Alternative — a webhook._ Skips DNS setup at the cost of another service in the chain:

```bash
CONTACT_WEBHOOK_URL=https://hooks.zapier.com/…
```

Zapier, Make or Formspree all work; the endpoint receives `{name, email, phone, company,
message, to, source, receivedAt}` as JSON and you build the "send email" step there.

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
- **The hero is 830px tall** (690px at ≤992px, 400px at ≤768px), against the original's
  580 / 480 / 280. These are minimums — the band pushes the hero taller when its copy wraps.
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

- **Rodda Paint's** "Contact: Mike Royeton" links to `_wp_link_placeholder` — an unsaved
  WordPress link. Dropped here, since it goes nowhere.
- **Brant Freeman & Associates** and **Leighton Enterprises** have no website link; their
  cards render as plain blocks.
- **Precision Steel & Gypsum's** link is a Google search URL, not their site.
- **Leighton Enterprises** uses a Leighton Motorsports logo.
- **D & A Glass** and **D & A Door & Specialties** are separate members sharing one logo and
  one website.
- Several links are still `http://`, and some `tel:` hrefs don't match their displayed
  number (e.g. `tel:2083661660` shown as `208-366-1660`) — harmless, but inconsistent.
- **Card text colour is uneven** on the live site: company names render in link blue, while
  the four taglines render dark, because the nested-anchor bug reparents them out of the
  link. Reproduced faithfully; normalising it would be a one-line change in
  [MemberCard.tsx](src/components/MemberCard.tsx).

### Member roster update — 2026-09-02

Reconciled against a 29-company list the client emailed, with a contact email and phone for
each. That email is the authority for phone numbers; **contact emails were intentionally not
published on the cards** — the client's note framed them as something for internal outreach
(Chad contacting members for the Subcontractor of the Month filming), not public site content.
They're in the email thread if a card ever needs one added.

**Removed (14, absent from the new list):** Steel Connections, Western Wallboard Systems, ISG
Print & Embroidery, Rocky Mountain Rebar, Boise Demolition, ConDoc, Idaho Construction
Bonding, WAFED Insurance Group, Liberty Mutual Surety, Cloverdale Plumbing, Mountainland
Supply, LKL Associates, Color Craft Painting, PORTAPros.

**Added (5, all new to the site):** Blueprint Specialties, Fully Promoted Idaho, H&E
Advisors, Sherwin-Williams, Umpqua Bank. None had a logo on file, so each was sourced fresh
and checked visually before use — Blueprint Specialties and H&E Advisors from their own
sites, Sherwin-Williams from their brand CDN, Umpqua Bank from Wikimedia (umpquabank.com
blocks scraping), and Fully Promoted from `fp.png`, a leftover in `wordpress-assets/` from
the original site that turned out to be their franchise mark.

**Phone numbers changed (6):** Associated Insurance Services, Franz Witte Landscape, Markel
Surety, Merit Professional Coatings, Rodda Paint, The Hartwell Corporation. Everywhere else
the new list's digits matched what was already on the card.

**Worth confirming, not guessed at:**
- **Idaho Construction Bonding** (Jenae Sexton's company — former Executive Director, still on the associate board) and **LKL Associates**
  (an associate-board member's company) are both absent from the new list and were removed
  per the literal instruction — but both belong to people still actively on the boards, so
  this may be an oversight in the list rather than an intentional drop.
- **Desert Sage Wall Systems'** card still reads "Contact: Russell Freeman," but the new list
  gives `frank@desertsagewallsystems.com` as the contact email — possibly a change to
  someone named Frank. Left as-is rather than guessing a last name from an email prefix.
- **Fully Promoted Idaho** has no website link on its card: `fpidaho.com` resolves but serves
  a TLS certificate for a different domain (`*.squarespace.com`), so linking it would send
  visitors to a browser security warning. Worth a look at their DNS/hosting setup.

---

## Not carried over

- **Blog.** One post exists (`/hello-world/`), the WordPress default. Nothing links to it.
- **`/wp-json`, `/xmlrpc.php`, comment and RSS feeds.** WordPress plumbing.
- **Constant Contact newsletter widget.** It was in a mobile-only block on the homepage and
  rendered nothing — the script was present but no form was configured. The **Register for
  Events** nav item still points at their Constant Contact page.
- **Redirects.** Old URLs end in a trailing slash (`/find-a-member/`). Next.js normalises
  these by default, so existing links keep working.
