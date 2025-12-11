---
url: https://docs.kalshi.com/api-reference/market/get-market-orderbook
lastmod: 2025-12-11T01:07:15.473Z
---
# Get Market Orderbook

>  Endpoint for getting the current order book for a specific market.  The order book shows all active bid orders for both yes and no sides of a binary market. It returns yes bids and no bids only (no asks are returned). This is because in binary markets, a bid for yes at price X is equivalent to an ask for no at price (100-X). For example, a yes bid at 7¢ is the same as a no ask at 93¢, with identical contract sizes.  Each side shows price levels with their corresponding quantities and order counts, organized from best to worst prices.



---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt