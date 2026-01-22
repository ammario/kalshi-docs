---
url: https://docs.kalshi.com/websockets/market-positions
lastmod: 2026-01-22T00:35:03.521Z
---
# Market Positions

> Real-time updates of your positions in markets. Requires authentication.

**Requirements:**
- Authentication required
- Market specification optional (omit to receive all positions)
- Updates sent when your position changes due to trades, settlements, etc.

**Monetary Values:**
All monetary values (position_cost, realized_pnl, fees_paid) are returned in centi-cents (1/10,000th of a dollar).
To convert to dollars, divide by 10,000.

**Use case:** Portfolio tracking, position monitoring, P&L calculations




---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt