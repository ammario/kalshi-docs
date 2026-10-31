---
url: https://docs.kalshi.com/getting_started/fixed_point_migration
lastmod: 2026-10-30T15:59:17.237Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fixed-Point Representation

> Fixed-point prices, contract quantities, and margin monetary amounts.

Last Updated: November 5, 2026

## Overview

Kalshi APIs use fixed-point strings for prices, contract quantities, and selected monetary amounts:

1. **Prices**: fixed-point dollar strings (`_dollars` suffix), up to 4 decimal places
2. **Contract quantities**: fixed-point strings (`_fp` suffix), up to 2 decimal places
3. **Margin monetary amounts**: [response fields](#margin-markets) use dollar strings with up to 6 decimal places (existing fields in the Perps REST API; `_fp` counterparts in the Clearing Member API)

Use each field's documented unit and precision: the `_fp` suffix alone does not distinguish contract quantities from dollar amounts.

***

## Prices

Prices are represented as fixed-point dollar strings.

```json theme={null}
{
    "price_dollars": "0.1200"
}
```

* `*_dollars` price fields are fixed-point dollar strings with up to 4 decimal places (e.g., `"0.1200"`)
* Integer-cent fields cannot represent sub-cent prices; on markets with sub-cent ticks, read prices from the `*_dollars` fields
* When combined with fractional contract sizes, intermediate calculations can reach up to 6 decimal places (for example, in fee rounding math)

### Price Level Structures

Each market's valid prices form a fixed grid, described by two fields on Market responses:

* `price_ranges` — an array of `{ start, end, step }` bands in fixed-point dollars. This is the source of truth for valid prices: any price on the grid is valid, and any off-grid price is rejected. Consume it dynamically per market and snap order and quote prices to the relevant band's `step`.
* `price_level_structure` — a human-readable label for the grid. Do not key pricing logic off this name; new structures are introduced over time, and a client that reads `price_ranges` is automatically compatible with all of them.

| Structure | Ranges | Tick Size |
| - | - | - |
| `linear_cent` | \$0.00 – \$1.00 | \$0.01 |
| `deci_cent` | \$0.00 – \$1.00 | \$0.001 |
| `tapered_deci_cent` | \$0.00 – \$0.10 | \$0.001 |
| | \$0.10 – \$0.90 | \$0.01 |
| | \$0.90 – \$1.00 | \$0.001 |
| `center_whole_edge_half_cent` | \$0.00 – \$0.10 | \$0.005 |
| | \$0.10 – \$0.90 | \$0.01 |
| | \$0.90 – \$1.00 | \$0.005 |
| `center_whole_edge_quint_cent` | \$0.00 – \$0.10 | \$0.002 |
| | \$0.10 – \$0.90 | \$0.01 |
| | \$0.90 – \$1.00 | \$0.002 |
| `center_half_edge_half_cent` | \$0.00 – \$1.00 | \$0.005 |
| `center_half_edge_quint_cent` | \$0.00 – \$0.10 | \$0.002 |
| | \$0.10 – \$0.90 | \$0.005 |
| | \$0.90 – \$1.00 | \$0.002 |
| `center_half_edge_deci_cent` | \$0.00 – \$0.10 | \$0.001 |
| | \$0.10 – \$0.90 | \$0.005 |
| | \$0.90 – \$1.00 | \$0.001 |
| `center_quint_edge_quint_cent` | \$0.00 – \$1.00 | \$0.002 |
| `center_quint_edge_deci_cent` | \$0.00 – \$0.10 | \$0.001 |
| | \$0.10 – \$0.90 | \$0.002 |
| | \$0.90 – \$1.00 | \$0.001 |
| `center_centi_edge_centi_cent` | \$0.00 – \$1.00 | \$0.0001 |
| `center_deci_edge_centi_cent` | \$0.00 – \$0.01 | \$0.0001 |
| | \$0.01 – \$0.99 | \$0.001 |
| | \$0.99 – \$1.00 | \$0.0001 |

Newer structures follow the naming convention `center_{center}_edge_{edge}_cent`, where the shorthands are `whole` = \$0.01, `half` = \$0.005, `quint` = \$0.002, `deci` = \$0.001, and `centi` = \$0.0001. Tapered structures apply the finer edge tick near the boundaries of the price range — where small absolute price differences represent large relative changes in implied probability — and the center tick in between; most taper below \$0.10 and above \$0.90, while `center_deci_edge_centi_cent` tapers below \$0.01 and above \$0.99. When the center and edge ticks are equal, the grid is uniform. The older names (`linear_cent`, `tapered_deci_cent`, `deci_cent`) predate this convention.

Whole-cent prices are valid in every structure. Structures are assigned per market — for example, multivariate (combo) markets use `center_deci_edge_centi_cent`. When a market's structure changes, the `price_level_structure_updated` event on the market lifecycle WebSocket channels carries the new `price_ranges`.

***

## Fractional Contracts

Contract count fields use fixed-point strings. Fractional order sizes are supported only on markets that allow them; margin markets currently trade whole contracts.

```json theme={null}
{
  "count_fp": "10.00"
}
```

* Contract quantity `*_fp` fields are strings
* Accept 0-2 decimal places on input (responses always emit 2 decimals)
* Minimum granularity is 0.01 contracts
* In requests where both integer and `_fp` fields are provided, they must match

On markets that support fractional contracts, fills may be fractional even when you submit whole-contract orders. For integer arithmetic, represent quantities in hundredths of a contract: `"1.55"` is 155 units.

***

## Margin Markets

Kalshi is building support for fractional trading with up to 2 decimal places on enabled perpetual markets. The launch date is to be announced.

Fractional quantities can produce dollar amounts that require more than 4 decimal places. For example, 0.01 contracts at \$0.1234 per contract produces \$0.001234 before fees. Affected balances and cash-flow amounts will support up to 6 decimal places in USD. Preserve this precision in calculations and reconciliation.

### Trading, Settlement, and Funding

* **Trading**: Once fractional trading is enabled, fills may have fractional quantities, even for whole-contract orders.
* **Settlement**: Combined with sub-cent pricing, fractional quantities can produce settlement amounts with 6 decimal places.
* **Funding**: Funding amounts will also support 6 decimal places.

### API Changes

The Perps REST API already uses fixed-point strings for contract quantities and retains its existing dollar field names. Support up to 6 decimal places for margin balances, PnL, funding, notional, and settlement amounts.

The Clearing Member API adds `_fp` dollar strings alongside selected integer `_centicents` fields.

For example, a Clearing Member response can include both representations of the same amount:

```json theme={null}
{
  "balance_available_centicents": 123456,
  "balance_available_fp": "12.345600"
}
```

The Clearing Member API's legacy integer-centicent fields with `_fp` counterparts will be deprecated soon. Migrate to the `_fp` fields to preserve full precision.

FIX trade quantities are already represented as decimals. Once fractional trading is enabled, the existing quantity fields will accept fractional order quantities and report fractional values.

Margin requirements, fees, and notional risk limits are unchanged.

***

## Fee Rounding

Both sub-cent pricing and fractional contracts can produce balance changes with more precision than a user's balance alignment. When this happens, the exchange applies a rounding fee to restore the applicable balance precision, and a fee accumulator issues rebates to prevent systematic overpayment.

See [Fee Rounding](https://docs.kalshi.com/getting_started/fee_rounding.md) for the mechanics and worked examples.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.