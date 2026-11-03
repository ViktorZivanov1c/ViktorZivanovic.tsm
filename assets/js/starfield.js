(() => {
  "use strict";
  if (!document.body.classList.contains("app-page") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "starfield";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d", { alpha: true });
  let stars = [], width = 0, height = 0, ratio = 1, frame = 0, shooting = null, lastShot = 0;

  function resize() {
    ratio = Math.min(devicePixelRatio || 1, 1.5); width = innerWidth; height = innerHeight;
    canvas.width = width * ratio; canvas.height = height * ratio;
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = width < 650 ? 38 : 82;
    stars = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 1.15 + .22, speed: Math.random() * .18 + .04, a: Math.random() * .55 + .15 }));
  }
  function newShot(now) {
    if (now - lastShot < 4500 + Math.random() * 3800) return;
    lastShot = now; shooting = { x: width * (.25 + Math.random() * .65), y: -20, life: 0, duration: 700, length: 95 + Math.random() * 95 };
  }
  function draw(now) {
    if (document.hidden) return;
    if (now - frame < 35) { requestAnimationFrame(draw); return; }
    frame = now; ctx.clearRect(0, 0, width, height);
    stars.forEach((s) => { s.y += s.speed; if (s.y > height) { s.y = -2; s.x = Math.random() * width; } ctx.fillStyle = `rgba(255, 229, 145, ${s.a})`; ctx.fillRect(s.x, s.y, s.r, s.r); });
    newShot(now);
    if (shooting) {
      shooting.life += 35; const p = shooting.life / shooting.duration;
      const x = shooting.x - p * width * .32, y = shooting.y + p * height * .43;
      const grad = ctx.createLinearGradient(x, y, x + shooting.length, y - shooting.length * .58);
      grad.addColorStop(0, "rgba(255,246,194,1)"); grad.addColorStop(1, "rgba(240,182,45,0)");
      ctx.strokeStyle = grad; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + shooting.length, y - shooting.length * .58); ctx.stroke();
      if (p >= 1) shooting = null;
    }
    requestAnimationFrame(draw);
  }
  addEventListener("resize", resize, { passive: true }); document.addEventListener("visibilitychange", () => { if (!document.hidden) requestAnimationFrame(draw); }); resize(); requestAnimationFrame(draw);
})();
