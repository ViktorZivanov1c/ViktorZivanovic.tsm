/* Stranica za predaju rada. Podaci ostaju samo u pregledaču učenika. */
(function () {
  "use strict";

  const DB_NAME = "notebook-assignment-submissions";
  const STORE_NAME = "submissions";
  const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
  let database;
  let assignment;
  let currentProof = "";

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
      request.onsuccess = () => { database = request.result; resolve(); };
      request.onerror = () => reject(request.error);
    });
  }

  function getSubmission(key) {
    return new Promise((resolve, reject) => {
      const request = database.transaction(STORE_NAME).objectStore(STORE_NAME).get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  function saveSubmission(key, value) {
    return new Promise((resolve, reject) => {
      const request = database.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).put(value, key);
      request.onsuccess = resolve;
      request.onerror = () => reject(request.error);
    });
  }

  function setStatus(message, tone) {
    const status = document.getElementById("submission-status");
    status.textContent = message;
    status.className = `submission-status ${tone || ""}`;
  }

  function showProof(src) {
    const image = document.getElementById("proof-preview");
    const empty = document.getElementById("proof-empty");
    currentProof = src || "";
    image.src = currentProof;
    image.hidden = !currentProof;
    empty.hidden = Boolean(currentProof);
  }

  async function loadSubmission() {
    const stored = await getSubmission(String(assignment.number));
    if (!stored) return;
    document.getElementById("code-input").value = stored.code || "";
    showProof(stored.proof || "");
    if (stored.savedAt) setStatus(`Sačuvano na ovom uređaju: ${new Date(stored.savedAt).toLocaleString("sr-Latn-RS")}.`, "success");
  }

  function testCode() {
    const code = document.getElementById("code-input").value.trim();
    const output = document.getElementById("test-result");
    if (!code) {
      output.textContent = "Unesi C# kod pre provere.";
      output.className = "test-result error";
      return;
    }
    const rules = assignment.requiredPatterns || [];
    if (!rules.length) {
      output.textContent = "Kod je sačuvan, ali za ovaj zadatak još nisu dodata pravila provere. Pravo pokretanje C# koda zahteva server za kompajliranje.";
      output.className = "test-result warning";
      return;
    }
    const missing = rules.filter((rule) => !code.toLowerCase().includes(rule.toLowerCase()));
    if (missing.length) {
      output.textContent = `Nedostaje obavezan deo: ${missing.join(", ")}.`;
      output.className = "test-result error";
    } else {
      output.textContent = "Osnovna provera je prošla: pronađeni su svi traženi delovi koda.";
      output.className = "test-result success";
    }
  }

  async function initialise() {
    const id = new URLSearchParams(window.location.search).get("id");
    const assignments = typeof ASSIGNMENTS !== "undefined" ? ASSIGNMENTS : [];
    assignment = assignments.find((item) => String(item.number) === id);
    const content = document.getElementById("task-content");
    const missing = document.getElementById("task-missing");
    if (!assignment) { content.hidden = true; missing.hidden = false; return; }
    const siteName = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.siteName : "Notebook";
    document.title = `${assignment.title} — ${siteName || "Notebook"}`;
    document.getElementById("task-number").textContent = `ZADATAK #${assignment.number}`;
    document.getElementById("task-title").textContent = assignment.title;
    document.getElementById("task-description").textContent = assignment.description;
    document.getElementById("task-lesson").textContent = `Čas ${assignment.lesson}`;

    try { await openDatabase(); await loadSubmission(); }
    catch (_) { setStatus("Pregledač ne dozvoljava lokalno čuvanje. I dalje možeš da preuzmeš svoj kod.", "error"); }

    document.getElementById("proof-input").addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) { setStatus("Dokaz mora biti slika (JPG, PNG ili WEBP).", "error"); event.target.value = ""; return; }
      if (file.size > MAX_IMAGE_BYTES) { setStatus("Slika je prevelika. Izaberi sliku manju od 4 MB.", "error"); event.target.value = ""; return; }
      const reader = new FileReader();
      reader.onload = () => { showProof(String(reader.result)); setStatus("Dokaz je dodat. Sačuvaj izmene kada završiš."); };
      reader.readAsDataURL(file);
    });
    document.getElementById("remove-proof").addEventListener("click", () => { document.getElementById("proof-input").value = ""; showProof(""); setStatus("Dokaz je uklonjen. Sačuvaj izmene."); });
    document.getElementById("save-submission").addEventListener("click", async () => {
      if (!database) return;
      try {
        await saveSubmission(String(assignment.number), { code: document.getElementById("code-input").value, proof: currentProof, savedAt: new Date().toISOString() });
        setStatus("Kod i dokaz su sačuvani na ovom uređaju.", "success");
      } catch (_) {
        setStatus("Čuvanje nije uspelo. Probaj manju sliku ili preuzmi kod kao .cs fajl.", "error");
      }
    });
    document.getElementById("run-test").addEventListener("click", testCode);
    document.getElementById("download-code").addEventListener("click", () => {
      const file = new Blob([document.getElementById("code-input").value], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a"); link.href = URL.createObjectURL(file); link.download = `zadatak-${assignment.number}.cs`; link.click(); URL.revokeObjectURL(link.href);
    });
  }
  document.addEventListener("DOMContentLoaded", initialise);
}());
