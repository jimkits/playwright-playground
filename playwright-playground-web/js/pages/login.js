import { login } from "../auth.js";

const form = document.querySelector('[data-testid="login-form"]');
const errorMessage = document.querySelector('[data-testid="login-error-message"]');

const params = new URLSearchParams(window.location.search);
const redirectTo = params.get("redirect") || "/index.html#protected-content";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector('[data-testid="login-input-username"]').value;
  const password = document.querySelector('[data-testid="login-input-password"]').value;

  if (login(username, password)) {
    window.location.href = redirectTo;
  } else {
    errorMessage.hidden = false;
  }
});
