---
url: https://docs.kalshi.com/changelog
lastmod: 2026-06-29T19:36:21.481Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# API Changelog

> Stay updated with API changes and version history

You can subscribe to the RSS changelog at `/changelog/rss.xml` if you'd like to stay ahead of breaking changes.

This changelog is a work in progress. As always, we welcome any feedback in our Discord #dev channel!

This changelog covers Kalshi's REST, WebSocket, and FIX APIs across both the
Predictions and Margin exchanges. Use the entry tags to filter by API
surface (`REST`, `WebSocket`, `FIX`) or exchange (`Predictions`, `Margin`).
FIX API changes, previously tracked on a separate page, now live here under
the `FIX` tag.

{/* changelog-tags: ["Upcoming"] */}

<Update
  label="June 26, 2026"
  tags={["REST", "Margin"]}
  rss={{
title: "Margin risk per-market metrics limited to single-position subaccounts and gross margin markets",
description: "Effective immediately, GET /trade-api/v2/margin/risk no longer populates per-market maintenance margin, leverage, or estimated liquidation price except for single-position subaccounts and gross margin markets."
}}
>
  Effective immediately, `GET /trade-api/v2/margin/risk` no longer populates per-market maintenance
  margin, leverage, or estimated liquidation price unless the data is for a
  subaccount with a single position or for a gross margin market.

  **Affected endpoints:**

  * `GET /trade-api/v2/margin/risk`
</Update>

<Update
  label="July 2, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Per-index exchange status",
description: "GET /trade-api/v2/exchange/status now returns a per-index exchange_index_statuses breakdown plus an intra_exchange_transfers_active field."
}}
>
  `GET /trade-api/v2/exchange/status` now returns two additional fields:

  * `intra_exchange_transfers_active` — whether intra-exchange transfers are
    currently permitted.
  * `exchange_index_statuses` — a per-index breakdown with one entry per exchange
    index. Each entry carries `exchange_index`, `exchange_active`,
    `trading_active`, and `intra_exchange_transfers_active`.

  **Affected endpoints:**

  * `GET /trade-api/v2/exchange/status`
</Update>

<Update
  label="July 2, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Per-index subaccount balances",
description: "GET /trade-api/v2/portfolio/subaccounts/balances now returns a balance per exchange index, each with an exchange_index field."
}}
>
  `GET /trade-api/v2/portfolio/subaccounts/balances` now returns one balance per
  exchange index. Each entry includes an `exchange_index` field, so a subaccount
  with funds on multiple indexes appears as multiple entries rather than a single
  combined row.

  **Affected endpoints:**

  * `GET /trade-api/v2/portfolio/subaccounts/balances`
</Update>

<Update
  label="July 2, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "More specific FIX rejects for cancel/replace failures",
description: "OrderCancelReject (35=9) responses now carry the specific reason in Text<58> and CxlRejReason<102> instead of INTERNAL_ERROR."
}}
>
  Previously, some `OrderCancelReplaceRequest (35=G)` and
  `OrderCancelRequest (35=F)` failures came back as an `OrderCancelReject (35=9)`
  with `Text<58>=INTERNAL_ERROR`, even though the exchange had cleanly rejected
  the request for a specific reason. The most common case was replacing an order
  with a price the market does not accept, for example a sub-tick price on a
  market that does not support fractional prices.

  These rejects now report the underlying reason in `Text<58>`, with a
  corresponding `CxlRejReason<102>`:

  * Invalid price (off-tick, out-of-band, `$0`, or `$1`): `Text<58>=INVALID_PRICE`, `CxlRejReason<102>=99` (Other)
  * Unknown market: `Text<58>=MARKET_NOT_FOUND`, `CxlRejReason<102>=99` (Other)
  * Duplicate client order ID: `Text<58>=ORDER_ALREADY_EXISTS`, `CxlRejReason<102>=6` (Duplicate ClOrdID)

  A rejected cancel or replace does not change the original order; it continues
  to rest unchanged. Clients that branched on `Text<58>=INTERNAL_ERROR` for these
  cases should switch to reading the specific reason text.
</Update>

<Update
  label="June 25, 2026"
  tags={["REST", "FIX", "Predictions"]}
  rss={{
title: "RFQ quote retention and RFQ-scoped quote actions",
description: "RFQ quotes are only durably queryable after acceptance, and quote actions now support including the RFQ ID alongside the quote ID."
}}
>
  Effective immediately, RFQ quotes are no longer guaranteed to remain queryable
  unless they have reached a post-acceptance state: `accepted`, `confirmed`, or
  `executed`. Open quotes and cancelled quotes may still be returned on a
  best-effort basis, but clients should not treat them as durable records. If an
  open quote is cleared during a server roll or restart, it should be treated as
  effectively cancelled and no longer actionable, even if there is no queryable
  cancelled quote record. Later requests for that quote may return
  `404 Not Found`.

  Clients should store the RFQ ID returned for each RFQ and include it alongside
  the quote ID when performing quote actions. REST now supports RFQ-scoped quote
  action endpoints using `rfq_id` as a path parameter:

  * `DELETE /trade-api/v2/communications/rfqs/{rfq_id}/quotes/{quote_id}`
  * `PUT /trade-api/v2/communications/rfqs/{rfq_id}/quotes/{quote_id}/accept`
  * `PUT /trade-api/v2/communications/rfqs/{rfq_id}/quotes/{quote_id}/confirm`

  The existing quote-ID-only endpoints remain supported for now:

  * `DELETE /trade-api/v2/communications/quotes/{quote_id}`
  * `PUT /trade-api/v2/communications/quotes/{quote_id}/accept`
  * `PUT /trade-api/v2/communications/quotes/{quote_id}/confirm`

  For FIX, quote actions now accept optional `RfqId<21023>` together with
  `QuoteId<117>` on `QuoteCancel (35=Z)`, `QuoteConfirm (35=U7)`, and
  `AcceptQuote (35=UA)`. When `RfqId<21023>` is provided, the quote must belong
  to that RFQ; when it is omitted, the exchange will continue to resolve the RFQ
  from `QuoteId<117>` on a best-effort basis.

  We expect `rfq_id` / `RfqId<21023>` to become required for quote actions in a
  future migration, but this requirement will not take effect within the next
  7 days. Start sending the RFQ ID now to avoid future migration work.

  **Affected endpoints:**

  * `GET /trade-api/v2/communications/quotes`
  * `GET /trade-api/v2/communications/quotes/{quote_id}`
  * `DELETE /trade-api/v2/communications/quotes/{quote_id}`
  * `PUT /trade-api/v2/communications/quotes/{quote_id}/accept`
  * `PUT /trade-api/v2/communications/quotes/{quote_id}/confirm`
  * `DELETE /trade-api/v2/communications/rfqs/{rfq_id}/quotes/{quote_id}`
  * `PUT /trade-api/v2/communications/rfqs/{rfq_id}/quotes/{quote_id}/accept`
  * `PUT /trade-api/v2/communications/rfqs/{rfq_id}/quotes/{quote_id}/confirm`

  **Affected FIX messages:**

  * `QuoteCancel (35=Z)`
  * `QuoteConfirm (35=U7)`
  * `AcceptQuote (35=UA)`
</Update>

<Update
  label="June 25, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "API usage tier qualification requirements halved",
description: "Qualification requirements for all tiers has been halved."
}}
>
  Qualification requirements for all tiers has been halved.
</Update>

<Update
  label="June 25, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX exchange index routing",
description: "FIX order entry supports ExDestination for exchange index selection, including auto-routing for new orders and cancels."
}}
>
  FIX order entry now supports `ExDestination<100>` for exchange index
  selection. `NewOrderSingle (35=D)` and `OrderCancelRequest (35=F)` may use
  `ExDestination=-1` to auto-route by market ticker.

  ExecutionReport `ExecID<17>` values for non-default exchange indexes include
  the exchange index as `clock;event;exchange_index`.

  Note: exchange index `0` is currently the only exchange index available in
  production.
</Update>

<Update
  label="June 24, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "RFQ quotes support post-only on FIX",
description: "FIX RFQ Quote creation supports ExecInst=6 to request post-only behavior."
}}
>
  FIX RFQ `Quote (35=S)` creation now supports `ExecInst<18>=6`
  (ParticipantDontInitiate) to request post-only quote behavior.
</Update>

<Update
  label="June 23, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Get Quote rate-limit cost reduced to 2 tokens",
description: "GET /trade-api/v2/communications/quotes/{quote_id} will cost 2 tokens per request, matching create and delete quote."
}}
>
  `GET /trade-api/v2/communications/quotes/{quote_id}` will cost 2 tokens per
  request, matching the non-default cost for quote create and delete.

  **Affected endpoints:**

  * `GET /trade-api/v2/communications/quotes/{quote_id}`
</Update>

<Update
  label="June 20, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "RFQ quote market and event filters removed",
description: "GET /trade-api/v2/communications/quotes no longer supports the market_ticker or event_ticker query parameters, effective immediately."
}}
>
  `GET /trade-api/v2/communications/quotes` no longer supports filtering by
  `market_ticker` or `event_ticker`, effective immediately. Requests should
  filter quotes by user, RFQ, status, or update time instead.

  **Affected endpoints:**

  * `GET /trade-api/v2/communications/quotes`
</Update>

<Update
  label="June 19, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Communications RFQ and quote retention window reduced",
description: "Closed RFQs and cancelled quotes will be retained for 7 days instead of 14 days."
}}
>
  Closed RFQs and cancelled quotes returned by the communications APIs will be
  retained for 7 days after their last update, reduced from the previous
  14-day retention window.

  **Affected endpoints:**

  * `GET /communications/rfqs`
  * `GET /communications/quotes`
</Update>

<Update
  label="July 2, 2026"
  tags={["REST", "FIX", "Predictions"]}
  rss={{
title: "Sub-account-restricted API keys",
description: "API keys can now be restricted to a single sub-account at creation; a restricted key may only read and trade on that sub-account."
}}
>
  You can now restrict an API key to a single sub-account when you create it.
  Pass `subaccount` (0-63) to `POST /api_keys` or `POST /api_keys/generate`. A
  restricted key may only read and trade on that one sub-account: requests that
  target another sub-account are rejected, and the key cannot transfer funds
  between sub-accounts or create sub-accounts. Restricted keys can use supported
  REST and FIX order-entry or market-data sessions; they cannot open WebSocket,
  FIX listener, drop-copy, RFQ, or retransmission sessions. `GET /api_keys`
  returns each key's `subaccount` (absent when the key is unrestricted). Omit
  `subaccount` to create an unrestricted key; existing keys are unaffected.

  **Affected endpoints:**

  * `POST /api_keys`
  * `POST /api_keys/generate`
  * `GET /api_keys`
</Update>

<Update
  label="June 18, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "settlement_sources added to the events API",
description: "GET /events and GET /events/{event_ticker} now include settlement_sources for each event."
}}
>
  The events API now returns `settlement_sources` on each event, mirroring the
  field already available on series. Each entry has a `name` and `url`
  identifying an official source used to determine the event's markets.

  **Affected endpoints:**

  * `GET /events`
  * `GET /events/{event_ticker}`
</Update>

<Update
  label="June 18, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Strike type and cap strike on market_lifecycle_v2 metadata_updated",
description: "metadata_updated events on the market_lifecycle_v2 channel now include strike_type and cap_strike alongside floor_strike."
}}
>
  `metadata_updated` events on the `market_lifecycle_v2` channel now include
  `strike_type` and `cap_strike` (plus `custom_strike` for custom/structured
  markets) alongside `floor_strike`. Consumers can reconstruct a market's full
  strike range directly from the push — e.g. a `between` band needs both floor
  and cap, and `less` markets are cap-only — without a follow-up fetch against
  the eventually-consistent read model.

  `metadata_updated` is now also emitted when a market's `cap_strike` or
  `strike_type` changes; previously only `floor_strike` and `yes_sub_title`
  changes triggered it.
</Update>

<Update
  label="June 18, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "RFQ quote identity on FIX",
description: "FIX RFQ Quote notifications now include the quoter public communications ID."
}}
>
  FIX RFQ `Quote (35=S)` notifications sent to RFQ creators now include the
  quoter's public communications ID in `NoPartyIDs` with `PartyRole=35`
  (Liquidity Provider).
</Update>

<Update
  label="June 18, 2026"
  tags={["FIX", "Predictions", "Margin"]}
  rss={{
title: "Trade entries in FIX market data",
description: "FIX market data incremental refreshes now include trade entries"
}}
>
  FIX market data incremental refreshes now include trades as `MDEntryType<269>=2`.
  See FIX docs for more information.
</Update>

<Update
  label="June 18, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Legacy order mutation endpoints deprecated",
description: "Legacy /portfolio/orders mutation endpoints will be deprecated sometime between June 18 and June 25. Use the V2 /portfolio/events/orders endpoints instead."
}}
>
  Legacy `/portfolio/orders` mutation endpoints will be deprecated sometime
  between June 18 and June 25. Once deprecated, calls to these endpoints will return
  `Please switch to the V2 endpoints` with a link to the V2 order API
  reference.

  Use the V2 event-order endpoints:

  * [Create Order (V2)](/api-reference/orders/create-order-v2)
  * [Cancel Order (V2)](/api-reference/orders/cancel-order-v2)
  * [Decrease Order (V2)](/api-reference/orders/decrease-order-v2)
  * [Batch Create Orders (V2)](/api-reference/orders/batch-create-orders-v2)
  * [Batch Cancel Orders (V2)](/api-reference/orders/batch-cancel-orders-v2)
  * [Amend Order (V2)](/api-reference/orders/amend-order-v2)

  **Affected endpoints:**

  * `POST /trade-api/v2/portfolio/orders`
  * `DELETE /trade-api/v2/portfolio/orders/{order_id}`
  * `POST /trade-api/v2/portfolio/orders/{order_id}/decrease`
  * `POST /trade-api/v2/portfolio/orders/batched`
  * `DELETE /trade-api/v2/portfolio/orders/batched`
  * `POST /trade-api/v2/portfolio/orders/{order_id}/amend`
</Update>

<Update
  label="June 18, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Event tickers filter on GET /trade-api/v2/events",
description: "GET /trade-api/v2/events supports a tickers query parameter to filter by a comma-separated list of event tickers."
}}
>
  `GET /trade-api/v2/events` now supports a `tickers` query parameter to
  filter the response to a comma-separated list of event tickers.

  **Affected endpoints:**

  * `GET /trade-api/v2/events`
</Update>

<Update
  label="June 18, 2026"
  rss={{
title: "Subaccount on margin positions",
description: "Each position returned by GET /trade-api/v2/margin/positions now includes the subaccount number that holds it."
}}
>
  Each position returned by `GET /trade-api/v2/margin/positions` now includes
  a `subaccount` field with the subaccount number that holds it (0 for primary,
  1-63 for subaccounts).

  **Affected endpoints:**

  * `GET /trade-api/v2/margin/positions`
</Update>

<Update
  label="June 18, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "Block-trade accept API key permissions",
description: "API keys can use narrow block-trade accept scopes for proposal viewing, balance checks, and proposal acceptance."
}}
>
  API keys can use `read::block_trade_accept` and
  `write::block_trade_accept` to grant narrow block-trade proposal viewing and
  acceptance permissions without granting broad account `read` or `write`
  access. Use `read::portfolio_balance` for narrow balance checks. Parent
  scopes still grant broad access, so standard `read` and `write` keys continue
  to work.

  **Affected endpoints:**

  * `GET /trade-api/v2/communications/block-trade-proposals`
  * `POST /trade-api/v2/communications/block-trade-proposals/{block_trade_proposal_id}/accept`
  * `GET /trade-api/v2/portfolio/balance`
