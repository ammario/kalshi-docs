# Orderbook Responses

> Understanding Kalshi orderbook structure and binary prediction market mechanics

## Getting Orderbook Data

The [Get Market Orderbook](/api-reference/market/get-market-order-book) endpoint returns the current state of bids for a specific market.

### Request Format

```
GET /markets/{ticker}/orderbook
```

No authentication is required for this endpoint.

### Example Request

<CodeGroup>
  ```python Python theme={null}
  import requests

  # Get orderbook for a specific market
  market_ticker = "KXHIGHNY-24JAN01-T60"
  url = f"https://api.elections.kalshi.com/trade-api/v2/markets/{market_ticker}/orderbook"

  response = requests.get(url)
  orderbook_data = response.json()
  ```

  ```javascript JavaScript theme={null}
  // Get orderbook for a specific market
  const marketTicker = "KXHIGHNY-24JAN01-T60";
  const url = `https://api.elections.kalshi.com/trade-api/v2/markets/${marketTicker}/orderbook`;

  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
  ```

  ```curl cURL theme={null}
  curl -X GET "https://api.elections.kalshi.com/trade-api/v2/markets/KXHIGHNY-24JAN01-T60/orderbook"
  ```
</CodeGroup>

## Response Structure

The orderbook response contains two arrays of bids - one for YES positions and one for NO positions. Each bid is represented as a two-element array: `[price, quantity]`.

### Example Response

```json  theme={null}
{
  "orderbook": {
    "yes": [
      [1, 200],    // 200 contracts bid at 1¢
      [15, 100],   // 100 contracts bid at 15¢
      [20, 50],    // 50 contracts bid at 20¢
      [25, 20],    // 20 contracts bid at 25¢
      [30, 11],    // 11 contracts bid at 30¢
      [31, 10],    // 10 contracts bid at 31¢
      [32, 10],    // 10 contracts bid at 32¢
      [33, 11],    // 11 contracts bid at 33¢
      [34, 9],     // 9 contracts bid at 34¢
      [35, 11],    // 11 contracts bid at 35¢
      [41, 10],    // 10 contracts bid at 41¢
      [42, 13]     // 13 contracts bid at 42¢
    ],
    "no": [
      [1, 100],    // 100 contracts bid at 1¢
      [16, 3],     // 3 contracts bid at 16¢
      [25, 50],    // 50 contracts bid at 25¢
      [28, 19],    // 19 contracts bid at 28¢
      [36, 5],     // 5 contracts bid at 36¢
      [37, 50],    // 50 contracts bid at 37¢
      [38, 300],   // 300 contracts bid at 38¢
      [44, 29],    // 29 contracts bid at 44¢
      [45, 20],    // 20 contracts bid at 45¢
      [56, 17]     // 17 contracts bid at 56¢
    ]
  }
}
```

### Understanding the Arrays

* **First element**: Price in cents (1-99)
* **Second element**: Number of contracts available at that price
* Arrays are sorted by price in **ascending order**
* The **highest** bid (best bid) is the **last** element in each array

## Why Only Bids?

<Info>
  **Important**: Kalshi's orderbook only returns bids, not asks. This is because in binary prediction markets, there's a reciprocal relationship between YES and NO positions.
</Info>

In binary prediction markets, every position has a complementary opposite:

* A **YES BID** at price X is equivalent to a **NO ASK** at price (100 - X)
* A **NO BID** at price Y is equivalent to a **YES ASK** at price (100 - Y)

### The Reciprocal Relationship

Since binary markets must sum to 100¢, these relationships always hold:

| Action         | Equivalent To  | Why                                                            |
| -------------- | -------------- | -------------------------------------------------------------- |
| YES BID at 60¢ | NO ASK at 40¢  | Willing to pay 60¢ for YES = Willing to receive 40¢ to take NO |
| NO BID at 30¢  | YES ASK at 70¢ | Willing to pay 30¢ for NO = Willing to receive 70¢ to take YES |

This reciprocal nature means that by showing only bids, the orderbook provides complete market information while avoiding redundancy.

## Calculating Spreads

To find the bid-ask spread for a market:

1. **YES spread**:
   * Best YES bid: Highest price in the `yes` array
   * Best YES ask: 100 - (Highest price in the `no` array)
   * Spread = Best YES ask - Best YES bid

2. **NO spread**:
   * Best NO bid: Highest price in the `no` array
   * Best NO ask: 100 - (Highest price in the `yes` array)
   * Spread = Best NO ask - Best NO bid

### Example Calculation

```python  theme={null}
# Using the example orderbook above
best_yes_bid = 42  # Highest YES bid (last in array)
best_yes_ask = 100 - 56  # 100 - highest NO bid = 44

