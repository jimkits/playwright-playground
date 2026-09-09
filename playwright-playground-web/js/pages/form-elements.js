import {
  COUNTRIES,
  SKILLS,
  FRAMEWORKS,
  GROUPED_OPTIONS,
  CASCADING_LOCATIONS,
  AUTOSUGGEST_ITEMS,
} from "../data.js";
import { debounce } from "../utils.js";

// --- Registration form: countries, skills ---
const countrySelect = document.querySelector('[data-testid="form-elements-select-country"]');
COUNTRIES.forEach((c) => {
  const opt = document.createElement("option");
  opt.value = c;
  opt.textContent = c;
  countrySelect.appendChild(opt);
});

const skillsGroup = document.querySelector('[data-testid="form-elements-checkbox-skills-group"]');
skillsGroup.innerHTML = SKILLS.map(
  (skill) => `
    <label style="margin-right:1rem; display:inline-block;">
      <input type="checkbox" value="${skill}" data-testid="form-elements-checkbox-skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}" /> ${skill}
    </label>`
).join("");

const registrationForm = document.querySelector('[data-testid="form-elements-registration-form"]');
const submitResult = document.querySelector('[data-testid="form-elements-submit-result"]');
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitResult.hidden = false;
  submitResult.textContent = "Registration submitted successfully.";
});

// --- Sliders ---
const volumeSlider = document.querySelector('[data-testid="form-elements-slider-volume"]');
const volumeValue = document.querySelector('[data-testid="form-elements-slider-volume-value"]');
volumeSlider.addEventListener("input", () => {
  volumeValue.textContent = volumeSlider.value;
});

const priceMin = document.querySelector('[data-testid="form-elements-slider-price-min"]');
const priceMax = document.querySelector('[data-testid="form-elements-slider-price-max"]');
const priceValue = document.querySelector('[data-testid="form-elements-slider-price-value"]');
function renderPriceRange() {
  let min = parseInt(priceMin.value, 10);
  let max = parseInt(priceMax.value, 10);
  if (min > max) {
    [min, max] = [max, min];
  }
  priceValue.textContent = `£${min} - £${max}`;
}
priceMin.addEventListener("input", renderPriceRange);
priceMax.addEventListener("input", renderPriceRange);

// --- File upload ---
const dropzone = document.querySelector('[data-testid="form-elements-upload-dropzone"]');
const fileInput = document.querySelector('[data-testid="form-elements-upload-input"]');
const progressFill = document.querySelector('[data-testid="form-elements-upload-progress"]');
const filenameLabel = document.querySelector('[data-testid="form-elements-upload-filename"]');

dropzone.addEventListener("click", () => fileInput.click());
dropzone.addEventListener("dragover", (event) => event.preventDefault());
dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  if (event.dataTransfer.files.length) {
    handleFile(event.dataTransfer.files[0]);
  }
});
fileInput.addEventListener("change", () => {
  if (fileInput.files.length) {
    handleFile(fileInput.files[0]);
  }
});

function handleFile(file) {
  filenameLabel.textContent = `Uploading: ${file.name}`;
  let progress = 0;
  progressFill.style.width = "0%";
  const interval = setInterval(() => {
    progress += 20;
    progressFill.style.width = `${Math.min(progress, 100)}%`;
    if (progress >= 100) {
      clearInterval(interval);
      filenameLabel.textContent = `Uploaded: ${file.name}`;
    }
  }, 150);
}

// --- Auto-suggest search ---
const autosuggestInput = document.querySelector('[data-testid="form-elements-autosuggest-input"]');
const autosuggestResults = document.querySelector('[data-testid="form-elements-autosuggest-results"]');