</Update>

<Update
  label="June 18, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Sanity limits enforced on orderbook subscriptions",
description: "Sanity limits enforced on orderbook subscriptions."
}}
>
  Sanity limits enforced on orderbook subscriptions:

  * Max 500k market subscriptions per session.
  * Max 10k/s commands per second enforced.
</Update>

<Update
  label="June 18, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Quote time filters and pagination fix",
description: "GET /trade-api/v2/communications/quotes supports min_ts/max_ts filters on last update time, and cursor pagination no longer ends early on large result sets."
}}
>
  `GET /trade-api/v2/communications/quotes` now supports `min_ts` and `max_ts`
  query parameters to restrict results to quotes last updated within a time
  window, formatted as Unix Timestamps.

  Also fixes cursor pagination on this endpoint: previously, paging through a
  large set of quotes could end early and silently drop most of the results.

  **Affected endpoints:**

  * `GET /trade-api/v2/communications/quotes`
</Update>

<Update
  label="June 11, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "API usage volume progress endpoint",
description: "A new endpoint reports your trailing 30d volume and earn/keep volume goals for volume-based API usage tiers."
}}
>
  New endpoint: `GET /trade-api/v2/account/api_usage_level/volume_progress` reports your trailing 30d volume and the earn/keep volume goals for each volume-based API usage tier.
</Update>

<Update
  label="June 11, 2026"
  tags={["REST", "Margin"]}
  rss={{
title: "Perps mark prices on margin markets",
description: "Perps margin market responses now include mark prices and their timestamps."
}}
>
  Perps margin market responses now include mark prices and their timestamps.

  **Affected endpoints:**

  * `GET /trade-api/v2/margin/markets`
  * `GET /trade-api/v2/margin/markets/{ticker}`
</Update>

<Update
  label="June 11, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "Self-serve Advanced API usage tier upgrade",
description: "Users can now self-promote to the Advanced API tier by calling POST /trade-api/v2/account/api_usage_level/upgrade."
}}
>
  Users can now self-promote to the Advanced API tier by calling
  `POST /trade-api/v2/account/api_usage_level/upgrade`.

  **Affected endpoints:**

  * `POST /trade-api/v2/account/api_usage_level/upgrade`
</Update>

<Update
  label="June 11, 2026"
  tags={["REST", "Margin"]}
  rss={{
title: "Margin fee-tier endpoint returns active rates",
description: "GET /trade-api/v2/margin/fee_tiers now returns active maker and taker fee rates instead of zeroing the response."
}}
>
  `GET /trade-api/v2/margin/fee_tiers` now returns active maker and taker
  fee rates for each eligible margin market instead of zeroing the response.

  **Affected endpoints:**

  * `GET /trade-api/v2/margin/fee_tiers`
</Update>

<Update
  label="June 11, 2026"
  tags={["REST", "WebSocket", "Margin"]}
  rss={{
title: "Perps volume and open interest notional fields",
description: "Perps REST and WebSocket market data now include dollar notional companions for lifetime volume, 24h volume, and open interest contract counts."
}}
>
  Perps market data now includes dollar notional companions for lifetime volume,
  24h volume, and open interest contract-count fields. Perps candlesticks also include a
  period-specific volume notional field. These fields are additive and preserve
  the existing contract-count fields.

  **Affected endpoints and channels:**

  * `GET /trade-api/v2/margin/markets`
  * `GET /trade-api/v2/margin/markets/{ticker}`
  * `GET /trade-api/v2/margin/markets/{ticker}/candlesticks`
  * WebSocket `margin_ticker`
</Update>

<Update
  label="June 11, 2026"
  tags={["REST", "Margin"]}
  rss={{
title: "Tick size added to GET Margin Markets",
description: "Tick size added to GET Margin Markets."
}}
>
  Margin market responses now report `tick_size`.

  **Affected endpoints:**

  * `GET /trade-api/v2/margin/markets`
  * `GET /trade-api/v2/margin/markets/{ticker}`
</Update>

<Update
  label="June 11, 2026"
  tags={["REST", "FIX", "Predictions"]}
  rss={{
title: "Fractional quantities for RFQs",
description: "RFQs will support fractional contract quantities in API and FIX flows."
}}
>
  RFQs will support fractional contract quantities beginning with the June 11,
  2026 release. API clients will be able to create RFQs with positive
  `contracts_fp` values in `0.01`-contract increments, and quote responses may
  include fractional values in fixed-point quantity fields such as
  `yes_contracts_offered_fp` and `no_contracts_offered_fp`.

  FIX RFQ flows may also carry fractional quantities in `OrderQty(38)`,
  `BidSize(134)`, and `OfferSize(135)` on `QuoteRequest (35=R)`,
  `Quote (35=S)`, and `QuoteStatusReport (35=AI)` messages.

  **Affected endpoints and FIX flows:**

  * `POST /communications/rfqs`
  * `GET /communications/rfqs`
  * `GET /communications/quotes`
  * FIX `QuoteRequest (35=R)`, `Quote (35=S)`, and `QuoteStatusReport (35=AI)`
</Update>

<Update
  label="June 5, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "Introducing automated API rate-limit tiers",
description: "Premier and above can now be earned automatically from your trading volume, with tier grants viewable via the API. Live Thursday, June 11, 2026."
}}
>
  We're introducing automated API rate-limit tiers: Premier, Paragon, and Prime are now earned
  automatically from your trailing trading volume (and can still be granted manually). Each tier is
  backed by a **grant**, which you can view in the new `grants` array of
  `GET /trade-api/v2/account/limits`.

  See [Rate Limits and Tiers](/getting_started/rate_limits) for the thresholds and how grants work.

  **Live Thursday, June 11, 2026.**

  **Affected endpoints:**

  * `GET /trade-api/v2/account/limits`
  * `GET /trade-api/v2/account/limits/perps`
</Update>

<Update
  label="June 4, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Legacy order mutation rate-limit costs increase to 10x V2",
description: "Legacy /portfolio/orders mutation and batch endpoint rate-limit costs will be 10x the corresponding V2 /portfolio/events/orders endpoint costs. V2 endpoint costs are unchanged."
}}
>
  Legacy `/portfolio/orders` mutation and batch endpoint rate-limit token costs
  will be 10x the corresponding V2 `/portfolio/events/orders` endpoint costs.
  The V2 endpoint costs are unchanged.

  Switch to the V2 event-order endpoints to keep full write rate-limit access
  for these workflows:

  * [Create Order (V2)](/api-reference/orders/create-order-v2)
  * [Cancel Order (V2)](/api-reference/orders/cancel-order-v2)
  * [Amend Order (V2)](/api-reference/orders/amend-order-v2)
  * [Decrease Order (V2)](/api-reference/orders/decrease-order-v2)
  * [Batch Create Orders (V2)](/api-reference/orders/batch-create-orders-v2)
  * [Batch Cancel Orders (V2)](/api-reference/orders/batch-cancel-orders-v2)

  **Affected endpoints:**

  * `POST /trade-api/v2/portfolio/orders` - cost `50` to `100`
  * `DELETE /trade-api/v2/portfolio/orders/{order_id}` - cost `10` to `20`
  * `POST /trade-api/v2/portfolio/orders/{order_id}/amend` - cost `50` to `100`
  * `POST /trade-api/v2/portfolio/orders/{order_id}/decrease` - cost `50` to `100`
  * `POST /trade-api/v2/portfolio/orders/batched` - cost `50` to `100`
  * `DELETE /trade-api/v2/portfolio/orders/batched` - cost `10` to `20`
</Update>

<Update
  label="June 4, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Post Only Cross Cancel update reason added",
description: "Post Only Cross Cancel update reason added"
}}
>
  When a post-only order would cross the book, the `last_update_reason` field is
  now reported as `PostOnlyCrossCancel` instead of `Decrease`.

  **Affected surfaces:**

  * `GET /portfolio/orders`
  * `GET /portfolio/order/{orderId}`
  * `orderbook_delta` WebSocket channel
</Update>

<Update
  label="June 4, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.31: POST_ONLY_CROSS cancel reason on ExecutionReports",
description: "ExecutionReports for post-only orders canceled because they would cross now carry a Text (58) reason of POST_ONLY_CROSS."
}}
>
  **FIX API v1.0.31**

  * ExecutionReports (35=8) for post-only orders canceled because they would cross now carry a Text (58) reason of `POST_ONLY_CROSS`
</Update>

<Update
  label="June 4, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.30: Reject reasons distinguish unconfirmed from definite rejects",
description: "EXCHANGE_UNAVAILABLE now means the gateway could not confirm whether the order was applied, while the new INTERNAL_ERROR value indicates a reject from a healthy exchange where the order was not applied. Previously both cases returned EXCHANGE_UNAVAILABLE."
}}
>
  **FIX API v1.0.30**

  * Starting Thursday, June 4, 2026, the FIX API ExecutionReport (35=8) rejection Text (58) distinguishes rejects where the order's outcome is unconfirmed from rejects where the order was definitely not applied
    * `EXCHANGE_UNAVAILABLE` now means the gateway could not confirm whether the order was applied (the exchange was unreachable, the request timed out, or it was interrupted after the order may have been accepted). Reconcile the order's state, or retry with the same ClOrdID
    * `INTERNAL_ERROR` is a new value for a reject from a healthy exchange that could not be mapped to a specific reason. The order was not applied, so it is safe to fix and resubmit
    * Previously both cases returned `EXCHANGE_UNAVAILABLE`
</Update>

<Update
  label="June 2, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "Transfer-scoped API key permissions",
description: "API keys can now use write::transfer for transfer-scoped write endpoint access."
}}
>
  API keys can now use `write::transfer` to grant access only to
  transfer-scoped write endpoints without granting the broad `write` parent
  scope. Parent scopes still grant broad access, so `write` continues to grant
  all write endpoint groups, including transfer-scoped writes.
</Update>

<Update
  label="June 1, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Legacy order mutation rate-limit costs increase to 5x V2",
description: "Legacy /portfolio/orders mutation and batch endpoint rate-limit costs will be 5x the corresponding V2 /portfolio/events/orders endpoint costs. V2 endpoint costs are unchanged."
}}
>
  Legacy `/portfolio/orders` mutation and batch endpoint rate-limit token costs
  will be 5x the corresponding V2 `/portfolio/events/orders` endpoint costs.
  The V2 endpoint costs are unchanged.

  **Affected endpoints:**

  * `POST /trade-api/v2/portfolio/orders` - cost `15` to `50`
  * `DELETE /trade-api/v2/portfolio/orders/{order_id}` - cost `3` to `10`
  * `POST /trade-api/v2/portfolio/orders/{order_id}/amend` - cost `15` to `50`
  * `POST /trade-api/v2/portfolio/orders/{order_id}/decrease` - cost `15` to `50`
  * `POST /trade-api/v2/portfolio/orders/batched` - cost `15` to `50`
  * `DELETE /trade-api/v2/portfolio/orders/batched` - cost `3` to `10`
</Update>

<Update
  label="May 29, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Block trade indicators and filters for public trades",
description: "Public V2 trade endpoints now identify block trades with is_block_trade and support filtering by block trade status."
}}
>
  Public V2 trade responses now include `is_block_trade`, which identifies
  trades matched off-book as block trades. The same endpoints now support an
  optional `is_block_trade` query parameter; omit it to return all trades, set
  it to `true` for only block trades, or set it to `false` for only non-block
  trades.

  **Affected endpoints:**

  * `GET /trade-api/v2/markets/trades`
  * `GET /trade-api/v2/historical/trades`
</Update>

<Update
  label="May 29, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.29: Security Status market lifecycle on KalshiMD",
description: "Adds market lifecycle support on the KalshiMD session via SecurityStatusRequest (35=e) subscriptions and SecurityStatus (35=f) trading status change streams."
}}
>
  **FIX API v1.0.29**

  * Added market lifecycle support on the `KalshiMD` session via Security Status messages
    * `SecurityStatusRequest` (35=e) subscribes (`263=1`) or unsubscribes (`263=2`) a single `Symbol<55>`
    * `SecurityStatus` (35=f) streams `SecurityTradingStatus<326>` changes: `3`=resume (activated), `2`=trading halt, `100`=Kalshi determined, `101`=Kalshi settled
    * Changes-only: no initial snapshot is sent on subscribe
    * For more info see [Market Data](/fix/market-data)
</Update>

<Update
  label="May 28, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Fixed-point dollars added to GET /portfolio/balance",
description: "Starting Thursday, May 28, 2026, GET /portfolio/balance returns balance_dollars alongside the existing balance field. Direct member balances use centi-cent precision."
}}
>
  Starting Thursday, May 28, 2026, `GET /portfolio/balance` returns `balance_dollars`, the member's available balance as a fixed-point dollar string, alongside the existing integer-cent `balance` field. This precision change applies only to direct members of the exchange: direct member balances are aligned to centi-cent (`$0.0001`, or `0.01c`) precision. The legacy `balance` field truncates any sub-cent amount, so use `balance_dollars` for exact values.

  See [Fee Rounding](/getting_started/fee_rounding) for balance alignment and rounding mechanics.
</Update>

<Update
  label="May 28, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.28: Market data on dedicated KalshiMD session",
description: "Adds order book market data on the dedicated KalshiMD session, with MarketDataRequest for snapshots and snapshot-plus-updates subscriptions, full and incremental refresh messages, and request rejects."
}}
>
  **FIX API v1.0.28**

  * Added market data support on the dedicated `KalshiMD` session
    * Subscriptions are identified by `Symbol<55>`
    * `MarketDataRequest` (35=V) requests order book snapshots (`263=0`) or snapshot-plus-updates subscriptions (`263=1`); cancel with `263=2` (symbols in `55`, or none to cancel all)
    * `MarketDataSnapshotFullRefresh` (35=W) returns the full aggregated book; `MarketDataIncrementalRefresh` (35=X) streams subsequent level changes
    * `MarketDataRequestReject` (35=Y) is sent when a request cannot be accepted
    * For more info see [Market Data](/fix/market-data)
</Update>

<Update
  label="May 28, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.27: Four-decimal BALANCE collateral changes for direct members",
description: "Starting Thursday, May 28, 2026, direct member BALANCE collateral changes on ExecutionReport (35=8) may be emitted with four decimal places."
}}
>
  **FIX API v1.0.27**

  * Starting Thursday, May 28, 2026, direct member BALANCE collateral changes on ExecutionReport (35=8) may be emitted with four decimal places
</Update>

<Update
  label="May 25, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Legacy order mutation rate-limit costs updated",
description: "Effective Monday, May 25, 2026, legacy /portfolio/orders mutation and batch endpoint rate-limit costs are increased. The V2 /portfolio/events/orders endpoints are unchanged."
}}
>
  Effective Monday, May 25, 2026, rate-limit token costs for legacy
  `/portfolio/orders` mutation and batch endpoints are increased. The V2
  `/portfolio/events/orders` endpoints are unchanged.

  **Affected endpoints:**

  * `POST /trade-api/v2/portfolio/orders` - cost `10` to `15`
  * `DELETE /trade-api/v2/portfolio/orders/{order_id}` - cost `2` to `3`
  * `POST /trade-api/v2/portfolio/orders/{order_id}/amend` - cost `10` to `15`
  * `POST /trade-api/v2/portfolio/orders/{order_id}/decrease` - cost `10` to `15`
  * `POST /trade-api/v2/portfolio/orders/batched` - cost `10` to `15`
  * `DELETE /trade-api/v2/portfolio/orders/batched` - cost `2` to `3`
