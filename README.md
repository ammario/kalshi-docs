# Kalshi Documentation Archive

An automated repository that downloads and archives all Kalshi documentation from their sitemap. Updated nightly via GitHub Actions using Bun.

## Features

- 📥 Automatically fetches all documentation from Kalshi's sitemap
- 📁 Organizes files by section (api-reference, getting-started, guides, etc.)
- 🤖 Nightly automated updates via GitHub Actions
- 🥟 Powered by Bun for blazing-fast execution
- ✨ Also works with Node.js or Deno
- 📝 Full version history via Git

## Installation

### With Bun (recommended)

```bash
bun install
```

### With npm/pnpm/yarn

```bash
npm install
# or
pnpm install
# or
yarn install
```

### With Deno

No installation needed! Deno includes all required APIs.

## Usage

### Run with Bun (recommended)

```bash
bun run update
# or
bun run update.ts
```

### Run with Node.js (via tsx)

```bash
npm run update:node
# or
npx tsx update.ts
```

### Run with Deno

```bash
npm run update:deno
# or
deno run --allow-net --allow-write update.ts
```

## Automated Updates

This repository is automatically updated every night at 2 AM UTC via GitHub Actions. You can also manually trigger an update:

1. Go to the **Actions** tab
2. Select **Update Kalshi Documentation**
3. Click **Run workflow**

The workflow will:
- Download the latest documentation
- Commit any changes
- Push updates to the repository

## Documentation Structure

The script downloads all documentation organized by section:

```
kalshi-docs/
├── api-reference/
│   ├── communications/
│   │   ├── get-quote.md
│   │   └── ...
│   ├── markets/
│   │   ├── get-market.md
│   │   └── ...
│   └── ...
├── getting-started/
│   ├── intro.md
│   └── ...
├── guides/
│   ├── authentication.md
│   └── ...
└── ...
```

All documentation is committed to the repository, allowing you to:
- Browse documentation directly on GitHub
- Track changes over time
- Clone for offline access
- Reference specific versions via commits

## How It Works

1. **Fetch Sitemap**: Downloads the XML sitemap from `https://docs.kalshi.com/sitemap.xml`
2. **Parse URLs**: Extracts all URLs from the sitemap
3. **Analyze Sections**: Groups URLs by documentation section
4. **Download**: Fetches each markdown file from the URLs
5. **Save**: Organizes files into a structured directory layout
6. **Commit**: (In GitHub Actions) Commits changes if documentation was updated

## Script Details

- **Input**: Kalshi's public sitemap XML
- **Output**: Markdown files organized by section
- **Error Handling**: Continues on individual file failures, reports summary at end
- **Incremental Updates**: Only downloads and saves files (doesn't delete existing ones)

## Requirements

- Bun 1.0+ (recommended) **OR**
- Node.js 18+ (for native fetch support) **OR**
- Deno 1.0+

## License

MIT
