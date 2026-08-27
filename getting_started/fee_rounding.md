---
url: https://docs.kalshi.com/getting_started/fee_rounding
lastmod: 2026-08-26T20:03:44.723Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fee Rounding

> How trade fees and balances are rounded.

## Overview

User balances have a target precision before and after every fill:

* Direct member balances are aligned to `$0.0001` (`0.01c`)
* Non-direct member balances are aligned to `$0.01` (`1c`)

When a trade produces a balance change that is more precise than the user's target balance precision, the exchange charges a **rounding fee** to bring the balance back to that target. The **fee accumulator** applies across all fills of an order so that the total fee converges to what a single equivalent fill would cost.

Fees are six-decimal dollar amounts (`$0.000001` granularity) — the finest precision a fill's revenue (price × quantity) can occupy. Every fill produces three fee components:

| Component        | Description                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **Trade fee**    | Fee from the fee model, rounded up to the nearest `$0.000001`                                |
| **Rounding fee** | Adjustment that restores the user's target balance precision                                 |
| **Rebate**       | Refund from accumulated rounding overpayment, aligned to the user's target balance precision |

**Net fee** = trade fee + rounding fee - rebate (always >= \$0.00)

## Rounding Mechanics

Given a fill's signed `revenue` (negative for buyers) and model fee:

1. Compute `trade_fee = ceil_6dp(model_fee)`
2. Compute `aligned_change = floor_precision(revenue - trade_fee)`
3. Compute `rounding_fee = (revenue - trade_fee) - aligned_change`
4. Add the rounding fee to the order's accumulator
5. Rebate accumulated rounding in increments of the user's target balance precision, capped so the fill's net fee cannot be negative

Before any rebate, the user's balance changes by `aligned_change`, which is always on the user's precision grid.

## Fee Accumulator

The fee accumulator carries rounding overpayment across an order's fills. Rebates use the user's target balance precision: `$0.0001` for direct members and `$0.01` for non-direct members.

<Note>
  The fee accumulator is maintained per order across all fills regardless of whether the fills are taker or maker. If an order initially takes (matching resting orders) and then becomes a resting maker order, the accumulated rounding carries over to subsequent maker fills.
</Note>

## Worked Examples

<AccordionGroup>
  <Accordion title="FCM-cleared fill">
    For a non-direct member with `$0.01` balance precision, suppose a buy has `-$0.055000` of signed revenue and a model fee of `$0.00363825`:

    ```text theme={null}
    trade fee      = ceil_6dp($0.00363825)           =  $0.003639
    aligned change = floor_cent(-$0.055 - $0.003639) = -$0.060000
    rounding fee   = (-$0.055 - $0.003639) - -$0.06  =  $0.001361
    ```

    The balance changes by `-$0.06`; the trade fee plus rounding fee is exactly `$0.005`.
  </Accordion>

  <Accordion title="Accumulator across fills">
    If three fills each add `$0.004` of rounding overpayment, the accumulator carries it forward. Assuming the third fill has enough total fee to cover a `$0.01` rebate:

    | Fill |    Added | Before Rebate |   Rebate | Carried Forward |
    | ---: | -------: | ------------: | -------: | --------------: |
    |    1 | `$0.004` |      `$0.004` |        — |        `$0.004` |
    |    2 | `$0.004` |      `$0.008` |        — |        `$0.008` |
    |    3 | `$0.004` |      `$0.012` | `$0.010` |        `$0.002` |

    This table uses a non-direct member's `$0.01` precision. Direct-member rebates follow the same mechanics in `$0.0001` increments. In either case, the rebate is capped so that the fill's net fee cannot become negative.
  </Accordion>
</AccordionGroup>
