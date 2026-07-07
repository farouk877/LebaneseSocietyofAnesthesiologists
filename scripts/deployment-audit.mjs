import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const basePath = normalizeBasePath(process.env.BASE_PATH || '/');
const requiredRoutes = [
  'index.html',
  'guidelines/index.html',
  'events/index.html',
  'university-resources/index.html',
  'articles/index.html',
  'articles/monthly-article-placeholder/index.html',
  'sitemap-index.xml'
];
const failures = [];
const warnings = [];

const readText = (path) => readFileSync(path, 'utf8');

if (!existsSync(distDir)) {
  failures.push('Missing dist/. Run npm run build before npm run audit:deployment.');
} else {
  for (const route of requiredRoutes) {
    const filePath = join(distDir, route);
    if (!existsSync(filePath)) {
      failures.push(`Missing built route: ${route}`);
    }
  }

  const htmlFiles = collectFiles(distDir).filter((file) => extname(file) === '.html');
  const builtPaths = new Set(htmlFiles.map((file) => toPublicPath(file)));
  const assetPaths = new Set(collectFiles(distDir).map((file) => toPublicPath(file)));

  for (const file of htmlFiles) {
    const html = readText(file);
    const rel = relative(distDir, file);

    for (const href of extractAttributeValues(html, 'href')) {
      auditUrl(href, rel, builtPaths, assetPaths);
    }

    for (const src of extractAttributeValues(html, 'src')) {
      auditUrl(src, rel, builtPaths, assetPaths);
    }
  }

  const homeHtmlPath = join(distDir, 'index.html');
  if (existsSync(homeHtmlPath)) {
    const homeHtml = readText(homeHtmlPath);
    if (homeHtml.includes('https://example.org')) {
      warnings.push('SEO canonical/site URL is still https://example.org. Set SITE_URL before production deployment.');
    }
    if (homeHtml.includes('Development placeholder') || homeHtml.includes('Placeholder copy')) {
      warnings.push('Homepage still contains development placeholder copy.');
    }
    if (!homeHtml.includes('data-endpoint="https://script.google.com/')) {
      warnings.push('Mailing-list form does not appear to include a deployed Apps Script endpoint.');
    }
  }
}

if (warnings.length > 0) {
  console.warn('\nDeployment audit warnings:');
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.error('\nDeployment audit failures:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Deployment audit passed.');

function collectFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}

function extractAttributeValues(html, attribute) {
  const values = [];
  const pattern = new RegExp(`${attribute}=["']([^"']+)["']`, 'g');
  let match;

  while ((match = pattern.exec(html)) !== null) {
    values.push(match[1]);
  }

  return values;
}

function auditUrl(url, file, builtPaths, assetPaths) {
  if (
    !url ||
    url.startsWith('#') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('data:')
  ) {
    return;
  }

  if (!url.startsWith('/')) {
    warnings.push(`Relative URL in ${file}: ${url}`);
    return;
  }

  const path = url.split('#')[0].split('?')[0];
  if (!path) {
    return;
  }

  const pathWithoutBase = stripBasePath(path);
  const normalizedPath = pathWithoutBase.endsWith('/') ? `${pathWithoutBase}index.html` : pathWithoutBase;
  if (!builtPaths.has(normalizedPath) && !assetPaths.has(normalizedPath)) {
    failures.push(`Broken internal URL in ${file}: ${url}`);
  }
}

function toPublicPath(file) {
  const path = relative(distDir, file).replaceAll('\\', '/');
  return `/${path}`;
}

function normalizeBasePath(path) {
  if (!path || path === '/') {
    return '/';
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

function stripBasePath(path) {
  if (basePath === '/') {
    return path;
  }

  if (path === basePath) {
    return '/';
  }

  if (path.startsWith(`${basePath}/`)) {
    return path.slice(basePath.length);
  }

  return path;
}
