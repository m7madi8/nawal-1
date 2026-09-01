import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractMainHtml, filterLegacyAssets } from '../lib/publicPage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const PAGES = [
  { file: 'app/events/page.jsx', nav: 'experiences' },
  { file: 'app/events/sound-healing/page.jsx', nav: 'experiences' },
  { file: 'app/events/ice-bath/page.jsx', nav: 'experiences' },
  { file: 'app/events/ice-bath-experience/page.jsx', nav: 'experiences' },
  { file: 'app/events/nature-chocolate/page.jsx', nav: 'experiences' },
  { file: 'app/retreats/page.jsx', nav: 'retreats' },
  { file: 'app/retreats/dahab/page.jsx', nav: 'retreats' },
  { file: 'app/retreats/wadi-rum/page.jsx', nav: 'retreats' },
  { file: 'app/retreats/zanzibar/page.jsx', nav: 'retreats' },
  { file: 'app/workshops/haifa/page.jsx', nav: 'yoga' },
  { file: 'app/workshops/al-tira/page.jsx', nav: 'yoga' },
  { file: 'app/register/ice-bath/page.jsx', nav: 'health-forms' },
];

function parseArray(source, key) {
  const marker = `${key}={`;
  const start = source.indexOf(marker);
  if (start === -1) return [];
  let i = start + marker.length;
  if (source[i] !== '[') return [];
  let depth = 0;
  const begin = i;
  for (; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '[') depth += 1;
    if (ch === ']') {
      depth -= 1;
      if (depth === 0) {
        const literal = source.slice(begin, i + 1);
        return Function(`"use strict"; return (${literal});`)();
      }
    }
  }
  return [];
}

function patchPage(rel, currentNav) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const htmlMatch = text.match(/html=\{([\s\S]*?)\}\s*\/>/);
  if (!htmlMatch) throw new Error(`No html in ${rel}`);

  const html = JSON.parse(htmlMatch[1]);
  const mainHtml = extractMainHtml(html);
  const styles = parseArray(text, 'styles');
  const scripts = parseArray(text, 'scripts');
  const { styles: nextStyles, scripts: nextScripts } = filterLegacyAssets(styles, scripts);

  text = text.replace(/html=\{[\s\S]*?\}\s*\/>/, `html={${JSON.stringify(mainHtml)}}\n    />`);
  text = text.replace(/styles=\{[\s\S]*?\}/, `styles={${JSON.stringify(nextStyles)}}`);
  text = text.replace(/scripts=\{[\s\S]*?\}/, `scripts={${JSON.stringify(nextScripts)}}`);
  text = text.replace(/inlineScripts=\{[\s\S]*?\}/, 'inlineScripts={[]}');
  text = text.replace(/lang="[^"]*"/, 'lang="en"');
  text = text.replace(/dir="[^"]*"/, 'dir="rtl"');
  text = text.replace(/bodyClassName="[^"]*"/, 'bodyClassName=""');

  if (/currentNav=/.test(text)) {
    text = text.replace(/currentNav="[^"]*"/, `currentNav="${currentNav}"`);
  } else {
    text = text.replace(/html=\{/, `currentNav="${currentNav}"\n      html={`);
  }

  fs.writeFileSync(file, text);
  console.log('Migrated', rel);
}

for (const page of PAGES) patchPage(page.file, page.nav);