</Update>

<Update
  label="May 21, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "V2 cancel/amend response correctness",
description: "In certain uncommon cases, V2 cancel and amend responses don't describe the order that was cancelled or amended. The legacy /portfolio/orders* rate-limit cost bump is delayed until May 21."
}}
>
  In certain uncommon cases, responses from `DELETE /trade-api/v2/portfolio/events/orders/{order_id}` and `POST /trade-api/v2/portfolio/events/orders/{order_id}/amend` do not describe the order that was cancelled or amended — the `order_id`, `client_order_id`, and quantity fields (`reduced_by_centicount`, `remaining_centicount`, fill fields) in the response may not correspond to your request. The cancel or amend itself executes correctly against the intended order; only the response body is affected. Downstream order and position state are correct.

  As a result, the previously announced rate-limit cost bump on the legacy `/portfolio/orders*` endpoints is delayed until May 21.

  **Affected endpoints:**

  * `DELETE /trade-api/v2/portfolio/events/orders/{order_id}`
  * `POST /trade-api/v2/portfolio/events/orders/{order_id}/amend`
</Update>

<Update
  label="May 18, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.26: SplitCollateralReturn Logon flag",
description: "Adds the SplitCollateralReturn (21027) Logon flag, which adds SingleMarketCollateralReturn and RangedMarketCollateralReturn tags to trade Execution Reports as informational subsets of the existing BALANCE collateral change."
}}
>
  **FIX API v1.0.26**

  * Added `SplitCollateralReturn` (21027) Logon flag
    * With Logon flag `21027=Y`, Execution Reports with `ExecType=Trade` include two new tags:
      * `SingleMarketCollateralReturn` (21030): collateral freed from reducing/closing a position in a single market
      * `RangedMarketCollateralReturn` (21031): collateral freed from MECNET/DIRECNET netting across a market group
    * Both values are in dollars and only present when non-zero
    * These are informational subsets of the existing BALANCE collateral change — they describe components within the total balance delta
    * Without `21027`, Execution Reports remain unchanged (existing behavior)
</Update>

<Update
  label="May 12, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "reduce_by supported on V2 decrease endpoint",
description: "POST /portfolio/events/orders/{order_id}/decrease now accepts reduce_by in addition to reduce_to. Exactly one must be provided."
}}
>
  `POST /trade-api/v2/portfolio/events/orders/{order_id}/decrease` now
  accepts `reduce_by` (fixed-point contract count) in addition to
  `reduce_to`. Exactly one of the two must be provided.
</Update>

<Update
  label="May 12, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Subaccount creation for direct members",
description: "Subaccount creation now supported for all direct members with advanced API access."
}}
>
  Subaccount creation now supported for all direct members with advanced API access.
</Update>

<Update
  label="May 12, 2026"
  tags={["WebSocket", "Predictions", "Margin"]}
  rss={{
title: "WebSocket error code list documented",
description: "The WebSocket docs now include the current public error code list, and code 25 is now returned for subscription buffer overflow."
}}
>
  The WebSocket docs now include the current public error code list with each
  code's name, message, description, and user-error classification.

  WebSocket error code `25` is now returned as `Subscription buffer overflow`
  when a subscription's event buffer overflows during a message burst. When this
  happens, subscribe to a smaller subset of data, or ensure that your connection
  read throughput is optimized.

  See the [WebSocket error messages](/websockets/websocket-connection#error-messages)
  section for the full list.
</Update>

<Update
  label="May 11, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Cancelled quotes are automatically deleted after 14 days",
description: "Cancelled quotes are now automatically deleted 14 days after cancellation."
}}
>
  Cancelled quotes are now automatically deleted 14 days after cancellation. Previously, only quotes associated with closed RFQs were cleaned up. This applies to all cancelled quotes regardless of their parent RFQ status.

  Affected endpoint: `GET /communications/quotes`.
</Update>

<Update
  label="May 11, 2026"
  tags={["REST", "Margin"]}
  rss={{
title: "/margin/fee_tiers response replaced with per-market fee rates",
description: "GET /trade-api/v2/margin/fee_tiers now returns maker_fee_rates and taker_fee_rates maps (ticker -> rate as a decimal fraction of notional). The maker_fee_tiers and taker_fee_tiers fields have been removed."
}}
>
  `GET /trade-api/v2/margin/fee_tiers` now returns `maker_fee_rates` and
  `taker_fee_rates`. Each is a map from market ticker to the fee rate as
  a decimal fraction of notional (e.g. `0.0008` = 0.08% = 8 bps). Compute
  the expected fee directly as `notional * rate`.

  The previous `maker_fee_tiers` and `taker_fee_tiers` tier-name maps have
  been removed from the response.

  **Affected endpoints:**

  * `GET /trade-api/v2/margin/fee_tiers`
</Update>

<Update
  label="May 11, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "metadata_updated WS event now includes yes_sub_title",
description: "The market_lifecycle_v2 metadata_updated event now emits yes_sub_title when a market's subtitle changes."
}}
>
  The `metadata_updated` event on the `market_lifecycle_v2` WebSocket channel
  now includes `yes_sub_title` as a top-level field when a market's yes
  subtitle changes.

  **Affected channels:**

  * `market_lifecycle_v2`
</Update>

<Update
  label="May 8, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.25: BidSize and OfferSize on QuoteStatusReport",
description: "BidSize (134) and OfferSize (135) are now conditionally offered on QuoteStatusReport (35=AI)."
}}
>
  **FIX API v1.0.25**

  * BidSize (134) and OfferSize (135) conditionally offered on QuoteStatusReport (35=AI).
</Update>

<Update
  label="May 7, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Order group creation response includes subaccount",
description: "CreateOrderGroup now returns the subaccount that owns the created order group."
}}
>
  `CreateOrderGroup` now returns `subaccount`, the subaccount number that owns the created order group. The value is `0` for the primary account and `1-63` for subaccounts.

  Affected endpoint: `POST /portfolio/order_groups/create`.
</Update>

<Update
  label="May 7, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "RFQ User Filter on Get Quotes",
description: "RFQ User Filter on Get Quotes"
}}
>
  Added `rfq_user_filter` to `GetQuotes` for filtering by quotes in response to RFQs created by the authenticated user.

  Affected endpoint: `GET /communications/quotes`.
</Update>

<Update
  label="May 7, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.24: OrderGroupResponse echoes AllocAccount",
description: "OrderGroupResponse (UOH) now echoes AllocAccount (tag 79), with 79=0 for the primary account and 79=1-63 for subaccounts."
}}
>
  **FIX API v1.0.24**

  * OrderGroupResponse (UOH) now echoes AllocAccount (tag 79), with `79=0` for the primary account and `79=1-63` for subaccounts
</Update>

<Update
  label="May 6, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Normalized outcome_side and book_side on Order, Fill, and Trade responses",
description: "REST and WebSocket Order, Fill, and Trade responses now include outcome_side (yes/no) and book_side (bid/ask), each carrying the full directional bit so the action × side matrix is no longer required to interpret a response."
}}
>
  Order, Fill, and Trade responses now include two new normalized direction
  fields. Each carries the full directional bit on its own — combining
  `action` with `side` is no longer required to know what the user is
  positioned for. The two fields encode the same bit in two vocabularies:
  `bid` is equivalent to `yes`, `ask` is equivalent to `no`.

  * `outcome_side` (`yes` | `no`) — the outcome the user profits from.
    Buy-yes and sell-no produce `yes`; buy-no and sell-yes produce `no`.
  * `book_side` (`bid` | `ask`) — same bit in book vocabulary.

  Affected REST responses (`svc-api2`):

  * `Order` (GetOrders, GetOrder, GetHistoricalOrders, and order-write responses)
  * `Fill` (GetFills, GetFillsHistorical)
  * `Trade` (public) — fields are named `taker_outcome_side` and `taker_book_side` to match the existing `taker_side`

  Affected WebSocket channels (`svc-apiexternal-ws`):

  * `user_orders`
  * `fill`
  * `trade` — `taker_outcome_side` and `taker_book_side`

  `outcome_side` describes directional exposure only; it does not change
  the order's price. An order at price `p` with `outcome_side=no` is
  matched by an order at the same price `p` with `outcome_side=yes` —
  both parties trade at the same price, just on opposite directions.

  Existing `action`, `side`, `is_yes`, `purchased_side`, and `taker_side`
  fields are now marked deprecated. `outcome_side` and `book_side` are
  the canonical way to determine order/trade direction going forward.
  The legacy fields **will not be removed before May 28, 2026** — please
  migrate to the new fields when integrating against these endpoints.

  See the [Order direction](/getting_started/order_direction) reference
  page for the full migration table and equivalence rules.
</Update>

<Update
  label="May 7, 2026"
  tags={["REST", "WebSocket", "Predictions", "Margin"]}
  rss={{
title: "Dedicated external Trade API endpoints documented",
description: "Added dedicated external REST and WebSocket hosts for production and demo. Existing shared hosts remain supported."
}}
>
  Added the dedicated external Trade API hosts to the docs and examples:

  * Production REST: `https://external-api.kalshi.com/trade-api/v2`
  * Production WebSocket: `wss://external-api-ws.kalshi.com/trade-api/ws/v2`
  * Demo REST: `https://external-api.demo.kalshi.co/trade-api/v2`
  * Demo WebSocket: `wss://external-api-ws.demo.kalshi.co/trade-api/ws/v2`

  Existing shared hosts remain supported for compatibility. Request signing is unchanged: sign the full request path from the API root, without the hostname or query string.
</Update>

<Update
  label="May 5, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "market_lifecycle_v2 WS channel emits metadata_updated events",
description: "The market_lifecycle_v2 WebSocket channel now emits metadata_updated events."
}}
>
  The `market_lifecycle_v2` WebSocket channel now supports a new event type
  `metadata_updated`. Initially this will only be triggered by a floor strike
  update, but may expand to more fields in the future. The message contains the
  updated `floor_strike` as a top-level field.

  **Affected channels:**

  * `market_lifecycle_v2`
</Update>

<Update
  label="May 5, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Post-only option for quotes",
description: "POST /communications/quotes now accepts post_only."
}}
>
  Added `post_only` as an option when creating a quote.
  If the quote is marked post-only, it will never take resting orders on the book or be subject to a taker fee: it will be automatically cancelled at the normal execution if it were to match with a resting order.
</Update>

<Update
  label="May 5, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "New endpoints: GET /portfolio/deposits and GET /portfolio/withdrawals",
description: "Query deposit and withdrawal history with cursor-based pagination."
}}
>
  Added `GET /trade-api/v2/portfolio/deposits` and `GET /trade-api/v2/portfolio/withdrawals` endpoints.

  * Query deposit/withdrawal history for the authenticated user
  * Cursor-based pagination via `limit` and `cursor` parameters

  **New endpoints:**

  * `GET /trade-api/v2/portfolio/deposits`
  * `GET /trade-api/v2/portfolio/withdrawals`
</Update>

<Update
  label="May 5, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Matching-engine timestamps on V2 order responses and order group WS updates",
description: "V2 order mutating endpoints now return a `ts_ms` field, and the order_group_updates WebSocket channel now includes `ts_ms`, both carrying the matching engine's event timestamp as Unix epoch milliseconds."
}}
>
  V2 order mutating endpoints now include a `ts_ms` field carrying the
  matching engine's wall-clock timestamp at which the request was
  processed, as Unix epoch milliseconds:

  * `POST /trade-api/v2/portfolio/events/orders`
  * `DELETE /trade-api/v2/portfolio/events/orders/{order_id}`
  * `POST /trade-api/v2/portfolio/events/orders/{order_id}/decrease`
  * `POST /trade-api/v2/portfolio/events/orders/{order_id}/amend`
  * `POST /trade-api/v2/portfolio/events/orders/batched`
  * `DELETE /trade-api/v2/portfolio/events/orders/batched`

  The `order_group_updates` WebSocket channel payload now includes a
  `ts_ms` field with the same matching-engine timestamp, matching the
  pattern already used by `trades`, `fill`, `user_orders`, and
  `orderbook_delta`.
</Update>

<Update
  label="May 5, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.23: RestRemainder flag on Quote",
description: "Quote (35=S) now accepts RestRemainder (21015); set 21015=Y to rest the quote remainder after execution, while omitting the tag preserves existing behavior."
}}
>
  **FIX API v1.0.23**

  * Quote (35=S) now accepts `RestRemainder` (21015)
    * Set `21015=Y` to rest the quote remainder after execution
    * Omitting the tag or setting `21015=N` preserves the existing behavior
</Update>

<Update
  label="May 1, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "RFQ and quote user filters",
description: "GET /communications/rfqs and GET /communications/quotes now accept user_filter=self."
}}
>
  Added `user_filter=self` to filter RFQs and quotes by the authenticated user.
  Existing creator user ID filters remain supported temporarily but are considered deprecated.
</Update>

<Update
  label="Apr 30, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Market tick_size field will be removed May 7",
description: "The deprecated Market tick_size field has been deprecated since Jan 5, 2026 and will be removed from Market responses on May 7, 2026."
}}
>
  The deprecated `tick_size` field on Market response objects has been
  deprecated since **Jan 5, 2026** and will be removed on **May 7, 2026**.

  Use `price_level_structure` and `price_ranges[].step` to determine each
  market's valid tick sizes.

  **Affected responses:**

  * Market response objects returned by REST API v2 endpoints
</Update>

<Update
  label="Apr 30, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "/account/limits exposes per-bucket refill rate and capacity",
description: "Response restructured to a nested object per bucket with refill_rate and bucket_capacity."
}}
>
  Beginning Apr 30, 2026, `GET /trade-api/v2/account/limits` returns a
  nested object per bucket with `refill_rate` (tokens added per second)
  and `bucket_capacity` (max tokens the bucket can hold). When the bucket
  has no burst headroom, `bucket_capacity` equals `refill_rate` — i.e.
  one second of budget.

  ```json theme={null}
  {
    "usage_tier": "advanced",
    "read":  {"refill_rate": 200, "bucket_capacity": 200},
    "write": {"refill_rate": 100, "bucket_capacity": 200}
  }
  ```

  See [Rate Limits and Tiers](/getting_started/rate_limits) for budget
  semantics.

  **Affected endpoints:**

  * `GET /trade-api/v2/account/limits`
</Update>

<Update
  label="Apr 28, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.22: AlwaysEmitNewBeforeTrade Logon flag",
description: "Adds the AlwaysEmitNewBeforeTrade (21026) Logon flag so the gateway always emits a standalone New execution report before any Trade report, even when an order takes liquidity in the same matching cycle as its placement."
}}
>
  **FIX API v1.0.22**

  * Added `AlwaysEmitNewBeforeTrade` (21026) Logon flag
    * With Logon flag `21026=Y`, the gateway always emits a standalone `New<0>` execution report before any `Trade<F>` report, even when an order takes liquidity in the same matching cycle as its placement
    * Without `21026`, the New ack continues to be folded into the first Trade report when both events arrive in the same batch (existing behavior)
    * Useful for clients whose state machines require an explicit `39=0` ack before they can issue replaces against the order
