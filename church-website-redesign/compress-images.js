/**
 * compress-images.js — Compresses all large images in-place.
 * Converts PNG photos → JPEG where it saves significant space.
 * Run: cd church-website-redesign && node compress-images.js
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const ASSETS_DIR      = path.join(__dirname, 'assets', 'images');
const SIZE_THRESHOLD  = 100 * 1024; // skip files already under 100 KB
const MAX_W           = 1600;
const MAX_H           = 1200;
const JPEG_QUALITY    = 78;

// PNG files that must stay PNG (logos, posters with transparency)
const KEEP_PNG = new Set([
  'church-logo.png',
  'rugby-logo.png',
  'icon-address.svg',
  'icon-email.svg',
  'icon-phone.svg',
  // poster/flyer PNGs that need transparency
  'rugby-sunday-service-poster.png',
  'easter-palm-sunday-flyer.png',
  'thanksgiving-harvest-poster.png',
  'mothers-day-flyer.png',
  'christmas-2025-poster.png',
]);

function walk(dir) {
  const files = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (/\.(jpg|jpeg|png)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function compress(imgPath) {
  const stat   = fs.statSync(imgPath);
  if (stat.size < SIZE_THRESHOLD) return 'skip-small';

  const name = path.basename(imgPath);
  const ext  = path.extname(imgPath).toLowerCase();
  const beforeKB = Math.round(stat.size / 1024);

  let outPath = imgPath;

  try {
    if (ext === '.png' && !KEEP_PNG.has(name)) {
      // Convert photo PNGs → JPEG (much smaller), update filename
      const jpgPath = imgPath.replace(/\.png$/i, '.jpg');
      await sharp(imgPath)
        .resize(MAX_W, MAX_H, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(jpgPath + '.tmp');

      const tmpStat = fs.statSync(jpgPath + '.tmp');
      // Only switch to JPEG if it's meaningfully smaller
      if (tmpStat.size < stat.size * 0.75) {
        fs.unlinkSync(imgPath);
        fs.renameSync(jpgPath + '.tmp', jpgPath);
        outPath = jpgPath;
      } else {
        // Keep PNG but still resize it
        fs.unlinkSync(jpgPath + '.tmp');
        await sharp(imgPath)
          .resize(MAX_W, MAX_H, { fit: 'inside', withoutEnlargement: true })
          .png({ compressionLevel: 9, quality: 80 })
          .toFile(imgPath + '.tmp');
        fs.unlinkSync(imgPath);
        fs.renameSync(imgPath + '.tmp', imgPath);
      }
    } else {
      // JPEG — just resize + quality-compress in place
      await sharp(imgPath)
        .resize(MAX_W, MAX_H, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(imgPath + '.tmp');
      fs.unlinkSync(imgPath);
      fs.renameSync(imgPath + '.tmp', imgPath);
    }

    const afterKB  = Math.round(fs.statSync(outPath).size / 1024);
    const savedKB  = beforeKB - afterKB;
    const changed  = outPath !== imgPath ? ` → ${path.basename(outPath)}` : '';
    return { beforeKB, afterKB, savedKB, changed };
  } catch (err) {
    // Clean up any stray .tmp file
    try { if (fs.existsSync(imgPath + '.tmp')) fs.unlinkSync(imgPath + '.tmp'); } catch {}
    throw err;
  }
}

(async () => {
  const files = walk(ASSETS_DIR);
  let processed = 0, skipped = 0, totalSaved = 0;
  console.log(`Found ${files.length} images. Compressing…\n`);

  for (const f of files) {
    const rel = path.relative(ASSETS_DIR, f);
    try {
      const r = await compress(f);
      if (r === 'skip-small') { skipped++; continue; }
      processed++;
      totalSaved += r.savedKB;
      const bar = r.savedKB > 0 ? `✅` : `⚡`;
      console.log(`${bar} ${rel.padEnd(70)}${r.beforeKB}KB → ${r.afterKB}KB${r.changed}`);
    } catch (e) {
      console.warn(`⚠️  ${rel} — ${e.message.slice(0, 100)}`);
    }
  }

  console.log('\n' + '─'.repeat(70));
  console.log(`Processed : ${processed} images`);
  console.log(`Skipped   : ${skipped} images (already small)`);
  console.log(`Total saved: ${(totalSaved / 1024).toFixed(1)} MB`);
})();
