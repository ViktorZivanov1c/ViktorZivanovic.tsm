/* Javna, samo-za-prikaz stranica zadatka. Sadržaj se dodaje iz projekta. */
(function () {
  "use strict";

  async function loadTask() {
    const id = new URLSearchParams(window.location.search).get("id");
    const assignments = typeof ASSIGNMENTS !== "undefined" ? ASSIGNMENTS : [];
    const assignment = assignments.find((item) => String(item.number) === id);
    const content = document.getElementById("task-content");
    const missing = document.getElementById("task-missing");
    if (!assignment) { content.hidden = true; missing.hidden = false; return; }

    const siteName = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.siteName : "Notebook";
    document.title = `${assignment.title} — ${siteName || "Notebook"}`;
    document.getElementById("task-number").textContent = `ZADATAK #${assignment.number}`;
    document.getElementById("task-title").textContent = assignment.title;
    document.getElementById("task-description").textContent = assignment.description;
    document.getElementById("task-lesson").textContent = `Čas ${assignment.lesson}`;

    const codeView = document.getElementById("code-view");
    if (assignment.codeFile) {
      try {
        const response = await fetch(assignment.codeFile);
        if (!response.ok) throw new Error("Could not load source code.");
        codeView.textContent = await response.text();
      } catch (_) {
        codeView.textContent = "Kod trenutno nije dostupan.";
      }
    } else {
      codeView.textContent = "Kod za ovaj zadatak još nije dodat.";
    }

    const screenshot = assignment.screenshots?.[0];
    const preview = document.getElementById("proof-preview");
    const empty = document.getElementById("proof-empty");
    const hint = document.getElementById("proof-hint");
    const view = document.getElementById("view-proof");
    if (screenshot) {
      preview.src = screenshot;
      preview.hidden = false;
      empty.hidden = true;
      hint.hidden = false;
      view.addEventListener("click", () => {
        if (window.__openLightbox) window.__openLightbox(screenshot, `Dokaz — ${assignment.title}`);
      });
    } else {
      view.disabled = true;
    }
  }

  document.addEventListener("DOMContentLoaded", loadTask);
}());
