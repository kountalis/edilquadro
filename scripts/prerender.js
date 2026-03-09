#!/usr/bin/env node
/**
 * Pre-render script using Puppeteer for true server-side rendering
 * 
 * 1. Starts Vite preview server on the built dist/
 * 2. Uses Puppeteer to render each route with full React content
 * 3. Injects correct metadata from METADATI_PAGINE.js
 * 4. Saves fully-rendered HTML files for each route
 * 
 * This ensures Google sees REAL PAGE CONTENT without needing JS rendering.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import PAGE_METADATA from '../METADATI_PAGINE.js';
import { HREFLANG_PAIRS } from '../METADATI_PAGINE.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');

const PREVIEW_PORT = 4174;
const PREVIEW_URL = `http://localhost:${PREVIEW_PORT}`;

// Routes to pre-render
const routes = [
  { path: '/',                       filename: 'index.html',                          lang: 'it' },
  { path: '/en',                     filename: 'en/index.html',                       lang: 'en' },
  { path: '/servizi',                filename: 'servizi/index.html',                  lang: 'it' },
  { path: '/en/services',            filename: 'en/services/index.html',              lang: 'en' },
  { path: '/portfolio',              filename: 'portfolio/index.html',                lang: 'it' },
  { path: '/en/portfolio',           filename: 'en/portfolio/index.html',             lang: 'en' },
  { path: '/contatti',               filename: 'contatti/index.html',                 lang: 'it' },
  { path: '/en/contact',             filename: 'en/contact/index.html',               lang: 'en' },
  { path: '/privacy',                filename: 'privacy/index.html',                  lang: 'it' },
  { path: '/en/privacy',             filename: 'en/privacy/index.html',               lang: 'en' },
  { path: '/cookie-policy',          filename: 'cookie-policy/index.html',            lang: 'it' },
  { path: '/en/cookie-policy',       filename: 'en/cookie-policy/index.html',         lang: 'en' },
  { path: '/servizi/casa',           filename: 'servizi/casa/index.html',             lang: 'it' },
  { path: '/en/services/home',       filename: 'en/services/home/index.html',         lang: 'en' },
  { path: '/servizi/commerciale',    filename: 'servizi/commerciale/index.html',      lang: 'it' },
  { path: '/en/services/commercial', filename: 'en/services/commercial/index.html',   lang: 'en' },
  { path: '/servizi/edifici',        filename: 'servizi/edifici/index.html',          lang: 'it' },
  { path: '/en/services/buildings',  filename: 'en/services/buildings/index.html',    lang: 'en' },
  // Portfolio project pages (IT)
  { path: '/portfolio/casa-moderna-bracciano',          filename: 'portfolio/casa-moderna-bracciano/index.html',          lang: 'it' },
  { path: '/portfolio/piazza-cina-genzano',             filename: 'portfolio/piazza-cina-genzano/index.html',             lang: 'it' },
  { path: '/portfolio/centro-yoga-tuscolana',           filename: 'portfolio/centro-yoga-tuscolana/index.html',           lang: 'it' },
  { path: '/portfolio/attico-alessandrino-roma',        filename: 'portfolio/attico-alessandrino-roma/index.html',        lang: 'it' },
  { path: '/portfolio/negozio-abbigliamento-tuscolana', filename: 'portfolio/negozio-abbigliamento-tuscolana/index.html', lang: 'it' },
  { path: '/portfolio/villa-sul-mare-grecia',           filename: 'portfolio/villa-sul-mare-grecia/index.html',           lang: 'it' },
  { path: '/portfolio/asilo-nido-pomezia',              filename: 'portfolio/asilo-nido-pomezia/index.html',              lang: 'it' },
  { path: '/portfolio/ristorante-san-giovanni',         filename: 'portfolio/ristorante-san-giovanni/index.html',         lang: 'it' },
  { path: '/portfolio/casa-aurelio-roma',               filename: 'portfolio/casa-aurelio-roma/index.html',               lang: 'it' },
  { path: '/portfolio/complesso-residenziale-pomezia',  filename: 'portfolio/complesso-residenziale-pomezia/index.html',  lang: 'it' },
  { path: '/portfolio/ortus-artis-padula',              filename: 'portfolio/ortus-artis-padula/index.html',              lang: 'it' },
  { path: '/portfolio/appartamento-aurelio',            filename: 'portfolio/appartamento-aurelio/index.html',            lang: 'it' },
  { path: '/portfolio/casa-cicladi-sikinos',            filename: 'portfolio/casa-cicladi-sikinos/index.html',            lang: 'it' },
  { path: '/portfolio/casa-moderna-eur',                filename: 'portfolio/casa-moderna-eur/index.html',                lang: 'it' },
  { path: '/portfolio/bar-eur',                         filename: 'portfolio/bar-eur/index.html',                         lang: 'it' },
  // Portfolio project pages (EN)
  { path: '/en/portfolio/casa-moderna-bracciano',          filename: 'en/portfolio/casa-moderna-bracciano/index.html',          lang: 'en' },
  { path: '/en/portfolio/piazza-cina-genzano',             filename: 'en/portfolio/piazza-cina-genzano/index.html',             lang: 'en' },
  { path: '/en/portfolio/centro-yoga-tuscolana',           filename: 'en/portfolio/centro-yoga-tuscolana/index.html',           lang: 'en' },
  { path: '/en/portfolio/attico-alessandrino-roma',        filename: 'en/portfolio/attico-alessandrino-roma/index.html',        lang: 'en' },
  { path: '/en/portfolio/negozio-abbigliamento-tuscolana', filename: 'en/portfolio/negozio-abbigliamento-tuscolana/index.html', lang: 'en' },
  { path: '/en/portfolio/villa-sul-mare-grecia',           filename: 'en/portfolio/villa-sul-mare-grecia/index.html',           lang: 'en' },
  { path: '/en/portfolio/asilo-nido-pomezia',              filename: 'en/portfolio/asilo-nido-pomezia/index.html',              lang: 'en' },
  { path: '/en/portfolio/ristorante-san-giovanni',         filename: 'en/portfolio/ristorante-san-giovanni/index.html',         lang: 'en' },
  { path: '/en/portfolio/casa-aurelio-roma',               filename: 'en/portfolio/casa-aurelio-roma/index.html',               lang: 'en' },
  { path: '/en/portfolio/complesso-residenziale-pomezia',  filename: 'en/portfolio/complesso-residenziale-pomezia/index.html',  lang: 'en' },
  { path: '/en/portfolio/ortus-artis-padula',              filename: 'en/portfolio/ortus-artis-padula/index.html',              lang: 'en' },
  { path: '/en/portfolio/appartamento-aurelio',            filename: 'en/portfolio/appartamento-aurelio/index.html',            lang: 'en' },
  { path: '/en/portfolio/casa-cicladi-sikinos',            filename: 'en/portfolio/casa-cicladi-sikinos/index.html',            lang: 'en' },
  { path: '/en/portfolio/casa-moderna-eur',                filename: 'en/portfolio/casa-moderna-eur/index.html',                lang: 'en' },
  { path: '/en/portfolio/bar-eur',                         filename: 'en/portfolio/bar-eur/index.html',                         lang: 'en' },
];

function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Start Vite preview server and wait until it's ready
 */
function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const isWindows = process.platform === 'win32';
    
    // Use shell: true on Windows to handle paths with spaces and .cmd extensions
    const server = spawn('npx', ['vite', 'preview', '--port', String(PREVIEW_PORT), '--strictPort'], {
      cwd: projectRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env },
      shell: true,
    });

    let started = false;
    const timeout = setTimeout(() => {
      if (!started) {
        reject(new Error('Preview server did not start within 30s'));
      }
    }, 30000);

    const checkOutput = (data) => {
      const output = data.toString();
      if ((output.includes('Local:') || output.includes(`${PREVIEW_PORT}`)) && !started) {
        started = true;
        clearTimeout(timeout);
        setTimeout(() => resolve(server), 1500);
      }
    };

    server.stdout.on('data', checkOutput);
    server.stderr.on('data', checkOutput);

    server.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    server.on('close', (code) => {
      if (!started) {
        clearTimeout(timeout);
        reject(new Error(`Preview server exited with code ${code}`));
      }
    });
  });
}

/**
 * Kill the preview server
 */
function killServer(server) {
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(server.pid), '/f', '/t'], { shell: true });
  } else {
    server.kill('SIGTERM');
  }
}

/**
 * Inject correct metadata from METADATI_PAGINE into the rendered HTML
 */
function injectMetadata(html, route) {
  const metadata = PAGE_METADATA[route.path];
  if (!metadata) {
    console.warn(`⚠️  No metadata found for ${route.path}`);
    return html;
  }

  // Set correct lang attribute
  html = html.replace(/<html[^>]*lang="[^"]+"/g, `<html lang="${metadata.lang}"`);

  // Replace title (take the first one, handle duplicates from React Helmet)
  const titleMatches = html.match(/<title>.*?<\/title>/g);
  if (titleMatches && titleMatches.length > 1) {
    // Remove duplicate titles from React Helmet, keep only one
    for (let i = 1; i < titleMatches.length; i++) {
      html = html.replace(titleMatches[i], '');
    }
  }
  html = html.replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`);

  // Replace meta description (handle duplicates)
  const descMatches = html.match(/<meta name="description" content="[^"]*">/g);
  if (descMatches && descMatches.length > 1) {
    for (let i = 1; i < descMatches.length; i++) {
      html = html.replace(descMatches[i], '');
    }
  }
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${metadata.description}">`
  );

  // Replace or add canonical (handle duplicates)
  const canonMatches = html.match(/<link rel="canonical" href="[^"]*"[^>]*>/g);
  if (canonMatches) {
    if (canonMatches.length > 1) {
      for (let i = 1; i < canonMatches.length; i++) {
        html = html.replace(canonMatches[i], '');
      }
    }
    html = html.replace(
      /<link rel="canonical" href="[^"]*"[^>]*>/,
      `<link rel="canonical" href="${metadata.canonical}">`
    );
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${metadata.canonical}">\n  </head>`);
  }

  // Replace or add og:image (handle duplicates)
  const ogMatches = html.match(/<meta property="og:image" content="[^"]*"[^>]*>/g);
  if (ogMatches) {
    if (ogMatches.length > 1) {
      for (let i = 1; i < ogMatches.length; i++) {
        html = html.replace(ogMatches[i], '');
      }
    }
    html = html.replace(
      /<meta property="og:image" content="[^"]*"[^>]*>/,
      `<meta property="og:image" content="${metadata.ogImage}">`
    );
  } else {
    html = html.replace('</head>', `    <meta property="og:image" content="${metadata.ogImage}">\n  </head>`);
  }

  // --- Add hreflang tags ---
  // Remove any existing hreflang tags first
  html = html.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*"[^>]*>\s*/g, '');

  const alternatePath = HREFLANG_PAIRS[route.path];
  if (alternatePath) {
    const altMeta = PAGE_METADATA[alternatePath];
    if (altMeta) {
      const hreflangTags = [
        `<link rel="alternate" hreflang="${metadata.lang}" href="${metadata.canonical}">`,
        `<link rel="alternate" hreflang="${altMeta.lang}" href="${altMeta.canonical}">`,
        `<link rel="alternate" hreflang="x-default" href="https://edilquadro.it/">`,
      ].join('\n    ');
      html = html.replace('</head>', `    ${hreflangTags}\n  </head>`);
    }
  }

  // --- Fix JSON-LD structured data for language ---
  // Replace the hardcoded Italian JSON-LD description with language-appropriate one
  if (metadata.lang === 'en') {
    html = html.replace(
      /"description":\s*"Impresa edile a Roma specializzata in ristrutturazione casa, negozi, bar, ristoranti, edifici e condomini\. Soluzioni chiavi in mano, preventivo gratuito, portfolio lavori realizzati\."/,
      `"description": "Rome-based building company specialized in renovations of homes, shops, bars, restaurants, and residential buildings. Turnkey solutions, free quotation, portfolio of completed work."`
    );
    // Also update the URL in JSON-LD for EN pages
    html = html.replace(
      /"url":\s*"https:\/\/edilquadro\.it\/"/,
      `"url": "${metadata.canonical}"`
    );
  }

  // --- Remove hidden H1 outside #root (legacy SEO fix, now unnecessary) ---
  html = html.replace(/<h1 style="position: absolute; width: 1px; height: 1px;[^"]*">[^<]*<\/h1>\s*/g, '');

  return html;
}

/**
 * Main pre-render function
 */
async function prerender() {
  console.log('\n📄 Starting Puppeteer pre-render process...\n');

  if (!fs.existsSync(distDir)) {
    console.error('✗ dist directory not found. Run "vite build" first.');
    process.exit(1);
  }

  let server;
  let browser;

  try {
    // Step 1: Start preview server
    console.log('🔧 Starting Vite preview server...');
    server = await startPreviewServer();
    console.log(`✓ Preview server running on port ${PREVIEW_PORT}\n`);

    // Step 2: Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    });

    let successful = 0;
    let failed = 0;

    for (const route of routes) {
      try {
        const page = await browser.newPage();

        // Block heavy resources to speed up rendering
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          const type = req.resourceType();
          if (['image', 'media', 'font'].includes(type)) {
            req.abort();
          } else {
            req.continue();
          }
        });

        const url = `${PREVIEW_URL}${route.path}`;
        console.log(`🔄 Rendering: ${route.path}`);

        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 30000,
        });

        // Wait for React to render meaningful content inside #root
        await page.waitForFunction(() => {
          const root = document.getElementById('root');
          return root && root.children.length > 0 && root.innerHTML.length > 100;
        }, { timeout: 15000 });

        // Extra time for lazy-loaded components and i18n
        await new Promise(r => setTimeout(r, 1500));

        // Get the fully rendered HTML
        let html = await page.content();

        // Inject correct metadata from METADATI_PAGINE
        html = injectMetadata(html, route);

        // Write prerendered file
        const fullPath = path.resolve(distDir, route.filename);
        ensureDirectoryExists(fullPath);
        fs.writeFileSync(fullPath, html, 'utf-8');

        // Verify content was rendered by checking total HTML size
        const contentLen = html.length;

        if (contentLen < 5000) {
          console.warn(`⚠️  Warning: ${route.path} has very little content (${contentLen} chars total)`);
        }

        console.log(`✓ Pre-rendered: ${route.path} → ${route.filename} (${contentLen} chars total)`);
        successful++;
        await page.close();
      } catch (error) {
        console.error(`✗ Error pre-rendering ${route.path}:`, error.message);
        failed++;
      }
    }

    console.log(`\n✓ Pre-render complete: ${successful} routes generated${failed > 0 ? `, ${failed} failed` : ''}\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error during pre-render:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
    if (server) {
      killServer(server);
      console.log('🔧 Preview server stopped.');
    }
  }
}

prerender().catch((error) => {
  console.error('Fatal error during pre-render:', error);
  process.exit(1);
});
