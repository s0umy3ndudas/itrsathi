/**
 * Generate sitemap.xml for the website
 * Run with: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.itrsathi.in';

// Static pages
const staticPages = [
  '',
  '/blogs',
  '/pricing',
  '/contact',
  '/docs',
  '/privacy',
  '/terms'
];

// Generate sitemap XML
function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap to public directory
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

// Generate robots.txt
function generateRobots() {
  const robots = `User-agent: *
Allow: /

# Block access to admin and private areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /dashboard/

# Allow search engines to crawl important pages
Allow: /
Allow: /blogs/
Allow: /pricing
Allow: /contact
Allow: /docs

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;

  const publicDir = path.join(__dirname, '..', 'public');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
  console.log('Robots.txt generated successfully!');
}

if (require.main === module) {
  generateSitemap();
  generateRobots();
}

module.exports = { generateSitemap, generateRobots };