import { readdir, mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import sharp from 'sharp';

// Ad-hoc converter for new portfolio batches
const tasks = [
  { slug: 'brescini', sourceDir: 'C:/Users/kount/Desktop/Stylianos/Sito internet/Foto/Casa Brescini/Web' },
  { slug: 'sikinos', sourceDir: 'C:/Users/kount/Desktop/Stylianos/Sito internet/Foto/Casa Sikinos/Web' }
];

const destDir = resolve('public/projects');
const resizeOptions = {
  width: 1200,
  height: 900,
  fit: 'cover',
  position: 'centre',
  withoutEnlargement: true
};
const quality = 82;

async function convertTask(task) {
  const files = (await readdir(task.sourceDir))
    .filter((file) => /\.(jpe?g|png)$/i.test(file))
    .sort((a, b) => a.localeCompare(b));

  let count = 0;
  for (const file of files) {
    const input = join(task.sourceDir, file);
    const outName = `${task.slug}-${String(++count).padStart(2, '0')}.webp`;
    const output = join(destDir, outName);

    await sharp(input)
      .resize(resizeOptions)
      .webp({ quality })
      .toFile(output);

    console.log(`${input} -> ${output}`);
  }

  console.log(`Converted ${count} images for ${task.slug}`);
}

async function run() {
  await mkdir(destDir, { recursive: true });

  for (const task of tasks) {
    await convertTask(task);
  }
}

run().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
