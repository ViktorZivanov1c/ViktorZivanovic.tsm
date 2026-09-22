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

/* ---- Hover electricity: a short spark moving along the element outline ---- */
function syncElectricTrace(trace) {
  const target = trace.parentElement;
  const paths = trace.querySelectorAll("rect");
  if (!target || !paths.length) return;

  const width = target.clientWidth;
  const height = target.clientHeight;
  if (!width || !height) return;

  const radius = Math.max(3, parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0);
  trace.setAttribute("viewBox", `0 0 ${width} ${height}`);
  paths.forEach((path) => {
    path.setAttribute("x", "0.75");
    path.setAttribute("y", "0.75");
    path.setAttribute("width", String(width - 1.5));
    path.setAttribute("height", String(height - 1.5));
    path.setAttribute("rx", String(radius));
    path.setAttribute("ry", String(radius));
  });
}

let electricTraceIndex = 0;

function initElectricTraces() {
  document.querySelectorAll(".card, .recent-work-card, .btn, .side-nav a, .filter-chip, .sidebar-footer a").forEach((target) => {
    if ([...target.children].some((child) => child.classList.contains("electric-trace"))) return;

    const ns = "http://www.w3.org/2000/svg";
    const trace = document.createElementNS(ns, "svg");
    const defs = document.createElementNS(ns, "defs");
    const filter = document.createElementNS(ns, "filter");
    const noise = document.createElementNS(ns, "feTurbulence");
    const distortion = document.createElementNS(ns, "feDisplacementMap");
    const glow = document.createElementNS(ns, "feDropShadow");
    const rail = document.createElementNS(ns, "rect");
    const spark = document.createElementNS(ns, "rect");
    const filterId = `electric-spark-${electricTraceIndex++}`;

    trace.classList.add("electric-trace");
    trace.setAttribute("aria-hidden", "true");
    trace.setAttribute("preserveAspectRatio", "none");
    filter.setAttribute("id", filterId);
    filter.setAttribute("x", "-15%");
    filter.setAttribute("y", "-15%");
    filter.setAttribute("width", "130%");
    filter.setAttribute("height", "130%");
    noise.setAttribute("type", "fractalNoise");
    noise.setAttribute("baseFrequency", "0.025 0.42");
    noise.setAttribute("numOctaves", "1");
    noise.setAttribute("seed", String(electricTraceIndex));
    noise.setAttribute("result", "noise");
    distortion.setAttribute("in", "SourceGraphic");
    distortion.setAttribute("in2", "noise");
    distortion.setAttribute("scale", "1.4");
    distortion.setAttribute("result", "distorted");
    glow.setAttribute("in", "distorted");
    glow.setAttribute("stdDeviation", "1.2");
    glow.setAttribute("flood-color", "#46a0ff");
    glow.setAttribute("flood-opacity", "0.95");
    filter.append(noise, distortion, glow);
    defs.appendChild(filter);
    rail.classList.add("trace-rail");
    rail.setAttribute("pathLength", "100");
    spark.classList.add("trace-spark");
    spark.setAttribute("pathLength", "100");
    spark.style.filter = `url(#${filterId})`;

    trace.append(defs, rail, spark);
    target.appendChild(trace);
    syncElectricTrace(trace);
  });
}

