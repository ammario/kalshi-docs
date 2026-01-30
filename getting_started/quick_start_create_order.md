---
url: https://docs.kalshi.com/getting_started/quick_start_create_order
lastmod: 2026-01-29T22:57:35.455Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quick Start: Create your first order (No SDK)

> Learn how to find markets, place orders, check status, and cancel orders on Kalshi

This guide will walk you through the complete lifecycle of placing and managing orders on Kalshi.

## Prerequisites

Before you begin, you'll need:

* A Kalshi account with API access configured
* Python with the `requests` and `cryptography` libraries installed
* Your authentication functions set up (see our [authentication guide](quick_start_authenticated_requests))

<Info>
  This guide assumes you have the authentication code from our authentication guide, including the `get()` function for making authenticated requests.
</Info>

## Step 1: Find an Open Market

First, let's find an open market to trade on.

```python  theme={null}
# Get the first open market (no auth required for public market data)
response = requests.get('https://demo-api.kalshi.co/trade-api/v2/markets?limit=1&status=open')
market = response.json()['markets'][0]

print(f"Selected market: {market['ticker']}")
print(f"Title: {market['title']}")
```

## Step 2: Place a Buy Order

Now let's place an order to buy 1 YES contract for 1 cent (limit order). We'll use a `client_order_id` to deduplicate orders - this allows you to identify duplicate orders before receiving the server-generated `order_id` in the response.

```python  theme={null}
import uuid

def post(private_key, api_key_id, path, data, base_url=BASE_URL):
    """Make an authenticated POST request to the Kalshi API."""
    timestamp = str(int(datetime.datetime.now().timestamp() * 1000))
    signature = create_signature(private_key, timestamp, "POST", path)

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
    "action": "buy",
    "side": "yes",
    "count": 1,
    "type": "limit",
    "yes_price": 1,
    "client_order_id": str(uuid.uuid4())  # Unique ID for deduplication
}

response = post(private_key, API_KEY_ID, '/trade-api/v2/portfolio/orders', order_data)

if response.status_code == 201:
    order = response.json()['order']
    print(f"Order placed successfully!")
    print(f"Order ID: {order['order_id']}")
    print(f"Client Order ID: {order_data['client_order_id']}")
    print(f"Status: {order['status']}")
else:
    print(f"Error: {response.status_code} - {response.text}")
```

## Complete Example Script

Here's a complete script that creates your first order:

```python  theme={null}
import requests
import uuid
# Assumes you have the authentication code from the prerequisites

# Add POST function to your existing auth code
def post(private_key, api_key_id, path, data, base_url=BASE_URL):
    """Make an authenticated POST request to the Kalshi API."""
    timestamp = str(int(datetime.datetime.now().timestamp() * 1000))
    signature = create_signature(private_key, timestamp, "POST", path)

    headers = {
        'KALSHI-ACCESS-KEY': api_key_id,
        'KALSHI-ACCESS-SIGNATURE': signature,
        'KALSHI-ACCESS-TIMESTAMP': timestamp,
        'Content-Type': 'application/json'
    }

    return requests.post(base_url + path, headers=headers, json=data)

# Step 1: Find an open market
print("Finding an open market...")
response = requests.get('https://demo-api.kalshi.co/trade-api/v2/markets?limit=1&status=open')
market = response.json()['markets'][0]
print(f"Selected: {market['ticker']} - {market['title']}")

# Step 2: Place a buy order
print("\nPlacing order...")
client_order_id = str(uuid.uuid4())
order_data = {
    "ticker": market['ticker'],
    "action": "buy",
    "side": "yes",
    "count": 1,
    "type": "limit",
    "yes_price": 1,
    "client_order_id": client_order_id
}

response = post(private_key, API_KEY_ID, '/trade-api/v2/portfolio/orders', order_data)

if response.status_code == 201:
    order = response.json()['order']
    print(f"Order placed successfully!")
    print(f"Order ID: {order['order_id']}")
    print(f"Client Order ID: {client_order_id}")
    print(f"Status: {order['status']}")
else:
    print(f"Error: {response.status_code} - {response.text}")
```

## Important Notes

### Client Order ID

The `client_order_id` field is crucial for order deduplication:

* Generate a unique ID (like UUID4) for each order before submission
* If network issues occur, you can resubmit with the same `client_order_id`
* The API will reject duplicate submissions, preventing accidental double orders
* Store this ID locally to track orders before receiving the server's `order_id`

### Error Handling

Common errors and how to handle them:

* `401 Unauthorized`: Check your API keys and signature generation
* `400 Bad Request`: Verify your order parameters (price must be 1-99 cents)
* `409 Conflict`: Order with this `client_order_id` already exists
* `429 Too Many Requests`: You've hit the rate limit - slow down your requests

## Next Steps

Now that you've created your first order, you can:

* Check order status using the `/portfolio/orders/{order_id}` endpoint
* List all your orders with `/portfolio/orders`
* Amend your order price or quantity using PUT `/portfolio/orders/{order_id}`
* Cancel orders using DELETE `/portfolio/orders/{order_id}`
* Implement WebSocket connections for real-time updates
* Build automated trading strategies

For more information, check out:

* [API Reference Documentation](https://docs.kalshi.com/api-reference)
* [Kalshi Discord Community](https://discord.gg/kalshi)
