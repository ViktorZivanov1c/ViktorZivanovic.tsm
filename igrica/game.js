(() => {
  // UNESI YOUTUBE LINK ZA ZVANIČNU NAJAVU OVDE (ostavi prazno dok nije dostupan).
  const OFFICIAL_TRAILER_URL = '';

  const button = document.getElementById('official-trailer');
  if (!button || !OFFICIAL_TRAILER_URL.trim()) return;

  try {
    const url = new URL(OFFICIAL_TRAILER_URL);
    const isYouTube = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(url.hostname);
    if (url.protocol !== 'https:' || !isYouTube) return;
    button.href = url.href;
    button.removeAttribute('aria-disabled');
    button.removeAttribute('title');
  } catch {
    // Dugme ostaje neaktivno dok se ne unese ispravna YouTube adresa.
  }
})();
