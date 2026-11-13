---
url: https://docs.kalshi.com/margin
lastmod: 2026-11-13T04:06:56.730Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Perps API

> Getting started with Kalshi's perpetual-futures (perps) trading API

The **Perps API** is how you trade Kalshi's perpetual futures. **"Perps", "margin", and "perpetual futures" all refer to the same product.** The API surface uses *margin* throughout (endpoints under the `/margin` namespace, margin-prefixed fields), so these docs use *margin* for technical references. It mirrors the existing event contract API, so if you're already integrated there you're most of the way there: the margin endpoints follow the same patterns, authentication, and conventions, just under `/margin`.

## Connectivity

### REST API

| Environment | Base URL |
| - | - |
| Demo | `https://external-api.demo.kalshi.co/trade-api/v2/margin/` |
| Production | `https://external-api.kalshi.com/trade-api/v2/margin/` (rolling out member by member) |

Use the `external-api` hosts for perps REST. WebSocket and FIX use the separate perps hosts listed below.

### WebSocket API

| Environment | URL |
| - | - |
| Demo | `wss://external-api-margin-ws.demo.kalshi.co/trade-api/ws/v2/margin` |
| Production | `wss://external-api-margin-ws.kalshi.com/trade-api/ws/v2/margin` (rolling out member by member) |

