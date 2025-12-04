---
url: https://docs.kalshi.com/api-reference/market/get-trades
lastmod: 2025-12-04T02:14:27.595Z
---
# Get Trades

>  Endpoint for getting all trades for all markets.  A trade represents a completed transaction between two users on a specific market. Each trade includes the market ticker, price, quantity, and timestamp information.  This endpoint returns a paginated response. Use the 'limit' parameter to control page size (1-1000, defaults to 100). The response includes a 'cursor' field - pass this value in the 'cursor' parameter of your next request to get the next page. An empty cursor indicates no more pages are available.



---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt