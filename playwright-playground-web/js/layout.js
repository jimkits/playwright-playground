import { SECTIONS } from "./data.js";
import { isLoggedIn, logout } from "./auth.js";

function renderHeader() {
  const loggedIn = isLoggedIn();
  const menuItems = SECTIONS.map(
    (section) =>
      `<li role="none"><a role="menuitem" data-testid="nav-link-${section.slug}" href="#${section.slug}">${section.title}</a></li>`
  ).join("");

  return `
    <header class="site-header">
      <a class="site-header__logo" href="/index.html" data-testid="nav-home-link">
        <span aria-hidden="true">▤</span> PlayLab Training
      </a>
      <nav class="site-nav" aria-label="Main">
        <div class="nav-dropdown">
          <button
            type="button"
            class="nav-dropdown__toggle"
            data-testid="nav-dropdown-toggle"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="label-full">Locators</span> ▾
          </button>
          <ul class="nav-dropdown__menu" role="menu" data-testid="nav-dropdown-menu">
            ${menuItems}
          </ul>
        </div>
        ${
          loggedIn
            ? `<a class="site-nav__auth" href="#" data-testid="nav-logout-link">Logout</a>`
            : `<a class="site-nav__auth" href="/login.html" data-testid="nav-login-link">Login</a>`
        }
      </nav>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <p>Built for practicing Playwright automation. Data resets on every reload.</p>
      <p>
        <a href="https://playwright.dev/" target="_blank" rel="noopener" data-testid="footer-playwright-link">Playwright Docs</a>
      </p>
    </footer>
  `;
}

function wireHeaderInteractions(header) {
  const toggle = header.querySelector('[data-testid="nav-dropdown-toggle"]');
  const menu = header.querySelector('[data-testid="nav-dropdown-menu"]');

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  const logoutLink = header.querySelector('[data-testid="nav-logout-link"]');
  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
      window.location.href = "/index.html";
    });
  }
}

export function renderLayout() {
  const headerMount = document.getElementById("app-header");
  const footerMount = document.getElementById("app-footer");

  if (headerMount) {
    headerMount.innerHTML = renderHeader();
    wireHeaderInteractions(headerMount);
  }
  if (footerMount) {
    footerMount.innerHTML = renderFooter();
  }
}

document.addEventListener("DOMContentLoaded", renderLayout);
