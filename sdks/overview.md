---
url: https://docs.kalshi.com/sdks/overview
lastmod: 2025-10-07T23:32:04.294Z
---
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
  ```bash Python theme={null}
  pip install kalshi-python
  ```

  ```bash TypeScript theme={null}
  npm install kalshi-typescript
  ```
</CodeGroup>

## Authentication

All SDKs use the same authentication mechanism with API keys and RSA-PSS signing. You'll need:

1. An API key ID from your Kalshi account
2. A private key file for signing requests

See the quickstart guide for your chosen SDK for detailed setup instructions.