spread = best_yes_ask - best_yes_bid  # 44 - 42 = 2

# The spread is 2¢
# You can buy YES at 44¢ (implied ask) and sell at 42¢ (bid)
```

## Working with Orderbook Data

### Display Best Prices

<CodeGroup>
  ```python Python theme={null}
  def display_best_prices(orderbook_data):
      """Display the best bid prices and implied asks"""
      orderbook = orderbook_data['orderbook']

      # Best bids (if any exist)
      if orderbook['yes']:
          best_yes_bid = orderbook['yes'][-1][0]  # Last element is highest
          print(f"Best YES Bid: {best_yes_bid}¢")

      if orderbook['no']:
          best_no_bid = orderbook['no'][-1][0]  # Last element is highest
          best_yes_ask = 100 - best_no_bid
          print(f"Best YES Ask: {best_yes_ask}¢ (implied from NO bid)")

      print()

      if orderbook['no']:
          best_no_bid = orderbook['no'][-1][0]  # Last element is highest
          print(f"Best NO Bid: {best_no_bid}¢")

      if orderbook['yes']:
          best_yes_bid = orderbook['yes'][-1][0]  # Last element is highest
          best_no_ask = 100 - best_yes_bid
          print(f"Best NO Ask: {best_no_ask}¢ (implied from YES bid)")
  ```

  ```javascript JavaScript theme={null}
  function displayBestPrices(orderbookData) {
    const orderbook = orderbookData.orderbook;

    // Best bids (if any exist)
    if (orderbook.yes.length > 0) {
      const bestYesBid = orderbook.yes[orderbook.yes.length - 1][0];  // Last element is highest
      console.log(`Best YES Bid: ${bestYesBid}¢`);
    }

    if (orderbook.no.length > 0) {
      const bestNoBid = orderbook.no[orderbook.no.length - 1][0];  // Last element is highest
      const bestYesAsk = 100 - bestNoBid;
      console.log(`Best YES Ask: ${bestYesAsk}¢ (implied from NO bid)`);
    }

    console.log();

    if (orderbook.no.length > 0) {
      const bestNoBid = orderbook.no[orderbook.no.length - 1][0];  // Last element is highest
      console.log(`Best NO Bid: ${bestNoBid}¢`);
    }

    if (orderbook.yes.length > 0) {
      const bestYesBid = orderbook.yes[orderbook.yes.length - 1][0];  // Last element is highest
      const bestNoAsk = 100 - bestYesBid;
      console.log(`Best NO Ask: ${bestNoAsk}¢ (implied from YES bid)`);
    }
  }
  ```
</CodeGroup>

### Calculate Market Depth

```python  theme={null}
def calculate_depth(orderbook_data, depth_cents=5):
    """Calculate total volume within X cents of best bid"""
    orderbook = orderbook_data['orderbook']

    yes_depth = 0
    no_depth = 0

    # YES side depth (iterate backwards from best bid)
    if orderbook['yes']:
        best_yes = orderbook['yes'][-1][0]  # Last element is highest
        for price, quantity in reversed(orderbook['yes']):
            if best_yes - price <= depth_cents:
                yes_depth += quantity
            else:
                break

    # NO side depth (iterate backwards from best bid)
    if orderbook['no']:
        best_no = orderbook['no'][-1][0]  # Last element is highest
        for price, quantity in reversed(orderbook['no']):
            if best_no - price <= depth_cents:
                no_depth += quantity
            else:
                break

    return {"yes_depth": yes_depth, "no_depth": no_depth}
```

## Next Steps

* Learn about [making authenticated requests](/getting_started/api_keys) to place orders
* Explore [WebSocket connections](/websockets/orderbook-updates) for real-time orderbook updates
* Read about [market mechanics](https://kalshi.com/learn) on the Kalshi website
