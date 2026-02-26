import { fileURLToPath } from 'url';
import { join, parse } from 'path';
import { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const projectsDir = join(projectRoot, 'public', 'projects');

const sizes = [
  { width: 380, suffix: '-380' },
  { width: 600, suffix: '-600' },
  { width: 1200, suffix: '' } // No suffix for full size
];

async function generateResponsiveImages() {
  if (!existsSync(projectsDir)) {
    console.log('Projects directory not found - skipping responsive image generation');
    return;
  }

  const files = readdirSync(projectsDir).filter(file => {
    return file.match(/\.(webp|jpg|jpeg|png)$/i);
  });

  if (files.length === 0) {
    console.log('No images found in projects folder');
    return;
  }

  console.log(`📸 Generating responsive images for ${files.length} files...`);
  
  let generatedCount = 0;

  for (const file of files) {
    const filePath = join(projectsDir, file);
    const parsed = parse(file);
    
    // Skip if it's already a variant (ends with -380, -600, etc)
    if (parsed.name.match(/-\d{3}$/)) {
      continue;
    }

    try {
      const metadata = await sharp(filePath).metadata();
      const originalWidth = metadata.width;
      const originalHeight = metadata.height;

      // Only generate variants if image is larger than 380px
      if (originalWidth <= 380) {
        console.log(`⊘ ${file}: Already small (${originalWidth}px), skipping`);
        continue;
      }

      // Generate variants for each size
      for (const size of sizes) {
        // Only generate sizes smaller than or equal to original width
        if (size.width > originalWidth) {
          continue;
        }

        const newHeight = Math.round((size.width / originalWidth) * originalHeight);
        const resizedImage = sharp(filePath).resize(size.width, newHeight, {
          fit: 'cover',
          withoutEnlargement: true
        });

        // Generate WebP variant
        const webpName = `${parsed.name}${size.suffix}.webp`;
        const webpPath = join(projectsDir, webpName);
        if (!existsSync(webpPath)) {
          await resizedImage.toFormat('webp', { quality: 80 }).toFile(webpPath);
          generatedCount++;
          const webpSize = statSync(webpPath).size;
          console.log(`  ✓ ${webpName} (${size.width}x${newHeight}, ${Math.round(webpSize / 1024)}KB)`);
        }

        // Generate AVIF variant for better compression (especially for mobile 380/600px)
        const avifName = `${parsed.name}${size.suffix}.avif`;
        const avifPath = join(projectsDir, avifName);
        if (!existsSync(avifPath) && size.width < 1200) {
          await resizedImage.toFormat('avif', { quality: 70 }).toFile(avifPath);
          generatedCount++;
          const avifSize = statSync(avifPath).size;
          console.log(`  ✓ ${avifName} (${size.width}x${newHeight}, ${Math.round(avifSize / 1024)}KB)`);
        }
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n✅ Responsive image generation complete: ${generatedCount} variants created`);
}

generateResponsiveImages().catch((error) => {
  console.error('Responsive image generation failed:', error);
  process.exit(1);
});
