const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const input = document.querySelector('[data-testid="datepicker-input"]');
const panel = document.querySelector('[data-testid="datepicker-panel"]');
const monthLabel = document.querySelector('[data-testid="datepicker-month-label"]');
const grid = document.querySelector('[data-testid="datepicker-grid"]');

let viewDate = new Date();
let selectedDate = null;

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function render() {
  monthLabel.textContent = `${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`;

  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push('<span class="datepicker__day datepicker__day--muted"></span>');
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const isSelected = selectedDate && formatDate(cellDate) === formatDate(selectedDate);
    cells.push(
      `<button type="button" class="datepicker__day" data-testid="datepicker-day-${formatDate(cellDate)}" aria-selected="${isSelected}">${day}</button>`
    );
  }

  grid.innerHTML = cells.join("");
  grid.querySelectorAll("button.datepicker__day").forEach((btn) => {
    btn.addEventListener("click", () => {
      const [y, m, d] = btn.dataset.testid.replace("datepicker-day-", "").split("-").map(Number);
      selectedDate = new Date(y, m - 1, d);
      input.value = formatDate(selectedDate);
      render();
      panel.hidden = true;
    });
  });
}

input.addEventListener("click", () => {
  panel.hidden = !panel.hidden;
  render();
});

document.querySelector('[data-testid="datepicker-prev-month-btn"]').addEventListener("click", () => {
  viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
  render();
});
document.querySelector('[data-testid="datepicker-next-month-btn"]').addEventListener("click", () => {
  viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
  render();
});
document.querySelector('[data-testid="datepicker-today-btn"]').addEventListener("click", () => {
  viewDate = new Date();
  selectedDate = new Date();
  input.value = formatDate(selectedDate);
  render();
});
document.querySelector('[data-testid="datepicker-clear-btn"]').addEventListener("click", () => {
  selectedDate = null;
  input.value = "";
  render();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest('[data-testid="datepicker-root"]')) {
    panel.hidden = true;
  }
});

render();
