/** Reshape studio — Baqa Power Yoga venue */
export const RESHAPE_STUDIO = {
  name: 'Reshape studio',
  instagram: 'reshape.pilates',
  whatsapp: '972533206652',
};

export const RESHAPE_INSTAGRAM_URL = `https://www.instagram.com/${RESHAPE_STUDIO.instagram}/`;
export const RESHAPE_INSTAGRAM_DM = `https://ig.me/m/${RESHAPE_STUDIO.instagram}`;

export function reshapeWhatsAppUrl(message) {
  const base = `https://wa.me/${RESHAPE_STUDIO.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
