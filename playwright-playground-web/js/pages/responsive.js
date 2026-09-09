const label = document.querySelector('[data-testid="responsive-breakpoint-label"]');
const widthLabel = document.querySelector('[data-testid="responsive-viewport-width"]');

function currentBreakpoint(width) {
  if (width <= 480) return "mobile";
  if (width <= 768) return "tablet";
  return "desktop";
}

function render() {
  const width = window.innerWidth;
  label.textContent = currentBreakpoint(width);
  widthLabel.textContent = String(width);
}

window.addEventListener("resize", render);
render();
