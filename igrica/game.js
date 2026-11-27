(() => {
  // Unesi pune URL adrese profila. Prazno polje ostavlja karticu neaktivnom.
  const MEDIA_URLS = {
    youtube: 'https://www.youtube.com/channel/UCSE_VmHStXz35PAXVsmA34w',
    instagram: '',
    tiktok: ''
  };

  for (const card of document.querySelectorAll('[data-network]')) {
    const value = MEDIA_URLS[card.dataset.network].trim();
    if (!value) continue;
    try {
      const url = new URL(value);
      if (!['https:', 'http:'].includes(url.protocol)) continue;
      card.href = url.href;
      card.removeAttribute('aria-disabled');
    } catch {
      // Neispravna adresa ostavlja samo ovu karticu neaktivnom.
    }
  }

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
