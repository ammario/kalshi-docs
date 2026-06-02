---
url: https://docs.kalshi.com/getting_started/fee_rounding
lastmod: 2026-06-01T19:43:33.340Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fee Rounding

> How the exchange rounds fees to maintain balance precision.

## Overview

User balances have a target precision before and after every fill:

* Direct member balances are rounded to the nearest `$0.0001` (`0.01c`)
* Non-direct member balances are rounded to the nearest `$0.01` (`1c`)

When a trade produces a balance change that is more precise than the user's target balance precision, the exchange charges a **rounding fee** to bring the balance back to that target. The **fee accumulator** still applies across all fills of an order so that the total fee converges to what a single equivalent fill would cost.

Every fill produces three fee components:

| Component        | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| **Trade fee**    | Fee from the fee model, rounded up to the nearest \$0.0001 (centicent)     |
| **Rounding fee** | Adjustment that restores the user's target balance precision               |
| **Rebate**       | Refund from accumulated rounding overpayment (always a multiple of \$0.01) |

**Net fee** = trade fee + rounding fee - rebate (always >= \$0.00)

## Rounding Mechanics

Given a fill's `revenue` (signed; negative for buyers) and `trade_fee`:

1. Round trade fee **up** to the nearest \$0.0001
2. Compute `balance_change = revenue - trade_fee`
3. Floor `balance_change` toward negative infinity to the user's target balance precision
4. `rounding_fee = balance_change - floor(balance_change)`

The user's balance changes by `floor(balance_change)`, which is always aligned to the user's target balance precision.

## Fee Accumulator

The fee accumulator tracks cumulative rounding overpayment across all fills of an order. Once the accumulated rounding exceeds \$0.01, a whole-cent rebate is issued and the accumulator is reduced by \$0.01. This ensures the total fee across many small fills converges to what a single equivalent fill would cost.

<Note>
  The fee accumulator is maintained per order across all fills regardless of whether the fills are taker or maker. If an order initially takes (matching resting orders) and then becomes a resting maker order, the accumulated rounding carries over to subsequent maker fills.
</Note>

## Worked Examples

The examples below assume a target balance precision of `$0.01` (`1c`). For direct members of the exchange, apply the same mechanics with `$0.0001` (`0.01c`) as the target precision.

<AccordionGroup>
  <Accordion title="Subpenny prices: buy 3 contracts at $0.055 (three 1-lot matches)">
    Buy **3 contracts** at **\$0.055** — filled as three 1-lot matches. Contracts are whole; rounding arises from the sub-cent price.

    **Fill 1 walkthrough:**

    ```
    revenue        = -$0.055 x 1       = -$0.0550
    trade fee      = $0.0085             (ceiled to centicent)
    balance change = -$0.0550 - $0.0085  = -$0.0635
                     floored to            -$0.07
    rounding fee   = $0.07 - $0.0635    =  $0.0065
    ```

    **All fills:**

    | Fill | Trade Fee | Rounding | Accumulator |   Rebate |  Net Fee | Balance Change |
    | ---: | --------: | -------: | ----------: | -------: | -------: | -------------: |
    |    1 |  \$0.0085 | \$0.0065 |    \$0.0065 |        — | \$0.0150 |        -\$0.07 |
    |    2 |  \$0.0085 | \$0.0065 |    \$0.0130 | \$0.0100 | \$0.0050 |        -\$0.07 |
    |    3 |  \$0.0085 | \$0.0065 |    \$0.0095 |        — | \$0.0150 |        -\$0.07 |

    On Fill 2, the accumulator reaches \$0.0130 (> \$0.01), triggering a \$0.01 rebate. The net fee drops to \$0.0050 for that fill.
  </Accordion>

  <Accordion title="Fractional contracts: buy 0.90 contracts at $0.50 (three 0.30-lot matches)">
    Buy **0.90 contracts** at **\$0.50** — filled as three 0.30-lot matches. The price is a whole cent; rounding arises from the fractional quantity.

    **Fill 1 walkthrough:**

    ```
    revenue        = -$0.50 x 0.30       = -$0.1500
    trade fee      = $0.0041               (ceiled to centicent)
    balance change = -$0.1500 - $0.0041    = -$0.1541
                     floored to              -$0.16
    rounding fee   = $0.16 - $0.1541      =  $0.0059
    ```

    **All fills:**

    | Fill | Trade Fee | Rounding | Accumulator |   Rebate |  Net Fee | Balance Change |
    | ---: | --------: | -------: | ----------: | -------: | -------: | -------------: |
    |    1 |  \$0.0041 | \$0.0059 |    \$0.0059 |        — | \$0.0100 |        -\$0.16 |
    |    2 |  \$0.0041 | \$0.0059 |    \$0.0118 | \$0.0100 | \$0.0000 |        -\$0.16 |
    |    3 |  \$0.0041 | \$0.0059 |    \$0.0077 |        — | \$0.0100 |        -\$0.16 |

    On Fill 2, the accumulator reaches \$0.0118 (> \$0.01), triggering a \$0.01 rebate. The entire fee is offset, resulting in a \$0.00 net fee for that fill.
  </Accordion>

  <Accordion title="Combined: fractional contracts + subpenny prices (three 0.03-lot matches)">
    Buy **0.09 contracts** at **\$0.3301** — filled as three 0.03-lot matches. Both features contribute sub-cent components, pushing intermediates to 6 decimal places.

    **Fill 1 walkthrough:**

    ```
    revenue        = -$0.3301 x 0.03      = -$0.009903
    trade fee      = $0.0005                (ceiled to centicent)
    balance change = -$0.009903 - $0.0005  = -$0.010403
                     floored to              -$0.02
    rounding fee   = $0.02 - $0.010403     =  $0.009597
    ```

    **All fills:**

    | Fill | Trade Fee |   Rounding | Accumulator |   Rebate |    Net Fee | Balance Change |
    | ---: | --------: | ---------: | ----------: | -------: | ---------: | -------------: |
    |    1 |  \$0.0005 | \$0.009597 |  \$0.009597 |        — | \$0.010097 |        -\$0.02 |
    |    2 |  \$0.0005 | \$0.009597 |  \$0.019194 | \$0.0100 | \$0.000097 |        -\$0.02 |
    |    3 |  \$0.0005 | \$0.009597 |  \$0.018791 | \$0.0100 | \$0.000097 |        -\$0.02 |

    The accumulator triggers a rebate on both Fill 2 and Fill 3, keeping the total net fee close to the single-fill equivalent.

    <Note>
      Subpenny prices alone produce 4-decimal-place intermediates. Fractional contracts alone also produce 4-decimal-place intermediates. When combined, intermediates can reach 6 decimal places (e.g., \$0.3301 x 0.03 = \$0.009903). Final balances are rounded to the user's target balance precision.
    </Note>
  </Accordion>
</AccordionGroup>
