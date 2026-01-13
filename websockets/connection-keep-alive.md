---
url: https://docs.kalshi.com/websockets/connection-keep-alive
lastmod: 2026-01-12T19:23:49.008Z
---
# Connection Keep-Alive

> WebSocket control frames for connection management.

Kalshi sends Ping frames (`0x9`) every 10 seconds with body `heartbeat` to maintain the connection.
Clients should respond with Pong frames (`0xA`). Clients may also send Ping frames to which Kalshi will respond with Pong.




---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt