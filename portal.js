document.documentElement.classList.add("portal-ready");

document.querySelectorAll(".path-link").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.closest(".path-panel")?.classList.add("is-hovered");
  });

  link.addEventListener("mouseleave", () => {
    link.closest(".path-panel")?.classList.remove("is-hovered");
  });
});
