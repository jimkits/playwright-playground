export function debounce(fn, delayMs = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}

let idCounter = 1000;
export function nextId() {
  idCounter += 1;
  return idCounter;
}

export function formatCurrency(amount) {
  return `£${amount.toFixed(2)}`;
}

export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function randomDelay(minMs, maxMs) {
  return minMs + Math.random() * (maxMs - minMs);
}
