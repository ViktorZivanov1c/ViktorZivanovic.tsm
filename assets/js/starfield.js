(() => {
  "use strict";

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!document.body.classList.contains("app-page") || motionPreference.matches) {
    return;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: true });
  const frameInterval = 1000 / 45;

  let stars = [];
  let shootingStar = null;
  let animationFrame = 0;
  let previousFrame = 0;
  let lastShootingStar = 0;
  let nextShootingDelay = randomBetween(3000, 6000);
  let canvasWidth = 0;
  let canvasHeight = 0;
  let isRunning = false;

  canvas.className = "starfield";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  function randomBetween(minimum, maximum) {
    return minimum + Math.random() * (maximum - minimum);
  }

  function createStar() {
    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: randomBetween(0.28, 1.3),
      opacity: randomBetween(0.18, 0.68),
      velocity: randomBetween(0.02, 0.15),
      pulseOffset: Math.random() * Math.PI * 2
    };
  }

  /** Size canvas and deliberately reduce particles on phones. */
  function resizeStarfield() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = Math.floor(canvasWidth * pixelRatio);
    canvas.height = Math.floor(canvasHeight * pixelRatio);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = canvasWidth < 650 ? 42 : 108;

    stars = Array.from({ length: count }, createStar);
  }

  function drawStar(star, timestamp) {
    const pulse = 0.76 + Math.sin(timestamp * 0.0014 + star.pulseOffset) * 0.24;

    context.fillStyle = `rgba(255, 232, 164, ${star.opacity * pulse})`;
    context.fillRect(star.x, star.y, star.radius, star.radius);

    star.y += star.velocity;

    if (star.y > canvasHeight + 2) {
      star.y = -2;
      star.x = Math.random() * canvasWidth;
    }
  }

  function createShootingStar() {
    return {
      x: randomBetween(canvasWidth * 0.42, canvasWidth * 1.05),
      y: randomBetween(-40, canvasHeight * 0.26),
      length: randomBetween(130, 240),
      duration: randomBetween(650, 920),
      elapsed: 0
    };
  }

  function drawShootingStar(delta) {
    if (!shootingStar) {
      return;
    }

    shootingStar.elapsed += delta;

    const progress = Math.min(shootingStar.elapsed / shootingStar.duration, 1);
    const headX = shootingStar.x - progress * canvasWidth * 0.46;
    const headY = shootingStar.y + progress * canvasHeight * 0.48;
    const tailX = headX + shootingStar.length;
    const tailY = headY - shootingStar.length * 0.57;
    const tail = context.createLinearGradient(headX, headY, tailX, tailY);

    tail.addColorStop(0, "rgba(255, 251, 224, 1)");
    tail.addColorStop(0.18, "rgba(255, 216, 74, 0.92)");
    tail.addColorStop(1, "rgba(217, 116, 58, 0)");

    context.strokeStyle = tail;
    context.lineWidth = 1.5;
    context.shadowColor = "rgba(255, 216, 74, 0.8)";
    context.shadowBlur = 15;
    context.beginPath();
    context.moveTo(headX, headY);
    context.lineTo(tailX, tailY);
    context.stroke();
    context.shadowBlur = 0;

    context.fillStyle = "rgba(255, 255, 244, 1)";
    context.beginPath();
    context.arc(headX, headY, 1.8, 0, Math.PI * 2);
    context.fill();

    if (progress >= 1) {
      shootingStar = null;
    }
  }

  function maybeCreateShootingStar(timestamp) {
    if (shootingStar || timestamp - lastShootingStar < nextShootingDelay) {
      return;
    }

    shootingStar = createShootingStar();
    lastShootingStar = timestamp;
    nextShootingDelay = randomBetween(3000, 6000);
  }

  /** Draw background stars and an occasional bright diagonal meteor. */
  function drawStarfield(timestamp) {
    if (!isRunning) {
      return;
    }

    if (timestamp - previousFrame < frameInterval) {
      animationFrame = requestAnimationFrame(drawStarfield);
      return;
    }

    const delta = previousFrame ? timestamp - previousFrame : frameInterval;

    previousFrame = timestamp;
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    stars.forEach((star) => drawStar(star, timestamp));
    maybeCreateShootingStar(timestamp);
    drawShootingStar(delta);

    animationFrame = requestAnimationFrame(drawStarfield);
  }

  function startStarfield() {
    if (isRunning || document.hidden) {
      return;
    }

    isRunning = true;
    previousFrame = 0;
    animationFrame = requestAnimationFrame(drawStarfield);
  }

  function stopStarfield() {
    isRunning = false;
    cancelAnimationFrame(animationFrame);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopStarfield();
      return;
    }

    startStarfield();
  });

  window.addEventListener("resize", resizeStarfield, { passive: true });

  resizeStarfield();
  startStarfield();
})();
