import { qsa } from "../utils.js";

const tabs = qsa('[data-testid="tabs-list"] [role="tab"]');
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.setAttribute("aria-selected", "false");
      t.tabIndex = -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = true;
    });
    tab.setAttribute("aria-selected", "true");
    tab.tabIndex = 0;
    document.getElementById(tab.getAttribute("aria-controls")).hidden = false;
  });
});

function wireAccordion(containerSelector, { singleOpen }) {
  const container = document.querySelector(containerSelector);
  const triggers = qsa(".accordion__trigger", container);
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      if (singleOpen) {
        triggers.forEach((t) => {
          t.setAttribute("aria-expanded", "false");
          document.getElementById(t.getAttribute("aria-controls")).hidden = true;
        });
      }

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });
  });
}

wireAccordion('[data-testid="accordion-single"]', { singleOpen: true });
wireAccordion('[data-testid="accordion-multi"]', { singleOpen: false });
