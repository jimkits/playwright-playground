// --- Moving target ---
const movingBtn = document.querySelector('[data-testid="advanced-moving-target-btn"]');
const movingContainer = movingBtn.parentElement;
movingBtn.addEventListener("mouseenter", () => {
  const maxLeft = movingContainer.clientWidth - movingBtn.clientWidth;
  movingBtn.style.left = `${Math.floor(Math.random() * maxLeft)}px`;
});

// --- Overlapping element ---
// The overlay sits directly on top of the button and intercepts real clicks,
// so a plain click() is refused by Playwright's actionability check; force:true
// bypasses that check, and the click actually lands on the overlay, which
// forwards it here.
const overlappedResult = document.querySelector('[data-testid="advanced-overlapped-result"]');
function reportOverlappedClick() {
  overlappedResult.textContent = "Button clicked (use force:true or remove the overlay first).";
}
document.querySelector('[data-testid="advanced-overlapped-btn"]').addEventListener("click", reportOverlappedClick);
document.querySelector('[data-testid="advanced-overlay"]').addEventListener("click", reportOverlappedClick);

// --- Delayed enable ---
const advancedDelayedBtn = document.querySelector('[data-testid="advanced-delayed-enable-btn"]');
setTimeout(() => {
  advancedDelayedBtn.disabled = false;
  advancedDelayedBtn.textContent = "Now enabled";
}, 3000);

// --- Lazy-loaded list (loads more items as you scroll) ---
const lazyContainer = document.querySelector('[data-testid="advanced-lazy-list-container"]');
const lazyList = document.querySelector('[data-testid="advanced-lazy-list"]');
let loadedCount = 0;

function loadMore(batchSize = 10) {
  const items = [];
  for (let i = 0; i < batchSize; i++) {
    loadedCount += 1;
    items.push(`<li data-testid="advanced-lazy-item-${loadedCount}">Item ${loadedCount}</li>`);
  }
  lazyList.insertAdjacentHTML("beforeend", items.join(""));
}

lazyContainer.addEventListener("scroll", () => {
  if (lazyContainer.scrollTop + lazyContainer.clientHeight >= lazyContainer.scrollHeight - 20) {
    loadMore();
  }
});

loadMore();
