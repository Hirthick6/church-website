/**
 * fix-png-refs.js
 * Replaces .png → .jpg in all HTML/JS/CSS files for files that were converted.
 * Run: node fix-png-refs.js  (from church-website-redesign folder)
 */

const fs   = require('fs');
const path = require('path');

const BASE = __dirname;

// PNGs that STAYED as PNG (logos, genuine poster PNGs that kept transparency)
const KEEP_PNG = new Set([
  'church-logo.png',
  'icon-address.svg',
  'icon-email.svg',
  'icon-phone.svg',
  'rugby-sunday-service-poster.png',   // kept as PNG per KEEP_PNG in compress script
  'easter-palm-sunday-flyer.png',
  'thanksgiving-harvest-poster.png',
  'mothers-day-flyer.png',
  'christmas-2025-poster.png',
]);

// All .jpg files that exist NOW but whose .png equivalent does NOT exist
// = the PNGs that were converted to JPG
function findConvertedFiles(dir) {
  const converted = new Set();
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!e.name.endsWith('.jpg') && !e.name.endsWith('.jpeg')) continue;
      const pngName = e.name.replace(/\.(jpg|jpeg)$/i, '.png');
      const pngFull = path.join(d, pngName);
      if (!fs.existsSync(pngFull) && !KEEP_PNG.has(pngName)) {
        // Record the RELATIVE path fragment used in src= attributes
        // e.g.  assets/images/hero/img1.jpg
        const rel = path.relative(BASE, full).replace(/\\/g, '/');
        const relPng = rel.replace(/\.(jpg|jpeg)$/i, '.png');
        converted.add(relPng);  // key = old png path, value = replace with jpg
      }
    }
  }
  walk(dir);
  return converted;
}

// Source files to scan
function findSourceFiles(dir) {
  const exts = new Set(['.html', '.js', '.css', '.json', '.toml']);
  const files = [];
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === 'node_modules') continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (exts.has(path.extname(e.name).toLowerCase())) files.push(full);
    }
  }
  walk(dir);
  return files;
}

const convertedPngs = findConvertedFiles(path.join(BASE, 'assets', 'images'));
console.log(`Found ${convertedPngs.size} converted PNG→JPG files\n`);

const sourceFiles = findSourceFiles(BASE);
let totalReplacements = 0;

for (const srcFile of sourceFiles) {
  let content = fs.readFileSync(srcFile, 'utf8');
  let changed = false;
  for (const pngRel of convertedPngs) {
    // Match the filename with either / or \ separators, case-insensitive
    const pngName = path.basename(pngRel); // e.g. img1.jpg
    const jpgName = pngName.replace(/\.png$/i, '.jpg');
    if (content.includes(pngName)) {
      const before = content;
      // Replace just the filename extension (safe, since .png filenames are unique enough)
      content = content.split(pngName).join(jpgName);
      if (content !== before) {
        const count = (before.split(pngName).length - 1);
        console.log(`  ${path.relative(BASE, srcFile).padEnd(55)} ${pngName} → ${jpgName}  (${count}x)`);
        totalReplacements += count;
        changed = true;
      }
    }
  }
  if (changed) fs.writeFileSync(srcFile, content, 'utf8');
}

console.log(`\nTotal replacements: ${totalReplacements}`);
console.log('Done!');
