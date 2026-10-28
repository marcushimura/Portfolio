const fs = require('node:fs');
const path = require('node:path');
const Babel = require('./vendor/babel.min.js');
const files = ['portfolio-components.jsx', 'origami-components.jsx', 'portfolio-case.jsx', 'portfolio-app.jsx'];
const output = files.map(file => {
  const source = fs.readFileSync(path.join(__dirname, file), 'utf8');
  return Babel.transform(`(function () {\n${source}\n})();`, {
    presets: ['react'], filename: file, comments: false, compact: true
  }).code;
}).join('\n');
fs.writeFileSync(path.join(__dirname, 'portfolio.bundle.js'), output);
console.log('Built portfolio.bundle.js');

const demoSource = fs.readFileSync(path.join(__dirname, 'origami-components.jsx'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'origami-components.bundle.js'), Babel.transform(`(function () {\n${demoSource}\n})();`, { presets: ['react'], filename: 'origami-components.jsx', comments: false, compact: true }).code);
