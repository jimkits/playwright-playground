import { USERS, PRODUCTS, generateRandomRows } from "../data.js";
import { debounce, formatCurrency } from "../utils.js";

// --- Users table: filter, sort, paginate ---
const PAGE_SIZE = 4;
let usersState = {
  filterText: "",
  roleFilter: "",
  sortKey: "id",
  sortDir: 1,
  page: 1,
};

const usersBody = document.querySelector('[data-testid="data-tables-users-body"]');
const pageInfo = document.querySelector('[data-testid="data-tables-users-page-info"]');

function getFilteredUsers() {
  let rows = USERS.filter((u) => {
    const matchesText =
      !usersState.filterText ||
      u.name.toLowerCase().includes(usersState.filterText) ||
      u.email.toLowerCase().includes(usersState.filterText);
    const matchesRole = !usersState.roleFilter || u.role === usersState.roleFilter;
    return matchesText && matchesRole;
  });

  rows = rows.slice().sort((a, b) => {
    const av = a[usersState.sortKey];
    const bv = b[usersState.sortKey];
    if (av < bv) return -1 * usersState.sortDir;
    if (av > bv) return 1 * usersState.sortDir;
    return 0;
  });

  return rows;
}

function renderUsers() {
  const filtered = getFilteredUsers();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  usersState.page = Math.min(usersState.page, totalPages);
  const start = (usersState.page - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(start, start + PAGE_SIZE);

  usersBody.innerHTML = pageRows
    .map(
      (u) => `
      <tr data-testid="data-tables-users-row-${u.id}">
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td><span class="badge badge--${u.role.toLowerCase()}">${u.role}</span></td>
        <td><span class="badge badge--${u.status.toLowerCase()}">${u.status}</span></td>
        <td>
          <button class="btn btn--secondary btn--sm" data-testid="data-tables-users-edit-${u.id}">Edit</button>
          <button class="btn btn--danger btn--sm" data-testid="data-tables-users-delete-${u.id}">Delete</button>
        </td>
      </tr>`
    )
    .join("");

  pageInfo.textContent = `Page ${usersState.page} of ${totalPages} (${filtered.length} users)`;
}

document.querySelector('[data-testid="data-tables-users-filter-input"]').addEventListener(
  "input",
  debounce((event) => {
    usersState.filterText = event.target.value.trim().toLowerCase();
    usersState.page = 1;
    renderUsers();
  }, 200)
);

document.querySelector('[data-testid="data-tables-users-role-select"]').addEventListener("change", (event) => {
  usersState.roleFilter = event.target.value;
  usersState.page = 1;
  renderUsers();
});

function wireSort(testid, key) {
  document.querySelector(`[data-testid="${testid}"]`).addEventListener("click", () => {
    if (usersState.sortKey === key) {
      usersState.sortDir *= -1;
    } else {
      usersState.sortKey = key;
      usersState.sortDir = 1;
    }
    renderUsers();
  });
}
wireSort("data-tables-users-sort-id", "id");
wireSort("data-tables-users-sort-name", "name");
wireSort("data-tables-users-sort-email", "email");

document.querySelector('[data-testid="data-tables-users-page-prev"]').addEventListener("click", () => {
  usersState.page = Math.max(1, usersState.page - 1);
  renderUsers();
});
document.querySelector('[data-testid="data-tables-users-page-next"]').addEventListener("click", () => {
  usersState.page += 1;
  renderUsers();
});

renderUsers();

// --- Products table: inline editing ---
const productsBody = document.querySelector('[data-testid="data-tables-products-body"]');
const productsState = PRODUCTS.map((p) => ({ ...p }));

function renderProducts() {
  productsBody.innerHTML = productsState
    .map(
      (p, index) => `
      <tr data-testid="data-tables-products-row-${p.id}">
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>
          <span data-testid="data-tables-products-price-display-${p.id}">${formatCurrency(p.price)}</span>
          <input type="number" step="0.01" style="display:none;" value="${p.price}" data-testid="data-tables-products-price-input-${p.id}" />
        </td>
        <td>
          <span data-testid="data-tables-products-stock-display-${p.id}">${p.stock}</span>
          <input type="number" style="display:none;" value="${p.stock}" data-testid="data-tables-products-stock-input-${p.id}" />
        </td>
        <td>
          <button class="btn btn--secondary btn--sm" data-testid="data-tables-products-edit-${p.id}">Edit</button>
          <button class="btn btn--sm" style="display:none;" data-testid="data-tables-products-save-${p.id}">Save</button>
          <button class="btn btn--secondary btn--sm" style="display:none;" data-testid="data-tables-products-cancel-${p.id}">Cancel</button>
        </td>
      </tr>`
    )
    .join("");

  productsState.forEach((p) => {
    const editBtn = document.querySelector(`[data-testid="data-tables-products-edit-${p.id}"]`);
    const saveBtn = document.querySelector(`[data-testid="data-tables-products-save-${p.id}"]`);
    const cancelBtn = document.querySelector(`[data-testid="data-tables-products-cancel-${p.id}"]`);
    const priceDisplay = document.querySelector(`[data-testid="data-tables-products-price-display-${p.id}"]`);
    const priceInput = document.querySelector(`[data-testid="data-tables-products-price-input-${p.id}"]`);
    const stockDisplay = document.querySelector(`[data-testid="data-tables-products-stock-display-${p.id}"]`);
    const stockInput = document.querySelector(`[data-testid="data-tables-products-stock-input-${p.id}"]`);

    function setEditing(editing) {
      priceDisplay.style.display = editing ? "none" : "inline";
      priceInput.style.display = editing ? "inline-block" : "none";
      stockDisplay.style.display = editing ? "none" : "inline";
      stockInput.style.display = editing ? "inline-block" : "none";
      editBtn.style.display = editing ? "none" : "inline-flex";
      saveBtn.style.display = editing ? "inline-flex" : "none";
      cancelBtn.style.display = editing ? "inline-flex" : "none";
    }

    editBtn.addEventListener("click", () => setEditing(true));
    cancelBtn.addEventListener("click", () => {
      priceInput.value = p.price;
      stockInput.value = p.stock;
      setEditing(false);
    });
    saveBtn.addEventListener("click", () => {
      p.price = parseFloat(priceInput.value) || 0;
      p.stock = parseInt(stockInput.value, 10) || 0;
      priceDisplay.textContent = formatCurrency(p.price);
      stockDisplay.textContent = String(p.stock);
      setEditing(false);
    });
  });
}
renderProducts();

// --- Randomized table ---
const randomBody = document.querySelector('[data-testid="data-tables-random-body"]');
function renderRandom() {
  randomBody.innerHTML = generateRandomRows(5)
    .map((r) => `<tr data-testid="data-tables-random-row-${r.id}"><td>${r.id}</td><td>${r.label}</td><td>${r.value}</td></tr>`)
    .join("");
}
document.querySelector('[data-testid="data-tables-random-regenerate-btn"]').addEventListener("click", renderRandom);
renderRandom();
