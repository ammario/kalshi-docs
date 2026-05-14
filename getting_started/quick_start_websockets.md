---
url: https://docs.kalshi.com/getting_started/quick_start_websockets
lastmod: 2026-05-13T03:40:16.915Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quick Start: WebSockets

> Learn how to establish and maintain a WebSocket connection to stream real-time market data

## Overview

Kalshi's WebSocket API provides real-time updates for:

* Order book changes
* Trade executions
* Market status updates
* Fill notifications

## Connection URL

Connect to the WebSocket endpoint at:

```
wss://external-api-ws.kalshi.com/trade-api/ws/v2
```

For the demo environment, use:

```
wss://external-api-ws.demo.kalshi.co/trade-api/ws/v2
```

The existing shared WebSocket hosts, `wss://api.elections.kalshi.com/trade-api/ws/v2` for production and `wss://demo-api.kalshi.co/trade-api/ws/v2` for demo, remain supported. For the full endpoint list, see [API Environments and Endpoints](/getting_started/api_environments).

## Authentication

WebSocket connections require authentication during the connection handshake.

Once connected, channels fall into two groups:

* **Private channels (user-specific data):** `orderbook_delta`, `fill`, `market_positions`, `communications`, `order_group_updates`
* **Public market-data channels (no additional channel-level auth):** `ticker`, `trade`, `market_lifecycle_v2`, `multivariate_market_lifecycle`, `multivariate`

In other words, even channels that carry public market data still use the authenticated WebSocket session, but they do not impose additional per-channel authorization checks.

<Note>
  For detailed information about API key generation and request signing, see our [API Keys documentation](/getting_started/api_keys).
</Note>

### Required Headers

When establishing the WebSocket connection, include these headers:

```http theme={null}
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

2. **Generate the signature** using your private key (see [API Keys documentation](/getting_started/api_keys))

3. **Include the headers** when opening the WebSocket connection

## Establishing a Connection

To connect to the WebSocket API, you need to:

1. Generate authentication headers (same as REST API)
2. Create a WebSocket connection with those headers
3. Handle the connection lifecycle

Here's how to establish an authenticated connection:

```python theme={null}
import websockets
import asyncio

# WebSocket URL
ws_url = "wss://external-api-ws.demo.kalshi.co/trade-api/ws/v2"  # Demo environment

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

```python theme={null}
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

```python theme={null}
async def process_message(message):
    """Process incoming WebSocket messages"""
    data = json.loads(message)
    msg_type = data.get("type")

    if msg_type == "ticker":
        # Handle ticker update
        market = data["msg"]["market_ticker"]
        bid = data["msg"]["yes_bid_dollars"]
        ask = data["msg"]["yes_ask_dollars"]
        print(f"{market}: Yes Bid ${bid}, Yes Ask ${ask}")

    elif msg_type == "orderbook_snapshot":
        # Handle full orderbook state
        print(f"Orderbook snapshot for {data['msg']['market_ticker']}")

    elif msg_type == "orderbook_delta":
        # Handle orderbook changes
        print(f"Orderbook update for {data['msg']['market_ticker']}")
        # Note: client_order_id field is optional - present only when you caused this change
        if 'client_order_id' in data['msg']:
            print(f"  Your order {data['msg']['client_order_id']} caused this change")

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

```python theme={null}
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

```python theme={null}
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
await subscribe_to_markets(["orderbook_delta"], ["KXFUT24-LSV", "KXHARRIS24-LSV"])

# Subscribe to trade feed
await subscribe_to_markets(["trade"], ["KXFUT24-LSV"])
```

## Connection Lifecycle

1. **Initial Connection**: Establish WebSocket with authentication headers
2. **Subscribe**: Send subscription commands for desired channels
3. **Receive Updates**: Process incoming messages based on their type
4. **Handle Disconnects**: Implement reconnection logic with exponential backoff

## Error Handling

The server sends error messages in this format:

```json theme={null}
{
  "id": 123,
  "type": "error",
  "msg": {
    "code": 2,
    "msg": "Params required"
  }
}
```

### WebSocket Error Codes

| Code | Error                                            | Description                                                                                                                                                            | User error? |
| ---- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1    | Unable to process message                        | The incoming message was not valid JSON, or a JSON field had a type incompatible with the websocket command schema.                                                    | Y           |
| 2    | Params required                                  | The command requires `params` or required subscription parameters are missing.                                                                                         | Y           |
| 3    | Channels required                                | The `subscribe` command must include at least one channel.                                                                                                             | Y           |
| 4    | Subscription IDs required                        | The `unsubscribe` command must include at least one subscription ID in `sids`.                                                                                         | Y           |
| 5    | Unknown command                                  | The `cmd` value is not supported.                                                                                                                                      | Y           |
| 6    | Already subscribed                               | A subscription to the same channel is already active in this session.                                                                                                  | Y           |
| 7    | Unknown subscription ID                          | The command references a subscription ID that is not active in the session.                                                                                            | Y           |
| 8    | Unknown channel name                             | The requested channel is not supported by this endpoint.                                                                                                               | Y           |
| 9    | Authentication required                          | The requested channel or action requires authentication or channel access that was not granted.                                                                        | Y           |
| 10   | Channel error                                    | An internal channel error occurred while starting or running the subscription. If it persists, contact [support@kalshi.com](mailto:support@kalshi.com).                | N           |
| 11   | Invalid parameter                                | A parameter has an invalid format, such as a malformed market ID.                                                                                                      | Y           |
| 12   | Exactly one subscription ID is required          | The `update_subscription` command must target exactly one subscription.                                                                                                | Y           |
| 13   | Unsupported action                               | The subscription does not support the requested `action`.                                                                                                              | Y           |
| 14   | Market Ticker required                           | The command requires a market filter such as `market_ticker` or `market_tickers`.                                                                                      | Y           |
| 15   | Action required                                  | The `update_subscription` command must include `params.action`.                                                                                                        | Y           |
| 16   | Market not found                                 | The specified `market_ticker` or `market_id` does not match any known market.                                                                                          | Y           |
| 17   | Internal error                                   | An unexpected server-side error occurred. If it persists, contact [support@kalshi.com](mailto:support@kalshi.com).                                                     | N           |
| 18   | Command timeout                                  | The server timed out while routing a command to an existing subscription.                                                                                              | N           |
| 19   | shard\_factor must be > 0                        | The supplied `communications` `shard_factor` value is invalid.                                                                                                         | Y           |
| 20   | shard\_factor is required when shard\_key is set | `communications` set `shard_key` without a valid shard factor.                                                                                                         | Y           |
| 21   | shard\_key must be >= 0 and \< shard\_factor     | The `communications` shard key is outside the valid range.                                                                                                             | Y           |
| 22   | shard\_factor must be \<= 100                    | The `communications` shard factor exceeds the maximum.                                                                                                                 | Y           |
| 25   | Subscription buffer overflow                     | The subscription's event buffer overflowed during a message burst. Subscribe to a smaller subset of data, or ensure that your connection read throughput is optimized. | Y           |

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

```python theme={null}
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
WS_URL = "wss://external-api-ws.demo.kalshi.co/trade-api/ws/v2"

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
                if 'client_order_id' in data.get('msg', {}):
                    print(f"Orderbook update (your order {data['msg']['client_order_id']}): {data}")
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
