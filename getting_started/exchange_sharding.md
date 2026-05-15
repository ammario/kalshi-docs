---
url: https://docs.kalshi.com/getting_started/exchange_sharding
lastmod: 2026-05-14T20:50:24.645Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Exchange Sharding

> Exchange sharding overview.

## Overview

In order to scale capacity, Kalshi will be sharding trading across multiple exchange instances. There will be several updates to trading operations:

* **Per-exchange balances:** A separate balance maintained per exchange shard. Reference `balance_breakdown` field on [Get Balance](/api-reference/portfolio/get-balance).
* **Intra-exchange transfers:** Money will be fungible across exchanges. Kalshi will provide the ability to instantly transfer between exchange instances.
* **Event/market pinning:** Events and markets will live on exactly one exchange. Kalshi will provide the exchange index through the `GET /events` and `GET /markets` APIs.
* **Order routing:** Responsibility for routing to the desired exchange instance will fall to the user via the `exchange_index` parameter on relevant endpoints.

## Rollout

All endpoints point to the default shard by default. However, users will need to accommodate the new API changes in order to participate in markets added to new exchange shards.

For now, only the default shard exists. Kalshi will release a more specific rollout timeline in the coming weeks.