/* ---- Maxwell appears on every page as a small decorative spinning cat ---- */
function addMaxwell() {
  if (document.querySelector(".maxwell-cat")) return;
  const widget = document.createElement("div");
  const homeSlot = document.createElement("div");
  const homeButton = document.createElement("button");
  const maxwell = document.createElement("img");
  widget.className = "maxwell-widget";
  homeSlot.className = "maxwell-home-slot";
  maxwell.className = "maxwell-cat";
  maxwell.src = "assets/img/maxwell.gif";
  maxwell.alt = "";
  maxwell.draggable = false;
  maxwell.setAttribute("aria-hidden", "true");
  homeButton.type = "button";
  homeButton.className = "btn maxwell-home";
  homeButton.innerHTML = 'Maxwell go home! <span class="maxwell-paw" aria-hidden="true">🐾</span>';
  widget.append(homeSlot, maxwell, homeButton);

  const sidebar = document.querySelector(".sidebar");
  const footer = sidebar?.querySelector(".sidebar-footer");
  if (sidebar && footer) {
    sidebar.insertBefore(widget, footer);
  } else {
    document.body.appendChild(widget);
  }

  function sendMaxwellHome() {
    if (!maxwell.classList.contains("is-free") || returnAnimation) return;

    const from = maxwell.getBoundingClientRect();
    const destination = homeSlot.getBoundingClientRect();
    maxwell.classList.remove("is-dragging");
    const animation = maxwell.animate(
      [
        { left: `${from.left}px`, top: `${from.top}px` },
        { left: `${destination.left}px`, top: `${destination.top}px` }
      ],
      { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );
    returnAnimation = animation;
    const finishReturn = () => {
      if (returnAnimation !== animation) return;
      animation.cancel();
      maxwell.classList.remove("is-free");
      maxwell.style.removeProperty("left");
      maxwell.style.removeProperty("top");
      widget.classList.remove("is-maxwell-away");
      returnAnimation = null;
    };
    animation.onfinish = finishReturn;
    window.setTimeout(finishReturn, 750);
  }

  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragging = false;
  let returnAnimation = null;

  maxwell.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    if (returnAnimation) {
      returnAnimation.cancel();
      returnAnimation = null;
    }
    const bounds = maxwell.getBoundingClientRect();
    widget.classList.add("is-maxwell-away");
    dragOffsetX = event.clientX - bounds.left;
    dragOffsetY = event.clientY - bounds.top;
    maxwell.classList.add("is-free", "is-dragging");
    maxwell.style.left = `${bounds.left}px`;
    maxwell.style.top = `${bounds.top}px`;
    maxwell.setPointerCapture(event.pointerId);
    dragging = true;
  });

  maxwell.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const width = maxwell.offsetWidth;
    const height = maxwell.offsetHeight;
    const left = Math.min(Math.max(8, event.clientX - dragOffsetX), window.innerWidth - width - 8);
    const top = Math.min(Math.max(8, event.clientY - dragOffsetY), window.innerHeight - height - 8);
    maxwell.style.left = `${left}px`;
    maxwell.style.top = `${top}px`;
  });

  function stopDragging(event) {
    if (!dragging) return;
    dragging = false;
    maxwell.classList.remove("is-dragging");
    if (maxwell.hasPointerCapture(event.pointerId)) maxwell.releasePointerCapture(event.pointerId);
  }

  maxwell.addEventListener("pointerup", stopDragging);
  maxwell.addEventListener("pointercancel", stopDragging);
  homeButton.addEventListener("click", sendMaxwellHome);
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

/* ---- Home: latest work cards ---- */
function recentWorkCardHTML(assignment) {
  const screenshot = assignment.screenshots && assignment.screenshots[0];
  const preview = screenshot
    ? `<img src="${escapeHtml(screenshot)}" alt="Prikaz zadatka: ${escapeHtml(assignment.title)}" loading="lazy">`
    : `<div class="recent-code" aria-hidden="true"><span>&lt;/${String(assignment.number).padStart(2, "0")}&gt;</span><i></i><i></i><i></i></div>`;

  return `<article class="recent-work-card">
    <div class="recent-preview">${preview}</div>
    <div class="recent-work-card-body">
      <span class="recent-label">ZADATAK #${assignment.number}</span>
      <h3>${escapeHtml(assignment.title)}</h3>
      <p>${escapeHtml(assignment.description || "Zadatak sa časa.")}</p>
      <a href="assignments.html" class="recent-link">Pogledaj zadatak <span aria-hidden="true">›</span></a>
    </div>
  </article>`;
}

function renderRecentWork() {
  const grid = document.getElementById("recent-work-grid");
  if (!grid || typeof ASSIGNMENTS === "undefined") return;

  const latest = ASSIGNMENTS.slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date) || b.number - a.number)
    .slice(0, 3);
  grid.innerHTML = latest.length
    ? latest.map(recentWorkCardHTML).join("")
    : '<p class="recent-empty">Još nema dodatih zadataka.</p>';
}

