---
url: https://docs.kalshi.com/getting_started/pagination
lastmod: 2026-11-13T01:29:02.721Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Understanding Pagination

> Learn how to navigate through large datasets using cursor-based pagination

The Kalshi API uses cursor-based pagination to help you efficiently navigate through large datasets. This guide explains how pagination works and provides examples for handling paginated responses.

## How Pagination Works

When making requests to list endpoints (like `/markets`, `/events`, or `/markets/trades`), the API returns results in pages to keep response sizes manageable. Each page contains:

* **Data array**: The actual items for the current page (markets, events, etc.)
* **Cursor field**: A token that points to the next page of results
* **Limit**: The maximum number of items per page. The default and maximum differ by endpoint: for example `/markets` and `/markets/trades` default to 100 and allow up to 1000, while `/events` defaults to 200 and allows up to 200. Check each endpoint's reference page.

## Using Cursors

To paginate through results:

1. Make your initial request without a cursor
2. Read the `cursor` field of the response
3. If the cursor is not empty, make another request with `?cursor={cursor_value}`, keeping the same filters
4. Continue until the cursor is an empty string (no more pages)

Pass the cursor exactly as it was returned. On `/markets`, `/historical/markets` and `/markets/trades`, a cursor that cannot be decoded (for example a truncated one) is ignored and the first page is returned with no error, so a loop that sends a damaged cursor never ends. `/events` rejects an invalid cursor with `400`.

## Example: Paginating Through Markets

```python Python theme={null}
import requests

def get_all_markets(series_ticker):
    """Fetch all markets for a series, handling pagination"""
    all_markets = []
    cursor = None
    base_url = "https://external-api.kalshi.com/trade-api/v2/markets"

    while True:
        # Build URL with cursor if we have one
        url = f"{base_url}?series_ticker={series_ticker}&limit=100"
        if cursor:
            url += f"&cursor={cursor}"

        response = requests.get(url)
        data = response.json()

        # Add markets from this page
        all_markets.extend(data['markets'])

        # Check if there are more pages
        cursor = data.get('cursor')
        if not cursor:
            break

        print(f"Fetched {len(data['markets'])} markets, total: {len(all_markets)}")

    return all_markets

# Example usage
markets = get_all_markets("KXHIGHNY")
print(f"Total markets found: {len(markets)}")
```

```javascript JavaScript theme={null}
async function getAllMarkets(seriesTicker) {
  const allMarkets = [];
  let cursor = null;
  const baseUrl = 'https://external-api.kalshi.com/trade-api/v2/markets';

  while (true) {
    // Build URL with cursor if we have one
    let url = `${baseUrl}?series_ticker=${seriesTicker}&limit=100`;
    if (cursor) {
      url += `&cursor=${cursor}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    // Add markets from this page
    allMarkets.push(...data.markets);

    // Check if there are more pages
    cursor = data.cursor;
    if (!cursor) {
      break;
    }

    console.log(`Fetched ${data.markets.length} markets, total: ${allMarkets.length}`);
  }

  return allMarkets;
}

// Example usage
getAllMarkets('KXHIGHNY').then(markets => {
  console.log(`Total markets found: ${markets.length}`);
});
```

## Pagination Parameters

Most list endpoints support these pagination parameters:

* **`cursor`**: Token from previous response to get the next page
* **`limit`**: Number of items per page. Defaults and maximums differ by endpoint (up to 1000 on `/markets` and `/markets/trades`, up to 200 on `/events`)

## Best Practices

1. **Handle rate limits**: When paginating through large datasets, be mindful of [rate limits](https://docs.kalshi.com/getting_started/rate_limits.md)
2. **Set appropriate limits**: Use smaller page sizes if you only need a few items
3. **Cache results**: Store paginated data locally to avoid repeated API calls
4. **Check for changes**: Data can change between requests, so consider implementing refresh logic

## Endpoints Supporting Pagination

The following endpoints support cursor-based pagination:

* [Get Markets](https://docs.kalshi.com/api-reference/market/get-markets.md) - `/markets`
* [Get Events](https://docs.kalshi.com/api-reference/market/get-events) - `/events`
* [Get Trades](https://docs.kalshi.com/api-reference/market/get-trades.md) - `/markets/trades`
* [Get Fills](https://docs.kalshi.com/api-reference/portfolio/get-fills.md) - `/portfolio/fills`
* [Get Orders](https://docs.kalshi.com/api-reference/portfolio/get-orders) - `/portfolio/orders`

`GET /series` is not paginated: it takes no `limit` or `cursor` and returns every matching series in one response.

## Things to Know

* **`/markets` filtered only by `event_ticker` or `tickers` is not paged.** When one of these is the only filter, every matching market is returned in one response in no guaranteed order, `limit` is not applied, and the returned cursor is empty.
* **Sort order depends on the filters.** `/markets` returns the most recently created markets first by default. With `min_updated_ts` or `max_updated_ts` it sorts by last update time (oldest first). When neither `event_ticker` nor `tickers` is supplied, `status=closed`, `min_close_ts` or `max_close_ts` sorts by close time (latest first), and `min_settled_ts` or `max_settled_ts` sorts by settlement time (latest first). A request that supplies `event_ticker` or `tickers` together with another filter is sorted by creation time, even with those status or timestamp filters. The unpaged case above, where `event_ticker` or `tickers` is the only filter, has no guaranteed order.
* **Pages are not a snapshot.** Items can be created or change between requests. A market whose close time changes while you page through a listing sorted by close time can be skipped or returned twice, so deduplicate by ticker.
* **List responses can be slightly stale.** Market data responses are cached for a short time and can lag the exchange by several seconds, longer for filtered listings than for a single market. Use [WebSockets](https://docs.kalshi.com/getting_started/quick_start_websockets.md) when you need current prices or status.

## Common Patterns

### Fetching Recent Items

If you only need recent items, you can limit results without pagination:

```python theme={null}
# Get just the 10 most recently created open markets
url = "https://external-api.kalshi.com/trade-api/v2/markets?limit=10&status=open"
```

### Filtering While Paginating

You can combine filters with pagination:

```python theme={null}
# Get all open markets for a series
url = f"{base_url}?series_ticker={ticker}&status=open&limit=100&cursor={cursor}"
```

### Detecting New Items

To check for new items since your last fetch:

1. Store the first item's ID or timestamp from your previous fetch
2. Paginate through results until you find that item
3. Everything before it is new

## Next Steps

Now that you understand pagination, you can efficiently work with large datasets in the Kalshi API. For more details on specific endpoints, check the [API Reference](https://docs.kalshi.com/api-reference).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.