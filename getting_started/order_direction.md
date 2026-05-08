---
url: https://docs.kalshi.com/getting_started/order_direction
lastmod: 2026-05-07T16:04:58.214Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Order direction (outcome_side and book_side)

> How direction is expressed on Order, Fill, and Trade responses, and how to migrate from the legacy action/side fields.

Direction on every Order, Fill, and Trade response is expressed by two
fields that carry the same bit in two vocabularies:

* **`outcome_side`** (`yes` | `no`) — which outcome the user is positioned
  for. A user paying to be long the yes outcome has `outcome_side=yes`;
  paying to be long the no outcome has `outcome_side=no`.
* **`book_side`** (`bid` | `ask`) — same bit in book-vocabulary.
  **`bid ≡ yes`, `ask ≡ no`** — always.

Pick whichever vocabulary fits your integration; you only need one of
them to know the trade's direction.

On public `Trade` and the `trade` WebSocket channel the fields are
named `taker_outcome_side` and `taker_book_side`, since a public trade
has no user perspective and reports the taker's side.

## Direction does not change the price

`outcome_side` describes directional exposure only; it does not change
the order's price. An order at price `p` with `outcome_side=no` is
matched by an order at the same price `p` with `outcome_side=yes` —
both parties trade at the same price, just on opposite directions.

## Equivalence between (action, side) and outcome\_side

Buy-yes and sell-no produce the same directional exposure (long yes);
buy-no and sell-yes both produce long no. The new fields make this
collapse explicit:

| Legacy `action` | Legacy `side` | `outcome_side` | `book_side` |
| --------------- | ------------- | -------------- | ----------- |
| buy             | yes           | yes            | bid         |
| sell            | no            | yes            | bid         |
| buy             | no            | no             | ask         |
| sell            | yes           | no             | ask         |

## Migration

`outcome_side` and `book_side` are the canonical way to determine
direction going forward. The legacy fields below are marked
deprecated and **will not be removed before May 14, 2026**.

| Legacy field     | Surface           | Replacement                              |
| ---------------- | ----------------- | ---------------------------------------- |
| `action`         | Order, Fill       | `outcome_side` / `book_side`             |
| `side`           | Order, Fill       | `outcome_side` / `book_side`             |
| `is_yes`         | Order (WS)        | `outcome_side` / `book_side`             |
| `purchased_side` | Fill (WS)         | `outcome_side` / `book_side`             |
| `taker_side`     | Trade (REST + WS) | `taker_outcome_side` / `taker_book_side` |

Existing integrations continue to receive the legacy fields until the
removal date. New integrations should read only `outcome_side` and
`book_side` (or the `taker_*` variants on public trades).

## Orderbook pricing convention

The `orderbook_delta` and `orderbook_snapshot` WebSocket channels are an
exception to the price-doesn't-change rule above. By default, no-side
deltas and snapshot levels are reported in **no-leg pricing**: a no-side
delta at `price_dollars=0.30` corresponds to a market offer of "no at
30c", which would match against "yes at 70c". The yes-side and no-side
therefore use different price scales by default — toggling sides flips
the price.

Subscriptions can opt into a single-scale view by passing
`use_yes_price: true` in the subscribe command params. When set:

* Yes-side deltas and snapshot levels are unchanged.
* No-side deltas and snapshot levels are reported in **yes-leg
  pricing** instead of no-leg, so `price_dollars` carries the same
  scale on both sides. A no-side delta at the price level that would
  otherwise be reported as `0.30` (no-leg) is instead reported as
  `0.70` (yes-leg).

This brings the orderbook channels in line with the price-doesn't-change
semantics on Order/Fill/Trade. The flag defaults to false to preserve
the existing long-standing behavior; new integrations are encouraged to
set it.

**Migration plan.** The default for `use_yes_price` will be flipped to
`true` in a future release, so subscriptions that don't explicitly set
it will start receiving the unified yes-leg pricing automatically. The
flag itself will then be removed in a subsequent release and the
unified-pricing behavior will be the only supported behavior — explicit
`use_yes_price: false` requests will no longer toggle the legacy
no-leg pricing once the flag is removed. We will announce concrete
dates for both steps before they happen; integrations that depend on
the legacy no-leg pricing should plan to migrate before the default
flip.
