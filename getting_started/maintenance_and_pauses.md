---
url: https://docs.kalshi.com/getting_started/maintenance_and_pauses
lastmod: 2026-04-30T03:43:38.626Z
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

|                          | Trading Pause                                         | Exchange Pause                                                                                                  |
| ------------------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **When**                 | Every Thursday 3:00–5:00 AM ET                        | Rare; during scheduled maintenance if intensive work is needed, or unscheduled if Kalshi has a temporary outage |
| **Place / amend orders** | No                                                    | No                                                                                                              |
| **Cancel orders**        | Yes                                                   | No                                                                                                              |
| **Resting orders**       | Remain on the book (unless CancelOrderOnPause is set) | Remain on the book (unless CancelOrderOnPause is set)                                                           |

If an exchange pause occurs outside the scheduled Thursday window, it indicates a temporary Kalshi Exchange outage.

## CancelOrderOnPause

When placing an order, you can set `CancelOrderOnPause` to control whether the order is automatically cancelled during either type of pause.

| Value               | Behavior                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| true / Y            | Order is automatically cancelled when a trading or exchange pause begins |
| false / N (default) | Order remains resting on the book and resumes when activity reopens      |

Set this field on order creation:

* **REST**: `cancel_order_on_pause` field on the create order request
* **FIX**: Tag `21006` (CancelOrderOnPause) on New Order Single (35=D) messages
