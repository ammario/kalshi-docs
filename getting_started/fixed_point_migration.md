---
url: https://docs.kalshi.com/getting_started/fixed_point_migration
lastmod: 2026-03-04T01:02:47.163Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fixed-Point Migration

> Migrating to fixed-point representation for contract quantities and prices.

Last Updated: March 3, 2026

## Overview

Kalshi is migrating from integer to fixed-point representation across all APIs. This involves two independent changes:

1. **Subpenny Pricing** — price fields transition from integer cents to fixed-point dollar strings (`_dollars` suffix)
2. **Fractional Contracts** — contract count fields transition from integers to fixed-point strings (`_fp` suffix)

Two fields on Market responses indicate which of these features are active for a given market:

| Field                        | Type    | Description                                                |
| ---------------------------- | ------- | ---------------------------------------------------------- |
| `price_level_structure`      | string  | Price level structure defining price ranges and tick sizes |
| `fractional_trading_enabled` | boolean | Whether fractional order sizes are accepted                |

## Deprecation Timeline

1. `_fp` and `_dollars` fields returned and accepted across REST and WebSocket APIs — **Completed January 29, 2026**
2. Legacy integer count fields and integer cents price fields will **no longer be returned**. Fractional order sizes enabled per-market. Users must migrate to `_fp` and `_dollars` equivalents — **March 12, 2026** (they may be truncated prior to March 12 and will be removed after March 12)
3. REST endpoints will no longer accept integer fields for contract counts — **TBD**

Please follow along the [changelog](/changelog) for further updates.

***

## Subpenny Pricing

Prices are represented in two formats: integer cents (legacy) and fixed-point dollars (new).

```json  theme={null}
{
    "price": 12,
    "price_dollars": "0.1200"
}
```

* `*_dollars` fields are fixed-point dollar strings with up to 4 decimal places (e.g., `"0.1200"`)
* When combined with fractional contract sizes, intermediate calculations can reach up to 6 decimal places (for example, in fee rounding math)
* Legacy integer cents price fields (e.g., `yes_bid`, `no_ask`, `last_price`) will be deprecated on **March 12, 2026**. Their `_dollars` equivalents (e.g., `yes_bid_dollars`, `no_ask_dollars`, `last_price_dollars`) are already available

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

Contract count fields are transitioning from integers to fixed-point strings.

```json  theme={null}
{
  "count": 10,
  "count_fp": "10.00"
}
```

* `*_fp` fields are strings
* Accept 0-2 decimal places on input (responses always emit 2 decimals)
* In requests where both integer and `_fp` fields are provided, they must match

Starting the week of **March 9, 2026**, fractional trading will be enabled on a limited per-market basis. Check the `fractional_trading_enabled` field on Market responses to determine whether a given market supports fractional order sizes.

<Warning>
  For fractional-enabled markets, the legacy integer count fields (e.g., `count`, `remaining_count`) should not be relied upon. Between fractional enablement (week of **March 9, 2026**) and legacy-field removal (**March 12, 2026**), they may still appear but will contain **truncated values**; after March 12 they will no longer be returned. Migrate to their `_fp` equivalents to avoid data loss.
</Warning>

Even if you are not placing fractional orders, you may encounter fractional values in other parts of the API (for example, fills on fractional-enabled markets). One way to prepare is to internally multiply the `_fp` value by 100 and cast to an integer. For example, treating `"1.55"` as 155 units of 1c contracts allows continued use of integer arithmetic.

***

## Fee Rounding

Both subpenny pricing and fractional contracts can produce sub-cent balance changes on fills. When this happens, the exchange applies a rounding fee to restore cent-alignment, and a fee accumulator issues rebates to prevent systematic overpayment.

See [Fee Rounding](/getting_started/fee_rounding) for the mechanics and worked examples.
