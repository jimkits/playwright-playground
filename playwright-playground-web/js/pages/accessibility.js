import { qsa } from "../utils.js";

// --- Focus trap modal ---
const modalBackdrop = document.querySelector('[data-testid="a11y-modal-backdrop"]');
const modal = document.querySelector('[data-testid="a11y-modal"]');
const openModalBtn = document.querySelector('[data-testid="a11y-open-modal-btn"]');
const closeModalBtn = document.querySelector('[data-testid="a11y-modal-close-btn"]');

function getFocusable(container) {
  return qsa('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', container);
}

function openModal() {
  modalBackdrop.hidden = false;
  const focusable = getFocusable(modal);
  if (focusable.length) focusable[0].focus();
}

function closeModal() {
  modalBackdrop.hidden = true;
  openModalBtn.focus();
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
document.querySelector('[data-testid="a11y-modal-secondary-btn"]').addEventListener("click", closeModal);
document.querySelector('[data-testid="a11y-modal-primary-btn"]').addEventListener("click", closeModal);

modal.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    return;
  }
  if (event.key !== "Tab") return;

  const focusable = getFocusable(modal);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

// --- Keyboard-only menu ---
const menuItems = qsa('[data-testid="a11y-keyboard-menu"] [role="menuitem"]');
menuItems.forEach((item, index) => {
  item.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      menuItems[(index + 1) % menuItems.length].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      menuItems[(index - 1 + menuItems.length) % menuItems.length].focus();
    } else if (event.key === "Escape") {
      item.blur();
    }
  });
});

// --- Live region ---
const liveRegion = document.querySelector('[data-testid="a11y-live-region"]');
document.querySelector('[data-testid="a11y-announce-btn"]').addEventListener("click", () => {
  liveRegion.textContent = `Announcement at ${new Date().toLocaleTimeString()}`;
});
