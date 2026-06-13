---
url: https://docs.kalshi.com/margin
lastmod: 2026-06-12T19:33:00.043Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Perps API

> Getting started with Kalshi's perpetual-futures (perps) trading API

The **Perps API** is how you trade Kalshi's perpetual futures. **"Perps", "margin", and "perpetual futures" all refer to the same product.** The API surface uses *margin* throughout (endpoints under the `/margin` namespace, margin-prefixed fields), so these docs use *margin* for technical references. It mirrors the existing event contract API, so if you're already integrated there you're most of the way there: the margin endpoints follow the same patterns, authentication, and conventions, just under `/margin`.

<Note>
  Perps trading is rolling out to production **gradually, member by member**. The demo environment is open to everyone today; production access is enabled in phases, so your account may not have production perps access yet even after the production endpoints are live. Build and test against demo now, and call `GET /margin/enabled` to check whether perps is enabled for your account in a given environment.
</Note>

## Connectivity

### REST API

| Environment | Base URL                                                                              |
| ----------- | ------------------------------------------------------------------------------------- |
| Demo        | `https://external-api.demo.kalshi.co/trade-api/v2/margin/`                            |
| Production  | `https://external-api.kalshi.com/trade-api/v2/margin/` (rolling out member by member) |

Use the `external-api` hosts for perps REST. WebSocket and FIX use the separate perps hosts listed below.

### WebSocket API

| Environment | URL                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Demo        | `wss://external-api-margin-ws.demo.kalshi.co/trade-api/ws/v2/margin`                            |
| Production  | `wss://external-api-margin-ws.kalshi.com/trade-api/ws/v2/margin` (rolling out member by member) |

### FIX API

The margin FIX gateway uses a **separate host** from event contract FIX.

| Environment | Type                      | Host                                         |
| ----------- | ------------------------- | -------------------------------------------- |
| Demo        | Order entry and drop copy | `margin-fix.demo.kalshi.co`                  |
| Demo        | Market data               | `margin-marketdata.fix.demo.kalshi.co`       |
| Production  | Order entry and drop copy | `margin-mm.fix.elections.kalshi.com`         |
| Production  | Market data               | `margin-marketdata.fix.elections.kalshi.com` |

Available session types:

| Purpose                              | Port | TargetCompID |
| ------------------------------------ | ---- | ------------ |
| Order Entry (without retransmission) | 8228 | KalshiNR     |
| Drop Copy                            | 8229 | KalshiDC     |
| Order Entry (with retransmission)    | 8230 | KalshiRT     |
| Market Data                          | 8233 | KalshiMD     |

## API Reference

The Perps API mirrors the event contract API (same auth, pagination, error format, and order lifecycle), so the conventions in [Making Your First Request](/getting_started/making_your_first_request) and [API Environments](/getting_started/api_environments) apply directly.

* **REST**: see the **REST** reference in this section.
* **WebSocket**: see the margin channels under **WebSockets** in this section.
* **FIX**:
  * [Connectivity](/fix-margin/connectivity)
  * [Authentication & Sessions](/fix-margin/authentication)
  * [Order Entry](/fix-margin/order-entry)
  * [Order Groups](/fix-margin/order-groups)
  * [Market Data](/fix-margin/market-data)
  * [Drop Copy](/fix-margin/drop-copy)
  * [Listener Sessions](/fix-margin/listener-sessions)
  * [Error Handling](/fix-margin/error-handling)

### REST API

**What's the same:** authentication, pagination, error format, and core order lifecycle (create, amend, decrease, cancel) all work identically, just under `/margin/*` instead of `/portfolio/*` and `/markets/*`.

**Margin-specific additions:** beyond the mirrored order, market, and order-group endpoints, margin adds endpoints for account balance and risk, funding (estimated and historical rates, plus payment history), fee tiers, subaccounts, and transfers between your event-contract and margin balances. See the **REST** reference for the full list. Two things to know up front: the event-contract ↔ margin transfer (`/portfolio/intra_exchange_instance_transfer`) is **not yet available** (enabled with the production rollout), and you can call `/margin/enabled` to check whether margin is on for your account in a given environment.

**Not available on margin:**

* Batch order operations (`BatchCreateOrders`, `BatchCancelOrders`)
* Queue positions
* Events, series, milestones, multivariate collections, structured targets
* RFQs and quotes
* Historical data endpoints
* Exchange announcements and schedule

### WebSocket API

**Same channels:** `orderbook_delta`, `ticker`, `trade`, `fill`, `user_orders`, `order_group_updates`

**Not available on margin:** `market_positions`, `market_lifecycle_v2`, `multivariate_market_lifecycle`, `multivariate`, `communications`

**Timestamp convention:** all timestamp fields in margin WebSocket payloads use Unix epoch milliseconds and an `_ms` suffix.

| Channel           | Event contract                                                             | Margin                                                                                                                                                                           |
| ----------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orderbook_delta` | `ts` as RFC3339 datetime                                                   | `ts_ms` as Unix milliseconds                                                                                                                                                     |
| `ticker`          | `ts` in Unix seconds and `time` as RFC3339 datetime                        | `ts_ms` (top level); nested `reference_price`/`settlement_mark_price`/`liquidation_mark_price` each carry `ts_ms`, and `funding_rate` carries `next_funding_time_ms` and `ts_ms` |
| `trade`           | `ts` in Unix seconds                                                       | `ts_ms` in Unix milliseconds                                                                                                                                                     |
| `fill`            | `ts` in Unix seconds                                                       | `ts_ms` in Unix milliseconds                                                                                                                                                     |
| `user_orders`     | `created_time`, `last_update_time`, `expiration_time` as RFC3339 datetimes | `created_ts_ms`, `last_updated_ts_ms`, `expiration_ts_ms` as Unix milliseconds                                                                                                   |

<Note>
  Margin WebSocket payloads no longer use RFC3339 timestamp strings. The `order_group_updates` channel already follows the same convention: its only timestamp field, `ts_ms`, is Unix epoch milliseconds.
</Note>

### FIX API

<Warning>
  API keys **should not be shared** between the event contract and margin FIX gateways.
</Warning>

**What's the same:** FIXT.1.1 / FIX50SP2 protocol, RSA key authentication, order lifecycle messages (NewOrderSingle, OrderCancelRequest, etc.), order groups, drop copy, and listener sessions all work the same way.

**Key differences:**

|                               | Event Contract FIX          | Margin FIX                                                         |
| ----------------------------- | --------------------------- | ------------------------------------------------------------------ |
| **Pricing**                   | Integer cents (1–99)        | Decimal dollars up to 4 decimal places                             |
| **Session types**             | 6 (NR, RT, DC, PT, RFQ, MD) | 4 (NR, RT, DC, MD)                                                 |
| **RFQ / Quotes**              | Supported                   | Not available                                                      |
| **Market settlement reports** | Supported (on KalshiRT)     | Not available                                                      |
| **UseDollars (21005)**        | Optional logon flag         | Always enabled (margin uses fixed-point dollar pricing by default) |