For lower-latency `fill` and `user_orders` updates, connect to `wss://margin-user-ws.kalshi.com/trade-api/ws/v2/margin` in production or `wss://margin-user-ws.demo.kalshi.co/trade-api/ws/v2/margin` in demo. These hosts serve only those two channels today. See [Fill and order updates](https://docs.kalshi.com/getting_started/api_environments.md#fill-and-order-updates).

### FIX API

The margin FIX gateway uses a **separate host** from event contract FIX.

| Environment | Type | Host |
| - | - | - |
| Demo | Order entry and drop copy | `margin-fix.demo.kalshi.co` |
| Demo | Market data | `margin-marketdata.fix.demo.kalshi.co` |
| Production | Order entry and drop copy | `margin-mm.fix.elections.kalshi.com` |
| Production | Market data | `margin-marketdata.fix.elections.kalshi.com` |

Available session types:

| Purpose | Port | TargetCompID |
| - | - | - |
| Order Entry (without retransmission) | 8228 | KalshiNR |
| Drop Copy | 8229 | KalshiDC |
| Order Entry (with retransmission) | 8230 | KalshiRT |
| Market Data | 8233 | KalshiMD |

## API Reference

The Perps API mirrors the event contract API (same auth, pagination, error format, and order lifecycle), so the conventions in [Making Your First Request](https://docs.kalshi.com/getting_started/making_your_first_request.md) and [API Environments](https://docs.kalshi.com/getting_started/api_environments.md) apply directly.

* **REST**: see the **REST** reference in this section.
* **WebSocket**: see the margin channels under **WebSockets** in this section.
* **FIX**:
  * [Connectivity](https://docs.kalshi.com/fix-margin/connectivity.md)
  * [Authentication & Sessions](https://docs.kalshi.com/fix-margin/authentication.md)
  * [Order Entry](https://docs.kalshi.com/fix-margin/order-entry.md)
  * [Order Groups](https://docs.kalshi.com/fix-margin/order-groups.md)
  * [Market Data](https://docs.kalshi.com/fix-margin/market-data.md)
  * [Drop Copy](https://docs.kalshi.com/fix-margin/drop-copy.md)
  * [Listener Sessions](https://docs.kalshi.com/fix-margin/listener-sessions.md)
  * [Error Handling](https://docs.kalshi.com/fix-margin/error-handling.md)

### REST API

**What's the same:** authentication, pagination, error format, and core order lifecycle (create, amend, decrease, cancel) all work identically, just under `/margin/*` instead of `/portfolio/*` and `/markets/*`.

**Margin-specific additions:** beyond the mirrored order, market, and order-group endpoints, margin adds endpoints for account balance and risk, funding (estimated and historical rates, plus payment history), fee tiers, subaccounts, and transfers between your event-contract and margin balances. See the **REST** reference for the full list. Two things to know up front: the event-contract ↔ margin transfer (`/portfolio/intra_exchange_instance_transfer`) is **not yet available** (enabled with the production rollout), and you can call `/margin/enabled` to check whether margin is on for your account in a given environment.

**Dollar precision:** existing fixed-point dollar response fields support up to 6 decimal places and retain their names. See [Fixed-Point Representation](https://docs.kalshi.com/getting_started/fixed_point_migration.md#margin-markets).

**Not available on margin:**

* Batch order operations (`BatchCreateOrders`, `BatchCancelOrders`)
* Queue positions
* Events, series, milestones, multivariate collections, structured targets
* RFQs and quotes
* Historical data endpoints
* Exchange schedule

### WebSocket API

**Same channels:** `orderbook_delta`, `ticker`, `trade`, `fill`, `user_orders`, `order_group_updates`, `market_lifecycle_v2` (market deactivation and activation only)

**Margin-only channel:** `corporate_actions` (corporate action notices for single-stock perps; no snapshot on subscribe)

**Not available on margin:** `market_positions`, `multivariate_market_lifecycle`, `multivariate`, `communications`

**Timestamp convention:** all timestamp fields in margin WebSocket payloads use Unix epoch milliseconds and an `_ms` suffix.

| Channel | Event contract | Margin |
| - | - | - |
| `orderbook_delta` | `ts` as RFC3339 datetime | `ts_ms` as Unix milliseconds |
| `ticker` | `ts` in Unix seconds and `time` as RFC3339 datetime | `ts_ms` (top level); nested `reference_price`/`settlement_mark_price`/`liquidation_mark_price` each carry `ts_ms`, and `funding_rate` carries `next_funding_time_ms` and `ts_ms` |
| `trade` | `ts` in Unix seconds | `ts_ms` in Unix milliseconds |
| `fill` | `ts` in Unix seconds | `ts_ms` in Unix milliseconds |
| `user_orders` | `created_time`, `last_update_time`, `expiration_time` as RFC3339 datetimes | `created_ts_ms`, `last_updated_ts_ms`, `expiration_ts_ms` as Unix milliseconds |

> [!NOTE]
>
> Margin WebSocket payloads no longer use RFC3339 timestamp strings. The `order_group_updates` channel already follows the same convention: its only timestamp field, `ts_ms`, is Unix epoch milliseconds.

### FIX API

> [!WARNING]
>
> API keys **should not be shared** between the event contract and margin FIX gateways.

**What's the same:** FIXT.1.1 / FIX50SP2 protocol, API key authentication (RSA or Ed25519), order lifecycle messages (NewOrderSingle, OrderCancelRequest, etc.), order groups, drop copy, and listener sessions all work the same way.

**Key differences:**

| | Event Contract FIX | Margin FIX |
| - | - | - |
| **Pricing** | Integer cents (1–99) | Decimal dollars up to 4 decimal places |
| **Session types** | 6 (NR, RT, DC, PT, RFQ, MD) | 4 (NR, RT, DC, MD) |
| **RFQ / Quotes** | Supported | Not available |
| **Market settlement reports** | Supported (on KalshiRT) | Not available |
| **UseDollars (21005)** | Optional logon flag | Always enabled (margin uses fixed-point dollar pricing by default) |

## Trading Behavior

### Order rejections

A rejected create, amend, decrease or cancel returns the standard error body. The `code` names the cause:

| HTTP | `code` | Cause |
| - | - | - |
| `400` | `invalid_order` | The request failed validation; `details` says why. A `reduce_only` order that is not immediate-or-cancel or fill-or-kill returns this, and a `post_only` order that would cross returns it with details `post only cross`. |
| `400` | `invalid_price` | The price is zero, off the market's `tick_size`, or outside a [price band](https://docs.kalshi.com/margin/price-banding.md). |
| `400` | `invalid_order_size` | The count is not allowed, including a fractional count on a market that trades whole contracts only. |
| `400` | `invalid_amend_quantity_for_order` | The amend or decrease would leave an invalid or fractional count. |
| `400` | `insufficient_balance` | The account does not have enough margin for the order. |
| `400` | `NOTIONAL_RISK_LIMIT_EXCEEDED` | The order would take you over a notional risk limit. Read your limits and usage with `GET /margin/notional_risk_limit`. |
| `400` | `exceeded_order_group_contracts_limit` | The order's group has hit its contracts limit. |
| `403` | `stock_perps_insider_blocked` | Your stocks application lists you as an insider of this company. |
| `409` | `fill_or_kill_insufficient_resting_volume` | A fill-or-kill order could not fill in full. |
| `409` | `market_inactive` | The market is halted, or outside its trading session. |
| `409` | `trading_is_paused` / `exchange_is_paused` | Trading or the exchange is paused. |
| `409` | `market_version_mismatch` | The `market_version` you sent is no longer current. |
| `409` | `stock_perps_application_required` | An approved stocks application is required to open or increase an equities position. |
| `409` | `TRADING_BLOCKED` | The account is blocked from trading, or is limited to reducing positions and sent an order that could rest. Use immediate-or-cancel orders to reduce. |
| `409` | `order_already_exists` | The `client_order_id` has already been used. |

`NOTIONAL_RISK_LIMIT_EXCEEDED` and `TRADING_BLOCKED` are returned in upper case; the other codes are lower case.

### Whole contracts

A market whose `fractional_trading_enabled` is `false` trades whole contracts only. Count fields still use the two-decimal fixed-point format, so send `"3"` or `"3.00"`, never `"2.50"`.

### Trading sessions

Some markets do not trade around the clock. A market's `schedule` object says whether it is open now and gives the next scheduled open or close; it is `null` for markets that trade 24/7. An order sent while the market is outside its session is rejected with `409` `market_inactive`, the same response as for a halted market.

### Funding times

Funding runs on a schedule set per asset class in US Eastern time, so the UTC time of a funding run moves by an hour when US daylight saving time starts or ends.

Crypto perps fund every 8 hours, at 12:00 AM, 8:00 AM and 4:00 PM Eastern. Other asset classes fund at their own time of day.

Read the next run for a market from `next_funding_time` on the funding rate estimate endpoint, or `next_funding_time_ms` on the WebSocket `ticker` channel, rather than hard-coding these times.

### Transfers around settlement, funding and corporate actions

Transfers out of your margin balance, and transfers between margin subaccounts, are refused from shortly before each scheduled settlement or funding run until the run has been processed, and while a cash corporate action is being processed. The response is `403` `permission_denied` with details `margin withdrawals are temporarily disabled during settlement and funding`; the details text is the same whichever of the three is in progress. This is not a permissions problem with your API key. Retry with a backoff until the transfer is accepted: the end of a settlement or funding run does not guarantee the next attempt succeeds, because a corporate action can hold transfers for longer.

### Exit triggers

* A fired trigger places a reduce-only, immediate-or-cancel **limit** order near the stop price, not a market order. In a fast market it can fill partially or not at all.
* If the fire order cannot be placed because the exchange is paused, the market is halted or outside its session, or a price band refuses the price, the trigger stays `active`. It is checked again against the current mark, and fires only if its condition is still met at a time when the order can be placed. A crossing that happened while the order could not be placed is not remembered, so if the mark has moved back the trigger does not fire.
* A stop-loss that would not fire before the position's estimated liquidation price is rejected with `400` `stop_loss_past_liquidation`. The check is best effort: it runs only when a liquidation price estimate is available for the position, so an accepted stop-loss is not a guarantee that it fires before liquidation.
* A trigger that conflicts with a resting closing order on the same position is rejected with `400` `close_order_blocks_exit_trigger`.
* A stop-loss or take-profit price that the current mark has already passed by more than 2% is rejected with `400`, when a fresh mark price is available. If the mark is missing or stale, this check is skipped; the trigger may still be accepted if its other validations pass, so a successful create does not prove the price was checked against the mark. A stop-loss equal to the take-profit, and legs on the wrong side of each other for the position's direction, are always rejected with `400`. For these the `message` describes the problem and the `code` is not a stable identifier, so branch on the HTTP status.
* A trigger canceled by a corporate action reports `status` `canceled` with no `status_reason`.

### Liquidation and other system fills

Orders the exchange places for you, for a liquidation, a fired exit trigger or an auto-rebalance, appear in your orders and fills with `order_source` `system`. Only the order carries `order_reason` (`liquidation`, `take_profit_stop_loss` or `auto_rebalance`). Fills over REST and the `fill` and `user_orders` WebSocket messages carry `order_source` alone, so look the order up by `order_id` to learn why it was placed.

### Unknown tickers on list endpoints

Filtering orders, positions, trades, the funding rate estimate or the premium index by a ticker that is not a margin market returns `200` with an empty result, not `404`.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.