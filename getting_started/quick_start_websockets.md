# Quick Start: WebSockets

> Learn how to establish and maintain a WebSocket connection to stream real-time market data

## Overview

Kalshi's WebSocket API provides real-time updates for:

* Order book changes
* Trade executions
* Market status updates
* Fill notifications (authenticated connections only)

## Connection URL

Connect to the WebSocket endpoint at:

```
wss://api.elections.kalshi.com/trade-api/ws/v2
```

For the demo environment, use:

```
wss://demo-api.kalshi.co/trade-api/ws/v2
```

## Authentication

WebSocket connections require authentication using the same API key signing mechanism as REST endpoints.

<Note>
  For detailed information about API key generation and request signing, see our [API Keys documentation](/getting_started/api_keys).
</Note>

### Required Headers

When establishing the WebSocket connection, include these headers:

```http  theme={null}
KALSHI-ACCESS-KEY: your_api_key_id
KALSHI-ACCESS-SIGNATURE: request_signature
KALSHI-ACCESS-TIMESTAMP: unix_timestamp_in_milliseconds
```

### Signing the WebSocket Request

The signature for WebSocket connections follows the same pattern as REST API requests:

1. **Create the message to sign:**
   ```
   timestamp + "GET" + "/trade-api/ws/v2"
   ```

