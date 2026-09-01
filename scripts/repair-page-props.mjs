import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { filterLegacyAssets } from '../lib/publicPage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const PAGES = [
  'app/events/page.jsx',
  'app/events/sound-healing/page.jsx',
  'app/events/ice-bath/page.jsx',
  'app/events/ice-bath-experience/page.jsx',
  'app/events/nature-chocolate/page.jsx',
  'app/retreats/page.jsx',
  'app/retreats/dahab/page.jsx',
  'app/retreats/wadi-rum/page.jsx',
  'app/retreats/zanzibar/page.jsx',
  'app/workshops/haifa/page.jsx',
  'app/workshops/al-tira/page.jsx',
  'app/register/ice-bath/page.jsx',
];

function extractScriptObjects(text) {
  const matches = text.matchAll(/\{"src":"([^"]+)"(?:,"attrs":"[^"]*")?\}/g);
  const seen = new Set();
  const scripts = [];
  for (const match of matches) {
    const src = match[1];
    if (seen.has(src)) continue;
    seen.add(src);
    scripts.push({ src, attrs: '  ' });
  }
  return scripts;
}

function extractInlineScripts(text) {
  const marker = 'inlineScripts={';
  const start = text.indexOf(marker);
  if (start === -1) return [];

  const after = text.slice(start + marker.length);
  if (after.startsWith('[]}')) return [];

  const endMatch = after.match(/\]\}\s*\n\s*currentNav=/);
  if (!endMatch) return [];

  const raw = after.slice(0, endMatch.index + 1);
  try {
    return Function(`"use strict"; return (${raw});`)();
  } catch {
    return [];
  }
}

function repair(rel) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const legacyBlock = text.slice(text.indexOf('styles={'), text.indexOf('currentNav='));
  const stylesMatch = legacyBlock.match(/styles=\{(\[[\s\S]*?\])\}/);
  const styles = stylesMatch ? JSON.parse(stylesMatch[1]) : [];

  let scripts = extractScriptObjects(legacyBlock);
  const inlineScripts = extractInlineScripts(text);
  const { styles: nextStyles, scripts: nextScripts } = filterLegacyAssets(styles, scripts);

  text = text.replace(/styles=\{[\s\S]*?\}\s*\n\s*scripts=\{[\s\S]*?\}\s*\n\s*inlineScripts=\{[\s\S]*?\}\s*\n\s*currentNav=/, () =>
    `styles={${JSON.stringify(nextStyles)}}\n      scripts={${JSON.stringify(nextScripts)}}\n      inlineScripts={${JSON.stringify(inlineScripts)}}\n      currentNav=`,
  );

  fs.writeFileSync(file, text);
  console.log('Repaired', rel, { styles: nextStyles.length, scripts: nextScripts.length, inlineScripts: inlineScripts.length });
}

for (const page of PAGES) repair(page);
