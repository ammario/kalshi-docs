---
url: https://docs.kalshi.com/getting_started/fixed_point_migration
lastmod: 2026-08-04T00:52:32.777Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fixed-Point Representation

> Fixed-point prices, price level structures, and fractional contract quantities.

Last Updated: August 20, 2026

## Overview

Kalshi APIs represent prices and contract quantities as fixed-point strings:

1. **Prices**: fixed-point dollar strings (`_dollars` suffix), up to 4 decimal places
2. **Contract quantities**: fixed-point strings (`_fp` suffix), up to 2 decimal places

***

## Prices

Prices are represented as fixed-point dollar strings.

```json theme={null}
{
    "price_dollars": "0.1200"
}
```

* `*_dollars` fields are fixed-point dollar strings with up to 4 decimal places (e.g., `"0.1200"`)
* Integer-cent fields cannot represent sub-cent prices; on markets with sub-cent ticks, read prices from the `*_dollars` fields
* When combined with fractional contract sizes, intermediate calculations can reach up to 6 decimal places (for example, in fee rounding math)

### Price Level Structures

Each market's valid prices form a fixed grid, described by two fields on Market responses:

* `price_ranges` — an array of `{ start, end, step }` bands in fixed-point dollars. This is the source of truth for valid prices: any price on the grid is valid, and any off-grid price is rejected. Consume it dynamically per market and snap order and quote prices to the relevant band's `step`.
* `price_level_structure` — a human-readable label for the grid. Do not key pricing logic off this name; new structures are introduced over time, and a client that reads `price_ranges` is automatically compatible with all of them.

| Structure                      | Ranges          | Tick Size |
| ------------------------------ | --------------- | --------- |
| `linear_cent`                  | \$0.00 – \$1.00 | \$0.01    |
| `deci_cent`                    | \$0.00 – \$1.00 | \$0.001   |
| `tapered_deci_cent`            | \$0.00 – \$0.10 | \$0.001   |
|                                | \$0.10 – \$0.90 | \$0.01    |
|                                | \$0.90 – \$1.00 | \$0.001   |
| `center_whole_edge_half_cent`  | \$0.00 – \$0.10 | \$0.005   |
|                                | \$0.10 – \$0.90 | \$0.01    |
|                                | \$0.90 – \$1.00 | \$0.005   |
| `center_whole_edge_quint_cent` | \$0.00 – \$0.10 | \$0.002   |
|                                | \$0.10 – \$0.90 | \$0.01    |
|                                | \$0.90 – \$1.00 | \$0.002   |
| `center_half_edge_half_cent`   | \$0.00 – \$1.00 | \$0.005   |
| `center_half_edge_quint_cent`  | \$0.00 – \$0.10 | \$0.002   |
|                                | \$0.10 – \$0.90 | \$0.005   |
|                                | \$0.90 – \$1.00 | \$0.002   |
| `center_half_edge_deci_cent`   | \$0.00 – \$0.10 | \$0.001   |
|                                | \$0.10 – \$0.90 | \$0.005   |
|                                | \$0.90 – \$1.00 | \$0.001   |
| `center_quint_edge_quint_cent` | \$0.00 – \$1.00 | \$0.002   |
| `center_quint_edge_deci_cent`  | \$0.00 – \$0.10 | \$0.001   |
|                                | \$0.10 – \$0.90 | \$0.002   |
|                                | \$0.90 – \$1.00 | \$0.001   |
| `center_centi_edge_centi_cent` | \$0.00 – \$1.00 | \$0.0001  |

Newer structures follow the naming convention `center_{center}_edge_{edge}_cent`, where the shorthands are `whole` = \$0.01, `half` = \$0.005, `quint` = \$0.002, `deci` = \$0.001, and `centi` = \$0.0001. Tapered structures apply the finer edge tick below \$0.10 and above \$0.90 — where small absolute price differences represent large relative changes in implied probability — and the center tick in between; when the center and edge ticks are equal, the grid is uniform. The older names (`linear_cent`, `tapered_deci_cent`, `deci_cent`) predate this convention.

Whole-cent prices are valid in every structure. Structures are assigned per market — for example, multivariate (combo) markets use `center_centi_edge_centi_cent`. When a market's structure changes, the `price_level_structure_updated` event on the market lifecycle WebSocket channels carries the new `price_ranges`.

***

## Fractional Contracts

Contract count fields use fixed-point strings and support fractional contract sizes.

```json theme={null}
{
  "count_fp": "10.00"
}
```

* `*_fp` fields are strings
* Accept 0-2 decimal places on input (responses always emit 2 decimals)
* Minimum granularity is 0.01 contracts
* In requests where both integer and `_fp` fields are provided, they must match

Even if you are not placing fractional orders, you will encounter fractional values elsewhere in the API (for example, fills). If your system uses integer arithmetic, one approach is to internally multiply the `_fp` value by 100 and cast to an integer — treating `"1.55"` as 155 units of 1c contracts.

***

## Fee Rounding

Both sub-cent pricing and fractional contracts can produce balance changes with more precision than a user's balance alignment. When this happens, the exchange applies a rounding fee to restore the applicable balance precision, and a fee accumulator issues rebates to prevent systematic overpayment.

See [Fee Rounding](/getting_started/fee_rounding) for the mechanics and worked examples.
