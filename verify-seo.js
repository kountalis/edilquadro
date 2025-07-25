import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying SEO improvements...\n');

// Check if dist/index.html exists and has SEO improvements
const indexPath = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  
  const checks = [
    {
      name: 'Structured Data (JSON-LD)',
      pattern: /"@context": "https:\/\/schema.org"/,
      found: content.includes('"@context": "https://schema.org"')
    },
    {
      name: 'LocalBusiness Schema',
      pattern: /"@type": "LocalBusiness"/,
      found: content.includes('"@type": "LocalBusiness"')
    },
    {
      name: 'Canonical URL',
      pattern: /<link rel="canonical"/,
      found: content.includes('<link rel="canonical"')
    },
    {
      name: 'Geo-targeting meta tags',
      pattern: /geo\.region.*IT-RM/,
      found: content.includes('geo.region') && content.includes('IT-RM')
    },
    {
      name: 'Open Graph tags',
      pattern: /og:title.*og:description/,
      found: content.includes('og:title') && content.includes('og:description')
    },
    {
      name: 'Twitter Card tags',
      pattern: /twitter:card.*twitter:title/,
      found: content.includes('twitter:card') && content.includes('twitter:title')
    },
    {
      name: 'Google Analytics placeholder (needs real ID)',
      pattern: /G-XXXXXXXXXX/,
      found: content.includes('G-XXXXXXXXXX')
    },
    {
      name: 'Search Console placeholder (needs real code)',
      pattern: /YOUR_SEARCH_CONSOLE_VERIFICATION_CODE/,
      found: content.includes('YOUR_SEARCH_CONSOLE_VERIFICATION_CODE')
    }
  ];

  console.log('📄 SEO Elements Check:');
  checks.forEach(check => {
    const status = check.found ? '✅' : '❌';
    console.log(`${status} ${check.name}`);
  });
} else {
  console.log('❌ dist/index.html not found. Run "npm run build" first.');
}

// Check sitemap
const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const hasCurrentDate = sitemapContent.includes('2025-01-15');
  console.log(`\n🗺️  Sitemap: ${hasCurrentDate ? '✅' : '❌'} Updated with current date`);
} else {
  console.log('\n❌ sitemap.xml not found in dist folder');
}

// Check robots.txt
const robotsPath = path.join(__dirname, 'dist', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  const hasSitemap = robotsContent.includes('sitemap.xml');
  console.log(`📋 Robots.txt: ${hasSitemap ? '✅' : '❌'} References sitemap`);
} else {
  console.log('\n❌ robots.txt not found in dist folder');
}

console.log('\n📋 Next Steps:');
console.log('1. Set up Google Analytics (replace G-XXXXXXXXXX)');
console.log('2. Set up Google Search Console (replace verification code)');
console.log('3. Submit sitemap to search engines');
console.log('4. Wait 1-2 weeks for indexing');

console.log('\n📖 See SEO_SETUP_GUIDE.md for detailed instructions'); 