/* ==========================================================
   GLASSY OTP INTRO CONTROLLER
   Builds the V/I/K/T/O/R reveal, orbit sequence and approval state.
   ========================================================== */

(() => {
  "use strict";

  const storageKey = "viktor-portfolio-intro-complete";

  function buildIntroMarkup() {
    return `
      <div class="intro-ribbon ribbon-left" aria-hidden="true"></div>
      <div class="intro-ribbon ribbon-right" aria-hidden="true"></div>
      <div class="intro-shell">
        <div class="intro-title-lockup">
          <span class="intro-record-dot" aria-hidden="true"></span>
          Viktorov portfolio
        </div>
        <section class="intro-card" aria-live="polite">
          <div class="intro-cut intro-cut-top" aria-hidden="true"></div>
          <div class="intro-cut intro-cut-bottom" aria-hidden="true"></div>
          <div class="intro-icon" aria-hidden="true">
            <span class="intro-key">&#128273;</span>
            <span class="intro-shield">✓</span>
          </div>
          <h1 class="intro-heading">Dobro <span>došli</span></h1>
          <p class="intro-copy" id="intro-copy">Viktorov školski portfolio</p>
          <div class="intro-token-stage" aria-label="V I K T O R">
            <span class="intro-token" data-letter="V">V</span>
            <span class="intro-token" data-letter="I">I</span>
            <span class="intro-token" data-letter="K">K</span>
            <span class="intro-token" data-letter="T">T</span>
            <span class="intro-token" data-letter="O">O</span>
            <span class="intro-token" data-letter="R">R</span>
            <span class="intro-energy-ring" aria-hidden="true"></span>
            <span class="intro-success-core" aria-hidden="true">
              <svg viewBox="0 0 32 32" focusable="false">
                <path d="M7 16.5 13 22l12-12"></path>
              </svg>
            </span>
            <span class="intro-success-ring" aria-hidden="true"></span>
          </div>
          <p class="intro-status" id="intro-status">
            <span class="intro-status-dot" aria-hidden="true"></span>
            Sigurna veza uspostavljena
          </p>
          <button class="intro-enter" id="intro-enter" type="button">
            <span class="intro-button-spinner" aria-hidden="true"></span>
            <span class="intro-button-label">Pregledaj portfolio</span>
            <span class="intro-button-arrow" aria-hidden="true">→</span>
          </button>
        </section>
      </div>
      <button class="intro-skip" id="intro-skip" type="button">Preskoči intro</button>
    `;
  }

  function wait(milliseconds) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, milliseconds);
    });
  }

  function setSuccessCopy(heading, copy, status) {
    heading.innerHTML = 'Pristup <span>odobren</span>';
    copy.textContent = "Verifikacija je uspešna. Dobrodošao u portfolio.";
    status.innerHTML = '<span class="intro-status-dot" aria-hidden="true"></span>Pristup je bezbedno odobren';
  }

  async function revealLetters(intro, tokens, reducedMotion) {
    for (const token of tokens) {
      if (intro.classList.contains("is-verifying") || intro.classList.contains("is-leaving")) {
        return;
      }
      token.classList.add("is-typed", "is-active");
      await wait(reducedMotion ? 0 : 190);
      token.classList.remove("is-active");
    }
  }

  async function runVerification(intro, elements, reducedMotion) {
    const { enterButton, heading, copy, status, tokens } = elements;

    enterButton.disabled = true;
    tokens.forEach((token) => {
      token.classList.add("is-typed");
      token.classList.remove("is-active");
    });
    intro.classList.add("is-verifying");

    await wait(reducedMotion ? 0 : 480);
    if (intro.classList.contains("is-leaving")) return;
    intro.classList.add("is-orbiting");

    await wait(reducedMotion ? 0 : 2250);
    if (intro.classList.contains("is-leaving")) return;
    intro.classList.add("is-merging");

    await wait(reducedMotion ? 0 : 570);
    if (intro.classList.contains("is-leaving")) return;
    intro.classList.add("is-success");
    setSuccessCopy(heading, copy, status);

    // Keep the green "approved" state visible long enough to register.
    await wait(reducedMotion ? 0 : 2450);
    if (intro.classList.contains("is-leaving")) return;
    intro.classList.add("is-leaving");

    await wait(reducedMotion ? 0 : 720);
    intro.hidden = true;
    document.body.classList.remove("intro-active");
    sessionStorage.setItem(storageKey, "1");
  }

  async function skipIntro(intro, reducedMotion) {
    if (intro.classList.contains("is-leaving")) {
      return;
    }

    intro.classList.add("is-leaving");
    await wait(reducedMotion ? 0 : 420);
    intro.hidden = true;
    document.body.classList.remove("intro-active");
    sessionStorage.setItem(storageKey, "1");
  }

  async function initializeIntro() {
    const intro = document.querySelector(".site-intro");

    if (!intro) {
      return;
    }

    if (sessionStorage.getItem(storageKey)) {
      intro.hidden = true;
      return;
    }

    intro.hidden = false;
    intro.innerHTML = buildIntroMarkup();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = {
      enterButton: intro.querySelector("#intro-enter"),
      skipButton: intro.querySelector("#intro-skip"),
      heading: intro.querySelector(".intro-heading"),
      copy: intro.querySelector("#intro-copy"),
      status: intro.querySelector("#intro-status"),
      tokens: [...intro.querySelectorAll(".intro-token")]
    };

    document.body.classList.add("intro-active");
    elements.enterButton.addEventListener("click", () => {
      runVerification(intro, elements, reducedMotion);
    }, { once: true });

    elements.skipButton.addEventListener("click", () => {
      skipIntro(intro, reducedMotion);
    }, { once: true });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !intro.hidden) {
        skipIntro(intro, reducedMotion);
      }
    });

    revealLetters(intro, elements.tokens, reducedMotion);
  }

  document.addEventListener("DOMContentLoaded", initializeIntro);
})();
