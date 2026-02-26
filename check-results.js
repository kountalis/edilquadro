import fs from 'fs';

console.log('📊 TESTING AVIF QUALITY 75:\n');

const homeQual75 = JSON.parse(fs.readFileSync('lh-home-qual75.json', 'utf8'));
const portfolioQual75 = JSON.parse(fs.readFileSync('lh-portfolio-qual75.json', 'utf8'));

const homePerf = Math.round(homeQual75.categories.performance.score * 100);
const portfolioPerf = Math.round(portfolioQual75.categories.performance.score * 100);

console.log(`HOME PAGE: ${homePerf}/100`);
console.log(`  LCP: ${(homeQual75.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2)}s`);
console.log(`  FCP: ${(homeQual75.audits['first-contentful-paint'].numericValue / 1000).toFixed(2)}s`);

console.log(`\nPORTFOLIO PAGE: ${portfolioPerf}/100`);
console.log(`  LCP: ${(portfolioQual75.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2)}s`);
console.log(`  FCP: ${(portfolioQual75.audits['first-contentful-paint'].numericValue / 1000).toFixed(2)}s`);

console.log('\n\n📈 IMPROVEMENTS NEEDED:');
console.log(`Home: Need ${90 - homePerf} more points to reach target 90`);
console.log(`Portfolio: Need ${90 - portfolioPerf} more points to reach target 90`);
