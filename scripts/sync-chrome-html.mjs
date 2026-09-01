import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const { renderMobileNav, renderSiteFooter, SITE_BOOT_SCRIPT } = await import('../lib/siteChrome.js');

function patchPage(rel, currentNav = '') {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const htmlMatch = text.match(/html=\{([\s\S]*?)\}\s*\/>/);
  if (!htmlMatch) throw new Error(`No html prop in ${rel}`);

  let html = JSON.parse(htmlMatch[1]);
  html = html.replace(/<nav class="mobile-nav"[\s\S]*?<\/nav>/, renderMobileNav(currentNav));
  html = html.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/, renderSiteFooter());

  text = text.replace(/html=\{[\s\S]*?\}\s*\/>/, `html={${JSON.stringify(html)}}\n    />`);

  const boot = rel.includes('shop')
    ? `${SITE_BOOT_SCRIPT}\n${shopExtraScript()}`
    : SITE_BOOT_SCRIPT;

  if (/inlineScripts=\{/.test(text)) {
    text = text.replace(/inlineScripts=\{\[[\s\S]*?\]\}/, `inlineScripts={[${JSON.stringify(boot)}]}`);
  }

  fs.writeFileSync(file, text);
  console.log('Patched', rel);
}

function shopExtraScript() {
  return `(function(){
  var shopLinks = Array.prototype.slice.call(document.querySelectorAll('[data-shop-nav]'));
  var shopSections = shopLinks.map(function(link){ return document.querySelector(link.getAttribute('href')); }).filter(Boolean);
  function setActiveShopNav(id){
    shopLinks.forEach(function(link){
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }
  if ('IntersectionObserver' in window && shopSections.length) {
    var navIo = new IntersectionObserver(function(entries){
      var visible = entries.filter(function(entry){ return entry.isIntersecting; })
        .sort(function(a, b){ return b.intersectionRatio - a.intersectionRatio; })[0];
      if (visible && visible.target.id) setActiveShopNav(visible.target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] });
    shopSections.forEach(function(section){ navIo.observe(section); });
  }
})();`;
}

patchPage('app/page.jsx');
patchPage('app/shop/page.jsx', 'shop');
