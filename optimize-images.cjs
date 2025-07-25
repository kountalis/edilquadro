// Ottimizzazione immagini per siti statici (Node.js)
// Dipendenze: sharp, glob

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'projects');

const ORIZ_SIZE = { width: 1200, height: 900 };
const VERT_SIZE = { width: 900, height: 1200 };
const QUALITY = 80;

// 1. Ottimizza e crea immagini _std.webp
fs.readdirSync(dir).forEach(async (file) => {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;
  if (file.endsWith('_std.webp')) return; // Salta già ottimizzate
  const filePath = path.join(dir, file);
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    let size = ORIZ_SIZE;
    if (metadata.height > metadata.width) size = VERT_SIZE;
    const baseName = path.basename(file, ext);
    const newFile = path.join(dir, `${baseName}_std.webp`);
    await image
      .resize(size.width, size.height, { fit: 'cover' })
      .webp({ quality: QUALITY })
      .toFile(newFile);
    console.log(`✔ ${file} → ${baseName}_std.webp [${size.width}x${size.height}]`);
  } catch (err) {
    console.error(`Errore su ${file}:`, err.message);
  }
});

// 2. Elimina tutte le immagini originali che non hanno _std nel nome
fs.readdirSync(dir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;
  if (file.endsWith('_std.webp')) return;
  fs.unlinkSync(path.join(dir, file));
  console.log(`🗑 Eliminato: ${file}`);
});

// 3. Rinomina tutte le immagini _std.webp rimuovendo il suffisso
fs.readdirSync(dir).forEach((file) => {
  if (file.endsWith('_std.webp')) {
    const newName = file.replace('_std.webp', '.webp');
    fs.renameSync(path.join(dir, file), path.join(dir, newName));
    console.log(`✏️  Rinominato: ${file} → ${newName}`);
  }
}); 