</Update>

<Update
  label="Apr 22, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "Endpoint cost introspection",
description: "Added a public endpoint that lists endpoints whose configured token cost differs from the default 10-token cost."
}}
>
  Added a public endpoint to inspect the routes whose configured token
  cost differs from the default 10-token cost.

  The response includes `default_cost` for context and lists only the
  endpoints that do not use that default cost.

  **Affected endpoints:**

  * `GET /trade-api/v2/account/endpoint_costs`
</Update>

<Update
  label="Apr 23, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "Short bursts on Write endpoints",
description: "Write endpoints now allow brief bursts above your per-second budget."
}}
>
  Write endpoints now allow brief bursts above your per-second budget — when
  your client is running below its steady rate, the unused capacity
  accumulates and can be spent in a single pulse. See
  [Rate Limits and Tiers](/getting_started/rate_limits) for details.
</Update>

<Update
  label="Apr 22, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "V2 event-order endpoints at /portfolio/events/orders",
description: "New event-order endpoints using a bid/ask single-book shape with fixed-point dollar prices and lightweight responses. The legacy /portfolio/orders endpoints will be deprecated no earlier than May 21, 2026, and rate-limit costs on the legacy endpoints may increase starting May 14, 2026."
}}
>
  **New endpoints:**

  * `POST /trade-api/v2/portfolio/events/orders` — create
  * `DELETE /trade-api/v2/portfolio/events/orders/{order_id}` — cancel
  * `POST /trade-api/v2/portfolio/events/orders/{order_id}/amend` — amend
  * `POST /trade-api/v2/portfolio/events/orders/{order_id}/decrease` — decrease
  * `POST /trade-api/v2/portfolio/events/orders/batched` — batch create
  * `DELETE /trade-api/v2/portfolio/events/orders/batched` — batch cancel

  **We recommend all clients switch over.** The existing `/portfolio/orders*` endpoints will be marked deprecated no earlier than **May 21, 2026**. Rate-limit costs on the legacy `/portfolio/orders*` endpoints may also increase starting **May 14, 2026** — migrate to the V2 endpoints to avoid disruption.
</Update>

<Update
  label="Apr 23, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "New rate-limit system goes live",
description: "A token-cost rate-limit model replaces the previous per-second scheme. All existing tiers get at least as much headroom as before."
}}
>
  Rolling out a new token-cost rate-limit system with separate read and write
  budgets and a new **Paragon** tier. All existing tiers get at least as much
  headroom as before and no client changes are required. See
  [Rate Limits and Tiers](/getting_started/rate_limits) for full details.

  In the coming weeks, single-query read endpoints will be priced below
  the default cost.
</Update>

<Update
  label="Apr 20, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Orderbook snapshot request via WebSocket",
description: "New get_snapshot action on the orderbook_delta channel returns an immediate orderbook snapshot without modifying the subscription."
}}
>
  Added `get_snapshot` action to `update_subscription` on the `orderbook_delta` WebSocket channel.

  Sends an `orderbook_snapshot` response for the requested markets without adding them to the subscription or affecting the existing delta stream.

  ```json theme={null}
  {
    "cmd": "update_subscription",
    "params": {
      "sids": [456],
      "market_tickers": ["MARKET-1", "MARKET-2"],
      "action": "get_snapshot"
    }
  }
  ```

  Only `market_tickers` is supported (not `market_ticker`, `market_id`, or `market_ids`).

  **Affected channel:**

  * `orderbook_delta`
</Update>

<Update
  label="Apr 20, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.21: Subaccount scoping for order groups",
description: "OrderGroupRequest (UOG) now accepts AllocAccount (tag 79) to scope all five actions to a subaccount, and OrderGroupResponse (UOH) echoes OrderGroupContractsLimit (tag 20132) on Create and Update responses."
}}
>
  **FIX API v1.0.21**

  * OrderGroupRequest (UOG) now accepts AllocAccount (tag 79) to scope the operation to a subaccount
    * Applies to all five actions: Create, Reset, Delete, Trigger, Update
    * Omit or set `79=0` to operate on the primary account
    * An OrderGroupID created under one subaccount cannot be managed without the matching AllocAccount on the follow-up request
  * OrderGroupResponse (UOH) now echoes OrderGroupContractsLimit (tag 20132) on Create and Update responses
</Update>

<Update
  label="Apr 17, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "fractional_trading_enabled deprecated",
description: "The fractional_trading_enabled field on Market and EventChildMarket is deprecated and now always true."
}}
>
  The `fractional_trading_enabled` field on `Market` and `EventChildMarket` responses is deprecated. It no longer carries information:

  * `Market` and `EventChildMarket` responses now support fractional trading unconditionally — the field is always `true`.

  The `fractional_trading_updated` event on the `market_lifecycle_v2` WebSocket channel is removed, since the underlying state can no longer change.

  The `fractional_trading_enabled` field will be removed in a future release after a separate pre-announcement that includes the exact removal date. Clients relying on this field should stop reading it; treat every active market returned by these responses as fractional.
</Update>

<Update
  label="Apr 16, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Market responses now include occurrence_datetime",
description: "Added occurrence_datetime to API v2 market responses, including nested event-child markets."
}}
>
  Added `occurrence_datetime` to API v2 market responses.

  This field returns the recorded datetime when the underlying event occurred, when that value is available.

  **Affected endpoints:**

  * `GET /trade-api/v2/markets`
  * `GET /trade-api/v2/markets/:ticker`
  * `GET /trade-api/v2/events`
  * `GET /trade-api/v2/events/:event_ticker`
</Update>

<Update
  label="Apr 15, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "WebSocket timestamp millisecond fields",
description: "Added millisecond Unix timestamp fields to non-margin WebSocket messages and deprecated the older timestamp fields."
}}
>
  Added new millisecond Unix timestamp fields to non-margin WebSocket messages while keeping the existing seconds and RFC3339 timestamp fields unchanged for now.

  ```diff theme={null}
  + ticker.ts_ms
  + trade.ts_ms
  + fill.ts_ms
  + orderbook_delta.ts_ms
  + user_order.created_ts_ms
  + user_order.last_updated_ts_ms
  + user_order.expiration_ts_ms
  ```

  The older timestamp fields are now deprecated in the AsyncAPI documentation:

  ```diff theme={null}
  - ticker.ts
  - ticker.time
  - trade.ts
  - fill.ts
  - orderbook_delta.ts
  - user_order.created_time
  - user_order.last_update_time
  - user_order.expiration_time
  ```

  These deprecated fields will be removed in a future API version only after a separate pre-announcement that includes the exact removal date.

  **Affected WebSocket channels:**

  * `ticker`: added `ts_ms`
  * `trade`: added `ts_ms`
  * `fill`: added `ts_ms`
  * `orderbook_delta`: added optional `ts_ms`
  * `user_order`: added `created_ts_ms`, `last_updated_ts_ms`, and `expiration_ts_ms`
</Update>

<Update
  label="Apr 10, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Historical markets support series_ticker filtering",
description: "GET /historical/markets now accepts a series_ticker query parameter."
}}
>
  Added `series_ticker` filtering to `GET /trade-api/v2/historical/markets`.

  This filter follows the existing historical markets behavior and is mutually exclusive with the other primary historical filters (`tickers`, `event_ticker`, and `mve_filter`).

  **Affected endpoints:**

  * `GET /trade-api/v2/historical/markets`
</Update>

<Update
  label="Mar 30, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "GET /portfolio/fills: removed client_order_id field",
description: "Removed the client_order_id field from the Fill response object."
}}
>
  Removed `client_order_id` from `GET /portfolio/fills` and `GET /portfolio/fills/historical` responses.

  **Affected endpoints:**

  * `GET /trade-api/v2/portfolio/fills`
  * `GET /trade-api/v2/portfolio/fills/historical`
</Update>

<Update
  label="Mar 30, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "GET /markets/orderbooks: fetch multiple orderbooks in one request",
description: "New endpoint to retrieve orderbooks for multiple market tickers in a single API call."
}}
>
  Added `GET /trade-api/v2/markets/orderbooks` endpoint.

  * Accepts a list of market tickers via `tickers` query parameter (up to 100)
  * Returns one orderbook per requested ticker

  **Affected endpoints:**

  * `GET /trade-api/v2/markets/orderbooks`
</Update>

<Update
  label="Mar 25, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Fixed-point migration cleanup: remove last legacy fields (effective Apr 2)",
description: "Removed the last legacy fields from Settlement, Fill, and market_positions responses. Effective April 2, 2026."
}}
>
  **Effective April 2, 2026**

  This release removes the last remaining legacy fields:

  * Removed `yes_total_cost` and `no_total_cost` (integer cents) from `GET /portfolio/settlements`. Use `yes_total_cost_dollars` and `no_total_cost_dollars`.
  * Removed `yes_price_fixed` and `no_price_fixed` (string aliases) from `GET /portfolio/fills`. Use `yes_price_dollars` and `no_price_dollars`.
  * Removed `position_cost`, `realized_pnl`, `fees_paid`, and `position_fee_cost` (integer centi-cents) from the `market_positions` WebSocket channel. Use the `_dollars` equivalents.
</Update>

<Update
  label="Mar 26, 2026"
  tags={["REST", "WebSocket", "FIX", "Predictions"]}
  rss={{
title: "Subaccount field added to quote accepted and quote executed responses",
description: "Quote responses now include the caller's subaccount number on REST, WebSocket, and FIX surfaces."
}}
>
  * The `subaccount` field is now returned on **WebSocket** `quote_accepted` and `quote_executed` messages when the quote or RFQ was placed from a subaccount.
  * The **REST** `Quote` object now includes `creator_subaccount` and `rfq_creator_subaccount` fields, visible to the respective party.
</Update>

<Update
  label="Mar 25, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Correct multivariate event ticker on market custom strike responses",
description: "Market responses now return the actual multivariate event ticker for the custom_strike field labeled Multivariate Event Ticker."
}}
>
  Fixed `GET /markets` and `GET /markets/{ticker}` so `custom_strike["Multivariate Event Ticker"]` returns the actual multivariate event ticker instead of the MVE collection ticker.
</Update>

<Update
  label="Mar 19, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "New multivariate_market_lifecycle WebSocket channel",
description: "Added a dedicated WebSocket lifecycle channel for multivariate event (MVE) markets."
}}
>
  Added a new `multivariate_market_lifecycle` WebSocket channel for multivariate event (MVE) markets.

  This channel emits MVE lifecycle messages for:

  * `created`
  * `activated`
  * `deactivated`
  * `close_date_updated`
  * `determined`
  * `settled`

  The existing `market_lifecycle_v2` channel continues to exclude `KXMVE`-prefixed tickers.

  **Affected channels:**

  * `multivariate_market_lifecycle`
  * `market_lifecycle_v2`
</Update>

<Update
  label="Mar 20, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "OpenAPI schema cleanup for deprecated compatibility fields",
description: "Trade and market position timestamps are now required in the spec, deprecated compatibility fields are now optional, and several schema inconsistencies were corrected."
}}
>
  * `Trade.created_time` and `MarketPosition.last_updated_ts` are now required in the OpenAPI contract.
  * Deprecated compatibility fields on `Market` and `Settlement` remain available, but are no longer marked as required.
  * Fixed schema inconsistencies where `Trade.price` and `EventPosition.resting_orders_count` were listed as required without defined properties.
  * Added semantic deprecation markers for deprecated fields such as `EventData.category` and `MarketPosition.resting_orders_count`.
</Update>

<Update
  label="Mar 12, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "New market_lifecycle_v2 event types for fractional trading and price level structure changes",
description: "The market_lifecycle_v2 WebSocket channel now emits events when a market's fractional trading setting or price level structure is changed."
}}
>
  Two new event types added to the `market_lifecycle_v2` WebSocket channel:

  * **`fractional_trading_updated`**: emitted when a market's fractional trading setting is changed. Includes `fractional_trading_enabled` (boolean).
  * **`price_level_structure_updated`**: emitted when a market's price level structure is changed. Includes `price_level_structure` (string, e.g. `"linear_cent"`, `"deci_cent"`, `"tapered_deci_cent"`).

  Additionally, the `created` event now includes `fractional_trading_enabled` and `price_level_structure` fields.

  **Affected channel:**

  * `market_lifecycle_v2`
</Update>

<Update
  label="Mar 11, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Yes no count in quotes",
description: "Quotes now communicate the computes yes/no count based on the defined prices."
}}
>
  When pulling quotes, two new fields return the computed quote size (measured in contracts) derived from the specified prices and the requested notional size in the RFQ.
</Update>

<Update
  label="Mar 11, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Legacy fields temporarily restored; nested market bid sizes fixed",
description: "Legacy fields temporarily restored on market_positions WebSocket and GetSettlements to allow additional migration time. yes_bid_size_fp and yes_ask_size_fp now populated on nested market responses."
}}
>
  * The following legacy fields are temporarily restored to allow additional migration time. Their `_dollars` equivalents remain the recommended fields:
    * `market_positions` WebSocket: `position_cost`, `realized_pnl`, `fees_paid`, `position_fee_cost`
    * `GET /portfolio/settlements`: `yes_total_cost`, `no_total_cost`
  * `yes_bid_size_fp` and `yes_ask_size_fp` are now correctly populated on nested market responses (`GET /events/{ticker}`).
</Update>

<Update
  label="Mar 10, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Fill prices adopt _dollars aliases; settlements add dollar cost fields",
description: "Fill responses now expose yes_price_dollars and no_price_dollars, and settlements now expose yes_total_cost_dollars and no_total_cost_dollars. Legacy aliases remain available for now but are deprecated."
}}
>
  * `Fill` responses now expose `yes_price_dollars` and `no_price_dollars` to align with the API-wide `_dollars` naming convention. Legacy `yes_price_fixed` and `no_price_fixed` remain available for now but are deprecated.
  * `GET /portfolio/settlements` now exposes `yes_total_cost_dollars` and `no_total_cost_dollars` in fixed-point dollars.
  * Legacy settlement cent fields `yes_total_cost` and `no_total_cost` remain available for now because these `_dollars` fields were added late in the fixed-point migration, but clients are recommended to migrate now.

  See [Fixed-Point Migration](/getting_started/fixed_point_migration) for the recommended field mappings.
</Update>

<Update
  label="Mar 8, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Legacy fields removed March 12; fractional trading and subpenny pricing on new markets",
description: "Legacy integer count and price fields will be removed March 12. Fractional trading enabled on 10 new markets March 12. Subpenny pricing on 2 markets March 9."
}}
>
  * Legacy integer count fields (with `_fp` equivalents) and integer cents price fields (with `_dollars` equivalents) will be **removed** from all REST and WebSocket response payloads on **March 12, 2026**
  * Fractional trading will be enabled on 10 additional markets on **March 12**
  * Subpenny pricing goes live on 2 markets on **March 9**: `KXGREENLAND-29` (deci\_cent) and `KXGDPNOM-RUS26` (tapered\_deci\_cent)

  See [Fixed-Point Migration](/getting_started/fixed_point_migration) for details.
</Update>

<Update
  label="Mar 7, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Higher precision for selected portfolio dollar fields",
description: "Selected `_dollars` fields now emit up to 6 decimal places using micro_cent source values when available."
}}
>
  Selected portfolio response `_dollars` fields now emit up to `6` decimal places, using micro\_cent source values from upstream portfolio protos.

  **Affected endpoints:**

  * `GET /portfolio/orders`
  * `GET /portfolio/orders/{order_id}`
  * `GET /portfolio/fills`
  * `GET /portfolio/positions`
