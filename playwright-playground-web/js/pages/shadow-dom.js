class CustomCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        .wrapper { display: flex; align-items: center; gap: 0.75rem; font-family: inherit; }
        button { padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #d9dce3; background: #fff; cursor: pointer; }
        span { font-weight: 700; font-size: 1.1rem; }
      </style>
      <div class="wrapper">
        <button data-testid="shadow-counter-decrement-btn">-</button>
        <span data-testid="shadow-counter-value">0</span>
        <button data-testid="shadow-counter-increment-btn">+</button>
      </div>
    `;

    const valueEl = shadow.querySelector('[data-testid="shadow-counter-value"]');
    shadow.querySelector('[data-testid="shadow-counter-increment-btn"]').addEventListener("click", () => {
      this.count += 1;
      valueEl.textContent = String(this.count);
    });
    shadow.querySelector('[data-testid="shadow-counter-decrement-btn"]').addEventListener("click", () => {
      this.count -= 1;
      valueEl.textContent = String(this.count);
    });
  }
}

customElements.define("custom-counter", CustomCounter);
