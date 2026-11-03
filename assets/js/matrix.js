(() => {
  "use strict";
  if (!document.body.classList.contains("app-page") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "matrix-rain";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d", { alpha: true });
  const glyphs = "01{}[]<>/\\\\+=*#;";
  let columns = [];
  let rafId = 0;
  let lastFrame = 0;
  let width = 0;
  let height = 0;
  let unit = 18;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    unit = width < 640 ? 28 : 22;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.ceil(width / unit);
    columns = Array.from({ length: count }, (_, index) => ({
      x: index * unit,
      y: Math.random() * height,
      speed: 0.34 + Math.random() * 0.38
    }));
  }

  function draw(timestamp) {
    if (document.hidden) return;
    if (timestamp - lastFrame < 42) { rafId = requestAnimationFrame(draw); return; }
    lastFrame = timestamp;
    ctx.clearRect(0, 0, width, height);
    ctx.font = `10px ${getComputedStyle(document.documentElement).getPropertyValue("--font-mono")}`;
    columns.forEach((column) => {
      ctx.fillStyle = "rgba(255, 207, 69, .12)";
      ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], column.x, column.y);
      ctx.fillStyle = "rgba(255, 173, 61, .055)";
      ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], column.x, column.y - unit);
      column.y += unit * column.speed;
      if (column.y > height + unit) column.y = -unit * (1 + Math.random() * 16);
    });
    rafId = requestAnimationFrame(draw);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else { lastFrame = 0; rafId = requestAnimationFrame(draw); }
  });
  window.addEventListener("resize", resize, { passive: true });
  resize();
  rafId = requestAnimationFrame(draw);
})();
