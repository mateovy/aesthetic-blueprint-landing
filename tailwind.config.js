/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './privacy.html',
    './terms.html',
    './og-template.html',
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#0A0E1A',   // near-black navy (page bg)
        panel:  '#0D1220',   // slightly lighter navy (alternating sections)
        card:   '#121829',   // card surfaces
        line:   '#1E2740',   // borders
        cream:  '#F5F5F2',   // primary text and CTA background
        muted:  '#9AA3B2',   // secondary text
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  // Classes toggled at runtime by the vanilla JS (slideshow dots, sticky bar, reveals).
  // The content scanner already sees them as string literals in index.html, but we pin
  // them so a future refactor of that JS can't silently drop them from the purge.
  safelist: [
    'opacity-0',
    'opacity-100',
    'bg-cream',
    'bg-line',
    'translate-y-full',
  ],
  plugins: [],
};
