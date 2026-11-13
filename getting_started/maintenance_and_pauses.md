---
url: https://docs.kalshi.com/getting_started/maintenance_and_pauses
lastmod: 2026-11-13T01:30:44.913Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Maintenance and Pauses

> Scheduled maintenance windows, trading pauses, and exchange pauses

## Scheduled Maintenance

Every **Thursday from 3:00 AM to 5:00 AM ET**, Kalshi runs scheduled maintenance. During this window, a **trading pause** is in effect. In rare cases, a more intensive maintenance may require a full **exchange pause** instead.

Clients should be prepared for session disconnections during this window and reconnect after 5:00 AM ET.

## Trading Pause vs Exchange Pause

| | Trading Pause | Exchange Pause |
| - | - | - |
| **When** | Every Thursday 3:00–5:00 AM ET | Rare; during scheduled maintenance if intensive work is needed, or unscheduled if Kalshi has a temporary outage |
| **Place / amend orders** | No | No |
| **Cancel / decrease orders** | Yes | No |
| **REST error for a rejected single-order request** | `409` with code `trading_is_paused` | `409` with code `exchange_is_paused` |
| **Resting orders** | Remain on the book (unless CancelOrderOnPause is set) | Remain on the book (unless CancelOrderOnPause is set) |

If an exchange pause occurs outside the scheduled Thursday window, it indicates a temporary Kalshi Exchange outage.

## Checking Exchange Status

[Get Exchange Status](https://docs.kalshi.com/api-reference/exchange/get-exchange-status.md) reports `exchange_active` and `trading_active` for the default exchange index, and for each index in `exchange_index_statuses`.

* Read the flags only from a `200` response. When the status of the default index cannot be read, the response is a `500`, `503` or `504`; its body can carry both flags set to `false` or an error object, and in neither case does it mean the exchange is paused.
* On a `200`, an index other than 0 whose status request failed or timed out is listed with all of its flags `false`. Read the status again before treating a single `false` reading for one index as a pause.

## CancelOrderOnPause

When placing an order, you can set `CancelOrderOnPause` to control whether the order is automatically cancelled during either type of pause.

| Value | Behavior |
| - | - |
| true / Y | Order is automatically cancelled when a trading or exchange pause begins |
| false / N (default) | Order remains resting on the book and resumes when activity reopens |

Set this field on order creation:

* **REST**: `cancel_order_on_pause` field on the create order request
* **FIX**: Tag `21006` (CancelOrderOnPause) on New Order Single (35=D) messages


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.