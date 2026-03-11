/**
 * Rename project images with SEO-friendly filenames
 * Maps old generic names → slug-based descriptive names
 * Also renames responsive variants (-380.avif, -380.webp, -600.avif, -600.webp)
 */
const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '..', 'public', 'projects');

// Mapping: old base name (without extension) → new base name
// New names use project slug + sequential number with zero-padding
const RENAME_MAP = {
  // casa-moderna-bracciano (Lago di Bracciano)
  'casaleucade1': 'casa-moderna-bracciano-01',
  'casaleucade2': 'casa-moderna-bracciano-02',
  'casaleucade3': 'casa-moderna-bracciano-03',
  'casaleucade4': 'casa-moderna-bracciano-04',
  'casaleucade5': 'casa-moderna-bracciano-05',

  // piazza-cina-genzano (condominio Genzano)
  'piazzacina1': 'ristrutturazione-condominio-genzano-01',
  'piazzacina2': 'ristrutturazione-condominio-genzano-02',
  'piazzacina3': 'ristrutturazione-condominio-genzano-03',
  'piazzacina4': 'ristrutturazione-condominio-genzano-04',
  'piazzacina5': 'ristrutturazione-condominio-genzano-05',
  'piazzacina6': 'ristrutturazione-condominio-genzano-06',
  'piazzacina7': 'ristrutturazione-condominio-genzano-07',

  // centro-yoga-tuscolana
  'Yoga Hatha 1': 'centro-yoga-tuscolana-roma-01',
  'Yoga Hatha 2': 'centro-yoga-tuscolana-roma-02',
  'Yoga Hatha 3': 'centro-yoga-tuscolana-roma-03',
  'Yoga Hatha 4': 'centro-yoga-tuscolana-roma-04',
  'Yoga Hatha 5': 'centro-yoga-tuscolana-roma-05',
  'Yoga Hatha 6': 'centro-yoga-tuscolana-roma-06',
  'Yoga Hatha 7': 'centro-yoga-tuscolana-roma-07',
  'Yoga Hatha 8': 'centro-yoga-tuscolana-roma-08',
  'Yoga Hatha 9': 'centro-yoga-tuscolana-roma-09',
  'Yoga Hatha 10': 'centro-yoga-tuscolana-roma-10',

  // attico-alessandrino-roma
  'alessandrino1': 'attico-alessandrino-roma-01',
  'alessandrino2': 'attico-alessandrino-roma-02',
  'alessandrino3': 'attico-alessandrino-roma-03',
  'alessandrino4': 'attico-alessandrino-roma-04',
  'alessandrino5': 'attico-alessandrino-roma-05',
  'alessandrino6': 'attico-alessandrino-roma-06',
  'alessandrino7': 'attico-alessandrino-roma-07',
  'alessandrino8': 'attico-alessandrino-roma-08',
  'alessandrino9': 'attico-alessandrino-roma-09',
  'Alessandrino10': 'attico-alessandrino-roma-10',
  'Alessandrino11': 'attico-alessandrino-roma-11',
  'Alessandrino12': 'attico-alessandrino-roma-12',
  'Alessandrino13': 'attico-alessandrino-roma-13',
  'Alessandrino14': 'attico-alessandrino-roma-14',
  'Alessandrino15': 'attico-alessandrino-roma-15',
  'Alessandrino16': 'attico-alessandrino-roma-16',

  // negozio-abbigliamento-tuscolana
  'ABBIGLIAMENTO 1': 'negozio-abbigliamento-tuscolana-01',
  'ABBIGLIAMENTO 2': 'negozio-abbigliamento-tuscolana-02',
  'ABBIGLIAMENTO 3': 'negozio-abbigliamento-tuscolana-03',
  'ABBIGLIAMENTO 4': 'negozio-abbigliamento-tuscolana-04',
  'ABBIGLIAMENTO 5': 'negozio-abbigliamento-tuscolana-05',
  'ABBIGLIAMENTO 6': 'negozio-abbigliamento-tuscolana-06',
  'ABBIGLIAMENTO 7': 'negozio-abbigliamento-tuscolana-07',
  'ABBIGLIAMENTO 8': 'negozio-abbigliamento-tuscolana-08',
  'ABBIGLIAMENTO 9': 'negozio-abbigliamento-tuscolana-09',

  // villa-sul-mare-grecia
  'project1': 'villa-sul-mare-grecia-01',
  'project2': 'villa-sul-mare-grecia-02',
  'project3': 'villa-sul-mare-grecia-03',
  'project4': 'villa-sul-mare-grecia-04',
  'project5': 'villa-sul-mare-grecia-05',
  'project6': 'villa-sul-mare-grecia-06',
  'project7': 'villa-sul-mare-grecia-07',
  'project8': 'villa-sul-mare-grecia-08',
  'project9': 'villa-sul-mare-grecia-09',
  'project10': 'villa-sul-mare-grecia-10',
  'project11': 'villa-sul-mare-grecia-11',
  'project12': 'villa-sul-mare-grecia-12',

  // asilo-nido-pomezia
  'warp1': 'asilo-nido-pomezia-01',
  'warp2': 'asilo-nido-pomezia-02',
  'warp3': 'asilo-nido-pomezia-03',
  'warp4': 'asilo-nido-pomezia-04',
  'warp5': 'asilo-nido-pomezia-05',
  'warp6': 'asilo-nido-pomezia-06',
  'warp7': 'asilo-nido-pomezia-07',
  'warp8': 'asilo-nido-pomezia-08',
  'warp9': 'asilo-nido-pomezia-09',

  // ristorante-san-giovanni
  'Ristorante 1': 'ristorante-san-giovanni-roma-01',
  'Ristorante 2': 'ristorante-san-giovanni-roma-02',
  'Ristorante 3': 'ristorante-san-giovanni-roma-03',
  'Ristorante 4': 'ristorante-san-giovanni-roma-04',
  'Ristorante 5': 'ristorante-san-giovanni-roma-05',

  // casa-aurelio-roma
  'Lunaduei Deluca 2': 'casa-aurelio-roma-01',
  'Lunaduei Deluca 3': 'casa-aurelio-roma-02',
  'Lunaduei Deluca 4': 'casa-aurelio-roma-03',
  'Lunaduei Deluca 5': 'casa-aurelio-roma-04',
  'Lunaduei Deluca 6': 'casa-aurelio-roma-05',
  'Lunaduei Deluca 7': 'casa-aurelio-roma-06',
  'Lunaduei Deluca 8': 'casa-aurelio-roma-07',
  'Lunaduei Deluca 9': 'casa-aurelio-roma-08',
  'Lunaduei Deluca 10': 'casa-aurelio-roma-09',
  'Lunaduei Deluca 11': 'casa-aurelio-roma-10',
  'Lunaduei Deluca 12': 'casa-aurelio-roma-11',
  'Lunaduei Deluca 13': 'casa-aurelio-roma-12',
  'Lunaduei Deluca 14': 'casa-aurelio-roma-13',
  'Lunaduei Deluca 15': 'casa-aurelio-roma-14',
  'Lunaduei Deluca 16': 'casa-aurelio-roma-15',
  'Lunaduei Deluca 17': 'casa-aurelio-roma-16',
  'Lunaduei Deluca 18': 'casa-aurelio-roma-17',
  'Lunaduei Deluca 19': 'casa-aurelio-roma-18',
  'Lunaduei Deluca 20': 'casa-aurelio-roma-19',
  'Lunaduei Deluca 21': 'casa-aurelio-roma-20',
  'Lunaduei Deluca 22': 'casa-aurelio-roma-21',
  'Lunaduei Deluca 23': 'casa-aurelio-roma-22',

  // complesso-residenziale-pomezia
  'pomezia1': 'complesso-residenziale-pomezia-01',
  'pomezia2': 'complesso-residenziale-pomezia-02',
  'pomezia3': 'complesso-residenziale-pomezia-03',
  'pomezia4': 'complesso-residenziale-pomezia-04',
  'pomezia5': 'complesso-residenziale-pomezia-05',

  // ortus-artis-padula
  'padula1': 'ortus-artis-padula-01',
  'padula2': 'ortus-artis-padula-02',
  'padula3': 'ortus-artis-padula-03',
  'padula4': 'ortus-artis-padula-04',
  'padula5': 'ortus-artis-padula-05',
  'padula6': 'ortus-artis-padula-06',
  'padula9': 'ortus-artis-padula-07',
  'padula10': 'ortus-artis-padula-08',
  'padula11': 'ortus-artis-padula-09',

  // appartamento-aurelio
  'brescini-01': 'appartamento-aurelio-roma-01',
  'brescini-02': 'appartamento-aurelio-roma-02',
  'brescini-03': 'appartamento-aurelio-roma-03',
  'brescini-04': 'appartamento-aurelio-roma-04',
  'brescini-05': 'appartamento-aurelio-roma-05',
  'brescini-06': 'appartamento-aurelio-roma-06',
  'brescini-07': 'appartamento-aurelio-roma-07',
  'brescini-08': 'appartamento-aurelio-roma-08',
  'brescini-09': 'appartamento-aurelio-roma-09',
  'brescini-10': 'appartamento-aurelio-roma-10',
  'brescini-11': 'appartamento-aurelio-roma-11',

  // casa-cicladi-sikinos
  'sikinos-01': 'casa-cicladi-sikinos-grecia-01',
  'sikinos-02': 'casa-cicladi-sikinos-grecia-02',
  'sikinos-03': 'casa-cicladi-sikinos-grecia-03',
  'sikinos-04': 'casa-cicladi-sikinos-grecia-04',
  'sikinos-05': 'casa-cicladi-sikinos-grecia-05',
  'sikinos-06': 'casa-cicladi-sikinos-grecia-06',
  'sikinos-07': 'casa-cicladi-sikinos-grecia-07',
  'sikinos-08': 'casa-cicladi-sikinos-grecia-08',
  'sikinos-09': 'casa-cicladi-sikinos-grecia-09',
  'sikinos-10': 'casa-cicladi-sikinos-grecia-10',
  'sikinos-11': 'casa-cicladi-sikinos-grecia-11',
  'sikinos-12': 'casa-cicladi-sikinos-grecia-12',

  // casa-moderna-eur (in progress)
  'In Progress 1': 'casa-moderna-eur-roma-01',

  // bar-eur (in progress)
  'Bar In Progress 1': 'bar-eur-roma-01',
};

// Extensions to rename for each base file
const EXTENSIONS = ['.webp', '-380.webp', '-380.avif', '-600.webp', '-600.avif'];

let renamed = 0;
let skipped = 0;
let errors = 0;

for (const [oldBase, newBase] of Object.entries(RENAME_MAP)) {
  for (const ext of EXTENSIONS) {
    const oldPath = path.join(PROJECTS_DIR, oldBase + ext);
    const newPath = path.join(PROJECTS_DIR, newBase + ext);
    
    if (fs.existsSync(oldPath)) {
      try {
        fs.renameSync(oldPath, newPath);
        renamed++;
        console.log(`✓ ${oldBase}${ext} → ${newBase}${ext}`);
      } catch (err) {
        errors++;
        console.error(`✗ Error renaming ${oldBase}${ext}: ${err.message}`);
      }
    } else {
      skipped++;
    }
  }
}

console.log(`\n✅ Done: ${renamed} files renamed, ${skipped} skipped (not found), ${errors} errors`);
