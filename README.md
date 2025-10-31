# Kalshi Documentation Archive

An automated repository that downloads and archives all Kalshi documentation from their sitemap as markdown.

Updated nightly via GitHub Actions.

## Usage

Add as a git submodule to your project for easy access to Kalshi documentation:

```bash
git submodule add https://github.com/ammario/kalshi-docs.git docs/kalshi
git submodule update --init --recursive
```

**Particularly useful for AI agents and tools** that need offline access to Kalshi API documentation with structured metadata (frontmatter includes URLs and last-modified timestamps).

## Documentation Structure

The script organizes documentation by section:

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

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the person who associated CC0 with this work has waived all copyright and related or neighboring rights to this work. This work is published from: United States.

This applies to the automation tooling and the downloaded documentation. Note that Kalshi's original documentation may be subject to their own terms.
