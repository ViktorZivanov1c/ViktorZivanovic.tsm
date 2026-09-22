/**
 * ============================================================
 *  RENDER.JS
 *  Shared logic used by every page: applies SITE_CONFIG to the
 *  page, builds assignment/homework cards from data files, and
 *  wires up small interactions (mobile nav, lightbox, filters).
 *
 *  You shouldn't need to edit this file to update your info —
 *  see assets/js/config.js for that.
 * ============================================================
 */

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("sr-Latn-RS", { year: "numeric", month: "short", day: "numeric" });
}

function initials(cfg) {
  const f = (cfg.firstName || "").trim()[0] || "";
  const l = (cfg.lastName || "").trim()[0] || "";
  const s = (f + l).toUpperCase();
  return s || "NB";
}

/* ---- Apply SITE_CONFIG to every [data-cfg] element on the page ---- */
function applyConfig() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const fullName = `${cfg.firstName} ${cfg.lastName}`.trim();

  document.title = cfg.siteName || "Portfolio";
  document.querySelectorAll('[data-cfg-href="github"]').forEach((el) => { el.textContent = "GitHub profil"; });
  document.querySelectorAll('[data-cfg-href="email"]').forEach((el) => { el.textContent = "E-mail"; });
  document.querySelectorAll("[data-cfg]").forEach((el) => {
    const key = el.getAttribute("data-cfg");
    const map = {
      fullName,
      firstName: cfg.firstName,
      lastName: cfg.lastName,
      username: cfg.username,
      school: cfg.school,
      grade: cfg.grade,
      teacher: cfg.teacher,
      bio: cfg.bio,
      siteName: cfg.siteName,
      tagline: cfg.tagline,
      initials: initials(cfg)
    };
    if (key in map && map[key] !== undefined) el.textContent = map[key];
  });

  document.querySelectorAll("[data-cfg-href]").forEach((el) => {
    const key = el.getAttribute("data-cfg-href");
    if (key === "github" && cfg.links?.github) {
      el.href = cfg.links.github;
      el.style.display = "";
    } else if (key === "email" && cfg.links?.email) {
      el.href = `mailto:${cfg.links.email}`;
      el.style.display = "";
    } else if (key === "github" || key === "email") {
      el.style.display = "none";
    }
  });

  const techGrid = document.getElementById("tech-grid");
  if (techGrid && Array.isArray(cfg.technologies)) {
    techGrid.innerHTML = cfg.technologies
      .map((t) => `<span class="chip accent">${escapeHtml(t)}</span>`)
      .join("");
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---- Mobile nav toggle ---- */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const sidebar = document.getElementById("sidebar");
  if (!toggle || !sidebar) return;
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-open");
  });
  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("mobile-open") && !sidebar.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
      sidebar.classList.remove("mobile-open");
    }
  });
}

/* ---- Active nav link ---- */
function markActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".side-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

/* ---- Lightbox ---- */
function initLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  const img = document.getElementById("lightbox-img");
  const label = document.getElementById("lightbox-label");
  const closeBtn = document.getElementById("lightbox-close");

  function open(src, title) {
    img.src = src;
    img.alt = title || "Screenshot";
    label.textContent = title || "";
    lb.classList.add("open");
  }
  function close() {
    lb.classList.remove("open");
    img.src = "";
  }
  closeBtn.addEventListener("click", close);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  window.__openLightbox = open;
}

/* ---- Card builders ---- */
function assignmentCardHTML(a) {
  const shot = (a.screenshots && a.screenshots[0]) || "";
  const preview = shot
    ? `<button class="thumb" type="button" data-src="${escapeHtml(shot)}" data-title="Assignment ${a.number} — ${escapeHtml(a.title)}" aria-label="View screenshot for ${escapeHtml(a.title)}">
        <img src="${escapeHtml(shot)}" alt="Screenshot for ${escapeHtml(a.title)}" loading="lazy">
      </button>`
    : `<div class="thumb thumb-placeholder" aria-hidden="true">
        <span class="placeholder-number">${String(a.number).padStart(2, "0")}</span>
        <span class="placeholder-label">zadatak</span>
      </div>`;
  return `
    <article class="card" data-title="${escapeHtml(a.title)}" data-tech="${escapeHtml((a.technologies || []).join(","))}">
      ${preview}
      <div class="card-body">
        <div class="card-top">
          <span class="badge">#${a.number}</span>
          <span class="date">${formatDate(a.date)}</span>
        </div>
        <h3>${escapeHtml(a.title)}</h3>
        <span class="lesson-tag">Cas ${a.lesson}</span>
        <p class="desc">${escapeHtml(a.description)}</p>
        <div class="card-tags">
          ${(a.technologies || []).map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    </article>`;
}

function homeworkCardHTML(h) {
  const preview = h.screenshot
    ? `<button class="thumb" type="button" data-src="${escapeHtml(h.screenshot)}" data-title="Domaci rad ${h.number} — ${escapeHtml(h.title)}" aria-label="View screenshot for ${escapeHtml(h.title)}">
        <img src="${escapeHtml(h.screenshot)}" alt="Screenshot for ${escapeHtml(h.title)}" loading="lazy">
      </button>`
    : `<div class="thumb thumb-placeholder" aria-hidden="true">
        <span class="placeholder-number">${String(h.number).padStart(2, "0")}</span>
        <span class="placeholder-label">domaci</span>
      </div>`;
  return `
    <article class="card" data-title="${escapeHtml(h.title)}" data-tech="${escapeHtml((h.technologies || []).join(","))}">
      ${preview}
      <div class="card-body">
        <div class="card-top">
          <span class="badge">DOMACI #${h.number}</span>
          <span class="date">${formatDate(h.date)}</span>
        </div>
        <h3>${escapeHtml(h.title)}</h3>
        <p class="desc">${escapeHtml(h.description)}</p>
        <div class="card-tags">
          ${(h.technologies || []).map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}
        </div>
        ${h.zip ? `<div class="card-actions">
          <a class="btn primary" href="${escapeHtml(h.zip)}" download>Download ZIP${h.zipSize ? ` · ${escapeHtml(h.zipSize)}` : ""}</a>
        </div>` : ""}
      </div>
    </article>`;
}

