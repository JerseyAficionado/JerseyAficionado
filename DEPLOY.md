# Going Live with Payments — Deploy Guide

The store now has full card checkout built in (Stripe). To turn it on, the site
needs to be **deployed to Netlify** (free), because the checkout runs as a small
server function. Follow these steps once — after that, updates are automatic.

> 🔑 **Golden rule:** your Stripe **secret key** goes into Netlify's settings
> **only**. Never put it in the code, a file, or a chat message.

---

## What you'll need
- A **GitHub** account (free) — to store the code
- A **Netlify** account (free) — to host the site + run checkout
- Your **Stripe** account (you have this ✅)

---

## Step 1 — Get your Stripe TEST secret key
1. Log into [dashboard.stripe.com](https://dashboard.stripe.com).
2. Make sure you're in **Test mode** (toggle, top-right).
3. Go to **Developers → API keys**.
4. Copy the **Secret key** (starts with `sk_test_...`). Keep it handy — you'll paste it into Netlify in Step 4, nowhere else.

## Step 2 — Put the code on GitHub
From this project folder:
```bash
git init
git add .
git commit -m "Jersey Aficionado store with Stripe checkout"
```
Then create a new empty repo on github.com and push (GitHub shows the exact
`git remote add` / `git push` commands after you create it).
*(I can run the first three commands for you — just ask.)*

## Step 3 — Connect Netlify to the repo
1. Log into [app.netlify.com](https://app.netlify.com).
2. **Add new site → Import an existing project → GitHub** → pick your repo.
3. Leave the build settings as-is (the `netlify.toml` already configures everything). Click **Deploy**.

## Step 4 — Add your secret key to Netlify
1. In your new Netlify site: **Site configuration → Environment variables → Add a variable**.
2. Key: `STRIPE_SECRET_KEY`  ·  Value: your `sk_test_...` key from Step 1.
3. Save, then **Deploys → Trigger deploy → Deploy site** so it picks up the key.

## Step 5 — Test it (fake money)
1. Open your Netlify site URL, add a jersey to the cart, click **Checkout**.
2. On the Stripe page, use test card **4242 4242 4242 4242**, any future expiry, any CVC, any ZIP.
3. You should land on the "Order confirmed" page. Check the payment shows in your Stripe **Test** dashboard.

## Step 6 — Go live (real money)
1. In Stripe, switch to **Live mode**, get the **live** secret key (`sk_live_...`).
2. In Netlify, update the `STRIPE_SECRET_KEY` variable to the live key, redeploy.
3. Connect your custom domain (jerseyaficionado.com) in Netlify → Domain settings.

---

## Notes
- **Prices** are set server-side in `netlify/functions/create-checkout.js` (in cents) — they must match `js/products.js`. Tell me when prices change and I'll update both.
- **Shipping** is a placeholder flat rate ($15 worldwide) — we'll set real rates in the pricing pass.
- **Sold items:** stock isn't auto-updated after a sale yet (that needs a Stripe webhook — a future add-on). For now, mark items sold manually.
