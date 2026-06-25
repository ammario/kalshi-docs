---
url: https://docs.kalshi.com/getting_started/demo_env
lastmod: 2026-06-24T13:51:32.241Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Test In The Demo Environment

> Set up and test with Kalshi's demo environment

For testing purposes, Kalshi offers a *demo* environment with mock funds. You can access the Demo environment at [https://demo.kalshi.co/](https://demo.kalshi.co/). For safety, credentials are not shared between this environment and production.

<Warning>
  The price and behavior of markets in the demo environment may not be reflective of those in real markets.
</Warning>

To set up a Kalshi Demo account, [follow this step-by-step tutorial](https://docs.google.com/presentation/d/e/2PACX-1vRvhUAqRBYzJmt7JCinMXmu6KVWkj-cc7ikDXGConmqjcv4mnlJacgHPcZJ20fWWnrYdubn-oczclKP/pub?start=false\&loop=false\&delayms=3000\&slide=id.p).

Demo's recommended Trade API root is `https://external-api.demo.kalshi.co/trade-api/v2`.

| Surface        | Recommended demo endpoint                              | Also supported                             |
| -------------- | ------------------------------------------------------ | ------------------------------------------ |
| REST Trade API | `https://external-api.demo.kalshi.co/trade-api/v2`     | `https://demo-api.kalshi.co/trade-api/v2`  |
| WebSocket API  | `wss://external-api-ws.demo.kalshi.co/trade-api/ws/v2` | `wss://demo-api.kalshi.co/trade-api/ws/v2` |

For the full production and demo endpoint list, see [API Environments and Endpoints](/getting_started/api_environments).
