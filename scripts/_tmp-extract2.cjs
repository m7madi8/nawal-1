const fs = require('fs');
const s = fs.readFileSync('app/page.jsx', 'utf8');
const i = s.indexOf('worlds-intro-block');
console.log(s.slice(i, i + 2200));
