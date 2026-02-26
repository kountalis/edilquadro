import fs from 'fs';

function analyzeReport(data, title) {
  console.log(`\n=== ${title} ===`);
  Object.entries(data.categories).forEach(([key, val]) => {
    const score = Math.round(val.score * 100);
    console.log(`${key}: ${score}/100`);
  });

  // Extract core web vitals
  console.log('\n--- Core Web Vitals ---');
  console.log(`FCP: ${(data.audits['first-contentful-paint'].numericValue / 1000).toFixed(2)}s`);
  console.log(`LCP: ${(data.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2)}s`);
  console.log(`TBT: ${data.audits['total-blocking-time'].numericValue.toFixed(0)}ms`);
  console.log(`CLS: ${data.audits['cumulative-layout-shift'].numericValue.toFixed(3)}`);
  console.log(`Speed Index: ${(data.audits['speed-index'].numericValue / 1000).toFixed(2)}s`);
}

console.log('📊 AFTER REVERTING RESPONSIVE IMAGES:\n');

const homeData = JSON.parse(fs.readFileSync('lh-home-reverted.json', 'utf8'));
analyzeReport(homeData, 'HOME PAGE (REVERTED)');

const portfolioData = JSON.parse(fs.readFileSync('lh-portfolio-reverted.json', 'utf8'));
analyzeReport(portfolioData, 'PORTFOLIO PAGE (REVERTED)');

console.log('\n\n📊 PERFORMANCE COMPARISON:\n');
const homePrevData = JSON.parse(fs.readFileSync('lh-home-prod.json', 'utf8'));
console.log(`Home: 58 → ${Math.round(homeData.categories.performance.score * 100)}/100 (${((homeData.categories.performance.score - homePrevData.categories.performance.score) * 100).toFixed(0)})`);
console.log(`Home LCP: 6.59s → ${(homeData.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2)}s`);

console.log('');
const portfolioPrevData = JSON.parse(fs.readFileSync('lh-portfolio-prod.json', 'utf8'));
console.log(`Portfolio: 55 → ${Math.round(portfolioData.categories.performance.score * 100)}/100 (${((portfolioData.categories.performance.score - portfolioPrevData.categories.performance.score) * 100).toFixed(0)})`);
console.log(`Portfolio LCP: 9.50s → ${(portfolioData.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2)}s`);
