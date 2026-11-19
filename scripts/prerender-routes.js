import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { loadEnv } from 'vite';
import { projects } from '../src/data/projects.js';

const outputDirectory = resolve('dist');
const template = await readFile(join(outputDirectory, 'index.html'), 'utf8');
const pages = [
  {
    path: '/',
    title: 'Cybersecurity portfolio · Amaan Akbar Khojani',
    description:
      'Amaan Akbar Khojani is an MSc Sociotechnical Cybersecurity student with internship experience in vulnerability assessment, SOC alert triage, and digital forensics.',
  },
  {
    path: '/projects',
    title: 'Projects · Amaan Akbar Khojani',
    description:
      'Three résumé-documented projects by Amaan Akbar Khojani: a vendor risk assessment framework, secure file storage application, and railway reservation system.',
  },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    title: `${project.title} · Amaan Akbar Khojani`,
    description: project.summary,
  })),
  {
    path: '/blog',
    title: 'Blog · Amaan Akbar Khojani',
    description: 'A future home for writing by Amaan Akbar Khojani. No articles have been added yet.',
  },
  {
    path: '/contact',
    title: 'Contact · Amaan Akbar Khojani',
    description:
      'Contact Amaan Akbar Khojani in Ingolstadt, Germany about cybersecurity opportunities. Email: amankhojani592@gmail.com.',
  },
];

const configuredUrl = (process.env.VITE_SITE_URL || loadEnv('production', process.cwd(), 'VITE_').VITE_SITE_URL)?.trim();
const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/portfolio/' : '/';
let siteRoot = '';
if (configuredUrl) {
  const parsedUrl = new URL(configuredUrl);
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('VITE_SITE_URL must use HTTP or HTTPS.');
  }
  siteRoot = `${parsedUrl.origin}${parsedUrl.pathname.replace(/\/+$/, '')}`;
}

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function setMeta(html, attribute, key, content) {
  const safeKey = escapeRegExp(key);
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${safeKey}"\\s+content="[^"]*"\\s*\\/?>`,
    'i',
  );
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function renderPage(page) {
  const pageUrl = page.path !== null && siteRoot ? `${siteRoot}${page.path}` : '';
  const socialImage = siteRoot ? `${siteRoot}/og-image.png` : `${basePath}og-image.png`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:image', socialImage);
  html = setMeta(html, 'property', 'og:image:type', 'image/png');
  html = setMeta(html, 'property', 'og:image:width', '1200');
  html = setMeta(html, 'property', 'og:image:height', '630');
  html = setMeta(html, 'property', 'og:image:alt', 'Amaan Akbar Khojani · MSc Sociotechnical Cybersecurity');
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:image', socialImage);
  if (pageUrl) {
    html = setMeta(html, 'property', 'og:url', pageUrl);
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, '');
    html = html.replace('</head>', `    <link rel="canonical" href="${escapeAttribute(pageUrl)}" />\n  </head>`);
  }
  const structuredDataPattern = /<script id="person-structured-data" type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/i;
  const structuredDataMatch = html.match(structuredDataPattern);
  if (structuredDataMatch) {
    const person = JSON.parse(structuredDataMatch[1]);
    person.sameAs = [
      'https://github.com/threathawk05',
      'https://www.linkedin.com/in/amaan-khojani/',
    ];
    if (siteRoot) person.url = `${siteRoot}/`;
    html = html.replace(structuredDataPattern, `<script id="person-structured-data" type="application/ld+json">${JSON.stringify(person)}</script>`);
  }
  return html;
}

for (const page of pages) {
  const html = renderPage(page);
  const outputPath = page.path === '/'
    ? join(outputDirectory, 'index.html')
    : join(outputDirectory, page.path.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

const notFoundHtml = renderPage({
  path: null,
  title: 'Page not found · Amaan Akbar Khojani',
  description: 'The page you requested could not be found in Amaan Akbar Khojani’s portfolio.',
});
await writeFile(
  join(outputDirectory, '404.html'),
  setMeta(notFoundHtml, 'name', 'robots', 'noindex'),
);

if (siteRoot) {
  const sitemapPath = join(outputDirectory, 'sitemap.xml');
  const sitemap = await readFile(sitemapPath, 'utf8');
  await writeFile(
    sitemapPath,
    sitemap
      .replace(/<!-- TODO:[\s\S]*?-->\s*/, '')
      .replaceAll('https://TODO-SET-VITE_SITE_URL.example', siteRoot),
  );
  await writeFile(
    join(outputDirectory, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${siteRoot}/sitemap.xml\n`,
  );
}
