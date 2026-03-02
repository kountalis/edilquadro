#!/usr/bin/env node
/**
 * Pre-render script for static site generation
 * Generates static HTML files for each route with full content and metadata
 * This enables proper indexing on hosting platforms that don't support Node.js (like Tophost)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PAGE_METADATA from '../METADATI_PAGINE.js';

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
function generateStaticHTML(route, originalTemplate) {
  try {
    // Always use the ORIGINAL unmodified template, not the potentially modified dist/index.html
    let html = originalTemplate;

    // Get metadata for this route
    const metadata = PAGE_METADATA[route.path];
    if (!metadata) {
      console.warn(`⚠️  No metadata found for ${route.path}, using template defaults`);
    } else {
      // Set correct page language at document level
      html = html.replace(
        /<html lang="[^"]+">/,
        `<html lang="${metadata.lang}">`
      );

      // Replace page-specific metadata in the HTML
      // Title: <title>...</title>
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${metadata.title}</title>`
      );

      // Meta description: <meta name="description" content="...">
      html = html.replace(
        /<meta name="description" content="[^"]*">/,
        `<meta name="description" content="${metadata.description}">`
      );

      // Canonical URL: <link rel="canonical" href="..."> (if exists, or add it)
      if (html.includes('<link rel="canonical"')) {
        html = html.replace(
          /<link rel="canonical" href="[^"]*">/,
          `<link rel="canonical" href="${metadata.canonical}">`
        );
      } else {
        // Add canonical tag in <head>
        html = html.replace(
          /<\/head>/,
          `    <link rel="canonical" href="${metadata.canonical}">\n  </head>`
        );
      }

      // OG Image (for social sharing)
      if (html.includes('property="og:image"')) {
        html = html.replace(
          /property="og:image" content="[^"]*"/,
          `property="og:image" content="${metadata.ogImage}"`
        );
      } else {
        html = html.replace(
          /<\/head>/,
          `    <meta property="og:image" content="${metadata.ogImage}">\n  </head>`
        );
      }
    }

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

  // Read the original template ONCE before any modifications
  const templatePath = path.resolve(distDir, 'index.html');
  const originalTemplate = fs.readFileSync(templatePath, 'utf-8');

  let successful = 0;
  let failed = 0;

  for (const route of routes) {
    if (generateStaticHTML(route, originalTemplate)) {
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
