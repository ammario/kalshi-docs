#!/usr/bin/env bun

/**
 * Download Kalshi documentation from their sitemap.
 * 
 * Usage:
 *   bun run update.ts
 *   # or with Node.js:
 *   npx tsx update.ts
 *   # or with Deno:
 *   deno run --allow-net --allow-write update.ts
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITEMAP_URL = 'https://docs.kalshi.com/sitemap.xml';
const ASYNCAPI_URL = 'https://docs.kalshi.com/asyncapi.yaml';
const OUTPUT_DIR = __dirname; // Save docs to repo root

interface SitemapUrl {
  loc: string;
  lastmod?: string;
}

/**
 * Parse XML sitemap and extract URLs
 */
function parseSitemap(xml: string): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  
  // Match all <url> blocks
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let urlMatch;
  
  while ((urlMatch = urlRegex.exec(xml)) !== null) {
    const urlBlock = urlMatch[1];
    
    // Extract <loc> tag
    const locMatch = /<loc>(.*?)<\/loc>/.exec(urlBlock);
    if (!locMatch) continue;
    
    const loc = locMatch[1];
    
    // Extract optional <lastmod> tag
    const lastmodMatch = /<lastmod>(.*?)<\/lastmod>/.exec(urlBlock);
    const lastmod = lastmodMatch ? lastmodMatch[1] : undefined;
    
    urls.push({ loc, lastmod });
  }
  
  return urls;
}

/**
 * Convert URL to filesystem path relative to OUTPUT_DIR
 * Example: https://docs.kalshi.com/api-reference/communications/get-quote
 *   -> api-reference/communications/get-quote.md
 * Example: https://docs.kalshi.com/getting-started/intro
 *   -> getting-started/intro.md
 */
function urlToPath(url: string): string {
  // Remove protocol and domain
  let path = url.replace(/^https?:\/\/[^/]+/, '');
  
  // Remove leading slash
  path = path.replace(/^\//, '');
  
  // Remove trailing slash
  path = path.replace(/\/$/, '');
  
  // Skip root/homepage
  if (!path) {
    return '';
  }
  
  // Add .md extension if not present
  if (!path.endsWith('.md')) {
    path += '.md';
  }
  
  return path;
}

/**
 * Download markdown content from URL
 */
async function downloadMarkdown(url: string): Promise<string | null> {
  const mdUrl = url.endsWith('.md') ? url : `${url}.md`;
  
  try {
    console.log(`  Downloading: ${mdUrl}`);
    const response = await fetch(mdUrl);
    
    if (!response.ok) {
      console.error(`  ❌ Failed to download ${mdUrl}: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const content = await response.text();
    console.log(`  ✓ Downloaded ${content.length} bytes`);
    return content;
  } catch (error) {
    console.error(`  ❌ Error downloading ${mdUrl}:`, error);
    return null;
  }
}

/**
 * Add YAML frontmatter to markdown content
 */
function addFrontmatter(content: string, url: string, lastmod?: string): string {
  const frontmatter = [
    '---',
    `url: ${url}`,
  ];
  
  if (lastmod) {
    frontmatter.push(`lastmod: ${lastmod}`);
  }
  
  frontmatter.push('---', '');
  
  return frontmatter.join('\n') + content;
}

/**
 * Save markdown content to file with frontmatter
 */
async function saveMarkdown(relativePath: string, content: string, url: string, lastmod?: string): Promise<void> {
  const filepath = join(OUTPUT_DIR, relativePath);
  
  // Ensure directory exists
  await mkdir(dirname(filepath), { recursive: true });
  
  // Add frontmatter to content
  const contentWithFrontmatter = addFrontmatter(content, url, lastmod);
  
  await writeFile(filepath, contentWithFrontmatter, 'utf-8');
  console.log(`  ✓ Saved to ${relativePath}`);
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Downloading Kalshi API documentation...\n');
  
  // Step 1: Download sitemap
  console.log(`📥 Fetching sitemap: ${SITEMAP_URL}`);
  const sitemapResponse = await fetch(SITEMAP_URL);
  
  if (!sitemapResponse.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapResponse.status} ${sitemapResponse.statusText}`);
  }
  
  const sitemapXml = await sitemapResponse.text();
  console.log(`✓ Fetched sitemap (${sitemapXml.length} bytes)\n`);
  
  // Step 2: Parse sitemap
  console.log('📋 Parsing sitemap...');
  const allUrls = parseSitemap(sitemapXml);
  console.log(`✓ Found ${allUrls.length} total URLs\n`);
  
  // Step 3: Filter for documentation URLs (exclude non-doc pages)
  console.log('🔍 Filtering for documentation URLs...');
  const docUrls = allUrls.filter(({ loc }) => {
    // Skip the homepage
    if (loc === 'https://docs.kalshi.com' || loc === 'https://docs.kalshi.com/') {
      return false;
    }
    // Include all other docs.kalshi.com URLs
    return loc.startsWith('https://docs.kalshi.com/');
  });
  console.log(`✓ Found ${docUrls.length} documentation URLs\n`);
  
  if (docUrls.length === 0) {
    console.log('⚠️  No documentation URLs found in sitemap');
    return;
  }
  
  // Step 4: Analyze sections
  const sections = new Map<string, number>();
  for (const { loc } of docUrls) {
    const path = urlToPath(loc);
    if (path) {
      const section = path.split('/')[0];
      sections.set(section, (sections.get(section) || 0) + 1);
    }
  }
  
  console.log('📂 Sections found:');
  for (const [section, count] of Array.from(sections.entries()).sort()) {
    console.log(`  ${section}: ${count} pages`);
  }
  console.log();
  
  // Step 5: Download and save each document
  console.log(`📥 Downloading ${docUrls.length} documents...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const { loc, lastmod } of docUrls) {
    const relativePath = urlToPath(loc);
    
    // Skip if we couldn't generate a path (e.g., homepage)
    if (!relativePath) {
      continue;
    }
    
    console.log(`📄 Processing: ${loc}`);
    if (lastmod) {
      console.log(`  Last modified: ${lastmod}`);
    }
    
    const content = await downloadMarkdown(loc);
    
    if (content) {
      await saveMarkdown(relativePath, content, loc, lastmod);
      successCount++;
    } else {
      failCount++;
    }
    
    console.log(); // Empty line for readability
  }
  
  // Step 6: Download AsyncAPI spec
  console.log('📥 Downloading AsyncAPI specification...\n');
  let asyncApiSuccess = false;
  try {
    console.log(`📄 Fetching: ${ASYNCAPI_URL}`);
    const asyncApiResponse = await fetch(ASYNCAPI_URL);
    
    if (asyncApiResponse.ok) {
      const asyncApiContent = await asyncApiResponse.text();
      const asyncApiPath = join(OUTPUT_DIR, 'asyncapi.yaml');
      await writeFile(asyncApiPath, asyncApiContent, 'utf-8');
      console.log(`  ✓ Saved AsyncAPI spec (${asyncApiContent.length} bytes) to asyncapi.yaml\n`);
      asyncApiSuccess = true;
    } else {
      console.error(`  ❌ Failed to download AsyncAPI spec: ${asyncApiResponse.status} ${asyncApiResponse.statusText}\n`);
    }
  } catch (error) {
    console.error(`  ❌ Error downloading AsyncAPI spec:`, error, '\n');
  }

  // Summary
  console.log('📊 Summary:');
  console.log(`  ✓ Successfully downloaded: ${successCount} docs${asyncApiSuccess ? ' + AsyncAPI spec' : ''}`);
  console.log(`  ❌ Failed: ${failCount}${!asyncApiSuccess ? ' (+ AsyncAPI spec)' : ''}`);
  console.log(`  📁 Output directory: ${OUTPUT_DIR}`);
  console.log('\n✨ Done!');
}

// Run main function
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
