---
url: https://docs.kalshi.com/api-reference/market/batch-get-market-candlesticks
lastmod: 2025-12-11T01:07:15.663Z
---
# Batch Get Market Candlesticks

> Endpoint for retrieving candlestick data for multiple markets.

- Accepts up to 100 market tickers per request
- Returns up to 10,000 candlesticks total across all markets
- Returns candlesticks grouped by market_id
- Optionally includes a synthetic initial candlestick for price continuity (see `include_latest_before_start` parameter)




---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt