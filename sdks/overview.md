---
url: https://docs.kalshi.com/sdks/overview
lastmod: 2026-01-27T23:10:51.908Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Kalshi SDKs

> Official SDKs for integrating with the Kalshi API

## Available SDKs

Kalshi provides official SDKs to make integration easier. Each SDK provides full access to the Kalshi API with language-specific conventions and best practices.

<CardGroup cols={2}>
  <Card title="Python" icon="python" href="/sdks/python/quickstart">
    Full-featured Python SDK with async support
  </Card>

  <Card title="TypeScript" icon="js" href="/sdks/typescript/quickstart">
    TypeScript/JavaScript SDK for Node.js and browsers
  </Card>
</CardGroup>

## Versioning and Updates

SDK versions are aligned with the [OpenAPI specification](https://docs.kalshi.com/openapi.yaml). New SDK releases are generally published on Tuesdays or Wednesdays each week, in advance of any corresponding API changes going live. However, release timing may vary and is not guaranteed. We recommend checking the SDK package repositories and the [API Changelog](/changelog) for the latest updates.

These SDKs are intended to help developers get started quickly with the Kalshi API. For production applications, we recommend generating your own client libraries from the [OpenAPI specification](https://docs.kalshi.com/openapi.yaml) or implementing direct API integration to ensure full control over your implementation.

## Features

All SDKs provide:

* Full API coverage for trading, market data, and portfolio management
* Authentication with RSA-PSS signing
* Automatic request signing and timestamp handling
* Type-safe models and responses
* Error handling and retries
* Comprehensive documentation and examples

## Installation

<CodeGroup>
  ```bash Python (sync) theme={null}
  pip install kalshi_python_sync
  ```

  ```bash Python (async) theme={null}
  pip install kalshi_python_async
  ```

  ```bash TypeScript theme={null}
  npm install kalshi-typescript
  ```
</CodeGroup>

<Note>
  The old `kalshi-python` package is deprecated. Please migrate to `kalshi-python-sync` or `kalshi-python-async`.
</Note>

## Authentication

All SDKs use the same authentication mechanism with API keys and RSA-PSS signing. You'll need:

1. An API key ID from your Kalshi account
2. A private key file for signing requests

See the quickstart guide for your chosen SDK for detailed setup instructions.
