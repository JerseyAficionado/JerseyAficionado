/* ===================================================================
   Jersey Aficionado — shopping cart (Phase 2)
   -------------------------------------------------------------------
   The cart lives in the browser (localStorage), so it survives page
   loads and refreshes. No server needed until checkout (Phase 3).
=================================================================== */

const CART_KEY = "ja_cart";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function cartCount() { return getCart().reduce((n, i) => n + i.qty, 0); }
function cartTotal() { return getCart().reduce((s, i) => s + (i.price || 0) * i.qty, 0); }

// Add one of an item. Won't exceed the item's stock (these are mostly 1-of-1).
function addToCart(item) {
  const cart = getCart();
  const line = cart.find(i => i.id === item.id && i.size === item.size);
  const max = item.stock || 1;
  if (line) {
    line.qty = Math.min(max, line.qty + 1);
  } else {
    cart.push({
      id: item.id, name: item.name, size: item.size || "",
      price: item.price, photo: item.photo || "", stock: max, qty: 1
    });
  }
  saveCart(cart);
}

function removeFromCart(id, size) {
  saveCart(getCart().filter(i => !(i.id === id && i.size === size)));
}

// Empty the whole cart (used after a successful checkout).
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

function setQty(id, size, qty) {
  const cart = getCart();
  const line = cart.find(i => i.id === id && i.size === size);
  if (line) line.qty = Math.max(1, Math.min(line.stock || 1, qty));
  saveCart(cart);
}

// Keep the "Cart (N)" counter in the nav in sync on every page.
function updateCartCount() {
  const n = cartCount();
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = n);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
