---
url: https://docs.kalshi.com/websockets/orderbook-updates
lastmod: 2026-02-12T23:21:38.541Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Orderbook Updates

> Real-time orderbook price level changes. Provides incremental updates to maintain a live orderbook.

**Requirements:**
- Authentication required
- Market specification required:
  - Use `market_ticker` (string) for a single market
  - Use `market_tickers` (array of strings) for multiple markets
  - `market_id`/`market_ids` are not supported for this channel
- Sends `orderbook_snapshot` first, then incremental `orderbook_delta` updates

**Use case:** Building and maintaining a real-time orderbook


