import { SECTIONS } from "../data.js";

const grid = document.querySelector('[data-testid="home-section-grid"]');

grid.innerHTML = SECTIONS.map(
  (section, index) => `
    <li>
      <a class="section-card" href="#${section.slug}" data-testid="home-section-card-${section.slug}">
        <div class="section-card__index">Section ${index + 1}</div>
        <div class="section-card__title">${section.title}</div>
      </a>
    </li>
  `
).join("");
