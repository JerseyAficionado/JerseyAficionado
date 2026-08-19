/* ===================================================================
   Jersey Aficionado — Stripe Checkout (Phase 3)
   -------------------------------------------------------------------
   Serverless function (runs on Netlify). It receives the cart from the
   browser, builds a Stripe Checkout Session using PRICES STORED HERE
   (never the prices the browser sends — that would let someone pay $1),
   and returns the secure Stripe URL to redirect the buyer to.

   The Stripe SECRET KEY is read from an environment variable that you
   set in the Netlify dashboard — it is NEVER written in this code.
=================================================================== */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/* Server-side price list = source of truth. Amounts are in CENTS.
   ⚠️ Keep this in sync with js/products.js when you change prices/stock. */
const CATALOG = {
  "valencia-2016-third":        { name: "Valencia CF 2016/17 Third",                        amount: 7000,  stock: 1, image: "images/valencia-2016-third-front.jpg" },
  "mancity-2020-third-aguero":  { name: "Man City 2020/21 Third — Kun Agüero #10",          amount: 13000, stock: 1, image: "images/mancity-2020-third-aguero-front.jpg" },
  "ajax-2018-away":             { name: "Ajax 2018/19 Away",                                 amount: 9000,  stock: 1, image: "images/ajax-2018-away-front.jpg" },
  "chelsea-2019-third":         { name: "Chelsea 2019/20 Third — Nike Vaporknit",           amount: 13000, stock: 1, image: "images/chelsea-2019-third-front.jpg" },
  "barca-0506-ronaldinho-ls":   { name: "FC Barcelona 2005/06 Home L/S — Ronaldinho #10",   amount: 18000, stock: 1, image: "images/barca-0506-ronaldinho-front.jpg" }
};

/* Countries buyers can ship to. This is a broad worldwide list — add or
   remove ISO country codes as you like. (Stripe requires an explicit list.) */
const ALLOWED_COUNTRIES = [
  "US","CA","MX","GB","IE","FR","DE","ES","PT","IT","NL","BE","LU","CH","AT",
  "DK","SE","NO","FI","IS","PL","CZ","SK","HU","RO","BG","GR","HR","SI","EE",
  "LV","LT","AU","NZ","JP","KR","SG","HK","TW","MY","TH","PH","ID","IN","AE",
  "SA","QA","KW","IL","TR","ZA","BR","AR","CL","CO","PE","UY","EC","CR","PA"
];

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { items } = JSON.parse(event.body || "{}");
    if (!Array.isArray(items) || items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Your cart is empty." }) };
    }

    // Where the site is served from (used for image URLs + redirect links).
    let origin = event.headers.origin
      || (event.headers.referer ? event.headers.referer.replace(/\/[^/]*$/, "") : "")
      || "https://jerseyaficionado.com";
    origin = origin.replace(/\/$/, "");
    const isHttps = origin.startsWith("https://");

    const line_items = [];
    for (const it of items) {
      const p = CATALOG[it.id];
      if (!p) continue; // ignore unknown ids
      const qty = Math.max(1, Math.min(p.stock, parseInt(it.qty, 10) || 1));
      const sizeNote = it.size ? ` (Size ${it.size})` : "";
      const product_data = { name: p.name + sizeNote };
      if (isHttps) product_data.images = [`${origin}/${p.image}`]; // Stripe needs https image URLs
      line_items.push({
        price_data: { currency: "usd", product_data, unit_amount: p.amount },
        quantity: qty
      });
    }

    if (line_items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "No valid items in cart." }) };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
      shipping_options: [
        {
          // Placeholder flat rate — adjust in the pricing pass before going live.
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1500, currency: "usd" },
            display_name: "Worldwide tracked shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 10 }
            }
          }
        }
      ],
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart.html`
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
