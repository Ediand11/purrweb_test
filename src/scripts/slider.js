const sliders = document.getElementById("sliders");
const images = sliders.querySelectorAll("img");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const dotsContainer = document.getElementById("dots");

let dots = [];
let currentIndex = 0;

images.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dots.push(dot);
  dotsContainer.appendChild(dot);
});

async function changeSlide(counterImageSlide, side) {
  prevButton.setAttribute("disabled", "disabled");
  nextButton.setAttribute("disabled", "disabled");
  dots.forEach((dot) => dot.setAttribute("disabled", "disabled"));
  dots[currentIndex].classList.remove("active");

  for (let i = 0; i < counterImageSlide; i++) {
    let prevIndex;
    let offset = 1;

    if (side === 1) prevIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    else prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    images[prevIndex].style.transform = `translateX(${100 * side}%)`;
    images[prevIndex].classList.remove("hide");

    await new Promise((resolve) => {
      const interval = setInterval(() => {
        offset += 2 * counterImageSlide;
        images[prevIndex].style.transform = `translateX(${100 * side - offset * side}%)`;
        images[currentIndex].style.transform = `translateX(${-offset * side}%)`;

        if (offset >= 100) {
          clearInterval(interval);
          resolve(true);
        }
      }, 10);
    });

    images[prevIndex].style.transform = ``;
    images[currentIndex].style.transform = ``;
    images[currentIndex].classList.add("hide");
    currentIndex = prevIndex;
  }

  dots[currentIndex].classList.add("active");

  dots.forEach((dot) => dot.removeAttribute("disabled"));
  prevButton.removeAttribute("disabled");
  nextButton.removeAttribute("disabled");
}

prevButton.addEventListener("click", () => {
  changeSlide(1, -1);
});

nextButton.addEventListener("click", () => {
  changeSlide(1, 1);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (index !== currentIndex) {
      const side = index > currentIndex ? 1 : -1;
      changeSlide(Math.abs(index - currentIndex), side);
    }
  });
});
