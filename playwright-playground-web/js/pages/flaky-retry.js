import { FLAKY_CONFIG } from "../data.js";
import { randomDelay } from "../utils.js";

const probabilisticBtn = document.querySelector('[data-testid="flaky-probabilistic-btn"]');
const probabilisticResult = document.querySelector('[data-testid="flaky-probabilistic-result"]');
probabilisticBtn.addEventListener("click", () => {
  const succeeded = Math.random() < FLAKY_CONFIG.successProbability;
  probabilisticResult.textContent = succeeded ? "Success!" : "Try again.";
});

const delayedBtn = document.querySelector('[data-testid="flaky-delayed-enable-btn"]');
setTimeout(() => {
  delayedBtn.disabled = false;
  delayedBtn.textContent = "Ready!";
}, randomDelay(FLAKY_CONFIG.delayEnableMs * 0.5, FLAKY_CONFIG.delayEnableMs * 1.5));

const flipState = document.querySelector('[data-testid="flaky-flip-state"]');
let flipped = false;
setInterval(() => {
  flipped = !flipped;
  flipState.textContent = flipped ? "B" : "A";
}, FLAKY_CONFIG.flipIntervalMs);
