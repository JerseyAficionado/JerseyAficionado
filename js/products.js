/* ===================================================================
   Jersey Aficionado — product data
   -------------------------------------------------------------------
   This is your store's inventory. Add/edit jerseys here.
   In Phase 3 this moves to a real database, but for now this file
   is the single source of truth — just edit it and refresh the page.

   Each jersey needs:
     id       unique code, no spaces (used in the URL)
     name     shown to shoppers
     type     "club" or "national"
     team     team name
     league   league or "National Team"
     price    number (no $ sign)
     sizes    list of available sizes
     colors   [primary, secondary] hex colors — used for the placeholder
     photo    path to a photo (put files in the images/ folder)
     description
     stock    how many you have
=================================================================== */

const PRODUCTS = [
  {
    id: "valencia-2016-third",
    name: "Valencia CF 2016/17 Third",
    type: "club",
    team: "Valencia CF",
    league: "La Liga",
    tier: "fan",
    price: 70.00,
    sizes: ["S"],
    colors: ["#ff5a00", "#111111"],
    photos: [
      "images/valencia-2016-third-front.jpg",
      "images/valencia-2016-third-back.jpg"
    ],
    description: "adidas Valencia CF 2016/17 third shirt — the striking \"Copa Kit\" in solar orange with tonal pinstripes, black adidas three-stripes and a black V-collar. Features the LaLiga patch, beIN Sports sponsor, monochrome VCF crest, and the club's bat with '1919' at the back of the neck. climacool fan version. Brand new with tags.",
    condition: "Brand new with tags",
    stock: 1
  },
  {
    id: "mancity-2020-third-aguero",
    name: "Man City 2020/21 Third — Kun Agüero #10",
    type: "club",
    team: "Manchester City",
    league: "Premier League",
    tier: "authentic",
    price: 95.00,
    sizes: ["S"],
    colors: ["#f4f4f4", "#f5b8cd"],
    photos: [
      "images/mancity-2020-third-aguero-front.jpg",
      "images/mancity-2020-third-aguero-back.jpg"
    ],
    description: "Puma's iconic paisley third shirt from Manchester City's 2020/21 season, with Etihad Airways sponsor and KUN AGÜERO #10 on the back. Authentic DryCELL player-spec version.",
    condition: "Lightly used — excellent condition (10/10)",
    stock: 1
  },
  {
    id: "ajax-2018-away",
    name: "Ajax 2018/19 Away",
    type: "club",
    team: "Ajax",
    league: "Eredivisie",
    tier: "fan",
    price: 90.00,
    sizes: ["XS"],
    colors: ["#111111", "#c9a96a"],
    photos: [
      "images/ajax-2018-away-front.jpg",
      "images/ajax-2018-away-back.jpg"
    ],
    description: "adidas Ajax Amsterdam away shirt from the memorable 2018/19 Champions League season — black with gold trim and Ziggo sponsor. Brand new with tags.",
    condition: "Brand new with tags",
    stock: 1
  },
  {
    id: "chelsea-2019-third",
    name: "Chelsea 2019/20 Third — Nike Vaporknit",
    type: "club",
    team: "Chelsea FC",
    league: "Premier League",
    tier: "authentic",
    price: 100.00,
    sizes: ["S"],
    colors: ["#111111", "#f4511e"],
    photos: [
      "images/chelsea-2019-third-front.jpg",
      "images/chelsea-2019-third-back.jpg"
    ],
    description: "Nike Vaporknit authentic player-issue third shirt from Chelsea's 2019/20 season — black with orange trim, Yokohama Tyres sponsor and Hyundai sleeve. Brand new with tags. Style AR9342-011.",
    condition: "Brand new with tags",
    stock: 1
  },
  {
    id: "barca-0506-ronaldinho-ls",
    name: "FC Barcelona 2005/06 Home L/S — Ronaldinho #10",
    type: "club",
    team: "FC Barcelona",
    league: "La Liga",
    tier: "fan",
    price: 120.00,
    sizes: ["S"],
    colors: ["#004d98", "#a50044"],
    photos: [
      "images/barca-0506-ronaldinho-front.jpg",
      "images/barca-0506-ronaldinho-back.jpg"
    ],
    description: "Official Nike fan-version reissue (2026) of the legendary 2005/06 blaugrana long-sleeve, with RONALDINHO #10, LFP patch and TV3 sleeve sponsor. Brand new with tags. Style HQ1462-471.",
    condition: "Brand new with tags",
    stock: 1
  }
];

/* ---- helpers used across pages ---- */

function formatPrice(n) {
  if (n === null || n === undefined) return "Price on request";
  return "$" + n.toFixed(2);
}

// Returns a product's list of photos, whether it uses `photos` (array)
// or the older single `photo` field.
function photosOf(p) {
  if (p.photos && p.photos.length) return p.photos;
  if (p.photo) return [p.photo];
  return [];
}

// Placeholder background (team colors) shown until you add real photos.
function placeholderStyle(p) {
  const [a, b] = p.colors;
  return `background: linear-gradient(135deg, ${a} 0%, ${a} 45%, ${b} 55%, ${b} 100%);`;
}

// Short condition label for a card badge (e.g. "BNWT").
function conditionBadge(p) {
  if (!p.condition) return "";
  if (/brand new/i.test(p.condition)) return "BNWT";
  if (/excellent/i.test(p.condition)) return "Excellent";
  return p.condition;
}

// Tier label — every jersey is official/manufacturer-made. We only badge the
// premium "Authentic" versions; standard fan/retail versions carry no badge.
function tierLabel(p) {
  if (p.tier === "authentic") return "Authentic";
  return "";
}

// Build a jersey card for the grid. Uses the photo if it loads,
// otherwise falls back to the colored placeholder with the team name.
function productCard(p) {
  const badge = p.type === "national" ? "National Team" : p.league;
  const cover = photosOf(p)[0] || "";
  const cond = conditionBadge(p);
  const tier = tierLabel(p);
  const pills = [
    cond ? `<span class="pill">${cond}</span>` : "",
    tier ? `<span class="pill ${p.tier === "authentic" ? "pill-auth" : ""}">${tier}</span>` : ""
  ].join("");
  return `
    <a class="card" href="product.html?id=${p.id}">
      <div class="thumb" style="${placeholderStyle(p)}">
        <span class="badge">${badge}</span>
        <img src="${cover}" alt="${p.name}" loading="lazy" width="600" height="600"
             onerror="this.style.display='none'">
        <span>${p.team}</span>
      </div>
      <div class="body">
        <div class="team">${p.team}</div>
        <div class="name">${p.name}</div>
        ${pills ? `<div class="pills">${pills}</div>` : ""}
        <div class="price">${formatPrice(p.price)}</div>
      </div>
    </a>`;
}

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}
