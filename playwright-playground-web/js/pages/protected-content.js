import { isLoggedIn, logout } from "../auth.js";
import { showToast } from "../toast.js";

const gateMessage = document.querySelector('[data-testid="protected-gate-message"]');
const contentArea = document.querySelector('[data-testid="protected-content-area"]');

function renderGate() {
  const loggedIn = isLoggedIn();
  gateMessage.hidden = loggedIn;
  contentArea.hidden = !loggedIn;
}
renderGate();

document.querySelector('[data-testid="protected-logout-btn"]').addEventListener("click", () => {
  logout();
  renderGate();
});

document.querySelector('[data-testid="protected-toast-success-btn"]').addEventListener("click", () => showToast("Action completed successfully.", "success"));
document.querySelector('[data-testid="protected-toast-error-btn"]').addEventListener("click", () => showToast("Something went wrong.", "error"));
document.querySelector('[data-testid="protected-toast-warning-btn"]').addEventListener("click", () => showToast("Please double check your input.", "warning"));
document.querySelector('[data-testid="protected-toast-info-btn"]').addEventListener("click", () => showToast("Here's something you should know.", "info"));

const downloadFill = document.querySelector('[data-testid="protected-download-progress"]');
document.querySelector('[data-testid="protected-download-start-btn"]').addEventListener("click", () => {
  let progress = 0;
  downloadFill.style.width = "0%";
  const interval = setInterval(() => {
    progress += 10;
    downloadFill.style.width = `${Math.min(progress, 100)}%`;
    if (progress >= 100) clearInterval(interval);
  }, 200);
});

const spinner = document.querySelector('[data-testid="protected-spinner"]');
document.querySelector('[data-testid="protected-spinner-toggle-btn"]').addEventListener("click", () => {
  spinner.hidden = !spinner.hidden;
});

const skeletonContent = document.querySelector('[data-testid="protected-skeleton-content"]');
document.querySelector('[data-testid="protected-skeleton-toggle-btn"]').addEventListener("click", () => {
  skeletonContent.hidden = !skeletonContent.hidden;
});
