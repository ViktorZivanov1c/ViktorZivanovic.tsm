(() => {
  "use strict";

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!document.body.classList.contains("app-page") || motionPreference.matches) {
    return;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: true });
  const glyphs = "01{}[]<>/\\\\+=*#;";
  const frameInterval = 1000 / 30;
  const rootStyles = getComputedStyle(document.documentElement);
  const monospaceFont = rootStyles.getPropertyValue("--font-mono").trim() || "monospace";

  let columns = [];
  let animationFrame = 0;
  let previousFrame = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let columnWidth = 22;
  let isRunning = false;

  canvas.className = "matrix-rain";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  /** Resize the drawing surface while keeping rendering sharp on high-DPI screens. */
  function resizeMatrix() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    columnWidth = canvasWidth < 640 ? 29 : 23;

    canvas.width = Math.floor(canvasWidth * pixelRatio);
    canvas.height = Math.floor(canvasHeight * pixelRatio);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = Math.ceil(canvasWidth / columnWidth);

    columns = Array.from({ length: count }, (_, index) => ({
      x: index * columnWidth + columnWidth * 0.5,
      y: Math.random() * canvasHeight,
      speed: 0.34 + Math.random() * 0.5,
      glyphIndex: Math.floor(Math.random() * glyphs.length)
    }));
  }

  function glyphAt(index) {
    return glyphs.charAt(index % glyphs.length);
  }

  /** Draw a subtle amber code stream beneath the content surfaces. */
  function drawMatrix(timestamp) {
    if (!isRunning) {
      return;
    }

    if (timestamp - previousFrame < frameInterval) {
      animationFrame = requestAnimationFrame(drawMatrix);
      return;
    }

    previousFrame = timestamp;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.font = `10px ${monospaceFont}`;
    context.textAlign = "center";

    columns.forEach((column) => {
      const trailY = column.y - columnWidth;

      context.fillStyle = "rgba(217, 116, 58, 0.12)";
      context.fillText(glyphAt(column.glyphIndex + 1), column.x, trailY);

      context.shadowColor = "rgba(255, 216, 74, 0.42)";
      context.shadowBlur = 8;
      context.fillStyle = "rgba(255, 216, 74, 0.34)";
      context.fillText(glyphAt(column.glyphIndex), column.x, column.y);
      context.shadowBlur = 0;

      column.y += columnWidth * column.speed;
      column.glyphIndex += 1;

      if (column.y > canvasHeight + columnWidth) {
        column.y = -columnWidth * (1 + Math.random() * 14);
        column.glyphIndex = Math.floor(Math.random() * glyphs.length);
      }
    });

    animationFrame = requestAnimationFrame(drawMatrix);
  }

  function startMatrix() {
    if (isRunning || document.hidden) {
      return;
    }

    isRunning = true;
    previousFrame = 0;
    animationFrame = requestAnimationFrame(drawMatrix);
  }

  function stopMatrix() {
    isRunning = false;
    cancelAnimationFrame(animationFrame);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopMatrix();
      return;
    }

    startMatrix();
  });

  window.addEventListener("resize", resizeMatrix, { passive: true });

  resizeMatrix();
  startMatrix();
})();
