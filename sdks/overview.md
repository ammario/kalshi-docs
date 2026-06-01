---
url: https://docs.kalshi.com/sdks/overview
lastmod: 2026-05-31T16:40:12.343Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Kalshi SDKs

> Official Python and TypeScript SDKs for the Kalshi API

Kalshi publishes Python and TypeScript SDKs to help you get started quickly.

<Warning>
  SDKs are updated periodically and may lag the API. Active traders should treat the REST [OpenAPI specification](https://docs.kalshi.com/openapi.yaml) and WebSocket [AsyncAPI specification](https://docs.kalshi.com/asyncapi.yaml) as the source of truth. For production, we recommend generating your own client from those specs — or integrating directly — for full control over your implementation.
</Warning>

## Packages

<CardGroup cols={2}>
  <Card title="Python (sync)" icon="python" href="https://pypi.org/project/kalshi_python_sync/">
    `pip install kalshi_python_sync`
  </Card>

  <Card title="Python (async)" icon="python" href="https://pypi.org/project/kalshi_python_async/">
    `pip install kalshi_python_async`
  </Card>

  <Card title="TypeScript" icon="js" href="https://www.npmjs.com/package/kalshi-typescript">
    `npm install kalshi-typescript`
  </Card>
</CardGroup>

<Note>
  The old `kalshi-python` package is deprecated — use `kalshi_python_sync` or `kalshi_python_async`.
</Note>

SDK releases track the [OpenAPI specification](https://docs.kalshi.com/openapi.yaml) and are generally published Tuesday–Wednesday each week, ahead of the corresponding API changes; check the package pages and the [API Changelog](/changelog) for updates. All SDKs authenticate with an API key and RSA-PSS request signing — see [API Keys](/getting_started/api_keys) for setup.
