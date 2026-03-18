---
url: https://docs.kalshi.com/getting_started/fixed_point_migration
lastmod: 2026-03-17T15:15:08.760Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fixed-Point Migration

> Migrating to fixed-point representation for contract quantities and prices.

Last Updated: March 10, 2026

<Warning title="Upcoming Changes">
  | Date         | Change                                                | Details                                                                                                                                                                                                                                             |
  | ------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **March 9**  | Subpenny pricing enabled                              | `KXGREENLAND-29` (`deci_cent`), `KXGDPNOM-RUS26` (`tapered_deci_cent`)                                                                                                                                                                              |
  | **March 12** | Fractional trading enabled                            | `KXJOBLESSCLAIMS-26MAR19`, `KXHOUHOMEVAL-26MAR19`, `KXDENHOMEVAL-26MAR19`, `KXSEAHOMEVAL-26MAR19`, `KXSDHOMEVAL-26MAR19`, `KXBOSHOMEVAL-26MAR19`, `KXUSHOMEVAL-26MAR19`, `KXCBDECISIONBRAZIL-26APR29`, `KXCBDECISIONJAPAN-26APR28`, `KXUE-AUS26APR` |
  | **March 12** | Legacy integer fields removed from most API responses | Settlement cost fields `yes_total_cost` and `no_total_cost` remain temporarily available. See [removed fields](#removed-legacy-fields).                                                                                                             |
</Warning>

## Overview

Kalshi has migrated from integer to fixed-point representation across all APIs. This involves two independent changes:

1. **Subpenny Pricing** — price fields use fixed-point dollar strings (`_dollars` suffix)
2. **Fractional Contracts** — contract count fields use fixed-point strings (`_fp` suffix)

Two fields on Market responses indicate which of these features are active for a given market:

| Field                        | Type    | Description                                                |
| ---------------------------- | ------- | ---------------------------------------------------------- |
| `price_level_structure`      | string  | Price level structure defining price ranges and tick sizes |
| `fractional_trading_enabled` | boolean | Whether fractional order sizes are accepted                |

***

## Subpenny Pricing

Prices are represented as fixed-point dollar strings.

```json  theme={null}
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

See the summary above for the initial subpenny-enabled markets.

***

## Fractional Contracts

Contract count fields use fixed-point strings.

```json  theme={null}
{
  "count_fp": "10.00"
}
```

* `*_fp` fields are strings
* Accept 0-2 decimal places on input (responses always emit 2 decimals)
* In requests where both integer and `_fp` fields are provided, they must match

Check the `fractional_trading_enabled` field on Market responses to determine whether a given market supports fractional order sizes. See the summary above for the initial fractional-enabled markets.

Even if you are not placing fractional orders, you may encounter fractional values in other parts of the API (for example, fills on fractional-enabled markets). One way to prepare is to internally multiply the `_fp` value by 100 and cast to an integer. For example, treating `"1.55"` as 155 units of 1c contracts allows continued use of integer arithmetic.

***

## Fee Rounding

Both subpenny pricing and fractional contracts can produce sub-cent balance changes on fills. When this happens, the exchange applies a rounding fee to restore cent-alignment, and a fee accumulator issues rebates to prevent systematic overpayment.

See [Fee Rounding](/getting_started/fee_rounding) for the mechanics and worked examples.

***

## Removed Legacy Fields

Most legacy integer price and count fields were removed from outgoing REST and WebSocket payloads on March 12, 2026.

### Settlement Compatibility

`GET /portfolio/settlements` still returns the deprecated cent-denominated fields `yes_total_cost` and `no_total_cost` for compatibility.

Use `yes_total_cost_dollars` and `no_total_cost_dollars` going forward. The integer settlement cost fields will be removed in a later follow-up once clients have had more time to migrate.


Built with [Mintlify](https://mintlify.com).