---
url: https://docs.kalshi.com/getting_started/market_lifecycle
lastmod: 2026-05-07T02:08:16.064Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Lifecycle

> How markets move from creation to settlement

Markets on Kalshi follow a lifecycle from creation through trading to determination and settlement. This page describes the states a market passes through and what to expect at each stage.

## Statuses

The REST API returns these statuses on `GET /markets` and `GET /markets/{ticker}`:

| Status        | Meaning                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------- |
| `initialized` | Created but not yet open for trading. Transitions to `active` when `open_time` passes.    |
| `active`      | Open for trading.                                                                         |
| `inactive`    | Temporarily deactivated by the exchange. Trading is paused but the market has not closed. |
| `closed`      | Past `close_time`. No new orders accepted. Awaiting determination.                        |
| `determined`  | Result is known. Settlement timer is running.                                             |
| `disputed`    | Result has been challenged. May be re-determined.                                         |
| `amended`     | Re-determined after a dispute. Settlement timer restarts.                                 |
| `finalized`   | Settlement complete. Positions have been paid out. Terminal state.                        |

When filtering with `GET /markets?status=`, the values map as follows:

| Filter value | Matches                                                  |
| ------------ | -------------------------------------------------------- |
| `unopened`   | `initialized` (before `open_time`)                       |
| `open`       | `active`                                                 |
| `paused`     | `inactive`                                               |
| `closed`     | Any market past `close_time` that is not yet `finalized` |
| `settled`    | `finalized`                                              |

## Transitions

Some transitions are implicit (time-based), others are explicit (event-driven).

**Implicit (no WebSocket event):**

* `initialized` → `active`: when `open_time` passes. There is no `activated` WebSocket event for this transition.
* `active` / `inactive` → `closed`: when `close_time` passes.

**Explicit (WebSocket event emitted):**

* `active` → `inactive`: exchange deactivates the market. Event: `deactivated`.
* `inactive` → `active`: exchange reactivates a paused market. Event: `activated`. All resting orders are cancelled on this reactivation.
* `closed` → reopened `active`: `close_time` is moved into the future. Events: `close_date_updated`, then `activated`.
* Close time updated: `close_time` changes. Event: `close_date_updated`. This can happen when a market is closed ahead of its scheduled close time, including before determination.
* `closed` → `determined`: result is set. Event: `determined`.
* `determined` / `amended` → `finalized`: positions paid out. Event: `settled`.

## Time fields

Markets have several time fields:

| Field                      | Meaning                                                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open_time`                | When the market opens for trading.                                                                                                                        |
| `close_time`               | When trading stops. May be moved earlier if `can_close_early` is true.                                                                                    |
| `expected_expiration_time` | When the outcome is expected to be known.                                                                                                                 |
| `latest_expiration_time`   | Latest possible expiration time.                                                                                                                          |
| `expiration_time`          | Deprecated legacy field. Prefer `latest_expiration_time` for the legacy expiry semantics; use `expected_expiration_time` if you want the forecasted time. |

## Determination and settlement

After a market closes and the outcome is known, the market is determined and `result` is set to `yes`, `no`, or `scalar`.

A settlement timer then runs for `settlement_timer_seconds`, which is visible in the REST response. During this window the market remains at `determined` and the result may be disputed.

Once settlement completes, positions are paid out. In REST, settled markets end up at `finalized` rather than a separate `settled` status, and `settlement_ts` is populated.

## Orders after close

Once `close_time` passes, all order operations, including cancellations, are rejected with `MARKET_INACTIVE`. Resting orders are cancelled shortly after close, and cancellation updates are published on the usual user channels.

## WebSocket

Market lifecycle events are delivered on two channels:

| Channel                         | Markets covered                   | Event types                                                                                              |
| ------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `market_lifecycle_v2`           | All markets except MVE (`KXMVE*`) | `created`, `activated`, `deactivated`, `close_date_updated`, `determined`, `settled`, `metadata_updated` |
| `multivariate_market_lifecycle` | MVE markets only (`KXMVE*`)       | `created`, `activated`, `deactivated`, `close_date_updated`, `determined`, `settled`                     |

Both channels also emit `event_lifecycle` messages when new events are created.

The WebSocket `settled` event corresponds to settlement being processed; in REST, settled markets end up at `finalized`.

## FAQ

<AccordionGroup>
  <Accordion title="Why can `expected_expiration_time` be before `close_time`?">
    `expected_expiration_time` is the time the event is likely to resolve — for a sports game, typically a few hours after the scheduled start. `close_time` is when the market automatically closes for trading, and may be set well into the future to allow for rescheduling. That means `expected_expiration_time` can be earlier than `close_time`.
  </Accordion>

  <Accordion title="Why might `GET /markets/{ticker}` return `404` right after a `created` event?">
    The market may not be queryable immediately after a `created` event. Retry with backoff.
  </Accordion>

  <Accordion title="Do event responses include a top-level `status` field?">
    `GET /events` supports a `status` filter with values `unopened`, `open`, `closed`, and `settled`. The filter matches on child market statuses, not an event-level status — an event appears in results if **any** of its child markets has a matching status. For example, an event with four open markets and one settled market matches both `status=open` and `status=settled`. Use `with_nested_markets=true` if you need individual market statuses.
  </Accordion>
</AccordionGroup>
