---
url: https://docs.kalshi.com/welcome
lastmod: 2026-01-22T00:35:03.527Z
---
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
  <CardGroup cols={4}>
    <Card title="Making Your First Request" icon="rocket" href="/getting_started/making_your_first_request">
      Make your first API call and start trading on Kalshi.
    </Card>

    <Card title="API Keys" icon="key" href="/getting_started/api_keys">
      Learn how to generate and manage your API credentials.
    </Card>

    <Card title="Demo Environment" icon="atom" href="/getting_started/demo_env">
      Test your integration in our safe demo environment.
    </Card>
  </CardGroup>

  <CardGroup cols={4}>
    <Card title="Rate Limits" icon="gauge" href="/getting_started/rate_limits">
      Understand API rate limits and best practices.
    </Card>

    <Card title="API Reference" icon="code" href="/api-reference">
      Explore our complete API documentation.
    </Card>

    <Card title="Changelog" icon="list-tree" href="/changelog">
      Stay updated with the latest API changes.
    </Card>
  </CardGroup>

  <CardGroup cols={4}>
    <Card title="Kalshi Glossary" icon="book-open" href="/getting_started/terms">
      Learn key terms and concepts used in the Kalshi exchange.
    </Card>

    <Card title="WebSocket API" icon="plug" href="/getting_started/quick_start_websockets">
      Learn about real-time data streaming via WebSockets.
    </Card>

    <Card title="Market Data" icon="chart-candlestick" href="/getting_started/quick_start_market_data">
      Quick start guide for accessing market data.
    </Card>
  </CardGroup>

  <br />

  <h2 className="text-white dark:text-white" style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'left' }}>Learn more about Kalshi</h2>

  <CardGroup cols={4}>
    <Card title="OpenAPI Specification" icon="file-code" href="https://docs.kalshi.com/openapi.yaml">
      Download the OpenAPI specification for API integration.
    </Card>

    <Card title="AsyncAPI Specification" icon="file-code" href="https://docs.kalshi.com/asyncapi.yaml">
      Download the AsyncAPI specification for WebSocket integration.
    </Card>

    <Card title="Trading Console" icon="square-terminal" href="https://kalshi.com">
      Access the Kalshi trading platform.
    </Card>

    <Card title="Kalshi Academy" icon="graduation-cap" href="https://help.kalshi.com/">
      Explore educational resources and tutorials.
    </Card>
  </CardGroup>
</div>


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt