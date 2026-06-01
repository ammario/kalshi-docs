---
url: https://docs.kalshi.com/welcome
lastmod: 2026-05-31T16:40:12.397Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Welcome to the Kalshi API documentation

<div className="relative w-full flex items-center justify-center" style={{ height: '24rem', overflow: 'hidden', marginTop: '-1px'}}>
  <div id="background-div" class="absolute inset-0 dark:hidden" style={{backgroundImage: "url('https://mintlify-assets.b-cdn.net/kalshi-bg.svg')", backgroundSize: '100%', backgroundPosition: 'center', height: "24rem"}} />

  <div id="background-div" class="absolute inset-0 hidden dark:block" style={{backgroundImage: "url('https://mintlify-assets.b-cdn.net/kalshi-dark-bg.svg')", backgroundSize: '100%', backgroundPosition: 'center', height: "24rem"}} />

  <div style={{ position: 'absolute', textAlign: 'center', padding: '0 1rem', width: '45%'}}>
    <h1
      className="text-black dark:text-white"
      style={{
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '36px',
   lineHeight: '44px',
   letterSpacing: '-0.7px',
   margin: '0',
  }}
    >
      Welcome to Kalshi's API Documentation
    </h1>

    <p
      className="prose text-black dark:prose-invert dark:text-white "
      style={{
    marginTop: '1rem',
   fontWeight: '400',
   fontSize: '18px',
   opacity: '0.6',
  }}
    >
      This documentation covers the Kalshi Exchange API for real-time market data and trade execution
    </p>

    <p
      style={{
    marginTop: '0.75rem',
   fontWeight: '400',
   fontSize: '14px',
   whiteSpace: 'nowrap',
  }}
    >
      <span className="text-black dark:text-white" style={{ opacity: '0.6' }}>By continuing to use or access Kalshi's API, you are agreeing to be bound to our </span><a href="https://kalshi.com/developer-agreement" style={{ color: '#09C285', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">Developer Agreement</a>
    </p>
  </div>
</div>

<div
  style={{
marginTop: '4rem',
marginBottom: '8rem',
maxWidth: '70rem',
marginLeft: 'auto',
marginRight: 'auto',
paddingLeft: '1.25rem',
paddingRight: '1.25rem'
}}
>
  ## The APIs

  <CardGroup cols={2}>
    <Card title="Predictions APIs" icon="chart-line" href="/api-reference">
      Event-contract markets — REST, WebSocket, and FIX.
    </Card>

    <Card title="Perps APIs" icon="chart-candlestick" href="/margin">
      Perpetual futures (margin) — REST, WebSocket, and FIX.
    </Card>
  </CardGroup>

  ## Get started

  <CardGroup cols={3}>
    <Card title="Making Your First Request" icon="rocket" href="/getting_started/making_your_first_request">
      Make your first API call and start trading on Kalshi.
    </Card>

    <Card title="Demo Environment" icon="atom" href="/getting_started/demo_env">
      Build and test safely against the demo environment.
    </Card>

    <Card title="API Keys" icon="key" href="/getting_started/api_keys">
      Generate and manage your API credentials.
    </Card>
  </CardGroup>

  ## Reference

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

  ## Specifications

  Download the raw spec files for code generation or building your own client:

  * **Predictions** — [`openapi.yaml`](/openapi.yaml) (REST) · [`asyncapi.yaml`](/asyncapi.yaml) (WebSocket)
  * **Perps** — [`perps_openapi.yaml`](/perps_openapi.yaml) (REST) · [`perps_asyncapi.yaml`](/perps_asyncapi.yaml) (WebSocket)

  New to prediction markets? Visit [Kalshi Academy](https://help.kalshi.com/).
</div>
