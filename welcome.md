---
url: https://docs.kalshi.com/welcome
lastmod: 2026-06-25T16:39:29.738Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Welcome to the Kalshi API documentation

<div className="docs-home-hero">
  <div className="docs-home-hero-bg docs-home-hero-bg-light" />

  <div className="docs-home-hero-bg docs-home-hero-bg-dark" />

  <div className="docs-home-hero-content">
    <h1 className="docs-home-hero-title">
      Welcome to Kalshi's API Documentation
    </h1>

    <p className="docs-home-hero-subtitle">
      This documentation covers the Kalshi Exchange API for real-time market data and trade execution
    </p>

    <p className="docs-home-hero-agreement">
      <span>By continuing to use or access Kalshi's API, you are agreeing to be bound to our </span><a className="docs-home-hero-link" href="https://kalshi.com/developer-agreement" target="_blank" rel="noopener noreferrer">Developer Agreement</a>
    </p>
  </div>
</div>

<div className="docs-home-content">
  <h2 className="docs-home-section-title">The APIs</h2>

  <CardGroup cols={2}>
    <Card title="Predictions APIs" icon="chart-line" href="/api-reference">
      Event-contract markets: REST, WebSocket, and FIX.
    </Card>

    <Card title="Perps APIs" icon="chart-candlestick" href="/margin">
      Perpetual futures (margin): REST, WebSocket, and FIX.
    </Card>
  </CardGroup>

  <h2 className="docs-home-section-title">Get started</h2>

  <CardGroup cols={4}>
    <Card title="Making Your First Request" icon="rocket" href="/getting_started/making_your_first_request">
      Make your first API call and start trading on Kalshi.
    </Card>

    <Card title="Demo Environment" icon="atom" href="/getting_started/demo_env">
      Build and test safely against the demo environment.
    </Card>

    <Card title="API Keys" icon="key" href="/getting_started/api_keys">
      Generate and manage your API credentials.
    </Card>

    <Card title="Kalshi Academy" icon="graduation-cap" href="https://help.kalshi.com/">
      New to prediction markets? Explore educational resources and tutorials.
    </Card>
  </CardGroup>

  <h2 className="docs-home-section-title">Reference</h2>

  <CardGroup cols={3}>
    <Card title="Rate Limits" icon="gauge" href="/getting_started/rate_limits">
      Token budgets, tiers, and bursting.
    </Card>

    <Card title="Changelog" icon="list-tree" href="/changelog">
      Stay updated with the latest API changes.
    </Card>

    <Card title="Glossary" icon="book-open" href="/getting_started/terms">
      Key terms and concepts used across the exchange.
    </Card>
  </CardGroup>

  <h2 className="docs-home-section-title">Specifications</h2>

  <CardGroup cols={4}>
    <Card title="Predictions REST" icon="file-code" href="/openapi.yaml">
      Download `openapi.yaml` for event-contract REST API integration.
    </Card>

    <Card title="Predictions WebSocket" icon="file-code" href="/asyncapi.yaml">
      Download `asyncapi.yaml` for event-contract WebSocket integration.
    </Card>

    <Card title="Perps REST" icon="file-code" href="/perps_openapi.yaml">
      Download `perps_openapi.yaml` for perpetual futures REST API integration.
    </Card>

    <Card title="Perps WebSocket" icon="file-code" href="/perps_asyncapi.yaml">
      Download `perps_asyncapi.yaml` for perpetual futures WebSocket integration.
    </Card>
  </CardGroup>
</div>
