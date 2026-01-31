---
url: https://docs.kalshi.com/websockets/connection-keep-alive
lastmod: 2026-01-30T23:01:58.041Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Connection Keep-Alive

> WebSocket control frames for connection management.

Kalshi sends Ping frames (`0x9`) every 10 seconds with body `heartbeat` to maintain the connection.
Clients should respond with Pong frames (`0xA`). Clients may also send Ping frames to which Kalshi will respond with Pong.