</Update>

<Update
  label="Mar 6, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Historical trades endpoint",
description: "New public GET /historical/trades endpoint for accessing trade data older than the historical cutoff."
}}
>
  Added `GET /historical/trades` — a public endpoint for querying all trades archived to the historical database. Supports the same filters as `GET /markets/trades`.

  Use this endpoint for trades that occurred before the `trades_created_ts` cutoff returned by `GET /historical/cutoff`. See [Historical Data](/getting_started/historical_data) for details.
</Update>

<Update
  label="Mar 5, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "User orders WebSocket: added is_yes",
description: "The user orders WebSocket channel adds an is_yes boolean field while retaining the side string field."
}}
>
  * Added `is_yes` (boolean) to the `user_orders` WebSocket channel
  * `side` (string `"yes"`/`"no"`) remains available for compatibility
</Update>

<Update
  label="Mar 3, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Fixed-point migration: deprecation March 12; fractional trading week of March 9",
description: "Legacy integer count and price fields will be removed March 12, 2026. Fractional trading rolls out per-market starting the week of March 9."
}}
>
  * Legacy integer count fields (with `_fp` equivalents) and integer cents price fields (with `_dollars` equivalents) will be removed on **March 12, 2026**
  * Fractional trading will roll out per-market starting the week of **March 9, 2026**; check `fractional_trading_enabled` on Market responses
  * On fractional-enabled markets, legacy integer fields may be truncated; migrate to `_fp` and `_dollars` to avoid data loss

  Docs: [Fixed-Point Migration](/getting_started/fixed_point_migration) and [Fee Rounding](/getting_started/fee_rounding).
</Update>

<Update
  label="Mar 1, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.20: OrderExpiryCancel expired status mapping",
description: "Adds OrderExpiryCancel support for expired status mapping in execution reports; with Logon flag 21012=Y, both CloseCancel and OrderExpiryCancel emit ExecType(150)=C and OrdStatus(39)=C."
}}
>
  **FIX API v1.0.20**

  * Added `OrderExpiryCancel` support for expired status mapping in execution reports
    * With Logon flag `21012=Y`, both `CloseCancel` and `OrderExpiryCancel` emit `ExecType(150)=C` and `OrdStatus(39)=C`
    * Without `21012`, behavior remains `Canceled<4>` for compatibility
</Update>

<Update
  label="Feb 27, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.19: Settlement price precision and real settlement fees",
description: "SettlementPrice (730) in MarketSettlementReport may now carry up to two decimal places to represent sub-cent settlement values, and MiscFeeAmt (137) now reports actual settlement fees instead of being hardcoded to zero."
}}
>
  **FIX API v1.0.19**

  * SettlementPrice (730) precision extended in MarketSettlementReport
    * SettlementPrice will continue to be in cents but may have up to two decimal places (e.g. `30.60` instead of `30`)
    * This enables sub-cent settlement values to be represented without truncation
  * MiscFeeAmt (137) now reports actual settlement fees in MarketSettlementReport
    * Previously hardcoded to zero; now reflects the real settlement fee for each position
</Update>

<Update
  label="Feb 24, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Top-of-book sizes available on Market responses",
description: "Top-of-book sizes available on Market responses"
}}
>
  Market responses now include:

  * `yes_bid_size_fp`: total contract size of orders to buy yes at the best bid price
  * `yes_ask_size_fp`: total contract size of orders to sell yes at the best ask price

  Affected endpoints:

  * `GET /markets`
  * `GET /markets/{ticker}`
</Update>

<Update
  label="Feb 23, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Per-subaccount netting settings",
description: "New endpoints to get and update netting settings per subaccount.",
}}
>
  New endpoints for managing netting settings on individual subaccounts:

  * **`GET /portfolio/subaccounts/netting`**: returns the netting enabled status for all subaccounts
  * **`PUT /portfolio/subaccounts/netting`**: updates the netting enabled status for a specific subaccount (pass `subaccount_number` and `enabled` in the request body)

  Use `subaccount_number=0` for the primary account or `1`–`63` for numbered subaccounts. New subaccounts inherit the primary account's netting setting at creation time.
</Update>

<Update
  label="Feb 21, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Legacy field deprecation on March 5 and fractional trading in demo",
description: "Legacy integer count and price fields will be deprecated on March 5, 2026. Fractional share trading is available for testing in demo.",
}}
>
  Fractional share trading is now available for testing in the demo environment on the following markets:

  * `KXUCL-26-ARS`
  * `KXUCL-26-AJA`

  Legacy fields will be deprecated on `March 5, 2026`:

  * Integer count fields with an `_fp` equivalent will no longer be returned. See [Fixed-Point Contracts](/getting_started/fixed_point_contracts) for migration details.
  * Integer cents price fields (e.g., `yes_bid`, `no_ask`, `last_price`) will no longer be returned. Their `_dollars` equivalents are already available. See [Subpenny Pricing](/getting_started/subpenny_pricing) for details.

  More information will be forthcoming on how fee rounding works with fractional contracts.
</Update>

<Update
  label="Feb 19, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "settlement_value added to market_lifecycle_v2 determined events",
description: "The market_lifecycle_v2 WebSocket channel now includes settlement_value on market determined events"
}}
>
  The `market_lifecycle_v2` WebSocket channel now includes a `settlement_value` field (fixed-point dollar string) on `market_determined` events, indicating the settlement price of the market.

  Expected release date: `February 26, 2026`
</Update>

<Update
  label="Feb 17, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Subaccount filtering on GET /portfolio/balance",
description: "The GET /portfolio/balance endpoint now supports an optional subaccount query parameter to retrieve balance and portfolio value for a specific subaccount."
}}
>
  `GET /portfolio/balance` now accepts an optional `subaccount` query parameter, consistent with other portfolio endpoints (orders, fills, positions, settlements).

  * **Omitted or `subaccount=0`**: returns balance and portfolio value for the primary account (default)
  * **`subaccount=N`**: returns balance and portfolio value for that specific subaccount
</Update>

<Update
  label="Feb 13, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Market liquidity fields deprecated",
description: "Market liquidity fields deprecated"
}}
>
  The `liquidity` and `liquidity_dollars` fields on Market responses are deprecated and will return 0.

  Affected endpoints:

  * `GET /markets`
  * `GET /markets/{ticker}`
  * `GET /events`
  * `GET /events/{ticker}`
  * `GET /events/multivariate`
</Update>

<Update
  label="Feb 16, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Deprecation of non fixed-point fields pushed back",
description: "Fields that have a `_fp` equivalent will continue to be returned via API until at least February 26, 2026.",
}}
>
  The deprecation timeline for non fixed-point count fields has been pushed back.
  Fields that have a `_fp` equivalent will continue to be returned via API until at least `February 26, 2026`.

  See [Fixed-Point Contracts](/getting_started/fixed_point_contracts) for updated migration details.
</Update>

<Update
  label="Feb 19, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Historical data endpoints and cutoff timestamps",
description: "New endpoints for retrieving historical exchange data and cutoff timestamps defining the live/historical boundary"
}}
>
  Kalshi now partitions exchange data into **live** and **historical** tiers. Historical data must be accessed via the new historical API endpoints. The `GET /historical/cutoff` endpoint returns the cutoff timestamps that define this boundary.

  **Cutoff timestamps and what they mean:**

  * `market_settled_ts` — partitioned by **market settlement time**. Markets and their candlesticks that settled before this timestamp are only available via `GET /historical/markets` and `GET /historical/markets/{ticker}/candlesticks`.
  * `trades_created_ts` — partitioned by **trade fill time**. Fills that occurred before this timestamp are only available via `GET /historical/fills`.
  * `orders_updated_ts` — partitioned by **order cancellation or execution time**. Orders canceled or fully executed before this timestamp are only available via `GET /historical/orders`. **Resting (active) orders are unaffected** and always appear in `GET /portfolio/orders`.

  **New endpoints:**

  * `GET /historical/cutoff` — returns the market, trade, and order cutoff timestamps
  * `GET /historical/markets` — settled markets older than the cutoff
  * `GET /historical/markets/{ticker}` — single historical market by ticker
  * `GET /historical/markets/{ticker}/candlesticks` — candlestick data for historical markets
  * `GET /historical/fills` — trade fills older than the cutoff
  * `GET /historical/orders` — canceled/executed orders older than the cutoff

  **Impacted live endpoints:**

  * `GET /markets`, `GET /markets/{ticker}` — settled markets older than `market_settled_ts` will not appear
  * `GET /events` with `with_nested_markets=true` — nested markets older than `market_settled_ts` will not be included
  * `GET /series/{series_ticker}/markets/{ticker}/candlesticks`, `GET /markets/candlesticks` — candlestick data is tied to the market; historical markets' candlesticks must be fetched from `GET /historical/markets/{ticker}/candlesticks`
  * `GET /markets/trades`, `GET /portfolio/fills` — fills older than `trades_created_ts` will not appear
  * `GET /portfolio/orders` — completed/canceled orders older than `orders_updated_ts` will not appear (resting orders are unaffected)
</Update>

<Update
  label="Feb 12, 2026"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.18: Quantity fields gain two decimal places",
description: "Execution report quantity fields LastQty, CumQty, and LeavesQty now return at least a scale of 2 instead of 0 in preparation for fractional shares; numerical values remain unchanged for now."
}}
>
  **FIX API v1.0.18**

  * Execution report precision extended for fractional shares
    * On qty fields, Kalshi will return at least a scale of 2 instead of 0.
    * E.g. on a trade which executes for 10 contracts, Kalshi will return `CumQty: 14=10.00` as opposed to `14=10`
    * Despite the change in precision, the numerical value will remain unchanged for now because fractional trading is not yet enabled on any market.
    * Affected fields: `LastQty`, `CumQty`, `LeavesQty`
</Update>

<Update
  label="Feb 11, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "CreateOrder no longer offers market type",
description: "CreateOrder no longer offers market as an order type."
}}
>
  `POST /portfolio/orders` removed `type`; `type=market` is no longer offered.
</Update>

<Update
  label="Feb 12, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "MVE events excluded from market_lifecycle_v2 WebSocket channel",
description: "The market_lifecycle_v2 WebSocket channel no longer emits messages for multivariate event (KXMVE-prefixed) tickers."
}}
>
  The `market_lifecycle_v2` WebSocket channel no longer emits lifecycle messages for multivariate event (MVE) markets and events.
  All events and markets with `KXMVE` ticker prefix are now filtered from all lifecycle message types on this channel.

  **Affected channel:**

  * `market_lifecycle_v2`
</Update>

<Update
  label="Feb 12, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "ticker_v2 WebSocket channel removed",
description: "The undocumented ticker_v2 WebSocket channel has been removed from the API."
}}
>
  The `ticker_v2` WebSocket channel has been removed. This was an undocumented experimental channel
  intended as a v2 iteration of the ticker channel but was rolled back due to user feedback.

  Users should continue using the standard `ticker` channel for real-time market updates, which includes
  top-of-book prices, sizes, and last trade information.

  **Removed channel:**

  * `ticker_v2`
</Update>

<Update
  label="Feb 11, 2026"
  tags={["WebSocket", "Predictions", "Margin"]}
  rss={{
title: "WebSocket QoL Improvements",
description: "WebSocket QoL Improvements"
}}
>
  * `ticker` channel now provides high precision `time` field.
  * `skip_ticker_ack` subscription-level flag supports skipping market tickers sent in the OK message following a channel update.
</Update>

<Update
  label="Feb 11, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "fractional_trading_enabled added to market response payloads",
description: "Market payloads now include fractional_trading_enabled consistently across endpoints."
}}
>
  Market response payloads now include `fractional_trading_enabled` consistently across event and market data surfaces.

  **Affected endpoints:**

  * `GET /events`
  * `GET /events/{event_ticker}`
  * `GET /markets`
  * `GET /markets/{ticker}`
</Update>

<Update
  label="Feb 5, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "market_id added to Incentive Programs API",
description: "Incentive Programs API responses now include market_id field"
}}
>
  The `GET /incentive_programs` endpoint now returns a `market_id` field containing the market's unique identifier for each incentive program.

  **Affected endpoint:**

  * `GET /incentive_programs`
</Update>

<Update
  label="Feb 3, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "User orders WebSocket channel",
description: "New WebSocket channel for real-time order created and updated notifications"
}}
>
  Added `user_orders` WebSocket channel to stream real-time order updates (created, updated, canceled, executed)
  for the authenticated user. Supports optional `market_tickers` filter and dynamic
  `update_subscription` commands to add or remove markets.

  **New channel:**

  * `user_orders`
</Update>

<Update
  label="Feb 3, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Order group read endpoints support optional subaccount parameter",
description: "GetOrderGroup and GetOrderGroups now accept an optional subaccount query parameter to filter by subaccount."
}}
>
  `GET /portfolio/order_groups` and `GET /portfolio/order_groups/{order_group_id}` now accept an optional `subaccount` query parameter.
  When provided, results are filtered to that specific subaccount.
  When omitted, results are returned across all subaccounts.

  **Affected endpoints:**

  * `GET /portfolio/order_groups`
  * `GET /portfolio/order_groups/{order_group_id}`
</Update>

<Update
  label="Feb 2, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Subaccount support for RFQs",
description: "CreateRFQ and GetRFQs endpoints now support subaccounts"
}}
>
  The `POST /communications/rfqs` endpoint now accepts an optional `subaccount` parameter to create RFQs on behalf of a subaccount.
  The `GET /communications/rfqs` endpoint now accepts an optional `subaccount` query parameter to filter RFQs by subaccount.

  **Affected endpoints:**

  * `POST /communications/rfqs`
  * `GET /communications/rfqs`
</Update>

<Update
  label="Jan 30, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Order queue position returns fixed point field",
description: "Order queue position returns fixed point field",
}}
>
  Order queue position returns `queue_position_fp` representing the quantity of shares preceeeding the given order.
  Note: the new field is 0-indexed, e.g. the first order in the queue returns `0.00`.

  Affected endpoints:

  * `GET /portfolio/orders/queue_positions`
  * `GET /portfolio/orders/{order_id}/queue_position`
</Update>

<Update
  label="Feb 12, 2026"
  tags={["WebSocket", "Predictions", "Margin"]}
  rss={{
title: "L1 orderbook sizes added to ticker WebSocket channel",
description: "The ticker WebSocket channel now includes top-of-book sizes and last trade size, providing a complete L1 orderbook view."
}}
>
  The `ticker` and `margin_ticker` WebSocket channels now include top-of-book sizes and last trade size:

  * `yes_bid_size_fp` / `bid_size_fp` — number of contracts at the best bid price
  * `yes_ask_size_fp` / `ask_size_fp` — number of contracts at the best ask price
  * `last_trade_size_fp` — number of contracts in the most recent trade

  Size changes (even without price changes) now trigger ticker updates. All size fields are fixed-point strings supporting fractional contracts.

  **Affected channels:**

  * `ticker`
  * `margin_ticker`
</Update>

<Update
  label="Jan 29, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Orders return subaccount number",
description: "Order responses now include subaccount_number for direct users."
}}
>
  Order responses now include `subaccount_number` (0 for primary, 1-63 for subaccounts) for direct users.

  **Affected endpoints:**

  * `GET /portfolio/orders`
  * `GET /portfolio/orders/{order_id}`
</Update>

