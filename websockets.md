---
url: https://docs.kalshi.com/websockets
lastmod: 2026-07-13T19:43:31.361Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSocket API

> Trade API WebSocket endpoint and schema reference

Use the dedicated Trade API WebSocket hosts for new integrations:

| Environment | WebSocket URL | Shared host, also supported |
| - | - | - |
| Production | `wss://external-api-ws.kalshi.com/trade-api/ws/v2` | `wss://api.elections.kalshi.com/trade-api/ws/v2` |
| Demo | `wss://external-api-ws.demo.kalshi.co/trade-api/ws/v2` | `wss://demo-api.kalshi.co/trade-api/ws/v2` |

WebSocket connections use the same API key authentication and signing path as before. Only the hostname changes for the dedicated Trade API path.

* For connection and subscription examples, see [Quick Start: WebSockets](https://docs.kalshi.com/getting_started/quick_start_websockets.md).
* For all REST and WebSocket base URLs, see [API Environments and Endpoints](https://docs.kalshi.com/getting_started/api_environments.md).
* To generate clients or inspect channel payloads directly, download the [AsyncAPI specification](https://docs.kalshi.com/asyncapi.yaml).
* For detailed CF Benchmarks channel usage (`cfbenchmarks_value`), see [CF Benchmarks Value Feed](https://docs.kalshi.com/websockets/cfbenchmarks-value.md).
* For real-time Pyth prices (`pyth_value`), see [Pyth Value Feed](https://docs.kalshi.com/websockets/pyth-value.md).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.