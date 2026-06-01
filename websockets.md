---
url: https://docs.kalshi.com/websockets
lastmod: 2026-05-05T21:10:40.730Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSocket API

> Trade API WebSocket endpoint and schema reference

Use the dedicated Trade API WebSocket hosts for new integrations:

| Environment | WebSocket URL                                          | Shared host, also supported                      |
| ----------- | ------------------------------------------------------ | ------------------------------------------------ |
| Production  | `wss://external-api-ws.kalshi.com/trade-api/ws/v2`     | `wss://api.elections.kalshi.com/trade-api/ws/v2` |
| Demo        | `wss://external-api-ws.demo.kalshi.co/trade-api/ws/v2` | `wss://demo-api.kalshi.co/trade-api/ws/v2`       |

WebSocket connections use the same API key authentication and signing path as before. Only the hostname changes for the dedicated Trade API path.

* For connection and subscription examples, see [Quick Start: WebSockets](/getting_started/quick_start_websockets).
* For all REST and WebSocket base URLs, see [API Environments and Endpoints](/getting_started/api_environments).
* To generate clients or inspect channel payloads directly, download the [AsyncAPI specification](/asyncapi.yaml).
