---
url: https://docs.kalshi.com/getting_started/order_errors
lastmod: 2026-11-13T01:30:44.913Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Order Errors

> HTTP statuses and error codes returned by the Predictions REST order endpoints, and what to do about each

This page covers the Predictions REST order endpoints under `/portfolio/events/orders`: create, amend, decrease, cancel and their batch forms.

An order the API or the exchange rejects normally has this body. Switch on `code`; `message` and `details` are for people.

```json theme={null}
{
  "error": {
    "code": "invalid_order",
    "message": "invalid order",
    "details": "post only cross"
  }
}
```

`details` is usually omitted when there is nothing to add. Errors inside a [batch response](#batch-requests) always include it, as an empty string when there is nothing to add.

A request body the API cannot parse, such as malformed JSON or a field of the wrong type, is a `400` whose `code`, `message` and `details` sit at the top level of the body instead of under `error`:

```json theme={null}
{
  "code": "bad_request",
  "message": "bad request",
  "details": "..."
}
```

Read `error.code` first and fall back to a top-level `code`. A body that parses but omits a required field is the usual shape. Depending on the field, the code is `missing_parameters` or `invalid_order` (on Create Order, a missing `ticker` gives the first and a missing `side`, `count` or `price` the second), so handle both and read `details`.

> [!NOTE]
>
> Most codes are lowercase with underscores. A few rejections come straight from the matching engine and keep its spelling, in upper case or as a sentence with underscores in place of spaces. They are listed below exactly as returned. Match codes case-sensitively. On a `400`, `403`, `404`, `409`, `410` or `429`, treat an unknown code as a rejection. A `408`, any `5xx` or a dropped connection is different: see [When the outcome is unknown](#when-the-outcome-is-unknown).

## A success response does not mean the order is resting

`201` from [Create Order](https://docs.kalshi.com/api-reference/orders/create-order-v2.md) means the exchange accepted the order. Read `fill_count` and `remaining_count` to see what happened to it. These outcomes are successes, not errors:

| Order | Outcome | Response |
| - | - | - |
| `immediate_or_cancel` with nothing to match | The unfilled quantity is canceled | `201`, `remaining_count` `0.00` |
| `self_trade_prevention_type: taker_at_cross` that meets your own resting order | Fills ahead of your own order stand, then the rest of the incoming order is canceled | `201`, `remaining_count` `0.00` |
| `reduce_only` larger than your position | The order is capped to your position and the excess is dropped | `201`; `fill_count` and `remaining_count` reflect the capped quantity |

Two outcomes that look similar are returned as errors (shown here for Create Order):

| Order | Status | `code` |
| - | - | - |
| `fill_or_kill` that cannot fill in full | `409` | `fill_or_kill_insufficient_resting_volume` |
| `post_only` that would cross the book | `400` | `invalid_order`, with `details` set to `post only cross` |

## Error codes

The statuses below are what a single-order request returns. In a batch request the same `code` appears on the affected entry's `error` inside the `201` or `200` response, unless the failure is one of those listed under [Batch requests](#batch-requests) as rejecting the whole batch.

### 400 Bad Request

| `code` | Meaning | What to do |
| - | - | - |
| `invalid_order` | The request failed validation before reaching the exchange, or a `post_only` order would have crossed. `details` names the cause, for example `reduce_only can only be used with IoC orders`, `expiration_time must be in seconds if provided`, or an invalid price or count format. | Fix the field named in `details`. |
| `invalid_parameters` | A parameter is malformed. `details` names it when it can; it carries no additional detail when the `client_order_id` on a new order breaks the [format rules](#client-order-ids), and when a decrease does not supply exactly one of `reduce_by` and `reduce_to`. | Check `client_order_id` first, then the fields the endpoint requires. |
| `invalid_price` | The price is not valid for this market, for example `0`, `1.00`, or a value that is not on the market's price grid. | Use a price from the market's `price_ranges`. See [Fixed-Point Migration](https://docs.kalshi.com/getting_started/fixed_point_migration.md). |
| `invalid_order_size` | The count is not allowed on this market, for example a fractional count on a market that trades whole contracts only. | Send a whole-contract count unless the market supports fractional trading. |
| `insufficient_balance` | The account's balance on the market's exchange shard does not cover the order. | Reduce the order, cancel resting orders, or [fund the shard](https://docs.kalshi.com/getting_started/exchange_sharding.md#balance-management). |
| `too_many_open_orders` | The account is already at its limit of resting orders on this exchange shard. See [Open order limit](#open-order-limit). | Cancel resting orders until the account is below its limit, then resubmit. |
| `exceeded_order_group_contracts_limit` | The order's [order group](https://docs.kalshi.com/getting_started/order_groups.md) is triggered. | Reset the group, then resubmit. |
| `invalid_amend_quantity_for_order` | An amend's `count` is below the quantity already filled, a decrease's `reduce_to` is above the remaining quantity, or the result would be a fractional count on a whole-contract market. | Recompute from the order's current fill and remaining counts. |
| `order_ticker_mismatch`, `order_side_mismatch` | The `ticker` or `side` in an amend does not match the order. | Send the order's own ticker and side. |
| `order_id_and_client_order_id_mismatch` | The `client_order_id` in an amend belongs to a different order than the one in the path. | Send the order's current `client_order_id`, or omit it. |
| `AMEND_ORDER_NO_OP` | The amend or decrease would change nothing: same price, count, expiration and client order ID, or a decrease to the current remaining quantity. | Treat the order as already in the requested state. |
| `EXPIRED_TIMESTAMP` | `expiration_time` is in the past, or the order being amended has already reached its expiration. | Send a future timestamp, in seconds. |
| `Cannot_specify_both_IoC_and_expiration_timestamp` | `expiration_time` was sent with `time_in_force: immediate_or_cancel`. | Drop `expiration_time`, or use `good_till_canceled`. |
| `Post_only_but_execution_type_can't_rest` | `post_only` was sent with `immediate_or_cancel` or `fill_or_kill`. | Use `post_only` only with `good_till_canceled`. |
| `too_many_orders_in_batch` | The batch has more entries than your tier allows. See [Batch requests](#batch-requests). | Split the batch. |

A request with an `exchange_index` below `-1` or above the highest exchange shard also returns `400`, with a code that states the valid range.

### 404 Not Found

| `code` | Meaning | What to do |
| - | - | - |
| `not_found` | No such open order for this subaccount on the exchange shard the request reached. The order ID may be malformed, or the order may have filled, been canceled or expired, belong to another subaccount, or rest on a different shard. Also returned when the order's `order_group_id` belongs to another subaccount. | Check the `subaccount` and the shard routing. See [Requests sent to the wrong exchange shard](#requests-sent-to-the-wrong-exchange-shard). |
| `market_not_found` | The ticker does not exist on the exchange shard the request reached. | Check the ticker, and omit `exchange_index` to auto-route. |
| `order_group_not_found` | The `order_group_id` does not exist on the market's exchange shard. | Create the group on the same `exchange_index` as the market. |
| `insufficient_shard_balance` | The account has never been funded on the exchange shard the request reached. | For a new order, [fund that shard](https://docs.kalshi.com/getting_started/exchange_sharding.md#balance-management). For a cancel, amend or decrease, the request reached the wrong shard: see below. |

### 409 Conflict

| `code` | Meaning | What to do |
| - | - | - |
| `order_already_exists` | The `client_order_id` is already in use. See [Client order IDs](#client-order-ids). | Do not resubmit. Look the order up to learn its state. |
| `fill_or_kill_insufficient_resting_volume` | A `fill_or_kill` order could not fill in full, so nothing traded. | Resubmit with a smaller count or a different price. |
| `market_inactive` | The market is not open for trading: it has not opened, it is inactive, or it has closed. | Check the market's `status`. See [Market Lifecycle](https://docs.kalshi.com/getting_started/market_lifecycle.md). |
| `trading_is_paused` | A trading pause is in effect. New orders and amends are rejected; cancels and decreases are accepted. | Wait for the pause to end. See [Maintenance and Pauses](https://docs.kalshi.com/getting_started/maintenance_and_pauses.md). |
| `exchange_is_paused` | An exchange pause is in effect. All order requests are rejected, cancels included. | Wait for the pause to end. |
| `TRADING_BLOCKED` | The account or subaccount is not permitted to place or amend this order. | Contact support. |

### Other statuses

| Status | `code` | Meaning |
| - | - | - |
| `403` | `permission_denied` | The API key is not allowed to call this endpoint. |
| `403` | `subaccount_is_restricted_by_API_key` | The request names a subaccount other than the one the API key is restricted to. Omit `subaccount` or send the key's own. |
| `403` (location restriction) | A sentence describing the restriction, with underscores in place of spaces | New orders on this market are not available from your location or for your account's region. Applies to Create Order and to Batch Create Orders, where one affected entry rejects the whole batch. Its wording can change, so do not match on the exact text; other `403` causes keep their own codes. Do not retry, and contact support if you believe it is wrong. If the check itself cannot be completed, the response is a `503` `service_unavailable` instead. |
| `410` | `deprecated_v1_order_endpoint` | The request used a removed legacy write endpoint under `/portfolio/orders`. Use the `/portfolio/events/orders` endpoints. |
| `429` | `too_many_requests` | The request did not fit in your Write budget. See [Rate Limits and Tiers](https://docs.kalshi.com/getting_started/rate_limits.md). |
| `408` | `context_canceled` or similar | The request was canceled or timed out before a result came back. The exchange may still have processed it. See [When the outcome is unknown](#when-the-outcome-is-unknown). |
| `500`, `503`, `504` | `internal_server_error`, `service_unavailable`, or a timeout code such as `deadline_exceeded` | The request failed or timed out part-way. See [When the outcome is unknown](#when-the-outcome-is-unknown). |

### When the outcome is unknown

A `408` or `5xx` response, a timeout, or a connection that drops before the response arrives does not tell you whether the exchange processed the request. The same is true of an entry inside a successful [batch response](#batch-requests) whose `error.code` is one of those failure codes. The order may have been placed, amended or canceled. Do not assume it was rejected, and do not resubmit blindly:

1. Find out what happened: wait for the order's update on the [`user_orders`](https://docs.kalshi.com/websockets/user-orders) WebSocket channel, or read it back with [Get Orders](https://docs.kalshi.com/api-reference/orders/get-orders.md), allowing for the [read delay](#reading-an-order-back).
2. Resubmit only once you know the first attempt did not take effect.

Sending a `client_order_id` on every new order helps: a resubmission is rejected with `order_already_exists` while the first order is still open. It does not protect you once that order has filled, canceled or expired.

## Client order IDs

`client_order_id` is optional. When you send one:

* It can be up to 64 characters, using letters, digits and `_`, `-`, `:`, `+`, `=`, `/`. A UUID fits. On Create Order, any other value is rejected with `400 invalid_parameters` and no `details` field. In Batch Create Orders, only that entry is rejected: the batch still returns `201`, and the entry carries an `error` with code `invalid_parameters` and an empty `details`.
* On an amend, a malformed `client_order_id` or `updated_client_order_id` is also a `400`, but the `code` is a parser message that starts with `ID_parse_error`. Match it by prefix.
* It must be unique per subaccount on the market's exchange shard. The same ID can be used by two subaccounts, or on two shards, without conflict.
* A duplicate is rejected with code `order_already_exists`: an HTTP `409` on Create Order, an entry error inside the `201` on Batch Create Orders. The response does not include the original order, so look it up with [Get Orders](https://docs.kalshi.com/api-reference/orders/get-orders.md).
* An ID is reserved while its order is open. Once the order fills, cancels or expires the ID may still be rejected for a while, but that is not guaranteed: it can become usable again immediately. Do not rely on `order_already_exists` to detect a retry of an order that may already have closed, and do not reuse IDs; generate a new one for every order.
* An amend can replace it with `updated_client_order_id`, which must not be in use by another open order.

## Open order limit

In production, the default limit is 200,000 resting orders per account on each exchange shard. The limit counts every subaccount together. Some accounts have a different limit, and so does the demo environment.

The check looks at the orders already resting, not at the new order: once the account is at its limit, every new order on that shard is rejected with `400 too_many_open_orders`, including `immediate_or_cancel`, `fill_or_kill` and `reduce_only` orders that would never rest. Cancel resting orders until the account is below its limit before submitting more.

## Requests sent to the wrong exchange shard

Every market trades on one [exchange shard](https://docs.kalshi.com/getting_started/exchange_sharding.md), and an order can only be changed on the shard where it rests. A request that reaches a different shard is answered by that shard, which knows nothing about the order. For single-order requests:

| Request | What you get |
| - | - |
| Cancel or decrease with no `exchange_index` and no `market_ticker` | The request goes to shard `0`. If the order rests on another shard: `404 not_found`, or `404 insufficient_shard_balance` if the account was never funded on shard `0`. |
| Cancel, amend or decrease with an explicit `exchange_index` that is not the market's | `404 not_found`, or `404 insufficient_shard_balance` if the account was never funded on that shard. |
| Create with an explicit `exchange_index` that is not the market's | `404 market_not_found`, or `404 insufficient_shard_balance` if the account was never funded on that shard. |

In each case the order is untouched: a `404` from a cancel does not mean the order is gone. A batch cancel entry sent to the wrong shard gets the same code on that entry. Funding the wrong shard does not fix an `insufficient_shard_balance` returned for one of these requests.

To avoid this, send `market_ticker` on every cancel and decrease and leave `exchange_index` out, so the request is routed by ticker. Create and amend already carry the ticker.

## Batch requests

[Batch Create Orders](https://docs.kalshi.com/api-reference/orders/batch-create-orders-v2.md) and [Batch Cancel Orders](https://docs.kalshi.com/api-reference/orders/batch-cancel-orders-v2.md) process their entries one at a time, in request order. A batch is not atomic.

**Rejected as a whole.** The request is authenticated, parsed and checked before any order is sent. A failure at this stage returns an error status, and no order in the batch is submitted, even if only one entry caused it. Examples:

* `400 too_many_orders_in_batch`: the batch exceeds your tier's maximum. Every tier can send at least 20 entries; above that, the maximum is the number of default-cost orders your per-second Write budget covers.
* `400 invalid_order`: any one order fails request validation, such as `reduce_only` without `immediate_or_cancel`, an `expiration_time` in milliseconds, a count that is not a valid quantity, or an empty `orders` array. An empty batch cancel returns `400 invalid_parameters`.
* `400` with a top-level `code`: the body cannot be parsed, as described at the top of this page.
* `401` or `403 permission_denied`: the request is not authenticated, or the API key is not allowed to call the endpoint.
* `400` or `403 subaccount_is_restricted_by_API_key`: any one entry names a subaccount that is out of range or that the API key is not allowed to use.
* A location-restriction `403`: any one entry in a batch create is for a market the account cannot trade from its location. A `503` is returned instead if that check cannot be completed.
* `429 too_many_requests`: the whole batch does not fit in your Write budget.

**Reported per entry.** Once those checks pass, entries are sent one by one, and a failure to convert, route or place an entry, including any rejection by the exchange, is reported inside a `201` (create) or `200` (cancel) response. Each entry of `orders` is in request order and either succeeded or carries an `error` object with the `code`, `message` and `details` described on this page. A failed create has no `order_id`; a failed cancel has `reduced_by` of `0.00`. Entries have no HTTP status of their own, so check every entry for `error`.

An entry error is not always a rejection. If its `code` is one of the rejection codes on this page, that order was not placed or that cancel did not happen. If it is `service_unavailable`, `internal_server_error`, or a timeout or cancellation code such as `context_deadline_exceeded`, the exchange may still have processed that entry, even though the batch returned `201` or `200`: a missing `order_id` or a `reduced_by` of `0.00` does not prove nothing happened. Handle those entries as described in [When the outcome is unknown](#when-the-outcome-is-unknown).

```json theme={null}
{
  "orders": [
    {
      "order_id": "3b23c1c7-f4ef-4f0d-8b9a-9e53c61f1a0d",
      "client_order_id": "8c35ecb3-328f-4f52-8c7c-0f4b9862f8d1",
      "fill_count": "0.00",
      "remaining_count": "10.00",
      "ts_ms": 1715793600123
    },
    {
      "client_order_id": "2a0e3fc9-b593-4aa3-96e5-82f7f7566c2a",
      "ts_ms": null,
      "error": {
        "code": "insufficient_balance",
        "message": "insufficient balance",
        "details": ""
      }
    }
  ]
}
```

## Reading an order back

[Get Order](https://docs.kalshi.com/api-reference/orders/get-order.md), [Get Orders](https://docs.kalshi.com/api-reference/orders/get-orders.md) and the queue position endpoints are updated asynchronously after the matching engine processes a write. An order created, amended or canceled moments ago can briefly return `404 not_found` or its previous state. The response of the write itself is the only immediate result. The [`user_orders`](https://docs.kalshi.com/websockets/user-orders) WebSocket channel is also delivered asynchronously, so its update can arrive after the write returns; use it as the stream to wait on for confirmation and later changes.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.