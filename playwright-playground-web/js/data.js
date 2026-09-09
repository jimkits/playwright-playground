// Central static/in-memory data store for the whole site.
// Everything here resets on page reload - there is no backend and no persistence.

export const SECTIONS = [
  { slug: "form-elements", title: "Form Elements" },
  { slug: "data-tables", title: "Data Tables" },
  { slug: "interactions", title: "Interactions" },
  { slug: "shopping", title: "Shopping" },
  { slug: "dynamic-content", title: "Dynamic Content" },
  { slug: "modals-alerts", title: "Modals & Alerts" },
  { slug: "tabs-accordion", title: "Tabs & Accordion" },
  { slug: "frames-windows", title: "Frames & Windows" },
  { slug: "shadow-dom", title: "Shadow DOM" },
  { slug: "advanced-scenarios", title: "Advanced Scenarios" },
  { slug: "wizard", title: "Multi-Step Wizard" },
  { slug: "carousel", title: "Carousel" },
  { slug: "network-api", title: "Network & API" },
  { slug: "flaky-retry", title: "Flaky & Retry" },
  { slug: "date-picker", title: "Custom Date Picker" },
  { slug: "media-player", title: "Media Player" },
  { slug: "accessibility", title: "Accessibility" },
  { slug: "responsive", title: "Responsive Testing" },
  { slug: "protected-content", title: "Protected Content" },
];

export const USERS = [
  { id: 1, name: "Ava Thompson", email: "ava.thompson@example.com", role: "Admin", status: "Active", joinDate: "2023-01-12" },
  { id: 2, name: "Liam Chen", email: "liam.chen@example.com", role: "Editor", status: "Active", joinDate: "2023-03-04" },
  { id: 3, name: "Sofia Rossi", email: "sofia.rossi@example.com", role: "Viewer", status: "Inactive", joinDate: "2023-04-18" },
  { id: 4, name: "Noah Williams", email: "noah.williams@example.com", role: "Editor", status: "Active", joinDate: "2023-06-02" },
  { id: 5, name: "Mia Garcia", email: "mia.garcia@example.com", role: "Viewer", status: "Active", joinDate: "2023-07-21" },
  { id: 6, name: "Ethan Kim", email: "ethan.kim@example.com", role: "Admin", status: "Inactive", joinDate: "2023-09-09" },
  { id: 7, name: "Isabella Silva", email: "isabella.silva@example.com", role: "Viewer", status: "Active", joinDate: "2023-10-30" },
  { id: 8, name: "Lucas Martin", email: "lucas.martin@example.com", role: "Editor", status: "Active", joinDate: "2024-01-15" },
];

export const PRODUCTS = [
  { id: 1, name: "Aurora Watch", category: "Luxury", description: "Automatic movement watch with sapphire crystal.", price: 249.99, imageUrl: "https://picsum.photos/seed/aurora-watch/400/300", stock: 12 },
  { id: 2, name: "Trailblazer Sneakers", category: "Sport", description: "Lightweight running shoes with breathable mesh.", price: 89.5, imageUrl: "https://picsum.photos/seed/trailblazer/400/300", stock: 40 },
  { id: 3, name: "Heritage Leather Wallet", category: "Classic", description: "Full-grain leather bifold wallet.", price: 45.0, imageUrl: "https://picsum.photos/seed/wallet/400/300", stock: 25 },
  { id: 4, name: "Velocity Backpack", category: "Sport", description: "Water-resistant backpack with laptop sleeve.", price: 65.0, imageUrl: "https://picsum.photos/seed/backpack/400/300", stock: 18 },
  { id: 5, name: "Oakridge Sunglasses", category: "Classic", description: "Polarized acetate frame sunglasses.", price: 120.0, imageUrl: "https://picsum.photos/seed/sunglasses/400/300", stock: 30 },
  { id: 6, name: "Platinum Cufflinks", category: "Luxury", description: "Hand-polished platinum-finish cufflinks.", price: 180.0, imageUrl: "https://picsum.photos/seed/cufflinks/400/300", stock: 8 },
];

export const COUPONS = [
  { code: "FLAT10", discountPercent: 10, minOrderAmount: 0 },
  { code: "SPEED20", discountPercent: 20, minOrderAmount: 100 },
  { code: "FIRST500", discountPercent: 15, minOrderAmount: 500 },
];

export const TASKS = [
  { id: 1, title: "Write test plan", order: 1 },
  { id: 2, title: "Automate login flow", order: 2 },
  { id: 3, title: "Cover checkout journey", order: 3 },
  { id: 4, title: "Add visual regression checks", order: 4 },
  { id: 5, title: "Review flaky tests", order: 5 },
];

export const FRAMEWORKS = ["Playwright", "Selenium", "Cypress", "WebdriverIO", "Puppeteer"];

export const SKILLS = ["JavaScript", "TypeScript", "Python", "Java", "CI/CD", "Accessibility"];

export const COUNTRIES = ["United Kingdom", "United States", "Germany", "Greece", "Canada", "Australia"];

export const GROUPED_OPTIONS = [
  { groupLabel: "Frontend", options: ["React", "Angular", "Vue", "Svelte"] },
  { groupLabel: "Backend", options: ["Node.js", "Django", "Spring Boot", ".NET"] },
  { groupLabel: "Mobile", options: ["React Native", "Flutter", "Swift"] },
];

export const CASCADING_LOCATIONS = {
  "United Kingdom": {
    England: ["London", "Manchester", "Bristol"],
    Scotland: ["Edinburgh", "Glasgow"],
  },
  Greece: {
    Attica: ["Athens", "Piraeus"],
    "Central Macedonia": ["Thessaloniki"],
  },
  "United States": {
    California: ["Los Angeles", "San Francisco"],
    "New York": ["New York City", "Buffalo"],
  },
};

export const AUTOSUGGEST_ITEMS = [
  { id: 1, label: "Locator strategies" },
  { id: 2, label: "Auto-waiting" },
  { id: 3, label: "Network interception" },
  { id: 4, label: "Visual comparisons" },
  { id: 5, label: "Trace viewer" },
  { id: 6, label: "Component testing" },
  { id: 7, label: "Page Object Model" },
  { id: 8, label: "Fixtures" },
];

// Config for the intentionally-unreliable elements on the Flaky & Retry page.
export const FLAKY_CONFIG = {
  successProbability: 0.34, // "click me" button succeeds ~1 in 3 clicks
  delayEnableMs: 2500, // element becomes clickable after this delay
  flipIntervalMs: 1500, // state flips between two values on this interval
};

export function generateRandomRows(count = 5) {
  const adjectives = ["Swift", "Bright", "Calm", "Bold", "Quiet", "Sharp"];
  const nouns = ["Falcon", "River", "Comet", "Harbor", "Ember", "Lantern"];
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push({
      id: i + 1,
      label: `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`,
      value: Math.floor(Math.random() * 1000),
    });
  }
  return rows;
}
