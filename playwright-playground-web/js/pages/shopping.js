import { PRODUCTS, COUPONS } from "../data.js";
import { formatCurrency, nextId } from "../utils.js";

const cart = []; // { productId, name, price, quantity }
let appliedDiscountPercent = 0;

const grid = document.querySelector('[data-testid="shopping-product-grid"]');
const categoryFilter = document.querySelector('[data-testid="shopping-category-filter"]');

function renderProducts() {
  const category = categoryFilter.value;
  const products = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
  grid.innerHTML = products
    .map(
      (p) => `
      <div class="product-card" data-testid="shopping-product-card-${p.id}">
        <img class="product-card__image" src="${p.imageUrl}" alt="${p.name}" />
        <div class="product-card__body">
          <span class="badge badge--${p.category.toLowerCase()}">${p.category}</span>
          <strong>${p.name}</strong>
          <p style="font-size:0.85rem; color:var(--color-text-muted);">${p.description}</p>
          <span class="product-card__price">${formatCurrency(p.price)}</span>
          <button class="btn btn--sm" data-testid="shopping-add-to-cart-${p.id}">Add to Cart</button>
        </div>
      </div>`
    )
    .join("");

  products.forEach((p) => {
    document.querySelector(`[data-testid="shopping-add-to-cart-${p.id}"]`).addEventListener("click", () => addToCart(p));
  });
}
categoryFilter.addEventListener("change", renderProducts);
renderProducts();

function addToCart(product) {
  const existing = cart.find((item) => item.productId === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  renderCart();
}

const cartItemsEl = document.querySelector('[data-testid="shopping-cart-items"]');
const subtotalEl = document.querySelector('[data-testid="shopping-cart-subtotal"]');
const discountEl = document.querySelector('[data-testid="shopping-cart-discount"]');
const totalEl = document.querySelector('[data-testid="shopping-cart-total"]');

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderCart() {
  if (!cart.length) {
    cartItemsEl.innerHTML = '<p class="form-hint" data-testid="shopping-cart-empty">Your cart is empty.</p>';
  } else {
    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
        <div class="utility-bar" style="justify-content:space-between; padding:0.5rem 0; border-bottom:1px solid var(--color-border);" data-testid="shopping-cart-item-${item.productId}">
          <span>${item.name}</span>
          <div class="utility-bar">
            <button class="btn btn--secondary btn--sm" data-testid="shopping-cart-decrement-${item.productId}">-</button>
            <span data-testid="shopping-cart-quantity-${item.productId}">${item.quantity}</span>
            <button class="btn btn--secondary btn--sm" data-testid="shopping-cart-increment-${item.productId}">+</button>
            <button class="btn btn--danger btn--sm" data-testid="shopping-cart-remove-${item.productId}">Remove</button>
          </div>
        </div>`
      )
      .join("");

    cart.forEach((item) => {
      document.querySelector(`[data-testid="shopping-cart-increment-${item.productId}"]`).addEventListener("click", () => {
        item.quantity += 1;
        renderCart();
      });
      document.querySelector(`[data-testid="shopping-cart-decrement-${item.productId}"]`).addEventListener("click", () => {
        item.quantity = Math.max(1, item.quantity - 1);
        renderCart();
      });
      document.querySelector(`[data-testid="shopping-cart-remove-${item.productId}"]`).addEventListener("click", () => {
        const index = cart.findIndex((c) => c.productId === item.productId);
        cart.splice(index, 1);
        renderCart();
      });
    });
  }

  const subtotal = getSubtotal();
  const discount = subtotal * (appliedDiscountPercent / 100);
  const total = subtotal - discount;
  subtotalEl.textContent = formatCurrency(subtotal);
  discountEl.textContent = formatCurrency(discount);
  totalEl.textContent = formatCurrency(total);
}
renderCart();

// Coupons
const couponInput = document.querySelector('[data-testid="shopping-coupon-input"]');
const couponMessage = document.querySelector('[data-testid="shopping-coupon-message"]');
document.querySelector('[data-testid="shopping-coupon-apply-btn"]').addEventListener("click", () => {
  const code = couponInput.value.trim().toUpperCase();
  const coupon = COUPONS.find((c) => c.code === code);
  const subtotal = getSubtotal();
  if (!coupon) {
    couponMessage.textContent = "Invalid coupon code.";
    appliedDiscountPercent = 0;
  } else if (subtotal < coupon.minOrderAmount) {
    couponMessage.textContent = `This coupon requires a minimum order of ${formatCurrency(coupon.minOrderAmount)}.`;
    appliedDiscountPercent = 0;
  } else {
    couponMessage.textContent = `Coupon applied: ${coupon.discountPercent}% off.`;
    appliedDiscountPercent = coupon.discountPercent;
  }
  renderCart();
});

// Checkout flow
const checkoutPanel = document.querySelector('[data-testid="shopping-checkout-panel"]');
const confirmationPanel = document.querySelector('[data-testid="shopping-confirmation-panel"]');

document.querySelector('[data-testid="shopping-checkout-btn"]').addEventListener("click", () => {
  checkoutPanel.hidden = false;
  checkoutPanel.scrollIntoView({ behavior: "smooth" });
});

document.querySelector('[data-testid="shopping-checkout-form"]').addEventListener("submit", (event) => {
  event.preventDefault();
  checkoutPanel.hidden = true;
  confirmationPanel.hidden = false;
  document.querySelector('[data-testid="shopping-order-id"]').textContent = `ORD-${nextId()}`;
  confirmationPanel.scrollIntoView({ behavior: "smooth" });
});
