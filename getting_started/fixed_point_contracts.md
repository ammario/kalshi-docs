---
url: https://docs.kalshi.com/getting_started/fixed_point_contracts
---
# Fixed-Point Contracts

> Migrating to fixed-point contract quantity representation.

## Overview

Kalshi is migrating from integer to fixed-point contract representation across all APIs to support fractional trading. At this time, all `*_fp` fields must represent whole contract values (e.g., `"10"`, `"10.0"`, `"10.00"`), but the fixed-point format supports future fractional precision.

## Rollout stages

1. Fixed-point fields released (current rollout): `_fp` fields are added across APIs; `_fp` values must be whole-number quantities; integer fields are still supported.
2. Integer fields deprecated (future): integer fields will be deprecated with notice.
3. Fractional orders enabled (future, per-market): `_fp` values may include fractional quantities.

Each stage will be announced separately for demo and production in the [changelog](/changelog).

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

## Migration

Clients should migrate to using the `*_fp` fields. The integer count fields will be deprecated with notice in a future stage.

This rollout includes:

* REST API
* WebSockets
* FIX

## Preparing for Fractional Trading

Fractional trading will be enabled on a per-market basis. To prepare, consider multiplying the `_fp` value by 100 internally. For example, treating `"1.00"` as 100 units of 1c contracts allows continued use of integer arithmetic while supporting future fractional quantities.


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.kalshi.com/llms.txt