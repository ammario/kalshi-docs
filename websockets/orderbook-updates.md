---
url: https://docs.kalshi.com/websockets/orderbook-updates
lastmod: 2026-01-22T00:35:03.529Z
---
# Orderbook Updates

> Real-time orderbook price level changes. Provides incremental updates to maintain a live orderbook.

**Requirements:**
- Market specification required:
  - Use `market_ticker` (string) for a single market
  - Use `market_tickers` (array of strings) for multiple markets
- Sends `orderbook_snapshot` first, then incremental `orderbook_delta` updates

**Use case:** Building and maintaining a real-time orderbook




---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt