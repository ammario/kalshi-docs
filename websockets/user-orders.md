---
url: https://docs.kalshi.com/websockets/user-orders
lastmod: 2026-02-19T08:36:34.352Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# User Orders

> Real-time order created and updated notifications. Requires authentication.

**Requirements:**
- Authentication required
- Market specification optional via `market_tickers` (omit to receive all orders)
- Supports `update_subscription` with `add_markets` / `delete_markets` actions
- Updates sent when your orders are created, filled, canceled, or otherwise updated

**Use case:** Tracking your resting orders, fills, and cancellations in real time


