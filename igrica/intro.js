(() => {
  const intro = document.querySelector('.tlr-intro');
  const content = document.querySelector('main');
  if (!intro || !content) return;

  const logo = intro.querySelector('.tlr-intro-logo');
  const studio = intro.querySelector('.tlr-studio-source');
  const studioLogo = intro.querySelector('.tlr-studio-logo');
  const sparks = intro.querySelector('.tlr-cut-sparks');
  const door = new Image();
  door.src = 'assets/bunker-blast-doors.png';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let finished = false;
  let started = false;
  let timeout;

  function createFragment(points, x, y, rotation) {
    const fragment = document.createElement('span');
    fragment.className = 'tlr-studio-fragment';
    fragment.style.setProperty('--fragment-clip', `polygon(${points})`);
    fragment.style.setProperty('--fly-x', `${x}%`);
    fragment.style.setProperty('--fly-y', `${y}%`);
    fragment.style.setProperty('--spin', `${rotation}deg`);
    const ink = document.createElement('span');
    ink.className = 'tlr-studio-ink';
    fragment.append(ink);
    studioLogo.append(fragment);
  }

  function buildFragments() {
    // Clip the original mark into the T, L and R, each cut along the same diagonal.
    const letters = [
      [0, 36.4, -62, -74, -25, -40, 61, 18],
      [36.4, 61.3, -8, -98, 14, 18, 82, -17],
      [61.3, 100, 70, -62, 28, 57, 75, -22]
    ];
    for (const [left, right, ux, uy, ur, lx, ly, lr] of letters) {
      const start = 76 - .48 * left;
      const end = 76 - .48 * right;
      createFragment(`${left}% 0, ${right}% 0, ${right}% ${end}%, ${left}% ${start}%`, ux, uy, ur);
      createFragment(`${left}% ${start}%, ${right}% ${end}%, ${right}% 79%, ${left}% 79%`, lx, ly, lr);
    }
    // Every letter in THE LAST RATION has its own flight and rotation.
    const edges = [0, 180, 255, 350, 454, 540, 614, 706, 800, 882, 957, 996, 1074, 1254];
    for (let i = 0; i < edges.length - 1; i++) {
      const left = edges[i] / 1254 * 100;
      const right = edges[i + 1] / 1254 * 100;
      createFragment(`${left}% 79%, ${right}% 79%, ${right}% 100%, ${left}% 100%`,
        (i - 6) * 13, i % 3 === 0 ? -65 - i * 3 : 85 + (i % 4) * 15,
        (i % 2 ? 1 : -1) * (18 + i * 4));
    }
    for (let i = 0; i < 12; i++) {
      const spark = document.createElement('i');
      const position = 12 + i * 6.8;
      spark.style.setProperty('--spark-x', `${position}%`);
      spark.style.setProperty('--spark-y', `${76 - .48 * position}%`);
      spark.style.setProperty('--spark-dx', `${(i % 2 ? 1 : -1) * (12 + i * 3)}px`);
      spark.style.setProperty('--spark-dy', `${(i % 3 ? 1 : -1) * (16 + i * 4)}px`);
      spark.style.setProperty('--spark-turn', `${-70 + i * 23}deg`);
      sparks.append(spark);
    }
  }

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
    if (!logo.naturalWidth || !studio.naturalWidth || motion.matches) return finish();
    started = true;
    window.clearTimeout(timeout);
    // Also recover if animationend never fires or the animation CSS is missing.
    intro.classList.add('is-playing');
    const seconds = parseFloat(window.getComputedStyle(intro).animationDuration) || 8.8;
    timeout = window.setTimeout(finish, seconds * 1000 + 400);
  }

  async function prepare() {
    if (finished || started) return;
    try {
      await Promise.all([logo.decode(), studio.decode(), door.decode()]);
      play();
    } catch {
      finish();
    }
  }

  if (motion.matches || !logo || !studio || !studioLogo || !sparks) return finish();

  buildFragments();

  document.body.classList.add('tlr-intro-active');
  content.inert = true;
  intro.hidden = false;
  motion.addEventListener('change', onMotionChange);
  window.addEventListener('pagehide', finish);
  intro.addEventListener('animationend', (event) => {
    if (event.target === intro && event.animationName === 'tlr-intro-exit') finish();
  });
  // A stalled image must never leave the visitor behind an overlay.
  timeout = window.setTimeout(finish, 5000);
  logo.addEventListener('error', finish, { once: true });
  studio.addEventListener('error', finish, { once: true });
  door.addEventListener('error', finish, { once: true });
  prepare();
})();
