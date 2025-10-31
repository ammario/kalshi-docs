# Understanding Pagination

> Learn how to navigate through large datasets using cursor-based pagination

The Kalshi API uses cursor-based pagination to help you efficiently navigate through large datasets. This guide explains how pagination works and provides examples for handling paginated responses.

## How Pagination Works

When making requests to list endpoints (like `/markets`, `/events`, or `/series`), the API returns results in pages to keep response sizes manageable. Each page contains:

* **Data array**: The actual items for the current page (markets, events, etc.)
* **Cursor field**: A token that points to the next page of results
* **Limit**: The maximum number of items per page (default: 100)

## Using Cursors

To paginate through results:

1. Make your initial request without a cursor
2. Check if the response includes a `cursor` field
3. If a cursor exists, make another request with `?cursor={cursor_value}`
4. Continue until the cursor is `null` (no more pages)

## Example: Paginating Through Markets

<CodeGroup>
  ```python Python theme={null}
  import requests

  def get_all_markets(series_ticker):
      """Fetch all markets for a series, handling pagination"""
      all_markets = []
      cursor = None
      base_url = "https://api.elections.kalshi.com/trade-api/v2/markets"

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
    const baseUrl = 'https://api.elections.kalshi.com/trade-api/v2/markets';

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
</CodeGroup>

## Pagination Parameters

Most list endpoints support these pagination parameters:

* **`cursor`**: Token from previous response to get the next page
* **`limit`**: Number of items per page (typically 1-100, default: 100)

## Best Practices

1. **Handle rate limits**: When paginating through large datasets, be mindful of [rate limits](/getting_started/rate_limits)
2. **Set appropriate limits**: Use smaller page sizes if you only need a few items
3. **Cache results**: Store paginated data locally to avoid repeated API calls
4. **Check for changes**: Data can change between requests, so consider implementing refresh logic

## Endpoints Supporting Pagination

The following endpoints support cursor-based pagination:

* [Get Markets](/api-reference/market/get-markets) - `/markets`
* [Get Events](/api-reference/market/get-events) - `/events`
* [Get Series](/api-reference/market/get-series) - `/series`
* [Get Trades](/api-reference/market/get-trades) - `/markets/trades`
* [Get Portfolio History](/api-reference/portfolio/get-portfolio-history) - `/portfolio/history`
* [Get Fills](/api-reference/portfolio/get-fills) - `/portfolio/fills`
* [Get Orders](/api-reference/portfolio/get-orders) - `/portfolio/orders`

## Common Patterns

### Fetching Recent Items

If you only need recent items, you can limit results without pagination:

```python  theme={null}
# Get just the 10 most recent markets
url = "https://api.elections.kalshi.com/trade-api/v2/markets?limit=10&status=open"
```

### Filtering While Paginating

You can combine filters with pagination:

```python  theme={null}
# Get all open markets for a series
url = f"{base_url}?series_ticker={ticker}&status=open&limit=100&cursor={cursor}"
```

### Detecting New Items

To check for new items since your last fetch:

1. Store the first item's ID or timestamp from your previous fetch
2. Paginate through results until you find that item
3. Everything before it is new

## Next Steps

Now that you understand pagination, you can efficiently work with large datasets in the Kalshi API. For more details on specific endpoints, check the [API Reference](/api-reference).
