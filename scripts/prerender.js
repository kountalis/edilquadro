#!/usr/bin/env node
/**
 * Pre-render script for static site generation
 * Generates static HTML files for each route with full content and metadata
 * This enables proper indexing on hosting platforms that don't support Node.js (like Tophost)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');

// Routes to pre-render with their metadata
const routes = [
  {
    path: '/',
    filename: 'index.html',
    lang: 'it'
  },
  {
    path: '/en',
    filename: 'en/index.html',
    lang: 'en'
  },
  {
    path: '/servizi',
    filename: 'servizi/index.html',
    lang: 'it'
  },
  {
    path: '/en/services',
    filename: 'en/services/index.html',
    lang: 'en'
  },
  {
    path: '/portfolio',
    filename: 'portfolio/index.html',
    lang: 'it'
  },
  {
    path: '/en/portfolio',
    filename: 'en/portfolio/index.html',
    lang: 'en'
  },
  {
    path: '/contatti',
    filename: 'contatti/index.html',
    lang: 'it'
  },
  {
    path: '/en/contact',
    filename: 'en/contact/index.html',
    lang: 'en'
  },
  {
    path: '/privacy',
    filename: 'privacy/index.html',
    lang: 'it'
  },
  {
    path: '/en/privacy',
    filename: 'en/privacy/index.html',
    lang: 'en'
  },
  {
    path: '/cookie-policy',
    filename: 'cookie-policy/index.html',
    lang: 'it'
  },
  {
    path: '/en/cookie-policy',
    filename: 'en/cookie-policy/index.html',
    lang: 'en'
  },
  // Building Services pages
  {
    path: '/servizi/casa',
    filename: 'servizi/casa/index.html',
    lang: 'it'
  },
  {
    path: '/en/services/home',
    filename: 'en/services/home/index.html',
    lang: 'en'
  },
  {
    path: '/servizi/commerciale',
    filename: 'servizi/commerciale/index.html',
    lang: 'it'
  },
  {
    path: '/en/services/commercial',
    filename: 'en/services/commercial/index.html',
    lang: 'en'
  },
  {
    path: '/servizi/edifici',
    filename: 'servizi/edifici/index.html',
    lang: 'it'
  },
  {
    path: '/en/services/buildings',
    filename: 'en/services/buildings/index.html',
    lang: 'en'
  }
];

/**
 * Create directory structure recursively
 */
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Generate static HTML by reading and modifying the template
 */
function generateStaticHTML(route) {
  try {
    const templatePath = path.resolve(distDir, 'index.html');
    let html = fs.readFileSync(templatePath, 'utf-8');

    // Add data attribute to help client-side router know the initial route
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root" data-initial-route="${route.path}" data-lang="${route.lang}"></div>`
    );

    // Generate the full file path
    const fullPath = path.resolve(distDir, route.filename);

    // Ensure directory exists
    ensureDirectoryExists(fullPath);

    // Write the file
    fs.writeFileSync(fullPath, html, 'utf-8');

    console.log(`✓ Pre-rendered: ${route.path} → ${route.filename}`);
    return true;
  } catch (error) {
    console.error(`✗ Error pre-rendering ${route.path}:`, error.message);
    return false;
  }
}

/**
 * Main pre-render function
 */
async function prerender() {
  console.log('\n📄 Starting pre-render process...\n');

  // Check if dist exists
  if (!fs.existsSync(distDir)) {
    console.error(`✗ dist directory not found. Please run 'npm run build' first.`);
    process.exit(1);
  }

  let successful = 0;
  let failed = 0;

  for (const route of routes) {
    if (generateStaticHTML(route)) {
      successful++;
    } else {
      failed++;
    }
  }

  console.log(`\n✓ Pre-render complete: ${successful} routes generated${failed > 0 ? `, ${failed} failed` : ''}\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

// Run pre-render
prerender().catch((error) => {
  console.error('Fatal error during pre-render:', error);
  process.exit(1);
});
