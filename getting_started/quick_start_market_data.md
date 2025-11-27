---
url: https://docs.kalshi.com/getting_started/quick_start_market_data
lastmod: 2025-10-07T23:32:02.809Z
---
# Quick Start: Market Data

> Learn how to access real-time market data without authentication

This guide will walk you through accessing Kalshi's public market data endpoints without authentication. You'll learn how to retrieve series information, events, markets, and orderbook data for the popular "Who will have a higher net approval" market.

## Making Unauthenticated Requests

Kalshi provides several public endpoints that don't require API keys. These endpoints allow you to access market data directly from our production servers at `https://api.elections.kalshi.com/trade-api/v2`.

<Info>
  **Note about the API URL**: Despite the "elections" subdomain, `api.elections.kalshi.com` provides access to ALL Kalshi markets - not just election-related ones. This includes markets on economics, climate, technology, entertainment, and more.
</Info>

<Info>
  No authentication headers are required for the endpoints in this guide. You can start making requests immediately!
</Info>

## Step 1: Get Series Information

Let's start by fetching information about the KXHIGHNY series ([Highest temperature in NYC today?](https://kalshi.com/markets/kxhighny/highest-temperature-in-nyc)). This series tracks the highest temperature recorded in Central Park, New York on a given day. We'll use the [Get Series](/api-reference/market/get-series) endpoint.

<CodeGroup>
  ```python Python theme={null}
  import requests

  # Get series information for KXHIGHNY
  url = "https://api.elections.kalshi.com/trade-api/v2/series/KXHIGHNY"
  response = requests.get(url)
  series_data = response.json()

  print(f"Series Title: {series_data['series']['title']}")
  print(f"Frequency: {series_data['series']['frequency']}")
  print(f"Category: {series_data['series']['category']}")
  ```

  ```javascript JavaScript theme={null}
  // Get series information for KXHIGHNY
  fetch('https://api.elections.kalshi.com/trade-api/v2/series/KXHIGHNY')
    .then(response => response.json())
    .then(data => {
      console.log(`Series Title: ${data.series.title}`);
      console.log(`Frequency: ${data.series.frequency}`);
      console.log(`Category: ${data.series.category}`);
    });
  ```

  ```curl cURL theme={null}
  curl -X GET "https://api.elections.kalshi.com/trade-api/v2/series/KXHIGHNY"
  ```
</CodeGroup>

## Step 2: Get Today's Events and Markets

Now that we have the series information, let's get the markets for this series. We'll use the [Get Markets](/api-reference/market/get-markets) endpoint with the series ticker filter to find all active markets.

