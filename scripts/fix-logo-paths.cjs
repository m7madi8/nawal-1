const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const files = ['app/page.jsx', 'app/shop/page.jsx'];

for (const rel of files) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(
    /\/media\/brand\/logo-mark-on-light\.png/g,
    '/media/brand/logo.png',
  );
  fs.writeFileSync(file, text);
  console.log('Updated header logo in', rel);
}
