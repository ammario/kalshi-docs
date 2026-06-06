---
url: https://docs.kalshi.com/getting_started/order_groups
lastmod: 2026-04-30T03:43:38.625Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Order Groups

> Automatic order cancellation based on rolling contract limits

Order groups provide automatic order cancellation when a contracts limit is reached within a rolling 15-second window. When an order group is triggered, all resting orders in that group are canceled and no new orders can be placed until the group is reset.

## How It Works

1. **Create** a group with a contracts limit (1–1,000,000). The server generates the group ID and returns it in the response.
2. **Place orders** with the group's ID. Each order is tracked against the group.
3. **As orders execute**, filled contract counts accumulate within a rolling 15-second window.
4. **If the rolling total exceeds the limit**, the group is triggered: all resting orders in the group are canceled.

## Group States

| State         | Behavior                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| **Active**    | Orders can be placed; rolling volume is tracked against the limit         |
| **Triggered** | All resting orders canceled; new orders rejected until the group is reset |

A group enters the triggered state when:

* The rolling 15-second volume exceeds the contracts limit
* A manual **Trigger** action is issued, which cancels all orders regardless of whether the limit has been reached
* The limit is **Updated** to a value below the current rolling volume

A **Reset** clears the triggered state and the rolling volume counter, returning the group to active.

**Delete** removes the group entirely and cancels all resting orders in it.

## Error Handling

Business-logic errors (e.g. order group not found) are returned as rejects. Refer to the protocol-specific pages for error message formats.

## Protocol-Specific Details

* [FIX Order Group Messages](/fix/order-groups)
* [REST Order Group Endpoints](/api-reference/order-groups/get-order-groups)