autosuggestInput.addEventListener(
  "input",
  debounce(() => {
    const query = autosuggestInput.value.trim().toLowerCase();
    if (!query) {
      autosuggestResults.hidden = true;
      return;
    }
    const matches = AUTOSUGGEST_ITEMS.filter((item) => item.label.toLowerCase().includes(query));
    if (!matches.length) {
      autosuggestResults.hidden = true;
      return;
    }
    autosuggestResults.innerHTML = matches
      .map((item) => `<li role="option"><button type="button" class="dropdown__option" data-testid="form-elements-autosuggest-option-${item.id}">${item.label}</button></li>`)
      .join("");
    autosuggestResults.hidden = false;
  }, 150)
);

autosuggestResults.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (btn) {
    autosuggestInput.value = btn.textContent;
    autosuggestResults.hidden = true;
  }
});

// --- Multi-select frameworks ---
const multiselect = document.querySelector('[data-testid="form-elements-multiselect-frameworks"]');
FRAMEWORKS.forEach((fw) => {
  const opt = document.createElement("option");
  opt.value = fw;
  opt.textContent = fw;
  multiselect.appendChild(opt);
});

// --- Custom dropdown ---
const customToggle = document.querySelector('[data-testid="form-elements-dropdown-custom-toggle"]');
const customMenu = document.querySelector('[data-testid="form-elements-dropdown-custom-menu"]');
const customLabel = document.querySelector('[data-testid="form-elements-dropdown-custom-label"]');
customMenu.innerHTML = FRAMEWORKS.map(
  (fw) => `<li role="option"><button type="button" class="dropdown__option" data-testid="form-elements-dropdown-custom-option-${fw.toLowerCase()}">${fw}</button></li>`
).join("");
customToggle.addEventListener("click", () => {
  const isOpen = customMenu.hidden;
  customMenu.hidden = !isOpen;
  customToggle.setAttribute("aria-expanded", String(isOpen));
});
customMenu.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (btn) {
    customLabel.textContent = btn.textContent;
    customMenu.hidden = true;
    customToggle.setAttribute("aria-expanded", "false");
  }
});

// --- Searchable dropdown ---
const searchableInput = document.querySelector('[data-testid="form-elements-dropdown-searchable-input"]');
const searchableMenu = document.querySelector('[data-testid="form-elements-dropdown-searchable-menu"]');
function renderSearchable(filter = "") {
  const matches = COUNTRIES.filter((c) => c.toLowerCase().includes(filter.toLowerCase()));
  searchableMenu.innerHTML = matches
    .map((c) => `<li role="option"><button type="button" class="dropdown__option" data-testid="form-elements-dropdown-searchable-option-${c.toLowerCase().replace(/\s+/g, "-")}">${c}</button></li>`)
    .join("");
  searchableMenu.hidden = matches.length === 0;
}
searchableInput.addEventListener("focus", () => renderSearchable(searchableInput.value));
searchableInput.addEventListener("input", () => renderSearchable(searchableInput.value));
searchableMenu.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (btn) {
    searchableInput.value = btn.textContent;
    searchableMenu.hidden = true;
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest('[data-testid="form-elements-dropdown-searchable"]')) {
    searchableMenu.hidden = true;
  }
});

// --- Grouped dropdown ---
const groupedToggle = document.querySelector('[data-testid="form-elements-dropdown-grouped-toggle"]');
const groupedMenu = document.querySelector('[data-testid="form-elements-dropdown-grouped-menu"]');
const groupedLabel = document.querySelector('[data-testid="form-elements-dropdown-grouped-label"]');
groupedMenu.innerHTML = GROUPED_OPTIONS.map(
  (group) => `
    <li class="dropdown__group-label">${group.groupLabel}</li>
    ${group.options
      .map(
        (opt) =>
          `<li role="option"><button type="button" class="dropdown__option" data-testid="form-elements-dropdown-grouped-option-${opt.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">${opt}</button></li>`
      )
      .join("")}
  `
).join("");
groupedToggle.addEventListener("click", () => {
  const isOpen = groupedMenu.hidden;
  groupedMenu.hidden = !isOpen;
  groupedToggle.setAttribute("aria-expanded", String(isOpen));
});
groupedMenu.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (btn) {
    groupedLabel.textContent = btn.textContent;
    groupedMenu.hidden = true;
    groupedToggle.setAttribute("aria-expanded", "false");
  }
});

