import { fileURLToPath } from 'url';
import { join } from 'path';
import fs from 'fs';
import fsPromises from 'node:fs/promises';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const heroSource = join(projectRoot, 'public', 'hero-video-thumb.jpg');
const heroAvif = join(projectRoot, 'public', 'hero-video-thumb.avif');
const heroWebp = join(projectRoot, 'public', 'hero-video-thumb.webp');
const logoSource = join(projectRoot, 'src', 'assets', 'logo.png');
const logoTemp = join(projectRoot, 'src', 'assets', 'logo-optimized.png');

async function optimizeHero() {
  if (!fs.existsSync(heroSource)) {
    throw new Error(`Missing hero placeholder at ${heroSource}`);
  }

  const metadata = await sharp(heroSource).metadata();
  await sharp(heroSource).avif({ quality: 50 }).toFile(heroAvif);
  await sharp(heroSource).webp({ quality: 72 }).toFile(heroWebp);
  console.log(
    `Hero placeholder optimized (${metadata.width}x${metadata.height}) → ${heroAvif}, ${heroWebp}`
  );
}

async function optimizeLogo() {
  // Skip if logo is SVG (SVG doesn't need optimization)
  if (!fs.existsSync(logoSource)) {
    console.log('Logo PNG not found - skipping optimization (using SVG instead)');
    return;
  }

  await sharp(logoSource)
    .resize({ width: 64, height: 64, fit: 'contain', withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(logoTemp);

  await fsPromises.rename(logoTemp, logoSource);

  const { size } = await fsPromises.stat(logoSource);
  const metadata = await sharp(logoSource).metadata();
  console.log(
    `Logo rewritten at ${metadata.width}x${metadata.height} (${Math.round(size / 1024)} KB)`
  );
}

async function run() {
  await optimizeHero();
  await optimizeLogo();
}

run().catch((error) => {
  console.error('Asset optimization failed:', error);
  process.exit(1);
});
