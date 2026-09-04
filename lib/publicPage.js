import { stripLegacyChrome } from './siteChrome.js';

/** Legacy global assets that conflict with home.css + site chrome */
export const LEGACY_GLOBAL_STYLES = [
  '/legacy/css/style.css',
  '/legacy/css/rtl.css',
  '/legacy/css/scroll-media.css',
];

export const LEGACY_GLOBAL_SCRIPTS = [
  '/legacy/js/app.js',
  '/legacy/js/reveal.js',
];

export function filterLegacyAssets(styles = [], scripts = []) {
  return {
    styles: styles.filter((href) => !LEGACY_GLOBAL_STYLES.includes(href)),
    scripts: scripts.filter((script) => !LEGACY_GLOBAL_SCRIPTS.includes(script?.src)),
  };
}

export function extractMainHtml(html) {
  if (!html) return '<main class="ny-inner"></main>';

  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  if (mainMatch) {
    return mainMatch[0].replace(/<main(\s[^>]*)?>/i, (match, attrs = '') => {
      if (/class="/i.test(attrs)) {
        return match.replace(/class="([^"]*)"/, (_, classes) => {
          const next = classes.includes('ny-inner') ? classes : `${classes} ny-inner`.trim();
          return `class="${next}"`;
        });
      }
      return '<main class="ny-inner">';
    });
  }

  const body = stripLegacyChrome(html);
  return `<main class="ny-inner">${body}</main>`;
}

export const PUBLIC_PAGE_DEFAULTS = {
  lang: 'ar',
  dir: 'rtl',
  bodyClassName: '',
  styles: [],
  scripts: [],
  inlineScripts: [],
};
