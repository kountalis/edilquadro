#!/usr/bin/env node
/**
 * Pre-render script using Puppeteer
 * Renders React components on the server using a headless browser
 * Generates static HTML files with fully rendered content for SEO
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');

// Routes to pre-render
const routes = [
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

/**
 * Ensure directory exists
 */
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Pre-render all routes
 */
async function prerender() {
  console.log('\n🚀 Starting Puppeteer pre-render...\n');

  let browser;
  let successful = 0;
  let failed = 0;

  try {
    // Launch headless browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const route of routes) {
      try {
        const page = await browser.newPage();
        const url = `http://localhost:4173${route}`;

        console.log(`🔄 Rendering: ${route}`);

        // Navigate to the page
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });

        // Wait for React to hydrate
        await page.waitForTimeout(1000);

        // Get the rendered HTML
        const html = await page.content();

        // Determine output path
        let filename;
        if (route === '/') {
          filename = path.join(distDir, 'index.html');
        } else {
          filename = path.join(distDir, `${route}/index.html`);
        }

        // Ensure directory exists
        ensureDirectoryExists(filename);

        // Write HTML to file
        fs.writeFileSync(filename, html, 'utf-8');

        console.log(`✅ Rendered: ${route} → ${filename}`);
        successful++;

        await page.close();
      } catch (error) {
        console.error(`❌ Error rendering ${route}:`, error.message);
        failed++;
      }
    }

    await browser.close();

    console.log(
      `\n✨ Pre-render complete: ${successful} routes generated${failed > 0 ? `, ${failed} failed` : ''}\n`
    );

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error during pre-render:', error);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

prerender();
