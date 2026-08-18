---
url: https://docs.kalshi.com/getting_started/exchange_sharding
lastmod: 2026-08-17T21:12:33.982Z
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

**Funding Overview**

* Account transfers can be made through the [Intra Account Transfer API](/api-reference/portfolio/intra-account-transfer).
* Manual transfers are also available through the [Kalshi UI](https://kalshi.com/account/exchange-indexes).
* [Get Balance](/api-reference/portfolio/get-balance) provides a breakdown of account balances across exchange indexes.

**Subaccounts Overview**

* To fund a subaccount on a new exchange instance, first transfer user-level funds to the desired exchange instance.
* Next, use [Create Subaccount](/api-reference/portfolio/create-subaccount) with the `exchange_index` parameter to provision the subaccount on the new instance.
* Then, use [Transfer Between Subaccounts](/api-reference/portfolio/transfer-between-subaccounts) with the `exchange_index` parameter to transfer funds from the primary account to the subaccount on that instance.
* [Get All Subaccount Balances](/api-reference/portfolio/get-all-subaccount-balances) provides a breakdown of subaccount balances for each `(exchange_index, subaccount)` pair.

**Auto-Rebalancing**

* Institutional clients may opt in to automatic rebalancing between exchange shards.
* The customer supplies a target balance allocation as a percentage of free capital per exchange shard. For example, `{Default: 80, Combos: 20}`.
* Every 10 seconds, Kalshi computes the customer's free margin on each exchange shard as its balance minus the value of its resting orders.
* If free margin has drifted from the target allocation, Kalshi executes an intra-exchange account transfer on the customer's behalf to restore the target allocation.

## Order routing

### Market Data

* A new field `exchange_index` is provided on [`GET /markets`](/api-reference/market/get-markets), [`GET /events`](/api-reference/events/get-events), and via the [market and event lifecycle WebSocket streams](/websockets/market-and-event-lifecycle) for newly created events and markets.
* Market ticker formats are unaffected by exchange sharding. The `exchange_index` field is the authoritative source of truth.

### REST

The `exchange_index` parameter is available on a per-endpoint basis.

* If omitted: defaults to `0`.
* Else if `-1`: routes to the target exchange for the provided market ticker.
* Else if `>= 0`: routes directly to the target exchange.

### FIX

The [`ExDestination` parameter](/fix/order-entry) (FIX Tag 100) is available on a per-message basis.

* If omitted: defaults to `0`.
* Else if `-1`: routes to the target exchange for the provided `Symbol` (FIX Tag 55).
* Else if `>= 0`: routes directly to the target exchange.

## Upcoming Series Shard Assignments

The following assignments determine the shard where new events will be created. Shard 0 is the catch-all for all categories and tags not listed below.

| Shard index | Category               | Tags             | Series list                                                                                                                                        |
| ----------- | ---------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0           | *All other categories* | *All other tags* | —                                                                                                                                                  |
| 1           | Exotics (Combos)       | —                | [`GET /series?category=Exotics`](https://api.elections.kalshi.com/trade-api/v2/series?category=Exotics)                                            |
| 2           | Crypto                 | —                | [`GET /series?category=Crypto`](https://api.elections.kalshi.com/trade-api/v2/series?category=Crypto)                                              |
| 3           | Sports                 | Tennis, Baseball | [`GET /series?category=Sports&tags=Tennis,Baseball`](https://api.elections.kalshi.com/trade-api/v2/series?category=Sports\&tags=Tennis%2CBaseball) |

## FAQ

* All child markets of an event will live on the same exchange instance.
* There is currently no plan to migrate any live market to a new exchange instance.
* Providing `ExDestination` / `exchange_index` is unnecessary for all RFQ operations, including FIX [`QuoteRequest` (`35=R`), `Quote` (`35=S`), and `AcceptQuote` (`35=UA`)](/fix/rfq-messages), which are routed internally by Kalshi.
* Automatic routing will incur an additional latency cost.
* Subaccount balances are local to a specific exchange instance.
* Order groups do not function across exchange instances.
* [`KXMVECROSSCATEGORY-SHARD1-R`](https://demo-api.kalshi.co/trade-api/v2/multivariate_event_collections/KXMVECROSSCATEGORY-SHARD1-R) is live in demo for testing.
