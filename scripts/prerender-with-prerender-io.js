#!/usr/bin/env node

/**
 * Pre-rendering Script con Puppeteer
 * Renderizza il sito React completo a HTML statico
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEV_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(__dirname, '../prerendered');

const PAGES = [
  '/',
  '/servizi',
  '/servizi/casa',
  '/servizi/commerciale',
  '/servizi/edifici',
  '/portfolio',
  '/contatti',
  '/privacy',
  '/cookie-policy',
  '/en',
  '/en/services',
  '/en/portfolio',
  '/en/contact',
];

let viteProcess = null;
let browser = null;

// Crea cartella output
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Avvia il dev server Vite
 */
function startViteServer() {
  return new Promise((resolve) => {
    console.log('🚀 Avvio dev server Vite...');
    viteProcess = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe',
    });

    // Aspetta che Vite sia pronto
    setTimeout(() => {
      console.log('✅ Dev server pronto');
      resolve();
    }, 5000);
  });
}

/**
 * Ferma il dev server
 */
function stopViteServer() {
  if (viteProcess) {
    console.log('🛑 Fermo dev server...');
    viteProcess.kill();
  }
}

/**
 * Renderizza una pagina con Puppeteer
 */
async function renderPage(browser, url) {
  const fullUrl = `${DEV_URL}${url}`;
  console.log(`📄 Renderizzando: ${url}`);

  try {
    const page = await browser.newPage();
    await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Aspetta che React finisca il rendering
    await page.waitForTimeout(2000);
    
    const html = await page.content();
    await page.close();
    
    return html;
  } catch (err) {
    console.error(`❌ Errore renderizzazione ${url}:`, err.message);
    return null;
  }
}

/**
 * Salva l'HTML
 */
function saveHtml(pathname, html) {
  if (!html) return;

  const filepath = pathname === '/' 
    ? path.join(OUTPUT_DIR, 'index.html')
    : path.join(OUTPUT_DIR, pathname.replace(/\//g, path.sep) + '.html');

  const dir = path.dirname(filepath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filepath, html, 'utf-8');
  console.log(`✅ Salvato: ${filepath}`);
}

/**
 * Main
 */
async function main() {
  try {
    console.log('\n🎯 Pre-rendering con Puppeteer...\n');
    
    await startViteServer();
    
    console.log('\n🌐 Avvio browser Puppeteer...\n');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const page of PAGES) {
      const html = await renderPage(browser, page);
      saveHtml(page, html);
    }

    await browser.close();
    stopViteServer();

    console.log('\n✨ Pre-rendering completato!\n');
    console.log('📁 File salvati in:', OUTPUT_DIR);
    console.log('\n📤 Prossimi step:');
    console.log('1. Carica i file su TopHost via FTP');
    console.log('2. Testa su https://www.edilquadro.it');
    console.log('3. Riscannerizza su Bing\n');

  } catch (err) {
    console.error('❌ Errore:', err);
    stopViteServer();
    if (browser) await browser.close();
    process.exit(1);
  }
}

main();
