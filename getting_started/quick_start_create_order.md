---
url: https://docs.kalshi.com/getting_started/quick_start_create_order
lastmod: 2026-11-13T01:30:44.913Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quick Start: Create your first order

> Learn how to find markets, place orders, check status, and cancel orders on Kalshi

This guide will walk you through the complete lifecycle of placing and managing orders on Kalshi.

## Prerequisites

Before you begin, you'll need:

* A Kalshi account with API access configured
* Python with the `requests` and `cryptography` libraries installed
* Your authentication functions set up (see our [authentication guide](https://docs.kalshi.com/getting_started/quick_start_authenticated_requests.md))

> [!NOTE]
>
> This guide assumes you have the authentication code from our authentication guide, including the `get()` function for making authenticated requests.

## Step 1: Find an Open Market

First, let's find an open market to trade on.

```python theme={null}
# Get the first open market (no auth required for public market data)
response = requests.get('https://external-api.demo.kalshi.co/trade-api/v2/markets?limit=1&status=open')
market = response.json()['markets'][0]

print(f"Selected market: {market['ticker']}")
print(f"Title: {market['title']}")
```

## Step 2: Place a Buy Order

Now let's place an order to buy 1 YES contract for 1 cent (limit order). We'll use a `client_order_id` to deduplicate orders - this allows you to identify duplicate orders before receiving the server-generated `order_id` in the response.

```python theme={null}
import uuid
from urllib.parse import urlparse

def post(private_key, api_key_id, path, data, base_url=BASE_URL):
    """Make an authenticated POST request to the Kalshi API."""
    timestamp = str(int(datetime.datetime.now().timestamp() * 1000))
    # Signing requires the full URL path from root (e.g. /trade-api/v2/portfolio/events/orders)
    sign_path = urlparse(base_url + path).path
    signature = create_signature(private_key, timestamp, "POST", sign_path)

    headers = {
        'KALSHI-ACCESS-KEY': api_key_id,
        'KALSHI-ACCESS-SIGNATURE': signature,
        'KALSHI-ACCESS-TIMESTAMP': timestamp,
        'Content-Type': 'application/json'
    }

    return requests.post(base_url + path, headers=headers, json=data)

# Place a buy order for 1 YES contract at 1 cent
order_data = {
    "ticker": market['ticker'],
    "side": "bid",
    "count": "1",
    "price": "0.0100",
    "time_in_force": "good_till_canceled",
    "self_trade_prevention_type": "taker_at_cross",
    "client_order_id": str(uuid.uuid4())  # Unique ID for deduplication
}

response = post(private_key, API_KEY_ID, '/portfolio/events/orders', order_data)

if response.status_code == 201:
    order = response.json()
    print(f"Order placed successfully!")
    print(f"Order ID: {order['order_id']}")
    print(f"Client Order ID: {order_data['client_order_id']}")
    print(f"Remaining Count: {order['remaining_count']}")
else:
    print(f"Error: {response.status_code} - {response.text}")
```

## Complete Example Script

Here's a complete script that creates your first order:

```python theme={null}
import requests
import uuid
from urllib.parse import urlparse
# Assumes you have the authentication code from the prerequisites

# Add POST function to your existing auth code
def post(private_key, api_key_id, path, data, base_url=BASE_URL):
    """Make an authenticated POST request to the Kalshi API."""
    timestamp = str(int(datetime.datetime.now().timestamp() * 1000))
    # Signing requires the full URL path from root (e.g. /trade-api/v2/portfolio/events/orders)
    sign_path = urlparse(base_url + path).path
    signature = create_signature(private_key, timestamp, "POST", sign_path)

    headers = {
        'KALSHI-ACCESS-KEY': api_key_id,
        'KALSHI-ACCESS-SIGNATURE': signature,
        'KALSHI-ACCESS-TIMESTAMP': timestamp,
        'Content-Type': 'application/json'
    }

    return requests.post(base_url + path, headers=headers, json=data)

# Step 1: Find an open market
print("Finding an open market...")
response = requests.get('https://external-api.demo.kalshi.co/trade-api/v2/markets?limit=1&status=open')
market = response.json()['markets'][0]
print(f"Selected: {market['ticker']} - {market['title']}")

# Step 2: Place a buy order
print("\nPlacing order...")
client_order_id = str(uuid.uuid4())
order_data = {
    "ticker": market['ticker'],
    "side": "bid",
    "count": "1",
    "price": "0.0100",
    "time_in_force": "good_till_canceled",
    "self_trade_prevention_type": "taker_at_cross",
    "client_order_id": client_order_id
}

response = post(private_key, API_KEY_ID, '/portfolio/events/orders', order_data)

if response.status_code == 201:
    order = response.json()
    print(f"Order placed successfully!")
    print(f"Order ID: {order['order_id']}")
    print(f"Client Order ID: {client_order_id}")
    print(f"Remaining Count: {order['remaining_count']}")
else:
    print(f"Error: {response.status_code} - {response.text}")
```

## Important Notes

### Client Order ID

The `client_order_id` field is optional, but strongly recommended for order deduplication:

* Generate a unique ID (like UUID4) for each order before submission when you want idempotent retries
* If network issues occur, check whether the order was placed before resubmitting. Resubmitting with the same `client_order_id` is rejected while the first order is still open, but not reliably after it has filled, canceled or expired
* The API will reject duplicate submissions with the same `client_order_id`, preventing accidental double orders. The rejection is `409 order_already_exists` and does not return the original order
* Use up to 64 characters from letters, digits and `_ - : + = /`. Anything else is rejected with `400 invalid_parameters`
* IDs are unique per subaccount on the market's exchange shard. Generate a new one for every order rather than reusing an old one
* Store this ID locally to track orders before receiving the server's `order_id`

### Error Handling

Common errors and how to handle them:

* `401 Unauthorized`: Check your API keys and signature generation
* `400 Bad Request`: The order was rejected. The `code` says why, for example `invalid_price` (the price is not on the market's price grid), `insufficient_balance` or `invalid_order`
* `404 Not Found`: The market or order was not found on the exchange shard the request reached, or the account has no balance there (`insufficient_shard_balance`)
* `409 Conflict`: Order with this `client_order_id` already exists (`order_already_exists`), the market is not open (`market_inactive`), or trading is paused
* `429 Too Many Requests`: You've hit the rate limit - slow down your requests

A `201` means the order was accepted, not that it is resting: check `remaining_count`. See [Order Errors](https://docs.kalshi.com/getting_started/order_errors.md) for every code and what to do about it.

## Next Steps

Now that you've created your first order, you can:

* Store the returned `order_id` and `client_order_id` for local tracking
* Amend your order price or quantity using POST `/portfolio/events/orders/{order_id}/amend`
* Cancel orders using DELETE `/portfolio/events/orders/{order_id}`
* Implement WebSocket connections for real-time updates
* Build automated trading strategies

For more information, check out:

* [API Reference Documentation](https://docs.kalshi.com/api-reference)
* [Kalshi Discord Community](https://discord.gg/kalshi)


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.