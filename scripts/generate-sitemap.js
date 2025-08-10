import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Projects } from '../data/projects';
import { toSlug } from '../utils/slug';
const PRIORITIES = {
    DEFAULT_PRIORITY: 0.5,
    MEDIUM_PRIORITY: 0.8,
    HIGH_PRIORITY: 1.0,
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://milankatira.vercel.app';
const SITEMAP_MAX_URLS = 10000; // Max URLs per sitemap file
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
// Helper function to manually build the URL XML string
function buildUrlXml(item, baseUrl) {
    let xml = '<url>';
    xml += `<loc>${baseUrl}${item.url}</loc>`;
    if (item.lastModified) {
        const lastmodIso = typeof item.lastModified === 'string'
            ? new Date(item.lastModified).toISOString()
            : item.lastModified.toISOString();
        xml += `<lastmod>${lastmodIso}</lastmod>`;
    }
    if (item.changeFrequency) {
        xml += `<changefreq>${item.changeFrequency}</changefreq>`;
    }
    if (item.priority !== undefined) {
        xml += `<priority>${item.priority.toFixed(1)}</priority>`;
    }
    xml += '</url>';
    return xml;
}
function buildSitemapIndexEntryXml(item) {
    let xml = '<sitemap>';
    xml += `<loc>${item.url}</loc>`;
    if (item.lastModified) {
        xml += `<lastmod>${item.lastModified.toISOString()}</lastmod>`;
    }
    xml += '</sitemap>';
    return xml;
}
async function generateSitemaps() {
    const allUrls = [];
    // Add static pages
    const staticPages = [
        '', // Homepage
        '/blog',
        '/about-us',
        '/contact-us',
        '/testimonials',
    ];
    staticPages.forEach((route) => {
        allUrls.push({
            url: route,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: PRIORITIES.HIGH_PRIORITY,
        });
    });
    // Add blog posts
    try {
        const res = await fetch(`${BASE_URL}/api/blog`);
        const blogs = await res.json();
        blogs.forEach((blog) => {
            allUrls.push({
                url: `/blog/${blog.slug || toSlug(blog.title)}`, // Assuming slug exists or generate from title
                lastModified: new Date(), // You might want to use blog.updatedAt or blog.createdAt if available
                changeFrequency: 'weekly',
                priority: PRIORITIES.MEDIUM_PRIORITY,
            });
        });
    }
    catch (error) {
        console.error('Error fetching blog posts for sitemap:', error);
    }
    // Add project details
    Projects.forEach((project) => {
        allUrls.push({
            url: `/project-details/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: PRIORITIES.MEDIUM_PRIORITY,
        });
    });
    console.log(`Total URLs collected: ${allUrls.length}`);
    const numSitemaps = Math.ceil(allUrls.length / SITEMAP_MAX_URLS);
    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    const sitemapUrls = [];
    console.log(`Generating ${numSitemaps} sitemap file(s)...`);
    for (let i = 0; i < numSitemaps; i++) {
        const start = i * SITEMAP_MAX_URLS;
        const end = start + SITEMAP_MAX_URLS;
        const chunk = allUrls.slice(start, end);
        const sitemapFileName = `sitemap${i}.xml`;
        const sitemapFilePath = path.join(PUBLIC_DIR, sitemapFileName);
        const sitemapFileUrl = `${BASE_URL}/${sitemapFileName}`;
        let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xmlString += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        chunk.forEach((item) => {
            xmlString += buildUrlXml(item, BASE_URL);
        });
        xmlString += '</urlset>';
        fs.writeFileSync(sitemapFilePath, xmlString, 'utf8');
        console.log(`Generated ${sitemapFileName} with ${chunk.length} URLs.`);
        let indexLastModified = new Date();
        if (chunk.length > 0 && chunk[chunk.length - 1].lastModified) {
            const lastItemModified = chunk[chunk.length - 1].lastModified;
            indexLastModified =
                typeof lastItemModified === 'string'
                    ? new Date(lastItemModified)
                    : lastItemModified;
        }
        else {
            indexLastModified = new Date();
        }
        sitemapUrls.push({ url: sitemapFileUrl, lastModified: indexLastModified });
    }
    console.log('Generating sitemap index file...');
    const sitemapIndexFileName = 'sitemap.xml';
    const sitemapIndexFilePath = path.join(PUBLIC_DIR, sitemapIndexFileName);
    let indexXmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
    indexXmlString +=
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    sitemapUrls.forEach((item) => {
        indexXmlString += buildSitemapIndexEntryXml(item);
    });
    indexXmlString += '</sitemapindex>';
    fs.writeFileSync(sitemapIndexFilePath, indexXmlString, 'utf8');
    console.log(`Generated ${sitemapIndexFileName}.`);
}
generateSitemaps().catch((err) => {
    console.error('Error generating sitemaps:', err);
    process.exit(1);
});