2. **Generate the signature** using your private key (see [API Keys documentation](/getting_started/api_keys#signing-requests))

3. **Include the headers** when opening the WebSocket connection

## Establishing a Connection

To connect to the WebSocket API, you need to:

1. Generate authentication headers (same as REST API)
2. Create a WebSocket connection with those headers
3. Handle the connection lifecycle

Here's how to establish an authenticated connection:

```python  theme={null}
import websockets
import asyncio

# WebSocket URL
ws_url = "wss://demo-api.kalshi.co/trade-api/ws/v2"  # Demo environment

# Generate authentication headers (see API Keys documentation)
auth_headers = {
    "KALSHI-ACCESS-KEY": "your_api_key_id",
    "KALSHI-ACCESS-SIGNATURE": "generated_signature",
    "KALSHI-ACCESS-TIMESTAMP": "timestamp_in_milliseconds"
}

# Connect with authentication
async def connect():
    async with websockets.connect(ws_url, additional_headers=auth_headers) as websocket:
        print("Connected to Kalshi WebSocket")

        # Connection is now established
        # You can start sending and receiving messages

        # Listen for messages
        async for message in websocket:
            print(f"Received: {message}")

# Run the connection
asyncio.run(connect())
```

## Subscribing to Data

Once connected, subscribe to channels by sending a subscription command:

```python  theme={null}
import json

async def subscribe_to_ticker(websocket):
    """Subscribe to ticker updates"""
    subscription = {
        "id": 1,
        "cmd": "subscribe",
        "params": {
            "channels": ["ticker"]
        }
    }
    await websocket.send(json.dumps(subscription))

async def subscribe_to_orderbook(websocket, market_tickers):
    """Subscribe to orderbook updates for specific markets"""
    subscription = {
        "id": 2,
        "cmd": "subscribe",
        "params": {
            "channels": ["orderbook_delta"],
            "market_tickers": market_tickers
        }
    }
    await websocket.send(json.dumps(subscription))
```

## Processing Messages

Handle incoming messages based on their type:

```python  theme={null}
async def process_message(message):
    """Process incoming WebSocket messages"""
    data = json.loads(message)
    msg_type = data.get("type")

    if msg_type == "ticker":
        # Handle ticker update
        market = data["data"]["market_ticker"]
        bid = data["data"]["bid"]
        ask = data["data"]["ask"]
        print(f"{market}: Bid ${bid}, Ask ${ask}")

    elif msg_type == "orderbook_snapshot":
        # Handle full orderbook state
        print(f"Orderbook snapshot for {data['data']['market_ticker']}")

    elif msg_type == "orderbook_update":
        # Handle orderbook changes
        print(f"Orderbook update for {data['data']['market_ticker']}")
        # Note: client_order_id field is optional - present only when you caused this change
        if 'client_order_id' in data['data']:
            print(f"  Your order {data['data']['client_order_id']} caused this change")

    elif msg_type == "error":
        error_code = data.get("msg", {}).get("code")
        error_msg = data.get("msg", {}).get("msg")
        print(f"Error {error_code}: {error_msg}")
```

## Connection Keep-Alive

<Note>
  The Python `websockets` library automatically handles WebSocket ping/pong frames to keep connections alive. No manual heartbeat handling is required. Learn more about [automatic keepalive in the websockets documentation](https://websockets.readthedocs.io/en/stable/topics/design.html#keepalive).

  Other WebSocket libraries may require manual ping/pong implementation.
</Note>

## Subscribing to Channels

Once connected, subscribe to specific data channels:

### Subscribe to Ticker Updates

To receive real-time ticker updates for all markets:

```python  theme={null}
async def subscribe_to_tickers(self):
    """Subscribe to ticker updates for all markets"""
    subscription_message = {
        "id": self.message_id,
        "cmd": "subscribe",
        "params": {
            "channels": ["ticker"]
        }
    }
    await self.ws.send(json.dumps(subscription_message))
    self.message_id += 1
```

### Subscribe to Specific Markets

To subscribe to orderbook or trade updates for specific markets:

```python  theme={null}
async def subscribe_to_markets(self, channels, market_tickers):
    """Subscribe to specific channels and markets"""
    subscription_message = {
        "id": self.message_id,
        "cmd": "subscribe",
        "params": {
            "channels": channels,
            "market_tickers": market_tickers
        }
    }
    await self.ws.send(json.dumps(subscription_message))
    self.message_id += 1

# Example usage:
# Subscribe to orderbook updates
await subscribe_to_markets(["orderbook"], ["KXFUT24-LSV", "KXHARRIS24-LSV"])

# Subscribe to trade feed
await subscribe_to_markets(["trades"], ["KXFUT24-LSV"])
```

## Connection Lifecycle

1. **Initial Connection**: Establish WebSocket with authentication headers
2. **Subscribe**: Send subscription commands for desired channels
3. **Receive Updates**: Process incoming messages based on their type
4. **Handle Disconnects**: Implement reconnection logic with exponential backoff

## Error Handling

The server sends error messages in this format:

```json  theme={null}
{
  "id": 123,
  "type": "error",
  "msg": {
    "code": 6,
    "msg": "Params required"
  }
}
```

### WebSocket Error Codes

| Code | Error                                | Description                             |
| ---- | ------------------------------------ | --------------------------------------- |
| 1    | Unable to process message            | General processing error                |
| 2    | Params required                      | Missing params object in command        |
| 3    | Channels required                    | Missing channels array in subscribe     |
| 4    | Subscription IDs required            | Missing sids in unsubscribe             |
| 5    | Unknown command                      | Invalid command name                    |
| 7    | Unknown subscription ID              | Subscription ID not found               |
| 8    | Unknown channel name                 | Invalid channel in subscribe            |
| 9    | Authentication required              | Private channel without auth            |
| 10   | Channel error                        | Channel-specific error                  |
| 11   | Invalid parameter                    | Malformed parameter value               |
| 12   | Exactly one subscription ID required | For update\_subscription                |
| 13   | Unsupported action                   | Invalid action for update\_subscription |
| 14   | Market ticker required               | Missing market specification            |
| 15   | Action required                      | Missing action in update\_subscription  |
| 16   | Market not found                     | Invalid market ticker                   |
| 17   | Internal error                       | Server-side processing error            |

## Best Practices

<CardGroup cols={2}>
  <Card title="Connection Management" icon="link">
    * Implement automatic reconnection with exponential backoff
    * Handle network interruptions gracefully
    * Use the websockets library's built-in keepalive
  </Card>

  <Card title="Data Handling" icon="database">
    * Process messages asynchronously to avoid blocking
    * Implement proper error handling for malformed messages
    * Cache initial orderbook state before applying updates
  </Card>

  <Card title="Security" icon="shield">
    * Never expose your private key in client-side code
    * Rotate API keys regularly
    * Use secure key storage practices
  </Card>

  <Card title="Performance" icon="gauge">
    * Subscribe only to markets you need
    * Implement message buffering for high-frequency updates
    * Consider using connection pooling for multiple subscriptions
  </Card>
</CardGroup>

## Complete Example

Here's a complete, runnable example that connects to the WebSocket API and subscribes to orderbook updates:

```python  theme={null}
import asyncio
import base64
import json
import time
import websockets
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding

# Configuration
KEY_ID = "your_api_key_id"
PRIVATE_KEY_PATH = "path/to/private_key.pem"
MARKET_TICKER = "KXHARRIS24-LSV"  # Replace with any open market
WS_URL = "wss://demo-api.kalshi.co/trade-api/ws/v2"

def sign_pss_text(private_key, text: str) -> str:
    """Sign message using RSA-PSS"""
    message = text.encode('utf-8')
    signature = private_key.sign(
        message,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.DIGEST_LENGTH
        ),
        hashes.SHA256()
    )
    return base64.b64encode(signature).decode('utf-8')

def create_headers(private_key, method: str, path: str) -> dict:
    """Create authentication headers"""
    timestamp = str(int(time.time() * 1000))
    msg_string = timestamp + method + path.split('?')[0]
    signature = sign_pss_text(private_key, msg_string)

    return {
        "Content-Type": "application/json",
        "KALSHI-ACCESS-KEY": KEY_ID,
        "KALSHI-ACCESS-SIGNATURE": signature,
        "KALSHI-ACCESS-TIMESTAMP": timestamp,
    }

async def orderbook_websocket():
    """Connect to WebSocket and subscribe to orderbook"""
    # Load private key
    with open(PRIVATE_KEY_PATH, 'rb') as f:
        private_key = serialization.load_pem_private_key(
            f.read(),
            password=None
        )

    # Create WebSocket headers
    ws_headers = create_headers(private_key, "GET", "/trade-api/ws/v2")

    async with websockets.connect(WS_URL, additional_headers=ws_headers) as websocket:
        print(f"Connected! Subscribing to orderbook for {MARKET_TICKER}")

        # Subscribe to orderbook
        subscribe_msg = {
            "id": 1,
            "cmd": "subscribe",
            "params": {
                "channels": ["orderbook_delta"],
                "market_ticker": MARKET_TICKER
            }
        }
        await websocket.send(json.dumps(subscribe_msg))

        # Process messages
        async for message in websocket:
            data = json.loads(message)
            msg_type = data.get("type")

            if msg_type == "subscribed":
                print(f"Subscribed: {data}")

            elif msg_type == "orderbook_snapshot":
                print(f"Orderbook snapshot: {data}")

            elif msg_type == "orderbook_delta":
                # The client_order_id field is optional - only present when you caused the change
                if 'client_order_id' in data.get('data', {}):
                    print(f"Orderbook update (your order {data['data']['client_order_id']}): {data}")
                else:
                    print(f"Orderbook update: {data}")

            elif msg_type == "error":
                print(f"Error: {data}")

# Run the example
if __name__ == "__main__":
    asyncio.run(orderbook_websocket())
```

This example:

* Establishes an authenticated WebSocket connection
* Subscribes to orderbook updates for the specified market
* Processes both the initial snapshot and incremental updates
* Displays orderbook changes in real-time

To run this example:

1. Replace `KEY_ID` with your API key ID
2. Replace `PRIVATE_KEY_PATH` with the path to your private key file
3. Replace `MARKET_TICKER` with any open market ticker
4. Run with Python 3.7+

## Next Steps

* Review the [WebSocket API Reference](/websockets) for detailed message specifications
* Explore [Market Data Quick Start](/getting_started/quick_start_market_data) for REST API integration
* Check out our [Demo Environment](/getting_started/demo_env) for testing
