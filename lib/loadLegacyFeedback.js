import fs from 'fs';
import path from 'path';

export function loadLegacyFeedbackHtml(filename) {
  const filePath = path.join(process.cwd(), 'feedback', filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const styleMatch = raw.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyMatch = raw.match(/<body>([\s\S]*?)<\/body>/i);
  const scripts = [];

  let bodyHtml = bodyMatch ? bodyMatch[1] : raw;
  bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, (block) => {
    const inner = block.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
    if (inner.trim()) scripts.push(inner.trim());
    return '';
  });

  bodyHtml = bodyHtml
    .replace(/\.\.\/public\/media\//g, '/media/')
    .replace(/\.\.\/index\.html/g, '/')
    .replace(/href="\.\.\/admin\/dashboard\.html"/g, 'href="/admin/overview"');

  const scopedStyle = styleMatch
    ? `<style>${styleMatch[1]}</style>`
    : '';

  return {
    html: `${scopedStyle}
<section class="fb-page fb-page--legacy section">
  <div class="fb-legacy-wrap">${bodyHtml.trim()}</div>
</section>`,
    scripts,
  };
}
