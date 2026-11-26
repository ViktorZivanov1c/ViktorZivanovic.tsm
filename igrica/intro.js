(() => {
  const intro = document.querySelector('.tlr-intro');
  const content = document.querySelector('main');
  if (!intro || !content) return;

  const logo = intro.querySelector('.tlr-intro-logo');
  const mask = intro.querySelector('.tlr-intro-mask');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let finished = false;
  let started = false;
  let timeout;

  function finish() {
    if (finished) return;
    finished = true;
    window.clearTimeout(timeout);
    motion.removeEventListener('change', onMotionChange);
    window.removeEventListener('pagehide', finish);
    document.body.classList.remove('tlr-intro-active');
    content.inert = false;
    intro.remove();
  }

  function onMotionChange(event) {
    if (event.matches) finish();
  }

  function play() {
    if (finished || started) return;
    if (!logo.naturalWidth || motion.matches) return finish();
    started = true;
    window.clearTimeout(timeout);
    // Also recover if animationend never fires or the animation CSS is missing.
    intro.classList.add('is-playing');
    const seconds = parseFloat(window.getComputedStyle(intro).animationDuration) || 4.2;
    timeout = window.setTimeout(finish, seconds * 1000 + 400);
  }

  async function prepare() {
    if (finished || started) return;
    try {
      await Promise.all([logo.decode(), mask.decode()]);
      play();
    } catch {
      finish();
    }
  }

  if (motion.matches || !logo || !mask) return finish();

  document.body.classList.add('tlr-intro-active');
  content.inert = true;
  intro.hidden = false;
  motion.addEventListener('change', onMotionChange);
  window.addEventListener('pagehide', finish);
  intro.addEventListener('animationend', (event) => {
    if (event.target === intro && event.animationName === 'tlr-intro-exit') finish();
  });
  // A stalled image must never leave the visitor behind an overlay.
  timeout = window.setTimeout(finish, 2200);
  logo.addEventListener('error', finish, { once: true });
  mask.addEventListener('error', finish, { once: true });
  prepare();
})();