<Update
  label="Jan 29, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Subaccount filter behavior change for orders, fills, and settlements",
description: "When subaccount is omitted, these endpoints now return results across all subaccounts."
}}
>
  The `subaccount` query parameter behavior has been updated for orders, fills, and settlements.
  When `subaccount` is omitted, results are returned across all subaccounts for the authenticated direct member.
  When `subaccount` is provided (including `0` for primary), results are filtered to that specific subaccount.

  **Affected endpoints:**

  * `GET /portfolio/orders`
  * `GET /portfolio/fills`
  * `GET /portfolio/settlements`
</Update>

<Update
  label="Jan 29, 2026"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Deprecation of non fixed-point fields",
description: "Fields that have a `_fp` equivalent will no longer be returned via API in a future release.",
}}
>
  See [Fixed-Point Contracts](/getting_started/fixed_point_contracts) for updated migration details.
</Update>

<Update
  label="Jan 29, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Fee cost added to fill WebSocket messages",
description: "Fill WebSocket messages now include fee_cost as a fixed-point dollars string."
}}
>
  Fill WebSocket messages now include `fee_cost` as a fixed-point dollars string.

  **Affected channel:**

  * `fill`
</Update>

<Update
  label="Jan 28, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Subaccount support for cancel, amend, decrease order, and order group operations",
description: "Cancel, amend, and decrease order endpoints now accept an optional subaccount parameter. Order group operations also support subaccounts."
}}
>
  The following endpoints now accept an optional `subaccount` parameter:

  **Order operations:**

  * `DELETE /portfolio/orders/{order_id}` - Cancel order
  * `POST /portfolio/orders/{order_id}/amend` - Amend order
  * `POST /portfolio/orders/{order_id}/decrease` - Decrease order

  **Order group operations:**

  * `POST /portfolio/order_groups` - Create order group
  * `PUT /portfolio/order_groups/{order_group_id}/limit` - Update order group limit
  * `PUT /portfolio/order_groups/{order_group_id}/trigger` - Trigger order group
  * `DELETE /portfolio/order_groups/{order_group_id}` - Delete order group
</Update>

<Update
  label="Jan 28, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Per-order subaccount support in batch cancels",
description: "Batch cancel orders now accepts per-order subaccount values while remaining backwards compatible."
}}
>
  Batch cancel now supports per-order subaccounts while remaining backwards compatible with the existing `ids` payload.

  **Batch cancel:**

  * `POST /portfolio/orders/batched/cancel`
  * New request shape: `orders: [{ order_id, subaccount? }]` (subaccount defaults to `0`)
  * Legacy `ids` array is still accepted and maps to subaccount `0`
</Update>

<Update
  label="Jan 28, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Dollar-denominated target cost for RFQs",
description: "RFQ and Quote endpoints now support target_cost_dollars as a fixed-point dollar string"
}}
>
  Added `target_cost_dollars` (and `rfq_target_cost_dollars` on quotes) as a fixed-point dollar string
  to RFQ and Quote responses. The `CreateRFQ` endpoint now accepts `target_cost_dollars` as an alternative
  to `target_cost_centi_cents`.

  The `target_cost_centi_cents` and `rfq_target_cost_centi_cents` fields are now deprecated.

  **Affected endpoints:**

  * `POST /communications/rfqs`
  * `GET /communications/rfqs`
  * `GET /communications/rfqs/{rfq_id}`
  * `GET /communications/quotes`
  * `GET /communications/quotes/{quote_id}`
</Update>

<Update
  label="Jan 27, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Subaccount Balance returns string dollars representation",
description: "Subaccount Balance returns string dollars representation"
}}
>
  The subaccount balance field will be represented as a fixed-point dollars string instead of
  a centicent integer.

  **Affected endpoint:**

  * `GET /portfolio/subaccounts/balances`
</Update>

<Update
  label="Jan 27, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Exchange Fee available on Fills API",
description: "Exchange Fee available on Fills API"
}}
>
  The exhange `fee_cost` will be made available on the Fills API starting `January 28, 2026`.

  **Affected endpoint:**

  * `GET /portfolio/fills`
</Update>

<Update
  label="Jan 26, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "More specific error codes for order validation",
description: "New error codes provide more detailed information about order rejection reasons"
}}
>
  Added more specific error codes for order validation failures. These replace the generic `invalid_order` response in certain cases:

  **New error codes:**

  * `invalid_order_size` - Order quantity is invalid
  * `available_balance_too_low` - Insufficient available balance for the order
  * `order_id_and_client_order_id_mismatch` - OrderID does not match ClOrdID on amend/cancel
  * `order_side_mismatch` - Order side mismatch on amend/cancel
  * `order_ticker_mismatch` - Market ticker mismatch on amend/cancel

  **Affected endpoints:**

  * `POST /portfolio/orders`
  * `POST /portfolio/orders/{order_id}/amend`
  * `DELETE /portfolio/orders/{order_id}`
</Update>

<Update
  label="Jan 22, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Subaccount support for RFQ quotes",
description: "CreateQuote endpoint now accepts a subaccount parameter"
}}
>
  The `POST /communications/quotes` endpoint now accepts an optional `subaccount` parameter to create quotes on behalf of a subaccount.

  **Affected endpoint:**

  * `POST /communications/quotes`
</Update>

<Update
  label="Jan 22, 2026"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "Get api tier limits endpoint",
description: "New endpoint to retrieve the authorized user's api tier limits"
}}
>
  New endpoint which provides authorized user their api tier and corresponding read and write limits.

  **New endpoint:**

  * `GET /account/limits`

  Release date: `January 28, 2026`
</Update>

<Update
  label="Jan 22, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Order group updates WebSocket channel",
description: "New WebSocket channel for order group lifecycle updates"
}}
>
  Added `order_group_updates` WebSocket channel to stream order group lifecycle updates
  (created, triggered, reset, deleted, limit\_updated). Payloads include `contracts_limit_fp`
  for created and limit\_updated events.

  **New channel:**

  * `order_group_updates`

  Release date: `January 29, 2026`
</Update>

<Update
  label="Jan 21, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Amend order endpoint: client_order_id fields now optional",
description: "client_order_id and updated_client_order_id are now optional in amend order requests"
}}
>
  The `client_order_id` and `updated_client_order_id` fields in amend order requests are now optional.

  **Behavior changes:**

  * You can now amend orders without providing `client_order_id` fields by using only the `order_id` from the URL path
  * If you provide an `updated_client_order_id`, the order can be found by the exchange and the `client_order_id` updated just on `order_id` alone

  **Affected endpoint:**

  * `POST /trade-api/v2/portfolio/orders/{order_id}/amend`

  **Example:**

  ```json theme={null}
  {
    "ticker": "MARKET-TICKER",
    "side": "yes",
    "action": "buy",
    "count_fp": "50.00",
    "yes_price": 30
  }
  ```

  This will amend the order identified by `order_id` without requiring `client_order_id` fields.

  Release date: `January 28, 2026`
</Update>

<Update
  label="Jan 29, 2026"
  rss={{
title: "Release Jan 29, 2026",
description: "Release Jan 29, 2026"
}}
>
  Release date: `January 29, 2026`
</Update>

<Update
  label="Jan 29, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Order group limit update endpoint",
description: "Update order group contracts limits"
}}
>
  Added an endpoint to update the contracts limit for an order group (rolling 15-second window). If the updated limit would immediately trigger the group, all orders in the group are canceled and the group is triggered.

  **New endpoint:**

  * `PUT /portfolio/order_groups/{order_group_id}/limit`

  **Response updates:**

  * `GET /portfolio/order_groups`
  * `GET /portfolio/order_groups/{order_group_id}`

  Both now include `contracts_limit` and `contracts_limit_fp`.

  Release date: `January 29, 2026`
</Update>

<Update
  label="Jan 22, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "WebSocket AsyncAPI fixed-point counts",
description: "Documented *_fp fields for WebSocket payloads in AsyncAPI"
}}
>
  Added `*_fp` fixed-point contract count fields in the WebSocket AsyncAPI spec and examples
  (orderbook, ticker, trades, fills, positions, communications). See the [WebSocket reference](/websockets).

  Release date: `January 22, 2026`
</Update>

<Update
  label="Jan 21, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "GetMarkets Min Updated Ts Filter",
description: "GetMarkets Min Updated Ts Filter"
}}
>
  Added `updated_time` to Market responses and `min_updated_ts` filter to `GET /markets`, which filters for only markets updated later than the provided unix ts.

  Affected endpoints:

  * `GET /markets/{ticker}`
  * `GET /markets`.
</Update>

<Update
  label="Jan 20, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Get markets may return scalar result",
description: "Get markets may return scalar result"
}}
>
  Currently, a market settled to a scalar result will return `""` in the `market_result` field.
  Starting in the next release, this value will read `"scalar"` instead.

  Affected endpoints:

  * `GET /markets/{ticker}`
  * `GET /markets`

  Release date: `January 28, 2026`
</Update>

<Update
  label="Jan 21, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Manual order group trigger endpoint",
description: "New endpoint to trigger order groups"
}}
>
  Added manual trigger support for order groups.

  **New endpoint:**

  * `PUT /portfolio/order_groups/{order_group_id}/trigger`

  Release date: `January 22, 2026`
</Update>

<Update
  label="Jan 16, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "RFQ maker client order ID format update",
description: "RFQ maker client order ID format update"
}}
>
  Maker RFQ client order IDs now use the format `quote:<hash>:<quote_id>`, where `hash` is an
  8-character hash segment and the maker's quote ID is added as a suffix.

  Release date: `January 22, 2026`
</Update>

<Update
  label="Jan 16, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Candlesticks include_latest_before_start parameter",
description: "New parameter for single market candlestick endpoint to include synthetic initial data point"
}}
>
  Added `include_latest_before_start` parameter to the single market candlesticks endpoint for price continuity.

  When set to `true`, prepends a synthetic candlestick that:

  * Uses the close price from the most recent candlestick before `start_ts`
  * Sets `previous_price` to enable continuous price charting

  **Affected endpoint:**

  * `GET /series/{series_ticker}/markets/{ticker}/candlesticks`

  Release date: `January 22, 2026`
</Update>

<Update
  label="Jan 15, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Fixed-point contract count fields added to REST API",
description: "New _fp string fields for precise contract quantity representation"
}}
>
  Added `*_fp` string fields for contract counts across REST API requests and responses.

  **Example order response:**

  ```json theme={null}
  {
    "count": 10,
    "count_fp": "10.00",
    "fill_count": 5,
    "fill_count_fp": "5.00"
  }
  ```

  See [Fixed-Point Contracts](/getting_started/fixed_point_contracts) for migration details.

  Release date: `Jan 22, 2026`
</Update>

<Update
  label="Jan 13, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Yes settlement values in MVE legs",
description: "MVE legs now report settlement value, when known"
}}
>
  Settlement value on component legs are now reported when pulling MVEs.

  Release date: `January 13, 2025`
</Update>

<Update
  label="Jan 12, 2026"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Communications WebSocket channel sharding support",
description: "New shard_factor and shard_key parameters for the communications channel"
}}
>
  Added sharding support to the `communications` WebSocket channel for high-throughput RFQ/quote consumers.

  **New subscription parameters:**

  * `shard_factor` (int): Number of shards to divide messages across (e.g., 4)
  * `shard_key` (int): Which shard this connection receives (0 to shard\_factor-1)

  Messages are sharded by `market_ticker` using consistent hashing. Clients can run multiple connections with different `shard_key` values to distribute load while ensuring complete coverage.

  **Validation:**

  * `shard_factor` must be > 0 when provided
  * `shard_key` must be >= 0 and \< `shard_factor`
  * `shard_key` requires `shard_factor` to be set

  **Example subscription:**

  ```json theme={null}
  {
    "id": 1,
    "cmd": "subscribe",
    "params": {
      "channels": ["communications"],
      "shard_factor": 4,
      "shard_key": 0
    }
  }
  ```

  **No breaking changes:** When these parameters are omitted, all messages are received as before. Existing integrations are unaffected.
</Update>

<Update
  label="Jan 9, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Subaccount API endpoints",
description: "New endpoints for managing subaccounts and transferring funds between them"
}}
>
  New endpoints for managing subaccounts within a user's portfolio.

  **New endpoints:**

  * `POST /portfolio/subaccounts` - Create a new subaccount
  * `GET /portfolio/subaccounts/balances` - Get balances for all subaccounts
  * `POST /portfolio/subaccounts/transfer` - Transfer funds between subaccounts
  * `GET /portfolio/subaccounts/transfers` - Get paginated history of subaccount transfers

  **Note:** Transfers require a unique `client_transfer_id` for idempotency.
</Update>

<Update
  label="Jan 9, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "New market response field Is Provisional",
description: "New market response field Is Provisional"
}}
>
  On `GET /markets`, responses may bear `is_provisional: true`, indicating that the market will be removed
  from the API if it has no activity by settlement time.

  Notes:

  * Historical and existing markets are unaffected, this change only applies going forward.
  * A market will never transition into the provisional state if it was not created as provisional.

  Expected release date: `January 9, 2025`.
</Update>

<Update
  label="Jan 6, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Series volume field added to Series API",
description: "Optional volume field added to Series responses"
}}
>
  Added optional `volume` field to Series responses showing total contracts traded across all events in the series.

  **Affected endpoints:**

  * `GET /series` - Added `include_volume` query parameter (default: `false`)
  * `GET /series/{series_ticker}` - Added `include_volume` query parameter (default: `false`)

  When `include_volume=true`, the response includes the `volume` field with the total contracts traded.

  Release date: `January 15, 2026`
</Update>

<Update
  label="Jan 6, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Cent-denominated price fields removed from Market responses",
description: "Cent-denominated price fields removed from Market responses"
}}
>
  Cent-denominated price fields will be removed from Market responses.

  Affected endpoints:

  * `GET /markets`
  * `GET /markets/{ticker}`
  * `GET /events`
  * `GET /events/{ticker}`

  Fields to be removed:

  * `response_price_units`, `notional_value`, `yes_bid`, `yes_ask`, `no_bid`, `no_ask`, `last_price`, `previous_yes_bid`, `previous_yes_ask`, `previous_price`, `liquidity` → Use `*_dollars` equivalents (e.g., `yes_bid_dollars`)
  * `tick_size` → Use `price_level_structure` and `price_ranges`

  Release date: `January 15, 2026`
</Update>

<Update
  label="Jan 5, 2026"
  tags={["REST", "Predictions"]}
  rss={{
title: "Deprecated Market fields removed: category and risk_limit_cents",
description: "Deprecated fields category and risk_limit_cents removed from Market responses"
}}
>
  The deprecated fields `category` and `risk_limit_cents` will be removed from Market responses.

  **Affected endpoints:**

  * `GET /markets`
  * `GET /markets/{ticker}`

  Release date: `January 8, 2026`
</Update>

<Update
  label="Dec 22, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Lowercase query parameters support for search",
description: "Search endpoints now support lowercase query parameters"
}}
>
  Search endpoints now accept lowercase query parameters for improved flexibility and consistency.

  Release date: `December 22, 2025`
</Update>

<Update
  label="Dec 19, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Settlement timestamp added to Markets API",
description: "Settlement timestamp added to Markets API"
}}
>
  Added `settlement_ts` field to `GET /markets` and `GET /markets/{ticker}` responses.

  Release date: `December 25, 2025`
</Update>

<Update
  label="Dec 16, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Market Status Values",
