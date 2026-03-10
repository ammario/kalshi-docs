---
url: https://docs.kalshi.com/getting_started/fixed_point_migration
lastmod: 2026-03-09T04:44:26.114Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fixed-Point Migration

> Migrating to fixed-point representation for contract quantities and prices.

Last Updated: March 8, 2026

<Warning title="Upcoming Changes">
  | Date         | Change                                               | Details                                                                                                                                                                                                                                             |
  | ------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **March 9**  | Subpenny pricing enabled                             | `KXGREENLAND-29` (`deci_cent`), `KXGDPNOM-RUS26` (`tapered_deci_cent`)                                                                                                                                                                              |
  | **March 12** | Fractional trading enabled                           | `KXJOBLESSCLAIMS-26MAR19`, `KXHOUHOMEVAL-26MAR19`, `KXDENHOMEVAL-26MAR19`, `KXSEAHOMEVAL-26MAR19`, `KXSDHOMEVAL-26MAR19`, `KXBOSHOMEVAL-26MAR19`, `KXUSHOMEVAL-26MAR19`, `KXCBDECISIONBRAZIL-26APR29`, `KXCBDECISIONJAPAN-26APR28`, `KXUE-AUS26APR` |
  | **March 12** | Legacy integer fields removed from all API responses | See [removed fields](#removed-legacy-fields)                                                                                                                                                                                                        |
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

The following legacy integer fields are removed from outgoing REST and WebSocket messages in the fixed-point hard cut. Use the corresponding `_fp` or `_dollars` field instead. For the full updated specs, see [openapi.yaml](https://docs.kalshi.com/openapi.yaml) and [asyncapi.yaml](https://docs.kalshi.com/asyncapi.yaml).

### REST API (`/trade-api/v2`)

**Market** (`GET /markets`, `GET /markets/{ticker}`):

| Removed field      | Replacement                |
| ------------------ | -------------------------- |
| `yes_bid`          | `yes_bid_dollars`          |
| `yes_ask`          | `yes_ask_dollars`          |
| `no_bid`           | `no_bid_dollars`           |
| `no_ask`           | `no_ask_dollars`           |
| `last_price`       | `last_price_dollars`       |
| `volume`           | `volume_fp`                |
| `volume_24h`       | `volume_24h_fp`            |
| `open_interest`    | `open_interest_fp`         |
| `notional_value`   | `notional_value_dollars`   |
| `previous_yes_bid` | `previous_yes_bid_dollars` |
| `previous_yes_ask` | `previous_yes_ask_dollars` |
| `previous_price`   | `previous_price_dollars`   |
| `liquidity`        | `liquidity_dollars`        |
| `settlement_value` | `settlement_value_dollars` |

**Order** (`GET /portfolio/orders`, `POST /portfolio/orders`, `PATCH /portfolio/orders/{order_id}`, `DELETE /portfolio/orders/{order_id}`):

| Removed field     | Replacement               |
| ----------------- | ------------------------- |
| `yes_price`       | `yes_price_dollars`       |
| `no_price`        | `no_price_dollars`        |
| `fill_count`      | `fill_count_fp`           |
| `remaining_count` | `remaining_count_fp`      |
| `initial_count`   | `initial_count_fp`        |
| `taker_fill_cost` | `taker_fill_cost_dollars` |
| `maker_fill_cost` | `maker_fill_cost_dollars` |
| `taker_fees`      | `taker_fees_dollars`      |
| `maker_fees`      | `maker_fees_dollars`      |

**Trade** (`GET /markets/{ticker}/trades`):

| Removed field | Replacement                              |
| ------------- | ---------------------------------------- |
| `count`       | `count_fp`                               |
| `price`       | `yes_price_dollars` / `no_price_dollars` |
| `yes_price`   | `yes_price_dollars`                      |
| `no_price`    | `no_price_dollars`                       |

**Fill** (`GET /portfolio/fills`):

| Removed field | Replacement                          |
| ------------- | ------------------------------------ |
| `count`       | `count_fp`                           |
| `price`       | `yes_price_fixed` / `no_price_fixed` |
| `yes_price`   | `yes_price_fixed`                    |
| `no_price`    | `no_price_fixed`                     |

**MarketPosition / EventPosition** (`GET /portfolio/positions`):

| Removed field       | Replacement               |
| ------------------- | ------------------------- |
| `position`          | `position_fp`             |
| `total_traded`      | `total_traded_dollars`    |
| `market_exposure`   | `market_exposure_dollars` |
| `realized_pnl`      | `realized_pnl_dollars`    |
| `fees_paid`         | `fees_paid_dollars`       |
| `total_cost`        | `total_cost_dollars`      |
| `total_cost_shares` | `total_cost_shares_fp`    |
| `event_exposure`    | `event_exposure_dollars`  |

**Settlement** (`GET /portfolio/settlements`):

| Removed field | Replacement    |
| ------------- | -------------- |
| `yes_count`   | `yes_count_fp` |
| `no_count`    | `no_count_fp`  |

**Candlestick** (`GET /markets/{ticker}/candlesticks`):

| Removed field                                                                       | Replacement                                                    |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `volume`                                                                            | `volume_fp`                                                    |
| `open_interest`                                                                     | `open_interest_fp`                                             |
| BidAskDistribution: `open`, `close`, `high`, `low`                                  | `open_dollars`, `close_dollars`, `high_dollars`, `low_dollars` |
| PriceDistribution: `open`, `close`, `high`, `low`, `mean`, `previous`, `min`, `max` | `*_dollars` counterparts                                       |

**Orderbook** (`GET /markets/{ticker}/orderbook`):

| Removed field                       | Replacement                                     |
| ----------------------------------- | ----------------------------------------------- |
| `orderbook` (legacy integer arrays) | `orderbook_fp` (dollar-priced, fp-count arrays) |

**Queue Position** (`GET /portfolio/orders/{order_id}/queue_position`):

| Removed field    | Replacement         |
| ---------------- | ------------------- |
| `queue_position` | `queue_position_fp` |

**Cancel/Decrease Order** (`DELETE /portfolio/orders/{order_id}`):

| Removed field | Replacement     |
| ------------- | --------------- |
| `reduced_by`  | `reduced_by_fp` |

**OrderGroup** (`GET /portfolio/order_groups`):

| Removed field     | Replacement          |
| ----------------- | -------------------- |
| `contracts_limit` | `contracts_limit_fp` |

**RFQ** (`GET /rfqs`):

| Removed field             | Replacement           |
| ------------------------- | --------------------- |
| `contracts`               | `contracts_fp`        |
| `target_cost_centi_cents` | `target_cost_dollars` |

**Quote** (`GET /rfqs/{rfq_id}/quotes`):

| Removed field                 | Replacement               |
| ----------------------------- | ------------------------- |
| `contracts`                   | `contracts_fp`            |
| `yes_bid`                     | `yes_bid_dollars`         |
| `no_bid`                      | `no_bid_dollars`          |
| `rfq_target_cost_centi_cents` | `rfq_target_cost_dollars` |

**Series** (`GET /series`):

| Removed field | Replacement |
| ------------- | ----------- |
| `volume`      | `volume_fp` |

**IncentiveProgram** (`GET /exchange/incentive_programs`):

| Removed field | Replacement      |
| ------------- | ---------------- |
| `target_size` | `target_size_fp` |

### WebSocket API

**orderbook\_snapshot**:

| Removed field          | Replacement      |
| ---------------------- | ---------------- |
| `yes` (integer arrays) | `yes_dollars_fp` |
| `no` (integer arrays)  | `no_dollars_fp`  |

**orderbook\_delta**:

| Removed field | Replacement     |
| ------------- | --------------- |
| `price`       | `price_dollars` |
| `delta`       | `delta_fp`      |

**ticker**:

| Removed field   | Replacement        |
| --------------- | ------------------ |
| `price`         | `price_dollars`    |
| `yes_bid`       | `yes_bid_dollars`  |
| `yes_ask`       | `yes_ask_dollars`  |
| `volume`        | `volume_fp`        |
| `open_interest` | `open_interest_fp` |

**trade**:

| Removed field | Replacement         |
| ------------- | ------------------- |
| `yes_price`   | `yes_price_dollars` |
| `no_price`    | `no_price_dollars`  |
| `count`       | `count_fp`          |

**fill**:

| Removed field   | Replacement         |
| --------------- | ------------------- |
| `yes_price`     | `yes_price_dollars` |
| `count`         | `count_fp`          |
| `post_position` | `post_position_fp`  |

**market\_position**:

| Removed field       | Replacement                 |
| ------------------- | --------------------------- |
| `position`          | `position_fp`               |
| `position_cost`     | `position_cost_dollars`     |
| `realized_pnl`      | `realized_pnl_dollars`      |
| `fees_paid`         | `fees_paid_dollars`         |
| `position_fee_cost` | `position_fee_cost_dollars` |
| `volume`            | `volume_fp`                 |

**rfq\_created / rfq\_deleted**:

| Removed field | Replacement           |
| ------------- | --------------------- |
| `contracts`   | `contracts_fp`        |
| `target_cost` | `target_cost_dollars` |

**quote\_created / quote\_accepted**:

| Removed field           | Replacement                |
| ----------------------- | -------------------------- |
| `yes_bid`               | `yes_bid_dollars`          |
| `no_bid`                | `no_bid_dollars`           |
| `yes_contracts_offered` | `yes_contracts_offered_fp` |
| `no_contracts_offered`  | `no_contracts_offered_fp`  |
| `rfq_target_cost`       | `rfq_target_cost_dollars`  |
| `contracts_accepted`    | `contracts_accepted_fp`    |


Built with [Mintlify](https://mintlify.com).