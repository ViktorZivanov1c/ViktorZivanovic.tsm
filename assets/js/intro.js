(() => {
  "use strict";

  function initIntro() {
    const intro = document.querySelector(".site-intro");
    if (!intro) return;

    const storageKey = "viktor-portfolio-intro-complete";
    if (sessionStorage.getItem(storageKey)) {
      intro.hidden = true;
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dismiss = (skip = false) => {
      if (intro.classList.contains("is-leaving") || intro.classList.contains("is-verifying")) return;
      const finish = () => {
        intro.hidden = true;
        document.body.classList.remove("intro-active");
        sessionStorage.setItem(storageKey, "1");
      };
      if (skip || reduceMotion) {
        intro.classList.add("is-leaving");
        window.setTimeout(finish, reduceMotion ? 0 : 450);
        return;
      }
      intro.classList.add("is-verifying");
      window.setTimeout(() => intro.classList.add("is-unlocking"), 850);
      window.setTimeout(() => intro.classList.add("is-leaving"), 1450);
      window.setTimeout(finish, 2150);
    };

    document.body.classList.add("intro-active");
    intro.querySelector(".intro-enter")?.addEventListener("click", () => dismiss());
    intro.querySelector(".intro-skip")?.addEventListener("click", () => dismiss(true));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") dismiss(true);
      if (event.key === "Enter" || event.key === " ") dismiss();
    }, { once: true });
  }

  document.addEventListener("DOMContentLoaded", initIntro);
})();
