---
url: https://docs.kalshi.com/websockets/market-positions
lastmod: 2026-02-12T00:46:53.926Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Positions

> Real-time updates of your positions in markets. Requires authentication.

**Requirements:**
- Authentication required
- Market specification optional (omit to receive all positions)
- Filters are by `market_ticker`/`market_tickers` only; `market_id`/`market_ids` are not supported
- Updates sent when your position changes due to trades, settlements, etc.

**Monetary Values:**
All monetary values (position_cost, realized_pnl, fees_paid) are returned in centi-cents (1/10,000th of a dollar).
To convert to dollars, divide by 10,000.

**Use case:** Portfolio tracking, position monitoring, P&L calculations


