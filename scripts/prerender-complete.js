#!/usr/bin/env node
/**
 * Complete Pre-rendering Script with Puppeteer
 * Renders React components with full content, not just skeleton
 * Generates static HTML files with all content visible
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PREVIEW_URL = 'http://localhost:4173';
const DIST_DIR = path.join(__dirname, '../dist');

const PAGES = [
  '/',
  '/en',
  '/servizi',
  '/en/services',
  '/portfolio',
  '/en/portfolio',
  '/contatti',
  '/en/contact',
  '/privacy',
  '/en/privacy',
  '/cookie-policy',
  '/en/cookie-policy',
  '/servizi/casa',
  '/en/services/home',
  '/servizi/commerciale',
  '/en/services/commercial',
  '/servizi/edifici',
  '/en/services/buildings',
];

let previewProcess = null;
let browser = null;

/**
 * Avvia il preview server
 */
async function startPreviewServer() {
  console.log('🚀 Avvio preview server...');
  
  return new Promise((resolve, reject) => {
    previewProcess = exec('npm run preview:ci', {
      cwd: path.join(__dirname, '..'),
      timeout: 30000
    }, (error, stdout, stderr) => {
      if (error && !error.killed) {
        console.error('❌ Errore preview server:', error);
      }
    });

    // Aspetta che il server sia pronto
    setTimeout(() => {
      console.log('✅ Preview server pronto');
      resolve();
    }, 3000);
  });
}

/**
 * Ferma il preview server
 */
function stopPreviewServer() {
  if (previewProcess) {
    console.log('🛑 Fermo preview server...');
    previewProcess.kill();
  }
}

/**
 * Renderizza una pagina con Puppeteer
 */
async function renderPage(browser, url) {
  const fullUrl = `${PREVIEW_URL}${url}`;
  console.log(`📄 Renderizzando: ${url}`);

  try {
    const page = await browser.newPage();
    
    // Naviga alla pagina e aspetta che tutto sia caricato
    await page.goto(fullUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Aspetta extra per React
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Cattura il contenuto completo
    const html = await page.content();
    await page.close();

    return html;
  } catch (error) {
    console.error(`❌ Errore renderizzazione ${url}:`, error.message);
    return null;
  }
}

/**
 * Salva l'HTML nel dist
 */
function saveHtml(pagePath, html) {
  if (!html) return;

  let filePath;
  if (pagePath === '/') {
    filePath = path.join(DIST_DIR, 'index.html');
  } else {
    filePath = path.join(DIST_DIR, pagePath.substring(1), 'index.html');
  }

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, html);
  console.log(`✅ Salvato: ${filePath}`);
}

/**
 * Main
 */
async function main() {
  try {
    console.log('🎯 Pre-rendering completo con Puppeteer...\n');

    // Avvia preview server
    await startPreviewServer();

    // Lancia Puppeteer
    console.log('🌐 Avvio browser Puppeteer...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Renderizza ogni pagina
    for (const page of PAGES) {
      const html = await renderPage(browser, page);
      if (html) {
        saveHtml(page, html);
      }
    }

    // Cleanup
    await browser.close();
    stopPreviewServer();

    console.log('\n✨ Pre-rendering completato!');
    console.log(`📁 File salvati in: ${DIST_DIR}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Errore:', error);
    if (browser) await browser.close();
    stopPreviewServer();
    process.exit(1);
  }
}

main();
