const loadBtn = document.querySelector('[data-testid="dynamic-load-btn"]');
const spinner = document.querySelector('[data-testid="dynamic-load-spinner"]');
const result = document.querySelector('[data-testid="dynamic-load-result"]');

loadBtn.addEventListener("click", () => {
  spinner.hidden = false;
  result.hidden = true;
  loadBtn.disabled = true;
  setTimeout(() => {
    spinner.hidden = true;
    result.hidden = false;
    loadBtn.disabled = false;
  }, 1500);
});

setTimeout(() => {
  document.querySelector('[data-testid="dynamic-auto-appear"]').hidden = false;
}, 3000);

setTimeout(() => {
  document.querySelector('[data-testid="dynamic-auto-disappear"]').hidden = true;
}, 3000);

const counter = document.querySelector('[data-testid="dynamic-counter-value"]');
let count = 0;
setInterval(() => {
  count += 1;
  counter.textContent = String(count);
}, 1000);
