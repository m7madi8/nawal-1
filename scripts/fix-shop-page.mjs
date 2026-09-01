import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractMainHtml } from '../lib/publicPage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shopFile = path.join(__dirname, '..', 'app', 'shop', 'page.jsx');
let text = fs.readFileSync(shopFile, 'utf8');

const htmlMatch = text.match(/html=\{([\s\S]*?)\}\s*\/>/);
if (!htmlMatch) throw new Error('shop html not found');

const rawHtml = JSON.parse(htmlMatch[1]);
const mainHtml = extractMainHtml(rawHtml);

const shopNavScript = `(function(){
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

const next = `import LegacyPage from '@/components/LegacyPage';

export const metadata = {
  title: 'Shop',
  description: 'The Nawal Yoga edit: a cork-and-rubber mat and a solid cork block, chosen with the same care as the practice itself.',
};

export default function Page() {
  return (
    <LegacyPage
      lang="en"
      dir="rtl"
      bodyClassName="shop-page"
      styles={['/css/shop.css']}
      scripts={[]}
      inlineScripts={[${JSON.stringify(shopNavScript)}]}
      currentNav="shop"
      html={${JSON.stringify(mainHtml)}}
    />
  );
}
`;

fs.writeFileSync(shopFile, next);
console.log('Shop page migrated to unified chrome');
