---
url: https://docs.kalshi.com/getting_started/fixed_point_contracts
lastmod: 2026-01-29T21:43:22.657Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fixed-Point Contracts

> Migrating to fixed-point contract quantity representation.

Last Updated: January 29, 2026

## Overview

Kalshi is migrating from integer to fixed-point contract representation across all APIs to support fractional trading. At this time, all `*_fp` fields must represent whole contract values (e.g., `"10"`, `"10.0"`, `"10.00"`), but the fixed-point format supports future fractional precision.

## Format

```json  theme={null}
{
  "count": 10,
  "count_fp": "10.00"
}
```

Fixed-point count fields:

* `*_fp` fields are strings
* Accept 0–2 decimal places on input (responses always emit 2 decimals)
* Currently must represent whole values (e.g., `"10.00"`, not `"10.50"`)
* In requests where both integer and `_fp` fields are provided, they must match

## Rollout stages

1. REST and websocket return and accept `_fp` fields \[Completed Thursday January 29th]
2. REST and websocket no longer return integer format count fields. \*\* Users must migrate to only reading from the equivalent `fp` representation. \*\* \[Febuary 19th, 2026]
3. Fractional order sizes will be enabled on a market-by-market basis \[ETA: Febuary 26, 2026]
4. REST endpoints will no longer accept integer fields for contract counts \[TBD]

Please follow along the [changelog](/changelog) for further updates.

## Rollout Stage 2 Guidance

In order to prepare for Rollout Stage 2, users can continue assume that `_fp` fields will only represent integer contracts and minimize changes by parsing `_fp` fields as follows

```
count_fp = "10.00" 
count = int(count_fp)
```

## Rollout Stage 3 Guidance

Fractional trading will be enabled on a per-market basis, but even if you are not placing integer orders you may see encounter fractional fields in other parts of the API (for example, fills). One way to prepare is to internally multiply the `_fp` value by 100 and casting to an integer. For example, treating `"1.55"` as 155 units of 1c contracts allows continued use of integer arithmetic.