// --- Cascading dropdown ---
const cascadingCountry = document.querySelector('[data-testid="form-elements-cascading-country"]');
const cascadingRegion = document.querySelector('[data-testid="form-elements-cascading-region"]');
const cascadingCity = document.querySelector('[data-testid="form-elements-cascading-city"]');

Object.keys(CASCADING_LOCATIONS).forEach((country) => {
  const opt = document.createElement("option");
  opt.value = country;
  opt.textContent = country;
  cascadingCountry.appendChild(opt);
});

cascadingCountry.addEventListener("change", () => {
  const regions = CASCADING_LOCATIONS[cascadingCountry.value] || {};
  cascadingRegion.innerHTML = '<option value="">Region</option>';
  cascadingCity.innerHTML = '<option value="">City</option>';
  cascadingRegion.disabled = !cascadingCountry.value;
  cascadingCity.disabled = true;
  Object.keys(regions).forEach((region) => {
    const opt = document.createElement("option");
    opt.value = region;
    opt.textContent = region;
    cascadingRegion.appendChild(opt);
  });
});

cascadingRegion.addEventListener("change", () => {
  const regions = CASCADING_LOCATIONS[cascadingCountry.value] || {};
  const cities = regions[cascadingRegion.value] || [];
  cascadingCity.innerHTML = '<option value="">City</option>';
  cascadingCity.disabled = !cascadingRegion.value;
  cities.forEach((city) => {
    const opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    cascadingCity.appendChild(opt);
  });
});

// --- Multi-checkbox dropdown ---
const multiCheckboxToggle = document.querySelector('[data-testid="form-elements-dropdown-multicheckbox-toggle"]');
const multiCheckboxMenu = document.querySelector('[data-testid="form-elements-dropdown-multicheckbox-menu"]');
const multiCheckboxLabel = document.querySelector('[data-testid="form-elements-dropdown-multicheckbox-label"]');
multiCheckboxMenu.innerHTML = SKILLS.map(
  (skill) => `
    <label style="display:block; padding:0.35rem 0.5rem;">
      <input type="checkbox" value="${skill}" data-testid="form-elements-dropdown-multicheckbox-option-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}" /> ${skill}
    </label>`
).join("");
multiCheckboxToggle.addEventListener("click", () => {
  const isOpen = multiCheckboxMenu.hidden;
  multiCheckboxMenu.hidden = !isOpen;
  multiCheckboxToggle.setAttribute("aria-expanded", String(isOpen));
});
multiCheckboxMenu.addEventListener("change", () => {
  const checked = Array.from(multiCheckboxMenu.querySelectorAll("input:checked")).map((i) => i.value);
  multiCheckboxLabel.textContent = checked.length ? checked.join(", ") : "Select skills";
});

// --- Focus-gated dropdown ---
const fullNameInput = document.querySelector('[data-testid="form-elements-input-fullname"]');
const focusGatedSelect = document.querySelector('[data-testid="form-elements-dropdown-focusgated"]');
fullNameInput.addEventListener("input", () => {
  if (fullNameInput.value.trim()) {
    if (focusGatedSelect.disabled) {
      focusGatedSelect.disabled = false;
      focusGatedSelect.innerHTML =
        '<option value="">Select an option</option>' + FRAMEWORKS.map((fw) => `<option value="${fw}">${fw}</option>`).join("");
    }
  } else {
    focusGatedSelect.disabled = true;
    focusGatedSelect.innerHTML = '<option value="">Fill in Full Name first</option>';
  }
});

// --- Delayed dropdown ---
const delayedSelect = document.querySelector('[data-testid="form-elements-dropdown-delayed"]');
setTimeout(() => {
  delayedSelect.innerHTML = '<option value="">Select an option</option>' + COUNTRIES.map((c) => `<option value="${c}">${c}</option>`).join("");
}, 2000);
