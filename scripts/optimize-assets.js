import { fileURLToPath } from 'url';
import { join } from 'path';
import fs from 'fs';
import fsPromises from 'node:fs/promises';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const heroSource = join(projectRoot, 'public', 'hero-video-thumb.jpg');
const heroAvif = join(projectRoot, 'public', 'hero-video-thumb.avif');
const heroWebp = join(projectRoot, 'public', 'hero-video-thumb.webp');
const portfolioSource = join(projectRoot, 'public', 'portfolio-bg.jpg');
const portfolioAvif = join(projectRoot, 'public', 'portfolio-bg.avif');
const portfolioWebp = join(projectRoot, 'public', 'portfolio-bg.webp');
const logoSource = join(projectRoot, 'src', 'assets', 'logo.png');
const logoTemp = join(projectRoot, 'src', 'assets', 'logo-optimized.png');

async function optimizeHero() {
  if (!fs.existsSync(heroSource)) {
    throw new Error(`Missing hero placeholder at ${heroSource}`);
  }

  const metadata = await sharp(heroSource).metadata();
  await sharp(heroSource).avif({ quality: 40 }).toFile(heroAvif);
  await sharp(heroSource).webp({ quality: 72 }).toFile(heroWebp);
  console.log(
    `Hero placeholder optimized (${metadata.width}x${metadata.height}) → ${heroAvif}, ${heroWebp}`
  );
}

async function optimizePortfolioBackground() {
  if (!fs.existsSync(portfolioSource)) {
    console.log('Portfolio background not found - skipping optimization');
    return;
  }

  const metadata = await sharp(portfolioSource).metadata();
  const originalSize = fs.statSync(portfolioSource).size;
  
  await sharp(portfolioSource).avif({ quality: 40 }).toFile(portfolioAvif);
  await sharp(portfolioSource).webp({ quality: 80 }).toFile(portfolioWebp);
  
  const avifSize = fs.statSync(portfolioAvif).size;
  const webpSize = fs.statSync(portfolioWebp).size;
  
  console.log(
    `Portfolio background optimized (${metadata.width}x${metadata.height}): JPG ${Math.round(originalSize / 1024)}KB → AVIF ${Math.round(avifSize / 1024)}KB (-${Math.round((1 - avifSize/originalSize) * 100)}%), WebP ${Math.round(webpSize / 1024)}KB`
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
  await optimizePortfolioBackground();
  await optimizeLogo();
}

run().catch((error) => {
  console.error('Asset optimization failed:', error);
  process.exit(1);
});
