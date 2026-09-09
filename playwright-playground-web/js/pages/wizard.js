const state = {
  step: 1,
  personal: { fullName: "", email: "", phone: "" },
  address: { street: "", city: "", state: "", zip: "" },
  payment: { cardNumber: "", expiry: "", cvv: "" },
};

const TOTAL_STEPS = 4;
const backBtn = document.querySelector('[data-testid="wizard-back-btn"]');
const nextBtn = document.querySelector('[data-testid="wizard-next-btn"]');
const submitBtn = document.querySelector('[data-testid="wizard-submit-btn"]');
const submitResult = document.querySelector('[data-testid="wizard-submit-result"]');

function saveCurrentStep() {
  if (state.step === 1) {
    state.personal.fullName = document.querySelector('[data-testid="wizard-input-fullname"]').value;
    state.personal.email = document.querySelector('[data-testid="wizard-input-email"]').value;
    state.personal.phone = document.querySelector('[data-testid="wizard-input-phone"]').value;
  } else if (state.step === 2) {
    state.address.street = document.querySelector('[data-testid="wizard-input-street"]').value;
    state.address.city = document.querySelector('[data-testid="wizard-input-city"]').value;
    state.address.state = document.querySelector('[data-testid="wizard-input-state"]').value;
    state.address.zip = document.querySelector('[data-testid="wizard-input-zip"]').value;
  } else if (state.step === 3) {
    state.payment.cardNumber = document.querySelector('[data-testid="wizard-input-cardnumber"]').value;
    state.payment.expiry = document.querySelector('[data-testid="wizard-input-expiry"]').value;
    state.payment.cvv = document.querySelector('[data-testid="wizard-input-cvv"]').value;
  }
}

function renderReview() {
  const dl = document.querySelector('[data-testid="wizard-review-summary"]');
  dl.innerHTML = `
    <dt>Full Name</dt><dd>${state.personal.fullName}</dd>
    <dt>Email</dt><dd>${state.personal.email}</dd>
    <dt>Phone</dt><dd>${state.personal.phone}</dd>
    <dt>Address</dt><dd>${state.address.street}, ${state.address.city}, ${state.address.state} ${state.address.zip}</dd>
    <dt>Card</dt><dd>**** **** **** ${state.payment.cardNumber.slice(-4)}</dd>
  `;
}

function render() {
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    document.querySelector(`[data-testid="wizard-panel-${i}"]`).hidden = i !== state.step;
    document.querySelector(`[data-testid="wizard-step-indicator-${i}"]`).setAttribute("aria-current", String(i === state.step));
  }
  backBtn.disabled = state.step === 1;
  nextBtn.hidden = state.step === TOTAL_STEPS;
  submitBtn.hidden = state.step !== TOTAL_STEPS;

  if (state.step === TOTAL_STEPS) {
    renderReview();
  }
}

nextBtn.addEventListener("click", () => {
  saveCurrentStep();
  state.step = Math.min(TOTAL_STEPS, state.step + 1);
  render();
});

backBtn.addEventListener("click", () => {
  saveCurrentStep();
  state.step = Math.max(1, state.step - 1);
  render();
});

submitBtn.addEventListener("click", () => {
  submitResult.hidden = false;
  submitResult.textContent = "Wizard submitted successfully.";
});

render();
