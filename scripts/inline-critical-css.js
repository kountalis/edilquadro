import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Inline critical CSS into all HTML files
async function inlineCriticalCSS() {
  try {
    console.log('📦 Inlining critical CSS...');
    
    // Find the main CSS file in dist/assets
    const cssFiles = globSync('dist/assets/index-*.css');
    
    if (cssFiles.length === 0) {
      console.warn('⚠️ No CSS files found in dist/assets');
      return;
    }
    
    const cssFile = cssFiles[0];
    const cssContent = fs.readFileSync(cssFile, 'utf-8');
    
    // Find all HTML files in dist
    const htmlFiles = globSync('dist/**/*.html');
    
    htmlFiles.forEach(htmlFile => {
      let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
      
      // Replace the CSS link with inline style
      // Find </head> and insert <style> before it
      const styleTag = `<style>${cssContent}</style>`;
      htmlContent = htmlContent.replace('</head>', `${styleTag}</head>`);
      
      // Remove the external CSS link
      htmlContent = htmlContent.replace(/<link[^>]*href="[^"]*index-[^"]*\.css"[^>]*>/g, '');
      
      fs.writeFileSync(htmlFile, htmlContent, 'utf-8');
      console.log(`✓ Inlined CSS in ${path.basename(htmlFile)}`);
    });
    
    console.log('✓ Critical CSS inlining complete');
  } catch (error) {
    console.error('✗ Error inlining critical CSS:', error);
    process.exit(1);
  }
}

inlineCriticalCSS();
