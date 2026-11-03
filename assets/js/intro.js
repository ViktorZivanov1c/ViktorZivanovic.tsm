(() => {
  "use strict";

  function initIntro() {
    const intro = document.querySelector(".site-intro");
    if (!intro) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dismiss = () => {
      if (intro.classList.contains("is-leaving")) return;
      intro.classList.add("is-leaving");
      window.setTimeout(() => {
        intro.hidden = true;
        document.body.classList.remove("intro-active");
      }, reduceMotion ? 0 : 650);
    };

    document.body.classList.add("intro-active");
    intro.querySelector("[data-intro-skip]")?.addEventListener("click", () => dismiss());
    intro.addEventListener("wheel", () => dismiss(), { once: true, passive: true });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") dismiss();
    }, { once: true });

    window.setTimeout(() => dismiss(), reduceMotion ? 0 : 4200);
  }

  document.addEventListener("DOMContentLoaded", initIntro);
})();