function initLiveClock() {
  const clock = document.getElementById("live-clock");
  if (!clock) return;

  const lessonStatus = document.getElementById("lesson-status");
  const lessonCountdown = document.getElementById("lesson-countdown");
  const lessonSchedule = [
    { number: 1, start: "07:50", end: "08:35" },
    { number: 2, start: "08:40", end: "09:25" },
    { number: 3, start: "09:45", end: "10:30" },
    { number: 4, start: "10:35", end: "11:20" },
    { number: 5, start: "11:35", end: "12:20" },
    { number: 6, start: "12:25", end: "13:10" },
    { number: 7, start: "13:15", end: "14:00" }
  ];

  const secondsForTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60;
  };

  const formatCountdown = (seconds) => {
    const remaining = Math.max(0, Math.floor(seconds));
    const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
    const secs = String(remaining % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const updateLessonTimer = (now) => {
    if (!lessonStatus || !lessonCountdown) return;
    const day = now.getDay();
    if (day === 0 || day === 6) {
      lessonStatus.textContent = "Danas nema nastave";
      lessonCountdown.textContent = "Vikend";
      return;
    }

    const nowInSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const currentLesson = lessonSchedule.find((lesson) =>
      nowInSeconds >= secondsForTime(lesson.start) && nowInSeconds < secondsForTime(lesson.end)
    );

    if (currentLesson) {
      lessonStatus.textContent = `Do kraja ${currentLesson.number}. časa`;
      lessonCountdown.textContent = formatCountdown(secondsForTime(currentLesson.end) - nowInSeconds);
      return;
    }

    const nextLesson = lessonSchedule.find((lesson) => nowInSeconds < secondsForTime(lesson.start));
    if (nextLesson) {
      lessonStatus.textContent = `${nextLesson.number}. čas počinje za`;
      lessonCountdown.textContent = formatCountdown(secondsForTime(nextLesson.start) - nowInSeconds);
      return;
    }

    lessonStatus.textContent = "Nastava je završena";
    lessonCountdown.textContent = "Do sutra";
  };

  const updateClock = () => {
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = now.toLocaleTimeString("sr-Latn-RS", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    updateLessonTimer(now);
  };

  updateClock();
  window.setInterval(updateClock, 1000);
}

/* ---- Sidebar: a freshly randomized quote on every page load ---- */
function renderDailyQuote() {
  const quote = document.getElementById("daily-quote");
  if (!quote || typeof DAILY_QUOTES === "undefined" || !DAILY_QUOTES.length) return;
  const selectedQuote = DAILY_QUOTES[Math.floor(Math.random() * DAILY_QUOTES.length)];
  quote.textContent = `“${selectedQuote}”`;
}

/* ---- Desktop cursor: a subtle neon ring for precise pointers only ---- */
function initCustomCursor() {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!finePointer.matches || document.querySelector(".custom-cursor")) return;

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);
  document.body.classList.add("custom-cursor-enabled");

  document.addEventListener("pointermove", (event) => {
    cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
    cursor.classList.add("is-visible");
    cursor.classList.toggle("is-hovering", Boolean(event.target.closest("a, button, .card, .recent-work-card, .filter-chip")));
  });

  document.addEventListener("pointerleave", () => cursor.classList.remove("is-visible"));
}

/* ---- Internal pages transition through a short neon fade ---- */
function initPageTransitions() {
  const transition = document.createElement("div");
  transition.className = "page-transition";
  transition.setAttribute("aria-hidden", "true");
  document.body.appendChild(transition);

  window.requestAnimationFrame(() => document.body.classList.add("page-ready"));

  document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (
        event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        !href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") ||
        link.target === "_blank" || link.hasAttribute("download")
      ) return;

      const destination = new URL(href, window.location.href);
      if (destination.origin !== window.location.origin || destination.href === window.location.href) return;

      event.preventDefault();
      document.body.classList.add("is-page-leaving");
      window.setTimeout(() => { window.location.href = destination.href; }, 210);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initMobileNav();
  markActiveNav();
  initLightbox();
  renderAssignmentsPage();
  renderHomeworkPage();
  renderHomeStats();
  renderRecentWork();
  initLiveClock();
  renderDailyQuote();
  addMaxwell();
  initElectricTraces();
  initCustomCursor();
  initPageTransitions();
  window.addEventListener("resize", () => {
    document.querySelectorAll(".electric-trace").forEach(syncElectricTrace);
  });
});
