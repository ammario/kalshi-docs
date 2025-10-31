# Orderbook Updates

> Real-time orderbook price level changes. Provides incremental updates to maintain a live orderbook.

**Requirements:**
- Market specification required:
  - Use `market_ticker` (string) for a single market
  - Use `market_tickers` (array of strings) for multiple markets
- Sends `orderbook_snapshot` first, then incremental `orderbook_delta` updates

**Use case:** Building and maintaining a real-time orderbook


