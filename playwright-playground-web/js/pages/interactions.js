import { TASKS } from "../data.js";

// --- Drag and drop reordering ---
const list = document.querySelector('[data-testid="interactions-task-list"]');
const tasks = TASKS.map((t) => ({ ...t }));

function renderTasks() {
  list.innerHTML = tasks
    .map(
      (t) => `
      <li
        draggable="true"
        data-id="${t.id}"
        data-testid="interactions-task-item-${t.id}"
        style="padding:0.75rem 1rem; background:var(--color-surface); border:1px solid var(--color-border); border-radius:6px; cursor:grab;"
      >${t.title}</li>`
    )
    .join("");

  let draggedId = null;
  list.querySelectorAll("li").forEach((li) => {
    li.addEventListener("dragstart", () => {
      draggedId = Number(li.dataset.id);
    });
    li.addEventListener("dragover", (event) => event.preventDefault());
    li.addEventListener("drop", () => {
      const targetId = Number(li.dataset.id);
      if (draggedId === null || draggedId === targetId) return;
      const fromIndex = tasks.findIndex((t) => t.id === draggedId);
      const toIndex = tasks.findIndex((t) => t.id === targetId);
      const [moved] = tasks.splice(fromIndex, 1);
      tasks.splice(toIndex, 0, moved);
      renderTasks();
    });
  });
}
renderTasks();

// --- Context menu ---
const area = document.querySelector('[data-testid="interactions-context-menu-area"]');
const menu = document.querySelector('[data-testid="interactions-context-menu"]');
const result = document.querySelector('[data-testid="interactions-context-menu-result"]');

area.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  menu.hidden = false;
  menu.style.left = `${event.clientX}px`;
  menu.style.top = `${event.clientY}px`;
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target)) {
    menu.hidden = true;
  }
});

menu.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    result.textContent = `You clicked: ${btn.textContent}`;
    menu.hidden = true;
  });
});
