const SLIDES = [
  { color: "#6366f1", label: "Slide 1" },
  { color: "#0284c7", label: "Slide 2" },
  { color: "#16a34a", label: "Slide 3" },
  { color: "#d97706", label: "Slide 4" },
];

let currentIndex = 0;
let autoplayTimer = null;

const track = document.querySelector('[data-testid="carousel-track"]');
const dotsContainer = document.querySelector('[data-testid="carousel-dots"]');
const currentIndexLabel = document.querySelector('[data-testid="carousel-current-index"]');

track.innerHTML = SLIDES.map((s) => `<div class="carousel__slide" style="background:${s.color};">${s.label}</div>`).join("");
dotsContainer.innerHTML = SLIDES.map(
  (_, i) => `<button class="carousel__dot" data-testid="carousel-dot-${i}" aria-label="Go to slide ${i + 1}"></button>`
).join("");

function render() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dotsContainer.querySelectorAll(".carousel__dot").forEach((dot, i) => {
    dot.setAttribute("aria-current", String(i === currentIndex));
  });
  currentIndexLabel.textContent = `Slide ${currentIndex + 1} of ${SLIDES.length}`;
}

function goTo(index) {
  currentIndex = (index + SLIDES.length) % SLIDES.length;
  render();
}

document.querySelector('[data-testid="carousel-prev-btn"]').addEventListener("click", () => goTo(currentIndex - 1));
document.querySelector('[data-testid="carousel-next-btn"]').addEventListener("click", () => goTo(currentIndex + 1));
dotsContainer.querySelectorAll(".carousel__dot").forEach((dot, i) => {
  dot.addEventListener("click", () => goTo(i));
});

document.querySelector('[data-testid="carousel-autoplay-toggle"]').addEventListener("change", (event) => {
  if (event.target.checked) {
    autoplayTimer = setInterval(() => goTo(currentIndex + 1), 2000);
  } else {
    clearInterval(autoplayTimer);
  }
});

render();