description: "Documented all possible market status values in response"
}}
>
  The `Market` response object now documents all possible `status` values: `initialized`, `inactive`, `active`, `closed`, `determined`, `disputed`, `amended`, `finalized`.
</Update>

<Update
  label="Dec 13, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Paused filter added to Get Markets",
description: "Paused filter added to Get Markets",
}}
>
  In `GET /markets`, markets that have been paused by an administrator will be available under new the `paused` status filter.
</Update>

<Update
  label="Dec 11, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Event ticker available in Settlements API",
description: "Event ticker available in Settlements API"
}}
>
  `GET /portfolio/settlements` will return each settled position's Event Ticker.
  Release Date: `December 18, 2025`
</Update>

<Update
  label="Dec 18, 2025"
  tags={["REST", "Predictions", "Margin"]}
  rss={{
title: "Read-Only API Keys",
description: "API keys now support scopes for read-only or full access permissions"
}}
>
  API keys now support a `scopes` field. Valid scopes are `read` and `write`. Keys default to full access if not specified. All existing API keys will have both scopes.

  Release date: `December 18, 2025`
</Update>

<Update
  label="Dec 5, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "GET /portfolio/positions no longer supports settled positions",
description: "GET /portfolio/positions no longer supports settled positions",
}}
>
  `GET /portfolio/positions` will only return unsettled positions. For fetching settled market positions, switch to `GET /portfolio/settlements`.

  Release date: December 11, 2025
</Update>

<Update
  label="Dec 2, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "GET /events no longer returns multivariate events",
description: "GET /events now excludes all multivariate events. Use GET /events/multivariate for MVE events.",
}}
>
  Breaking Change: `GET /events` excludes multivariate events

  Release date: December 4, 2025
</Update>

<Update
  label="Dec 1, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "SDK Updates and kalshi_python renamed to kalshi_python_sync",
description: "New SDK versions will be released by Thursday. SDK versions will track openapi spec versions. Kalshi will be publishing sync and async python clients as well as updating the existing typescript client."
}}
>
  Release date: `December 4, 2025`
</Update>

<Update
  label="Dec 1, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "General availability for Batch Cancel Orders API",
description: "General availability for Batch Cancel Orders API"
}}
>
  `DELETE /portfolio/orders/batched` is now generally available. Advanced API access is no longer required. (The Nov 14th update only applied to `POST`.)

  Release date: `December 4, 2025`
</Update>

<Update
  label="Nov 30, 2025"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.17: Tag reorganization for QuoteConfirmStatus and SkipPendingExecReports",
description: "QuoteConfirmStatus moves to tag 21010 and SkipPendingExecReports to tag 21011, with tags 297 and 21003 designated for standard QuoteStatus and ResendEventCount. Legacy tags are still accepted but support will be removed in a future version."
}}
>
  **FIX API v1.0.17**

  * **BREAKING CHANGE**: Tag reorganization for improved compatibility
    * QuoteConfirmStatus now uses tag 21010 (currently supporting both 297 and 21010)
    * SkipPendingExecReports now uses tag 21011 (currently accepting both 21003 and 21011)
    * Tag 297 designated for standard QuoteStatus field
    * Tag 21003 designated for ResendEventCount field
    * Clients should update to use new tags; legacy support will be removed in future version
</Update>

<Update
  label="Nov 30, 2025"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.16: MaxExecutionCost flag on NewOrderSingle",
description: "Adds the MaxExecutionCost (21009) NewOrderSingle flag."
}}
>
  **FIX API v1.0.16**

  * Added MaxExecutionCost (21009) NewOrderSingle flag.
</Update>

<Update
  label="Nov 29, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Live Data Response Includes Milestone ID",
description: "Live Data Response Includes Milestone ID"
}}
>
  `GET /live_data/{type}/milestone/{milestone_id}` and `GET /live_data/batch` now returns `milestone_id` in the response.

  Release date: `December 4, 2025`
</Update>

<Update
  label="Nov 23, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Get Markets Filter Updates",
description: "Get Markets Filter Updates"
}}
>
  Updates to filtering in `GET /markets`

  * Inactive markets during tradable hours will returned in the `open` selector.
  * Inactive markets during tradable hours no longer appear in the `closed` selector.
  * Restricting to a single status filter allowed per request (previously announced).

  Release date: `November 27, 2025`
</Update>

<Update
  label="Nov 21, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Subpenny bids added to Get Quote API",
description: "Subpenny bids added to Get Quote API"
}}
>
  Subpenny fields `yes_bid_dollars` and `no_bid_dollars` available on the Get Quote API. Affected endpoints:

  * `GET /communications/quotes`
  * `GET /communications/quotes/{quote_id}`
</Update>

<Update
  label="Nov 27, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Batch Market Candlesticks endpoint",
description: "New endpoint for retrieving candlestick data for multiple markets in a single request"
}}
>
  Adds new endpoint `GET /markets/candlesticks`

  Retrieve candlestick data for multiple markets in a single API call. Supports up to 10,000 candlesticks total across all requested markets.

  Expected release: `November 27, 2025`
</Update>

<Update
  label="Nov 21, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Order expiration and IoC behavior changes",
description: "Orders with past expiration timestamps will be rejected instead of coerced to IoC. IoC flag can no longer be combined with expiration_ts."
}}
>
  **Breaking changes to order expiration and immediate-or-cancel (IoC) handling:**

  1. **Past expiration timestamps now rejected**: Orders with `expiration_ts` in the past will be rejected with error "Expiration timestamp must be in the future" instead of being automatically converted to IoC orders.

  2. **IoC + expiration\_ts combination rejected**: Orders cannot specify both `time_in_force: "immediate_or_cancel"` and `expiration_ts`. This will be rejected at the API level with error "Cannot specify both immediate\_or\_cancel and expiration\_ts".

  3. **IoC orders no longer support expiration**: The IoC order type is now independent and does not accept an expiration timestamp.

  **Migration guide**: If you were previously using past `expiration_ts` values to indicate IoC behavior, you must now explicitly set `time_in_force: "immediate_or_cancel"` instead.

  Expected release: `TBD`
</Update>

<Update
  label="Nov 21, 2025"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.15: PreserveOriginalOrderQty Logon flag",
description: "Adds the PreserveOriginalOrderQty (21008) Logon flag to maintain the original OrderQty across all execution reports."
}}
>
  **FIX API v1.0.15**

  * Added PreserveOriginalOrderQty (21008) Logon flag to maintain original OrderQty across all execution reports
</Update>

<Update
  label="Nov 20, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Removing pending from status enum",
description: "'Pending' is being removed from the status enum on orders"
}}
>
  'Pending' is being removed from the status enum on orders

  Expected release: `November 27, 2025`
</Update>

<Update
  label="Nov 14, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "General availability for Batch Create Orders API",
description: "General availability for Batch Create Orders API"
}}
>
  `POST /portfolio/orders/batched` will now be generally available. Advanced API access is no longer a prerequisite.

  Release date: `November 20, 2025`
</Update>

<Update
  label="Nov 14, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "New timestamp filters for Markets API",
description: "New timestamp filters for Markets API"
}}
>
  Added `created_time` to `GET /markets` && `GET /market` responses.

  Release date: `November 20, 2025`
</Update>

<Update
  label="Nov 11, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Restrictions to GetMarkets Filters",
description: "Restrictions to GetMarkets Filters"
}}
>
  Breaking changes planned to `GET /markets` endpoint for performance reasons:
  Timestamp filters will be mutually exclusive from other timestamp filters and certain status filters.

  | Compatible Timestamp Filters       | Additional Status Filters   |
  | ---------------------------------- | --------------------------- |
  | min\_created\_ts, max\_created\_ts | `unopened`, `open`, *empty* |
  | min\_close\_ts, max\_close\_ts     | `closed`, *empty*           |
  | min\_settled\_ts, max\_settled\_ts | `settled`, *empty*          |
</Update>

<Update
  label="Nov 11, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "New timestamp filters for Markets API",
description: "New timestamp filters for Markets API"
}}
>
  Added new timestamp filters for the `GET /markets` endpoint:

  * `min_created_ts`
  * `max_created_ts`
  * `min_settled_ts`
  * `max_settled_ts`
</Update>

<Update
  label="Nov 7, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Resting market positions filter removed",
description: "Resting market positions filter removed"
}}
>
  * `GET /portfolio/positions` will no longer return `resting_orders_count` in both the `event_positions` and `market_positions` field.
  * The `resting_order_count` filter on `GET /portfolio/positions` will no longer be supported. Requests specifying this filter will return a 400 error.

  Expected release: `November 13, 2025`
</Update>

<Update
  label="Nov 13, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Settlements API returns fee cost",
description: "Settlements API returns fee cost"
}}
>
  `GET /portfolio/settlements` now returns the sum of trade fees paid by the user on a settled market position.
</Update>

<Update
  label="Nov 6, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "GetEvents limit parameter now defaults to 200 and respects the parameter.",
description: "Fixed GetEvents limit parameter."
}}
>
  Fixed two issues with the `GET /events` endpoint's `limit` parameter:

  * **Default increased**: The default limit is now 200 (previously 100) to return more results per page
  * **Parameter**: Requests with `with_nested_markets=true` now properly respect `limit=200` instead of being capped at 100
</Update>

<Update
  label="Nov 6, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Portfolio positions now include total_cost_shares",
description: "Added total_cost_shares field to portfolio/positions endpoint showing total shares traded per event."
}}
>
  The `GET /portfolio/positions` endpoint now includes `total_cost_shares`, which tracks the total number of shares traded on an event (including both YES and NO contracts).
</Update>

<Update
  label="Nov 6, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Multivariate Events API and Enhanced Market Filtering",
description: "New endpoint for multivariate events and enhanced market filtering capabilities"
}}
>
  Added comprehensive support for multivariate events (combos) with new API endpoints and enhanced filtering:

  **New Endpoint and deprecation of multivariate events in GetEvents endpoint**

  * `GET /events/multivariate` - Retrieve multivariate events with filtering by series and collection ticker.
  * `GET /events` will EXCLUDE multivariate events upon the next release (November 13th). Please use the new endpoint!

  **Enhanced Market Filtering:**

  * `GET /markets` now supports `mve_filter` parameter:
    * `"only"` - Returns only multivariate events
    * `"exclude"` - Excludes multivariate events
    * No parameter - Returns all events (default behavior)

  Expected release: `November 6th, 2025`
</Update>

<Update
  label="Oct 24, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Batch order creation now returns post-only cross errors",
description: "Post-only orders that cross the market in batch requests now return detailed error messages instead of just status canceled."
}}
>
  Fixed batch order creation to return proper error details when post-only orders cross the market. The response now includes:

  * Error code: `"invalid order"`
  * Error details: `"post only cross"`

  This makes the batch endpoint consistent with single order creation and provides clear feedback on why post-only orders were rejected.
</Update>

<Update
  label="Oct 20, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Get Orders endpoint supports multiple event tickers",
description: "The event_ticker parameter now accepts comma-separated values to filter orders across multiple events."
}}
>
  The `GET /portfolio/orders` endpoint's `event_ticker` parameter now supports filtering by multiple events using comma-separated values.

  **Example usage:**

  ```
  GET /portfolio/orders?event_ticker=EVENT1,EVENT2,EVENT3
  ```

  **Backward Compatible:**

  * Single event ticker queries continue to work as before
  * Multiple event tickers return orders from all specified events
</Update>

<Update
  label="Oct 19, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Added missing fields to Quote responses",
description: "Restored rfq_target_cost_centi_cents, rfq_creator_order_id, and creator_order_id fields to Quote API responses"
}}
>
  Fixed missing fields in Quote responses: `rfq_target_cost_centi_cents`, `rfq_creator_order_id`, and `creator_order_id` are now properly included in all Quote-related endpoints.
</Update>

<Update
  label="Oct 16, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "'with_milestones' flag on Events API",
description: "Adds an optional flag to request milestone data along with events."
}}
>
  The `GET /events` endpoint now supports an optional flag, `with_milestones`, that includes all milestones related to the returned events.

  Expected release: `October 16, 2025`
</Update>

<Update
  label="Oct 14, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Create Order Response Updated",
description: "Create Order now returns the full Order model"
}}
>
  The order returned by create order is now the same model as the model returned by get order.
</Update>

<Update
  label="Oct 13, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Incentive Programs API includes series_ticker",
description: "Incentive Programs API responses now include series_ticker field"
}}
>
  The `GET /v2/incentive_programs` and `GET /incentive_programs` endpoints now return a `series_ticker` field for each incentive program.

  Expected release: `October 13, 2025`
</Update>

<Update
  label="Oct 10, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Price level structure moved from event to market level",
description: "Price level structure moved from event to market level"
}}
>
  The `price_level_structure` field has been moved from the event level to the market level. Each market now has its own `price_level_structure` field.

  **Affected endpoints:**

  * `GET /trade-api/v2/events`
  * `GET /trade-api/v2/events/:event_ticker`
  * `GET /trade-api/v2/markets`
  * `GET /trade-api/v2/markets/:ticker`

  **Note:** The `price_level_structure` field on event objects is now deprecated and will be removed. Please use the field on individual market objects instead.

  Expected release date: `Oct 15th, 2025`
</Update>

<Update
  label="Oct 13, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Fixed series tag filtering to support tags with spaces",
description: "Series tags parameter now only uses comma separation, allowing tags with spaces like 'Rotten Tomatoes' to work correctly"
}}
>
  Fixed the `GET /series` endpoint's tags parameter to properly support tags containing spaces. Previously, the parameter would split on both commas AND spaces, breaking searches for tags like "Rotten Tomatoes".

  **Breaking Change:**

  * The `tags` query parameter now **only** splits on commas (`,`), not spaces
  * Tags with spaces (e.g., "Rotten Tomatoes") now work correctly
  * Multiple tags must be comma-separated: `?tags=Rotten Tomatoes,Television`

  **Before (broken):**

  ```
  GET /series?tags=Rotten Tomatoes
  // Was incorrectly parsed as: ["Rotten", "Tomatoes"]
  // Result: No matches found
  ```

  **After (fixed):**

  ```
  GET /series?tags=Rotten Tomatoes
  // Correctly parsed as: ["Rotten Tomatoes"]
  // Result: Returns series with the "Rotten Tomatoes" tag

  GET /series?tags=Rotten Tomatoes,Television
  // Correctly parsed as: ["Rotten Tomatoes", "Television"]
  // Result: Returns series with either tag
  ```

  This change may affect integrations that relied on space-separated tags. Please update to use comma-separated tags only.
</Update>

<Update
  label="Oct 8, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Fixed trailing slash redirects on collection endpoints",
description: "Fixed inconsistent 301 redirects on collection endpoints - requests without trailing slashes now return 200 directly"
}}
>
  Fixed routing inconsistency where certain collection endpoints required trailing slashes, causing unnecessary 301 redirects for requests without them.

  **Endpoints now returning 200 for requests without trailing slash** (previously returned 301):

  * `GET /milestones`
  * `GET /structured_targets`
  * `GET /multivariate_event_collections`
  * `GET /series`
  * `GET /api_keys`
  * `POST /api_keys`

  **Note:** Requests with trailing slashes (e.g., `/milestones/`) will now receive a 301 redirect to the version without the trailing slash, which is the opposite of the previous behavior.
</Update>

<Update
  label="Oct 9, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Missing subpenny fields in Orders and Trades",
