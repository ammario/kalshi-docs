---
url: https://docs.kalshi.com/fix
lastmod: 2025-10-04T21:26:55.664Z
---
# FIX API Overview

> Financial Information eXchange (FIX) protocol implementation for Kalshi

# Kalshi FIX API Specifications

<Note>
  **Version**: 1.0.13
  **Last Updated**: 2025-10-01
</Note>

## Introduction

FIX (Financial Information eXchange) is a standard protocol that can be used to enter orders, submit cancel requests, and receive fills. Kalshi's implementation follows the standards as closely as possible, with any divergences highlighted in this documentation.

Please contact [institutional@kalshi.com](mailto:institutional@kalshi.com) to inquire about FIX access.

## Key Features

<CardGroup cols={2}>
  <Card title="Session Management" icon="handshake" href="/fix/session-management">
    Logon, logout, heartbeat, and session control messages
  </Card>

  <Card title="Order Entry" icon="cart-shopping" href="/fix/order-entry">
    Submit, modify, and cancel orders through standard FIX messages
  </Card>

  <Card title="Market Settlement" icon="chart-line" href="/fix/market-settlement">
    Market settlement and payout updates
  </Card>

  <Card title="RFQ Support" icon="comments-dollar" href="/fix/rfq-messages">
    Request for Quote functionality for market makers
  </Card>

  <Card title="Drop Copy" icon="copy" href="/fix/drop-copy">
    Separate session for order event recovery
  </Card>

  <Card title="Order Groups" icon="layer-group" href="/fix/order-groups">
    Automatic order cancellation with contracts limits
  </Card>
</CardGroup>

## Getting Started

<Steps>
  <Step title="Generate RSA Keys">
    Create a 2048 bit RSA PKCS#8 key pair for authentication
  </Step>

  <Step title="Create API Key">
    Upload your public key to the Kalshi platform to receive your FIX API key
  </Step>

  <Step title="Configure Connection">
    Set up your FIX client with the appropriate endpoints and credentials
  </Step>

  <Step title="Start Trading">
    Send a Logon message and begin submitting orders
  </Step>
</Steps>

## Support

For technical support or questions about the FIX API, please contact the Kalshi trading support team.
