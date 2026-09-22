(() => {
  if (!document.body.classList.contains("app-page") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "matrix-rain";
  canvas.setAttribute("aria-hidden", "true");
  document.body.append(canvas);

  const ctx = canvas.getContext("2d");
  const glyphs = "01{}[]<>/\\\\+=*";
  const size = 15;
  let columns = [];

  function resize() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    const count = Math.ceil(window.innerWidth / size);
    columns = Array.from({ length: count }, (_, i) => ({
      x: i * size,
      y: Math.random() * window.innerHeight,
      speed: 0.01 + Math.random() * 0.015
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = `10px ${getComputedStyle(document.documentElement).getPropertyValue("--font-mono")}`;
    columns.forEach((column) => {
      for (let trail = 6; trail >= 0; trail--) {
        const alpha = 0.06 + (6 - trail) * 0.055;
        ctx.fillStyle = `rgba(76, 133, 255, ${alpha})`;
        ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], column.x, column.y - trail * size);
      }
      column.y += size * column.speed;
      if (column.y > window.innerHeight + size * 7) column.y = -Math.random() * window.innerHeight * 0.3;
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();
