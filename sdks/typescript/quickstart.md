---
url: https://docs.kalshi.com/sdks/typescript/quickstart
lastmod: 2026-01-27T00:10:37.185Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# TypeScript SDK Quick Start

> Get started with the Kalshi TypeScript SDK

## Installation

```bash  theme={null}
npm install kalshi-typescript
```

## Quick Start

```typescript  theme={null}
import { Configuration, PortfolioApi } from 'kalshi-typescript';

// Configure the SDK
const config = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: 'path/to/your/private-key.pem', // or use privateKeyPem
    basePath: 'https://api.elections.kalshi.com/trade-api/v2'
});

// Create API instance
const portfolioApi = new PortfolioApi(config);

// Make API calls
const balance = await portfolioApi.getBalance();
console.log(`Balance: $${(balance.data.balance || 0) / 100}`);
```

## Authentication

The SDK uses RSA-PSS signing for authentication. You can provide your private key either as a file path or as a PEM string:

```typescript  theme={null}
// Using file path
const config = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPath: 'path/to/private-key.pem',
    basePath: 'https://api.elections.kalshi.com/trade-api/v2'
});

// Using PEM string
const config = new Configuration({
    apiKey: 'your-api-key-id',
    privateKeyPem: '-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----',
    basePath: 'https://api.elections.kalshi.com/trade-api/v2'
});
```

## Source Code

* NPM: [kalshi-typescript](https://www.npmjs.com/package/kalshi-typescript)