description: "Missing subpenny fields in Orders and Trades"
}}
>
  Subpenny fields have been added to orders (`taker_fees_dollars`, `maker_fees_dollars`), as well as to public trades (`yes_price_dollars`, `no_price_dollars`).

  Endpoints affected:

  * `GET /trade-api/v2/portfolio/orders`
  * `GET /trade-api/v2/markets/trades`
</Update>

<Update
  label="Oct 9, 2025"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Subpenny support in WS for RFQs and Quotes",
description: "Subpenny support in WS for RFQs and Quotes"
}}
>
  Fields have been added to all RFQ and quote messages to support subpenny pricing via the dollar normalized price fields.
  For more info reference:

  * [Subpenny Pricing](/getting_started/subpenny_pricing)
  * [WebSocket Documentation](/websockets)
</Update>

<Update
  label="Oct 7, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Enhanced Portfolio Balance Endpoint",
description: "Added portfolio_value field to GET /portfolio/balance endpoint"
}}
>
  Enhanced the existing `GET /portfolio/balance` endpoint to include a `portfolio_value` field that provides the total portfolio value (available balance plus current market value of all positions), both in cents.
</Update>

<Update
  label="Oct 1, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Series Fee Changes API returns user-facing fee type names",
description: "Series Fee Changes API and notifications now return user-facing fee type names"
}}
>
  The `GET /series/fee_changes` endpoint now returns user-facing fee type names (`quadratic`, `quadratic_with_maker_fees`, `flat`) instead of internal fee structure names. This change also applies to CustomerIO notifications for scheduled series fee updates.

  Expected release: `October 1, 2025`
</Update>

<Update
  label="Oct 1, 2025"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.14: Subpenny pricing support",
description: "Adds support for subpenny pricing across multiple FIX messages."
}}
>
  **FIX API v1.0.14**

  * Added support for subpenny pricing across multiple FIX messages
  * For more info see [Subpenny Pricing](/fix/subpenny-pricing)
</Update>

<Update
  label="Sep 25, 2025"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "WebSocket subscribe idempotent",
description: "WebSocket subscribe idempotent"
}}
>
  Repeated subscriptions on the same WebSocket call will no longer error. If passing
  the same market tickers as before, no action will be taken. If passing new market tickers,
  they will be added to your existing subscription.

  Additionally, the user may supply WS Command `list_subscriptions` to view their existing subscriptions.

  Expected release: `October 1, 2025`
</Update>

<Update
  label="Sep 25, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "FoK orders that self-cross treated as IoC",
description: "FoK orders that self-cross treated as IoC."
}}
>
  For optimization purposes, partial fills generated by self-crossing FoK orders are not rolled back.
  If a FoK order self-crosses, order execution proceeds based on `self_trade_prevention_type`:

  * `taker_at_cross`: the taker is canceled, execution stops. Any partial fills are executed.
  * `maker`: the maker is canceled, execution continues. After execution, remaining taker quantity is canceled.
    Any fills are executed.

  This fixes a bug where partially filled FoK orders with Maker STP entered into the book after self-crossing.
  Expected enforced date: `Oct 1, 2025`.
</Update>

<Update
  label="Sep 22, 2025"
  tags={["REST", "WebSocket", "Predictions"]}
  rss={{
title: "Adding purchased_side to REST and ws fills",
description: "User seeking a simple way to determine the direction of their fill should reference purchased_side. Both BUY YES or SELL NO result in purchased_side = YES. The addition of this field is the first step in standardizing the fills WebSocket and REST endpoints, which have different conventions for the interpretation 'side' and 'user_action'"
}}
>
  User seeking a simple way to determine the direction of their fill should reference purchased\_side. Both BUY YES or SELL NO result in purchased\_side = YES. The addition of this field is the first step in standardizing the fills WebSocket and REST endpoints, which have different conventions for the interpretation 'side' and 'user\_action'.

  Expected Enforce Date: deprecation date for existing fields not yet scheduled.
</Update>

<Update
  label="Sep 21, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Scheduled Series Fees API Endpoint",
description: "New endpoint for getting all of a series' scheduled fees"
}}
>
  Added new public API endpoint for getting all of a series' scheduled fees:

  * `GET /series/fee_changes` - Get a series' fee changes. If query string parameter show\_historical is set to true, ALL fee changes previous and upcoming will be shown. If set to false, only upcoming fee changes will be shown
</Update>

<Update
  label="Sep 25, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Deprecating order type `market`",
description: "Deprecating order type `market`"
}}
>
  Specifying `order_type` is no longer required and only `limit` type orders will be supported.
  Price must be supplied based on the underlying market structure. Example usage:

  ```
  {"yes_price": 99, "side: "yes"} // buy yes or sell no at market price
  {"no_price": 99, "side: "no"} // buy no or sell yes at market price
  ```

  Expected enforce date: `Sep 25, 2025`
</Update>

<Update
  label="Sep 18, 2025"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "WebSocket API Session Limit",
description: "WebSocket API Session Limit"
}}
>
  WebSocket connections per user are limited by usage tier. The default limit begins at 200 and increases based on API usage tier.
</Update>

<Update
  label="Sep 18, 2025"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Communications WS channel",
description: "Streamed RFQs and quotes"
}}
>
  A new WS channel is being introduced for streaming information related to pre-trade communications (RFQs and quotes).
</Update>

<Update
  label="Sep 15, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Additional RFQ and market metadata",
description: "MVE related meatadata"
}}
>
  Additional metadata is being added to RFQs on multivarate events (MVEs) that break down their component parts explicitly. Market payloads are also being expanded with these new optional fields that are filled only for MVE markets.
</Update>

<Update
  label="Sep 15, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Event Candlesticks API Endpoint",
description: "New endpoint for getting event candlesticks"
}}
>
  Added new public API endpoint for event candlesticks:

  * `GET /candlesticks` - Get candlesticks for all markets associated with an event. If the # of candlesticks exceeds 5000, paginate the results and return an adjustedEndTs which should be used as the start\_ts for your next request.
</Update>

<Update
  label="Sept 11, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "TypeScript SDK Release",
description: "Official TypeScript SDK now available via NPM"
}}
>
  The TypeScript SDK is now available through NPM! Install with `npm install kalshi-typescript`.

  Documentation and examples available at docs.kalshi.com
</Update>

<Update
  label="Sep 11, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Forecast Percentiles History API Endpoint",
description: "New endpoint for getting forecast percentiles history"
}}
>
  Added new public API endpoint for forecast percentiles history:

  * `GET /forecast_percentiles_history` - Get percentile history of a event forecast
</Update>

<Update
  label="Sep 10, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Incentive Programs API Endpoint",
description: "New endpoint for retrieving incentive program information"
}}
>
  Added new public API endpoint for incentive programs (not yet live):

  * `GET /incentive_programs` - List incentive programs with filtering options (by market ticker, active status, payout status)
</Update>

<Update
  label="Sep 9, 2025"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Subpenny pricing added to WebSocket",
description: "Subpenny pricing added to WebSocket"
}}
>
  Subpenny pricing fields have been added to WebSocket messages. Any message bearing price in cents will now also bear
  an equivalent fixed-point dollars field.

  For more info, see [Subpenny Pricing](/getting_started/subpenny_pricing).
</Update>

<Update
  label="Sep 9, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Events endpoints now return broker availability",
description: "Events endpoints now return broker availabilit"
}}
>
  Both the individual and batch `GET` events endpoints now also return `available_on_brokers` which indicates that they are available on intermediate platforms/ brokers.
</Update>

<Update
  label="Sep 6, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Python SDK",
description: "Python SDK"
}}
>
  The python SDK is being generated from our OpenAPI spec and is available through pip with pip install kalshi-python.
  Docs for the new SDK are available on docs.kalshi.com/python-sdk.
</Update>

<Update
  label="Aug 31, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Exposing read-only subpenny pricing",
description: "Exposing read-only subpenny pricing in the API."
}}
>
  Subpenny pricing fields have been added to APIs involving price, fees, and money in general.
  E.g. next to a field called `"price": 12` (representing 12 cents), you will also see `"price_dollars": "0.1200"`,
  which is a string bearing a fixed-point representation of money accuate to at 4 decimal points.

  For now, this change is read-only, meaning that the minimum allowable tick size for orders is still 1c. Eventually,
  we will introduce sub-penny pricing on orders. For now, please prepare for an eventual migration to the higher granularity
  price representation.

  For more info, see [Subpenny Pricing](/getting_started/subpenny_pricing).
</Update>

<Update
  label="Sep 2, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "New Market Fields for Multivariate Event Collections",
description: "Optional fields added to describe markets that are part of MVEs"
}}
>
  The market payload has been updated to include two new fields that describe markets which are part of Multivariate Events.
</Update>

<Update
  label="Sep 2, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "New Market Fields for Multivariate Event Collections",
description: "Optional fields added to describe markets that are part of MVEs"
}}
>
  The market payload has been updated to include two new fields that describe markets which are part of Multivariate Events.
</Update>

<Update
  label="Aug 21, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Multivariate Event Collections Extension",
description: "The MVE payload has been expanded to support more flexible structures."
}}
>
  The MVE payload has been expanded to support more flexible structures. Several fields that are now redundant are deprecated, but not yet removed.
</Update>

<Update
  label="Aug 21, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Settlement value added to Settlements API",
description: "Settlement value added to Settlements API."
}}
>
  The Settlements API now includes the settlement value for a yes contract.
</Update>

<Update
  label="Aug 21, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Case-insensitive category filtering for milestones",
description: "Fixed get_milestones endpoint to use case-insensitive matching for the category parameter."
}}
>
  The get\_milestones endpoint now uses case-insensitive matching for the category parameter, resolving inconsistent filtering behavior between "Sports" and "sports".
</Update>

<Update
  label="Aug 15, 2025"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.13: Order Group management messages",
description: "Adds Order Group management messages (UOG/UOH) with Create, Reset, and Delete operations and support for automatic order cancellation with contracts limits."
}}
>
  **FIX API v1.0.13**

  * Added Order Group management messages (UOG/UOH)
  * Support for automatic order cancellation with contracts limits
  * Create, Reset, and Delete operations for order groups
</Update>

<Update
  label="Aug 14, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Additional Events and Series Filters",
description: "Filtering events by close ts and series by tags supported in the API."
}}
>
  Filtering events by close ts and series by tags supported in the API.
</Update>

<Update
  label="Aug 13, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Batch endpoints now available to all users in demo environment",
description: "BatchCreateOrders and BatchCancelOrders endpoints are now accessible to Basic tier users in the demo environment for testing purposes."
}}
>
  The batch order endpoints are now available to all API users in the demo environment:

  **Affected Endpoints:**

  * `POST /portfolio/orders/batched` (BatchCreateOrders)
  * `DELETE /portfolio/orders/batched` (BatchCancelOrders)

  **Changes:**

  * Basic tier users can now access batch endpoints in demo environment
  * Production environment remains unchanged - Advanced tier or higher still required
  * Rate limits still apply based on user tier

  This change enables developers to test batch order functionality without needing Advanced tier access in the demo environment.
</Update>

<Update
  label="Aug 13, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "API Signing Error Messages Improved",
description: "The error messages when an incorrect API signature is passed have been improved"
}}
>
  The error messages when an incorrect API signature is passed have been improved
</Update>

<Update
  label="Aug 9, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "OpenAPI Specification Now Available",
description: "The OpenAPI specification is now available for download at docs.kalshi.com/openapi.yaml"
}}
>
  The OpenAPI specification for the Kalshi API is now available at `https://docs.kalshi.com/openapi.yaml`. This allows developers to easily generate client libraries and integrate with the API using OpenAPI-compatible tools.
</Update>

<Update
  label="Aug 8, 2025"
  tags={["WebSocket", "Predictions"]}
  rss={{
title: "Added client_order_id to orderbook delta messages",
description: "Orderbook delta WebSocket messages now include client_order_id field when the change is caused by your own order."
}}
>
  Added `client_order_id` field to orderbook delta WebSocket messages. This field appears only when you caused the orderbook change and contains the client\_order\_id of your order that triggered the delta.

  **WebSocket Message Enhancement:**

  * New field: `client_order_id` (string, optional)
  * Present only when the authenticated user's order causes the orderbook change
  * Contains the client-provided order ID of the triggering order

  See the WebSocket documentation for implementation details.
</Update>

<Update
  label="Aug 1, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Added GetOrderQueuePositions Endpoint",
description: "New endpoint for retrieving queue positions for multiple orders in a single request."
}}
>
  Added `GET /portfolio/orders/queue_positions` endpoint for retrieving queue positions of multiple resting orders.

  **Request Parameters:**

  * `market_tickers` (optional): Array of market tickers to filter by
  * `event_ticker` (optional): Event ticker to filter by

  Note: You must specify one of `market_tickers` and `event_ticker` in the request.
</Update>

<Update
  label="July 31, 2025"
  rss={{
title: "Documentation and RSS Feed Migration",
description: "RSS feed moved from trading-api.readme.io/changelog.rss to docs.kalshi.com/changelog/rss.xml. The trading-api.readme.io site is deprecated - use docs.kalshi.com instead."
}}
>
  We are migrating our API documentation to a new platform:

  * **RSS feed moved** from `https://trading-api.readme.io/changelog.rss` to `https://docs.kalshi.com/changelog/rss.xml`
  * **Documentation site** `trading-api.readme.io` is now deprecated
  * **New documentation home**: `https://docs.kalshi.com`
  * Historical changelog entries will not be backfilled to the new RSS feed

  Please update your bookmarks and RSS subscriptions.
</Update>

<Update
  label="July 31, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Additional event metadata",
description: "The GetEventMetadata endpoint has been expanded to include settlement sources."
}}
>
  The GetEventMetadata endpoint has been expanded to include settlement sources.
</Update>

<Update
  label="July 29, 2025"
  tags={["REST", "Predictions"]}
  rss={{
title: "Removed API versioning",
description: "The GetApiVersion endpoint has been removed. API versioning will not be available for the time being."
}}
>
  The GetApiVersion endpoint has been removed. API versioning will not be available for the time being.
</Update>

<Update
  label="June 26, 2025"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.12: ListenerSession and ReceiveSettlementReports Logon flags",
description: "Adds the ListenerSession Logon flag for KalshiNR/KalshiRT and the ReceiveSettlementReports Logon flag for KalshiRT. SecurityGroup is deprecated."
}}
>
  **FIX API v1.0.12**

  * Added support for ListenerSession Logon flag for KalshiNR/KalshiRT
  * Added support for ReceiveSettlementReports Logon flag for KalshiRT
  * Deprecated SecurityGroup
</Update>

<Update
  label="June 12, 2025"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.11: PostOnly on order creation and optional OrderQty on cancel",
description: "OrderQty is no longer required on Cancel (35=F), and PostOnly is added to Create (35=D)."
}}
>
  **FIX API v1.0.11**

  * Removed Required from OrderQty on Cancel 35=F
  * Added PostOnly to Create 35=D
</Update>

<Update
  label="Apr 15, 2025"
  tags={["FIX", "Predictions"]}
  rss={{
title: "FIX API v1.0.10: New Logon flags and removal of deprecated settlement message",
description: "Removes the deprecated event settlement message type and adds the ListenerSession and SkipPendingExecReports flags to the Logon message type."
}}
>
  **FIX API v1.0.10**

  * Removed deprecated event settlement message type
  * Added ListenerSession and SkipPendingExecReports flag to Logon message type
</Update>
