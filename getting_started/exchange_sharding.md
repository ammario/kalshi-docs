---
url: https://docs.kalshi.com/getting_started/exchange_sharding
lastmod: 2026-08-11T22:35:30.203Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Exchange Sharding

> Exchange sharding in the Predictions API

## Overview

In order to scale capacity, Kalshi will be splitting trading across multiple matching engines.
Exchange instances will correspond to a specific category (e.g. "crypto" exchange, a "combos" exchange).
Kalshi plans to add shards incrementally to maintain a healthy balance of traffic.

## Timeline

Kalshi will migrate combos from the "default" exchange instance to shard 1, followed by crypto and selected sports series.

* August 6, 2026: intra-exchange instance transfers enabled to exchange index 1.
* August 10, 2026: `KXMVECROSSCATEGORY-SHARD1-R` multivariate event collection created with support for all combos.
* August 17, 2026: combos created over legacy collections `KXMVESPORTSMULTIGAMEEXTENDED-R`, `KXMVECROSSCATEGORY-R` will be created on shard 1.
* August 24, 2026: new crypto events will be created on shard 2, and new tennis and baseball events will be created on shard 3.

## Balance Management

Kalshi's collateralization checks will continue to run within the matching engine. Programmatic traders must preallocate collateral on a given exchange shard before order placement.

API changes:

* `POST /portfolio/intra_exchange_instance_transfer`: Given a source and destination exchange index, Kalshi will transfer funds for the user without clearing delay.
* `GET /portfolio/balance`: Kalshi provides a breakdown of account balance per exchange instance.

## Order routing

### Market Data

`exchange_index` is provided on `GET /markets`, `GET /events`, and via the WebSocket stream for newly created events and markets.

### REST

The `exchange_index` parameter is available on a per-endpoint basis.

* If omitted: defaults to `0`.
* Else if `-1`: routes to the target exchange for the provided market ticker.
* Else if `>= 0`: routes directly to the target exchange.

### FIX

The `ExDestination` parameter (FIX Tag 100) is available on a per-message basis.

* If omitted: defaults to `0`.
* Else if `-1`: routes to the target exchange for the provided `Symbol` (FIX Tag 55).
* Else if `>= 0`: routes directly to the target exchange.

## FAQ

* All child markets of an event will live on the same exchange instance.
* Providing `ExDestination` / `exchange_index` is unnecessary for combo requests, which are routed internally by Kalshi.
* Automatic routing will incur an additional latency cost.
* Subaccount balances are local to a specific exchange instance.
* Order groups do not function across exchange instances.
* [`KXMVECROSSCATEGORY-SHARD1-R`](https://demo-api.kalshi.co/trade-api/v2/multivariate_event_collections/KXMVECROSSCATEGORY-SHARD1-R) is live in demo for testing.

## Upcoming Series shard assignments

The following assignments determine the shard where new events will be created. Shard 0 is the catch-all for all categories and tags not listed below.

| Shard index | Category               | Tags             |
| ----------- | ---------------------- | ---------------- |
| 0           | *All other categories* | *All other tags* |
| 1           | Exotics (Combos)       | —                |
| 2           | Crypto                 | —                |
| 3           | Sports                 | Tennis, Baseball |
