const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'projects');

fs.readdirSync(dir).forEach(async (file) => {
  const ext = path.extname(file).toLowerCase();
  if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) return;
  const filePath = path.join(dir, file);
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const ratio = (metadata.width / metadata.height).toFixed(2);
    let status = '';
    if (metadata.width === 1200 && metadata.height === 900) status = 'OK 4:3';
    else if (metadata.width === 900 && metadata.height === 1200) status = 'OK 3:4';
    else status = 'NON STANDARD';
    console.log(`${file}: ${metadata.width}x${metadata.height} (ratio: ${ratio}) [${status}]`);
  } catch (err) {
    console.error(`Errore su ${file}:`, err.message);
  }
}); 