<CodeGroup>
  ```python Python theme={null}
  # Get all markets for the KXHIGHNY series
  markets_url = f"https://api.elections.kalshi.com/trade-api/v2/markets?series_ticker=KXHIGHNY&status=open"
  markets_response = requests.get(markets_url)
  markets_data = markets_response.json()

  print(f"\nActive markets in KXHIGHNY series:")
  for market in markets_data['markets']:
      print(f"- {market['ticker']}: {market['title']}")
      print(f"  Event: {market['event_ticker']}")
      print(f"  Yes Price: {market['yes_price']}¢ | Volume: {market['volume']}")
      print()

  # Get details for a specific event if you have its ticker
  if markets_data['markets']:
      # Let's get details for the first market's event
      event_ticker = markets_data['markets'][0]['event_ticker']
      event_url = f"https://api.elections.kalshi.com/trade-api/v2/events/{event_ticker}"
      event_response = requests.get(event_url)
      event_data = event_response.json()

      print(f"Event Details:")
      print(f"Title: {event_data['event']['title']}")
      print(f"Category: {event_data['event']['category']}")
  ```

  ```javascript JavaScript theme={null}
  // Get markets for the KXHIGHNY series
  async function getSeriesMarkets() {
    // Get all markets for this series
    const marketsResponse = await fetch('https://api.elections.kalshi.com/trade-api/v2/markets?series_ticker=KXHIGHNY&status=open');
    const marketsData = await marketsResponse.json();

    console.log('\nActive markets in KXHIGHNY series:');
    marketsData.markets.forEach(market => {
      console.log(`- ${market.ticker}: ${market.title}`);
      console.log(`  Event: ${market.event_ticker}`);
      console.log(`  Yes Price: ${market.yes_price}¢ | Volume: ${market.volume}`);
      console.log();
    });

    // Get details for a specific event if markets exist
    if (marketsData.markets.length > 0) {
      const eventTicker = marketsData.markets[0].event_ticker;
      const eventResponse = await fetch(`https://api.elections.kalshi.com/trade-api/v2/events/${eventTicker}`);
      const eventData = await eventResponse.json();

      console.log('Event Details:');
      console.log(`Title: ${eventData.event.title}`);
      console.log(`Category: ${eventData.event.category}`);
    }
  }

  getSeriesMarkets();
  ```
</CodeGroup>

<Info>
  You can view these markets in the Kalshi UI at: [https://kalshi.com/markets/kxhighny](https://kalshi.com/markets/kxhighny)
</Info>

## Step 3: Get Orderbook Data

Now let's fetch the orderbook for a specific market to see the current bids and asks using the [Get Market Orderbook](/api-reference/market/get-market-order-book) endpoint.

<CodeGroup>
  ```python Python theme={null}
  # Get orderbook for a specific market
  # Replace with an actual market ticker from the markets list
  market_ticker = markets_data['markets'][0]['ticker']
  orderbook_url = f"https://api.elections.kalshi.com/trade-api/v2/markets/{market_ticker}/orderbook"

  orderbook_response = requests.get(orderbook_url)
  orderbook_data = orderbook_response.json()

  print(f"\nOrderbook for {market_ticker}:")
  print("YES BIDS:")
  for bid in orderbook_data['orderbook']['yes'][:5]:  # Show top 5
      print(f"  Price: {bid[0]}¢, Quantity: {bid[1]}")

  print("\nNO BIDS:")
  for bid in orderbook_data['orderbook']['no'][:5]:  # Show top 5
      print(f"  Price: {bid[0]}¢, Quantity: {bid[1]}")
  ```

  ```javascript JavaScript theme={null}
  // Get orderbook data
  async function getOrderbook(marketTicker) {
    const response = await fetch(`https://api.elections.kalshi.com/trade-api/v2/markets/${marketTicker}/orderbook`);
    const data = await response.json();

    console.log(`\nOrderbook for ${marketTicker}:`);
    console.log('YES BIDS:');
    data.orderbook.yes.slice(0, 5).forEach(([price, quantity]) => {
      console.log(`  Price: ${price}¢, Quantity: ${quantity}`);
    });

    console.log('\nNO BIDS:');
    data.orderbook.no.slice(0, 5).forEach(([price, quantity]) => {
      console.log(`  Price: ${price}¢, Quantity: ${quantity}`);
    });
  }
  ```
</CodeGroup>

## Working with Large Datasets

The Kalshi API uses cursor-based pagination to handle large datasets efficiently. To learn more about navigating through paginated responses, see our [Understanding Pagination](/getting_started/pagination) guide.

## Understanding Orderbook Responses

Kalshi's orderbook structure is unique due to the nature of binary prediction markets. The API only returns bids (not asks) because of the reciprocal relationship between YES and NO positions. To learn more about orderbook responses and why they work this way, see our [Orderbook Responses](/getting_started/orderbook_responses) guide.

## Next Steps

Now that you understand how to access market data without authentication, you can:

1. Explore other public series and events
2. Build real-time market monitoring tools
3. Create market analysis dashboards
4. Set up a WebSocket connection for live updates (requires authentication)

For authenticated endpoints that allow trading and portfolio management, check out our [API Keys guide](/getting_started/api_keys).


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: /llms.txt