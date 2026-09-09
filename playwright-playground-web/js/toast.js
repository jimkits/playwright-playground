import { nextId } from "./utils.js";

function ensureContainer() {
  let container = document.querySelector('[data-testid="toast-container"]');
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("data-testid", "toast-container");
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }
  return container;
}

/**
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} type
 */
export function showToast(message, type = "info", durationMs = 3000) {
  const container = ensureContainer();
  const id = nextId();
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("data-testid", `toast-${type}`);
  toast.dataset.toastId = String(id);
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, durationMs);

  return id;
}
