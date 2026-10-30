---
url: https://docs.kalshi.com/changelog
lastmod: 2026-10-29T21:32:30.531Z
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

**TBD**

Exit triggers canceled because their market was deactivated now return
`status_reason: market_deactivated`. Previously they returned no
`status_reason`.

**November 5, 2026**

`orderbook_delta` subscriptions accept an optional `update_interval_ms` of `100` or `1000`. Each window produces one net held delta per changed price level; zero-net levels are skipped, and processing and transport can delay delivery. Updates to your own orders within any subaccount restriction and snapshots bypass the interval. Changes to other participants' orders, including liquidity your trades consume, remain held. Apply each snapshot as a replacement for that market's local book. Omit `update_interval_ms` or set it to `0` for real-time updates, the default. Other signed 64-bit integer literals return error code 29; values that fail integer decoding return code 1 for the whole command.

Each connection has one `orderbook_delta` subscription. A repeated `subscribe` adds markets to the same `sid` and must use the same interval (omission means `0`); a mismatch returns error code 11. It does not resynchronize existing markets. Use `update_subscription` with `add_markets` to extend the current subscription, or `unsubscribe` and then `subscribe` again to change its interval.

Apply deltas in the subscription's `seq` order. Predictions `clock` values identify each level's latest included change and can decrease; they cannot be used to combine independently conflated streams. Public levels can lag your own orders and temporarily appear locked or crossed. Recover sequence gaps with `get_snapshot` for all subscribed markets, or `unsubscribe`, wait for `unsubscribed`, then `subscribe` again. When switching connections, rebuild from the new connection's snapshot. See Orderbook Updates for [Predictions](https://docs.kalshi.com/websockets/orderbook-updates.md) and [Margin](https://docs.kalshi.com/margin-ws/websockets/orderbook-updates.md) for the full recovery contracts.

**November 5, 2026**

FIX sessions on API keys restricted to one subaccount can now send `OrderMassCancelRequest` (35=q). `530=6` cancels the orders placed over that key's FIX session, as it does for any key. `530=1` cancels only that subaccount's orders in the market. `AllocAccount<79>` is optional; if sent, it must be that subaccount, otherwise the request is rejected.

**November 5, 2026**

`market_closed` is now `market_inactive`, and orders on a halted market
return it too.

**October 29, 2026**

After final settlement, a margin market reports open interest of 0 and
`price` equal to the final settlement price. Settlement does not add
trading volume.

**October 29, 2026**

Added `GET /portfolio/credit_history`.

**October 29, 2026**

The Margin Web Sockets API now supports `market_lifecycle_v2` for market deactivation and activation.

**October 29, 2026**

Direct members can now use subaccount-restricted API keys to move funds within
that subaccount between exchange indices with `POST /portfolio/intra_exchange_instance_transfer`.

**TBD**