function wireThumbs(container) {
  container.querySelectorAll("button.thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      const title = btn.getAttribute("data-title");
      if (src && window.__openLightbox) window.__openLightbox(src, title);
    });
  });
}

/* ---- Search + tech filter (used on assignments & homework pages) ---- */
function initToolbar(gridEl, items) {
  const search = document.getElementById("search-input");
  const filterWrap = document.getElementById("filter-chips");
  if (!search && !filterWrap) return;

  const allTech = [...new Set(items.flatMap((i) => i.technologies || []))].sort();
  let activeTech = null;

  if (filterWrap) {
    filterWrap.innerHTML =
      `<button class="filter-chip active" data-tech="">All</button>` +
      allTech.map((t) => `<button class="filter-chip" data-tech="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join("");

    filterWrap.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        filterWrap.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        activeTech = chip.getAttribute("data-tech") || null;
        applyFilter();
      });
    });
  }

  function applyFilter() {
    const q = (search?.value || "").trim().toLowerCase();
    let visible = 0;
    gridEl.querySelectorAll(".card").forEach((card) => {
      const title = (card.getAttribute("data-title") || "").toLowerCase();
      const tech = (card.getAttribute("data-tech") || "");
      const techList = tech.split(",").map((t) => t.trim());
      const matchesQuery = !q || title.includes(q);
      const matchesTech = !activeTech || techList.includes(activeTech);
      const show = matchesQuery && matchesTech;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    const empty = document.getElementById("empty-state");
    if (empty) empty.style.display = visible === 0 ? "" : "none";
  }

  if (search) search.addEventListener("input", applyFilter);
}

/* ---- Page entry points ---- */
function renderAssignmentsPage() {
  const grid = document.getElementById("assignments-grid");
  if (!grid || typeof ASSIGNMENTS === "undefined") return;
  const pageDescription = document.querySelector(".page-head .desc");
  if (pageDescription) pageDescription.textContent = "Ovde dodajem slike zadataka koje smo radili u skoli.";
  const search = document.getElementById("search-input");
  if (search) search.placeholder = "Pretrazi zadatke po nazivu...";
  grid.innerHTML = ASSIGNMENTS.slice().reverse().map(assignmentCardHTML).join("");
  wireThumbs(grid);
  initToolbar(grid, ASSIGNMENTS);

  const countEl = document.getElementById("assignments-count");
  if (countEl) countEl.textContent = ASSIGNMENTS.length;
}

function renderHomeworkPage() {
  const grid = document.getElementById("homework-grid");
  if (!grid || typeof HOMEWORK === "undefined") return;
  const pageDescription = document.querySelector(".page-head .desc");
  if (pageDescription) pageDescription.textContent = "Ovde dodajem domace radove.";
  const notice = document.querySelector(".notice span:last-child");
  if (notice) notice.textContent = "Svaki domaci moze da sadrzi sliku i ZIP fajl projekta za preuzimanje.";
  const search = document.getElementById("search-input");
  if (search) search.placeholder = "Pretrazi domace po nazivu...";
  grid.innerHTML = HOMEWORK.slice().reverse().map(homeworkCardHTML).join("");
  grid.querySelectorAll(".card-actions .btn").forEach((btn) => {
    btn.textContent = btn.textContent.replace("Download ZIP", "Preuzmi ZIP");
  });
  wireThumbs(grid);
  initToolbar(grid, HOMEWORK);

  const countEl = document.getElementById("homework-count");
  if (countEl) countEl.textContent = HOMEWORK.length;
}

function renderHomeStats() {
  const aCount = document.getElementById("stat-assignments");
  const hCount = document.getElementById("stat-homework");
  const tCount = document.getElementById("stat-tech");
  if (aCount) aCount.textContent = typeof ASSIGNMENTS !== "undefined" ? ASSIGNMENTS.length : "0";
  if (hCount) hCount.textContent = typeof HOMEWORK !== "undefined" ? HOMEWORK.length : "0";
  if (tCount) tCount.textContent = (window.SITE_CONFIG?.technologies || []).length;

  const latest = document.getElementById("latest-list");
  if (latest && typeof ASSIGNMENTS !== "undefined") {
    const recent = ASSIGNMENTS.slice(-3).reverse();
    if (!recent.length) {
      latest.innerHTML = '<div class="hc-row"><span class="k">status</span><span class="v">Jos nema dodatih zadataka</span></div>';
      return;
    }
    latest.innerHTML = recent
      .map(
        (a) => `<div class="hc-row"><span class="k">#${a.number} · L${a.lesson}</span><span class="v">${escapeHtml(a.title)}</span></div>`
      )
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initMobileNav();
  markActiveNav();
  initLightbox();
  renderAssignmentsPage();
  renderHomeworkPage();
  renderHomeStats();
});
