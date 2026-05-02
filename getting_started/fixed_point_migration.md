---
url: https://docs.kalshi.com/getting_started/fixed_point_migration
lastmod: 2026-05-01T20:03:44.271Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fixed-Point Migration

> Fixed-point representation for contract quantities and prices.

Last Updated: April 17, 2026

## Overview

Kalshi uses fixed-point representation across all APIs. This involves two independent changes:

1. **Subpenny Pricing** — price fields use fixed-point dollar strings (`_dollars` suffix)
2. **Fractional Contracts** — contract count fields use fixed-point strings (`_fp` suffix)

The `price_level_structure` field on Market responses indicates which pricing tier is active for a given market.

***

## Subpenny Pricing

Prices are represented as fixed-point dollar strings.

```json theme={null}
{
    "price_dollars": "0.1200"
}
```

* `*_dollars` fields are fixed-point dollar strings with up to 4 decimal places (e.g., `"0.1200"`)
* When combined with fractional contract sizes, intermediate calculations can reach up to 6 decimal places (for example, in fee rounding math)

Subpenny pricing is offered on a per-market basis. The `price_level_structure` field on Market responses indicates which pricing tier is active, and the `price_ranges` array provides the exact valid price intervals and tick sizes for that market.

### Price Level Structures

| Structure           | Ranges          | Tick Size |
| ------------------- | --------------- | --------- |
| `linear_cent`       | \$0.00 – \$1.00 | \$0.01    |
| `tapered_deci_cent` | \$0.00 – \$0.10 | \$0.001   |
|                     | \$0.10 – \$0.90 | \$0.01    |
|                     | \$0.90 – \$1.00 | \$0.001   |
| `deci_cent`         | \$0.00 – \$1.00 | \$0.001   |

`tapered_deci_cent` provides finer \$0.001 (decicent) precision at the tails of the probability range — below \$0.10 and above \$0.90 — where small absolute price differences represent large relative changes in implied probability. The middle range uses standard \$0.01 (cent) ticks.

`deci_cent` applies \$0.001 precision across the entire range.

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

Even if you are not placing fractional orders, you will encounter fractional values elsewhere in the API (for example, fills). One way to prepare is to internally multiply the `_fp` value by 100 and cast to an integer. For example, treating `"1.55"` as 155 units of 1c contracts allows continued use of integer arithmetic.

***

## Fee Rounding

Both subpenny pricing and fractional contracts can produce sub-cent balance changes on fills. When this happens, the exchange applies a rounding fee to restore cent-alignment, and a fee accumulator issues rebates to prevent systematic overpayment.

See [Fee Rounding](/getting_started/fee_rounding) for the mechanics and worked examples.