The `communications` WebSocket channel adds RFQ batch messages:
`rfq_batch_created` and `rfq_batch_deleted` for all subscribers (only your
own with `user_filter: "self"`), `rfq_batch_best_quotes` and
`rfq_batch_executed` for the batch's requester, and `batch_quote_created`,
`batch_quote_accepted` and `batch_quote_executed` for each maker.
`quote_executed` carries `rfq_batch_id` for a batch child's trade. If your
client doesn't handle these messages, ignore them; see
[Forward compatibility](https://docs.kalshi.com/websockets.md#forward-compatibility).

Each child RFQ of a batch is also announced and closed as an ordinary RFQ:
`rfq_created` and `rfq_deleted` carry `rfq_batch_id`, REST RFQs carry
`rfq_batch_id` and `GET /communications/rfqs` lists children, and FIX sends
them as QuoteRequests (`35=R`). Makers can quote a child like a single RFQ;
see [RFQ batch children](https://docs.kalshi.com/getting_started/rfqs.md#rfq-batch-children) for the
differences.

**October 29, 2026**

Margin market responses now carry `halt_sources`, listing why a market is
halted and empty when it is not. An inactive market that has never opened
carries `initial_setup`, while one halted for a corporate action carries
`corporate_action`, so a halted market can be told apart from one that never
launched.

**October 29, 2026**

[Get All Subaccount Balances](https://docs.kalshi.com/api-reference/portfolio/get-all-subaccount-balances.md)
now accepts subaccount-restricted API keys. The response includes only the
key's locked subaccount, with separate balances per exchange index.

**October 29, 2026**

Added optional `NoMDEntryTypes<267>` and `MDEntryType<269>` fields to [FIX market data requests](https://docs.kalshi.com/fix/market-data.md). Select bids (`0`), offers (`1`), or trades (`2`), in any combination. Omit these fields to receive all three.

**October 29, 2026**

`GET /portfolio/orders` now accepts up to 100 comma-separated tickers in
`event_ticker`, up from 10. A filter on events that have no markets now
returns no orders. Previously it returned every order.

**October 29, 2026**

The Predictions `orderbook_delta` WebSocket channel now includes `clock` on
`orderbook_snapshot` and `orderbook_delta` messages. Unlike `seq`, `clock` is
the same on every connection, so you can use it to match a market's updates
across redundant connections. See
[Orderbook Updates](https://docs.kalshi.com/websockets/orderbook-updates.md) for ordering details.

**October 22, 2026**

`GET /portfolio/intra_exchange_instance_transfers` and
`GET /portfolio/intra_exchange_instance_transfers/{transfer_id}` optionally return the
`client_transfer_id` sent with `POST /portfolio/intra_exchange_instance_transfer`.

**October 19, 2026**

Kalshi continues to support post-only RFQ quotes. However, if the maker's
post-only order would cross the book at execution, the resulting cancellation
now counts toward the same quoting penalties as failing to confirm an
accepted quote. Repeated failures can temporarily rate limit new quotes.

See [Post-only quotes](https://docs.kalshi.com/getting_started/rfqs.md#post-only-quotes).

**October 22, 2026**

A milestone's `details.status`, when present, is maintained by a periodic
background job. It lags the game's live state and may be stale or
inaccurate, for example remaining `live` after the game ends. For game
status, prefer live data, which is updated far more often:
`live_data.details.status` from `GET /live_data/milestone/{milestone_id}`, or
each entry's `details.status` from `GET /live_data/batch`. Scores are in the
sport-specific fields of that live data `details` object.
This is a documentation clarification of existing behavior.

**October 22, 2026**

Added support for cache-specific Redis authentication and verified TLS for WebSocket session and request limits.

**October 22, 2026**

On the `user_orders` channel, `user_order` messages now truncate
`created_time`, `last_update_time`, and `expiration_time` to milliseconds
without rounding. For example, `.123456Z` becomes `.123Z`. These fields
remain RFC3339 strings and agree with the existing `created_ts_ms`,
`last_updated_ts_ms`, and `expiration_ts_ms` fields.

**October 22, 2026**

Updated the [Predictions](https://docs.kalshi.com/openapi.yaml) and [Margin](https://docs.kalshi.com/perps_openapi.yaml) REST
OpenAPI specifications so that definitions used by both APIs match existing behavior:

* `GET /margin/exchange/status` documents `exchange_estimated_resume_time`, which it already returns. The schema also lists `intra_exchange_transfers_active` and `exchange_index_statuses`, which the Margin exchange status never includes.
* `POST /portfolio/margin/subaccounts/transfer` lists `exchange_index`, which Margin transfers ignore.
* In the Margin specification, `POST /portfolio/intra_exchange_instance_transfer` documents `source_subaccount` and `destination_subaccount` and requires the three API key headers together.
* The Predictions `subaccount` query parameters document `minimum: 0`.
  If you generate client types from these specifications, refresh your schemas.
  These schema corrections describe existing behavior.

**October 15, 2026**

`GET /trade-api/v2/portfolio/balance` is now metered in its own bucket
instead of the Read budget. Basic and Advanced tiers can call it once per
second; every higher tier can call it five times per second. The bucket
holds one second of budget, so there is no burst. Calls above the rate
return `429`. Balance calls no longer draw down the Read budget, and other
reads do not draw down the balance bucket. Balance only changes on fills,
settlements and transfers, so react to those (for example the user fills
websocket channel) rather than polling this endpoint.

**October 22, 2026**

Funding now averages the premium over clock-aligned bars of one second or
longer, depending on the market. On
`GET /trade-api/v2/margin/funding_rates/estimate`, `premium_index` is the
premium of the final bar evaluated and `premium_index_ts` is that bar's last
second. `funding_invalid_premium_handling` now applies per bar: a bar with no
orderbook sample or index price, or with a trading halt in any of its seconds,
counts as 0 under `dampen` and is left out under `exclude`.

**October 22, 2026**

`OrderMassCancelRequest` (35=q) accepts `530=1` (cancel orders for a security) with `Symbol<55>`. It cancels every resting order the account has in that market, YES and NO, however it was placed, and is billed like an order cancel (35=F). The `OrderMassCancelReport` (35=r) answers with `531=1` and echoes `55`; an unknown ticker is rejected with `532=1`. `530=6` is unchanged.

**October 15, 2026**

Registered MCP clients can read portfolio balances, positions, orders and fills using explicitly granted `read::mcp_portfolio` OAuth access. These grants do not allow order execution or funding changes. Already-public market, event and series reads accept a resource-bound MCP grant for per-user rate accounting; their anonymous payloads remain unchanged.

`GET /events/{event_ticker}` accepts `exclude_markets=true` for metadata-only reads. Retrieve bounded outcome pages with `GET /markets?event_ticker=...&limit=...&cursor=...`.

**October 22, 2026**

Every margin KalshiNR and KalshiRT session receives a `SecurityStatus (35=f)` when
the exchange applies a stock split, final settlement or ticker change, after that
market's earlier execution reports. Every event carries
`SecurityTradingEvent (1174)=9` and the notice ID from
`GET /trade-api/v2/margin/corporate_actions` in tag `20190`, with standard action
codes and final settlement prices in dollars. `Symbol (55)` is the market's
current ticker. KalshiRT retains these messages for retransmission. Cash corporate
actions are not sent, and KalshiMD sessions do not receive these messages. See
[Order Entry](https://docs.kalshi.com/fix-margin/order-entry.md).

**October 22, 2026**

The public margin `corporate_actions` channel sends a `corporate_actions_delta`
when the exchange applies a stock split, final settlement or ticker change, with no
initial snapshot. Each message carries the notice `id` from
`GET /trade-api/v2/margin/corporate_actions`, `type`, `ts_ms` and exactly one matching
terms object: `split`, `final_settlement` or `ticker_change`. Prices are dollar strings.
Cash corporate actions are not streamed. Positions are not streamed over WebSocket,
and an applied corporate action can change positions and balances without a fill:
re-fetch them from `GET /trade-api/v2/margin/positions` and
`GET /trade-api/v2/margin/balance` after each event.

**October 22, 2026**

`GET /trade-api/v2/margin/corporate_actions` returns scheduled notices and
notices updated in the last seven days, with optional `ticker` and `market_id` filters.
Notices are sorted by ex-date ascending (earliest first), with undated notices last.
Ties are ordered by `updated_ts` ascending, then `id` ascending.
Each notice carries a stable id, market identity, `type`, `updated_ts` and a
`scheduled`, `cancelled`, `applied` or `lapsed` status. Scheduled, applied and
lapsed notices include `execution_time` and exactly one matching terms object:
`cash` for dividends and spin-offs, `split`, `final_settlement` or `ticker_change`.
Amounts are dollar strings. Cancelled notices omit all terms and `execution_time`.

**October 15, 2026**

`GET /trade-api/v2/margin/markets/orderbooks` returns the current orderbooks
of several margin markets in a single request. Pass up to 100 tickers as a
comma-separated `tickers` query parameter; the response carries one entry per
requested ticker, in request order, each with the same `bids` and `asks`
levels as `GET /trade-api/v2/margin/markets/{ticker}/orderbook`. A ticker
that is not a margin market returns `404`.

**October 15, 2026**

`POST /trade-api/v2/multivariate_event_collections/{collection_ticker}` now
explains `invalid_parameters` rejections in the `message` field: too few or
too many selected markets (for example, "Select at least 2 markets to create
a combo."), a market whose event is not in the collection, a NO side on a
YES-only market, per-event selection limits, an inactive market, and a
collection that is closed or not yet open. When specific markets are at
fault, `details` lists their tickers as a comma-separated string.

The HTTP status (`400`) and `code` (`invalid_parameters`) are unchanged.

**October 15, 2026**

`GET /trade-api/v2/margin/markets` and
`GET /trade-api/v2/margin/markets/{ticker}` now include
`funding_invalid_premium_handling`, configured at creation. `dampen` counts a
second with no premium as 0 in the funding average; `exclude` leaves it out.

**October 15, 2026**

`GET /trade-api/v2/margin/markets` and
`GET /trade-api/v2/margin/markets/{ticker}` now include `funding_deadband`,
`funding_cap`, and `funding_limit_unit` configured at creation. These values
do not reflect later clearing configuration changes.

**October 15, 2026**

`POST /portfolio/intra_exchange_instance_transfer` accepts an optional UUID
`client_transfer_id` for primary accounts. Reuse it only for identical retries
to prevent duplicate transfers. Client IDs are not supported for transfers
involving numbered subaccounts.

**October 15, 2026**

`GET /trade-api/v2/margin/trades` now accepts an optional `ticker`.
Omit it to retrieve trades across all margin markets. Existing cursor
pagination, timestamp filters, and page limits still apply.

**October 15, 2026**

`GET /trade-api/v2/margin/markets` and
`GET /trade-api/v2/margin/markets/{ticker}` now include `bid_size_fp` and
`ask_size_fp`: total contracts resting at the best bid and ask prices,
respectively, as fixed-point count strings. An empty side returns `"0.00"`;
both fields are omitted when market stats are unavailable.

**October 15, 2026**

API keys restricted to a single subaccount can now place, amend, decrease,
cancel, and read perps orders, and read perps positions and fills. Omitting
`subaccount` uses the locked subaccount; naming any other subaccount returns
`403`. Perps balance and risk are not yet available to restricted keys.

**October 8, 2026**

FIX logon now accepts API keys with `read` and `write::trade`, not only
parent `write`.

**October 8, 2026**

`GET /multivariate_event_collections` and
`GET /multivariate_event_collections/{collection_ticker}` now return
`price_level_structure` and `price_ranges` on each collection.

**October 8, 2026**

All RFQ subscribers notified after an RFQ closure.

**October 8, 2026**

Since the exchange sharding rollout, orders placed through the Kalshi App
and Web automatically transfer capital between exchange shards as needed
to fund the order.

Market makers can disable this feature on the
[Exchange Indexes settings page](https://kalshi.com/account/exchange-indexes).

**October 8, 2026**

`GET /trade-api/v2/margin/markets` and `GET /trade-api/v2/margin/markets/{ticker}`
now return `market_version`. A market starts at version 1, and the version
increases when trading resumes after a corporate action, such as a stock split.
`POST /trade-api/v2/margin/orders` accepts an optional `market_version`. If
it is set and the market has moved to a different version, the order is
rejected with HTTP 409 and error code `market_version_mismatch`; when you
see this error, read the market again before resubmitting. If you omit it
or send 0, the order is placed without the check. A market read can
briefly return the previous version right after trading resumes.

**October 8, 2026**

FIX market data trade entries now include `TradeID (1003)`.

**October 8, 2026**

`GET /portfolio/fills` now accepts up to 100 comma-separated market tickers
in `ticker`, for example `?ticker=MARKET-A,MARKET-B`.

**October 1, 2026**

Margin exit-trigger writes reject a `stop_loss_price` at or past the position's liquidation
price (at or below it for a long, at or above it for a short) with `400` and error code
`stop_loss_past_liquidation`, because the position would be liquidated before the stop could
trigger. Existing triggers are unchanged.

**October 1, 2026**

`GET /portfolio/positions` now accepts `settlement_status=unsettled|settled|all`.
The default remains `unsettled`. Use `settled` for positions that have settled
but have not yet moved to `GET /historical/positions`; use `all` for both live
states. For complete position history, page through live positions first,
then `GET /historical/positions`, using the same `subaccount` and deduplicating
by ticker. See [Historical Data](https://docs.kalshi.com/getting_started/historical_data.md).

**October 1, 2026**

WebSocket messages now include `sending_ts_ms`. See the [WebSocket docs](https://docs.kalshi.com/websockets/websocket-connection.md) for more info.

**October 1, 2026**

Predictions and Margin REST amend requests accept `expiration_time`.
Omit it to preserve expiry, use `0` to clear it,
or supply a future Unix timestamp in seconds. Send the current price and total
quantity for an expiry-only amendment; queue priority is preserved.

FIX replace (`35=G`) requires GTD (`59=6`) with a future `ExpireTime` (`126`)
to set a custom expiry; Day (`59=0`) without `126` sets the end-of-day ET
deadline, and GTC (`59=1`) without `126` clears it. `126` alone and expired
deadlines, including the Unix epoch, are rejected. As a Kalshi-specific
convention, omitting both tags preserves expiry. Kalshi guarantees FIFO
preservation for expiry-only amendments. Price changes and size increases
retain their existing queue-priority rules. Replaced reports confirm the accepted
deadline with GTD and `126` (including normalized Day deadlines), or GTC without
`126` when expiry is cleared.

**October 1, 2026**

Creating or updating a bracket exit trigger now requires every supplied
`stop_loss_price` and `take_profit_price` to be strictly positive. Zero prices
return HTTP `400`. Omitted legs and cancellation behavior are unchanged;
use `DELETE` to cancel an exit trigger.

**October 1, 2026**

Markets now include `settlement_bounds_type`, which is `default` or `floor`.
Markets of type `floor` also include `settlement_floor_dollars`: the lowest
value the YES side can settle at.

**Affected endpoints:**

* `GET /markets` and `GET /markets/{ticker}`
* `GET /historical/markets` and `GET /historical/markets/{ticker}`
* `GET /events`, `GET /events/multivariate` and `GET /events/{event_ticker}` (nested markets)
* `POST /multivariate_event_collections/{collection_ticker}`

**October 1, 2026**

* ExecutionReports (35=8) for resting orders canceled because a market's settlement bounds changed now carry a Text (58) reason of `SETTLEMENT_BOUNDS_CANCEL`
* A raised settlement floor cancels every resting order priced at or below the new floor

**October 1, 2026**

[user\_orders](https://docs.kalshi.com/websockets/user-orders.md) messages report
`last_update_reason: "SettlementBoundsCancel"` when a resting order is
cancelled because a settlement bounds update put it out of bounds.

**October 1, 2026**

The web app's "Create New API Key" dialog now generates an Ed25519 key pair
by default; choose RSA for clients that support only RSA-PSS. Existing keys
are unchanged, and `POST /trade-api/v2/api_keys/generate` still defaults to
`rsa` when `key_type` is omitted. The official Python and TypeScript SDKs
sign with either key type from version 3.31.0. See
[API Keys](https://docs.kalshi.com/getting_started/api_keys.md).

**October 1, 2026**

`NewOrderSingle` (`35=D`) accepts `ExecInst` (`18`) `E` for reduce-only orders
with IOC, or IOC or FOK on Margin; it is not supported when accepting a quote.
A reduce-only order canceled because there was no position to reduce reports
`Text` (`58`) `REDUCE_ONLY`.

**October 1, 2026**

Set `obscure_creator_id: true` when creating an RFQ over REST, or
`ObscureCreatorId` (`21034`) to `Y` over FIX, to hide the requester's public
communications ID from other users.

Obscured creator fields display the shared placeholder
`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

Creators still see their own normal ID. After successful quote execution, the
hashed RFQ creator identity will become visible. Subsequent REST RFQ responses
show the normal public communications ID to all viewers. See
[Creator identity and privacy](https://docs.kalshi.com/getting_started/rfqs.md#creator-identity-and-privacy)
for the field mapping and lifecycle.

Affected endpoints:

* REST: `POST /communications/rfqs`, `GET /communications/rfqs`, `GET /communications/rfqs/{rfq_id}`, `GET /communications/quotes`, and `GET /communications/quotes/{quote_id}`.
* WebSocket: `rfq_created`, `rfq_deleted`, `quote_created`, and `quote_accepted`.
* FIX: `ObscureCreatorId` (`21034`), `NoPartyIDs` (`453`), `PartyID` (`448`), and `AllocAccount` (`79`).

**October 1, 2026**

`GET /trade-api/v2/margin/funding_rates/premium_index` returns an informational
per-second premium index for a perp, for a window of up to one hour. Each
point is the signed fraction by which the impact-price book sat above or
below the underlying index at that second, before any time weighting.
A second with no measurable premium reports `0`.

The [`funding-rate estimate`](https://docs.kalshi.com/api-reference/perps/get-funding-rate-estimate)
response also includes `premium_index` and `premium_index_ts` for the final
second evaluated by the estimate, captured from the same calculation inputs.
Both fields are omitted when that second has no available premium.

**The historical premium-index series is informational and may differ from
actual funding calculations. Current funding estimates remain provisional
until funding is finalized.**

**October 1, 2026**

Margin FIX Execution Reports with `ExecType=Trade` now include
`ClearingBusinessDate` (tag `715`) in `YYYYMMDD` form. Trades at or after
4:00 p.m. ET carry the next calendar day's date, including on weekends and
holidays. See [Order Entry](https://docs.kalshi.com/fix-margin/order-entry.md).

**October 1, 2026**

`user_orders` messages now include `last_update_reason`. Reduce-only orders with
no position to reduce report `ReduceOnlyCancel` (previously `Decrease` on Margin).

**October 1, 2026**

Subscribe to [communications](https://docs.kalshi.com/websockets/communications.md) with
`user_filter: "self"` to receive `rfq_created` and `rfq_deleted` only for
RFQs you created. Omit `user_filter` or set it to `""` to continue receiving
RFQs from all users. Quote notifications are unchanged.

**October 1, 2026**

Breaking Change: the deprecated `liquidity_dollars` field is removed from
market responses. The field was deprecated in February 2026 and has always
returned `"0.0000"` since then. For top-of-book size, use `yes_bid_size_fp`
and `yes_ask_size_fp` on the market object.

**Affected endpoints:**

* `GET /trade-api/v2/markets`
* `GET /trade-api/v2/markets/{ticker}`
* `GET /trade-api/v2/historical/markets`
* `GET /trade-api/v2/historical/markets/{ticker}`
* `GET /trade-api/v2/events`
* `GET /trade-api/v2/events/{event_ticker}`
* `GET /trade-api/v2/events/multivariate`
* `POST /trade-api/v2/multivariate_event_collections/{collection_ticker}`

**October 1, 2026**

FIX [RFQ and quote messages](https://docs.kalshi.com/fix/rfq-messages.md) now include the creation time in `TransactTime` (tag `60`), matching WebSocket `created_ts`.

**October 1, 2026**

The Margin `ticker` WebSocket channel now includes `reference_price` for
perps whose underlying index comes from Pyth, such as gold and silver.
Previously only CF Benchmarks-indexed crypto perps carried it on the
channel, while `GET /trade-api/v2/margin/markets` returned it for both. The
value is the underlying index scaled to one contract, and `ts_ms` is the
index source timestamp.

**September 24, 2026**

API keys may now be Ed25519 or RSA. Register an Ed25519 public key with
`POST /trade-api/v2/api_keys`, or pass `key_type: "ed25519"` to
`POST /trade-api/v2/api_keys/generate` to receive a PKCS#8 Ed25519 private
key; the generate response includes `key_type`. Ed25519 requests use the
same `KALSHI-ACCESS-*` headers and pre-sign text as RSA, with an Ed25519
signature in place of RSA-PSS, on REST, WebSocket and FIX (`RawData`).
`key_type` defaults to `rsa`; existing RSA keys are unchanged. In the web app,
register an Ed25519 key by pasting its public key; web-generated keys remain
RSA for now. See [API Keys](https://docs.kalshi.com/getting_started/api_keys.md).

**September 24, 2026**

Predictions read and write rate limits are increasing 20% for Premier,
Paragon, Prime, and Prestige.
See [Rate Limits and Tiers](https://docs.kalshi.com/getting_started/rate_limits.md#tiers-and-budgets)
for the latest values.

**September 24, 2026**

Public WebSocket connections support RFC 7692 `permessage-deflate`
compression when the client offers it during the opening handshake.
Clients can choose to remain uncompressed by omitting `permessage-deflate`
from the opening handshake. Message formats and the 64 MiB message limit are
unchanged.

Fragmented messages remain intact when Ping or Pong frames arrive between
fragments, whether compressed or uncompressed.

**September 24, 2026**

`POST /trade-api/v2/portfolio/target_balance_allocation` now accepts
`resting_margin_reservation: "none"` to reserve no collateral for resting orders
during automatic rebalancing.
Omitting the setting continues to default to `sum`.

**September 24, 2026**

`GET /trade-api/v2/historical/fills` and `GET /trade-api/v2/historical/orders`
now support subaccount-restricted API keys and the optional `subaccount`
query parameter. Restricted keys return only their assigned subaccount's
data and reject requests for a different subaccount. Unrestricted keys
continue to return all subaccounts when the parameter is omitted.

**September 24, 2026**

`orders_updated_ts` in `GET /trade-api/v2/historical/cutoff` now advances
independently of the other cutoffs and sits two weeks before the present.
Read it before querying orders.

**September 17, 2026**

`GET /trade-api/v2/margin/markets` and `GET /trade-api/v2/margin/markets/{ticker}`
include optional `product_metadata.important_info.markdown` for market notices.

**September 17, 2026**

Margin market GET responses now return the market's configured price increment in
`tick_size`, including after a tick-size update.

**September 17, 2026**

Updated the [Predictions](https://docs.kalshi.com/asyncapi.yaml) and [Margin](https://docs.kalshi.com/perps_asyncapi.yaml)
WebSocket AsyncAPI specifications to accurately describe existing nullable
fields, enum values, and response fields. The Predictions ticker schema also
permits signed integers for `dollar_volume` and `dollar_open_interest`.
If you generate client types or validate messages against these specifications,
refresh your schemas.
These schema corrections describe existing message formats.

**September 17, 2026**

`EventResendRequest` (`35=U1`) on `KalshiNR` and `KalshiDC` will require account
allowlisting for Predictions and Margin. Contact
[institutional@kalshi.com](mailto:institutional@kalshi.com) to request access.

**September 17, 2026**

`GET /trade-api/v2/historical/fills` and
`GET /trade-api/v2/historical/orders` now accept `min_ts`.

**September 17, 2026**

Reduced rate limit cost for QuoteConfirm when providing the RFQ ID.

**September 17, 2026**

`GET /trade-api/v2/portfolio/target_balance_allocation` now returns
`resting_margin_reservation` (`max` or `sum`), including when allocations are empty.
Clients can preserve the current resting-order collateral reservation policy when
updating target allocations or stopping automatic rebalancing.

**September 17, 2026**

Series objects now include `categories`, the list of discovery categories
for a series. The existing `category` field is the series' primary
category. The `category` filter on `GET /trade-api/v2/series` matches any
entry in `categories`, so a series returned for `category=Commodities` can
show a different primary `category`.

**Affected endpoints:**

* `GET /trade-api/v2/series`
* `GET /trade-api/v2/series/{series_ticker}`

**September 17, 2026**

As of the September 17th maintenance window, new combos will be created on the
`KXMVECROSSCATEGORY` series, and Football combos on the
`KXMVECROSSCATEGORY0` series.

**Notes**

* The exchange shard (1) is staying the same.
* No existing tickers are changed.

**September 17, 2026**

Fixed a race that could skip events arriving immediately after a `subscribed`
response, including on the `cfbenchmarks_value_5hz` channel. The acknowledgement
continues to precede subscription data.

**September 17, 2026**

RFQ and quote creation/cancellation, quote acceptance/confirmation, and
FIX New Order Single (`35=D`) carrying `QuoteID` now consume the shard 1
Write budget, shared with shard 1 order writes. Endpoint costs and Read
budgets are unchanged. No `exchange_index` or `ExDestination` is required.

**September 10, 2026**

Margin creates and amends now use per-shard Write budgets, shared across the API
and FIX and selected automatically from `ticker` or `Symbol` (tag 55).
If the ticker's shard cannot be resolved, the request uses the default margin
Write budget.

**September 10, 2026**

Breaking Change: the deprecated `available_on_brokers` field is removed
from event responses. The field stopped being populated in August 2026 and
has always returned `false` since then.

**Affected endpoints:**

* `GET /trade-api/v2/events`
* `GET /trade-api/v2/events/multivariate`
* `GET /trade-api/v2/events/{event_ticker}`

**September 10, 2026**

Target-cost RFQs can now opt out of fee-inclusive sizing. By default the
target cost caps principal *plus* Kalshi fees, so derived quote sizes
(`yes_contracts_fp` / `no_contracts_fp`, FIX `BidSize`/`OfferSize`) are
reduced to keep your total debit inside the cash amount. Setting
`target_cost_excludes_fees: true` on `CreateRFQ` (or
`TargetCostExcludesFees(21033)=Y` inside the `NoRelatedSym` group on a FIX
QuoteRequest with `CashOrderQty(152)`) sizes quotes as principal only —
contracts = target cost / price — with your taker fee charged on top of
the target cost. The flag is rejected without a target cost.

**September 10, 2026**

`GET /trade-api/v2/incentive_programs` now accepts
`type=margin_taker_volume`. These programs reward taker notional on Margin
markets and include the optional `max_reward_per_account` field.

**September 10, 2026**

`GetWeatherIndex` points now include an optional `receipt_basis` field.
It is absent on canonical points. It is `synoptic_latency` on points
written by the historical backfill that seeds a newly listed city's series
for the period before it went live: those minutes judged the receipt
deadline against `observation_time + Synoptic ingest latency` instead of
Kalshi's local receipt clock, and are not settlement-eligible.

**September 10, 2026**

`GetMarginMarkets` and `GetMarginMarket` responses now include an
`asset_class` field with the market's asset class grouping (for example
`Crypto` or `Metals`). The field is omitted for markets without an assigned
class. New asset classes may be added over time.

**September 10, 2026**

Starting at 12:00 PM ET on September 10, 2026, new commodities markets will
be created on shard 2 and new basketball markets will be created on shard 3.
See [Exchange Sharding](https://docs.kalshi.com/getting_started/exchange_sharding.md) for changes to
trading.

**September 10, 2026**

Market lifecycle messages now report the `center_deci_edge_centi_cent` price
level structure and its price ranges. That value previously serialized as an
empty string.

**September 10, 2026**

The AsyncAPI specs described some messages inaccurately. The corrections below
document behavior the service already has. No message contents change.

* `seq` is documented on the Predictions trade, market lifecycle, multivariate
  market lifecycle, event lifecycle, event fee update, and RFQ and quote
  messages, and on the Margin trade message. These channels have always been
  sequenced.
* `order_source` is documented on Margin fill and user order messages.
* `sid` and `seq` are documented on error messages scoped to a subscription.
* Error codes 6, 16, and 17 are retired. The service does not emit them and
  their numbers stay reserved. Error codes are now an explicit list on both
  exchanges; the Margin list includes codes 23, 24 and 28, which are
  reachable on channels outside the documented margin surface.
* The multivariate market lifecycle schema lists only the events and fields
  that channel sends.
* `market_id` and `market_ticker` are removed from the error schema. The
  service never sent either.

If you generate a client from the specs, regenerate it to pick up the
corrected schemas.

**September 3, 2026**

The new `cfbenchmarks_value_5hz` websocket channel streams CF Benchmarks
index values at up to 5 updates per second on indices the vendor publishes
at 200ms granularity (currently BRTI, ETHUSD\_RTI, SOLUSD\_RTI, XRPUSD\_RTI,
and DOGEUSD\_RTI). Messages carry the raw vendor frame plus parsed value
fields. The existing once-per-second
[`cfbenchmarks_value`](https://docs.kalshi.com/websockets/cfbenchmarks-value) channel and its
rolling averages are unchanged.

**September 3, 2026**

FIX market data sessions now support up to 100,000 active subscriptions. See
[Predictions FIX Market Data](https://docs.kalshi.com/fix/market-data.md) and [Margin FIX Market
Data](https://docs.kalshi.com/fix-margin/market-data.md).

**September 3, 2026**

Book entries on `MarketDataIncrementalRefresh<35=X>` now include
`ClOrdID<11>` and `AllocAccount<79>` when your order caused the level change.
These private annotations are omitted for other users' orders and sibling
accounts hidden by a restricted API key. See
[Predictions FIX Market Data](https://docs.kalshi.com/fix/market-data.md) and
[Margin FIX Market Data](https://docs.kalshi.com/fix-margin/market-data.md).

**September 3, 2026**

New authenticated endpoint `GET /trade-api/v2/margin/fee_tier_rates` returns
the fee schedule that applies to your margin-enabled account.

**September 3, 2026**

`GET /fcm/orders` now accepts the `client_order_ids` query parameter, a
comma-separated list of up to 100 client order IDs. At least one of
`subtrader_id` or `client_order_ids` is required; supplying both returns only
the orders matching both filters. A `client_order_ids` lookup searches only
orders created within the last 24 hours, and a `min_ts` earlier than that is
raised to 24 hours ago. Client order IDs are only unique within a subtrader
among live and recent orders, so a single ID can match orders across
subtraders or across time.

**September 3, 2026**

`GET /historical/positions` now accepts the `subaccount` query parameter to
retrieve archived positions for a numbered subaccount. If omitted, the
endpoint continues to return positions for the primary subaccount.

**September 3, 2026**

`POST /trade-api/v2/portfolio/events/orders/{order_id}/amend` and
`POST /trade-api/v2/margin/orders/{order_id}/amend` now return
`remaining_count` after any immediate fills caused by the amendment.
Previously, a crossing price-only amendment could report zero, while an
amendment that changed both price and quantity could report the pre-match
remainder. The amendment itself executed correctly; only the response field
was affected. `fill_count` continues to report fills caused by this amendment.

**September 3, 2026**

Cancel-all requests now consume the same number of write tokens as cancelling
one order on the corresponding exchange.

**September 3, 2026**

`POST /portfolio/target_balance_allocation` now accepts
`resting_margin_reservation`. `max` reserves the largest single market-side
commitment. `sum` is the default and reserves all resting-order margin.

**September 3, 2026**

Predictions FIX Execution Reports with `ExecType=Trade` now include
`ClearingBusinessDate` (tag `715`) in `YYYYMMDD` form, using the Eastern
calendar date of the report's `TransactTime`. See [Order Entry](https://docs.kalshi.com/fix/order-entry.md).

**August 31, 2026**

New endpoint `GET /live_data/weather/{city}/calibrations` returns the
published weather-index configuration timeline — the launch configuration
plus every weekly offset calibration and methodology update, ascending by
effective time. Each record carries the station weights, station offsets
(Celsius), the city reference, and the calibration window and per-station
disposition notes, so index values can be reproduced under the
configuration version that computed them. Weather index points already
report that version in `config_version`.

**August 29, 2026**

Trade API v2 structured target responses now include the target's public
image URL in `details.image_url`, removing the need to fetch the v1
`product_details.image_url` fallback separately.

**August 27, 2026**

Trade API v2 market responses can now return available Spanish or Portuguese
translations, including localized market rules, when requested with the
`Accept-Language` header. Regional variants such as `es-MX` and `pt-BR` are
supported. Requests without a supported language continue to receive English.

**August 27, 2026**

Trade entries on `MarketDataIncrementalRefresh<35=X>` now carry
`TrdType<828>`=`1` for block trades. The tag is absent on regular order book
trades.

**August 27, 2026**

The `user_orders` WebSocket channel now includes `exchange_index` on each
order update, identifying the exchange shard where the order resides.

**August 27, 2026**

New endpoints cancel all resting Predictions or margin orders across every
subaccount or one selected subaccount. Newly placed orders may also be
cancelled during the minute after the request.

**August 27, 2026**

The [CF Benchmarks REST Passthrough](https://docs.kalshi.com/cfbenchmarks/rest-passthrough.md) page
now documents retrieving historical index values through the existing
`GET /trade-api/v2/cfbenchmarks/*` endpoint, and the
[CF Benchmarks Value Feed](https://docs.kalshi.com/websockets/cfbenchmarks-value.md) websocket page
links to it. Some indices publish at intra-second granularity on the
history endpoint; refer to the official CF Benchmarks API documentation
for supported indices and granularities.

**August 27, 2026**

The `available_on_brokers` field on the individual and batch `GET` events
endpoints is deprecated. It is no longer populated and always returns
`false`. The field will be removed in a future release.

**August 27, 2026**

Exchange auto-routing enabled by default when providing `market_ticker` and excluding `exchange_index` parameter.

**August 20, 2026**

Members on the Prime tier or above can contact
[institutional@kalshi.com](mailto:institutional@kalshi.com) to discuss VPC
peering for production WebSocket and FIX connectivity from their AWS VPC.
Existing AWS PrivateLink connectivity remains available to members on the
Premier tier or above.

See [API Environments and Endpoints](https://docs.kalshi.com/getting_started/api_environments.md#private-connectivity),
[FIX Connectivity](https://docs.kalshi.com/fix/connectivity.md#private-connectivity), and
[Margin FIX Connectivity](https://docs.kalshi.com/fix-margin/connectivity.md#private-connectivity).

**August 27, 2026**

`GET /trade-api/v2/incentive_programs` now accepts
`type=margin_maker_volume`. These programs include the optional
`max_reward_per_account` field; event-only fields are omitted when they do
not apply.

**August 20, 2026**

New endpoint: `GET /trade-api/v2/live_data/weather/{city}` serves the
Kalshi-computed city temperature index — the canonical minute-resolution
series behind hourly temperature markets (`miami` first). Values are
Fahrenheit rounded to 0.01; minutes where the index quorum failed are
omitted, so gaps are real gaps. Window via `from`/`to` (unix ms) or
`last_sec`, defaulting to the trailing 24 hours. With `detailed=true`,
each point carries every member station's reported reading and
quality-control disposition before incorporation into the index, and
trailing minutes still inside the receipt deadline are additionally
served as `incomplete` points: no index value (`v` is absent, not `0`),
with the raw, not-yet-quality-controlled station readings recorded so
far (station code `pending`).

**September 3, 2026**

Multivariate (combo) markets are moving from `deci_cent` (a uniform \$0.001
tick) to `center_deci_edge_centi_cent`: \$0.0001 (0.01¢) ticks below \$0.01
and above \$0.99, with \$0.001 (0.1¢) ticks in between. Other markets are
unchanged.

No API fields or message formats change. Prices below \$0.01 and above
\$0.99 use all four decimal places of the existing `*_dollars` fields — read
prices from those fields (integer-cent fields cannot represent sub-cent
prices) and snap order and RFQ quote prices to the `step` of the band
containing the price in the market's `price_ranges` array rather than keying
off the structure name.

Existing combo markets migrate in place with resting orders preserved. After
this release every combo market is on `center_deci_edge_centi_cent`. See
[Fixed-Point Representation](https://docs.kalshi.com/getting_started/fixed_point_migration.md) for the
full structure reference.

**August 24, 2026**

Upcoming exchange sharding: Crypto, Tennis, and Baseball will be provisioned
on dedicated exchange instances. Please see
[Exchange Sharding](https://docs.kalshi.com/getting_started/exchange_sharding.md) for changes to trading.

**August 22, 2026**

As a result of trader feedback, the formerly announced planned change to
remove `post-only` on quotes is cancelled. This flag will be preserved.

However, to protect against "locked" markets which can occur if a quoter
with post-only repeatedly crosses the book, quoters with post-only set to
true may be temporarily rate limited if they cross several times in short
succession.

The formerly announced change adjusting maker and taker fees in the event a
quoter matches against a recently placed resting order will proceed as
scheduled at 11:59 PM ET on August 21.

**August 22, 2026**

**Rollout timing:**

* Maker fees will be enabled at 5:00 AM ET on Thursday, August 20, after the
  maintenance window.
* ~~Post-only mode will be disabled and~~ the quoter fee swap will be
  enabled at 11:59 PM on Friday, August 21.

For combo trades, if a quoter executes against an order that has rested on
the book for less than five seconds, both parties' fees will be adjusted: the
quoter will pay the maker fee, and the resting counterparty will pay the
taker fee. The maker fee uses a fee multiplier of `0.5`, rather than the
standard `0.25`. See the
[Kalshi Fee Schedule](https://kalshi.com/fee-schedule) for details.

**August 20, 2026**

Combo markets created after 11:59 PM ET on August 19, 2026 that are composed
entirely of independent NFL components will have no maker fee. The Exchange
will consider a market to be composed of independent components if every
component ties to a different milestone (NFL game) and the market consists
exclusively of NFL components. Markets that meet these conditions will be
created under the `KXMVECROSSCATEGORY0-SHARD1` series.

**August 20, 2026**

`MarketDataSnapshotFullRefresh<35=W>` and
`MarketDataIncrementalRefresh<35=X>` entries now include
`MDEntryDate<272>` and `MDEntryTime<273>`. Snapshot values identify when the
snapshot was captured. Incremental values identify the exchange event that
produced the update.

**August 20, 2026**

`POST /trade-api/v2/portfolio/intra_exchange_instance_transfer` accepts
optional `source_subaccount` and `destination_subaccount` fields for
transfers between prediction exchange indexes.

Cross-exchange-index subaccount transfers run in up to three non-atomic
steps. If a later step fails, completed steps are not undone,
so funds may remain in the primary account on the source or destination
exchange index.

**August 20, 2026**

New endpoints available for managing a target balance allocation across exchange shards.

* `POST /trade-api/v2/portfolio/target_balance_allocation`
* `GET /trade-api/v2/portfolio/target_balance_allocation`

**August 20, 2026**

`GET /trade-api/v2/portfolio/summary/total_resting_order_value` now returns
`resting_order_value_breakdown`, with a fixed-point dollar `balance` for each
exchange index.

**August 20, 2026**

Exchange index provided on REST fill, settlement, and market position responses and WebSocket fill messages.

**August 20, 2026**

`GET /portfolio/orders`, `GET /portfolio/positions`, and `GET /portfolio/fills` now accept an optional `exchange_index` filter.
Omitting it returns results from all exchange indexes.

**August 20, 2026**

Sub-account-restricted API keys can now use the
[communications endpoints](https://docs.kalshi.com/api-reference/communications) and create combo
markets, scoped to the key's locked sub-account: omitting `subaccount` acts
on the locked sub-account, any other sub-account is rejected, and a
different sub-account's RFQs and quotes cannot be read in detail or acted
on. Scoping matches rows created through the API; web-created RFQs are not
addressable per sub-account. The `write::trade` scope is now sufficient for
`POST /multivariate_event_collections/{collection_ticker}` (parent `write`
keys are unaffected). On FIX, restricted sessions still support the maker
quote lifecycle only; block-trade endpoints also remain unavailable to
restricted keys.

**August 20, 2026**

`GET /trade-api/v2/portfolio/balance` returns `balance` and `portfolio_value`
across all exchange indexes by default. Pass `exchange_index` to scope both
values to one exchange index.

**August 16, 2026**

`GET /trade-api/v2/api_keys` now returns `api_key_region_expiration_ts`, the
unix timestamp (seconds) when your location attestation for API key requests
expires. Once this date has passed, API keys are not valid for trading
Sports, Elections, and Entertainment markets. The field is absent when the
account has never attested.

**August 20, 2026**

Stop-loss, take-profit, and trailing-stop triggers on margin positions are now available
over REST:

* `PUT`, `GET`, and `DELETE` on `/trade-api/v2/margin/isolated/positions/{ticker}/exit_trigger`
* `PUT`, `GET`, and `DELETE` on `/trade-api/v2/margin/cross/positions/{ticker}/exit_trigger`
* `PUT` and `DELETE` on `/trade-api/v2/margin/cross/positions/{ticker}/exit_trigger/{trigger_id}`

A position holds at most one live `trailing` stop. Non-isolated positions may hold up to 20
live `bracket` (stop-loss / take-profit) triggers at once, so long as their counts fit the
position. Isolated positions hold one. `kind` selects the family: on `GET` and `DELETE`,
omitting it covers both, while a `PUT` without one writes a `bracket`. Orders fired by a
trigger are reduce-only.

Order-anchored triggers return to `pending_on_entry` after closing their current quantity,
because the anchor order can still add fills — so `status` is not monotonic, and only a
`filled` trigger with no `anchor_order_id` is done. A `count` or `anchor_order_id` create
appends a trigger, so it requires `client_trigger_id` and replaying one returns the trigger
the first request made; the key belongs to the position it created on, and reusing it for
another position returns `409` rather than that position's trigger.

Non-isolated positions take a `subaccount`, and additionally support partial triggers via
`count`, triggers tied to an order via `anchor_order_id`, and the `{trigger_id}` routes for
managing one of several triggers on the same position. Isolated positions hold a single
trigger per kind and always close in full. A supplied `count` must be a whole number of
contracts.

If an anchor order cannot currently be validated, its trigger request returns `409` with
error code `anchor_order_unavailable` before writing a trigger. Retrying that response is safe.

**August 13, 2026**

A new `price_level_structure`, `center_deci_edge_centi_cent`, is available:
\$0.0001 (0.01¢) ticks below \$0.01 and above \$0.99, with \$0.001 (0.1¢)
ticks in between. No API fields or message formats change. As with other
structures, snap order and RFQ quote prices to the `step` of the band
containing the price in the market's `price_ranges` array rather than
keying off the structure name. See
[Fixed-Point Representation](https://docs.kalshi.com/getting_started/fixed_point_migration.md) for the
full structure reference.

**August 13, 2026**

`GET /trade-api/v2/portfolio/balance` now scopes `portfolio_value` to the
requested `exchange_index` (defaulting to 0); it previously covered
positions across all exchange indexes. Passing `subaccount` explicitly
(including 0, previously treated as omitted) returns that subaccount's
`balance` on the requested exchange index. Omitting `subaccount` keeps
the primary account's aggregate `balance`.

**August 13, 2026**

Predictions trade WebSocket messages now include `is_block_trade`, indicating
whether the trade was matched off book.

**August 13, 2026**

Each `exchange_index_statuses` entry now includes its shard `description`.

**August 13, 2026**

Margin order groups are now bound to a single `exchange_index`.
Order groups may only reference markets belonging to their respective `exchange_index`.

Affected endpoints:

* `GET /trade-api/v2/margin/markets`
* `GET /trade-api/v2/margin/markets/{ticker}`
* `POST /trade-api/v2/margin/order_groups/create`

For now, all margin markets are `exchange_index=0`.

**August 13, 2026**

The maximum number of order groups a user can have at a time is increasing
from 25,000 to 100,000.

**Affected endpoint:** `POST /trade-api/v2/portfolio/order_groups/create`

**August 6, 2026**

The deprecated multivariate lookup surface has been removed:

* `PUT /trade-api/v2/multivariate_event_collections/{collection_ticker}/lookup` no longer exists. This endpoint predated RFQs and had been marked deprecated; use `POST /trade-api/v2/multivariate_event_collections/{collection_ticker}` to create or resolve a combo market, or the communications (RFQ) APIs for quoting workflows.
* The `multivariate` WebSocket channel (message type `multivariate_lookup`) no longer exists. Subscriptions to it now return an unknown-channel error. For multivariate market state changes, use the `multivariate_market_lifecycle` channel.

**August 13, 2026**

When an RFQ (`35=R`) selects legs that form an invalid multivariate
combination, the `QuoteRequestReject` (`35=AG`) now carries three new
pieces of information:

* `MVEValidationReasonCode` (20187): a stable reason code —
  `conflicting_leg_outcomes`, `duplicated_legs`, or
  `invalid_market_combination` — matching the `code` field of the REST
  error body. Branch on this.
* `Text` (58): a human-readable explanation of why the combination is
  invalid.
* `NoMVEOffendingLegs` (20185): a repeating group of the offending market
  tickers, each entry carrying `MVEOffendingMarketTicker` (20186).

`QuoteRequestRejectReason` (658) is unchanged (`99` = OTHER), so existing
handling keeps working. This mirrors the richer REST error bodies on
`POST /trade-api/v2/multivariate_event_collections/{collection_ticker}`.

**August 13, 2026**

Adding APIs to track intra-exchange account transfers:

* `GET /portfolio/intra_exchange_instance_transfers` (paginated history)
* `GET /portfolio/intra_exchange_instance_transfers/{transfer_id}`

**August 6, 2026**

Exchange-generated order and trade `ExecutionReport (35=8)` messages now include `LastMkt<30>` with the source exchange index.

**August 6, 2026**

`GET /trade-api/v2/margin/markets` and `GET /trade-api/v2/margin/markets/{ticker}`
now return `long_leverage_estimates` and `short_leverage_estimates`, keyed by the
same notional sizes as `leverage_estimates`.

**August 6, 2026**

`PUT /portfolio/order_groups/{order_group_id}/limit` now supports the `subaccount` parameter.

**August 6, 2026**

Multivariate event collection responses now include `exchange_index`.

**Affected endpoints:**

* `GET /multivariate_event_collections`
* `GET /multivariate_event_collections/{collection_ticker}`

**July 30, 2026**

`POST /trade-api/v2/multivariate_event_collections/{collection_ticker}` now
returns richer error bodies when the selected legs form an invalid
combination. The `message` field explains why the combination is invalid
(for example, which selections conflict), and the `details` field lists the
offending market tickers as a comma-separated string when they are known.

The `code` field is unchanged (`conflicting_leg_outcomes`,
`duplicated_legs`, `invalid_market_combination`), so existing error
handling keeps working.

**August 6, 2026**

The `service` field announced as deprecated on July 28 has been removed from
error response bodies. It is no longer returned by any REST endpoint.

Branch on `code` instead, which is present on every error response. Clients
that read `service` should treat it as absent; clients that already branch on
`code` need no change.

**July 28, 2026**

The `service` field on error response bodies is deprecated and will be removed
in a future release. It names the internal Kalshi service that produced the
error, is absent from many error responses already, and is not a stable way to
classify failures.

Use the `code` field instead, which is present on every error response and is
the intended contract for branching. No response has changed yet — `service`
is still returned wherever it was before.

**July 30, 2026**

Market created messages on the `market_lifecycle_v2` and
`multivariate_market_lifecycle` channels now include an `exchange_index`
field identifying the exchange shard the market lives on. `event_lifecycle`
messages include the same field for the event's markets.

**Affected channels:**

* `market_lifecycle_v2`
* `multivariate_market_lifecycle`

**July 30, 2026**

`GET /series` now exposes `exchange_index`, identifying the target exchange instance for new events.

**July 30, 2026**

A new endpoint, `GET /trade-api/v2/live_data/events/{event_ticker}`, returns
live data keyed by event ticker — previously only available on the internal
API. It serves event-keyed live data such as crypto price charts (e.g.
`KXBTC15M` events), commodity price timeseries, and weather observations.

The response's `live_data.type` field names the schema of the flexible
`live_data.details` object. An optional `range` query parameter (e.g.
`15min`, `1h`, `1d`) restricts the returned timeseries window where the
underlying live data type supports it.

**July 30, 2026**

API keys restricted to a single subaccount, previously rejected with a 403
on the order queue position endpoints, can now read queue positions for
orders in their locked subaccount. The queue positions listing infers the
key's locked subaccount when the `subaccount` parameter is omitted and
rejects requests that explicitly target a different subaccount. The
single-order endpoint returns a 404 for orders outside the locked
subaccount.

**Affected endpoints:**

* `GET /trade-api/v2/portfolio/orders/queue_positions`
* `GET /trade-api/v2/portfolio/orders/{order_id}/queue_position`

**July 30, 2026**

Event objects returned by the REST API now include a `cadence` value inside
`product_metadata` when the event has one set. It tells you how often the
event recurs, for example `fifteen_min`. Events without a cadence set are
returned the same as before.

**Affected endpoints:**

* `GET /trade-api/v2/events`
* `GET /trade-api/v2/events/{event_ticker}`

**July 30, 2026**

API keys restricted to a single subaccount, previously rejected with a 403
on the batch order endpoints, can now batch-create and batch-cancel orders.
The API infers the key's locked subaccount for any order in the batch that
omits it, and rejects the whole batch (no orders are placed or canceled) if
any entry explicitly targets a different subaccount.

**Affected endpoints:**

* `POST /trade-api/v2/portfolio/events/orders/batched`
* `DELETE /trade-api/v2/portfolio/events/orders/batched`

**July 30, 2026**

The `quote_created` message on the `communications` channel now includes a
`subaccount` field when your side of the quote used a subaccount, matching
`quote_accepted` and `quote_executed`. Quote creators receive the subaccount
their quote was placed under; RFQ creators receive the subaccount their RFQ
was created under. Each recipient sees only their own subaccount number,
never the counterparty's.

This lets makers quoting from multiple subaccounts attribute a
`quote_created` message immediately, without waiting for the
`POST /trade-api/v2/communications/quotes` response.

**July 30, 2026**

API keys restricted to a single subaccount can now use every REST order-group
endpoint. The API infers the key's locked subaccount when the request omits
it and rejects requests that explicitly target a different subaccount.

Unrestricted API keys are unaffected.

**Affected endpoints:**

* All `/trade-api/v2/portfolio/order_groups` endpoints
* All `/trade-api/v2/margin/order_groups` endpoints

**July 23, 2026**

Attempts to create an order group after reaching the 25,000-group limit will
be rejected.

Before the change window, users above the limit will have their oldest unused
order groups cancelled until 20,000 remain, leaving headroom below the new
limit. Order groups containing resting orders will not be selected for this
cleanup.

**Affected endpoints:**

* `POST /trade-api/v2/portfolio/order_groups/create`
* `POST /trade-api/v2/margin/order_groups/create`

**July 22, 2026**

`GET /incentive_programs` now excludes incentive programs whose market
belongs to a hidden event, matching the visibility of the events themselves.

**July 23, 2026**

Added `GET /historical/positions` — an authenticated endpoint for querying settled positions archived to the historical database. Supports `ticker` and `event_ticker` filtering with cursor pagination.

Positions are archived per whole event: a settled event's positions move to the historical database together and are never split between this endpoint and `GET /portfolio/positions`. Use this endpoint for positions older than the new `market_positions_last_updated_ts` cutoff returned by `GET /historical/cutoff`. See [Historical Data](https://docs.kalshi.com/getting_started/historical_data.md) for details.

**July 23, 2026**

Subaccount-restricted API keys, previously denied at session start, can now
open WebSocket sessions. Private channels are scoped to the key's locked
subaccount — `fill`, `user_orders`, `market_positions`,
`order_group_updates`, `communications`, and `orderbook_delta`
(`fill`, `user_orders`, `order_group_updates`, and `orderbook_delta` on the
Margin exchange) — so a restricted key sees exactly what a full-account key
sees, minus every sibling subaccount.

* `orderbook_delta` still delivers the full book; only the own-order
  annotation (`subaccount`, `client_order_id`) is withheld when a resting
  order belongs to a sibling subaccount.
* `communications` still broadcasts every RFQ (public by design, so makers
  can quote them); only quotes, acceptances, and executions are scoped.

Full-account keys are unaffected. No new fields are introduced.

**July 23, 2026**

An API key restricted to a single subaccount (created via `POST /api_keys`
with `subaccount`), previously rejected at logon, can now log on to an
`RfqMode` FIX session and run the maker quote lifecycle: `Quote (35=S)`,
`QuoteConfirm (35=U7)`, and `QuoteCancel (35=Z)`.

Every quote is pinned to the key's subaccount: on `Quote (35=S)`, an omitted
`AllocAccount<79>` defaults to it and a mismatching value is rejected;
`QuoteConfirm` and `QuoteCancel` act only on that subaccount's quotes; fills
attribute to it. You can run one restricted key per subaccount with
concurrent RFQ sessions — a quote acceptance routes to the session that
created the quote.

Creating an RFQ (`35=R`) and `AcceptQuote (35=UA)` remain unavailable to
restricted keys. Unrestricted keys are unchanged.

**July 23, 2026**

Authenticated WebSocket clients can subscribe to the new `pyth_value` channel
to receive deduplicated Pyth prices by underlying ticker. The channel supports
filtering, dynamic subscription updates, and discovery of recently streamed
underlyings.

**July 9, 2026**

FIX Tag 2446 (`AggressorSide`) is now supported on `35=X` (Incremental Refresh)
with `MDEntryType=2` (Trade).

**July 9, 2026**

REST now supports looking up a quote within a specific RFQ by passing both the
RFQ ID and quote ID in the path. The quote must belong to the requested RFQ;
otherwise, the endpoint returns `404 Not Found`.

The quote-ID-only lookup endpoint remains supported for now, but is
deprecated. Use the RFQ-scoped lookup endpoint instead.

**Affected endpoints:**

* `GET /trade-api/v2/communications/rfqs/{rfq_id}/quotes/{quote_id}`
* `GET /trade-api/v2/communications/quotes/{quote_id}`

**July 4, 2026**

`GET /trade-api/v2/exchange/announcements` has been removed from the Predictions
REST API. Exchange schedule remains available through
`GET /trade-api/v2/exchange/schedule`.

**Affected endpoints:**

* `GET /trade-api/v2/exchange/announcements`

**July 9, 2026**

The following deprecated fields have been removed from the Predictions REST API schema:

* `Market.response_price_units`
* `Market.fractional_trading_enabled`
* `MarketPosition.resting_orders_count`

`Market.price_level_structure`, `Market.price_ranges`, and the fixed-point count and dollar
fields remain the canonical replacements.

**July 9, 2026**

`GET /trade-api/v2/margin/orders` now includes an `order_reason` field when
`order_source` is `system`. The field is `liquidation` for liquidation orders
and `take_profit_stop_loss` for take-profit/stop-loss orders. User-placed
orders continue to omit `order_reason`.

**Affected endpoints:**

* `GET /trade-api/v2/margin/orders`

**July 23, 2026**

Seven new `price_level_structure` values are being introduced:
`center_whole_edge_half_cent`, `center_whole_edge_quint_cent`,
`center_half_edge_half_cent`, `center_half_edge_quint_cent`,
`center_half_edge_deci_cent`, `center_quint_edge_quint_cent`, and
`center_quint_edge_deci_cent`. Naming follows
`center_{center}_edge_{edge}_cent`, where `whole` = 1¢, `half` = 0.5¢,
`quint` = 0.2¢, and `deci` = 0.1¢. Edge bands are \$0.00–\$0.10 and
\$0.90–\$1.00; the center band is \$0.10–\$0.90. Existing values
(`linear_cent`, `tapered_deci_cent`, `deci_cent`) are unchanged.

There are no new fields and no new decimal precision. The source of truth
for a market's valid prices remains the `price_ranges` array on the market
object (`{ start, end, step }` bands in fixed-point dollars) — consume it
dynamically per market rather than keying logic off the
`price_level_structure` label. Structure changes are delivered on the
existing `market_lifecycle_v2` WebSocket channel via the existing
`price_level_structure_updated` event, which includes the updated
`price_ranges`. When a market moves to a finer tick, resting orders are
preserved and carried over to the new grid.

Rollout: pilot markets switch to the new structures the week of
July 27, 2026, scheduled to avoid disrupting actively-trading markets,
with expansion to higher-volume markets the week of August 3, 2026.

**July 2, 2026**

Multivariate lookup history endpoints are fully deprecated.

**July 2, 2026**

Each position returned by `GET /trade-api/v2/margin/risk` and
`GET /trade-api/v2/margin/positions` now includes an `is_portfolio` flag. When it
is `true`, the position is hedged within a portfolio, so its per-position risk
metrics cannot be attributed to it individually and are not reported — on
`/margin/risk` that means `maintenance_margin_required`, `position_leverage`, and
`estimated_liquidation_price`, and on `/margin/positions` that means `margin_used`
and the derived `roe`. When it is `false`, those per-position values are populated
as before.

**Affected endpoints:**

* `GET /trade-api/v2/margin/risk`
* `GET /trade-api/v2/margin/positions`

**June 30, 2026**

API keys can use `write::trade` to grant access to order, order-group, and
RFQ/quote write endpoints without granting transfer-write access. Parent
`write` keys continue to grant broad write access, including trade and transfer
child scopes.

**July 2, 2026**

The `market_lifecycle_v2` channel now emits an optional `price_ranges` array
alongside `price_level_structure` on `created` and
`price_level_structure_updated` events. Each entry is a `{ start, end, step }`
band in fixed-point dollars describing the market's valid prices — the same
data returned on the REST market object.

This lets consumers read a market's valid-price grid directly from the event,
with no follow-up REST call when a market's tick size / structure changes. The
field is only present on events that carry a `price_level_structure`.

**Affected channel:**

* `market_lifecycle_v2` (`created`, `price_level_structure_updated` events)

**June 29, 2026**

`GET /trade-api/v2/margin/positions` now omits `margin_used` (and the derived
`roe`) for a portfolio-margin position that shares its asset class with other
positions in the same subaccount. Margin for those positions is computed jointly
for the group and is not attributable to a single market. `margin_used` stays
populated for gross markets and for single-position (lone) portfolio markets.

**Affected endpoints:**

* `GET /trade-api/v2/margin/positions`

**June 26, 2026**

Effective immediately, `GET /trade-api/v2/margin/risk` no longer populates per-market maintenance
margin, leverage, or estimated liquidation price unless the data is for a
subaccount with a single position or for a gross margin market.

**Affected endpoints:**

* `GET /trade-api/v2/margin/risk`

**July 2, 2026**

`GET /trade-api/v2/exchange/status` now returns two additional fields:

* `intra_exchange_transfers_active` — whether intra-exchange transfers are
  currently permitted.
* `exchange_index_statuses` — a per-index breakdown with one entry per exchange
  index. Each entry carries `exchange_index`, `exchange_active`,
  `trading_active`, and `intra_exchange_transfers_active`.

**Affected endpoints:**

* `GET /trade-api/v2/exchange/status`

**July 2, 2026**

`GET /trade-api/v2/portfolio/subaccounts/balances` now returns one balance per
exchange index. Each entry includes an `exchange_index` field, so a subaccount
with funds on multiple indexes appears as multiple entries rather than a single
combined row.

**Affected endpoints:**

* `GET /trade-api/v2/portfolio/subaccounts/balances`

**July 2, 2026**

On `AcceptQuote (35=UA)`, when a quote can no longer be accepted the
`AcceptQuoteStatus (35=UC)` reject (`AcceptQuoteStatus<21025>=1`) now reports a
specific reason in `Text<58>` rather than a generic message — notably
`NOT_FOUND` when the quote was cleared by a server roll/restart (or is
otherwise unknown) and `EXPIRED` when it was cancelled or has expired — so RFQ
creators can distinguish a flushed quote from a genuine cancellation.

**Affected FIX messages:**

* `AcceptQuote (35=UA)`

**July 2, 2026**

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

**June 25, 2026**

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

The existing quote-ID-only action endpoints remain supported for now, but are
deprecated. Use the RFQ-scoped action endpoints instead:

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
* `GET /trade-api/v2/communications/rfqs/{rfq_id}/quotes/{quote_id}`
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

**June 25, 2026**

Qualification requirements for all tiers has been halved.

**June 25, 2026**

FIX order entry now supports `ExDestination<100>` for exchange index
selection. `NewOrderSingle (35=D)` and `OrderCancelRequest (35=F)` may use
`ExDestination=-1` to auto-route by market ticker.

ExecutionReport `ExecID<17>` values for non-default exchange indexes include
the exchange index as `clock;event;exchange_index`.

Note: exchange index `0` is currently the only exchange index available in
production.

**June 24, 2026**

FIX RFQ `Quote (35=S)` creation now supports `ExecInst<18>=6`
(ParticipantDontInitiate) to request post-only quote behavior.

**June 23, 2026**

`GET /trade-api/v2/communications/quotes/{quote_id}` will cost 2 tokens per
request, matching the non-default cost for quote create and delete.

**Affected endpoints:**

* `GET /trade-api/v2/communications/quotes/{quote_id}`

**June 20, 2026**

`GET /trade-api/v2/communications/quotes` no longer supports filtering by
`market_ticker` or `event_ticker`, effective immediately. Requests should
filter quotes by user, RFQ, status, or update time instead.

**Affected endpoints:**

* `GET /trade-api/v2/communications/quotes`

**June 19, 2026**

Closed RFQs and cancelled quotes returned by the communications APIs will be
retained for 7 days after their last update, reduced from the previous
14-day retention window.

**Affected endpoints:**

* `GET /communications/rfqs`
* `GET /communications/quotes`

**July 2, 2026**

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

**June 18, 2026**

The events API now returns `settlement_sources` on each event, mirroring the
field already available on series. Each entry has a `name` and `url`
identifying an official source used to determine the event's markets.

**Affected endpoints:**

* `GET /events`
* `GET /events/{event_ticker}`

**June 18, 2026**

`metadata_updated` events on the `market_lifecycle_v2` channel now include
`strike_type` and `cap_strike` (plus `custom_strike` for custom/structured
markets) alongside `floor_strike`. Consumers can reconstruct a market's full
strike range directly from the push — e.g. a `between` band needs both floor
and cap, and `less` markets are cap-only — without a follow-up fetch against
the eventually-consistent read model.

`metadata_updated` is now also emitted when a market's `cap_strike` or
`strike_type` changes; previously only `floor_strike` and `yes_sub_title`
changes triggered it.

**June 18, 2026**

FIX RFQ `Quote (35=S)` notifications sent to RFQ creators now include the
quoter's public communications ID in `NoPartyIDs` with `PartyRole=35`
(Liquidity Provider).

**June 18, 2026**

FIX market data incremental refreshes now include trades as `MDEntryType<269>=2`.
See FIX docs for more information.

**June 18, 2026**

Legacy `/portfolio/orders` mutation endpoints will be deprecated sometime
between June 18 and June 25. Once deprecated, calls to these endpoints will return
`Please switch to the V2 endpoints` with a link to the V2 order API
reference.

Use the V2 event-order endpoints:

* [Create Order (V2)](https://docs.kalshi.com/api-reference/orders/create-order-v2.md)
* [Cancel Order (V2)](https://docs.kalshi.com/api-reference/orders/cancel-order-v2.md)
* [Decrease Order (V2)](https://docs.kalshi.com/api-reference/orders/decrease-order-v2.md)
* [Batch Create Orders (V2)](https://docs.kalshi.com/api-reference/orders/batch-create-orders-v2.md)
* [Batch Cancel Orders (V2)](https://docs.kalshi.com/api-reference/orders/batch-cancel-orders-v2.md)
* [Amend Order (V2)](https://docs.kalshi.com/api-reference/orders/amend-order-v2.md)

**Affected endpoints:**

* `POST /trade-api/v2/portfolio/orders`
* `DELETE /trade-api/v2/portfolio/orders/{order_id}`
* `POST /trade-api/v2/portfolio/orders/{order_id}/decrease`
* `POST /trade-api/v2/portfolio/orders/batched`
* `DELETE /trade-api/v2/portfolio/orders/batched`
* `POST /trade-api/v2/portfolio/orders/{order_id}/amend`

**June 18, 2026**

`GET /trade-api/v2/events` now supports a `tickers` query parameter to
filter the response to a comma-separated list of event tickers.

**Affected endpoints:**

* `GET /trade-api/v2/events`

**June 18, 2026**

Each position returned by `GET /trade-api/v2/margin/positions` now includes
a `subaccount` field with the subaccount number that holds it (0 for primary,
1-63 for subaccounts).

**Affected endpoints:**

* `GET /trade-api/v2/margin/positions`

**June 18, 2026**

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

**June 18, 2026**

Sanity limits enforced on orderbook subscriptions:

* Max 500k market subscriptions per session.
* Max 10k/s commands per second enforced.

**June 18, 2026**

`GET /trade-api/v2/communications/quotes` now supports `min_ts` and `max_ts`
query parameters to restrict results to quotes last updated within a time
window, formatted as Unix Timestamps.

Also fixes cursor pagination on this endpoint: previously, paging through a
large set of quotes could end early and silently drop most of the results.

**Affected endpoints:**

* `GET /trade-api/v2/communications/quotes`

**June 11, 2026**

New endpoint: `GET /trade-api/v2/account/api_usage_level/volume_progress` reports your trailing 30d volume and the earn/keep volume goals for each volume-based API usage tier.

**June 11, 2026**

Perps margin market responses now include mark prices and their timestamps.

**Affected endpoints:**

* `GET /trade-api/v2/margin/markets`
* `GET /trade-api/v2/margin/markets/{ticker}`

**June 11, 2026**

Users can now self-promote to the Advanced API tier by calling
`POST /trade-api/v2/account/api_usage_level/upgrade`.

**Affected endpoints:**

* `POST /trade-api/v2/account/api_usage_level/upgrade`

**June 11, 2026**

`GET /trade-api/v2/margin/fee_tiers` now returns active maker and taker
fee rates for each eligible margin market instead of zeroing the response.

**Affected endpoints:**

* `GET /trade-api/v2/margin/fee_tiers`

**June 11, 2026**

Perps market data now includes dollar notional companions for lifetime volume,
24h volume, and open interest contract-count fields. Perps candlesticks also include a
period-specific volume notional field. These fields are additive and preserve
the existing contract-count fields.

**Affected endpoints and channels:**

* `GET /trade-api/v2/margin/markets`
* `GET /trade-api/v2/margin/markets/{ticker}`
* `GET /trade-api/v2/margin/markets/{ticker}/candlesticks`
* WebSocket `margin_ticker`

**June 11, 2026**

Margin market responses now report `tick_size`.

**Affected endpoints:**

* `GET /trade-api/v2/margin/markets`
* `GET /trade-api/v2/margin/markets/{ticker}`

**June 11, 2026**

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

**June 5, 2026**

We're introducing automated API rate-limit tiers: Premier, Paragon, and Prime are now earned
automatically from your trailing trading volume (and can still be granted manually). Each tier is
backed by a **grant**, which you can view in the new `grants` array of
`GET /trade-api/v2/account/limits`.

See [Rate Limits and Tiers](https://docs.kalshi.com/getting_started/rate_limits.md) for the thresholds and how grants work.

**Live Thursday, June 11, 2026.**

**Affected endpoints:**

* `GET /trade-api/v2/account/limits`
* `GET /trade-api/v2/account/limits/perps`

**June 4, 2026**

Legacy `/portfolio/orders` mutation and batch endpoint rate-limit token costs
will be 10x the corresponding V2 `/portfolio/events/orders` endpoint costs.
The V2 endpoint costs are unchanged.

Switch to the V2 event-order endpoints to keep full write rate-limit access
for these workflows:

* [Create Order (V2)](https://docs.kalshi.com/api-reference/orders/create-order-v2.md)
* [Cancel Order (V2)](https://docs.kalshi.com/api-reference/orders/cancel-order-v2.md)
* [Amend Order (V2)](https://docs.kalshi.com/api-reference/orders/amend-order-v2.md)
* [Decrease Order (V2)](https://docs.kalshi.com/api-reference/orders/decrease-order-v2.md)
* [Batch Create Orders (V2)](https://docs.kalshi.com/api-reference/orders/batch-create-orders-v2.md)
* [Batch Cancel Orders (V2)](https://docs.kalshi.com/api-reference/orders/batch-cancel-orders-v2.md)

**Affected endpoints:**

* `POST /trade-api/v2/portfolio/orders` - cost `50` to `100`
* `DELETE /trade-api/v2/portfolio/orders/{order_id}` - cost `10` to `20`
* `POST /trade-api/v2/portfolio/orders/{order_id}/amend` - cost `50` to `100`
* `POST /trade-api/v2/portfolio/orders/{order_id}/decrease` - cost `50` to `100`
* `POST /trade-api/v2/portfolio/orders/batched` - cost `50` to `100`
* `DELETE /trade-api/v2/portfolio/orders/batched` - cost `10` to `20`

**June 4, 2026**

When a post-only order would cross the book, the `last_update_reason` field is
now reported as `PostOnlyCrossCancel` instead of `Decrease`.

**Affected surfaces:**

* `GET /portfolio/orders`
* `GET /portfolio/order/{orderId}`
* `orderbook_delta` WebSocket channel

**June 4, 2026**

**FIX API v1.0.31**

* ExecutionReports (35=8) for post-only orders canceled because they would cross now carry a Text (58) reason of `POST_ONLY_CROSS`

**June 4, 2026**

**FIX API v1.0.30**

* Starting Thursday, June 4, 2026, the FIX API ExecutionReport (35=8) rejection Text (58) distinguishes rejects where the order's outcome is unconfirmed from rejects where the order was definitely not applied
  * `EXCHANGE_UNAVAILABLE` now means the gateway could not confirm whether the order was applied (the exchange was unreachable, the request timed out, or it was interrupted after the order may have been accepted). Reconcile the order's state, or retry with the same ClOrdID
  * `INTERNAL_ERROR` is a new value for a reject from a healthy exchange that could not be mapped to a specific reason. The order was not applied, so it is safe to fix and resubmit
  * Previously both cases returned `EXCHANGE_UNAVAILABLE`

**June 2, 2026**

API keys can now use `write::transfer` to grant access only to
transfer-scoped write endpoints without granting the broad `write` parent
scope. Parent scopes still grant broad access, so `write` continues to grant
all write endpoint groups, including transfer-scoped writes.

**June 1, 2026**

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

**May 29, 2026**

Public V2 trade responses now include `is_block_trade`, which identifies
trades matched off-book as block trades. The same endpoints now support an
optional `is_block_trade` query parameter; omit it to return all trades, set
it to `true` for only block trades, or set it to `false` for only non-block
trades.

**Affected endpoints:**

* `GET /trade-api/v2/markets/trades`
* `GET /trade-api/v2/historical/trades`

**May 29, 2026**

**FIX API v1.0.29**

* Added market lifecycle support on the `KalshiMD` session via Security Status messages
  * `SecurityStatusRequest` (35=e) subscribes (`263=1`) or unsubscribes (`263=2`) a single `Symbol<55>`
  * `SecurityStatus` (35=f) streams `SecurityTradingStatus<326>` changes: `3`=resume (activated), `2`=trading halt, `100`=Kalshi determined, `101`=Kalshi settled
  * Changes-only: no initial snapshot is sent on subscribe
  * For more info see [Market Data](https://docs.kalshi.com/fix/market-data.md)

**May 28, 2026**

Starting Thursday, May 28, 2026, `GET /portfolio/balance` returns `balance_dollars`, the member's available balance as a fixed-point dollar string, alongside the existing integer-cent `balance` field. This precision change applies only to direct members of the exchange: direct member balances are aligned to centi-cent (`$0.0001`, or `0.01c`) precision. The legacy `balance` field truncates any sub-cent amount, so use `balance_dollars` for exact values.

See [Fee Rounding](https://docs.kalshi.com/getting_started/fee_rounding.md) for balance alignment and rounding mechanics.

**May 28, 2026**

**FIX API v1.0.28**

* Added market data support on the dedicated `KalshiMD` session
  * Subscriptions are identified by `Symbol<55>`
  * `MarketDataRequest` (35=V) requests order book snapshots (`263=0`) or snapshot-plus-updates subscriptions (`263=1`); cancel with `263=2` (symbols in `55`, or none to cancel all)
  * `MarketDataSnapshotFullRefresh` (35=W) returns the full aggregated book; `MarketDataIncrementalRefresh` (35=X) streams subsequent level changes
  * `MarketDataRequestReject` (35=Y) is sent when a request cannot be accepted
  * For more info see [Market Data](https://docs.kalshi.com/fix/market-data.md)

**May 28, 2026**

**FIX API v1.0.27**

* Starting Thursday, May 28, 2026, direct member BALANCE collateral changes on ExecutionReport (35=8) may be emitted with four decimal places

**May 25, 2026**

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

**May 21, 2026**

In certain uncommon cases, responses from `DELETE /trade-api/v2/portfolio/events/orders/{order_id}` and `POST /trade-api/v2/portfolio/events/orders/{order_id}/amend` do not describe the order that was cancelled or amended — the `order_id`, `client_order_id`, and quantity fields (`reduced_by_centicount`, `remaining_centicount`, fill fields) in the response may not correspond to your request. The cancel or amend itself executes correctly against the intended order; only the response body is affected. Downstream order and position state are correct.

As a result, the previously announced rate-limit cost bump on the legacy `/portfolio/orders*` endpoints is delayed until May 21.

**Affected endpoints:**

* `DELETE /trade-api/v2/portfolio/events/orders/{order_id}`
* `POST /trade-api/v2/portfolio/events/orders/{order_id}/amend`

**May 18, 2026**

**FIX API v1.0.26**

* Added `SplitCollateralReturn` (21027) Logon flag
  * With Logon flag `21027=Y`, Execution Reports with `ExecType=Trade` include two new tags:
    * `SingleMarketCollateralReturn` (21030): collateral freed from reducing/closing a position in a single market
    * `RangedMarketCollateralReturn` (21031): collateral freed from MECNET/DIRECNET netting across a market group
  * Both values are in dollars and only present when non-zero
  * These are informational subsets of the existing BALANCE collateral change — they describe components within the total balance delta
  * Without `21027`, Execution Reports remain unchanged (existing behavior)

**May 12, 2026**

`POST /trade-api/v2/portfolio/events/orders/{order_id}/decrease` now
accepts `reduce_by` (fixed-point contract count) in addition to
`reduce_to`. Exactly one of the two must be provided.

**May 12, 2026**

Subaccount creation now supported for all direct members with advanced API access.

**May 12, 2026**

The WebSocket docs now include the current public error code list with each
code's name, message, description, and user-error classification.

WebSocket error code `25` is now returned as `Subscription buffer overflow`
when a subscription's event buffer overflows during a message burst. When this
happens, subscribe to a smaller subset of data, or ensure that your connection
read throughput is optimized.

See the [WebSocket error messages](https://docs.kalshi.com/websockets/websocket-connection.md#error-messages)
section for the full list.

**May 11, 2026**

Cancelled quotes are now automatically deleted 14 days after cancellation. Previously, only quotes associated with closed RFQs were cleaned up. This applies to all cancelled quotes regardless of their parent RFQ status.

Affected endpoint: `GET /communications/quotes`.

**May 11, 2026**

`GET /trade-api/v2/margin/fee_tiers` now returns `maker_fee_rates` and
`taker_fee_rates`. Each is a map from market ticker to the fee rate as
a decimal fraction of notional (e.g. `0.0008` = 0.08% = 8 bps). Compute
the expected fee directly as `notional * rate`.

The previous `maker_fee_tiers` and `taker_fee_tiers` tier-name maps have
been removed from the response.

**Affected endpoints:**

* `GET /trade-api/v2/margin/fee_tiers`

**May 11, 2026**

The `metadata_updated` event on the `market_lifecycle_v2` WebSocket channel
now includes `yes_sub_title` as a top-level field when a market's yes
subtitle changes.

**Affected channels:**

* `market_lifecycle_v2`

**May 8, 2026**

**FIX API v1.0.25**

* BidSize (134) and OfferSize (135) conditionally offered on QuoteStatusReport (35=AI).

**May 7, 2026**

`CreateOrderGroup` now returns `subaccount`, the subaccount number that owns the created order group. The value is `0` for the primary account and `1-63` for subaccounts.

Affected endpoint: `POST /portfolio/order_groups/create`.

**May 7, 2026**

Added `rfq_user_filter` to `GetQuotes` for filtering by quotes in response to RFQs created by the authenticated user.

Affected endpoint: `GET /communications/quotes`.

**May 7, 2026**

**FIX API v1.0.24**

* OrderGroupResponse (UOH) now echoes AllocAccount (tag 79), with `79=0` for the primary account and `79=1-63` for subaccounts

**May 6, 2026**

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

Affected WebSocket channels (`apiexternal-ws`):

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

See the [Order direction](https://docs.kalshi.com/getting_started/order_direction.md) reference
page for the full migration table and equivalence rules.

**May 7, 2026**

Added the dedicated external Trade API hosts to the docs and examples:

* Production REST: `https://external-api.kalshi.com/trade-api/v2`
* Production WebSocket: `wss://external-api-ws.kalshi.com/trade-api/ws/v2`
* Demo REST: `https://external-api.demo.kalshi.co/trade-api/v2`
* Demo WebSocket: `wss://external-api-ws.demo.kalshi.co/trade-api/ws/v2`

Existing shared hosts remain supported for compatibility. Request signing is unchanged: sign the full request path from the API root, without the hostname or query string.

**May 5, 2026**

The `market_lifecycle_v2` WebSocket channel now supports a new event type
`metadata_updated`. Initially this will only be triggered by a floor strike
update, but may expand to more fields in the future. The message contains the
updated `floor_strike` as a top-level field.

**Affected channels:**

* `market_lifecycle_v2`

**May 5, 2026**

Added `post_only` as an option when creating a quote.
If the quote is marked post-only, it will never take resting orders on the book or be subject to a taker fee: it will be automatically cancelled at the normal execution if it were to match with a resting order.

**May 5, 2026**

Added `GET /trade-api/v2/portfolio/deposits` and `GET /trade-api/v2/portfolio/withdrawals` endpoints.

* Query deposit/withdrawal history for the authenticated user
* Cursor-based pagination via `limit` and `cursor` parameters

**New endpoints:**

* `GET /trade-api/v2/portfolio/deposits`
* `GET /trade-api/v2/portfolio/withdrawals`

**May 5, 2026**

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

**May 5, 2026**

**FIX API v1.0.23**

* Quote (35=S) now accepts `RestRemainder` (21015)
  * Set `21015=Y` to rest the quote remainder after execution
  * Omitting the tag or setting `21015=N` preserves the existing behavior

**May 1, 2026**

Added `user_filter=self` to filter RFQs and quotes by the authenticated user.
Existing creator user ID filters remain supported temporarily but are considered deprecated.

**Apr 30, 2026**

The deprecated `tick_size` field on Market response objects has been
deprecated since **Jan 5, 2026** and will be removed on **May 7, 2026**.

Use `price_level_structure` and `price_ranges[].step` to determine each
market's valid tick sizes.

**Affected responses:**

* Market response objects returned by REST API v2 endpoints

**Apr 30, 2026**

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

See [Rate Limits and Tiers](https://docs.kalshi.com/getting_started/rate_limits.md) for budget
semantics.

**Affected endpoints:**

* `GET /trade-api/v2/account/limits`

**Apr 28, 2026**

**FIX API v1.0.22**

* Added `AlwaysEmitNewBeforeTrade` (21026) Logon flag
  * With Logon flag `21026=Y`, the gateway always emits a standalone `New<0>` execution report before any `Trade<F>` report, even when an order takes liquidity in the same matching cycle as its placement
  * Without `21026`, the New ack continues to be folded into the first Trade report when both events arrive in the same batch (existing behavior)
  * Useful for clients whose state machines require an explicit `39=0` ack before they can issue replaces against the order

**Apr 22, 2026**

Added a public endpoint to inspect the routes whose configured token
cost differs from the default 10-token cost.

The response includes `default_cost` for context and lists only the
endpoints that do not use that default cost.

**Affected endpoints:**

* `GET /trade-api/v2/account/endpoint_costs`

**Apr 23, 2026**

Write endpoints now allow brief bursts above your per-second budget — when
your client is running below its steady rate, the unused capacity
accumulates and can be spent in a single pulse. See
[Rate Limits and Tiers](https://docs.kalshi.com/getting_started/rate_limits.md) for details.

**Apr 22, 2026**

**New endpoints:**

* `POST /trade-api/v2/portfolio/events/orders` — create
* `DELETE /trade-api/v2/portfolio/events/orders/{order_id}` — cancel
* `POST /trade-api/v2/portfolio/events/orders/{order_id}/amend` — amend
* `POST /trade-api/v2/portfolio/events/orders/{order_id}/decrease` — decrease
* `POST /trade-api/v2/portfolio/events/orders/batched` — batch create
* `DELETE /trade-api/v2/portfolio/events/orders/batched` — batch cancel

**We recommend all clients switch over.** The existing `/portfolio/orders*` endpoints will be marked deprecated no earlier than **May 21, 2026**. Rate-limit costs on the legacy `/portfolio/orders*` endpoints may also increase starting **May 14, 2026** — migrate to the V2 endpoints to avoid disruption.

**Apr 23, 2026**

Rolling out a new token-cost rate-limit system with separate read and write
budgets and a new **Paragon** tier. All existing tiers get at least as much
headroom as before and no client changes are required. See
[Rate Limits and Tiers](https://docs.kalshi.com/getting_started/rate_limits.md) for full details.

In the coming weeks, single-query read endpoints will be priced below
the default cost.

**Apr 20, 2026**

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

**Apr 20, 2026**

**FIX API v1.0.21**

* OrderGroupRequest (UOG) now accepts AllocAccount (tag 79) to scope the operation to a subaccount
  * Applies to all five actions: Create, Reset, Delete, Trigger, Update
  * Omit or set `79=0` to operate on the primary account
  * An OrderGroupID created under one subaccount cannot be managed without the matching AllocAccount on the follow-up request
* OrderGroupResponse (UOH) now echoes OrderGroupContractsLimit (tag 20132) on Create and Update responses

**Apr 17, 2026**

The `fractional_trading_enabled` field on `Market` and `EventChildMarket` responses is deprecated. It no longer carries information:

* `Market` and `EventChildMarket` responses now support fractional trading unconditionally — the field is always `true`.

The `fractional_trading_updated` event on the `market_lifecycle_v2` WebSocket channel is removed, since the underlying state can no longer change.

The `fractional_trading_enabled` field will be removed in a future release after a separate pre-announcement that includes the exact removal date. Clients relying on this field should stop reading it; treat every active market returned by these responses as fractional.

**Apr 16, 2026**

Added `occurrence_datetime` to API v2 market responses.

This field returns the recorded datetime when the underlying event occurred, when that value is available.

**Affected endpoints:**

* `GET /trade-api/v2/markets`
* `GET /trade-api/v2/markets/:ticker`
* `GET /trade-api/v2/events`
* `GET /trade-api/v2/events/:event_ticker`

**Apr 15, 2026**

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

**Apr 10, 2026**

Added `series_ticker` filtering to `GET /trade-api/v2/historical/markets`.

This filter follows the existing historical markets behavior and is mutually exclusive with the other primary historical filters (`tickers`, `event_ticker`, and `mve_filter`).

**Affected endpoints:**

* `GET /trade-api/v2/historical/markets`

**Mar 30, 2026**

Removed `client_order_id` from `GET /portfolio/fills` and `GET /portfolio/fills/historical` responses.

**Affected endpoints:**

* `GET /trade-api/v2/portfolio/fills`
* `GET /trade-api/v2/portfolio/fills/historical`

**Mar 30, 2026**

Added `GET /trade-api/v2/markets/orderbooks` endpoint.

* Accepts a list of market tickers via `tickers` query parameter (up to 100)
* Returns one orderbook per requested ticker

**Affected endpoints:**

* `GET /trade-api/v2/markets/orderbooks`

**Mar 25, 2026**

**Effective April 2, 2026**

This release removes the last remaining legacy fields:

* Removed `yes_total_cost` and `no_total_cost` (integer cents) from `GET /portfolio/settlements`. Use `yes_total_cost_dollars` and `no_total_cost_dollars`.
* Removed `yes_price_fixed` and `no_price_fixed` (string aliases) from `GET /portfolio/fills`. Use `yes_price_dollars` and `no_price_dollars`.
* Removed `position_cost`, `realized_pnl`, `fees_paid`, and `position_fee_cost` (integer centi-cents) from the `market_positions` WebSocket channel. Use the `_dollars` equivalents.

**Mar 26, 2026**

* The `subaccount` field is now returned on **WebSocket** `quote_accepted` and `quote_executed` messages when the quote or RFQ was placed from a subaccount.
* The **REST** `Quote` object now includes `creator_subaccount` and `rfq_creator_subaccount` fields, visible to the respective party.

**Mar 25, 2026**

Fixed `GET /markets` and `GET /markets/{ticker}` so `custom_strike["Multivariate Event Ticker"]` returns the actual multivariate event ticker instead of the MVE collection ticker.

**Mar 19, 2026**

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

**Mar 20, 2026**

* `Trade.created_time` and `MarketPosition.last_updated_ts` are now required in the OpenAPI contract.
* Deprecated compatibility fields on `Market` and `Settlement` remain available, but are no longer marked as required.
* Fixed schema inconsistencies where `Trade.price` and `EventPosition.resting_orders_count` were listed as required without defined properties.
* Added semantic deprecation markers for deprecated fields such as `EventData.category` and `MarketPosition.resting_orders_count`.

**Mar 12, 2026**

Two new event types added to the `market_lifecycle_v2` WebSocket channel:

* **`fractional_trading_updated`**: emitted when a market's fractional trading setting is changed. Includes `fractional_trading_enabled` (boolean).
* **`price_level_structure_updated`**: emitted when a market's price level structure is changed. Includes `price_level_structure` (string, e.g. `"linear_cent"`, `"deci_cent"`, `"tapered_deci_cent"`).

Additionally, the `created` event now includes `fractional_trading_enabled` and `price_level_structure` fields.

**Affected channel:**

* `market_lifecycle_v2`

**Mar 11, 2026**

When pulling quotes, two new fields return the computed quote size (measured in contracts) derived from the specified prices and the requested notional size in the RFQ.

**Mar 11, 2026**

* The following legacy fields are temporarily restored to allow additional migration time. Their `_dollars` equivalents remain the recommended fields:
  * `market_positions` WebSocket: `position_cost`, `realized_pnl`, `fees_paid`, `position_fee_cost`
  * `GET /portfolio/settlements`: `yes_total_cost`, `no_total_cost`
* `yes_bid_size_fp` and `yes_ask_size_fp` are now correctly populated on nested market responses (`GET /events/{ticker}`).

**Mar 10, 2026**

* `Fill` responses now expose `yes_price_dollars` and `no_price_dollars` to align with the API-wide `_dollars` naming convention. Legacy `yes_price_fixed` and `no_price_fixed` remain available for now but are deprecated.
* `GET /portfolio/settlements` now exposes `yes_total_cost_dollars` and `no_total_cost_dollars` in fixed-point dollars.
* Legacy settlement cent fields `yes_total_cost` and `no_total_cost` remain available for now because these `_dollars` fields were added late in the fixed-point migration, but clients are recommended to migrate now.

See [Fixed-Point Migration](https://docs.kalshi.com/getting_started/fixed_point_migration.md) for the recommended field mappings.

**Mar 8, 2026**

* Legacy integer count fields (with `_fp` equivalents) and integer cents price fields (with `_dollars` equivalents) will be **removed** from all REST and WebSocket response payloads on **March 12, 2026**
* Fractional trading will be enabled on 10 additional markets on **March 12**
* Subpenny pricing goes live on 2 markets on **March 9**: `KXGREENLAND-29` (deci\_cent) and `KXGDPNOM-RUS26` (tapered\_deci\_cent)

See [Fixed-Point Migration](https://docs.kalshi.com/getting_started/fixed_point_migration.md) for details.

**Mar 7, 2026**

Selected portfolio response `_dollars` fields now emit up to `6` decimal places, using micro\_cent source values from upstream portfolio protos.

**Affected endpoints:**

* `GET /portfolio/orders`
* `GET /portfolio/orders/{order_id}`
* `GET /portfolio/fills`
* `GET /portfolio/positions`

**Mar 6, 2026**

Added `GET /historical/trades` — a public endpoint for querying all trades archived to the historical database. Supports the same filters as `GET /markets/trades`.

Use this endpoint for trades that occurred before the `trades_created_ts` cutoff returned by `GET /historical/cutoff`. See [Historical Data](https://docs.kalshi.com/getting_started/historical_data.md) for details.

**Mar 5, 2026**

* Added `is_yes` (boolean) to the `user_orders` WebSocket channel
* `side` (string `"yes"`/`"no"`) remains available for compatibility

**Mar 3, 2026**

* Legacy integer count fields (with `_fp` equivalents) and integer cents price fields (with `_dollars` equivalents) will be removed on **March 12, 2026**
* Fractional trading will roll out per-market starting the week of **March 9, 2026**; check `fractional_trading_enabled` on Market responses
* On fractional-enabled markets, legacy integer fields may be truncated; migrate to `_fp` and `_dollars` to avoid data loss

Docs: [Fixed-Point Migration](https://docs.kalshi.com/getting_started/fixed_point_migration.md) and [Fee Rounding](https://docs.kalshi.com/getting_started/fee_rounding.md).

**Mar 1, 2026**

**FIX API v1.0.20**

* Added `OrderExpiryCancel` support for expired status mapping in execution reports
  * With Logon flag `21012=Y`, both `CloseCancel` and `OrderExpiryCancel` emit `ExecType(150)=C` and `OrdStatus(39)=C`
  * Without `21012`, behavior remains `Canceled<4>` for compatibility

**Feb 27, 2026**

**FIX API v1.0.19**

* SettlementPrice (730) precision extended in MarketSettlementReport
  * SettlementPrice will continue to be in cents but may have up to two decimal places (e.g. `30.60` instead of `30`)
  * This enables sub-cent settlement values to be represented without truncation
* MiscFeeAmt (137) now reports actual settlement fees in MarketSettlementReport
  * Previously hardcoded to zero; now reflects the real settlement fee for each position

**Feb 24, 2026**

Market responses now include:

* `yes_bid_size_fp`: total contract size of orders to buy yes at the best bid price
* `yes_ask_size_fp`: total contract size of orders to sell yes at the best ask price

Affected endpoints:

* `GET /markets`
* `GET /markets/{ticker}`

**Feb 23, 2026**

New endpoints for managing netting settings on individual subaccounts:

* **`GET /portfolio/subaccounts/netting`**: returns the netting enabled status for all subaccounts
* **`PUT /portfolio/subaccounts/netting`**: updates the netting enabled status for a specific subaccount (pass `subaccount_number` and `enabled` in the request body)

Use `subaccount_number=0` for the primary account or `1`–`63` for numbered subaccounts. New subaccounts inherit the primary account's netting setting at creation time.

**Feb 21, 2026**

Fractional share trading is now available for testing in the demo environment on the following markets:

* `KXUCL-26-ARS`
* `KXUCL-26-AJA`

Legacy fields will be deprecated on `March 5, 2026`:

* Integer count fields with an `_fp` equivalent will no longer be returned. See [Fixed-Point Contracts](https://docs.kalshi.com/getting_started/fixed_point_contracts.md) for migration details.
* Integer cents price fields (e.g., `yes_bid`, `no_ask`, `last_price`) will no longer be returned. Their `_dollars` equivalents are already available. See [Subpenny Pricing](https://docs.kalshi.com/getting_started/subpenny_pricing.md) for details.

More information will be forthcoming on how fee rounding works with fractional contracts.

**Feb 19, 2026**

The `market_lifecycle_v2` WebSocket channel now includes a `settlement_value` field (fixed-point dollar string) on `market_determined` events, indicating the settlement price of the market.

Expected release date: `February 26, 2026`

**Feb 17, 2026**

`GET /portfolio/balance` now accepts an optional `subaccount` query parameter, consistent with other portfolio endpoints (orders, fills, positions, settlements).

* **Omitted or `subaccount=0`**: returns balance and portfolio value for the primary account (default)
* **`subaccount=N`**: returns balance and portfolio value for that specific subaccount

**Feb 13, 2026**

The `liquidity` and `liquidity_dollars` fields on Market responses are deprecated and will return 0.

Affected endpoints:

* `GET /markets`
* `GET /markets/{ticker}`
* `GET /events`
* `GET /events/{ticker}`
* `GET /events/multivariate`

**Feb 16, 2026**

The deprecation timeline for non fixed-point count fields has been pushed back.
Fields that have a `_fp` equivalent will continue to be returned via API until at least `February 26, 2026`.

See [Fixed-Point Contracts](https://docs.kalshi.com/getting_started/fixed_point_contracts.md) for updated migration details.

**Feb 19, 2026**

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

**Feb 12, 2026**

**FIX API v1.0.18**

* Execution report precision extended for fractional shares
  * On qty fields, Kalshi will return at least a scale of 2 instead of 0.
  * E.g. on a trade which executes for 10 contracts, Kalshi will return `CumQty: 14=10.00` as opposed to `14=10`
  * Despite the change in precision, the numerical value will remain unchanged for now because fractional trading is not yet enabled on any market.
  * Affected fields: `LastQty`, `CumQty`, `LeavesQty`

**Feb 11, 2026**

`POST /portfolio/orders` removed `type`; `type=market` is no longer offered.

**Feb 12, 2026**

The `market_lifecycle_v2` WebSocket channel no longer emits lifecycle messages for multivariate event (MVE) markets and events.
All events and markets with `KXMVE` ticker prefix are now filtered from all lifecycle message types on this channel.

**Affected channel:**

* `market_lifecycle_v2`

**Feb 12, 2026**

The `ticker_v2` WebSocket channel has been removed. This was an undocumented experimental channel
intended as a v2 iteration of the ticker channel but was rolled back due to user feedback.

Users should continue using the standard `ticker` channel for real-time market updates, which includes
top-of-book prices, sizes, and last trade information.

**Removed channel:**

* `ticker_v2`

**Feb 11, 2026**

* `ticker` channel now provides high precision `time` field.
* `skip_ticker_ack` subscription-level flag supports skipping market tickers sent in the OK message following a channel update.

**Feb 11, 2026**

Market response payloads now include `fractional_trading_enabled` consistently across event and market data surfaces.

**Affected endpoints:**

* `GET /events`
* `GET /events/{event_ticker}`
* `GET /markets`
* `GET /markets/{ticker}`

**Feb 5, 2026**

The `GET /incentive_programs` endpoint now returns a `market_id` field containing the market's unique identifier for each incentive program.

**Affected endpoint:**

* `GET /incentive_programs`

**Feb 3, 2026**

Added `user_orders` WebSocket channel to stream real-time order updates (created, updated, canceled, executed)
for the authenticated user. Supports optional `market_tickers` filter and dynamic
`update_subscription` commands to add or remove markets.

**New channel:**

* `user_orders`

**Feb 3, 2026**

`GET /portfolio/order_groups` and `GET /portfolio/order_groups/{order_group_id}` now accept an optional `subaccount` query parameter.
When provided, results are filtered to that specific subaccount.
When omitted, results are returned across all subaccounts.

**Affected endpoints:**

* `GET /portfolio/order_groups`
* `GET /portfolio/order_groups/{order_group_id}`

**Feb 2, 2026**

The `POST /communications/rfqs` endpoint now accepts an optional `subaccount` parameter to create RFQs on behalf of a subaccount.
The `GET /communications/rfqs` endpoint now accepts an optional `subaccount` query parameter to filter RFQs by subaccount.

**Affected endpoints:**

* `POST /communications/rfqs`
* `GET /communications/rfqs`

**Jan 30, 2026**

Order queue position returns `queue_position_fp` representing the quantity of shares preceeeding the given order.
Note: the new field is 0-indexed, e.g. the first order in the queue returns `0.00`.

Affected endpoints:

* `GET /portfolio/orders/queue_positions`
* `GET /portfolio/orders/{order_id}/queue_position`

**Feb 12, 2026**

The `ticker` and `margin_ticker` WebSocket channels now include top-of-book sizes and last trade size:

* `yes_bid_size_fp` / `bid_size_fp` — number of contracts at the best bid price
* `yes_ask_size_fp` / `ask_size_fp` — number of contracts at the best ask price
* `last_trade_size_fp` — number of contracts in the most recent trade

Size changes (even without price changes) now trigger ticker updates. All size fields are fixed-point strings supporting fractional contracts.

**Affected channels:**

* `ticker`
* `margin_ticker`

**Jan 29, 2026**

Order responses now include `subaccount_number` (0 for primary, 1-63 for subaccounts) for direct users.

**Affected endpoints:**

* `GET /portfolio/orders`
* `GET /portfolio/orders/{order_id}`

**Jan 29, 2026**

The `subaccount` query parameter behavior has been updated for orders, fills, and settlements.
When `subaccount` is omitted, results are returned across all subaccounts for the authenticated direct member.
When `subaccount` is provided (including `0` for primary), results are filtered to that specific subaccount.

**Affected endpoints:**

* `GET /portfolio/orders`
* `GET /portfolio/fills`
* `GET /portfolio/settlements`

**Jan 29, 2026**

See [Fixed-Point Contracts](https://docs.kalshi.com/getting_started/fixed_point_contracts.md) for updated migration details.

**Jan 29, 2026**

Fill WebSocket messages now include `fee_cost` as a fixed-point dollars string.

**Affected channel:**

* `fill`

**Jan 28, 2026**

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

**Jan 28, 2026**

Batch cancel now supports per-order subaccounts while remaining backwards compatible with the existing `ids` payload.

**Batch cancel:**

* `POST /portfolio/orders/batched/cancel`
* New request shape: `orders: [{ order_id, subaccount? }]` (subaccount defaults to `0`)
* Legacy `ids` array is still accepted and maps to subaccount `0`

**Jan 28, 2026**

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

**Jan 27, 2026**

The subaccount balance field will be represented as a fixed-point dollars string instead of
a centicent integer.

**Affected endpoint:**

* `GET /portfolio/subaccounts/balances`

**Jan 27, 2026**

The exhange `fee_cost` will be made available on the Fills API starting `January 28, 2026`.

**Affected endpoint:**

* `GET /portfolio/fills`

**Jan 26, 2026**

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

**Jan 22, 2026**

The `POST /communications/quotes` endpoint now accepts an optional `subaccount` parameter to create quotes on behalf of a subaccount.

**Affected endpoint:**

* `POST /communications/quotes`

**Jan 22, 2026**

New endpoint which provides authorized user their api tier and corresponding read and write limits.

**New endpoint:**

* `GET /account/limits`

Release date: `January 28, 2026`

**Jan 22, 2026**

Added `order_group_updates` WebSocket channel to stream order group lifecycle updates
(created, triggered, reset, deleted, limit\_updated). Payloads include `contracts_limit_fp`
for created and limit\_updated events.

**New channel:**

* `order_group_updates`

Release date: `January 29, 2026`

**Jan 21, 2026**

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

**Jan 29, 2026**

Release date: `January 29, 2026`

**Jan 29, 2026**

Added an endpoint to update the contracts limit for an order group (rolling 15-second window). If the updated limit would immediately trigger the group, all orders in the group are canceled and the group is triggered.

**New endpoint:**

* `PUT /portfolio/order_groups/{order_group_id}/limit`

**Response updates:**

* `GET /portfolio/order_groups`
* `GET /portfolio/order_groups/{order_group_id}`

Both now include `contracts_limit` and `contracts_limit_fp`.

Release date: `January 29, 2026`

**Jan 22, 2026**

Added `*_fp` fixed-point contract count fields in the WebSocket AsyncAPI spec and examples
(orderbook, ticker, trades, fills, positions, communications). See the [WebSocket reference](https://docs.kalshi.com/websockets.md).

Release date: `January 22, 2026`

**Jan 21, 2026**

Added `updated_time` to Market responses and `min_updated_ts` filter to `GET /markets`, which filters for only markets updated later than the provided unix ts.

Affected endpoints:

* `GET /markets/{ticker}`
* `GET /markets`.

**Jan 20, 2026**

Currently, a market settled to a scalar result will return `""` in the `market_result` field.
Starting in the next release, this value will read `"scalar"` instead.

Affected endpoints:

* `GET /markets/{ticker}`
* `GET /markets`

Release date: `January 28, 2026`

**Jan 21, 2026**

Added manual trigger support for order groups.

**New endpoint:**

* `PUT /portfolio/order_groups/{order_group_id}/trigger`

Release date: `January 22, 2026`

**Jan 16, 2026**

Maker RFQ client order IDs now use the format `quote:<hash>:<quote_id>`, where `hash` is an
8-character hash segment and the maker's quote ID is added as a suffix.

Release date: `January 22, 2026`

**Jan 16, 2026**

Added `include_latest_before_start` parameter to the single market candlesticks endpoint for price continuity.

When set to `true`, prepends a synthetic candlestick that:

* Uses the close price from the most recent candlestick before `start_ts`
* Sets `previous_price` to enable continuous price charting

**Affected endpoint:**

* `GET /series/{series_ticker}/markets/{ticker}/candlesticks`

Release date: `January 22, 2026`

**Jan 15, 2026**

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

See [Fixed-Point Contracts](https://docs.kalshi.com/getting_started/fixed_point_contracts.md) for migration details.

Release date: `Jan 22, 2026`

**Jan 13, 2026**

Settlement value on component legs are now reported when pulling MVEs.

Release date: `January 13, 2025`

**Jan 12, 2026**

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

**Jan 9, 2026**

New endpoints for managing subaccounts within a user's portfolio.

**New endpoints:**

* `POST /portfolio/subaccounts` - Create a new subaccount
* `GET /portfolio/subaccounts/balances` - Get balances for all subaccounts
* `POST /portfolio/subaccounts/transfer` - Transfer funds between subaccounts
* `GET /portfolio/subaccounts/transfers` - Get paginated history of subaccount transfers

**Note:** Transfers require a unique `client_transfer_id` for idempotency.

**Jan 9, 2026**

On `GET /markets`, responses may bear `is_provisional: true`, indicating that the market will be removed
from the API if it has no activity by settlement time.

Notes:

* Historical and existing markets are unaffected, this change only applies going forward.
* A market will never transition into the provisional state if it was not created as provisional.

Expected release date: `January 9, 2025`.

**Jan 6, 2026**

Added optional `volume` field to Series responses showing total contracts traded across all events in the series.

**Affected endpoints:**

* `GET /series` - Added `include_volume` query parameter (default: `false`)
* `GET /series/{series_ticker}` - Added `include_volume` query parameter (default: `false`)

When `include_volume=true`, the response includes the `volume` field with the total contracts traded.

Release date: `January 15, 2026`

**Jan 6, 2026**

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

**Jan 5, 2026**

The deprecated fields `category` and `risk_limit_cents` will be removed from Market responses.

**Affected endpoints:**

* `GET /markets`
* `GET /markets/{ticker}`

Release date: `January 8, 2026`

**Dec 22, 2025**

Search endpoints now accept lowercase query parameters for improved flexibility and consistency.

Release date: `December 22, 2025`

**Dec 19, 2025**

Added `settlement_ts` field to `GET /markets` and `GET /markets/{ticker}` responses.

Release date: `December 25, 2025`

**Dec 16, 2025**

The `Market` response object now documents all possible `status` values: `initialized`, `inactive`, `active`, `closed`, `determined`, `disputed`, `amended`, `finalized`.

**Dec 13, 2025**

In `GET /markets`, markets that have been paused by an administrator will be available under new the `paused` status filter.

**Dec 11, 2025**

`GET /portfolio/settlements` will return each settled position's Event Ticker.
Release Date: `December 18, 2025`

**Dec 18, 2025**

API keys now support a `scopes` field. Valid scopes are `read` and `write`. Keys default to full access if not specified. All existing API keys will have both scopes.

Release date: `December 18, 2025`

**Dec 5, 2025**

`GET /portfolio/positions` will only return unsettled positions. For fetching settled market positions, switch to `GET /portfolio/settlements`.

Release date: December 11, 2025

**Dec 2, 2025**

Breaking Change: `GET /events` excludes multivariate events

Release date: December 4, 2025

**Dec 1, 2025**

Release date: `December 4, 2025`

**Dec 1, 2025**

`DELETE /portfolio/orders/batched` is now generally available. Advanced API access is no longer required. (The Nov 14th update only applied to `POST`.)

Release date: `December 4, 2025`

**Nov 30, 2025**

**FIX API v1.0.17**

* **BREAKING CHANGE**: Tag reorganization for improved compatibility
  * QuoteConfirmStatus now uses tag 21010 (currently supporting both 297 and 21010)
  * SkipPendingExecReports now uses tag 21011 (currently accepting both 21003 and 21011)
  * Tag 297 designated for standard QuoteStatus field
  * Tag 21003 designated for ResendEventCount field
  * Clients should update to use new tags; legacy support will be removed in future version

**Nov 30, 2025**

**FIX API v1.0.16**

* Added MaxExecutionCost (21009) NewOrderSingle flag.

**Nov 29, 2025**

`GET /live_data/{type}/milestone/{milestone_id}` and `GET /live_data/batch` now returns `milestone_id` in the response.

Release date: `December 4, 2025`

**Nov 23, 2025**

Updates to filtering in `GET /markets`

* Inactive markets during tradable hours will returned in the `open` selector.
* Inactive markets during tradable hours no longer appear in the `closed` selector.
* Restricting to a single status filter allowed per request (previously announced).

Release date: `November 27, 2025`

**Nov 21, 2025**

Subpenny fields `yes_bid_dollars` and `no_bid_dollars` available on the Get Quote API. Affected endpoints:

* `GET /communications/quotes`
* `GET /communications/quotes/{quote_id}`

**Nov 27, 2025**

Adds new endpoint `GET /markets/candlesticks`

Retrieve candlestick data for multiple markets in a single API call. Supports up to 10,000 candlesticks total across all requested markets.

Expected release: `November 27, 2025`

**Nov 21, 2025**

**Breaking changes to order expiration and immediate-or-cancel (IoC) handling:**

1. **Past expiration timestamps now rejected**: Orders with `expiration_ts` in the past will be rejected with error "Expiration timestamp must be in the future" instead of being automatically converted to IoC orders.

2. **IoC + expiration\_ts combination rejected**: Orders cannot specify both `time_in_force: "immediate_or_cancel"` and `expiration_ts`. This will be rejected at the API level with error "Cannot specify both immediate\_or\_cancel and expiration\_ts".

3. **IoC orders no longer support expiration**: The IoC order type is now independent and does not accept an expiration timestamp.

**Migration guide**: If you were previously using past `expiration_ts` values to indicate IoC behavior, you must now explicitly set `time_in_force: "immediate_or_cancel"` instead.

Expected release: `TBD`

**Nov 21, 2025**

**FIX API v1.0.15**

* Added PreserveOriginalOrderQty (21008) Logon flag to maintain original OrderQty across all execution reports

**Nov 20, 2025**

'Pending' is being removed from the status enum on orders

Expected release: `November 27, 2025`

**Nov 14, 2025**

`POST /portfolio/orders/batched` will now be generally available. Advanced API access is no longer a prerequisite.

Release date: `November 20, 2025`

**Nov 14, 2025**

Added `created_time` to `GET /markets` && `GET /market` responses.

Release date: `November 20, 2025`

**Nov 11, 2025**

Breaking changes planned to `GET /markets` endpoint for performance reasons:
Timestamp filters will be mutually exclusive from other timestamp filters and certain status filters.

| Compatible Timestamp Filters | Additional Status Filters |
| - | - |
| min\_created\_ts, max\_created\_ts | `unopened`, `open`, *empty* |
| min\_close\_ts, max\_close\_ts | `closed`, *empty* |
| min\_settled\_ts, max\_settled\_ts | `settled`, *empty* |

**Nov 11, 2025**

Added new timestamp filters for the `GET /markets` endpoint:

* `min_created_ts`
* `max_created_ts`
* `min_settled_ts`
* `max_settled_ts`

**Nov 7, 2025**

* `GET /portfolio/positions` will no longer return `resting_orders_count` in both the `event_positions` and `market_positions` field.
* The `resting_order_count` filter on `GET /portfolio/positions` will no longer be supported. Requests specifying this filter will return a 400 error.

Expected release: `November 13, 2025`

**Nov 13, 2025**

`GET /portfolio/settlements` now returns the sum of trade fees paid by the user on a settled market position.

**Nov 6, 2025**

Fixed two issues with the `GET /events` endpoint's `limit` parameter:

* **Default increased**: The default limit is now 200 (previously 100) to return more results per page
* **Parameter**: Requests with `with_nested_markets=true` now properly respect `limit=200` instead of being capped at 100

**Nov 6, 2025**

The `GET /portfolio/positions` endpoint now includes `total_cost_shares`, which tracks the total number of shares traded on an event (including both YES and NO contracts).

**Nov 6, 2025**

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

**Oct 24, 2025**

Fixed batch order creation to return proper error details when post-only orders cross the market. The response now includes:

* Error code: `"invalid order"`
* Error details: `"post only cross"`

This makes the batch endpoint consistent with single order creation and provides clear feedback on why post-only orders were rejected.

**Oct 20, 2025**

The `GET /portfolio/orders` endpoint's `event_ticker` parameter now supports filtering by multiple events using comma-separated values.

**Example usage:**

```
GET /portfolio/orders?event_ticker=EVENT1,EVENT2,EVENT3
```

**Backward Compatible:**

* Single event ticker queries continue to work as before
* Multiple event tickers return orders from all specified events

**Oct 19, 2025**

Fixed missing fields in Quote responses: `rfq_target_cost_centi_cents`, `rfq_creator_order_id`, and `creator_order_id` are now properly included in all Quote-related endpoints.

**Oct 16, 2025**

The `GET /events` endpoint now supports an optional flag, `with_milestones`, that includes all milestones related to the returned events.

Expected release: `October 16, 2025`

**Oct 14, 2025**

The order returned by create order is now the same model as the model returned by get order.

**Oct 13, 2025**

The `GET /v2/incentive_programs` and `GET /incentive_programs` endpoints now return a `series_ticker` field for each incentive program.

Expected release: `October 13, 2025`

**Oct 10, 2025**

The `price_level_structure` field has been moved from the event level to the market level. Each market now has its own `price_level_structure` field.

**Affected endpoints:**

* `GET /trade-api/v2/events`
* `GET /trade-api/v2/events/:event_ticker`
* `GET /trade-api/v2/markets`
* `GET /trade-api/v2/markets/:ticker`

**Note:** The `price_level_structure` field on event objects is now deprecated and will be removed. Please use the field on individual market objects instead.

Expected release date: `Oct 15th, 2025`

**Oct 13, 2025**

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

**Oct 8, 2025**

Fixed routing inconsistency where certain collection endpoints required trailing slashes, causing unnecessary 301 redirects for requests without them.

**Endpoints now returning 200 for requests without trailing slash** (previously returned 301):

* `GET /milestones`
* `GET /structured_targets`
* `GET /multivariate_event_collections`
* `GET /series`
* `GET /api_keys`
* `POST /api_keys`

**Note:** Requests with trailing slashes (e.g., `/milestones/`) will now receive a 301 redirect to the version without the trailing slash, which is the opposite of the previous behavior.

**Oct 9, 2025**

Subpenny fields have been added to orders (`taker_fees_dollars`, `maker_fees_dollars`), as well as to public trades (`yes_price_dollars`, `no_price_dollars`).

Endpoints affected:

* `GET /trade-api/v2/portfolio/orders`
* `GET /trade-api/v2/markets/trades`

**Oct 9, 2025**

Fields have been added to all RFQ and quote messages to support subpenny pricing via the dollar normalized price fields.
For more info reference:

* [Subpenny Pricing](https://docs.kalshi.com/getting_started/subpenny_pricing.md)
* [WebSocket Documentation](https://docs.kalshi.com/websockets.md)

**Oct 7, 2025**

Enhanced the existing `GET /portfolio/balance` endpoint to include a `portfolio_value` field that provides the total portfolio value (available balance plus current market value of all positions), both in cents.

**Oct 1, 2025**

The `GET /series/fee_changes` endpoint now returns user-facing fee type names (`quadratic`, `quadratic_with_maker_fees`, `flat`) instead of internal fee structure names. This change also applies to CustomerIO notifications for scheduled series fee updates.

Expected release: `October 1, 2025`

**Oct 1, 2025**

**FIX API v1.0.14**

* Added support for subpenny pricing across multiple FIX messages
* For more info see [Subpenny Pricing](https://docs.kalshi.com/fix/subpenny-pricing.md)

**Sep 25, 2025**

Repeated subscriptions on the same WebSocket call will no longer error. If passing
the same market tickers as before, no action will be taken. If passing new market tickers,
they will be added to your existing subscription.

Additionally, the user may supply WS Command `list_subscriptions` to view their existing subscriptions.

Expected release: `October 1, 2025`

**Sep 25, 2025**

For optimization purposes, partial fills generated by self-crossing FoK orders are not rolled back.
If a FoK order self-crosses, order execution proceeds based on `self_trade_prevention_type`:

* `taker_at_cross`: the taker is canceled, execution stops. Any partial fills are executed.
* `maker`: the maker is canceled, execution continues. After execution, remaining taker quantity is canceled.
  Any fills are executed.

This fixes a bug where partially filled FoK orders with Maker STP entered into the book after self-crossing.
Expected enforced date: `Oct 1, 2025`.

**Sep 22, 2025**

User seeking a simple way to determine the direction of their fill should reference purchased\_side. Both BUY YES or SELL NO result in purchased\_side = YES. The addition of this field is the first step in standardizing the fills WebSocket and REST endpoints, which have different conventions for the interpretation 'side' and 'user\_action'.

Expected Enforce Date: deprecation date for existing fields not yet scheduled.

**Sep 21, 2025**

Added new public API endpoint for getting all of a series' scheduled fees:

* `GET /series/fee_changes` - Get a series' fee changes. If query string parameter show\_historical is set to true, ALL fee changes previous and upcoming will be shown. If set to false, only upcoming fee changes will be shown

**Sep 25, 2025**

Specifying `order_type` is no longer required and only `limit` type orders will be supported.
Price must be supplied based on the underlying market structure. Example usage:

```
{"yes_price": 99, "side: "yes"} // buy yes or sell no at market price
{"no_price": 99, "side: "no"} // buy no or sell yes at market price
```

Expected enforce date: `Sep 25, 2025`

**Sep 18, 2025**

WebSocket connections per user are limited by usage tier. The default limit begins at 200 and increases based on API usage tier.

**Sep 18, 2025**

A new WS channel is being introduced for streaming information related to pre-trade communications (RFQs and quotes).

**Sep 15, 2025**

Additional metadata is being added to RFQs on multivarate events (MVEs) that break down their component parts explicitly. Market payloads are also being expanded with these new optional fields that are filled only for MVE markets.

**Sep 15, 2025**

Added new public API endpoint for event candlesticks:

* `GET /candlesticks` - Get candlesticks for all markets associated with an event. If the # of candlesticks exceeds 5000, paginate the results and return an adjustedEndTs which should be used as the start\_ts for your next request.

**Sept 11, 2025**

The TypeScript SDK is now available through NPM! Install with `npm install kalshi-typescript`.

Documentation and examples available at docs.kalshi.com

**Sep 11, 2025**

Added new public API endpoint for forecast percentiles history:

* `GET /forecast_percentiles_history` - Get percentile history of a event forecast

**Sep 10, 2025**

Added new public API endpoint for incentive programs (not yet live):

* `GET /incentive_programs` - List incentive programs with filtering options (by market ticker, active status, payout status)

**Sep 9, 2025**

Subpenny pricing fields have been added to WebSocket messages. Any message bearing price in cents will now also bear
an equivalent fixed-point dollars field.

For more info, see [Subpenny Pricing](https://docs.kalshi.com/getting_started/subpenny_pricing.md).

**Sep 9, 2025**

Both the individual and batch `GET` events endpoints now also return `available_on_brokers` which indicates that they are available on intermediate platforms/ brokers.

**Sep 6, 2025**

The python SDK is being generated from our OpenAPI spec and is available through pip with pip install kalshi-python.
Docs for the new SDK are available on docs.kalshi.com/python-sdk.

**Aug 31, 2025**

Subpenny pricing fields have been added to APIs involving price, fees, and money in general.
E.g. next to a field called `"price": 12` (representing 12 cents), you will also see `"price_dollars": "0.1200"`,
which is a string bearing a fixed-point representation of money accuate to at 4 decimal points.

For now, this change is read-only, meaning that the minimum allowable tick size for orders is still 1c. Eventually,
we will introduce sub-penny pricing on orders. For now, please prepare for an eventual migration to the higher granularity
price representation.

For more info, see [Subpenny Pricing](https://docs.kalshi.com/getting_started/subpenny_pricing.md).

**Sep 2, 2025**

The market payload has been updated to include two new fields that describe markets which are part of Multivariate Events.

**Sep 2, 2025**

The market payload has been updated to include two new fields that describe markets which are part of Multivariate Events.

**Aug 21, 2025**

The MVE payload has been expanded to support more flexible structures. Several fields that are now redundant are deprecated, but not yet removed.

**Aug 21, 2025**

The Settlements API now includes the settlement value for a yes contract.

**Aug 21, 2025**

The get\_milestones endpoint now uses case-insensitive matching for the category parameter, resolving inconsistent filtering behavior between "Sports" and "sports".

**Aug 15, 2025**

**FIX API v1.0.13**

* Added Order Group management messages (UOG/UOH)
* Support for automatic order cancellation with contracts limits
* Create, Reset, and Delete operations for order groups

**Aug 14, 2025**

Filtering events by close ts and series by tags supported in the API.

**Aug 13, 2025**

The batch order endpoints are now available to all API users in the demo environment:

**Affected Endpoints:**

* `POST /portfolio/orders/batched` (BatchCreateOrders)
* `DELETE /portfolio/orders/batched` (BatchCancelOrders)

**Changes:**

* Basic tier users can now access batch endpoints in demo environment
* Production environment remains unchanged - Advanced tier or higher still required
* Rate limits still apply based on user tier

This change enables developers to test batch order functionality without needing Advanced tier access in the demo environment.

**Aug 13, 2025**

The error messages when an incorrect API signature is passed have been improved

**Aug 9, 2025**

The OpenAPI specification for the Kalshi API is now available at `https://docs.kalshi.com/openapi.yaml`. This allows developers to easily generate client libraries and integrate with the API using OpenAPI-compatible tools.

**Aug 8, 2025**

Added `client_order_id` field to orderbook delta WebSocket messages. This field appears only when you caused the orderbook change and contains the client\_order\_id of your order that triggered the delta.

**WebSocket Message Enhancement:**

* New field: `client_order_id` (string, optional)
* Present only when the authenticated user's order causes the orderbook change
* Contains the client-provided order ID of the triggering order

See the WebSocket documentation for implementation details.

**Aug 1, 2025**

Added `GET /portfolio/orders/queue_positions` endpoint for retrieving queue positions of multiple resting orders.

**Request Parameters:**

* `market_tickers` (optional): Array of market tickers to filter by
* `event_ticker` (optional): Event ticker to filter by

Note: You must specify one of `market_tickers` and `event_ticker` in the request.

**July 31, 2025**

We are migrating our API documentation to a new platform:

* **RSS feed moved** from `https://trading-api.readme.io/changelog.rss` to `https://docs.kalshi.com/changelog/rss.xml`
* **Documentation site** `trading-api.readme.io` is now deprecated
* **New documentation home**: `https://docs.kalshi.com`
* Historical changelog entries will not be backfilled to the new RSS feed

Please update your bookmarks and RSS subscriptions.

**July 31, 2025**

The GetEventMetadata endpoint has been expanded to include settlement sources.

**July 29, 2025**

The GetApiVersion endpoint has been removed. API versioning will not be available for the time being.

**June 26, 2025**

**FIX API v1.0.12**

* Added support for ListenerSession Logon flag for KalshiNR/KalshiRT
* Added support for ReceiveSettlementReports Logon flag for KalshiRT
* Deprecated SecurityGroup

**June 12, 2025**

**FIX API v1.0.11**

* Removed Required from OrderQty on Cancel 35=F
* Added PostOnly to Create 35=D

**Apr 15, 2025**

**FIX API v1.0.10**

* Removed deprecated event settlement message type
* Added ListenerSession and SkipPendingExecReports flag to Logon message type


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.