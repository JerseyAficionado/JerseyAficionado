# Jersey Aficionado — Blueprint

A custom-coded online store to sell football club & national team jerseys, with a real cart and card checkout.

**Domain:** jerseyaficionado.com (registered)
**Status (2026-08-11):** Phase 1 ✅ + Phase 2 ✅.
- Storefront live: Home, Shop (club/national filters), Product (photo gallery w/ click + arrow-key nav), Cart, About/Contact.
- **4 real jerseys** listed (Man City Agüero, Ajax away, Chelsea Vaporknit, Barça Ronaldinho) with photos, tiers (fan/authentic), condition, and prices. Placeholders removed.
- Cart works (localStorage): add-to-cart, live counter, cart page, checkout → "coming in Phase 3" message.
- Photos: uniform 1200×1200 centered square crops. Reshoot planned (iPhone + Photoroom).
- **Next: Phase 3 — Stripe checkout** (see memory), then Phase 4 deploy (Netlify/Vercel).

## 1. What we're building

- A public website where visitors browse jerseys, view details (size, price, photos), add to a cart, and pay by card.
- Custom-coded (HTML / CSS / JavaScript) — no Shopify/Wix.
- Payments handled by **Stripe**: buyers enter card details on Stripe's secure page, money lands in your bank. Your code never sees or stores card numbers.

## 2. Pages (the sitemap)

| Page | What's on it |
|------|--------------|
| **Home** | Hero image, featured jerseys, link into the shop |
| **Shop / Catalog** | Grid of all jerseys, with filters (team, league, size, price) |
| **Product page** | One jersey: photo gallery, price, size selector, "Add to cart" |
| **Cart** | Items added, quantities, total, "Checkout" button |
| **Checkout** | Handed off to Stripe (name, address, card) |
| **Order confirmation** | "Thanks, your order is placed" after payment |
| **About / Contact** | Who you are, how to reach you (WhatsApp/Instagram/email) |

## 3. What each jersey needs (the data model)

Every jersey in the store is one record with these fields:

- `id` — unique code (e.g. `barca-home-2024`)
- `name` — "FC Barcelona Home 2024"
- `team` / `league`
- `price`
- `sizes` — which sizes are in stock (S, M, L, XL...)
- `photos` — list of image files
- `description`
- `stock` — how many you have (optional, for later)

Right now this lives in `js/products.js` (a plain JS list, so the site works by just double-clicking `index.html` — browsers block loading local `.json` files directly). It moves to a real database in Phase 3.

## 4. Folder structure (proposed)

```
pics/
├── BLUEPRINT.md          ← this file
├── index.html            ← Home
├── shop.html             ← Catalog
├── product.html          ← Product template
├── cart.html             ← Cart
├── css/
│   └── style.css
├── js/
│   ├── products.js       ← all jersey info + shared helpers ✅
│   └── cart.js           ← add/remove, totals (Phase 2)
├── images/               ← jersey photos (your pics go here)
└── server/               ← Stripe checkout code (added in Phase 3)
```

## 5. Tech stack

- **Storefront:** plain HTML + CSS + JavaScript (easiest to learn; we can upgrade later)
- **Cart:** stored in the browser (localStorage) — no server needed until checkout
- **Payments:** Stripe Checkout (hosted by Stripe)
- **Checkout backend:** a small serverless function (runs on the host, only job is to talk to Stripe)
- **Hosting:** Netlify or Vercel — free tier, gives you a real web address, supports the serverless function
- **Version control:** Git (already installed ✓)

### Hosting & domain (decided)

- **Domain:** `jerseyaficionado.com` — ✅ **registered at Namecheap (2026-08-06).** Owned. At Phase 4 we point its DNS at Netlify/Vercel (will guide step by step).
- **Hosting:** **Netlify or Vercel**, free tier — includes hosting, a web address, and **free automatic SSL** (the https padlock). No need to pay Namecheap for hosting or SSL.
- **SSL:** free via the host. Never pay for it.
- **DNS:** free DNS from Namecheap is fine; at Phase 4 we point the domain at Netlify/Vercel (a DNS setting — will guide step by step).
- **Business email** (`you@jerseyaficionado.com`): optional, revisit at Phase 4. Options: Namecheap email, Zoho Mail (free tier), or Google Workspace. Not needed now.

## 6. Build phases

**Phase 1 — Static storefront (no money yet)**
Build Home, Shop, and Product pages. Hard-code 2–3 sample jerseys. Get it looking good. This is where most of the visible work is, and it needs zero accounts or payment setup.

**Phase 2 — Cart**
Add-to-cart, cart page, quantities, running total — all in the browser.

**Phase 3 — Payments**
Create a Stripe account, add the serverless checkout function, connect the "Checkout" button to Stripe. Test with Stripe's fake test cards before going live.

**Phase 4 — Go live & polish**
Real photos, real prices, deploy to Netlify/Vercel, connect a domain name, mobile testing, order-confirmation emails.

## 7. What you'll need to gather

- [ ] Photos of your jerseys (front, back, close-up of details)
- [ ] A name/brand for the store
- [ ] Prices and available sizes
- [ ] A Stripe account (Phase 3 — needs your bank details; free to create)
- [x] Domain name: jerseyaficionado.com — ✅ registered at Namecheap

## 8. Open questions (decide as we go)

- Store name / branding / colors?
- Shipping — flat rate, by region, or local pickup only?
- One-of-a-kind items, or restockable? (affects the `stock` field)
- Currency?
