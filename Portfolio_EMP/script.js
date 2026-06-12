const slides = [...document.querySelectorAll(".portfolio-slide")];
const dots = [...document.querySelectorAll(".slide-dot")];
const links = [...document.querySelectorAll(".nav-links a")];
const isMobilePage = window.matchMedia("(max-width: 640px)").matches;

const setActiveSlide = (id) => {
  slides.forEach((slide) => {
    slide.classList.toggle("is-active", slide.id === id);
  });

  dots.forEach((dot) => {
    dot.classList.toggle("is-active", dot.dataset.target === id);
  });

  links.forEach((link) => {
    const target = link.getAttribute("href")?.slice(1);
    link.classList.toggle("is-active", target === id);
  });
};

const goToSlide = (id) => {
  const slide = document.getElementById(id);
  if (!slide) return;
  slide.scrollIntoView({ behavior: "smooth", block: "start" });
};

if (!isMobilePage) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSlide(entry.target.id);
      });
    },
    { threshold: 0.52, rootMargin: "-8% 0px -8% 0px" }
  );

  slides.forEach((slide) => observer.observe(slide));
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href")?.slice(1);
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    goToSlide(id);
  });
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => goToSlide(dot.dataset.target));
});

setActiveSlide(location.hash?.slice(1) || "home");
if (!isMobilePage) {
  document.documentElement.classList.add("js-ready");
}
