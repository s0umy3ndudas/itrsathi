// Placeholder script for generating sitemap.xml
// This can be expanded to dynamically generate sitemaps for blog posts and other pages

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.itrsathi.in';

const staticPages = [
  '',
  '/blogs',
  '/privacy',
  '/terms',
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

if (require.main === module) {
  generateSitemap();
}

module.exports = generateSitemap;